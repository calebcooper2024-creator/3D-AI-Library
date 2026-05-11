"""
Summit Health Voice Agent — agent.py
LiveKit Agents 1.x worker entrypoint.

Run:
  python agent.py dev     # development mode
  python agent.py start   # production worker mode

Requires LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET in .env.local.
Voice pipeline requires OPENAI_API_KEY, DEEPGRAM_API_KEY, CARTESIA_API_KEY.
"""
from __future__ import annotations

import sys
from pathlib import Path
if __name__ in ("__main__", "__mp_main__"):
    sys.path.insert(0, str(Path(__file__).parent.parent))
    __package__ = "summit_voice_agent"

import asyncio
import json
import logging
import sys
import time
from pathlib import Path
from typing import Optional

from dotenv import load_dotenv

_here = Path(__file__).parent
for _f in [_here / ".env.local", _here / ".env"]:
    if _f.exists():
        load_dotenv(_f, override=False)

from .config import CONFIG
from .events import (
    make_call_id, session_event, transcript_event,
    intent_event, failure_event, latency_event,
)
from .event_bus import SummitEventBus, decode_control_packet
from .mock_ecw import MockEcwAdapter
from .tools import run_policy_gated_tool, publish_review_from_output
from .workflow_state import (
    SummitWorkflowState, classify_intent_from_text,
    create_workflow_state, SUPPORTED_SCENARIOS,
)

logger = logging.getLogger(__name__)

SYSTEM_INSTRUCTIONS = """\
You are Summit Health's demo scheduling voice agent for an orthopedic practice.

Hard constraints — never break these:
- You are NOT a doctor. Never provide medical advice.
- Do not verify insurance, referral validity, prior authorization, payment, or eligibility.
- Do not schedule workers-comp cases.
- Do not schedule surgery or handle post-op triage.
- Do not collect payment.
- Do not create real appointments. All appointment creation is a staff-review draft only.

Call conduct:
- Ask one question at a time.
- Confirm name, date of birth, provider or body-part route, date, and time before preparing a review.
- If workers comp or work injury is mentioned: say you must transfer, then call transfer_call(destination=workers_comp).
- If a medical question is asked: acknowledge staff can route it, call log_patient_statement with their words, call create_staff_task(task_type=clinical_callback).
- If emergency language is used: advise calling 911, call create_staff_task(task_type=emergency_escalation).
- If provider is ambiguous: clarify before calling get_provider_availability.
- If lookup times out: call create_staff_task(task_type=scheduling_callback), do not guess.
- Keep responses calm, short, and practical.
"""

SCENARIO_LABELS = {
    "normal_scheduling_knee": ("Standard scheduling — knee pain", "Agent classifies body-part intent, routes to Dr. Chen, presents availability, confirms appointment draft."),
    "workers_comp_transfer": ("Workers comp detected", "Agent must block scheduling and transfer to workers comp coordinator immediately."),
    "medical_question_escalation": ("Medical question detected", "Agent must not answer clinically. Log statement and create clinical callback task."),
    "ambiguous_provider_name": ("Ambiguous provider name", "Agent must detect low confidence and clarify before checking availability."),
    "ecw_timeout": ("eCW timeout simulation", "Agent must not invent availability. Create staff callback task."),
    "unavailable_slot": ("Requested slot unavailable", "Agent must offer alternatives. Do not book the unavailable slot."),
    "slow_elderly_caller": ("Slow elderly caller", "Agent patience mode. Extra wait time."),
    "billing_transfer": ("Billing call detected", "Agent must block scheduling and transfer to RCM queue."),
}


class SummitHealthAgent:
    """Per-session state and tool/policy/event pipeline."""

    def __init__(self, room, call_id, scenario_id, ecw, bus):
        self.room = room
        self.call_id = call_id
        self.scenario_id = scenario_id
        self.ecw = ecw
        self.bus = bus
        self.state: SummitWorkflowState = create_workflow_state(call_id, scenario_id)

    async def handle_control(self, packet: dict) -> None:
        action = packet.get("action", "")
        if action in ("start_scenario", "set_scenario"):
            new_sc = packet.get("scenarioId", self.scenario_id)
            if new_sc in SUPPORTED_SCENARIOS:
                self.scenario_id = new_sc
                self.state.set_scenario(new_sc)
                self.ecw.scenario_id = new_sc
                label, expected = SCENARIO_LABELS.get(new_sc, (new_sc, ""))
                from .events import failure_event
                await self.bus.publish(failure_event(self.call_id, new_sc, label, expected))
                await self.bus.publish(session_event(self.call_id, "running", f"Scenario: {label}"))
        elif action == "end_call":
            await self.bus.publish(session_event(self.call_id, "ended", "Call ended by frontend."))
        elif action == "ping":
            await self.bus.publish(session_event(self.call_id, "running", "pong"))

    async def tool_classify_intent(self, caller_words: str) -> dict:
        c = classify_intent_from_text(caller_words)
        self.state.set_intent(c.intent, c.confidence)
        for flag in c.flags:
            if flag not in self.state.flags:
                self.state.flags.append(flag)
        await self.bus.publish(intent_event(self.call_id, c.intent, c.confidence, c.reason))
        return {"intent": c.intent, "confidence": c.confidence, "reason": c.reason}

    async def tool_lookup_patient(self, name: str, dob: str) -> dict:
        result = await run_policy_gated_tool(
            call_id=self.call_id, state=self.state, bus=self.bus,
            tool_name="lookup_patient", tool_input={"name": name, "dob": dob},
            action=lambda: self.ecw.lookup_patient(name, dob),
        )
        if result["ok"]:
            pt = result["data"]
            self.state.mark_identity(name=pt.get("name"), dob=pt.get("dob"),
                                     confidence=0.96, confirmed=True)
        return result

    async def tool_get_provider_availability(self, provider_or_body_part: str, visit_reason: str,
                                              preferred_date: Optional[str] = None) -> dict:
        resolved = await self.ecw.resolve_provider(provider_or_body_part)
        if resolved.get("ambiguous"):
            self.state.provider_confidence = resolved.get("confidence", 0.5)
            return {"ok": False, "ambiguous": True, "candidates": resolved.get("candidates", []),
                    "message": resolved.get("message", "Ambiguous provider name.")}
        if resolved.get("ok") and resolved.get("data"):
            prov = resolved["data"]
            self.state.mark_provider(prov["name"], confidence=resolved.get("confidence", 0.9))

        result = await run_policy_gated_tool(
            call_id=self.call_id, state=self.state, bus=self.bus,
            tool_name="get_provider_availability",
            tool_input={"providerOrBodyPart": provider_or_body_part, "visitReason": visit_reason},
            action=lambda: self.ecw.get_provider_availability(
                self.state.provider_name or provider_or_body_part, visit_reason, preferred_date),
        )
        if result["ok"]:
            slots = (result.get("data") or {}).get("slots", [])
            if slots:
                f = slots[0]
                self.state.mark_slot(f["slotId"], f["startLabel"], f.get("location", ""))
        return result

    async def tool_prepare_appointment_for_review(self, confirmed_by_caller: bool,
                                                   slot_id: str, provider_name: str, reason: str) -> dict:
        if confirmed_by_caller:
            self.state.mark_appointment_confirmed()
        result = await run_policy_gated_tool(
            call_id=self.call_id, state=self.state, bus=self.bus,
            tool_name="prepare_appointment_for_review",
            tool_input={"confirmedByCaller": confirmed_by_caller, "slotId": slot_id,
                        "providerName": provider_name, "reason": reason},
            action=lambda: self.ecw.prepare_appointment_for_review(
                self.state.appointment_draft.patient_id or "DEMO",
                provider_name, slot_id, reason),
        )
        if result["ok"]:
            self.state.review_status = "needs_review"
            await publish_review_from_output(
                call_id=self.call_id, bus=self.bus, tool_output=result,
                review_status="needs_review",
                summary=f"Appointment draft ready for staff review — {provider_name}",
            )
        return result

    async def tool_transfer_call(self, destination: str, reason: str) -> dict:
        return await run_policy_gated_tool(
            call_id=self.call_id, state=self.state, bus=self.bus,
            tool_name="transfer_call", tool_input={"destination": destination, "reason": reason},
            action=lambda: self.ecw.transfer_call(destination, reason),
        )

    async def tool_create_staff_task(self, task_type: str, summary: str) -> dict:
        return await run_policy_gated_tool(
            call_id=self.call_id, state=self.state, bus=self.bus,
            tool_name="create_staff_task", tool_input={"taskType": task_type, "summary": summary},
            action=lambda: self.ecw.create_staff_task(task_type, summary),
        )

    async def tool_flag_for_review(self, reason: str) -> dict:
        return await run_policy_gated_tool(
            call_id=self.call_id, state=self.state, bus=self.bus,
            tool_name="flag_for_review", tool_input={"reason": reason},
            action=lambda: self.ecw.create_staff_task("general_review", reason),
        )

    async def tool_log_patient_statement(self, patient_words: str, urgency_flags=None) -> dict:
        flags = urgency_flags or []
        return await run_policy_gated_tool(
            call_id=self.call_id, state=self.state, bus=self.bus,
            tool_name="log_patient_statement",
            tool_input={"patientWords": patient_words, "urgencyFlags": flags},
            action=lambda: self.ecw.log_patient_statement(patient_words, flags),
        )

    async def run_fallback(self, text: str) -> bool:
        """Deterministic keyword-based fallback for weak tool calling."""
        c = classify_intent_from_text(text)
        if c.intent == "unclear" or c.confidence < 0.6:
            return False

        logger.info("[SummitAgent] fallback triggered for intent: %s", c.intent)
        await self.tool_classify_intent(text)

        # Basic routing fallback
        if c.intent == "body_part_routing":
            await self.tool_get_provider_availability(text, "New patient scheduling")
        elif c.intent == "workers_comp":
            await self.tool_transfer_call("workers_comp", "Workers comp detected in fallback.")
        elif c.intent == "medical_question":
            await self.tool_log_patient_statement(text)
            await self.tool_create_staff_task("clinical_callback", "Medical question captured in fallback.")
        elif c.intent == "emergency":
            await self.tool_create_staff_task("emergency_escalation", "Emergency language detected in fallback.")
        
        return True


_has = {}
for name, mod in [
    ("openai", "livekit.plugins.openai"),
    ("deepgram", "livekit.plugins.deepgram"),
    ("cartesia", "livekit.plugins.cartesia"),
    ("silero", "livekit.plugins.silero"),
]:
    try:
        import importlib
        _has[name] = importlib.import_module(mod)
    except ImportError:
        _has[name] = None

try:
    from livekit.agents import WorkerOptions, cli, JobContext, JobProcess
    from livekit.agents.voice import AgentSession, Agent
    from livekit.agents import function_tool, RunContext

    class _LKAgent(Agent):
        def __init__(self):
            super().__init__(instructions=SYSTEM_INSTRUCTIONS)
            self._summit: Optional[SummitHealthAgent] = None

        @function_tool
        async def classify_call_intent(self, ctx: RunContext, caller_words: str) -> str:
            """Classify the caller's intent from their first statement."""
            return json.dumps(await self._summit.tool_classify_intent(caller_words) if self._summit else {})

        @function_tool
        async def lookup_patient(self, ctx: RunContext, name: str, dob: str) -> str:
            """Look up a patient by name and date of birth."""
            return json.dumps(await self._summit.tool_lookup_patient(name, dob) if self._summit else {})

        @function_tool
        async def get_provider_availability(self, ctx: RunContext, provider_or_body_part: str,
                                             visit_reason: str, preferred_date: str = "") -> str:
            """Get available appointment slots for a provider or body-part route."""
            return json.dumps(await self._summit.tool_get_provider_availability(
                provider_or_body_part, visit_reason, preferred_date or None) if self._summit else {})

        @function_tool
        async def prepare_appointment_for_review(self, ctx: RunContext, confirmed_by_caller: bool,
                                                  slot_id: str, provider_name: str, reason: str) -> str:
            """Prepare appointment draft for staff review (never writes to real EHR)."""
            return json.dumps(await self._summit.tool_prepare_appointment_for_review(
                confirmed_by_caller, slot_id, provider_name, reason) if self._summit else {})

        @function_tool
        async def transfer_call(self, ctx: RunContext, destination: str, reason: str) -> str:
            """Transfer call to workers_comp, billing, front_desk, or clinical_team."""
            return json.dumps(await self._summit.tool_transfer_call(destination, reason) if self._summit else {})

        @function_tool
        async def create_staff_task(self, ctx: RunContext, task_type: str, summary: str) -> str:
            """Create staff task for clinical_callback, scheduling_callback, or emergency_escalation."""
            return json.dumps(await self._summit.tool_create_staff_task(task_type, summary) if self._summit else {})

        @function_tool
        async def flag_for_review(self, ctx: RunContext, reason: str) -> str:
            """Flag this call for human review."""
            return json.dumps(await self._summit.tool_flag_for_review(reason) if self._summit else {})

        @function_tool
        async def log_patient_statement(self, ctx: RunContext, patient_words: str, urgency_flags: str = "") -> str:
            """Log patient's exact statement for clinical review (no medical interpretation)."""
            flags = [f.strip() for f in urgency_flags.split(",") if f.strip()] if urgency_flags else []
            return json.dumps(await self._summit.tool_log_patient_statement(patient_words, flags) if self._summit else {})

    async def _entrypoint(ctx: JobContext) -> None:
        logger.info("[SummitAgent] job received — room: %s", ctx.room.name)
        await ctx.connect()
        logger.info("[SummitAgent] room joined")
        call_id = make_call_id(ctx.room.name)
        scenario_id = CONFIG.default_scenario
        ecw = MockEcwAdapter(scenario_id)
        bus = SummitEventBus(ctx.room, CONFIG.event_topic, CONFIG.control_topic)
        summit = SummitHealthAgent(ctx.room, call_id, scenario_id, ecw, bus)
        t0 = time.monotonic()

        await bus.publish(session_event(call_id, "connected", "Summit agent joined LiveKit room"))
        await bus.publish(latency_event(call_id, "room_connect",
                                        int((time.monotonic() - t0) * 1000), target_ms=500))
        label, expected = SCENARIO_LABELS.get(scenario_id, (scenario_id, ""))
        await bus.publish(failure_event(call_id, scenario_id, label, expected))
        await bus.publish(session_event(call_id, "running", f"Ready — scenario: {label}"))

        @ctx.room.on("data_received")
        def _on_data(packet):
            if getattr(packet, "topic", None) != CONFIG.control_topic:
                return
            decoded = decode_control_packet(packet.data)
            if decoded:
                asyncio.ensure_future(summit.handle_control(decoded))

        lk_agent = _LKAgent()
        lk_agent._summit = summit

        # Build plugins
        kw = {}
        if _has["openai"] and CONFIG.has_llm:
            if CONFIG.llm_provider == "ollama":
                from openai import AsyncOpenAI
                client = AsyncOpenAI(
                    base_url=CONFIG.ollama_base_url,
                    api_key=CONFIG.ollama_api_key,
                    timeout=30.0,
                )
                kw["llm"] = _has["openai"].LLM(
                    model=CONFIG.local_llm_model,
                    client=client,
                )
            else:
                kw["llm"] = _has["openai"].LLM(model=CONFIG.llm_model)
        if _has["deepgram"] and CONFIG.has_stt:
            kw["stt"] = _has["deepgram"].STT(model="nova-3-medical")
        if _has["cartesia"] and CONFIG.has_tts:
            kw["tts"] = _has["cartesia"].TTS(model="sonic-2024-10-19", voice=CONFIG.tts_voice, speed=0.92)
        if _has["silero"]:
            kw["vad"] = _has["silero"].VAD.load()
        # turn_detection bypassed

        session = AgentSession(**kw)
        logger.info("[SummitAgent] AgentSession started")
        reply_lock = False

        @session.on("user_input_transcribed")
        def _on_user_tx(ev):
            nonlocal reply_lock
            # Handle both string and Transcription object
            text = ""
            if isinstance(ev, str):
                text = ev
            else:
                text = getattr(ev, "transcript", "") or getattr(ev, "text", "")
            
            is_final = getattr(ev, "is_final", True)
            if text:
                logger.info("[SummitAgent] caller transcript received (final=%s): %s", is_final, text)
                asyncio.ensure_future(bus.publish(transcript_event(call_id, "caller", text, is_final=is_final)))
                
                if is_final and not reply_lock:
                    logger.info("[SummitAgent] reply generation scheduled for: %s", text)
                    reply_lock = True
                    async def do_reply():
                        nonlocal reply_lock
                        try:
                            # Try fallback first if the model is local/weak
                            if CONFIG.llm_provider == "ollama":
                                handled = await summit.run_fallback(text)
                                if handled:
                                    logger.info("[SummitAgent] fallback handled response")
                                    # Still call generate_reply to let LLM speak if it wants
                                    await session.generate_reply()
                                    return

                            await session.generate_reply()
                        except Exception as e:
                            logger.error("[SummitAgent] reply error: %s", e)
                        finally:
                            reply_lock = False
                    asyncio.create_task(do_reply())
            else:
                logger.debug("[SummitAgent] empty transcript received")

        @session.on("llm_completion_failed")
        def _on_llm_fail(ev):
            logger.error("[SummitAgent] provider error: %s", ev)

        @session.on("tts_stream_failed")
        def _on_tts_fail(ev):
            logger.error("[SummitAgent] TTS error: %s", ev)

        @session.on("agent_state_changed")
        def _on_agent_state(ev):
            state_str = str(getattr(ev, "state", ev)).lower()
            if "speaking" in state_str or "listening" in state_str:
                asyncio.ensure_future(bus.publish(session_event(call_id, "running", f"Agent: {state_str}")))

        await session.start(room=ctx.room, agent=lk_agent)
        logger.info("[SummitAgent] starting initial greeting")
        await session.generate_reply(
            instructions="Greet the caller. Say: 'Thank you for calling Summit Orthopedics scheduling. How can I help you today?'"
        )

    def _prewarm(proc: JobProcess) -> None:
        if _has.get("silero"):
            try:
                proc.userdata["vad"] = _has["silero"].VAD.load()
            except Exception as exc:
                logger.warning("VAD prewarm failed: %s", exc)

    def _build_worker():
        return WorkerOptions(entrypoint_fnc=_entrypoint, prewarm_fnc=_prewarm, agent_name=CONFIG.agent_name)

except ImportError:
    def _build_worker():
        return None

def main():
    logging.basicConfig(level=logging.INFO,
                        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
    if not CONFIG.is_configured:
        print("\n[Summit Agent] LiveKit env not configured.\n"
              "  Set LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET in .env.local\n")
        sys.exit(1)
    
    worker_opts = _build_worker()
    if not worker_opts:
        print("\n[Summit Agent] ImportError: LiveKit packages not installed.\n  Run: pip install -r requirements.txt\n")
        sys.exit(1)
        
    cli.run_app(worker_opts)

if __name__ == "__main__":
    main()
