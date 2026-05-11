import type { SummitDemoEvent, SummitDemoScenarioId, SummitSessionStatus } from "./summitEvents";

export const SUMMIT_LIVEKIT_EVENT_TOPIC = "summit.event";
export const SUMMIT_LIVEKIT_CONTROL_TOPIC = "summit.control";
export const SUMMIT_LIVEKIT_HEARTBEAT_TOPIC = "summit.heartbeat";

export type SummitLiveKitConnectionStatus =
  | "idle"
  | "requesting_token"
  | "connecting"
  | "connected"
  | "reconnecting"
  | "ended"
  | "error";

export type SummitLiveKitTokenRequest = {
  participantName?: string;
  scenarioId: SummitDemoScenarioId;
  requestedRoomName?: string;
};

export type SummitLiveKitTokenResponse = {
  ok: true;
  livekitUrl: string;
  token: string;
  roomName: string;
  participantName: string;
  callId: string;
  expiresAt: string;
  scenarioId: SummitDemoScenarioId;
  agentName?: string;
  demoMaxSeconds: number;
};

export type SummitLiveKitTokenError = {
  ok: false;
  error: string;
  detail?: string;
};

export type SummitLiveKitControlMessage = {
  type: "summit.control";
  action: "start_scenario" | "end_call" | "set_scenario" | "ping";
  callId: string;
  scenarioId: SummitDemoScenarioId;
  ts: number;
  payload?: Record<string, unknown>;
};

export type SummitLiveKitSessionSnapshot = {
  status: SummitLiveKitConnectionStatus;
  roomName: string | null;
  callId: string | null;
  participantName: string | null;
  error: string | null;
  events: SummitDemoEvent[];
};

export function isSummitLiveKitTokenResponse(value: unknown): value is SummitLiveKitTokenResponse {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<SummitLiveKitTokenResponse>;
  return (
    candidate.ok === true &&
    typeof candidate.livekitUrl === "string" &&
    typeof candidate.token === "string" &&
    typeof candidate.roomName === "string" &&
    typeof candidate.callId === "string"
  );
}

export function isSummitDemoEvent(value: unknown): value is SummitDemoEvent {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<SummitDemoEvent>;
  if (typeof candidate.type !== "string") return false;
  if (typeof candidate.callId !== "string") return false;
  if (typeof candidate.ts !== "number") return false;
  return ["session", "transcript", "intent", "tool", "policy", "latency", "review", "failure"].includes(candidate.type);
}

export function createSummitLiveKitSessionEvent(
  callId: string,
  status: SummitSessionStatus,
  label: string,
): SummitDemoEvent {
  return {
    type: "session",
    callId,
    status,
    label,
    ts: Date.now(),
  };
}

export function createSummitLiveKitControlMessage(
  callId: string,
  scenarioId: SummitDemoScenarioId,
  action: SummitLiveKitControlMessage["action"],
  payload?: Record<string, unknown>,
): SummitLiveKitControlMessage {
  return {
    type: "summit.control",
    action,
    callId,
    scenarioId,
    ts: Date.now(),
    payload,
  };
}

export function decodeSummitLiveKitPayload(payload: Uint8Array): SummitDemoEvent | null {
  try {
    const raw = new TextDecoder().decode(payload);
    const parsed = JSON.parse(raw) as unknown;

    if (isSummitDemoEvent(parsed)) return parsed;

    if (parsed && typeof parsed === "object") {
      const envelope = parsed as { type?: unknown; event?: unknown; payload?: unknown };
      if (envelope.type === "summit.event" && isSummitDemoEvent(envelope.event)) return envelope.event;
      if (envelope.type === "summit.event" && isSummitDemoEvent(envelope.payload)) return envelope.payload;
    }
  } catch {
    return null;
  }

  return null;
}

export function dedupeSummitEvents(events: SummitDemoEvent[]): SummitDemoEvent[] {
  const seen = new Set<string>();
  const result: SummitDemoEvent[] = [];

  for (const event of events) {
    const key = `${event.type}:${event.callId}:${event.ts}:${JSON.stringify(event)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(event);
  }

  return result.sort((a, b) => a.ts - b.ts);
}
