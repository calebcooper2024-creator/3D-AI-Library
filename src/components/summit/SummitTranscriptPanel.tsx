import { SummitTranscriptEvent } from "../../lib/summit/summitEvents";
import { formatSummitTimestamp } from "../../lib/summit/summitReplay";

type SummitTranscriptPanelProps = {
  events: SummitTranscriptEvent[];
};

export function SummitTranscriptPanel({ events }: SummitTranscriptPanelProps) {
  return (
    <div className="flex min-h-[420px] flex-col rounded-2xl border border-red-300/20 bg-red-950/70 p-4 text-red-50">
      <div className="flex items-center justify-between gap-3 border-b border-red-200/10 pb-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-red-200/60">Live transcript</p>
          <h3 className="mt-1 text-xl font-semibold text-white">Caller and agent turns</h3>
        </div>
        <span className="rounded-full border border-red-200/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-red-100/70">
          {events.length} turns
        </span>
      </div>

      <div className="mt-4 flex-1 space-y-3 overflow-hidden">
        {events.length === 0 ? (
          <div className="flex h-full min-h-[280px] items-center justify-center rounded-2xl border border-dashed border-red-200/20 bg-black/10 p-8 text-center">
            <div>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-red-200/25 text-red-100/70">mic</div>
              <p className="font-serif text-xl italic text-red-50">Transcript will stream here.</p>
              <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-red-100/50">Interim and final utterances. Confidence scores per segment. Speaker-labeled.</p>
            </div>
          </div>
        ) : (
          events.map((event) => (
            <div
              key={`${event.ts}-${event.speaker}-${event.text}`}
              className={`rounded-2xl border p-3 ${
                event.speaker === "agent"
                  ? "border-red-200/15 bg-red-900/35"
                  : "border-red-100/25 bg-red-50 text-red-950"
              }`}
            >
              <div className="mb-2 flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.18em] opacity-70">
                <span>{event.speaker}</span>
                <span>{formatSummitTimestamp(event.ts)}</span>
              </div>
              <p className="text-sm leading-6">{event.text}</p>
              {typeof event.confidence === "number" ? (
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] opacity-60">
                  confidence {Math.round(event.confidence * 100)} percent
                </p>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
