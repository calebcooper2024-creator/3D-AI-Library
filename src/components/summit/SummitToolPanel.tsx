import { SummitToolEvent, SummitToolName, SummitToolStatus, summitToolLabels } from "../../lib/summit/summitEvents";

const allTools: SummitToolName[] = [
  "lookup_patient",
  "get_provider_availability",
  "prepare_appointment_for_review",
  "transfer_call",
  "create_staff_task",
  "flag_for_review",
  "log_patient_statement",
];

const statusTone: Record<SummitToolStatus | "idle", string> = {
  idle: "border-red-200/10 text-red-100/45",
  requested: "border-yellow-200/40 bg-yellow-200/10 text-yellow-50",
  approved: "border-emerald-200/35 bg-emerald-200/10 text-emerald-50",
  rejected: "border-red-200/45 bg-red-200/10 text-red-50",
  running: "border-blue-200/40 bg-blue-200/10 text-blue-50",
  succeeded: "border-emerald-200/45 bg-emerald-200/15 text-emerald-50",
  failed: "border-orange-200/45 bg-orange-200/10 text-orange-50",
};

type SummitToolPanelProps = {
  events: SummitToolEvent[];
};

export function SummitToolPanel({ events }: SummitToolPanelProps) {
  const latestByTool = new Map<SummitToolName, SummitToolEvent>();
  for (const event of events) latestByTool.set(event.tool, event);

  return (
    <div className="rounded-2xl border border-red-300/20 bg-red-950/70 p-4 text-red-50">
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-red-200/60">Tool calls</p>
      <h3 className="mt-1 text-lg font-semibold text-white">Policy mediated actions</h3>

      <div className="mt-4 space-y-2">
        {allTools.map((tool) => {
          const latest = latestByTool.get(tool);
          const status = latest?.status ?? "idle";
          return (
            <div key={tool} className={`rounded-xl border px-3 py-2 ${statusTone[status]}`}>
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[11px]">{summitToolLabels[tool]}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.16em]">{status}</span>
              </div>
              {latest?.reason ? <p className="mt-2 text-xs leading-5 opacity-80">{latest.reason}</p> : null}
              {typeof latest?.latencyMs === "number" ? (
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] opacity-60">{latest.latencyMs}ms</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
