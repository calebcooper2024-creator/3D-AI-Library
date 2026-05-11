import { useEffect, useRef } from "react";
import { useSummitLiveKitRoom } from "../../hooks/useSummitLiveKitRoom";
import type { SummitDemoEvent, SummitDemoScenarioId } from "../../lib/summit/summitEvents";

const liveStatusLabel: Record<string, string> = {
  idle: "Idle",
  requesting_token: "Requesting token",
  connecting: "Connecting",
  connected: "Connected",
  reconnecting: "Reconnecting",
  ended: "Ended",
  error: "Error",
};

type SummitLiveKitBridgeProps = {
  scenarioId: SummitDemoScenarioId;
  mockTraceActive: boolean;
  onResetTrace: () => void;
  onEvent: (event: SummitDemoEvent) => void;
};

export function SummitLiveKitBridge({ scenarioId, mockTraceActive, onResetTrace, onEvent }: SummitLiveKitBridgeProps) {
  const livekit = useSummitLiveKitRoom();
  const consumedEventsRef = useRef(0);
  const liveConnected = livekit.status === "connected" || livekit.status === "reconnecting";
  const liveBusy = livekit.status === "requesting_token" || livekit.status === "connecting";
  const canStart = !mockTraceActive && !liveConnected && !liveBusy;

  useEffect(() => {
    const unseen = livekit.events.slice(consumedEventsRef.current);
    consumedEventsRef.current = livekit.events.length;
    for (const event of unseen) onEvent(event);
  }, [livekit.events, onEvent]);

  const startLiveRoom = async () => {
    consumedEventsRef.current = 0;
    onResetTrace();
    await livekit.startSession({ scenarioId });
  };

  return (
    <div className="rounded-2xl border border-red-300/20 bg-black/20 p-4 text-red-50 shadow-2xl shadow-black/20">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-red-200/60">LiveKit wiring</p>
          <h3 className="mt-1 text-lg font-semibold text-white">Browser WebRTC room</h3>
        </div>
        <span className="rounded-full border border-red-200/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-red-100/80">
          {liveStatusLabel[livekit.status] ?? livekit.status}
        </span>
      </div>

      <div className="mt-4 space-y-3 text-sm">
        <div className="rounded-xl border border-red-200/15 bg-red-950/45 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-200/50">Room</p>
          <p className="mt-1 break-all font-mono text-xs text-red-50">{livekit.roomName ?? "not connected"}</p>
        </div>
        <div className="rounded-xl border border-red-200/15 bg-red-950/45 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-200/50">Participant</p>
          <p className="mt-1 break-all font-mono text-xs text-red-50">{livekit.participantName ?? "awaiting token"}</p>
        </div>
        {livekit.error ? (
          <div className="rounded-xl border border-red-300/30 bg-red-900/40 p-3 text-xs text-red-50">
            <p className="font-semibold uppercase tracking-[0.18em] text-red-100/70">Connection error</p>
            <p className="mt-1 leading-relaxed text-red-50/80">{livekit.error}</p>
          </div>
        ) : null}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-2">
        <button
          type="button"
          onClick={startLiveRoom}
          disabled={!canStart}
          className="rounded-xl border border-red-200/30 bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-red-950 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Connect LiveKit room
        </button>
        <button
          type="button"
          onClick={livekit.endSession}
          disabled={!liveConnected && !liveBusy}
          className="rounded-xl border border-red-200/20 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-red-50 transition hover:bg-red-900/70 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Disconnect room
        </button>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-red-100/55">
        This connects the browser microphone to a real LiveKit room once environment variables are configured. The Python agent joins in Phase 4.
      </p>
    </div>
  );
}
