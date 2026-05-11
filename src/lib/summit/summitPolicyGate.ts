import type {
  SummitPolicyDecision,
  SummitPolicyEvent,
  SummitToolName,
} from "./summitEvents";

export type SummitIntent =
  | "schedule_new_patient"
  | "schedule_existing_patient"
  | "referred_provider"
  | "body_part_routing"
  | "billing"
  | "workers_comp"
  | "medical_question"
  | "reschedule_or_cancel"
  | "surgery_scheduling"
  | "insurance_question"
  | "unclear"
  | "emergency";

export type SummitWorkflowFlag =
  | "workers_comp"
  | "medical_question"
  | "billing"
  | "emergency"
  | "surgery"
  | "insurance"
  | "low_identity_confidence"
  | "low_provider_confidence"
  | "requested_slot_unavailable"
  | "ehr_timeout"
  | "human_review_required";

export type SummitPolicyGate =
  | "identity_confirmation"
  | "appointment_confirmation"
  | "workers_comp_block"
  | "medical_advice_block"
  | "insurance_verification_block"
  | "billing_scope"
  | "surgery_scope"
  | "emergency_escalation"
  | "provider_confidence"
  | "slot_availability"
  | "human_review_required"
  | "demo_write_guard"
  | "tool_scope";

export type SummitPolicyRequest = {
  intent: SummitIntent;
  intentConfidence: number;
  tool: SummitToolName;
  callerConfirmedAppointment?: boolean;
  identityConfirmed?: boolean;
  identityConfidence?: number;
  providerConfidence?: number;
  acceptedSlot?: boolean;
  ehrAvailable?: boolean;
  demoMode?: boolean;
  flags?: SummitWorkflowFlag[];
  evidence?: Record<string, unknown>;
};

export type SummitPolicyGateResult = {
  gate: SummitPolicyGate;
  decision: SummitPolicyDecision;
  allowed: boolean;
  reason: string;
  recommendedTool?: SummitToolName;
  blockedTools: SummitToolName[];
  requiredClarification?: string;
  event: Omit<SummitPolicyEvent, "callId" | "ts">;
};

const schedulingTools = new Set<SummitToolName>([
  "lookup_patient",
  "get_provider_availability",
  "prepare_appointment_for_review",
]);

const appointmentWriteTools = new Set<SummitToolName>(["prepare_appointment_for_review"]);

const safeEscalationTools = new Set<SummitToolName>([
  "transfer_call",
  "create_staff_task",
  "flag_for_review",
  "log_patient_statement",
]);

const allTools: SummitToolName[] = [
  "lookup_patient",
  "get_provider_availability",
  "prepare_appointment_for_review",
  "transfer_call",
  "create_staff_task",
  "flag_for_review",
  "log_patient_statement",
];

function result(
  gate: SummitPolicyGate,
  decision: SummitPolicyDecision,
  allowed: boolean,
  reason: string,
  options: {
    recommendedTool?: SummitToolName;
    blockedTools?: SummitToolName[];
    requiredClarification?: string;
  } = {},
): SummitPolicyGateResult {
  return {
    gate,
    decision,
    allowed,
    reason,
    recommendedTool: options.recommendedTool,
    blockedTools: options.blockedTools ?? [],
    requiredClarification: options.requiredClarification,
    event: {
      type: "policy",
      gate,
      decision,
      reason,
    },
  };
}

function hasFlag(request: SummitPolicyRequest, flag: SummitWorkflowFlag): boolean {
  return Boolean(request.flags?.includes(flag));
}

function blocksScheduling(
  request: SummitPolicyRequest,
  gate: SummitPolicyGate,
  reason: string,
  recommendedTool: SummitToolName,
): SummitPolicyGateResult | null {
  if (schedulingTools.has(request.tool)) {
    return result(gate, gate === "provider_confidence" ? "clarify" : "transfer", false, reason, {
      recommendedTool,
      blockedTools: [...schedulingTools],
    });
  }

  if (request.tool === recommendedTool || safeEscalationTools.has(request.tool)) {
    return result(gate, request.tool === "transfer_call" ? "pass" : "review", true, reason, {
      recommendedTool,
      blockedTools: [...schedulingTools],
    });
  }

  return null;
}

export function evaluateSummitPolicy(request: SummitPolicyRequest): SummitPolicyGateResult {
  if (request.intentConfidence < 0.6 || request.intent === "unclear") {
    return result("tool_scope", "clarify", false, "Intent confidence is too low for tool execution.", {
      requiredClarification: "Ask one clarifying question before using a tool.",
      blockedTools: [...allTools],
    });
  }

  if (request.intent === "emergency" || hasFlag(request, "emergency")) {
    const emergencyBlock = blocksScheduling(
      request,
      "emergency_escalation",
      "Emergency language requires urgent escalation. Scheduling tools are blocked.",
      "create_staff_task",
    );
    if (emergencyBlock) return emergencyBlock;
  }

  if (request.intent === "workers_comp" || hasFlag(request, "workers_comp")) {
    const wcBlock = blocksScheduling(
      request,
      "workers_comp_block",
      "Workers compensation scheduling is excluded from the MVP and must transfer.",
      "transfer_call",
    );
    if (wcBlock) return wcBlock;
  }

  if (request.intent === "billing" || hasFlag(request, "billing")) {
    const billingBlock = blocksScheduling(
      request,
      "billing_scope",
      "Billing belongs to the RCM queue and is outside scheduling scope.",
      "transfer_call",
    );
    if (billingBlock) return billingBlock;
  }

  if (request.intent === "surgery_scheduling" || hasFlag(request, "surgery")) {
    const surgeryBlock = blocksScheduling(
      request,
      "surgery_scope",
      "Surgery scheduling is excluded and must be routed to staff.",
      "transfer_call",
    );
    if (surgeryBlock) return surgeryBlock;
  }

  if (request.intent === "insurance_question" || hasFlag(request, "insurance")) {
    const insuranceBlock = blocksScheduling(
      request,
      "insurance_verification_block",
      "Insurance verification is excluded. Route to staff rather than verifying benefits.",
      "transfer_call",
    );
    if (insuranceBlock) return insuranceBlock;
  }

  if (request.intent === "medical_question" || hasFlag(request, "medical_question")) {
    if (request.tool === "log_patient_statement" || request.tool === "create_staff_task" || request.tool === "flag_for_review") {
      return result(
        "medical_advice_block",
        "review",
        true,
        "Clinical content may be captured and escalated, but the agent must not answer it.",
        { recommendedTool: "create_staff_task" },
      );
    }

    return result(
      "medical_advice_block",
      "reject",
      false,
      "The agent cannot provide medical advice or continue into scheduling while the clinical question is unresolved.",
      {
        recommendedTool: "create_staff_task",
        blockedTools: [...schedulingTools, "transfer_call"],
      },
    );
  }

  if (hasFlag(request, "ehr_timeout") || request.ehrAvailable === false) {
    if (request.tool === "create_staff_task" || request.tool === "flag_for_review") {
      return result("human_review_required", "review", true, "EHR read failed. Staff review is required.", {
        recommendedTool: "create_staff_task",
      });
    }

    return result("human_review_required", "review", false, "EHR read failed. The agent cannot invent availability.", {
      recommendedTool: "create_staff_task",
      blockedTools: ["lookup_patient", "get_provider_availability", "prepare_appointment_for_review"],
    });
  }

  if (request.tool === "lookup_patient") {
    if ((request.identityConfidence ?? 1) < 0.8) {
      return result("identity_confirmation", "clarify", false, "Name or date of birth confidence is too low for lookup.", {
        requiredClarification: "Read back the captured name and date of birth.",
        blockedTools: ["lookup_patient"],
      });
    }

    return result("identity_confirmation", "pass", true, "Identity fields are sufficient for a demo lookup.");
  }

  if (request.tool === "get_provider_availability") {
    if ((request.providerConfidence ?? 1) < 0.75) {
      return result("provider_confidence", "clarify", false, "Provider or body-part routing confidence is too low.", {
        requiredClarification: "Clarify provider or body part before checking availability.",
        blockedTools: ["get_provider_availability", "prepare_appointment_for_review"],
      });
    }

    if (hasFlag(request, "requested_slot_unavailable") && !request.acceptedSlot) {
      return result("slot_availability", "clarify", false, "Requested slot is unavailable. Caller must accept an alternative first.", {
        requiredClarification: "Offer available alternatives or a staff callback.",
        blockedTools: ["prepare_appointment_for_review"],
      });
    }

    return result("tool_scope", "pass", true, "Provider availability lookup is within scheduling scope.");
  }

  if (appointmentWriteTools.has(request.tool)) {
    if (request.demoMode === true) {
      if (!request.identityConfirmed) {
        return result("identity_confirmation", "clarify", false, "Appointment review requires confirmed identity.", {
          requiredClarification: "Confirm caller identity before preparing a review record.",
          blockedTools: ["prepare_appointment_for_review"],
        });
      }

      if (!request.callerConfirmedAppointment) {
        return result("appointment_confirmation", "clarify", false, "Appointment review requires explicit caller confirmation.", {
          requiredClarification: "Read back provider, location, and time, then ask for explicit confirmation.",
          blockedTools: ["prepare_appointment_for_review"],
        });
      }

      return result(
        "demo_write_guard",
        "review",
        true,
        "Demo mode converts appointment creation into a staff-review draft, not a real EHR write.",
        { recommendedTool: "prepare_appointment_for_review" },
      );
    }

    return result("demo_write_guard", "review", false, "Direct EHR writes remain disabled until a production approval gate exists.", {
      recommendedTool: "flag_for_review",
      blockedTools: ["prepare_appointment_for_review"],
    });
  }

  if (safeEscalationTools.has(request.tool)) {
    return result("tool_scope", "pass", true, "Escalation and documentation tool is within safe scope.");
  }

  return result("tool_scope", "reject", false, "Requested tool is not allowed in this workflow.", {
    blockedTools: [request.tool],
  });
}

export function assertSummitPolicyAllows(request: SummitPolicyRequest): SummitPolicyGateResult {
  const policy = evaluateSummitPolicy(request);
  if (!policy.allowed) {
    throw new Error(`Summit policy rejected ${request.tool}: ${policy.reason}`);
  }
  return policy;
}

export function getBlockedSummitToolsForIntent(intent: SummitIntent): SummitToolName[] {
  if (
    intent === "workers_comp" ||
    intent === "billing" ||
    intent === "surgery_scheduling" ||
    intent === "insurance_question"
  ) {
    return [...schedulingTools];
  }

  if (intent === "medical_question" || intent === "emergency") {
    return [...schedulingTools, "transfer_call"];
  }

  return [];
}
