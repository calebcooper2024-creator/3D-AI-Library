import React, { useEffect, useMemo, useRef, useState } from "react";
import { SummitCallControls } from "./SummitCallControls";
import { SummitFailureControls } from "./SummitFailureControls";
import { SummitLatencyPanel } from "./SummitLatencyPanel";
import { SummitLiveKitBridge } from "./SummitLiveKitBridge";
import { SummitPolicyPanel } from "./SummitPolicyPanel";
import { SummitReplayPanel } from "./SummitReplayPanel";
import { SummitReviewQueue } from "./SummitReviewQueue";
import { SummitToolPanel } from "./SummitToolPanel";
import { SummitTranscriptPanel } from "./SummitTranscriptPanel";
import {
  SummitDemoEvent,
  SummitDemoScenarioId,
  SummitSessionStatus,
  materializeSummitEvent,
} from "../../lib/summit/summitEvents";
import {
  defaultSummitScenarioId,
  getSummitScenario,
  summitDemoScenarios,
} from "../../lib/summit/summitDemoScenarios";

type SummitVoiceDemoProps = {
  mode?: "mock" | "livekit" | "hybrid";
};

function createCallId(): string {
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `SUMMIT-${suffix}`;
}

export function SummitVoiceDemo({ mode = "mock" }: SummitVoiceDemoProps) {
  const [selectedScenarioId, setSelectedScenarioId] = useState<SummitDemoScenarioId>(defaultSummitScenarioId);
  const [events, setEvents] = useState<SummitDemoEvent[]>([]);
  const [status, setStatus] = useState<SummitSessionStatus>("idle");
  const [callId, setCallId] = useState<string | null>(null);
  const timeoutsRef = useRef<number[]>([]);

  const selectedScenario = useMemo(() => getSummitScenario(selectedScenarioId), [selectedScenarioId]);
  const isActive = status === "starting" || status === "connected" || status === "running";

  const clearTimers = () => {
    for (const timeout of timeoutsRef.current) window.clearTimeout(timeout);
    timeoutsRef.current = [];
  };

  const resetTrace = () => {
    clearTimers();
    setEvents([]);
    setStatus("idle");
    setCallId(null);
  };

  const appendLiveKitEvent = (event: SummitDemoEvent) => {
    setCallId(event.callId);
    setEvents((current) => [...current, event]);
    if (event.type === "session") setStatus(event.status);
  };

  const startTrace = () => {
    clearTimers();
    const nextCallId = createCallId();
    setCallId(nextCallId);
    setEvents([]);
    setStatus("starting");

    const timers = selectedScenario.events.map((timedEvent) =>
      window.setTimeout(() => {
        const event = materializeSummitEvent(nextCallId, timedEvent.event);
        setEvents((current) => [...current, event]);
        if (event.type === "session") setStatus(event.status);
      }, timedEvent.offsetMs),
    );

    timeoutsRef.current = timers;
  };

  const endTrace = () => {
    clearTimers();
    const endedCallId = callId ?? createCallId();
    const event = materializeSummitEvent(endedCallId, {
      type: "session",
      status: "ended",
      label: "Demo stopped by operator",
    });
    setCallId(endedCallId);
    setEvents((current) => [...current, event]);
    setStatus("ended");
  };

  const replayTrace = () => {
    startTrace();
  };

  useEffect(() => {
    resetTrace();
    return clearTimers;
  }, [selectedScenarioId]);

  const transcriptEvents = events.filter((event) => event.type === "transcript");
  const toolEvents = events.filter((event) => event.type === "tool");
  const policyEvents = events.filter((event) => event.type === "policy");
  const latencyEvents = events.filter((event) => event.type === "latency");
  const reviewEvents = events.filter((event) => event.type === "review");
  const intentEvent = events.filter((event) => event.type === "intent").at(-1);
  const failureEvent = events.filter((event) => event.type === "failure").at(-1);

  return (
    <div className="mt-14 overflow-hidden rounded-3xl border border-red-200/20 bg-red-950 text-red-50 shadow-2xl shadow-black/30">
      <div className="flex flex-col gap-4 border-b border-red-200/15 bg-black/10 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-600" />
            <span className="h-3 w-3 rounded-full bg-green-700" />
          </div>
          <div>
            <p className="font-mono text-xs text-red-100/70">summit-voice-agent · {mode === "mock" ? "mock-livekit-room" : "livekit-room"}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-red-200/45">Exact section replacement for Summit Health live build</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-red-200/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-red-100/75">{status}</span>
          <span className="rounded-full border border-red-200/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-red-100/75">interactive demo</span>
        </div>
      </div>

      <div className="grid gap-4 p-4 xl:grid-cols-[310px_minmax(0,1fr)_360px]">
        <div className="space-y-4">
          <SummitCallControls
            callId={callId}
            status={status}
            selectedScenarioLabel={selectedScenario.label}
            onStart={startTrace}
            onEnd={endTrace}
            onReplay={replayTrace}
            hasReplay={events.length > 0}
          />
          <SummitFailureControls
            scenarios={summitDemoScenarios}
            selectedScenarioId={selectedScenarioId}
            disabled={isActive}
            onSelectScenario={setSelectedScenarioId}
          />
          <SummitLiveKitBridge
            scenarioId={selectedScenarioId}
            mockTraceActive={status === "starting" || status === "running"}
            onResetTrace={resetTrace}
            onEvent={appendLiveKitEvent}
          />
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-red-300/20 bg-red-950/70 p-4 text-red-50">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-red-200/60">Room inspector</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-red-200/10 bg-black/15 p-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-red-100/45">Intent</p>
                <p className="mt-1 text-sm text-white">{intentEvent?.intent ?? "awaiting caller"}</p>
              </div>
              <div className="rounded-xl border border-red-200/10 bg-black/15 p-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-red-100/45">Policy state</p>
                <p className="mt-1 text-sm text-white">{policyEvents.at(-1)?.decision ?? "idle"}</p>
              </div>
              <div className="rounded-xl border border-red-200/10 bg-black/15 p-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-red-100/45">Failure signal</p>
                <p className="mt-1 text-sm text-white">{failureEvent?.label ?? "none"}</p>
              </div>
            </div>
          </div>
          <SummitTranscriptPanel events={transcriptEvents} />
          <SummitReplayPanel events={events} />
        </div>

        <div className="space-y-4">
          <SummitToolPanel events={toolEvents} />
          <SummitPolicyPanel events={policyEvents} />
          <SummitLatencyPanel events={latencyEvents} />
          <SummitReviewQueue events={reviewEvents} />
        </div>
      </div>

      <div className="border-t border-red-200/15 bg-black/10 px-5 py-4 text-xs text-red-100/55">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <p className="font-semibold uppercase tracking-[0.18em]">Stage status: frontend mock trace complete when wired</p>
          <p>Mock trace mode is still available. LiveKit browser room wiring is Phase 3. Python agent joins in Phase 4. No real PHI. No real EHR writes.</p>
        </div>
      </div>
    </div>
  );
}
