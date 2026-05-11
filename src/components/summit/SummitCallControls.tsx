import { SummitSessionStatus } from "../../lib/summit/summitEvents";

const statusLabel: Record<SummitSessionStatus, string> = {
  idle: "Idle",
  starting: "Starting",
  connected: "Connected",
  running: "Running",
  ended: "Ended",
  error: "Error",
};

type SummitCallControlsProps = {
  callId: string | null;
  status: SummitSessionStatus;
  selectedScenarioLabel: string;
  onStart: () => void;
  onEnd: () => void;
  onReplay: () => void;
  hasReplay: boolean;
};

export function SummitCallControls({
  callId,
  status,
  selectedScenarioLabel,
  onStart,
  onEnd,
  onReplay,
  hasReplay,
}: SummitCallControlsProps) {
  const isActive = status === "starting" || status === "connected" || status === "running";

  return (
    <div className="rounded-2xl border border-red-300/20 bg-red-950/80 p-4 text-red-50 shadow-2xl shadow-black/20">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-red-200/60">Call control</p>
          <h3 className="mt-1 text-lg font-semibold text-white">Summit voice room</h3>
        </div>
        <span className="rounded-full border border-red-200/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-red-100/80">
          {statusLabel[status]}
        </span>
      </div>

      <div className="space-y-3 text-sm">
        <div className="rounded-xl border border-red-200/15 bg-black/15 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-200/50">Mode</p>
          <p className="mt-1 font-medium text-red-50">Mock trace</p>
        </div>
        <div className="rounded-xl border border-red-200/15 bg-black/15 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-200/50">Room ID</p>
          <p className="mt-1 font-mono text-xs text-red-50">{callId ?? "awaiting connect"}</p>
        </div>
        <div className="rounded-xl border border-red-200/15 bg-black/15 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-200/50">Scenario</p>
          <p className="mt-1 text-red-50">{selectedScenarioLabel}</p>
        </div>
        <div className="rounded-xl border border-red-200/15 bg-black/15 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-200/50">Agent</p>
          <p className="mt-1 font-mono text-xs text-red-50">summit-v0.1-policy-gated</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-2">
        <button
          type="button"
          onClick={onStart}
          disabled={isActive}
          className="rounded-xl border border-red-200/30 bg-red-50 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-red-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Start demo
        </button>
        <button
          type="button"
          onClick={onEnd}
          disabled={!isActive}
          className="rounded-xl border border-red-200/20 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-red-50 transition hover:bg-red-900/70 disabled:cursor-not-allowed disabled:opacity-40"
        >
          End demo
        </button>
        <button
          type="button"
          onClick={onReplay}
          disabled={!hasReplay || isActive}
          className="rounded-xl border border-red-200/20 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-red-100 transition hover:bg-red-900/70 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Replay trace
        </button>
      </div>
    </div>
  );
}
