"""
Summit Health Voice Agent — events.py
Python mirrors of the TypeScript SummitDemoEvent contract.
Every event must match the shape in src/lib/summit/summitEvents.ts.
No LiveKit imports — this module runs standalone.
"""
from __future__ import annotations

import time
from typing import Any, Dict, Optional

# ── Topic constants (must match summitLiveKit.ts) ──────────────────────────
EVENT_TOPIC = "summit.event"
CONTROL_TOPIC = "summit.control"
HEARTBEAT_TOPIC = "summit.heartbeat"

# ── Valid type literals ────────────────────────────────────────────────────
SESSION_STATUSES = {"idle", "starting", "connected", "running", "ended", "error"}
TOOL_NAMES = {
    "lookup_patient",
    "get_provider_availability",
    "prepare_appointment_for_review",
    "transfer_call",
    "create_staff_task",
    "flag_for_review",
    "log_patient_statement",
}
TOOL_STATUSES = {"requested", "approved", "rejected", "running", "succeeded", "failed"}
POLICY_DECISIONS = {"pass", "reject", "clarify", "transfer", "review"}
LATENCY_STAGES = {
    "room_connect",
    "stt_partial",
    "stt_final",
    "llm_ttft",
    "tts_first_byte",
    "eot_to_audio",
    "tool_roundtrip",
}
REVIEW_STATUSES = {"none", "needs_review", "approved", "corrected", "escalated", "transferred"}
SPEAKERS = {"caller", "agent"}


# ── Helpers ────────────────────────────────────────────────────────────────
def now_ms() -> int:
    """Return current time in milliseconds."""
    return int(time.time() * 1000)


def make_call_id(room_name: str = "") -> str:
    """Derive a callId from the LiveKit room name, or generate one."""
    if room_name:
        # strip "summit-demo-" prefix if present
        suffix = room_name.replace("summit-demo-", "").upper()
        return f"SUMMIT-LK-{suffix}"
    import random, string
    suffix = "".join(random.choices(string.ascii_uppercase + string.digits, k=8))
    return f"SUMMIT-LK-{suffix}"


def envelope(event: Dict[str, Any]) -> Dict[str, Any]:
    """Wrap a SummitDemoEvent in the { type, event } envelope the browser accepts."""
    return {"type": EVENT_TOPIC, "event": event}


# ── Event builders ─────────────────────────────────────────────────────────
def session_event(call_id: str, status: str, label: str) -> Dict[str, Any]:
    assert status in SESSION_STATUSES, f"Invalid session status: {status}"
    return {"type": "session", "callId": call_id, "status": status, "label": label, "ts": now_ms()}


def transcript_event(
    call_id: str,
    speaker: str,
    text: str,
    is_final: bool = True,
    confidence: Optional[float] = None,
) -> Dict[str, Any]:
    assert speaker in SPEAKERS, f"Invalid speaker: {speaker}"
    ev: Dict[str, Any] = {
        "type": "transcript",
        "callId": call_id,
        "speaker": speaker,
        "text": text,
        "isFinal": is_final,
        "ts": now_ms(),
    }
    if confidence is not None:
        ev["confidence"] = confidence
    return ev


def intent_event(
    call_id: str,
    intent: str,
    confidence: float,
    reason: str,
) -> Dict[str, Any]:
    return {
        "type": "intent",
        "callId": call_id,
        "intent": intent,
        "confidence": confidence,
        "reason": reason,
        "ts": now_ms(),
    }


def tool_event(
    call_id: str,
    tool: str,
    status: str,
    latency_ms: Optional[int] = None,
    input: Optional[Dict[str, Any]] = None,
    output: Optional[Dict[str, Any]] = None,
    reason: Optional[str] = None,
) -> Dict[str, Any]:
    assert tool in TOOL_NAMES, f"Invalid tool name: {tool}"
    assert status in TOOL_STATUSES, f"Invalid tool status: {status}"
    ev: Dict[str, Any] = {
        "type": "tool",
        "callId": call_id,
        "tool": tool,
        "status": status,
        "ts": now_ms(),
    }
    if latency_ms is not None:
        ev["latencyMs"] = latency_ms
    if input is not None:
        ev["input"] = input
    if output is not None:
        ev["output"] = output
    if reason is not None:
        ev["reason"] = reason
    return ev


def policy_event(
    call_id: str,
    gate: str,
    decision: str,
    reason: str,
) -> Dict[str, Any]:
    assert decision in POLICY_DECISIONS, f"Invalid policy decision: {decision}"
    return {
        "type": "policy",
        "callId": call_id,
        "gate": gate,
        "decision": decision,
        "reason": reason,
        "ts": now_ms(),
    }


def latency_event(
    call_id: str,
    stage: str,
    value_ms: int,
    target_ms: Optional[int] = None,
) -> Dict[str, Any]:
    assert stage in LATENCY_STAGES, f"Invalid latency stage: {stage}"
    ev: Dict[str, Any] = {
        "type": "latency",
        "callId": call_id,
        "stage": stage,
        "valueMs": value_ms,
        "ts": now_ms(),
    }
    if target_ms is not None:
        ev["targetMs"] = target_ms
    return ev


def review_event(
    call_id: str,
    status: str,
    summary: str,
    payload: Dict[str, Any],
) -> Dict[str, Any]:
    assert status in REVIEW_STATUSES, f"Invalid review status: {status}"
    return {
        "type": "review",
        "callId": call_id,
        "status": status,
        "summary": summary,
        "payload": payload,
        "ts": now_ms(),
    }


def failure_event(
    call_id: str,
    scenario: str,
    label: str,
    expected_behavior: str,
) -> Dict[str, Any]:
    return {
        "type": "failure",
        "callId": call_id,
        "scenario": scenario,
        "label": label,
        "expectedBehavior": expected_behavior,
        "ts": now_ms(),
    }
