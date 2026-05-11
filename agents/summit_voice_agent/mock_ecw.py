"""
Summit Health Voice Agent — mock_ecw.py
Fake eClinicalWorks adapter.
No real network calls. No real PHI. No real appointment writes.
All appointment creation returns staff_review_only.
"""
from __future__ import annotations

import asyncio
import random
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional


# ── Demo patients ─────────────────────────────────────────────────────────
DEMO_PATIENTS = {
    "PT-1001": {"patientId": "PT-1001", "name": "Jordan Miles", "dob": "04/18/1974", "status": "existing"},
    "PT-1002": {"patientId": "PT-1002", "name": "Maria Rivera", "dob": "09/03/1952", "status": "existing"},
    "PT-1003": {"patientId": "PT-1003", "name": "Caleb Demo", "dob": "01/15/1994", "status": "existing"},
}

# ── Demo providers ────────────────────────────────────────────────────────
DEMO_PROVIDERS = {
    "DR-CHEN": {
        "id": "DR-CHEN",
        "name": "Dr. Chen",
        "specialties": ["hip", "knee", "sports medicine"],
        "location": "Summit Main Office",
        "npi": "DEMO-NPI-001",
    },
    "DR-COHEN": {
        "id": "DR-COHEN",
        "name": "Dr. Cohen",
        "specialties": ["hand", "wrist", "elbow"],
        "location": "Summit East",
        "npi": "DEMO-NPI-002",
    },
    "DR-PATEL": {
        "id": "DR-PATEL",
        "name": "Dr. Patel",
        "specialties": ["shoulder", "elbow"],
        "location": "Summit Main Office",
        "npi": "DEMO-NPI-003",
    },
    "DR-WILLIAMS": {
        "id": "DR-WILLIAMS",
        "name": "Dr. Williams",
        "specialties": ["spine", "back", "neck"],
        "location": "Summit West",
        "npi": "DEMO-NPI-004",
    },
    "DR-RODRIGUEZ": {
        "id": "DR-RODRIGUEZ",
        "name": "Dr. Rodriguez",
        "specialties": ["foot", "ankle"],
        "location": "Summit East",
        "npi": "DEMO-NPI-005",
    },
}

BODY_PART_ROUTING: Dict[str, str] = {
    "knee": "DR-CHEN",
    "hip": "DR-CHEN",
    "sports medicine": "DR-CHEN",
    "hand": "DR-COHEN",
    "wrist": "DR-COHEN",
    "elbow": "DR-COHEN",
    "shoulder": "DR-PATEL",
    "spine": "DR-WILLIAMS",
    "back": "DR-WILLIAMS",
    "neck": "DR-WILLIAMS",
    "foot": "DR-RODRIGUEZ",
    "ankle": "DR-RODRIGUEZ",
}

# ── Mock slots ────────────────────────────────────────────────────────────
def _make_slots(provider_id: str, location: str, count: int = 4) -> List[Dict[str, Any]]:
    days = ["Tomorrow", "Wednesday", "Thursday", "Friday"]
    times = ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM"]
    return [
        {
            "slotId": f"{provider_id}-SLOT-{i+1:03d}",
            "providerId": provider_id,
            "startLabel": f"{days[i % len(days)]} at {times[i % len(times)]}",
            "duration": 30,
            "location": location,
            "visitType": "New Patient" if i == 0 else "Established Patient",
        }
        for i in range(count)
    ]


# ── Scenario-aware adapter ─────────────────────────────────────────────────
class MockEcwAdapter:
    def __init__(self, scenario_id: str = "normal_scheduling_knee"):
        self.scenario_id = scenario_id

    def _should_timeout(self) -> bool:
        return self.scenario_id == "ecw_timeout"

    def _is_ambiguous(self) -> bool:
        return self.scenario_id == "ambiguous_provider_name"

    def _is_unavailable(self) -> bool:
        return self.scenario_id == "unavailable_slot"

    async def lookup_patient(self, name: str, dob: str) -> Dict[str, Any]:
        await asyncio.sleep(0.05)  # simulate minimal latency
        if self._should_timeout():
            return {"ok": False, "error": "timeout", "message": "eClinicalWorks lookup timed out. Staff callback required."}

        name_lower = name.lower().strip()
        for patient in DEMO_PATIENTS.values():
            if name_lower in patient["name"].lower():
                if not dob or dob in patient["dob"]:
                    return {"ok": True, "data": dict(patient)}
                return {"ok": False, "error": "dob_mismatch", "message": "Date of birth does not match the record on file. Please confirm."}
        return {"ok": False, "error": "not_found", "message": f"No patient found matching '{name}'. Try new patient flow or verify spelling."}

    async def resolve_provider(self, provider_or_body_part: str) -> Dict[str, Any]:
        """Returns one or two providers depending on scenario."""
        await asyncio.sleep(0.03)
        text = provider_or_body_part.lower().strip()

        if self._is_ambiguous():
            # Return two candidates to force clarification
            return {
                "ok": True,
                "ambiguous": True,
                "confidence": 0.62,
                "candidates": [DEMO_PROVIDERS["DR-CHEN"], DEMO_PROVIDERS["DR-COHEN"]],
                "message": "Did you mean Dr. Chen (hip/knee) or Dr. Cohen (hand/wrist)? They sound similar.",
            }

        # Body part routing
        for part, pid in BODY_PART_ROUTING.items():
            if part in text:
                return {"ok": True, "data": DEMO_PROVIDERS[pid], "confidence": 0.94}

        # Provider name routing
        for pid, provider in DEMO_PROVIDERS.items():
            if provider["name"].lower().replace("dr. ", "") in text:
                return {"ok": True, "data": provider, "confidence": 0.96}

        return {"ok": False, "error": "not_found",
                "message": f"Could not route '{provider_or_body_part}' to a provider. Please clarify the area of concern."}

    async def get_provider_availability(
        self, provider_name: str, visit_reason: str, preferred_date: Optional[str] = None
    ) -> Dict[str, Any]:
        await asyncio.sleep(0.08)
        if self._should_timeout():
            return {"ok": False, "error": "timeout", "message": "Availability lookup timed out. Staff callback required."}

        # Find provider
        provider = None
        for p in DEMO_PROVIDERS.values():
            if p["name"].lower() in provider_name.lower() or provider_name.lower() in p["name"].lower():
                provider = p
                break

        if not provider:
            return {"ok": False, "error": "not_found", "message": f"Provider '{provider_name}' not found in the demo roster."}

        slots = _make_slots(provider["id"], provider["location"])

        if self._is_unavailable():
            # First slot unavailable, return alternatives only
            alternatives = slots[1:]
            return {
                "ok": False,
                "error": "unavailable",
                "message": f"The requested slot is unavailable. Alternatives available.",
                "candidates": alternatives,
                "provider": provider,
            }

        return {"ok": True, "data": {"provider": provider, "slots": slots}}

    async def prepare_appointment_for_review(
        self,
        patient_id: str,
        provider_name: str,
        slot_id: str,
        reason: str,
    ) -> Dict[str, Any]:
        """Always returns staff_review_only — never a real EHR write."""
        await asyncio.sleep(0.04)
        review_id = f"REVIEW-{slot_id[-6:]}-DEMO"
        return {
            "ok": True,
            "data": {
                "reviewId": review_id,
                "status": "staff_review_only",
                "patientId": patient_id,
                "providerName": provider_name,
                "slotId": slot_id,
                "reason": reason,
                "message": "Appointment draft created for staff review. No EHR write was performed.",
                "disclaimer": "Demo mode: this is not a real appointment.",
            },
        }

    async def create_staff_task(
        self,
        task_type: str,
        summary: str,
        payload: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        await asyncio.sleep(0.02)
        task_id = f"TASK-{task_type.upper()[:6]}-DEMO"
        return {
            "ok": True,
            "data": {
                "taskId": task_id,
                "taskType": task_type,
                "summary": summary,
                "payload": payload or {},
                "queue": "front_desk",
                "status": "pending_review",
            },
        }

    async def transfer_call(self, destination: str, reason: str) -> Dict[str, Any]:
        await asyncio.sleep(0.02)
        transfer_map = {
            "workers_comp": "Workers Compensation Coordinator",
            "billing": "Revenue Cycle Management Queue",
            "surgery_scheduler": "Surgery Scheduling Team",
            "front_desk": "Front Desk Staff",
            "clinical_team": "Clinical Team",
        }
        label = transfer_map.get(destination, destination)
        return {
            "ok": True,
            "data": {
                "destination": destination,
                "destinationLabel": label,
                "reason": reason,
                "status": "simulated_transfer",
                "message": f"Simulated transfer to {label}. No real call was transferred.",
            },
        }

    async def log_patient_statement(
        self, statement: str, urgency_flags: Optional[List[str]] = None
    ) -> Dict[str, Any]:
        await asyncio.sleep(0.01)
        return {
            "ok": True,
            "data": {
                "logged": True,
                "statement": statement,
                "urgencyFlags": urgency_flags or [],
                "message": "Patient statement captured for clinical team review.",
                "disclaimer": "This statement has not been medically interpreted.",
            },
        }
