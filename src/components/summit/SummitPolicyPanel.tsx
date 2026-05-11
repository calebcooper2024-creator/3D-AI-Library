import { SummitPolicyDecision, SummitPolicyEvent } from "../../lib/summit/summitEvents";
import { formatSummitTimestamp } from "../../lib/summit/summitReplay";

const decisionTone: Record<SummitPolicyDecision, string> = {
  pass: "border-emerald-200/40 bg-emerald-200/10 text-emerald-50",
  reject: "border-red-200/45 bg-red-200/10 text-red-50",
  clarify: "border-yellow-200/40 bg-yellow-200/10 text-yellow-50",
  transfer: "border-blue-200/40 bg-blue-200/10 text-blue-50",
  review: "border-purple-200/40 bg-purple-200/10 text-purple-50",
};

type SummitPolicyPanelProps = {
  events: SummitPolicyEvent[];
};

export function SummitPolicyPanel({ events }: SummitPolicyPanelProps) {
  return (
    <div className="rounded-2xl border border-red-300/20 bg-red-950/70 p-4 text-red-50">
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-red-200/60">Policy gate</p>
      <h3 className="mt-1 text-lg font-semibold text-white">Accept, reject, clarify, transfer</h3>

      <div className="mt-4 space-y-2">
        {events.length === 0 ? (
          <div className="rounded-xl border border-red-200/10 bg-black/15 p-3 text-sm text-red-100/50">No gate decisions yet.</div>
        ) : (
          events.map((event) => (
            <div key={`${event.ts}-${event.gate}`} className={`rounded-xl border p-3 ${decisionTone[event.decision]}`}>
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase tracking-[0.16em]">{event.gate}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.16em]">{event.decision}</span>
              </div>
              <p className="mt-2 text-xs leading-5 opacity-85">{event.reason}</p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] opacity-60">{formatSummitTimestamp(event.ts)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
