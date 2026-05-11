import { AccessToken } from "livekit-server-sdk";

type VercelRequest = {
  method?: string;
  body?: unknown;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  setHeader: (name: string, value: string) => void;
  json: (body: unknown) => void;
  end: () => void;
};

type TokenRequestBody = {
  participantName?: unknown;
  scenarioId?: unknown;
  requestedRoomName?: unknown;
};

const allowedScenarioIds = new Set([
  "normal_scheduling_knee",
  "workers_comp_transfer",
  "medical_question_escalation",
  "ambiguous_provider_name",
  "ecw_timeout",
  "unavailable_slot",
  "slow_elderly_caller",
  "billing_transfer",
]);

function sanitizeIdentifier(value: unknown, fallback: string, maxLength = 64): string {
  if (typeof value !== "string") return fallback;
  const cleaned = value.replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").slice(0, maxLength);
  return cleaned || fallback;
}

function createShortId(): string {
  return Math.random().toString(36).slice(2, 10).toUpperCase();
}

function getDemoMaxSeconds(): number {
  const raw = Number(process.env.SUMMIT_DEMO_MAX_SECONDS ?? "180");
  if (!Number.isFinite(raw)) return 180;
  return Math.min(Math.max(Math.round(raw), 30), 240);
}

function setCorsHeaders(res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  if (process.env.SUMMIT_DEMO_ENABLED === "false") {
    res.status(403).json({ ok: false, error: "Summit demo is disabled" });
    return;
  }

  const livekitUrl = process.env.LIVEKIT_URL;
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;

  if (!livekitUrl || !apiKey || !apiSecret) {
    res.status(503).json({
      ok: false,
      error: "LiveKit environment is not configured",
      detail: "Required: LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET",
    });
    return;
  }

  const body = (req.body ?? {}) as TokenRequestBody;
  const scenarioId = typeof body.scenarioId === "string" && allowedScenarioIds.has(body.scenarioId) ? body.scenarioId : "normal_scheduling_knee";
  const roomSuffix = sanitizeIdentifier(body.requestedRoomName, createShortId(), 48);
  const participantSuffix = sanitizeIdentifier(body.participantName, `portfolio-caller-${createShortId()}`, 64);
  const roomName = `summit-demo-${roomSuffix}`.slice(0, 80);
  const participantName = participantSuffix;
  const callId = `SUMMIT-LK-${createShortId()}`;
  const demoMaxSeconds = getDemoMaxSeconds();
  const expiresAt = new Date(Date.now() + (demoMaxSeconds + 60) * 1000).toISOString();
  const agentName = process.env.SUMMIT_AGENT_NAME || "summit-voice-agent";

  const token = new AccessToken(apiKey, apiSecret, {
    identity: participantName,
    ttl: demoMaxSeconds + 60,
  });

  token.addGrant({
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canSubscribe: true,
    canPublishData: true,
    canUpdateOwnMetadata: true,
  });

  const jwt = await token.toJwt();

  res.status(200).json({
    ok: true,
    livekitUrl,
    token: jwt,
    roomName,
    participantName,
    callId,
    expiresAt,
    scenarioId,
    agentName,
    demoMaxSeconds,
  });
}
