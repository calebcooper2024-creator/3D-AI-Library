import { SummitLatencyEvent, SummitLatencyStage, summitLatencyLabels } from "../../lib/summit/summitEvents";

const stages: SummitLatencyStage[] = [
  "room_connect",
  "stt_partial",
  "stt_final",
  "llm_ttft",
  "tts_first_byte",
  "eot_to_audio",
  "tool_roundtrip",
];

type SummitLatencyPanelProps = {
  events: SummitLatencyEvent[];
};

export function SummitLatencyPanel({ events }: SummitLatencyPanelProps) {
  const latestByStage = new Map<SummitLatencyStage, SummitLatencyEvent>();
  for (const event of events) latestByStage.set(event.stage, event);

  return (
    <div className="rounded-2xl border border-red-300/20 bg-red-950/70 p-4 text-red-50">
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-red-200/60">Latency</p>
      <h3 className="mt-1 text-lg font-semibold text-white">Measured mock trace</h3>

      <div className="mt-4 space-y-2">
        {stages.map((stage) => {
          const event = latestByStage.get(stage);
          const percent = event?.targetMs ? Math.min(100, Math.round((event.valueMs / event.targetMs) * 100)) : 0;
          return (
            <div key={stage} className="rounded-xl border border-red-200/10 bg-black/15 p-3">
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="font-medium text-red-50/85">{summitLatencyLabels[stage]}</span>
                <span className="font-mono text-red-50">{event ? `${event.valueMs}ms` : "pending"}</span>
              </div>
              {event?.targetMs ? (
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-red-900/70">
                  <div className="h-full rounded-full bg-red-100/80" style={{ width: `${percent}%` }} />
                </div>
              ) : null}
              {event?.targetMs ? <p className="mt-2 text-[10px] text-red-100/45">target {event.targetMs}ms</p> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
