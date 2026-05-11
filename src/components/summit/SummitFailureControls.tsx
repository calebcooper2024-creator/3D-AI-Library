import { SummitDemoScenario, SummitDemoScenarioId } from "../../lib/summit/summitEvents";

type SummitFailureControlsProps = {
  scenarios: SummitDemoScenario[];
  selectedScenarioId: SummitDemoScenarioId;
  onSelectScenario: (scenarioId: SummitDemoScenarioId) => void;
  disabled?: boolean;
};

export function SummitFailureControls({
  scenarios,
  selectedScenarioId,
  onSelectScenario,
  disabled,
}: SummitFailureControlsProps) {
  const selected = scenarios.find((scenario) => scenario.id === selectedScenarioId) ?? scenarios[0];

  return (
    <div className="rounded-2xl border border-red-300/20 bg-red-950/70 p-4 text-red-50">
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-red-200/60">Failure injection</p>
      <h3 className="mt-1 text-lg font-semibold text-white">Scenario control</h3>
      <p className="mt-2 text-sm leading-6 text-red-100/70">Choose the trace the mock room should play. These become the same event shapes the LiveKit agent will emit later.</p>

      <div className="mt-4 space-y-2">
        {scenarios.map((scenario) => {
          const isSelected = scenario.id === selectedScenarioId;
          return (
            <button
              key={scenario.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelectScenario(scenario.id)}
              className={`w-full rounded-xl border px-3 py-2 text-left transition ${
                isSelected
                  ? "border-red-100/60 bg-red-50 text-red-950"
                  : "border-red-200/15 bg-black/15 text-red-50 hover:bg-red-900/70"
              } disabled:cursor-not-allowed disabled:opacity-50`}
            >
              <span className="block text-xs font-bold uppercase tracking-[0.16em]">{scenario.label}</span>
              <span className={`mt-1 block text-xs leading-5 ${isSelected ? "text-red-950/70" : "text-red-100/55"}`}>{scenario.description}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-xl border border-red-200/15 bg-black/20 p-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-200/50">Expected behavior</p>
        <p className="mt-2 text-sm leading-6 text-red-50">{selected.expectedOutcome}</p>
      </div>
    </div>
  );
}
