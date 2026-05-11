import type {
  SummitDemoEventTemplate,
  SummitReviewStatus,
  SummitToolEvent,
  SummitToolName,
} from "./summitEvents";
import {
  evaluateSummitPolicy,
  type SummitIntent,
  type SummitPolicyGateResult,
  type SummitPolicyRequest,
  type SummitWorkflowFlag,
} from "./summitPolicyGate";
import {
  createSummitStaffTask,
  getSummitProviderAvailability,
  logSummitPatientStatement,
  lookupSummitPatient,
  prepareSummitAppointmentForReview,
  transferSummitCall,
  type SummitAppointmentSlot,
  type SummitMockEcwResult,
  type SummitPatientRecord,
  type SummitProvider,
} from "./summitMockEcw";

export type SummitWorkflowStage =
  | "idle"
  | "greeting"
  | "classifying"
  | "collecting_identity"
  | "clarifying"
  | "checking_availability"
  | "confirming"
  | "review_ready"
  | "transferring"
  | "escalated"
  | "ended";

export type SummitIdentityCapture = {
  name?: string;
  dob?: string;
  confidence: number;
  confirmed: boolean;
};

export type SummitAppointmentDraft = {
  patientId?: string;
  providerId?: string;
  providerName?: string;
  slotId?: string;
  slotLabel?: string;
  location?: string;
  reason?: string;
  callerConfirmed: boolean;
};

export type SummitWorkflowState = {
  callId: string;
  stage: SummitWorkflowStage;
  intent: SummitIntent | null;
  intentConfidence: number;
  flags: SummitWorkflowFlag[];
  identity: SummitIdentityCapture;
  patient?: SummitPatientRecord;
  provider?: SummitProvider;
  candidateProviders: SummitProvider[];
  candidateSlots: SummitAppointmentSlot[];
  appointmentDraft: SummitAppointmentDraft;
  reviewStatus: SummitReviewStatus;
  lastPolicy?: SummitPolicyGateResult;
};

export type SummitIntentClassification = {
  intent: SummitIntent;
  confidence: number;
  reason: string;
  flags: SummitWorkflowFlag[];
};

export type SummitToolExecution = {
  policy: SummitPolicyGateResult;
  events: SummitDemoEventTemplate[];
  state: SummitWorkflowState;
};

type SummitToolInput = Record<string, unknown>;

export function createSummitWorkflowState(callId = "SUMMIT-DEMO"): SummitWorkflowState {
  return {
    callId,
    stage: "idle",
    intent: null,
    intentConfidence: 0,
    flags: [],
    identity: {
      confidence: 0,
      confirmed: false,
    },
    candidateProviders: [],
    candidateSlots: [],
    appointmentDraft: {
      callerConfirmed: false,
    },
    reviewStatus: "none",
  };
}

export function classifySummitIntentFromText(text: string): SummitIntentClassification {
  const normalized = text.toLowerCase();
  const flags: SummitWorkflowFlag[] = [];

  if (/\b(911|emergency|can't breathe|cant breathe|chest pain|stroke|passed out)\b/.test(normalized)) {
    flags.push("emergency");
    return {
      intent: "emergency",
      confidence: 0.98,
      reason: "Emergency language detected.",
      flags,
    };
  }

  if (/\b(work injury|workers comp|worker's comp|work comp|hurt at work|on the job)\b/.test(normalized)) {
    flags.push("workers_comp");
    return {
      intent: "workers_comp",
      confidence: 0.98,
      reason: "Caller described an injury connected to work.",
      flags,
    };
  }

  if (/\b(bill|billing|statement|invoice|charged|payment)\b/.test(normalized)) {
    flags.push("billing");
    return {
      intent: "billing",
      confidence: 0.96,
      reason: "Caller asked about billing or payment.",
      flags,
    };
  }

  if (/\b(swollen|swelling|medicine|medication|dangerous|should i take|what should i do|pain medicine)\b/.test(normalized)) {
    flags.push("medical_question");
    return {
      intent: "medical_question",
      confidence: 0.95,
      reason: "Caller requested clinical interpretation or medical guidance.",
      flags,
    };
  }

  if (/\b(surgery|operation|post op|post-op|pre op|pre-op)\b/.test(normalized)) {
    flags.push("surgery");
    return {
      intent: "surgery_scheduling",
      confidence: 0.93,
      reason: "Caller referenced surgery scheduling or post-operative workflow.",
      flags,
    };
  }

  if (/\b(insurance|authorization|prior auth|referral|benefits|coverage)\b/.test(normalized)) {
    flags.push("insurance");
    return {
      intent: "insurance_question",
      confidence: 0.88,
      reason: "Caller asked about insurance, referral, or authorization handling.",
      flags,
    };
  }

  if (/\b(reschedule|cancel|move my appointment|change my appointment)\b/.test(normalized)) {
    return {
      intent: "reschedule_or_cancel",
      confidence: 0.9,
      reason: "Caller asked to change an existing appointment.",
      flags,
    };
  }

  if (/\b(dr\.?|doctor)\s+[a-z]+/.test(normalized)) {
    return {
      intent: "referred_provider",
      confidence: 0.86,
      reason: "Caller mentioned a provider by name.",
      flags,
    };
  }

  if (/\b(knee|hip|shoulder|elbow|hand|wrist|back|neck|spine|foot|ankle)\b/.test(normalized)) {
    return {
      intent: "body_part_routing",
      confidence: 0.9,
      reason: "Caller mentioned an orthopedic body part for routing.",
      flags,
    };
  }

  if (/\b(appointment|schedule|book|available|availability|new patient|existing patient)\b/.test(normalized)) {
    return {
      intent: normalized.includes("new patient") ? "schedule_new_patient" : "schedule_existing_patient",
      confidence: 0.84,
      reason: "Caller asked for scheduling.",
      flags,
    };
  }

  return {
    intent: "unclear",
    confidence: 0.45,
    reason: "No high-confidence supported Summit workflow was detected.",
    flags,
  };
}

export function extractSummitBodyPart(text: string): string | null {
  const bodyParts = ["knee", "hip", "shoulder", "elbow", "hand", "wrist", "back", "neck", "spine", "foot", "ankle"];
  const normalized = text.toLowerCase();
  return bodyParts.find((part) => normalized.includes(part)) ?? null;
}

export function buildSummitPolicyRequest(
  state: SummitWorkflowState,
  tool: SummitToolName,
  overrides: Partial<SummitPolicyRequest> = {},
): SummitPolicyRequest {
  return {
    intent: state.intent ?? "unclear",
    intentConfidence: state.intentConfidence,
    tool,
    identityConfirmed: state.identity.confirmed,
    identityConfidence: state.identity.confidence,
    providerConfidence: state.provider ? 0.94 : state.candidateProviders.length > 1 ? 0.55 : 0.88,
    callerConfirmedAppointment: state.appointmentDraft.callerConfirmed,
    acceptedSlot: Boolean(state.appointmentDraft.slotId),
    demoMode: true,
    flags: state.flags,
    ...overrides,
  };
}

export function applySummitIntent(
  state: SummitWorkflowState,
  classification: SummitIntentClassification,
): SummitWorkflowState {
  return {
    ...state,
    stage: "classifying",
    intent: classification.intent,
    intentConfidence: classification.confidence,
    flags: mergeFlags(state.flags, classification.flags),
  };
}

export function applySummitIdentity(
  state: SummitWorkflowState,
  identity: Partial<SummitIdentityCapture>,
): SummitWorkflowState {
  return {
    ...state,
    identity: {
      ...state.identity,
      ...identity,
    },
  };
}

export function confirmSummitAppointment(state: SummitWorkflowState): SummitWorkflowState {
  return {
    ...state,
    stage: "confirming",
    appointmentDraft: {
      ...state.appointmentDraft,
      callerConfirmed: true,
    },
  };
}

export function runSummitToolWithPolicy(
  state: SummitWorkflowState,
  tool: SummitToolName,
  input: SummitToolInput = {},
  requestOverrides: Partial<SummitPolicyRequest> = {},
): SummitToolExecution {
  const policy = evaluateSummitPolicy(buildSummitPolicyRequest(state, tool, requestOverrides));
  const requested = toolEvent(tool, "requested", input);
  const policyEvent = policy.event;

  if (!policy.allowed) {
    return {
      policy,
      state: {
        ...state,
        stage: policy.decision === "clarify" ? "clarifying" : state.stage,
        lastPolicy: policy,
      },
      events: [
        requested,
        policyEvent,
        toolEvent(tool, "rejected", input, undefined, policy.reason),
      ],
    };
  }

  const result = executeSummitMockTool(tool, input, requestOverrides);
  const events: SummitDemoEventTemplate[] = [
    requested,
    policyEvent,
    toolEvent(tool, "running", input),
  ];

  if (result.ok === false) {
    const failedState = applyToolFailureToState(state, result);
    return {
      policy,
      state: {
        ...failedState,
        lastPolicy: policy,
      },
      events: [
        ...events,
        toolEvent(tool, "failed", input, result.latencyMs, result.message),
      ],
    };
  }

  const nextState = applyToolSuccessToState(state, tool, result.data);
  return {
    policy,
    state: {
      ...nextState,
      lastPolicy: policy,
    },
    events: [
      ...events,
      toolEvent(tool, "succeeded", input, result.latencyMs, undefined, result.data as Record<string, unknown>),
    ],
  };
}

function executeSummitMockTool(
  tool: SummitToolName,
  input: SummitToolInput,
  requestOverrides: Partial<SummitPolicyRequest>,
): SummitMockEcwResult<unknown> {
  switch (tool) {
    case "lookup_patient":
      return lookupSummitPatient({
        name: String(input.name ?? ""),
        dob: String(input.dob ?? ""),
      }, {
        simulateTimeout: requestOverrides.ehrAvailable === false,
      });

    case "get_provider_availability":
      return getSummitProviderAvailability({
        providerId: typeof input.providerId === "string" ? input.providerId : undefined,
        providerName: typeof input.providerName === "string" ? input.providerName : undefined,
        bodyPart: typeof input.bodyPart === "string" ? input.bodyPart : undefined,
        requestedWindow: typeof input.requestedWindow === "string" ? input.requestedWindow : undefined,
      }, {
        simulateTimeout: requestOverrides.ehrAvailable === false,
        requestedSlotUnavailable: Boolean(requestOverrides.flags?.includes("requested_slot_unavailable")),
      });

    case "prepare_appointment_for_review":
      return prepareSummitAppointmentForReview({
        patientId: String(input.patientId ?? ""),
        providerId: String(input.providerId ?? ""),
        slotId: String(input.slotId ?? ""),
        reason: String(input.reason ?? ""),
        callerConfirmed: Boolean(input.callerConfirmed),
      });

    case "transfer_call":
      return transferSummitCall({
        destination: (input.destination as "workers_comp" | "billing" | "surgery_scheduler" | "front_desk" | "clinical_team") ?? "front_desk",
        reason: String(input.reason ?? "demo transfer"),
      });

    case "create_staff_task":
      return createSummitStaffTask({
        taskType: (input.taskType as "clinical_callback" | "scheduling_callback" | "billing_transfer" | "emergency_escalation" | "general_review") ?? "general_review",
        summary: String(input.summary ?? "Demo staff review task"),
        queue: String(input.queue ?? "front desk"),
      });

    case "flag_for_review":
      return createSummitStaffTask({
        taskType: "general_review",
        summary: String(input.summary ?? "Flagged for human review"),
        queue: String(input.queue ?? "front desk"),
      });

    case "log_patient_statement":
      return logSummitPatientStatement({
        patientWords: String(input.patientWords ?? ""),
        urgencyFlags: Array.isArray(input.urgencyFlags) ? input.urgencyFlags.map(String) : [],
      });
  }
}

function applyToolSuccessToState(
  state: SummitWorkflowState,
  tool: SummitToolName,
  data: unknown,
): SummitWorkflowState {
  if (tool === "lookup_patient") {
    const patient = data as SummitPatientRecord;
    return {
      ...state,
      stage: "checking_availability",
      patient,
      identity: {
        ...state.identity,
        confirmed: true,
      },
      appointmentDraft: {
        ...state.appointmentDraft,
        patientId: patient.patientId,
      },
    };
  }

  if (tool === "get_provider_availability") {
    const availability = data as { provider: SummitProvider; slots: SummitAppointmentSlot[] };
    const firstSlot = availability.slots[0];
    return {
      ...state,
      stage: "confirming",
      provider: availability.provider,
      candidateSlots: availability.slots,
      appointmentDraft: {
        ...state.appointmentDraft,
        providerId: availability.provider.id,
        providerName: availability.provider.name,
        slotId: firstSlot?.slotId,
        slotLabel: firstSlot?.startLabel,
        location: firstSlot?.location,
      },
    };
  }

  if (tool === "prepare_appointment_for_review") {
    return {
      ...state,
      stage: "review_ready",
      reviewStatus: "needs_review",
    };
  }

  if (tool === "transfer_call") {
    return {
      ...state,
      stage: "transferring",
      reviewStatus: "transferred",
    };
  }

  if (tool === "create_staff_task" || tool === "flag_for_review" || tool === "log_patient_statement") {
    return {
      ...state,
      stage: "escalated",
      reviewStatus: "escalated",
    };
  }

  return state;
}

function applyToolFailureToState<T>(state: SummitWorkflowState, result: SummitMockEcwResult<T>): SummitWorkflowState {
  if (result.ok === false) {
    if (result.error === "timeout") {
      return {
        ...state,
        flags: mergeFlags(state.flags, ["ehr_timeout", "human_review_required"]),
        stage: "escalated",
      };
    }

    if (result.error === "unavailable") {
      return {
        ...state,
        flags: mergeFlags(state.flags, ["requested_slot_unavailable"]),
        candidateSlots: (result.candidates ?? []) as SummitAppointmentSlot[],
        stage: "clarifying",
      };
    }
  }

  return {
    ...state,
    stage: "clarifying",
  };
}

function toolEvent(
  tool: SummitToolName,
  status: SummitToolEvent["status"],
  input?: Record<string, unknown>,
  latencyMs?: number,
  reason?: string,
  output?: Record<string, unknown>,
): Omit<SummitToolEvent, "callId" | "ts"> {
  return {
    type: "tool",
    tool,
    status,
    input,
    latencyMs,
    reason,
    output,
  };
}

function mergeFlags(existing: SummitWorkflowFlag[], incoming: SummitWorkflowFlag[]): SummitWorkflowFlag[] {
  return Array.from(new Set([...existing, ...incoming]));
}
