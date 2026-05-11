export type SummitSpeaker = "caller" | "agent";

export type SummitSessionStatus =
  | "idle"
  | "starting"
  | "connected"
  | "running"
  | "ended"
  | "error";

export type SummitToolName =
  | "lookup_patient"
  | "get_provider_availability"
  | "prepare_appointment_for_review"
  | "transfer_call"
  | "create_staff_task"
  | "flag_for_review"
  | "log_patient_statement";

export type SummitToolStatus =
  | "requested"
  | "approved"
  | "rejected"
  | "running"
  | "succeeded"
  | "failed";

export type SummitPolicyDecision =
  | "pass"
  | "reject"
  | "clarify"
  | "transfer"
  | "review";

export type SummitLatencyStage =
  | "room_connect"
  | "stt_partial"
  | "stt_final"
  | "llm_ttft"
  | "tts_first_byte"
  | "eot_to_audio"
  | "tool_roundtrip";

export type SummitReviewStatus =
  | "none"
  | "needs_review"
  | "approved"
  | "corrected"
  | "escalated"
  | "transferred";

export type SummitSessionEvent = {
  type: "session";
  callId: string;
  status: SummitSessionStatus;
  label: string;
  ts: number;
};

export type SummitTranscriptEvent = {
  type: "transcript";
  callId: string;
  speaker: SummitSpeaker;
  text: string;
  isFinal: boolean;
  confidence?: number;
  ts: number;
};

export type SummitIntentEvent = {
  type: "intent";
  callId: string;
  intent: string;
  confidence: number;
  reason: string;
  ts: number;
};

export type SummitToolEvent = {
  type: "tool";
  callId: string;
  tool: SummitToolName;
  status: SummitToolStatus;
  latencyMs?: number;
  input?: Record<string, unknown>;
  output?: Record<string, unknown>;
  reason?: string;
  ts: number;
};

export type SummitPolicyEvent = {
  type: "policy";
  callId: string;
  gate: string;
  decision: SummitPolicyDecision;
  reason: string;
  ts: number;
};

export type SummitLatencyEvent = {
  type: "latency";
  callId: string;
  stage: SummitLatencyStage;
  valueMs: number;
  targetMs?: number;
  ts: number;
};

export type SummitReviewEvent = {
  type: "review";
  callId: string;
  status: SummitReviewStatus;
  summary: string;
  payload: Record<string, unknown>;
  ts: number;
};

export type SummitFailureEvent = {
  type: "failure";
  callId: string;
  scenario: string;
  label: string;
  expectedBehavior: string;
  ts: number;
};

export type SummitDemoEvent =
  | SummitSessionEvent
  | SummitTranscriptEvent
  | SummitIntentEvent
  | SummitToolEvent
  | SummitPolicyEvent
  | SummitLatencyEvent
  | SummitReviewEvent
  | SummitFailureEvent;

export type SummitDemoEventTemplate =
  | Omit<SummitSessionEvent, "callId" | "ts">
  | Omit<SummitTranscriptEvent, "callId" | "ts">
  | Omit<SummitIntentEvent, "callId" | "ts">
  | Omit<SummitToolEvent, "callId" | "ts">
  | Omit<SummitPolicyEvent, "callId" | "ts">
  | Omit<SummitLatencyEvent, "callId" | "ts">
  | Omit<SummitReviewEvent, "callId" | "ts">
  | Omit<SummitFailureEvent, "callId" | "ts">;

export type SummitTimedEvent = {
  offsetMs: number;
  event: SummitDemoEventTemplate;
};

export type SummitDemoScenarioId =
  | "normal_scheduling_knee"
  | "workers_comp_transfer"
  | "medical_question_escalation"
  | "ambiguous_provider_name"
  | "ecw_timeout"
  | "unavailable_slot"
  | "slow_elderly_caller"
  | "billing_transfer";

export type SummitDemoScenario = {
  id: SummitDemoScenarioId;
  label: string;
  description: string;
  expectedOutcome: string;
  events: SummitTimedEvent[];
};

export const summitToolLabels: Record<SummitToolName, string> = {
  lookup_patient: "lookup_patient()",
  get_provider_availability: "get_provider_availability()",
  prepare_appointment_for_review: "prepare_appointment_for_review()",
  transfer_call: "transfer_call()",
  create_staff_task: "create_staff_task()",
  flag_for_review: "flag_for_review()",
  log_patient_statement: "log_patient_statement()",
};

export const summitLatencyLabels: Record<SummitLatencyStage, string> = {
  room_connect: "Room connect",
  stt_partial: "STT partial",
  stt_final: "STT final",
  llm_ttft: "LLM TTFT",
  tts_first_byte: "TTS first byte",
  eot_to_audio: "EoT to audio",
  tool_roundtrip: "Tool roundtrip",
};

export function materializeSummitEvent(
  callId: string,
  template: SummitDemoEventTemplate,
  now: number = Date.now(),
): SummitDemoEvent {
  return {
    ...template,
    callId,
    ts: now,
  } as SummitDemoEvent;
}

export function getEventTitle(event: SummitDemoEvent): string {
  switch (event.type) {
    case "session":
      return `session:${event.status}`;
    case "transcript":
      return `${event.speaker}:${event.isFinal ? "final" : "interim"}`;
    case "intent":
      return `intent:${event.intent}`;
    case "tool":
      return `${event.tool}:${event.status}`;
    case "policy":
      return `${event.gate}:${event.decision}`;
    case "latency":
      return `${event.stage}:${event.valueMs}ms`;
    case "review":
      return `review:${event.status}`;
    case "failure":
      return `failure:${event.scenario}`;
    default:
      return "event";
  }
}
