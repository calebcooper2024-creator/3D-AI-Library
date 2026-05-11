"""
Summit Health Voice Agent — policy_gate.py
Deterministic Python port of src/lib/summit/summitPolicyGate.ts.
The LLM proposes tools; this gate decides.
No LiveKit imports.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import List, Optional

from .workflow_state import SummitWorkflowState

# ── Tool sets ─────────────────────────────────────────────────────────────
SCHEDULING_TOOLS = {"lookup_patient", "get_provider_availability", "prepare_appointment_for_review"}
APPOINTMENT_WRITE_TOOLS = {"prepare_appointment_for_review"}
SAFE_ESCALATION_TOOLS = {"transfer_call", "create_staff_task", "flag_for_review", "log_patient_statement"}
ALL_TOOLS = list(SCHEDULING_TOOLS | SAFE_ESCALATION_TOOLS)


@dataclass
class PolicyResult:
    ok: bool
    gate: str
    decision: str          # pass | reject | clarify | transfer | review
    reason: str
    recommended_tool: Optional[str] = None
    blocked_tools: List[str] = field(default_factory=list)
    required_clarification: Optional[str] = None


def _pass(gate: str, reason: str, recommended_tool: Optional[str] = None) -> PolicyResult:
    return PolicyResult(ok=True, gate=gate, decision="pass", reason=reason, recommended_tool=recommended_tool)


def _reject(gate: str, reason: str, blocked: Optional[List[str]] = None, recommended: Optional[str] = None, clarify: Optional[str] = None) -> PolicyResult:
    return PolicyResult(ok=False, gate=gate, decision="reject", reason=reason,
                        blocked_tools=blocked or [], recommended_tool=recommended,
                        required_clarification=clarify)


def _clarify(gate: str, reason: str, blocked: Optional[List[str]] = None, clarification: Optional[str] = None) -> PolicyResult:
    return PolicyResult(ok=False, gate=gate, decision="clarify", reason=reason,
                        blocked_tools=blocked or [], required_clarification=clarification)


def _transfer(gate: str, reason: str) -> PolicyResult:
    return PolicyResult(ok=False, gate=gate, decision="transfer", reason=reason,
                        recommended_tool="transfer_call", blocked_tools=list(SCHEDULING_TOOLS))


def _review(gate: str, reason: str, ok: bool = True, recommended: Optional[str] = None) -> PolicyResult:
    return PolicyResult(ok=ok, gate=gate, decision="review", reason=reason,
                        recommended_tool=recommended)


# ── Main gate ─────────────────────────────────────────────────────────────
def evaluate_policy(state: SummitWorkflowState, tool: str) -> PolicyResult:
    """
    Evaluate whether a tool call is allowed given the current workflow state.
    This is the authoritative policy gate — mirrors evaluateSummitPolicy exactly.
    """
    intent = state.intent or "unclear"
    intent_confidence = state.intent_confidence
    flags = set(state.flags)
    demo_mode = True  # always true in this phase

    # 0. Low intent confidence
    if intent_confidence < 0.6 or intent == "unclear":
        return _clarify("tool_scope", "Intent confidence is too low for tool execution.",
                        blocked=ALL_TOOLS, clarification="Ask one clarifying question before using a tool.")

    # 1. Emergency
    if intent == "emergency" or "emergency" in flags:
        if tool in SCHEDULING_TOOLS:
            return _reject("emergency_escalation",
                           "Emergency language requires urgent escalation. Scheduling tools are blocked.",
                           blocked=list(SCHEDULING_TOOLS), recommended="create_staff_task")
        if tool in SAFE_ESCALATION_TOOLS:
            return _review("emergency_escalation", "Emergency language requires urgent escalation.", recommended="create_staff_task")

    # 2. Workers comp
    if intent == "workers_comp" or "workers_comp" in flags:
        if tool in SCHEDULING_TOOLS:
            return _transfer("workers_comp_block",
                             "Workers compensation scheduling is excluded from the MVP and must transfer.")
        if tool == "transfer_call":
            return _pass("workers_comp_block", "Workers compensation scheduling is excluded from the MVP and must transfer.",
                         recommended_tool="transfer_call")
        if tool in SAFE_ESCALATION_TOOLS:
            return _review("workers_comp_block", "Workers compensation scheduling is excluded from the MVP and must transfer.")

    # 3. Billing
    if intent == "billing" or "billing" in flags:
        if tool in SCHEDULING_TOOLS:
            return _transfer("billing_scope", "Billing belongs to the RCM queue and is outside scheduling scope.")
        if tool == "transfer_call":
            return _pass("billing_scope", "Billing belongs to the RCM queue and is outside scheduling scope.")
        if tool in SAFE_ESCALATION_TOOLS:
            return _review("billing_scope", "Billing belongs to the RCM queue and is outside scheduling scope.")

    # 4. Surgery
    if intent == "surgery_scheduling" or "surgery" in flags:
        if tool in SCHEDULING_TOOLS:
            return _transfer("surgery_scope", "Surgery scheduling is excluded and must be routed to staff.")
        if tool in SAFE_ESCALATION_TOOLS:
            return _review("surgery_scope", "Surgery scheduling is excluded and must be routed to staff.")

    # 5. Insurance
    if intent == "insurance_question" or "insurance" in flags:
        if tool in SCHEDULING_TOOLS:
            return _transfer("insurance_verification_block",
                             "Insurance verification is excluded. Route to staff rather than verifying benefits.")
        if tool in SAFE_ESCALATION_TOOLS:
            return _review("insurance_verification_block", "Insurance verification is excluded.")

    # 6. Medical question
    if intent == "medical_question" or "medical_question" in flags:
        if tool in {"log_patient_statement", "create_staff_task", "flag_for_review"}:
            return _review("medical_advice_block",
                           "Clinical content may be captured and escalated, but the agent must not answer it.",
                           recommended="create_staff_task")
        return _reject("medical_advice_block",
                       "The agent cannot provide medical advice or continue into scheduling while the clinical question is unresolved.",
                       blocked=list(SCHEDULING_TOOLS) + ["transfer_call"],
                       recommended="create_staff_task")

    # 7. EHR timeout
    if "ehr_timeout" in flags:
        if tool in {"create_staff_task", "flag_for_review"}:
            return _review("human_review_required", "EHR read failed. Staff review is required.",
                           recommended="create_staff_task")
        return _review("human_review_required",
                       "EHR read failed. The agent cannot invent availability.",
                       ok=False, recommended="create_staff_task")

    # 8. lookup_patient
    if tool == "lookup_patient":
        if state.identity.confidence < 0.8:
            return _clarify("identity_confirmation", "Name or date of birth confidence is too low for lookup.",
                            blocked=["lookup_patient"],
                            clarification="Read back the captured name and date of birth.")
        return _pass("identity_confirmation", "Identity fields are sufficient for a demo lookup.")

    # 9. get_provider_availability
    if tool == "get_provider_availability":
        if state.provider_confidence < 0.75:
            return _clarify("provider_confidence", "Provider or body-part routing confidence is too low.",
                            blocked=["get_provider_availability", "prepare_appointment_for_review"],
                            clarification="Clarify provider or body part before checking availability.")
        if "requested_slot_unavailable" in flags and not state.appointment_draft.slot_id:
            return _clarify("slot_availability", "Requested slot is unavailable. Caller must accept an alternative first.",
                            blocked=["prepare_appointment_for_review"],
                            clarification="Offer available alternatives or a staff callback.")
        return _pass("tool_scope", "Provider availability lookup is within scheduling scope.")

    # 10. prepare_appointment_for_review
    if tool in APPOINTMENT_WRITE_TOOLS:
        if demo_mode:
            if not state.identity.confirmed:
                return _clarify("identity_confirmation", "Appointment review requires confirmed identity.",
                                blocked=["prepare_appointment_for_review"],
                                clarification="Confirm caller identity before preparing a review record.")
            if not state.appointment_draft.caller_confirmed:
                return _clarify("appointment_confirmation",
                                "Appointment review requires explicit caller confirmation.",
                                blocked=["prepare_appointment_for_review"],
                                clarification="Read back provider, location, and time, then ask for explicit confirmation.")
            return _review("demo_write_guard",
                           "Demo mode converts appointment creation into a staff-review draft, not a real EHR write.",
                           recommended="prepare_appointment_for_review")
        return _review("demo_write_guard",
                       "Direct EHR writes remain disabled until a production approval gate exists.",
                       ok=False, recommended="flag_for_review")

    # 11. Safe escalation tools
    if tool in SAFE_ESCALATION_TOOLS:
        return _pass("tool_scope", "Escalation and documentation tool is within safe scope.")

    return _reject("tool_scope", f"Requested tool '{tool}' is not allowed in this workflow.",
                   blocked=[tool])
