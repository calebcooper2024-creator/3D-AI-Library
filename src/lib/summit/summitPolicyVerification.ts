import { evaluateSummitPolicy, type SummitPolicyRequest } from "./summitPolicyGate";

export type SummitPolicySelfCheck = {
  name: string;
  passed: boolean;
  detail: string;
};

export type SummitPolicySelfCheckReport = {
  passed: boolean;
  checks: SummitPolicySelfCheck[];
};

function check(name: string, passed: boolean, detail: string): SummitPolicySelfCheck {
  return { name, passed, detail };
}

export function runSummitPolicySelfCheck(): SummitPolicySelfCheckReport {
  const confirmedBase: Omit<SummitPolicyRequest, "tool"> = {
    intent: "schedule_existing_patient",
    intentConfidence: 0.92,
    identityConfirmed: true,
    identityConfidence: 0.94,
    providerConfidence: 0.91,
    callerConfirmedAppointment: true,
    acceptedSlot: true,
    demoMode: true,
    flags: [],
  };

  const workersCompAppointment = evaluateSummitPolicy({
    ...confirmedBase,
    intent: "workers_comp",
    intentConfidence: 0.98,
    flags: ["workers_comp"],
    tool: "prepare_appointment_for_review",
  });

  const workersCompTransfer = evaluateSummitPolicy({
    ...confirmedBase,
    intent: "workers_comp",
    intentConfidence: 0.98,
    flags: ["workers_comp"],
    tool: "transfer_call",
  });

  const medicalScheduling = evaluateSummitPolicy({
    ...confirmedBase,
    intent: "medical_question",
    intentConfidence: 0.96,
    flags: ["medical_question"],
    tool: "get_provider_availability",
  });

  const medicalEscalation = evaluateSummitPolicy({
    ...confirmedBase,
    intent: "medical_question",
    intentConfidence: 0.96,
    flags: ["medical_question"],
    tool: "create_staff_task",
  });

  const unconfirmedAppointment = evaluateSummitPolicy({
    ...confirmedBase,
    callerConfirmedAppointment: false,
    tool: "prepare_appointment_for_review",
  });

  const confirmedAppointment = evaluateSummitPolicy({
    ...confirmedBase,
    tool: "prepare_appointment_for_review",
  });

  const lowProviderConfidence = evaluateSummitPolicy({
    ...confirmedBase,
    providerConfidence: 0.42,
    tool: "get_provider_availability",
  });

  const ehrTimeout = evaluateSummitPolicy({
    ...confirmedBase,
    ehrAvailable: false,
    flags: ["ehr_timeout"],
    tool: "get_provider_availability",
  });

  const billingScheduling = evaluateSummitPolicy({
    ...confirmedBase,
    intent: "billing",
    intentConfidence: 0.98,
    flags: ["billing"],
    tool: "lookup_patient",
  });

  const billingTransfer = evaluateSummitPolicy({
    ...confirmedBase,
    intent: "billing",
    intentConfidence: 0.98,
    flags: ["billing"],
    tool: "transfer_call",
  });

  const checks: SummitPolicySelfCheck[] = [
    check(
      "workers comp blocks appointment draft",
      !workersCompAppointment.allowed && workersCompAppointment.decision === "transfer",
      workersCompAppointment.reason,
    ),
    check(
      "workers comp allows transfer",
      workersCompTransfer.allowed,
      workersCompTransfer.reason,
    ),
    check(
      "medical question blocks scheduling",
      !medicalScheduling.allowed && medicalScheduling.gate === "medical_advice_block",
      medicalScheduling.reason,
    ),
    check(
      "medical question allows staff escalation",
      medicalEscalation.allowed && medicalEscalation.decision === "review",
      medicalEscalation.reason,
    ),
    check(
      "unconfirmed appointment cannot enter review",
      !unconfirmedAppointment.allowed && unconfirmedAppointment.decision === "clarify",
      unconfirmedAppointment.reason,
    ),
    check(
      "confirmed demo appointment enters staff review only",
      confirmedAppointment.allowed && confirmedAppointment.gate === "demo_write_guard",
      confirmedAppointment.reason,
    ),
    check(
      "low provider confidence clarifies before availability lookup",
      !lowProviderConfidence.allowed && lowProviderConfidence.decision === "clarify",
      lowProviderConfidence.reason,
    ),
    check(
      "ehr timeout forces human review instead of guessed availability",
      !ehrTimeout.allowed && ehrTimeout.decision === "review",
      ehrTimeout.reason,
    ),
    check(
      "billing blocks scheduling tools",
      !billingScheduling.allowed && billingScheduling.decision === "transfer",
      billingScheduling.reason,
    ),
    check(
      "billing allows transfer",
      billingTransfer.allowed,
      billingTransfer.reason,
    ),
  ];

  return {
    passed: checks.every((item) => item.passed),
    checks,
  };
}

export function formatSummitPolicySelfCheckReport(report = runSummitPolicySelfCheck()): string {
  const lines = [
    `Summit policy self-check: ${report.passed ? "PASS" : "FAIL"}`,
    ...report.checks.map((item) => `${item.passed ? "✓" : "✗"} ${item.name} - ${item.detail}`),
  ];

  return lines.join("\n");
}
