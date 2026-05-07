import React from 'react';
import { BookProject } from './portfolio';
import { works } from './works';

const panopticonShell = works.find((work) => work.id === 'panopticon');

if (!panopticonShell) {
  throw new Error('Panopticon shelf record is missing.');
}

const Kicker = ({ n, label, tone = 'light' }: { n: string; label: string; tone?: 'light' | 'dark' }) => (
  <p
    className={`mb-8 font-mono text-[10px] uppercase tracking-[0.32em] ${
      tone === 'light' ? 'text-[#ffb4b4]/84' : 'text-[#d92d20]'
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
        tone === 'light' ? 'text-[#ffb4b4]/84' : 'text-[#d92d20]'
      }`}
    >
      {label}
    </p>
    <div
      className={`mt-4 min-h-[4.2rem] max-w-[10ch] font-sans text-[clamp(1.55rem,2vw,2.35rem)] font-black leading-[0.95] tracking-tight ${
        tone === 'light' ? 'text-white' : 'text-[#1d0b0b]'
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
          ? 'mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#ffb4b4]/84'
          : 'mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#d92d20]'
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
    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#ffb4b4]/84">{title}</p>
    <p className="font-serif text-lg leading-relaxed text-white/84">{body}</p>
  </div>
);

export const panopticonBook: BookProject = {
  ...panopticonShell,
  showAuthorBadge: false,
  sections: [
    {
      id: 'panopticon-hero',
      fullWidthContent: (
        <div className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-[#130707] px-8 py-16 text-white md:px-24">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/books/panopticon_1777746444071.png"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.9]"
          >
            <source src="/videos/panopticon-4k.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,180,180,0.14),transparent_22%),radial-gradient(circle_at_82%_24%,rgba(255,255,255,0.08),transparent_20%),radial-gradient(circle_at_62%_78%,rgba(239,68,68,0.12),transparent_24%),linear-gradient(180deg,rgba(18,6,6,0.08),rgba(18,6,6,0.64))]" />

          <div className="relative z-10 max-w-6xl">
            <p className="mb-10 font-mono text-sm uppercase tracking-[0.36em] text-[#ffb4b4]/82">The Panopticon / Personal Project</p>
            <h1 className="max-w-4xl font-serif text-[8.5vw] leading-[0.84] tracking-tight md:text-[4.9vw]">
              Observe Systems While They Change.
            </h1>
            <p className="mt-8 max-w-3xl font-serif text-[1.32rem] leading-relaxed text-white/88 md:text-[1.5rem]">
              The Panopticon is a system observer for complex systems that evolve, drift, and grow over time. It stays local-first, read-only, and evidence-led so you can inspect freshness, provenance, runtime behavior, and system change without confusing observation with control.
            </p>

            <div className="mt-20 grid gap-6 border-t border-white/16 pt-8 md:grid-cols-4">
              <MetricTile value="Freshness First" label="Time" note="A good observer needs to know what changed, what stalled, and what may already be stale." />
              <MetricTile value="Read-Only By Default" label="Role" note="Inspection becomes more trustworthy when the observer is not quietly rewriting the thing it is describing." />
              <MetricTile value="Local Context" label="Grounding" note="Workspace-grounded retrieval matters more than theatrical intelligence when the goal is inspection." />
              <MetricTile value="System Drift" label="Observability" note="Growing systems need timelines, provenance, and change awareness, not just a static status badge." />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'panopticon-origin',
      bgColorLeft: 'bg-[#fff0ef]',
      textColorLeft: 'text-[#1d0b0b]',
      bgColorRight: 'bg-[#140909]',
      textColorRight: 'text-white',
      leftTitle: 'Why Panopticon Exists',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="02" label="Origin" tone="dark" />
          <h2 className="max-w-[13ch] font-serif text-5xl leading-[0.92] tracking-tight text-[#1d0b0b] md:text-6xl">
            Complex Systems Drift Faster Than Their Docs.
          </h2>
          <p className="max-w-xl border-l-4 border-[#ef4444] pl-6 font-serif text-xl leading-relaxed text-black/76">
            The Panopticon exists because long-running systems change constantly. Files move. Services degrade. Runtime assumptions expire. A serious observer needs to track freshness, provenance, topology, and behavioral drift without pretending to be the control plane itself.
          </p>
        </div>
      ),
      rightContent: (
        <div className="space-y-8">
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/86 md:text-[1.24rem]">
            That observer-first posture is the point. Panopticon is not a voice toy and not a shadow orchestrator. It is a local-first companion for grounding, inspection, source awareness, and runtime visibility in systems that are too complex to trust blindly.
          </p>
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/80 md:text-[1.24rem]">
            In practice, that means timeline views, source-status checks, local retrieval over workspace material, read-only reasoning, and a stronger sense of what is current, what is inherited, and what is only a projection.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <SignalCard title="Observer First" body="The job is to inspect and ground, not to seize control or fake confidence." />
            <SignalCard title="Freshness + Drift" body="System health includes knowing when assumptions or sources have aged out." />
            <SignalCard title="Provenance" body="Inspection becomes more useful when every surfaced claim can point back to where it came from." />
          </div>
        </div>
      ),
    },
    {
      id: 'panopticon-thesis',
      fullWidthContent: (
        <div className="relative flex w-full flex-col items-center overflow-hidden border-y border-[#ffb4b4] bg-[linear-gradient(135deg,#140909_0%,#7f1d1d_42%,#f87171_100%)] px-8 py-24 text-center text-white md:px-24 md:py-32">
          <span className="mb-[-4.5rem] select-none font-serif text-[10rem] leading-none text-white/18 md:text-[14rem]">"</span>
          <p className="relative z-10 max-w-5xl font-serif text-4xl leading-tight md:text-5xl">
            The more a system evolves, the more valuable a read-only observer becomes. You need a way to see drift, provenance, and freshness before you let confidence outrun evidence.
          </p>
        </div>
      ),
    },
    {
      id: 'panopticon-runtime',
      bgColorLeft: 'bg-[#110707]',
      textColorLeft: 'text-white',
      bgColorRight: 'bg-[#fff1ee]',
      textColorRight: 'text-[#1d0b0b]',
      leftTitle: 'What Panopticon Watches',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="03" label="System Observer" />
          <h2 className="max-w-[12ch] font-serif text-5xl leading-[0.92] tracking-tight text-white md:text-6xl">
            Topology, Timelines, Freshness, And Evidence.
          </h2>
          <p className="max-w-xl border-l-4 border-[#ffb4b4] pl-6 font-serif text-xl leading-relaxed text-white/76">
            Panopticon demonstrates local-first observability, workspace-grounded retrieval, evidence-led inspection, and the broader skill of building truthful companion systems for complex AI infrastructure.
          </p>
        </div>
      ),
      rightContent: (
        <div className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2">
            <SignalCard title="Timeline Surfaces" body="The observer should make it easy to see what changed and when, especially in systems that never really stop moving." tone="light" />
            <SignalCard title="Source Status" body="A good answer about a system includes which source it came from and whether that source is current enough to trust." tone="light" />
            <SignalCard title="Local Retrieval" body="Panopticon benefits from grounded retrieval over the local workspace instead of pretending remote memory is always more useful." tone="light" />
            <SignalCard title="Read-Only Safety" body="The role stays clean because Panopticon can inspect, summarize, and question without silently mutating the thing it is describing." tone="light" />
          </div>

          <a
            href="/work/panopticon/panopticon-playground/World%20Model.html"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 border border-black/12 bg-black px-6 py-4 font-mono text-[11px] uppercase tracking-[0.28em] text-white transition-colors hover:bg-black/85"
          >
            Open Panopticon Playground
            <span aria-hidden="true">{'->'}</span>
          </a>

          <p className="max-w-2xl text-sm leading-relaxed text-black/56">
            Panopticon should feel like a serious observer for evolving systems: grounded, inspectable, time-aware, and cautious about what it claims to know.
          </p>
        </div>
      ),
    },
    {
      id: 'panopticon-skills',
      bgColorLeft: 'bg-[#ffe2d8]',
      textColorLeft: 'text-[#1d0b0b]',
      bgColorRight: 'bg-[#4b0c1e]',
      textColorRight: 'text-white',
      leftTitle: 'What It Demonstrates',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="04" label="AI Observability Skills" tone="dark" />
          <h2 className="max-w-[13ch] font-serif text-5xl leading-[0.92] tracking-tight text-[#1d0b0b] md:text-6xl">
            Observability, Provenance, Retrieval, And Drift Detection.
          </h2>
          <p className="max-w-xl border-l-4 border-[#d92d20] pl-6 font-serif text-xl leading-relaxed text-black/76">
            Panopticon demonstrates local-first retrieval, source freshness, change detection, evidence traceability, and read-only system observation for complex environments that keep evolving underneath you.
          </p>
        </div>
      ),
      rightContent: (
        <div className="grid gap-4 md:grid-cols-2">
          <SystemCard title="Local-First Retrieval" body="A serious observer starts with the workspace, not with hand-wavy remote memory claims that cannot show their source." />
          <SystemCard title="Source Freshness" body="Panopticon treats time as part of truth. It should be able to tell when a claim, file, or mental model has drifted out of date." />
          <SystemCard title="Evidence Traceability" body="Every strong observer needs to expose where a claim came from, how current the source is, and what still remains unverified." />
          <SystemCard title="Drift Detection" body="This project demonstrates how a useful AI companion can stay grounded, cautious, and operationally valuable while tracking change over time." />
        </div>
      ),
    },
    {
      id: 'panopticon-footer',
      fullWidthContent: (
        <div className="relative min-h-[72vh] overflow-hidden bg-[#130707] px-8 py-20 text-white md:px-24">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/books/panopticon_1777746444071.png"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.84]"
          >
            <source src="/videos/panopticon-4k.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,6,6,0.14),rgba(18,6,6,0.56))]" />
          <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-5xl flex-col justify-end">
            <Kicker n="05" label="Closing Note" />
            <h2 className="max-w-4xl font-serif text-5xl leading-[0.9] tracking-tight md:text-6xl">
              An observer earns trust by staying grounded while everything else keeps moving.
            </h2>
            <p className="mt-8 max-w-3xl font-serif text-2xl leading-relaxed text-white/82">
              The Panopticon is built to be that layer for complex systems: local-first, provenance-aware, time-aware, and honest enough to tell you what it can see, what it cannot settle, and what needs a closer look.
            </p>
          </div>
        </div>
      ),
    },
  ],
};
