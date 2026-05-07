import { ManagedHeroVideo } from '../components/ManagedHeroVideo';
import React from 'react';
import { BookProject } from './portfolio';
import { works } from './works';

const winterHavenShell = works.find((work) => work.id === 'project-winter-haven');

if (!winterHavenShell) {
  throw new Error('Winter Haven shelf record is missing.');
}

const Kicker = ({ n, label, tone = 'light' }: { n: string; label: string; tone?: 'light' | 'dark' }) => (
  <p
    className={`mb-8 font-mono text-[10px] uppercase tracking-[0.32em] ${
      tone === 'light' ? 'text-[#bcefff]/84' : 'text-[#0f6cff]'
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
        tone === 'light' ? 'text-[#bcefff]/84' : 'text-[#0f6cff]'
      }`}
    >
      {label}
    </p>
    <div
      className={`mt-4 min-h-[4.2rem] max-w-[10ch] font-sans text-[clamp(1.55rem,2vw,2.35rem)] font-black leading-[0.95] tracking-tight ${
        tone === 'light' ? 'text-white' : 'text-[#0a1530]'
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
          ? 'mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#bcefff]/84'
          : 'mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#0f6cff]'
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
    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#bcefff]/84">{title}</p>
    <p className="font-serif text-lg leading-relaxed text-white/84">{body}</p>
  </div>
);

export const winterHavenBook: BookProject = {
  ...winterHavenShell,
  title: 'Winter Haven',
  subtitle: 'World Models for Agentic Systems',
  showAuthorBadge: false,
  sections: [
    {
      id: 'winter-haven-hero',
      fullWidthContent: (
        <div className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-[#071228] px-8 py-16 text-white md:px-24">
          <ManagedHeroVideo
            src="/videos/winter-haven-4k.mp4"
            idSeed="winter-haven-hero-video"
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
            videoClassName="absolute inset-0 h-full w-full object-cover opacity-85 pointer-events-none"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(188,239,255,0.16),transparent_22%),radial-gradient(circle_at_82%_22%,rgba(125,211,252,0.12),transparent_20%),radial-gradient(circle_at_60%_78%,rgba(59,130,246,0.1),transparent_24%),linear-gradient(180deg,rgba(5,12,26,0.08),rgba(5,12,26,0.64))]" />

          <div className="relative z-10 max-w-6xl">
            <p className="mb-10 font-mono text-sm uppercase tracking-[0.36em] text-[#bcefff]/82">Winter Haven / Personal Project</p>
            <h1 className="max-w-5xl font-serif text-[8.4vw] leading-[0.84] tracking-tight md:text-[4.8vw]">
              World Models, A2-UI, And Agentic Visualization.
            </h1>
            <p className="mt-8 max-w-3xl font-serif text-[1.32rem] leading-relaxed text-white/88 md:text-[1.5rem]">
              Winter Haven is the forward-looking research surface for world models, agent-to-user interfaces, and the future of agentic visualization. Inspired in part by Google Cloud&apos;s Las Vegas Marathon A2UI demo, it asks what the interface should become when agents are reasoning, delegating, simulating, and explaining in real time.
            </p>

            <div className="mt-20 grid gap-6 border-t border-white/16 pt-8 md:grid-cols-4">
              <MetricTile value="World Models" label="Core Idea" note="The system needs structured internal state, not just text history pretending to be memory." />
              <MetricTile value="A2-UI" label="Interface Layer" note="Agent-to-user interfaces should expose state, actions, uncertainty, and intent more directly than chat alone can." />
              <MetricTile value="AG-UI Signals" label="Event Surfaces" note="Lifecycle, tool, reasoning, and state events create a better contract for rich agentic interaction." />
              <MetricTile value="Future Visualization" label="Direction" note="The page is showing what agentic UI could become when it is built around system state instead of only response text." />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'winter-haven-origin',
      bgColorLeft: 'bg-[#eef8ff]',
      textColorLeft: 'text-[#0a1530]',
      bgColorRight: 'bg-[#08111f]',
      textColorRight: 'text-white',
      leftTitle: 'Why Winter Haven Exists',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="02" label="Direction" tone="dark" />
          <h2 className="max-w-[12ch] font-serif text-5xl leading-[0.92] tracking-tight text-[#0a1530] md:text-6xl">
            The Future Is Not Another Chat Window.
          </h2>
          <p className="max-w-xl border-l-4 border-[#38bdf8] pl-6 font-serif text-xl leading-relaxed text-black/76">
            Once agents have state, memory, tools, simulations, and delegation chains, the interface problem changes. The question is no longer only what the model can say. The question becomes how a world model should be exposed so both the agent and the human can act on it.
          </p>
        </div>
      ),
      rightContent: (
        <div className="space-y-8">
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/86 md:text-[1.24rem]">
            That is what Winter Haven is exploring. It is not only a dashboard and not only a research diagram. It is a working hypothesis about how world models, event streams, delegation state, and operator intent could become a real interface layer for agentic systems.
          </p>
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/80 md:text-[1.24rem]">
            A2-UI matters here because it reframes the UI as an interface between agent cognition and human decision-making. The goal is richer state projection, clearer action affordances, and better ways to surface uncertainty, retrace, and simulation than a plain transcript can provide.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <SignalCard title="World State" body="The interface should show what the system believes, what it is watching, and what is still unresolved." />
            <SignalCard title="Agent To User" body="A2-UI is about building surfaces where agent state and human oversight can meet cleanly." />
            <SignalCard title="Simulation Ready" body="World models become more valuable when they can support prediction, retrace, and what-if interaction." />
          </div>
        </div>
      ),
    },
    {
      id: 'winter-haven-thesis',
      fullWidthContent: (
        <div className="relative flex w-full flex-col items-center overflow-hidden border-y border-[#bcefff] bg-[linear-gradient(135deg,#071228_0%,#155eef_40%,#5eead4_100%)] px-8 py-24 text-center text-white md:px-24 md:py-32">
          <span className="mb-[-4.5rem] select-none font-serif text-[10rem] leading-none text-white/18 md:text-[14rem]">"</span>
          <p className="relative z-10 max-w-5xl font-serif text-4xl leading-tight md:text-5xl">
            World models only become operationally useful when they can be projected into interfaces that let humans and agents inspect state, coordinate actions, and understand why the system is moving the way it is.
          </p>
        </div>
      ),
    },
    {
      id: 'winter-haven-runtime',
      bgColorLeft: 'bg-[#08111f]',
      textColorLeft: 'text-white',
      bgColorRight: 'bg-[#eef8ff]',
      textColorRight: 'text-[#0a1530]',
      leftTitle: 'What The Interface Needs',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="03" label="A2-UI Surface" />
          <h2 className="max-w-[12ch] font-serif text-5xl leading-[0.92] tracking-tight text-white md:text-6xl">
            State, Actions, Retrace, And Simulation.
          </h2>
          <p className="max-w-xl border-l-4 border-[#7dd3fc] pl-6 font-serif text-xl leading-relaxed text-white/76">
            Winter Haven is demonstrating world-model thinking, A2-UI, generative UI, multimodal agentic visualization, and the broader research question of how advanced agent systems should actually present themselves to operators.
          </p>
        </div>
      ),
      rightContent: (
        <div className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2">
            <SignalCard title="State Projections" body="The UI should be able to project graph state, runtime health, delegation state, and memory without flattening them into one blob." tone="light" />
            <SignalCard title="Action Affordances" body="Agentic interfaces should expose what can be approved, routed, simulated, retraced, or escalated right now." tone="light" />
            <SignalCard title="Reasoning Events" body="AG-UI style events make lifecycle, tool calls, reasoning state, and patch-like updates more usable than static snapshots alone." tone="light" />
            <SignalCard title="World-Model Visualization" body="The surface should help users see what the system believes and how that belief evolves over time." tone="light" />
          </div>

          <div className="space-y-4 border border-black/10 bg-white/72 p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#0f6cff]">Playground Placeholder</p>
            <p className="font-serif text-lg leading-relaxed text-black/72">
              Winter Haven still needs its final interactive surface. The placeholder stays here on purpose so the page already reserves space for the eventual A2-UI playground instead of pretending that layer does not exist yet.
            </p>
            <button
              type="button"
              aria-disabled="true"
              className="inline-flex items-center gap-3 border border-[#0f6cff]/18 bg-[#0f6cff]/8 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.28em] text-[#0a1530] opacity-80"
            >
              Winter Haven Playground Reserved
            </button>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-black/56">
            This page is intentionally future-facing. The point is to show the direction of travel for agentic visualization and world-model interfaces, not to pretend every piece is already final.
          </p>
        </div>
      ),
    },
    {
      id: 'winter-haven-capabilities',
      bgColorLeft: 'bg-[#dff3ff]',
      textColorLeft: 'text-[#0a1530]',
      bgColorRight: 'bg-[#10284a]',
      textColorRight: 'text-white',
      leftTitle: 'What It Demonstrates',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="04" label="AI Interface And Research Skills" tone="dark" />
          <h2 className="max-w-[13ch] font-serif text-5xl leading-[0.92] tracking-tight text-[#0a1530] md:text-6xl">
            World Modeling, AI Interface Design, Event Streams, And Simulation.
          </h2>
          <p className="max-w-xl border-l-4 border-[#38bdf8] pl-6 font-serif text-xl leading-relaxed text-black/76">
            Winter Haven demonstrates world-state modeling, agent-to-user interface design, event-driven AI UX, simulation thinking, and operator-facing visualization for complex agentic systems.
          </p>
        </div>
      ),
      rightContent: (
        <div className="grid gap-4 md:grid-cols-2">
          <SystemCard title="World-State Modeling" body="The page is about exposing structured agent belief and system state, not just response text." />
          <SystemCard title="Agent-To-User Interfaces" body="A2-UI is the contract between what the agent knows and what the operator can act on." />
          <SystemCard title="Event-Driven Interaction" body="Lifecycle updates, tool calls, state changes, and retrace events make advanced agent systems more usable." />
          <SystemCard title="Simulation Design" body="The future layer is not only monitoring. It is prediction, what-if interaction, and inspectable forward state." />
        </div>
      ),
    },
    {
      id: 'winter-haven-footer',
      fullWidthContent: (
        <div className="relative min-h-[72vh] overflow-hidden bg-[#061020] px-8 py-20 text-white md:px-24">
          <ManagedHeroVideo
            src="/videos/winter-haven-4k.mp4"
            idSeed="winter-haven-secondary-video"
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
            videoClassName="absolute inset-0 h-full w-full object-cover opacity-85 pointer-events-none"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,12,24,0.1),rgba(5,12,24,0.48))]" />
          <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-5xl flex-col justify-end">
            <Kicker n="05" label="Closing Note" />
            <h2 className="max-w-4xl font-serif text-5xl leading-[0.9] tracking-tight md:text-6xl">
              The next leap is not only better models. It is better interfaces for the models we already know how to build.
            </h2>
            <p className="mt-8 max-w-3xl font-serif text-2xl leading-relaxed text-white/82">
              Winter Haven is the research expression of that idea: world models, A2-UI, agentic visualization, and event-based interaction brought together to show what the future operating surface for complex AI systems could look like.
            </p>
          </div>
        </div>
      ),
    },
  ],
};
