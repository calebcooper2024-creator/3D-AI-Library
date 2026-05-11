#!/usr/bin/env python3
"""
scripts/verify-summit-agent-contract.py
Standalone contract verifier for the Phase 4 Python LiveKit agent.
Does NOT import LiveKit. Runs before pip install.

Expected output:
  Summit Python agent contract: PASS
"""
import sys
import json
import asyncio
from pathlib import Path

ROOT = Path(__file__).parent.parent
AGENT_DIR = ROOT / "agents" / "summit_voice_agent"

ERRORS = []
PASSES = []

def ok(msg):
    PASSES.append(msg)
    print(f"  [PASS] {msg}")

def fail(msg):
    ERRORS.append(msg)
    print(f"  [FAIL] {msg}")


# -- 1. File existence checks -----------------------------------------------
print("\nChecking agent folder structure...")
required_files = [
    "agents/summit_voice_agent/__init__.py",
    "agents/summit_voice_agent/agent.py",
    "agents/summit_voice_agent/config.py",
    "agents/summit_voice_agent/events.py",
    "agents/summit_voice_agent/event_bus.py",
    "agents/summit_voice_agent/workflow_state.py",
    "agents/summit_voice_agent/policy_gate.py",
    "agents/summit_voice_agent/mock_ecw.py",
    "agents/summit_voice_agent/tools.py",
    "agents/summit_voice_agent/contract_replay.py",
    "agents/summit_voice_agent/requirements.txt",
    "agents/summit_voice_agent/.env.example",
    "agents/summit_voice_agent/README.md",
    "scripts/verify-summit-agent-contract.py",
    "docs/summit-livekit-agent-phase4.md",
]

for rel in required_files:
    p = ROOT / rel
    if p.exists():
        ok(f"{rel} exists")
    else:
        fail(f"MISSING: {rel}")


# -- 2. Add agent dir to path and import contract modules -------------------
sys.path.insert(0, str(ROOT / "agents"))

try:
    from summit_voice_agent.events import (
        EVENT_TOPIC, CONTROL_TOPIC,
        session_event, transcript_event, intent_event,
        tool_event, policy_event, latency_event, review_event, failure_event,
        envelope, make_call_id,
    )
    ok("events.py imports clean")
except Exception as exc:
    fail(f"events.py import failed: {exc}")
    sys.exit(1)


# -- 3. Topic constants -----------------------------------------------------
print("\nChecking topic constants...")
if EVENT_TOPIC == "summit.event":
    ok("EVENT_TOPIC == summit.event")
else:
    fail(f"EVENT_TOPIC is '{EVENT_TOPIC}', expected 'summit.event'")

if CONTROL_TOPIC == "summit.control":
    ok("CONTROL_TOPIC == summit.control")
else:
    fail(f"CONTROL_TOPIC is '{CONTROL_TOPIC}', expected 'summit.control'")


# -- 4. Envelope shape ------------------------------------------------------
print("\nChecking envelope format...")
call_id = make_call_id("summit-demo-VERIFY01")
ev = session_event(call_id, "connected", "test")
wrapped = envelope(ev)
assert wrapped["type"] == "summit.event", "Envelope type must be 'summit.event'"
assert "event" in wrapped, "Envelope must contain 'event' key"
assert wrapped["event"]["type"] == "session", "Inner event type must be 'session'"
ok("Envelope shape: { type: 'summit.event', event: { ... } }")


# -- 5. All 8 event types buildable -----------------------------------------
print("\nChecking event builders...")
try:
    session_event(call_id, "running", "test")
    ok("session_event builds")
    transcript_event(call_id, "caller", "knee pain")
    ok("transcript_event builds")
    intent_event(call_id, "body_part_routing", 0.9, "knee detected")
    ok("intent_event builds")
    tool_event(call_id, "lookup_patient", "requested")
    ok("tool_event builds")
    policy_event(call_id, "identity_confirmation", "pass", "ok")
    ok("policy_event builds")
    latency_event(call_id, "tool_roundtrip", 52, target_ms=500)
    ok("latency_event builds")
    review_event(call_id, "needs_review", "draft ready", {})
    ok("review_event builds")
    failure_event(call_id, "normal_scheduling_knee", "label", "expected")
    ok("failure_event builds")
except Exception as exc:
    fail(f"Event builder error: {exc}")


# -- 6. Workflow state + intent classifier ----------------------------------
print("\nChecking workflow state and classifier...")
try:
    from summit_voice_agent.workflow_state import (
        create_workflow_state, classify_intent_from_text, SUPPORTED_SCENARIOS
    )
    ok("workflow_state imports clean")
except Exception as exc:
    fail(f"workflow_state import failed: {exc}")
    sys.exit(1)

for sc in [
    "normal_scheduling_knee", "workers_comp_transfer", "medical_question_escalation",
    "ambiguous_provider_name", "ecw_timeout", "unavailable_slot",
    "slow_elderly_caller", "billing_transfer",
]:
    if sc in SUPPORTED_SCENARIOS:
        ok(f"Scenario '{sc}' exists")
    else:
        fail(f"Missing scenario: {sc}")


# -- 7. Policy gate checks --------------------------------------------------
print("\nChecking policy gate...")
try:
    from summit_voice_agent.policy_gate import evaluate_policy
    ok("policy_gate imports clean")
except Exception as exc:
    fail(f"policy_gate import failed: {exc}")
    sys.exit(1)

# workers_comp blocks lookup_patient
state_wc = create_workflow_state("WC-TEST", "workers_comp_transfer")
state_wc.set_intent("workers_comp", 0.98)
p = evaluate_policy(state_wc, "lookup_patient")
if not p.ok:
    ok("workers_comp blocks lookup_patient (scheduling)")
else:
    fail("workers_comp should block lookup_patient")

# workers_comp allows transfer_call
p_xfer = evaluate_policy(state_wc, "transfer_call")
if p_xfer.ok:
    ok("workers_comp allows transfer_call")
else:
    fail("workers_comp should allow transfer_call")

# medical_question blocks get_provider_availability
state_mq = create_workflow_state("MQ-TEST", "medical_question_escalation")
state_mq.set_intent("medical_question", 0.95)
state_mq.mark_provider("Dr. Chen", 0.9)
p_mq = evaluate_policy(state_mq, "get_provider_availability")
if not p_mq.ok:
    ok("medical_question blocks get_provider_availability")
else:
    fail("medical_question should block get_provider_availability")

# medical_question allows log_patient_statement
p_log = evaluate_policy(state_mq, "log_patient_statement")
if p_log.ok:
    ok("medical_question allows log_patient_statement")
else:
    fail("medical_question should allow log_patient_statement")

# appointment review requires identity
state_appt = create_workflow_state("APPT-TEST", "normal_scheduling_knee")
state_appt.set_intent("body_part_routing", 0.9)
state_appt.mark_provider("Dr. Chen", 0.94)
p_no_id = evaluate_policy(state_appt, "prepare_appointment_for_review")
if not p_no_id.ok and p_no_id.decision == "clarify":
    ok("appointment review requires identity (clarify without identity)")
else:
    fail("appointment review should require identity")

# appointment review requires explicit confirmation
state_appt.mark_identity(name="Jordan Miles", dob="04/18/1974", confidence=0.95, confirmed=True)
p_no_confirm = evaluate_policy(state_appt, "prepare_appointment_for_review")
if not p_no_confirm.ok and p_no_confirm.decision == "clarify":
    ok("appointment review requires explicit caller confirmation")
else:
    fail("appointment review should require caller confirmation")

# appointment review passes after both
state_appt.mark_appointment_confirmed()
p_pass = evaluate_policy(state_appt, "prepare_appointment_for_review")
if p_pass.ok and p_pass.decision == "review":
    ok("appointment review passes after identity + confirmation")
else:
    fail(f"appointment review should pass after both, got: ok={p_pass.ok} decision={p_pass.decision}")


# -- 8. contract_replay produces required event types ----------------------
print("\nRunning contract_replay...")
try:
    from summit_voice_agent.contract_replay import _run_replay
    events = asyncio.run(_run_replay("normal_scheduling_knee"))
    ev_types = {e["event"]["type"] for e in events}
    for required in ["session", "transcript", "intent", "tool", "policy", "latency", "review", "failure"]:
        if required in ev_types:
            ok(f"Replay emits '{required}' events")
        else:
            fail(f"Replay missing event type: {required}")
except Exception as exc:
    fail(f"contract_replay failed: {exc}")


# -- Final verdict ----------------------------------------------------------
print(f"\n{'--'*25}")
print(f"  {len(PASSES)} checks passed, {len(ERRORS)} failed")
if ERRORS:
    for e in ERRORS:
        print(f"  FAIL: {e}")
    print("\nSummit Python agent contract: FAIL")
    sys.exit(1)
else:
    print("\nSummit Python agent contract: PASS")
    sys.exit(0)
