import { SummitReviewEvent } from "../../lib/summit/summitEvents";
import { summitReviewFields } from "../../lib/summit/summitMockData";

type SummitReviewQueueProps = {
  events: SummitReviewEvent[];
};

export function SummitReviewQueue({ events }: SummitReviewQueueProps) {
  const latest = events.at(-1);

  return (
    <div className="rounded-2xl border border-red-300/20 bg-red-950/70 p-4 text-red-50">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-red-200/60">Staff review queue</p>
          <h3 className="mt-1 text-lg font-semibold text-white">Human approval layer</h3>
        </div>
        <span className="rounded-full border border-red-200/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-red-100/70">
          {latest?.status ?? "none"}
        </span>
      </div>

      {latest ? (
        <div className="mt-4 rounded-xl border border-red-100/20 bg-red-50 p-4 text-red-950">
          <p className="text-sm font-semibold">{latest.summary}</p>
          <dl className="mt-3 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
            {Object.entries(latest.payload).map(([key, value]) => (
              <div key={key} className="rounded-lg bg-red-950/5 p-2">
                <dt className="font-bold uppercase tracking-[0.14em] text-red-950/50">{key}</dt>
                <dd className="mt-1 text-red-950/85">{Array.isArray(value) ? value.join(", ") : String(value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-red-200/10 bg-black/15 p-4">
          <p className="text-sm leading-6 text-red-100/60">No review item yet. A real appointment draft should only appear after policy gate approval and caller confirmation.</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {summitReviewFields.slice(0, 8).map((field) => (
              <div key={field} className="rounded-lg border border-red-200/10 px-2 py-1 text-[10px] text-red-100/40">{field}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
