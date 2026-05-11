import { SummitDemoEvent, getEventTitle } from "../../lib/summit/summitEvents";
import { formatSummitTimestamp, summarizeSummitEvent } from "../../lib/summit/summitReplay";

type SummitReplayPanelProps = {
  events: SummitDemoEvent[];
};

export function SummitReplayPanel({ events }: SummitReplayPanelProps) {
  return (
    <div className="rounded-2xl border border-red-300/20 bg-red-950/70 p-4 text-red-50">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-red-200/60">Replay log</p>
          <h3 className="mt-1 text-lg font-semibold text-white">Ordered event trace</h3>
        </div>
        <span className="rounded-full border border-red-200/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-red-100/70">
          {events.length} events
        </span>
      </div>

      <div className="mt-4 max-h-[320px] space-y-2 overflow-y-auto pr-1">
        {events.length === 0 ? (
          <div className="rounded-xl border border-red-200/10 bg-black/15 p-3 text-sm text-red-100/50">Start a demo to capture the call trace.</div>
        ) : (
          events.map((event, index) => (
            <div key={`${event.ts}-${index}`} className="rounded-xl border border-red-200/10 bg-black/15 p-3">
              <div className="flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.16em] text-red-100/45">
                <span>{String(index + 1).padStart(2, "0")} {getEventTitle(event)}</span>
                <span>{formatSummitTimestamp(event.ts)}</span>
              </div>
              <p className="mt-2 text-xs leading-5 text-red-50/75">{summarizeSummitEvent(event)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
