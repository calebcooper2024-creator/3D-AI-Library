import React from 'react';
import { BookProject } from './portfolio';
import { works } from './works';

const dashboardsShell = works.find((work) => work.id === 'life-tap-labs');

if (!dashboardsShell) {
  throw new Error('Life Tap Labs shelf record is missing.');
}

const Kicker = ({ n, label, tone = 'light' }: { n: string; label: string; tone?: 'light' | 'dark' }) => (
  <p
    className={`mb-8 font-mono text-[10px] uppercase tracking-[0.32em] ${
      tone === 'light' ? 'text-[#ffd886]/84' : 'text-[#b45309]'
    }`}
  >
    {n} - {label}
  </p>
);

const MetricTile = ({
  value,
  label,
  note,
  tone = 'light',
}: {
  value: string;
  label: string;
  note: string;
  tone?: 'light' | 'dark';
}) => (
  <div
    className={`flex min-h-[210px] flex-col border p-5 md:p-6 ${
      tone === 'light' ? 'border-white/14 bg-black/16' : 'border-black/10 bg-white/82'
    }`}
  >
    <p
      className={`font-mono text-[10px] uppercase tracking-[0.28em] ${
        tone === 'light' ? 'text-[#ffd886]/84' : 'text-[#b45309]'
      }`}
    >
      {label}
    </p>
    <div
      className={`mt-4 min-h-[4.2rem] max-w-[10ch] font-sans text-[clamp(1.55rem,2vw,2.35rem)] font-black leading-[0.95] tracking-tight ${
        tone === 'light' ? 'text-white' : 'text-[#1a1205]'
      }`}
    >
      {value}
    </div>
    <p className={`mt-auto pt-4 text-[13px] leading-relaxed ${tone === 'light' ? 'text-white/72' : 'text-black/64'}`}>{note}</p>
  </div>
);

const SignalCard = ({
  title,
  body,
  tone = 'dark',
}: {
  title: string;
  body: React.ReactNode;
  tone?: 'dark' | 'light';
}) => (
  <div className={tone === 'dark' ? 'border border-white/10 bg-white/6 p-6' : 'border border-black/10 bg-white/82 p-6'}>
    <p
      className={
        tone === 'dark'
          ? 'mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#ffd886]/84'
          : 'mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#b45309]'
      }
    >
      {title}
    </p>
    <div className={tone === 'dark' ? 'font-serif text-lg leading-relaxed text-white/84' : 'font-serif text-lg leading-relaxed text-black/72'}>{body}</div>
  </div>
);

const SystemCard = ({
  title,
  body,
}: {
  title: string;
  body: string;
}) => (
  <div className="border border-white/10 bg-black/16 p-6 backdrop-blur-sm">
    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#ffd886]/84">{title}</p>
    <p className="font-serif text-lg leading-relaxed text-white/84">{body}</p>
  </div>
);

export const agenticDashboardsBook: BookProject = {
  ...dashboardsShell,
  title: 'Agentic Dashboards',
  subtitle: 'Operator Surfaces for Agentic Systems',
  showAuthorBadge: false,
  sections: [
    {
      id: 'agentic-dashboards-hero',
      fullWidthContent: (
        <div className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-[#1a1206] px-8 py-16 text-white md:px-24">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/books/life_tap_1777746431592.png"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.9]"
          >
            <source src="/videos/agentic-dashboards-4k.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,216,134,0.16),transparent_22%),radial-gradient(circle_at_82%_24%,rgba(45,212,191,0.12),transparent_20%),radial-gradient(circle_at_60%_78%,rgba(251,146,60,0.1),transparent_24%),linear-gradient(180deg,rgba(18,10,2,0.1),rgba(18,10,2,0.66))]" />

          <div className="relative z-10 max-w-6xl">
            <p className="mb-10 font-mono text-sm uppercase tracking-[0.36em] text-[#ffd886]/82">Agentic Dashboards / Personal Project</p>
            <h1 className="max-w-4xl font-serif text-[8.5vw] leading-[0.84] tracking-tight md:text-[4.9vw]">
              Operator Surfaces For Agentic Systems.
            </h1>
            <p className="mt-8 max-w-3xl font-serif text-[1.32rem] leading-relaxed text-white/88 md:text-[1.5rem]">
              Agentic Dashboards is the control-plane surface for traces, approvals, prompts, artifacts, execution state, and governance. It is where agentic engineering becomes inspectable instead of disappearing behind a chat box or a fake-live demo.
            </p>

            <div className="mt-20 grid gap-6 border-t border-white/16 pt-8 md:grid-cols-4">
              <MetricTile value="Trace Telemetry" label="Observability" note="The operator needs route history, cost, latency, and execution state without digging through logs." />
              <MetricTile value="Prompt Ops" label="Artifacts" note="Prompt versions, tool contracts, and working artifacts belong in the same surface as the runtime they affect." />
              <MetricTile value="Human Approval" label="Governance" note="High-impact actions need explicit review states, not decorative confidence scores." />
              <MetricTile value="Execution Views" label="A2UI" note="The UI should help people and agents share state instead of trapping the system inside one linear conversation." />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'agentic-dashboards-origin',
      bgColorLeft: 'bg-[#fff4e3]',
      textColorLeft: 'text-[#1a1205]',
      bgColorRight: 'bg-[#140d06]',
      textColorRight: 'text-white',
      leftTitle: 'Why This Surface Exists',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="02" label="Origin" tone="dark" />
          <h2 className="max-w-[12ch] font-serif text-5xl leading-[0.92] tracking-tight text-[#1a1205] md:text-6xl">
            A Swarm Without A Surface Is Not Manageable.
          </h2>
          <p className="max-w-xl border-l-4 border-[#f59e0b] pl-6 font-serif text-xl leading-relaxed text-black/76">
            Agentic systems need decision surfaces, not decorative dashboards. The point is to give operators a truthful place to inspect traces, understand approvals, review prompt artifacts, and manage generative workflows without pretending every panel is equally authoritative.
          </p>
        </div>
      ),
      rightContent: (
        <div className="space-y-8">
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/86 md:text-[1.24rem]">
            That is why this page is framed as Agentic Dashboards, not just a storefront. It is a product-management and AI-engineering surface at the same time: it has to communicate state, make human-in-the-loop review usable, and keep prompt ops, routing telemetry, and execution history connected.
          </p>
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/80 md:text-[1.24rem]">
            The skill being demonstrated here is not only UI polish. It is agentic UX, governance design, state projection, traceability, and the discipline to make complex systems understandable to people who still have to make real decisions.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <SignalCard title="Human-In-The-Loop" body="Approvals, escalations, and rollback states are part of the product, not edge cases." />
            <SignalCard title="Prompt + Tooling Ops" body="Prompts, tools, contracts, and runtime traces need to live in one coherent operational surface." />
            <SignalCard title="Agentic UX" body="Generative systems need interfaces that can surface live state, not just output text." />
          </div>
        </div>
      ),
    },
    {
      id: 'agentic-dashboards-thesis',
      fullWidthContent: (
        <div className="relative flex w-full flex-col items-center overflow-hidden border-y border-[#ffd886] bg-[linear-gradient(135deg,#1a1205_0%,#c46a00_42%,#14b8a6_100%)] px-8 py-24 text-center text-white md:px-24 md:py-32">
          <span className="mb-[-4.5rem] select-none font-serif text-[10rem] leading-none text-white/18 md:text-[14rem]">"</span>
          <p className="relative z-10 max-w-5xl font-serif text-4xl leading-tight md:text-5xl">
            If an agentic system cannot show its traces, approvals, artifacts, and execution state cleanly, it is not ready for real operators no matter how good the model output looks in a demo.
          </p>
        </div>
      ),
    },
    {
      id: 'agentic-dashboards-runtime',
      bgColorLeft: 'bg-[#120c05]',
      textColorLeft: 'text-white',
      bgColorRight: 'bg-[#edfdf8]',
      textColorRight: 'text-[#1a1205]',
      leftTitle: 'What The Dashboard Carries',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="03" label="Control Plane" />
          <h2 className="max-w-[12ch] font-serif text-5xl leading-[0.92] tracking-tight text-white md:text-6xl">
            Traces, Approvals, Artifacts, And Runtime State.
          </h2>
          <p className="max-w-xl border-l-4 border-[#ffd886] pl-6 font-serif text-xl leading-relaxed text-white/76">
            Agentic Dashboards demonstrates AI product thinking, generative UI, prompt operations, telemetry design, and human-centered orchestration. It is meant to show the operational anatomy of the system, not only the final answer layer.
          </p>
        </div>
      ),
      rightContent: (
        <div className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2">
            <SignalCard title="Route + Cost Views" body="Operators need to see what the system routed, why it routed it, and what that choice cost." tone="light" />
            <SignalCard title="Governance Queues" body="Approval states, blocked actions, and review loops are part of the runtime, not compliance afterthoughts." tone="light" />
            <SignalCard title="Prompt + Artifact Surfaces" body="Prompt engineering, tool definitions, and generated artifacts should be inspectable as system components." tone="light" />
            <SignalCard title="Execution Narratives" body="A good dashboard can explain what the swarm is doing in plain operational language without hiding the underlying structure." tone="light" />
          </div>

          <a
            href="/work/life-tap-labs/ltl-playground/dist/index.html"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 border border-black/12 bg-black px-6 py-4 font-mono text-[11px] uppercase tracking-[0.28em] text-white transition-colors hover:bg-black/85"
          >
            Open Agentic Dashboards Playground
            <span aria-hidden="true">{'->'}</span>
          </a>

          <p className="max-w-2xl text-sm leading-relaxed text-black/56">
            This is where AI engineering meets operator design: telemetry, prompt operations, governance, execution state, and decision support all have to become one coherent surface.
          </p>
        </div>
      ),
    },
    {
      id: 'agentic-dashboards-skills',
      bgColorLeft: 'bg-[#d8fff4]',
      textColorLeft: 'text-[#1a1205]',
      bgColorRight: 'bg-[#5f3200]',
      textColorRight: 'text-white',
      leftTitle: 'What It Demonstrates',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="04" label="AI Product And UX Skills" tone="dark" />
          <h2 className="max-w-[13ch] font-serif text-5xl leading-[0.92] tracking-tight text-[#1a1205] md:text-6xl">
            Agentic UX, Prompt Operations, Governance, And Telemetry Design.
          </h2>
          <p className="max-w-xl border-l-4 border-[#14b8a6] pl-6 font-serif text-xl leading-relaxed text-black/76">
            Agentic Dashboards demonstrates operator UX, prompt and tool operations, human-review workflow design, telemetry surfaces, and the product judgment required to make a complex AI system understandable to real operators.
          </p>
        </div>
      ),
      rightContent: (
        <div className="grid gap-4 md:grid-cols-2">
          <SystemCard title="Operational Telemetry" body="Operators need to see route decisions, execution state, costs, and runtime health without digging through raw logs." />
          <SystemCard title="Human Review Workflow" body="Approvals, escalations, blocked actions, and rollback states are part of the product, not paperwork added after the build." />
          <SystemCard title="Prompt And Tool Operations" body="Prompt versions, tool contracts, generated artifacts, and execution notes become first-class product surfaces instead of hidden implementation details." />
          <SystemCard title="Agentic UX Design" body="The dashboard shows how to make a complex AI system understandable, navigable, and reviewable for the people who still have to make real decisions." />
        </div>
      ),
    },
    {
      id: 'agentic-dashboards-footer',
      fullWidthContent: (
        <div className="relative min-h-[72vh] overflow-hidden bg-[#120b05] px-8 py-20 text-white md:px-24">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/books/life_tap_1777746431592.png"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.84]"
          >
            <source src="/videos/agentic-dashboards-4k.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,10,2,0.16),rgba(18,10,2,0.58))]" />
          <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-5xl flex-col justify-end">
            <Kicker n="05" label="Closing Note" />
            <h2 className="max-w-4xl font-serif text-5xl leading-[0.9] tracking-tight md:text-6xl">
              Agentic systems become believable when the operator surface is honest enough to carry real decisions.
            </h2>
            <p className="mt-8 max-w-3xl font-serif text-2xl leading-relaxed text-white/82">
              Agentic Dashboards is the demonstration of that layer: a place where prompt ops, telemetry, approvals, artifacts, and execution views become a real interface for AI product work instead of a pile of disconnected admin panels.
            </p>
          </div>
        </div>
      ),
    },
  ],
};
