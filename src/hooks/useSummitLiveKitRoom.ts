import { useCallback, useEffect, useRef, useState } from "react";
import { Room, RoomEvent } from "livekit-client";
import type { SummitDemoEvent, SummitDemoScenarioId } from "../lib/summit/summitEvents";
import {
  SUMMIT_LIVEKIT_CONTROL_TOPIC,
  SUMMIT_LIVEKIT_EVENT_TOPIC,
  createSummitLiveKitControlMessage,
  createSummitLiveKitSessionEvent,
  decodeSummitLiveKitPayload,
  dedupeSummitEvents,
  isSummitLiveKitTokenResponse,
  type SummitLiveKitConnectionStatus,
  type SummitLiveKitControlMessage,
  type SummitLiveKitSessionSnapshot,
  type SummitLiveKitTokenResponse,
} from "../lib/summit/summitLiveKit";

type UseSummitLiveKitRoomOptions = {
  tokenEndpoint?: string;
  participantName?: string;
};

type StartSessionOptions = {
  scenarioId: SummitDemoScenarioId;
  participantName?: string;
};

const DEFAULT_TOKEN_ENDPOINT = "/api/livekit-token";

function buildParticipantName() {
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `portfolio-caller-${suffix}`;
}

export function useSummitLiveKitRoom(options: UseSummitLiveKitRoomOptions = {}) {
  const tokenEndpoint = options.tokenEndpoint ?? DEFAULT_TOKEN_ENDPOINT;
  const participantNameRef = useRef(options.participantName ?? buildParticipantName());
  const roomRef = useRef<Room | null>(null);
  const tokenRef = useRef<SummitLiveKitTokenResponse | null>(null);
  const encoderRef = useRef(new TextEncoder());

  const [status, setStatus] = useState<SummitLiveKitConnectionStatus>("idle");
  const [roomName, setRoomName] = useState<string | null>(null);
  const [callId, setCallId] = useState<string | null>(null);
  const [participantName, setParticipantName] = useState<string | null>(participantNameRef.current);
  const [error, setError] = useState<string | null>(null);
  const [events, setEvents] = useState<SummitDemoEvent[]>([]);

  const pushEvent = useCallback((event: SummitDemoEvent) => {
    setEvents((current) => dedupeSummitEvents([...current, event]));
  }, []);

  const publishControl = useCallback(async (message: SummitLiveKitControlMessage) => {
    const room = roomRef.current;
    if (!room) return;

    const payload = encoderRef.current.encode(JSON.stringify(message));
    await room.localParticipant.publishData(payload, {
      reliable: true,
      topic: SUMMIT_LIVEKIT_CONTROL_TOPIC,
    });
  }, []);

  const endSession = useCallback(async () => {
    const activeCallId = callId ?? tokenRef.current?.callId;
    const activeScenarioId = tokenRef.current?.scenarioId;

    if (activeCallId && activeScenarioId) {
      try {
        await publishControl(createSummitLiveKitControlMessage(activeCallId, activeScenarioId, "end_call"));
      } catch {
        // Disconnect should still proceed even if the control packet fails.
      }
    }

    if (roomRef.current) {
      roomRef.current.disconnect();
      roomRef.current = null;
    }

    if (activeCallId) pushEvent(createSummitLiveKitSessionEvent(activeCallId, "ended", "Browser LiveKit room disconnected"));
    setStatus("ended");
  }, [callId, publishControl, pushEvent]);

  const resetSession = useCallback(() => {
    if (roomRef.current) {
      roomRef.current.disconnect();
      roomRef.current = null;
    }
    tokenRef.current = null;
    setStatus("idle");
    setRoomName(null);
    setCallId(null);
    setError(null);
    setEvents([]);
  }, []);

  const startSession = useCallback(
    async ({ scenarioId, participantName: explicitParticipantName }: StartSessionOptions) => {
      if (roomRef.current) roomRef.current.disconnect();

      const nextParticipantName = explicitParticipantName ?? participantNameRef.current ?? buildParticipantName();
      participantNameRef.current = nextParticipantName;
      setParticipantName(nextParticipantName);
      setEvents([]);
      setError(null);
      setStatus("requesting_token");

      let tokenResponse: SummitLiveKitTokenResponse;
      try {
        const response = await fetch(tokenEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ participantName: nextParticipantName, scenarioId }),
        });

        const body = (await response.json()) as unknown;
        if (!response.ok || !isSummitLiveKitTokenResponse(body)) {
          const fallback = body && typeof body === "object" && "error" in body ? String((body as { error?: unknown }).error) : "Token endpoint failed";
          throw new Error(fallback);
        }

        tokenResponse = body;
      } catch (tokenError) {
        const message = tokenError instanceof Error ? tokenError.message : "Unable to request LiveKit token";
        setError(message);
        setStatus("error");
        return null;
      }

      tokenRef.current = tokenResponse;
      setRoomName(tokenResponse.roomName);
      setCallId(tokenResponse.callId);
      setParticipantName(tokenResponse.participantName);
      setStatus("connecting");
      pushEvent(createSummitLiveKitSessionEvent(tokenResponse.callId, "starting", "Requesting browser LiveKit room"));

      const room = new Room({
        adaptiveStream: true,
        dynacast: true,
      });
      roomRef.current = room;

      const handleDataReceived = (payload: Uint8Array, _participant?: unknown, _kind?: unknown, topic?: string) => {
        if (topic && topic !== SUMMIT_LIVEKIT_EVENT_TOPIC) return;
        const event = decodeSummitLiveKitPayload(payload);
        if (event) pushEvent(event);
      };

      const handleDisconnected = () => {
        setStatus("ended");
        pushEvent(createSummitLiveKitSessionEvent(tokenResponse.callId, "ended", "LiveKit room disconnected"));
      };

      const handleConnectionStateChanged = (state: unknown) => {
        const value = String(state).toLowerCase();
        if (value.includes("reconnecting")) setStatus("reconnecting");
      };

      room.on(RoomEvent.DataReceived, handleDataReceived as never);
      room.on(RoomEvent.Disconnected, handleDisconnected);
      room.on(RoomEvent.ConnectionStateChanged, handleConnectionStateChanged as never);

      try {
        await room.connect(tokenResponse.livekitUrl, tokenResponse.token, { autoSubscribe: true });
        setStatus("connected");
        pushEvent(createSummitLiveKitSessionEvent(tokenResponse.callId, "connected", "Browser joined LiveKit room"));

        await room.localParticipant.setMicrophoneEnabled(true);
        await publishControl(
          createSummitLiveKitControlMessage(tokenResponse.callId, scenarioId, "start_scenario", {
            source: "summit_voice_demo_frontend",
            participantName: tokenResponse.participantName,
            roomName: tokenResponse.roomName,
          }),
        );
      } catch (connectError) {
        const message = connectError instanceof Error ? connectError.message : "Unable to connect LiveKit room";
        setError(message);
        setStatus("error");
        pushEvent(createSummitLiveKitSessionEvent(tokenResponse.callId, "error", message));
        room.disconnect();
        roomRef.current = null;
        return null;
      }

      return tokenResponse;
    },
    [publishControl, pushEvent, tokenEndpoint],
  );

  useEffect(() => {
    return () => {
      if (roomRef.current) {
        roomRef.current.disconnect();
        roomRef.current = null;
      }
    };
  }, []);

  const snapshot: SummitLiveKitSessionSnapshot = {
    status,
    roomName,
    callId,
    participantName,
    error,
    events,
  };

  return {
    ...snapshot,
    startSession,
    endSession,
    resetSession,
    publishControl,
  };
}
