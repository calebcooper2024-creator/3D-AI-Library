import { ManagedHeroVideo } from '../components/ManagedHeroVideo';
import React from 'react';
import { BookProject } from './portfolio';
import { works } from './works';

const cortexShell = works.find((work) => work.id === 'cortex');

if (!cortexShell) {
  throw new Error('Cortex shelf record is missing.');
}

const Kicker = ({ n, label, tone = 'light' }: { n: string; label: string; tone?: 'light' | 'dark' }) => (
  <p
    className={`mb-8 font-mono text-[10px] uppercase tracking-[0.32em] ${
      tone === 'light' ? 'text-[#f0b7ff]/84' : 'text-[#9d2cf3]'
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
        tone === 'light' ? 'text-[#f0b7ff]/84' : 'text-[#9d2cf3]'
      }`}
    >
      {label}
    </p>
    <div
      className={`mt-4 min-h-[4.2rem] max-w-[10ch] font-sans text-[clamp(1.55rem,2vw,2.35rem)] font-black leading-[0.95] tracking-tight ${
        tone === 'light' ? 'text-white' : 'text-[#0f0a19]'
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
          ? 'mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#f0b7ff]/84'
          : 'mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#9d2cf3]'
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
    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#f0b7ff]/84">{title}</p>
    <p className="font-serif text-lg leading-relaxed text-white/84">{body}</p>
  </div>
);

export const cortexBook: BookProject = {
  ...cortexShell,
  showAuthorBadge: false,
  sections: [
    {
      id: 'cortex-hero',
      fullWidthContent: (
        <div className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-[#090213] px-8 py-16 text-white md:px-24">
          <ManagedHeroVideo
            src="/videos/cortex-4k.mp4"
            idSeed={`managed-${Math.random().toString(36).substring(7)}`}
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
            videoClassName="h-full w-full object-cover opacity-[0.92]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(240,183,255,0.14),transparent_22%),radial-gradient(circle_at_82%_22%,rgba(103,232,249,0.14),transparent_20%),radial-gradient(circle_at_62%_78%,rgba(59,130,246,0.1),transparent_22%),linear-gradient(180deg,rgba(10,2,24,0.1),rgba(10,2,24,0.68))]" />

          <div className="relative z-10 max-w-6xl">
            <p className="mb-10 font-mono text-sm uppercase tracking-[0.36em] text-[#f0b7ff]/82">Cortex / Personal Project</p>
            <h1 className="max-w-4xl font-serif text-[8.8vw] leading-[0.84] tracking-tight md:text-[5vw]">
              Route The Right Intelligence.
            </h1>
            <p className="mt-8 max-w-3xl font-serif text-[1.32rem] leading-relaxed text-white/88 md:text-[1.5rem]">
              Cortex is the routing runtime that decides when a task deserves a fast small model, a stronger large model, a deterministic tool, a retrieval path, or a fallback chain. It exists so agentic systems can stay accurate, resilient, and cost-aware instead of sending every problem to the biggest model in the room.
            </p>

            <div className="mt-20 grid gap-6 border-t border-white/16 pt-8 md:grid-cols-4">
              <MetricTile value="Small Models First" label="Cost Discipline" note="Cheap bounded work should stay cheap instead of consuming frontier-model budget by default." />
              <MetricTile value="Large When Needed" label="Escalation" note="Harder synthesis and tougher reasoning can be escalated instead of overpaying for every request." />
              <MetricTile value="Fails Over Cleanly" label="Reliability" note="If health, quota, or latency breaks the first path, Cortex should already know what the next safe route is." />
              <MetricTile value="Explains Routes" label="Telemetry" note="Operators should be able to inspect why the runtime made a particular model, tool, or endpoint choice." />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'cortex-origin',
      bgColorLeft: 'bg-[#f7ecff]',
      textColorLeft: 'text-[#0f0a19]',
      bgColorRight: 'bg-[#12071f]',
      textColorRight: 'text-white',
      leftTitle: 'Why Cortex Exists',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="02" label="Origin" tone="dark" />
          <h2 className="max-w-[11ch] font-serif text-5xl leading-[0.92] tracking-tight text-[#0f0a19] md:text-6xl">
            One Stack Is Too Blunt.
          </h2>
          <p className="max-w-xl border-l-4 border-[#d946ef] pl-6 font-serif text-xl leading-relaxed text-black/76">
            A frontier model alone is not a routing strategy. Real systems need cost-aware escalation, deterministic guardrails, backup paths, and clear rules about which jobs can be handled by small models, tools, or retrieval before a larger model ever gets involved.
          </p>
        </div>
      ),
      rightContent: (
        <div className="space-y-8">
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/86 md:text-[1.24rem]">
            Cortex sits in that operational layer. It watches slot health, quota, latency, headroom, task fit, and tool support, then routes work accordingly. The point is not to make the system sound advanced. The point is to keep it running with better judgment than one giant default model call.
          </p>
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/80 md:text-[1.24rem]">
            That is why Cortex matters to agentic engineering: the runtime can choose a compact model for classification, a larger model for synthesis, a deterministic tool for structured work, or a routed endpoint from WinterMarket when the best answer is not pure generation at all.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <SignalCard title="Latency + Cost" body="A route is only good if it respects response time and budget at the same time." />
            <SignalCard title="Tool Eligibility" body="Some work should hit verifiers, retrieval, or deterministic kernels before it ever reaches a large model." />
            <SignalCard title="Traceable Decisions" body="Every meaningful routing choice should leave behind an explanation that an operator can actually inspect." />
          </div>
        </div>
      ),
    },
    {
      id: 'cortex-thesis',
      fullWidthContent: (
        <div className="relative flex w-full flex-col items-center overflow-hidden border-y border-[#f0b7ff] bg-[linear-gradient(135deg,#11061d_0%,#7e22ce_42%,#0891b2_100%)] px-8 py-24 text-center text-white md:px-24 md:py-32">
          <span className="mb-[-4.5rem] select-none font-serif text-[10rem] leading-none text-white/18 md:text-[14rem]">"</span>
          <p className="relative z-10 max-w-5xl font-serif text-4xl leading-tight md:text-5xl">
            Good multi-model systems do not ask which model is best in the abstract. They ask which route is right for this task, this budget, this latency target, and this failure state.
          </p>
        </div>
      ),
    },
    {
      id: 'cortex-runtime',
      bgColorLeft: 'bg-[#090513]',
      textColorLeft: 'text-white',
      bgColorRight: 'bg-[#f1f6ff]',
      textColorRight: 'text-[#0f0a19]',
      leftTitle: 'How Cortex Routes',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="03" label="Routing Runtime" />
          <h2 className="max-w-[13ch] font-serif text-5xl leading-[0.92] tracking-tight text-white md:text-6xl">
            Multi-Model Routing, Tool Choice, And Failover.
          </h2>
          <p className="max-w-xl border-l-4 border-[#67e8f9] pl-6 font-serif text-xl leading-relaxed text-white/76">
            Cortex demonstrates AI engineering at the runtime layer: orchestration, routing policy, failover, telemetry, cost control, and the discipline to treat models, embeddings, tools, and structured endpoints as different instruments with different jobs.
          </p>
        </div>
      ),
      rightContent: (
        <div className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2">
            <SignalCard title="Small-Model Passes" body="Classification, extraction, triage, and low-risk decisions can stay on cheaper faster models when the task does not require frontier-scale reasoning." tone="light" />
            <SignalCard title="Large-Model Escalation" body="Harder synthesis, longer-context reasoning, and higher-stakes interpretation can be escalated when the runtime has evidence that the extra cost is justified." tone="light" />
            <SignalCard title="Deterministic Paths" body="Structured workflows can be routed into APIs, verifiers, and deterministic tools instead of pretending language generation is the only kind of intelligence." tone="light" />
            <SignalCard title="Route Explanations" body="Latency, quota, health, tool support, and backup rules all feed route explanations that keep the runtime inspectable." tone="light" />
          </div>

          <a
            href="/cortex-playground/dist/index.html"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 border border-black/12 bg-black px-6 py-4 font-mono text-[11px] uppercase tracking-[0.28em] text-white transition-colors hover:bg-black/85"
          >
            Open Cortex Playground
            <span aria-hidden="true">{'->'}</span>
          </a>

          <p className="max-w-2xl text-sm leading-relaxed text-black/56">
            Cortex is not the cognitive boss. It is the routing substrate. That is exactly why it matters: it makes better execution choices without pretending it is the one doing the final thinking.
          </p>
        </div>
      ),
    },
    {
      id: 'cortex-skills',
      bgColorLeft: 'bg-[#dcfbff]',
      textColorLeft: 'text-[#0f0a19]',
      bgColorRight: 'bg-[#1d0a39]',
      textColorRight: 'text-white',
      leftTitle: 'What It Demonstrates',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="04" label="AI Engineering Skills" tone="dark" />
          <h2 className="max-w-[13ch] font-serif text-5xl leading-[0.92] tracking-tight text-[#0f0a19] md:text-6xl">
            Model Routing, Tool Integration, Reliability, And Cost Control.
          </h2>
          <p className="max-w-xl border-l-4 border-[#0891b2] pl-6 font-serif text-xl leading-relaxed text-black/76">
            Cortex demonstrates multi-model orchestration, tool and API routing, reliability engineering, telemetry, and inference cost control. It shows how to keep an AI system fast, inspectable, and economically sane instead of routing everything through one expensive default path.
          </p>
        </div>
      ),
      rightContent: (
        <div className="grid gap-4 md:grid-cols-2">
          <SystemCard title="Multi-Model Orchestration" body="Cortex mixes small models, stronger reasoning models, verifier passes, and backup endpoints instead of treating one model as the whole system." />
          <SystemCard title="Tool And API Routing" body="The runtime can choose retrieval paths, APIs, and structured tools when the job wants something more reliable than free-form generation." />
          <SystemCard title="Reliability And Failover" body="Latency, quota, provider health, and backup rules stay part of the routing decision so the stack degrades cleanly instead of failing loudly." />
          <SystemCard title="Telemetry And Cost Governance" body="This project shows the operational layer where route explanations, spend discipline, and inspectable execution decisions keep multi-agent systems usable." />
        </div>
      ),
    },
    {
      id: 'cortex-footer',
      fullWidthContent: (
        <div className="relative min-h-[72vh] overflow-hidden bg-[#080314] px-8 py-20 text-white md:px-24">
          <ManagedHeroVideo
            src="/videos/cortex-4k.mp4"
            idSeed={`managed-${Math.random().toString(36).substring(7)}`}
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
            videoClassName="h-full w-full object-cover opacity-[0.84]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,4,24,0.18),rgba(10,4,24,0.6))]" />
          <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-5xl flex-col justify-end">
            <Kicker n="05" label="Closing Note" />
            <h2 className="max-w-4xl font-serif text-5xl leading-[0.9] tracking-tight md:text-6xl">
              The better the routing layer gets, the less often the system has to waste money sounding impressive.
            </h2>
            <p className="mt-8 max-w-3xl font-serif text-2xl leading-relaxed text-white/82">
              Cortex is where multi-model orchestration, deterministic execution, telemetry, and failover become one usable runtime. It is an AI engineering surface built to make the whole stack smarter about when to spend, when to escalate, and when to stay simple.
            </p>
          </div>
        </div>
      ),
    },
  ],
};
