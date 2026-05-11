export type SummitProviderGroup =
  | "hip_knee"
  | "hand_wrist"
  | "shoulder_elbow"
  | "spine"
  | "foot_ankle"
  | "sports_medicine";

export type SummitProvider = {
  id: string;
  name: string;
  group: SummitProviderGroup;
  bodyParts: string[];
  aliases: string[];
  locations: string[];
};

export type SummitPatientRecord = {
  patientId: string;
  name: string;
  dob: string;
  phone: string;
  status: "existing" | "new";
};

export type SummitAppointmentSlot = {
  slotId: string;
  providerId: string;
  providerName: string;
  location: string;
  startLabel: string;
  visitType: "new_patient" | "existing_patient" | "callback_review";
};

export type SummitMockEcwResult<T> =
  | {
      ok: true;
      data: T;
      latencyMs: number;
    }
  | {
      ok: false;
      error: "not_found" | "ambiguous" | "timeout" | "unavailable" | "invalid_input";
      message: string;
      latencyMs: number;
      candidates?: unknown[];
    };

export type SummitMockOptions = {
  simulateTimeout?: boolean;
  requestedSlotUnavailable?: boolean;
};

export const summitProviders: SummitProvider[] = [
  {
    id: "PROV-CHEN",
    name: "Dr. Chen",
    group: "hip_knee",
    bodyParts: ["hip", "knee", "leg"],
    aliases: ["chen", "dr chen", "doctor chen"],
    locations: ["Summit Main", "Summit East"],
  },
  {
    id: "PROV-PARK",
    name: "Dr. Park",
    group: "hip_knee",
    bodyParts: ["hip", "knee", "leg"],
    aliases: ["park", "dr park", "doctor park"],
    locations: ["Summit Main"],
  },
  {
    id: "PROV-COHEN",
    name: "Dr. Cohen",
    group: "hand_wrist",
    bodyParts: ["hand", "wrist", "finger", "thumb"],
    aliases: ["cohen", "dr cohen", "doctor cohen"],
    locations: ["Summit West"],
  },
  {
    id: "PROV-PATEL",
    name: "Dr. Patel",
    group: "shoulder_elbow",
    bodyParts: ["shoulder", "elbow", "arm"],
    aliases: ["patel", "dr patel", "doctor patel"],
    locations: ["Summit Main", "Summit West"],
  },
  {
    id: "PROV-WILLIAMS",
    name: "Dr. Williams",
    group: "spine",
    bodyParts: ["back", "neck", "spine"],
    aliases: ["williams", "dr williams", "doctor williams"],
    locations: ["Summit East"],
  },
  {
    id: "PROV-RODRIGUEZ",
    name: "Dr. Rodriguez",
    group: "foot_ankle",
    bodyParts: ["foot", "ankle", "heel"],
    aliases: ["rodriguez", "dr rodriguez", "doctor rodriguez"],
    locations: ["Summit West"],
  },
  {
    id: "PROV-KIM",
    name: "Dr. Kim",
    group: "sports_medicine",
    bodyParts: ["sports", "sprain", "strain"],
    aliases: ["kim", "dr kim", "doctor kim"],
    locations: ["Summit Main"],
  },
];

export const summitPatients: SummitPatientRecord[] = [
  {
    patientId: "ECW-DEMO-1842",
    name: "Jordan Ellis",
    dob: "04/12/1971",
    phone: "+1 561 000 0142",
    status: "existing",
  },
  {
    patientId: "ECW-DEMO-2290",
    name: "Maria Santos",
    dob: "09/02/1968",
    phone: "+1 561 000 0290",
    status: "existing",
  },
];

export const summitAvailability: SummitAppointmentSlot[] = [
  {
    slotId: "SLOT-CHEN-TUE-1030",
    providerId: "PROV-CHEN",
    providerName: "Dr. Chen",
    location: "Summit Main",
    startLabel: "Tuesday 10:30 AM",
    visitType: "existing_patient",
  },
  {
    slotId: "SLOT-CHEN-MON-1415",
    providerId: "PROV-CHEN",
    providerName: "Dr. Chen",
    location: "Summit East",
    startLabel: "Monday 2:15 PM",
    visitType: "existing_patient",
  },
  {
    slotId: "SLOT-PARK-WED-0900",
    providerId: "PROV-PARK",
    providerName: "Dr. Park",
    location: "Summit Main",
    startLabel: "Wednesday 9:00 AM",
    visitType: "existing_patient",
  },
  {
    slotId: "SLOT-PATEL-THU-1100",
    providerId: "PROV-PATEL",
    providerName: "Dr. Patel",
    location: "Summit West",
    startLabel: "Thursday 11:00 AM",
    visitType: "new_patient",
  },
];

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}

function deterministicLatency(seed: string, min = 160, max = 520): number {
  const total = Array.from(seed).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return min + (total % (max - min + 1));
}

export function lookupSummitPatient(
  input: { name: string; dob: string },
  options: SummitMockOptions = {},
): SummitMockEcwResult<SummitPatientRecord> {
  const latencyMs = options.simulateTimeout ? 1800 : deterministicLatency(`${input.name}:${input.dob}`);

  if (options.simulateTimeout) {
    return {
      ok: false,
      error: "timeout",
      message: "Simulated eClinicalWorks patient lookup timeout.",
      latencyMs,
    };
  }

  const patient = summitPatients.find(
    (record) => normalize(record.name) === normalize(input.name) && normalize(record.dob) === normalize(input.dob),
  );

  if (!patient) {
    return {
      ok: false,
      error: "not_found",
      message: "No matching demo patient record.",
      latencyMs,
    };
  }

  return {
    ok: true,
    data: patient,
    latencyMs,
  };
}

export function findSummitProvidersForBodyPart(bodyPart: string): SummitProvider[] {
  const normalized = normalize(bodyPart);
  return summitProviders.filter((provider) =>
    provider.bodyParts.some((part) => normalize(part).includes(normalized) || normalized.includes(normalize(part))),
  );
}

export function resolveSummitProviderName(query: string): SummitMockEcwResult<{ provider: SummitProvider; confidence: number }> {
  const normalized = query.toLowerCase();
  const chen = summitProviders.find((provider) => provider.id === "PROV-CHEN");
  const cohen = summitProviders.find((provider) => provider.id === "PROV-COHEN");

  if (normalized.includes("chen") && normalized.includes("cohen") && chen && cohen) {
    return {
      ok: false,
      error: "ambiguous",
      message: "Provider name could refer to Dr. Chen or Dr. Cohen.",
      latencyMs: 122,
      candidates: [chen, cohen],
    };
  }

  const exact = summitProviders.find((provider) =>
    provider.aliases.some((alias) => normalized.includes(alias)),
  );

  if (!exact) {
    return {
      ok: false,
      error: "not_found",
      message: "Provider was not recognized in demo data.",
      latencyMs: 140,
    };
  }

  return {
    ok: true,
    data: {
      provider: exact,
      confidence: 0.94,
    },
    latencyMs: 140,
  };
}

export function getSummitProviderAvailability(
  input: {
    providerId?: string;
    providerName?: string;
    bodyPart?: string;
    requestedWindow?: string;
  },
  options: SummitMockOptions = {},
): SummitMockEcwResult<{ provider: SummitProvider; slots: SummitAppointmentSlot[] }> {
  const latencyMs = options.simulateTimeout ? 1900 : deterministicLatency(JSON.stringify(input), 220, 560);

  if (options.simulateTimeout) {
    return {
      ok: false,
      error: "timeout",
      message: "Simulated eClinicalWorks availability timeout.",
      latencyMs,
    };
  }

  const provider =
    summitProviders.find((candidate) => candidate.id === input.providerId) ??
    summitProviders.find((candidate) => candidate.name.toLowerCase() === input.providerName?.toLowerCase()) ??
    (input.bodyPart ? findSummitProvidersForBodyPart(input.bodyPart)[0] : undefined);

  if (!provider) {
    return {
      ok: false,
      error: "not_found",
      message: "No demo provider matched the requested body part or provider.",
      latencyMs,
    };
  }

  const allSlots = summitAvailability.filter((slot) => slot.providerId === provider.id);
  const fridayMorningRequested = input.requestedWindow?.toLowerCase().includes("friday morning");

  if (options.requestedSlotUnavailable || fridayMorningRequested) {
    return {
      ok: false,
      error: "unavailable",
      message: "Requested slot is unavailable. Alternatives are available.",
      latencyMs,
      candidates: allSlots,
    };
  }

  if (allSlots.length === 0) {
    return {
      ok: false,
      error: "unavailable",
      message: "No demo slots available for this provider.",
      latencyMs,
    };
  }

  return {
    ok: true,
    data: {
      provider,
      slots: allSlots,
    },
    latencyMs,
  };
}

export function prepareSummitAppointmentForReview(input: {
  patientId: string;
  providerId: string;
  slotId: string;
  reason: string;
  callerConfirmed: boolean;
}): SummitMockEcwResult<{ reviewId: string; status: "needs_review"; createdAppointment: false }> {
  if (!input.callerConfirmed) {
    return {
      ok: false,
      error: "invalid_input",
      message: "Caller confirmation is required before creating a review draft.",
      latencyMs: 95,
    };
  }

  return {
    ok: true,
    data: {
      reviewId: `REV-${Math.abs(hashText(`${input.patientId}:${input.slotId}`)) % 9000}`,
      status: "needs_review",
      createdAppointment: false,
    },
    latencyMs: deterministicLatency(input.slotId, 180, 320),
  };
}

export function createSummitStaffTask(input: {
  taskType: "clinical_callback" | "scheduling_callback" | "billing_transfer" | "emergency_escalation" | "general_review";
  summary: string;
  queue: string;
}): SummitMockEcwResult<{ taskId: string; queue: string }> {
  return {
    ok: true,
    data: {
      taskId: `TASK-${Math.abs(hashText(`${input.taskType}:${input.summary}`)) % 9000}`,
      queue: input.queue,
    },
    latencyMs: deterministicLatency(input.summary, 180, 360),
  };
}

export function transferSummitCall(input: {
  destination: "workers_comp" | "billing" | "surgery_scheduler" | "front_desk" | "clinical_team";
  reason: string;
}): SummitMockEcwResult<{ queue: string; mode: "warm_transfer_simulation" }> {
  const queueByDestination: Record<typeof input.destination, string> = {
    workers_comp: "WC_COORDINATOR",
    billing: "BILLING_RCM",
    surgery_scheduler: "SURGERY_SCHEDULING",
    front_desk: "FRONT_DESK",
    clinical_team: "CLINICAL_TEAM",
  };

  return {
    ok: true,
    data: {
      queue: queueByDestination[input.destination],
      mode: "warm_transfer_simulation",
    },
    latencyMs: deterministicLatency(input.reason, 150, 300),
  };
}

export function logSummitPatientStatement(input: {
  patientWords: string;
  urgencyFlags?: string[];
}): SummitMockEcwResult<{ statementId: string; urgencyFlags: string[] }> {
  return {
    ok: true,
    data: {
      statementId: `STMT-${Math.abs(hashText(input.patientWords)) % 9000}`,
      urgencyFlags: input.urgencyFlags ?? [],
    },
    latencyMs: deterministicLatency(input.patientWords, 120, 240),
  };
}

function hashText(value: string): number {
  return Array.from(value).reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) | 0, 0);
}
