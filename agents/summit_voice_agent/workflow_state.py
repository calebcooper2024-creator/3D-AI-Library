"""
Summit Health Voice Agent — workflow_state.py
Deterministic call-state machine ported from src/lib/summit/summitWorkflow.ts.
No LiveKit imports — pure Python dataclasses.
"""
from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Any


# ── Supported scenarios ───────────────────────────────────────────────────
SUPPORTED_SCENARIOS = {
    "normal_scheduling_knee",
    "workers_comp_transfer",
    "medical_question_escalation",
    "ambiguous_provider_name",
    "ecw_timeout",
    "unavailable_slot",
    "slow_elderly_caller",
    "billing_transfer",
}

# ── Supported intents ─────────────────────────────────────────────────────
SUPPORTED_INTENTS = {
    "schedule_new_patient",
    "schedule_existing_patient",
    "referred_provider",
    "body_part_routing",
    "billing",
    "workers_comp",
    "medical_question",
    "reschedule_or_cancel",
    "surgery_scheduling",
    "insurance_question",
    "unclear",
    "emergency",
}

# ── Workflow flags ────────────────────────────────────────────────────────
WORKFLOW_FLAGS = {
    "workers_comp",
    "medical_question",
    "billing",
    "emergency",
    "surgery",
    "insurance",
    "low_identity_confidence",
    "low_provider_confidence",
    "requested_slot_unavailable",
    "ehr_timeout",
    "human_review_required",
}


@dataclass
class SummitIdentityCapture:
    name: Optional[str] = None
    dob: Optional[str] = None
    confidence: float = 0.0
    confirmed: bool = False


@dataclass
class SummitAppointmentDraft:
    patient_id: Optional[str] = None
    provider_id: Optional[str] = None
    provider_name: Optional[str] = None
    slot_id: Optional[str] = None
    slot_label: Optional[str] = None
    location: Optional[str] = None
    reason: Optional[str] = None
    caller_confirmed: bool = False


@dataclass
class SummitWorkflowState:
    call_id: str
    scenario_id: str = "normal_scheduling_knee"
    stage: str = "idle"
    intent: Optional[str] = None
    intent_confidence: float = 0.0
    flags: List[str] = field(default_factory=list)
    identity: SummitIdentityCapture = field(default_factory=SummitIdentityCapture)
    provider_name: Optional[str] = None
    provider_confidence: float = 0.88
    patient: Optional[Dict[str, Any]] = None
    candidate_providers: List[Dict[str, Any]] = field(default_factory=list)
    candidate_slots: List[Dict[str, Any]] = field(default_factory=list)
    appointment_draft: SummitAppointmentDraft = field(default_factory=SummitAppointmentDraft)
    review_status: str = "none"
    metadata: Dict[str, Any] = field(default_factory=dict)

    # ── Mutators ──────────────────────────────────────────────────────────

    def set_scenario(self, scenario_id: str) -> None:
        if scenario_id in SUPPORTED_SCENARIOS:
            self.scenario_id = scenario_id
            # Apply scenario-specific flags
            if scenario_id == "workers_comp_transfer":
                self._add_flag("workers_comp")
            elif scenario_id == "medical_question_escalation":
                self._add_flag("medical_question")
            elif scenario_id == "ecw_timeout":
                self._add_flag("ehr_timeout")
            elif scenario_id == "unavailable_slot":
                self._add_flag("requested_slot_unavailable")
            elif scenario_id == "billing_transfer":
                self._add_flag("billing")

    def set_intent(self, intent: str, confidence: float) -> None:
        if intent in SUPPORTED_INTENTS:
            self.intent = intent
            self.intent_confidence = confidence
            self.stage = "classifying"

    def mark_identity(
        self,
        name: Optional[str] = None,
        dob: Optional[str] = None,
        confidence: float = 0.9,
        confirmed: bool = False,
    ) -> None:
        if name:
            self.identity.name = name
        if dob:
            self.identity.dob = dob
        self.identity.confidence = confidence
        self.identity.confirmed = confirmed

    def mark_provider(self, provider_name: str, confidence: float = 0.9) -> None:
        self.provider_name = provider_name
        self.provider_confidence = confidence

    def mark_slot(self, slot_id: str, slot_label: str, location: str = "") -> None:
        self.appointment_draft.slot_id = slot_id
        self.appointment_draft.slot_label = slot_label
        self.appointment_draft.location = location

    def mark_appointment_confirmed(self) -> None:
        self.appointment_draft.caller_confirmed = True
        self.stage = "confirming"

    def _add_flag(self, flag: str) -> None:
        if flag not in self.flags:
            self.flags.append(flag)

    def has_flag(self, flag: str) -> bool:
        return flag in self.flags


def create_workflow_state(call_id: str, scenario_id: str = "normal_scheduling_knee") -> SummitWorkflowState:
    state = SummitWorkflowState(call_id=call_id)
    state.set_scenario(scenario_id)
    return state


# ── Intent classifier ─────────────────────────────────────────────────────
@dataclass
class IntentClassification:
    intent: str
    confidence: float
    reason: str
    flags: List[str]


def classify_intent_from_text(text: str) -> IntentClassification:
    """Deterministic keyword-based classifier mirroring classifySummitIntentFromText."""
    t = text.lower()
    flags: List[str] = []

    if re.search(r"\b(911|emergency|can't breathe|cant breathe|chest pain|stroke|passed out)\b", t):
        flags.append("emergency")
        return IntentClassification("emergency", 0.98, "Emergency language detected.", flags)

    if re.search(r"\b(work injury|workers comp|worker's comp|work comp|hurt at work|on the job)\b", t):
        flags.append("workers_comp")
        return IntentClassification("workers_comp", 0.98, "Caller described an injury connected to work.", flags)

    if re.search(r"\b(bill|billing|statement|invoice|charged|payment)\b", t):
        flags.append("billing")
        return IntentClassification("billing", 0.96, "Caller asked about billing or payment.", flags)

    if re.search(r"\b(swollen|swelling|medicine|medication|dangerous|should i take|what should i do|pain medicine)\b", t):
        flags.append("medical_question")
        return IntentClassification("medical_question", 0.95, "Caller requested clinical interpretation or medical guidance.", flags)

    if re.search(r"\b(surgery|operation|post op|post-op|pre op|pre-op)\b", t):
        flags.append("surgery")
        return IntentClassification("surgery_scheduling", 0.93, "Caller referenced surgery scheduling or post-operative workflow.", flags)

    if re.search(r"\b(insurance|authorization|prior auth|referral|benefits|coverage)\b", t):
        flags.append("insurance")
        return IntentClassification("insurance_question", 0.88, "Caller asked about insurance, referral, or authorization handling.", flags)

    if re.search(r"\b(reschedule|cancel|move my appointment|change my appointment)\b", t):
        return IntentClassification("reschedule_or_cancel", 0.9, "Caller asked to change an existing appointment.", flags)

    if re.search(r"\b(dr\.?|doctor)\s+[a-z]+", t):
        return IntentClassification("referred_provider", 0.86, "Caller mentioned a provider by name.", flags)

    if re.search(r"\b(knee|hip|shoulder|elbow|hand|wrist|back|neck|spine|foot|ankle)\b", t):
        return IntentClassification("body_part_routing", 0.9, "Caller mentioned an orthopedic body part for routing.", flags)

    if re.search(r"\b(appointment|schedule|book|available|availability|new patient|existing patient)\b", t):
        intent = "schedule_new_patient" if "new patient" in t else "schedule_existing_patient"
        return IntentClassification(intent, 0.84, "Caller asked for scheduling.", flags)

    return IntentClassification("unclear", 0.45, "No high-confidence supported Summit workflow was detected.", flags)
