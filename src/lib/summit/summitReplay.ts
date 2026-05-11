import { SummitDemoEvent, getEventTitle } from "./summitEvents";

export function formatSummitTimestamp(ts: number): string {
  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(ts));
}

export function summarizeSummitEvent(event: SummitDemoEvent): string {
  switch (event.type) {
    case "session":
      return event.label;
    case "transcript":
      return `${event.speaker}: ${event.text}`;
    case "intent":
      return `${event.intent} at ${Math.round(event.confidence * 100)} percent confidence`;
    case "tool":
      return `${event.tool} ${event.status}${event.reason ? `: ${event.reason}` : ""}`;
    case "policy":
      return `${event.gate} ${event.decision}: ${event.reason}`;
    case "latency":
      return `${event.stage} measured ${event.valueMs}ms`;
    case "review":
      return `${event.status}: ${event.summary}`;
    case "failure":
      return `${event.label}: ${event.expectedBehavior}`;
    default:
      return getEventTitle(event);
  }
}

export function serializeSummitReplay(events: SummitDemoEvent[]): string {
  return events
    .map((event, index) => {
      const n = String(index + 1).padStart(2, "0");
      return `${n}. [${formatSummitTimestamp(event.ts)}] ${getEventTitle(event)} - ${summarizeSummitEvent(event)}`;
    })
    .join("\n");
}
