"""
Summit Health Voice Agent — contract_replay.py
Offline smoke test. No LiveKit required.
Prints sample summit.event envelope trace to prove event shape.
"""
from __future__ import annotations

import json
import os
import sys
from pathlib import Path

if __name__ in ("__main__", "__mp_main__"):
    sys.path.insert(0, str(Path(__file__).parent.parent))
    __package__ = "summit_voice_agent"
from .events import (
    make_call_id, envelope,
    session_event, transcript_event, intent_event,
    tool_event, policy_event, latency_event, review_event, failure_event,
)
from .policy_gate import evaluate_policy
from .workflow_state import create_workflow_state, classify_intent_from_text
from .mock_ecw import MockEcwAdapter
import asyncio


async def _run_replay(scenario_id: str = "normal_scheduling_knee") -> list:
    call_id = make_call_id("summit-demo-REPLAY01")
    state = create_workflow_state(call_id, scenario_id)
    ecw = MockEcwAdapter(scenario_id)
    events = []

    def emit(ev):
        wrapped = envelope(ev)
        events.append(wrapped)
        print(json.dumps(wrapped, indent=2))
        return wrapped

    emit(session_event(call_id, "connected", "Agent joined room"))
    emit(failure_event(call_id, scenario_id, f"Scenario: {scenario_id}", "See expected behavior in scenario config."))

    # Simulate caller intent
    caller_text = "I need an appointment for knee pain"
    emit(transcript_event(call_id, "caller", caller_text, is_final=True))

    classification = classify_intent_from_text(caller_text)
    state.set_intent(classification.intent, classification.confidence)
    emit(intent_event(call_id, classification.intent, classification.confidence, classification.reason))

    # Tool: lookup_patient — policy gate check
    state.mark_identity(name="Jordan Miles", dob="04/18/1974", confidence=0.95)
    policy = evaluate_policy(state, "lookup_patient")
    emit(tool_event(call_id, "lookup_patient", "requested", input={"name": "Jordan Miles", "dob": "04/18/1974"}))
    emit(policy_event(call_id, policy.gate, policy.decision, policy.reason))

    if policy.ok:
        emit(tool_event(call_id, "lookup_patient", "approved"))
        result = await ecw.lookup_patient("Jordan Miles", "04/18/1974")
        emit(tool_event(call_id, "lookup_patient", "succeeded", latency_ms=52, output=result.get("data", {})))
        emit(latency_event(call_id, "tool_roundtrip", 52, target_ms=500))
        if result.get("ok"):
            state.mark_identity(confirmed=True, confidence=0.96)

    # Tool: get_provider_availability
    state.mark_provider("Dr. Chen", confidence=0.94)
    policy2 = evaluate_policy(state, "get_provider_availability")
    emit(tool_event(call_id, "get_provider_availability", "requested", input={"providerOrBodyPart": "knee"}))
    emit(policy_event(call_id, policy2.gate, policy2.decision, policy2.reason))

    if policy2.ok:
        emit(tool_event(call_id, "get_provider_availability", "approved"))
        avail = await ecw.get_provider_availability("Dr. Chen", "knee pain")
        if avail.get("ok"):
            slots = avail["data"]["slots"]
            emit(tool_event(call_id, "get_provider_availability", "succeeded",
                            latency_ms=78, output={"provider": avail["data"]["provider"], "slotCount": len(slots)}))
            emit(latency_event(call_id, "tool_roundtrip", 78, target_ms=500))
            if slots:
                first = slots[0]
                state.mark_slot(first["slotId"], first["startLabel"], first.get("location", ""))

    # Tool: prepare_appointment_for_review
    state.mark_appointment_confirmed()
    policy3 = evaluate_policy(state, "prepare_appointment_for_review")
    emit(tool_event(call_id, "prepare_appointment_for_review", "requested",
                    input={"confirmedByCaller": True, "providerName": "Dr. Chen"}))
    emit(policy_event(call_id, policy3.gate, policy3.decision, policy3.reason))

    if policy3.ok:
        emit(tool_event(call_id, "prepare_appointment_for_review", "approved"))
        appt = await ecw.prepare_appointment_for_review("PT-1001", "Dr. Chen", "DR-CHEN-SLOT-001", "knee pain")
        emit(tool_event(call_id, "prepare_appointment_for_review", "succeeded",
                        latency_ms=41, output=appt.get("data", {})))
        emit(review_event(call_id, "needs_review",
                         "Appointment draft ready for staff review — Dr. Chen",
                         appt.get("data", {})))
        emit(latency_event(call_id, "tool_roundtrip", 41, target_ms=500))

    emit(session_event(call_id, "ended", "Replay complete"))
    return events


async def _workers_comp_replay() -> list:
    """Verify workers comp blocks scheduling and allows transfer."""
    call_id = make_call_id("summit-demo-REPLAY-WC")
    state = create_workflow_state(call_id, "workers_comp_transfer")
    events = []

    def emit(ev):
        events.append(envelope(ev))
        return ev

    caller_text = "I was hurt at work and need to see someone"
    classification = classify_intent_from_text(caller_text)
    state.set_intent(classification.intent, classification.confidence)
    emit(intent_event(call_id, classification.intent, classification.confidence, classification.reason))
    emit(transcript_event(call_id, "caller", caller_text))

    # scheduling blocked
    policy_sched = evaluate_policy(state, "lookup_patient")
    emit(policy_event(call_id, policy_sched.gate, policy_sched.decision, policy_sched.reason))
    assert not policy_sched.ok, "workers_comp must block lookup_patient"

    # transfer allowed
    policy_xfer = evaluate_policy(state, "transfer_call")
    emit(policy_event(call_id, policy_xfer.gate, policy_xfer.decision, policy_xfer.reason))
    assert policy_xfer.ok, "workers_comp must allow transfer_call"

    return events


async def _medical_question_replay() -> list:
    """Verify medical question blocks scheduling and allows log_patient_statement."""
    call_id = make_call_id("summit-demo-REPLAY-MQ")
    state = create_workflow_state(call_id, "medical_question_escalation")
    events = []

    def emit(ev):
        events.append(envelope(ev))
        return ev

    caller_text = "Is this knee swelling dangerous?"
    classification = classify_intent_from_text(caller_text)
    state.set_intent(classification.intent, classification.confidence)
    emit(transcript_event(call_id, "caller", caller_text))

    # availability blocked
    state.mark_provider("Dr. Chen", 0.9)
    policy_avail = evaluate_policy(state, "get_provider_availability")
    emit(policy_event(call_id, policy_avail.gate, policy_avail.decision, policy_avail.reason))
    assert not policy_avail.ok, "medical_question must block get_provider_availability"

    # log_patient_statement allowed
    policy_log = evaluate_policy(state, "log_patient_statement")
    emit(policy_event(call_id, policy_log.gate, policy_log.decision, policy_log.reason))
    assert policy_log.ok, "medical_question must allow log_patient_statement"

    return events


def run_replay():
    print("\n=== Summit Agent Contract Replay ===\n")
    print("--- Scenario: normal_scheduling_knee ---")
    events = asyncio.run(_run_replay("normal_scheduling_knee"))

    print("\n--- Scenario: workers_comp_transfer (policy only) ---")
    asyncio.run(_workers_comp_replay())
    print("  workers_comp blocks scheduling: OK")
    print("  workers_comp allows transfer: OK")

    print("\n--- Scenario: medical_question_escalation (policy only) ---")
    asyncio.run(_medical_question_replay())
    print("  medical_question blocks availability: OK")
    print("  medical_question allows log_patient_statement: OK")

    print("\n=== All contract checks passed ===")

    # Verify event types present in normal replay
    ev_types = {e["event"]["type"] for e in events}
    for required in ["session", "transcript", "intent", "tool", "policy", "latency", "review", "failure"]:
        assert required in ev_types, f"Missing event type in replay: {required}"
    print(f"Event types present: {sorted(ev_types)}")

    return True


if __name__ == "__main__":
    run_replay()
