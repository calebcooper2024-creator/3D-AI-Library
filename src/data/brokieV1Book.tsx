import { ManagedHeroVideo } from '../components/ManagedHeroVideo';
import React from 'react';
import { BookProject } from './portfolio';
import { works } from './works';

const brokieV1Shell = works.find((work) => work.id === 'brokie-v1');

if (!brokieV1Shell) {
  throw new Error('Brokie V1 shelf record is missing.');
}

const Kicker = ({ n, label, tone = 'light' }: { n: string; label: string; tone?: 'light' | 'dark' }) => (
  <p
    className={`mb-8 font-mono text-[10px] uppercase tracking-[0.32em] ${
      tone === 'light' ? 'text-[#8eeeff]/82' : 'text-[#0c8aa8]'
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
      tone === 'light' ? 'border-white/12 bg-black/20' : 'border-black/8 bg-white/78'
    }`}
  >
    <p
      className={`font-mono text-[10px] uppercase tracking-[0.28em] ${
        tone === 'light' ? 'text-[#8eeeff]/80' : 'text-[#0c8aa8]'
      }`}
    >
      {label}
    </p>
    <div
      className={`mt-4 min-h-[4.2rem] max-w-[10ch] font-sans text-[clamp(1.55rem,2vw,2.35rem)] font-black leading-[0.95] tracking-tight ${
        tone === 'light' ? 'text-white' : 'text-[#0a1120]'
      }`}
    >
      {value}
    </div>
    <p className={`mt-auto pt-4 text-[13px] leading-relaxed ${tone === 'light' ? 'text-white/68' : 'text-black/64'}`}>{note}</p>
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
  <div className={tone === 'dark' ? 'border border-white/10 bg-white/6 p-6' : 'border border-black/10 bg-white/78 p-6'}>
    <p
      className={
        tone === 'dark'
          ? 'mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#8eeeff]/80'
          : 'mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#0c8aa8]'
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
    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#8eeeff]/80">{title}</p>
    <p className="font-serif text-lg leading-relaxed text-white/82">{body}</p>
  </div>
);

export const brokieV1Book: BookProject = {
  ...brokieV1Shell,
  showAuthorBadge: false,
  sections: [
    {
      id: 'brokie-v1-hero',
      fullWidthContent: (
        <div className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-[#07111d] px-8 py-16 text-white md:px-24">
          <ManagedHeroVideo
            src="/videos/brokie-v1-4k.mp4"
            idSeed="brokie-v1-hero-video"
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
            videoClassName="absolute inset-0 h-full w-full object-cover opacity-85 pointer-events-none"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(94,242,255,0.12),transparent_24%),radial-gradient(circle_at_82%_24%,rgba(201,255,91,0.08),transparent_22%),radial-gradient(circle_at_60%_80%,rgba(255,183,107,0.08),transparent_26%),linear-gradient(180deg,rgba(5,10,18,0.06),rgba(5,10,18,0.54))]" />

          <div className="relative z-10 max-w-6xl">
            <p className="mb-10 font-mono text-sm uppercase tracking-[0.36em] text-[#8eeeff]/78">Brokie V1 / Personal Project</p>
            <h1 className="max-w-4xl font-serif text-[9vw] leading-[0.84] tracking-tight md:text-[5vw]">
              Compression That Still Rebuilds.
            </h1>
            <p className="mt-8 max-w-3xl font-serif text-[1.32rem] leading-relaxed text-white/88 md:text-[1.5rem]">
              Brokie V1 is a multi-stage A2A handoff compressor built to make agent-to-agent communication as efficient as possible. It uses structured codebook reduction, intra-message pruning, wire compression, and pointer-based rehydration so an always-on swarm running under heavy load can keep operating without costing a Porsche or a mortgage.
            </p>

            <div className="mt-20 grid gap-6 border-t border-white/16 pt-8 md:grid-cols-4">
              <MetricTile value="Encodes" label="Stage 4" note="Common agent patterns collapse into short, structured codes before the payload keeps growing." />
              <MetricTile value="Prunes" label="Stage 5" note="Low-value tokens inside the message drop out before they become recurring transport cost." />
              <MetricTile value="Compresses" label="Stage 8" note="Serialized payloads get a byte-level squeeze before they cross the wire." />
              <MetricTile value="Rehydrates" label="Stage 10" note="The next worker pulls back only the context it needs instead of reloading the whole history." />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'brokie-v1-origin',
      bgColorLeft: 'bg-[#eefbf5]',
      textColorLeft: 'text-[#0a1120]',
      bgColorRight: 'bg-[#0a1320]',
      textColorRight: 'text-white',
      leftTitle: 'Why Brokie V1 Exists',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="02" label="Origin" tone="dark" />
          <h2 className="max-w-[11ch] font-serif text-5xl leading-[0.92] tracking-tight text-[#0a1120] md:text-6xl">
            The Handoff Was The Tax.
          </h2>
          <p className="max-w-xl border-l-4 border-[#15b8d6] pl-6 font-serif text-xl leading-relaxed text-black/76">
            Most multi-agent systems do not fail on the answer. They fail on the pass. Too much context gets repeated, resent, and re-billed between workers, which means the system starts paying for transport instead of progress and 24/7 swarm economics get ugly fast.
          </p>
        </div>
      ),
      rightContent: (
        <div className="space-y-8">
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/86 md:text-[1.24rem]">
            Brokie V1 is not a generic summarizer and it is not a prettier way to truncate chat history. The point is to reduce the payload while preserving the anatomy that lets another worker recover what matters on demand.
          </p>
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/80 md:text-[1.24rem]">
            That means keeping structural clues, task shape, dependency handles, and rehydration paths intact. A smaller payload that cannot be rebuilt is just failure in a cheaper format.
          </p>
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/80 md:text-[1.24rem]">
            Brokie exists so long routes can stay disciplined. The next worker should inherit the right map, not the whole world.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <SignalCard title="Budget Discipline" body="Token ceilings are part of the protocol, not cleanup work after the route is already bloated." />
            <SignalCard title="Reference Retention" body="The compressed packet still needs to know what can be recovered and where it lives." />
            <SignalCard title="Route Hygiene" body="Cleaner handoffs make the whole chain easier to trace, test, and afford." />
          </div>
        </div>
      ),
    },
    {
      id: 'brokie-v1-thesis',
      fullWidthContent: (
        <div className="relative flex w-full flex-col items-center overflow-hidden border-y border-[#c7f3ff] bg-[linear-gradient(135deg,#dbf8ff_0%,#e9ffdd_44%,#fff2d7_100%)] px-8 py-24 text-center text-[#0a1120] md:px-24 md:py-32">
          <span className="mb-[-4.5rem] select-none font-serif text-[10rem] leading-none text-white/46 md:text-[14rem]">"</span>
          <p className="relative z-10 max-w-5xl font-serif text-4xl leading-tight md:text-5xl">
            The expensive part of multi-agent work is usually not the answer. It is the repeated cost of dragging too much context through too many handoffs without a protocol for what should stay, what should go, and what can be recovered later. Brokie exists so a swarm can run hard, continuously, and economically instead of burning money like a Porsche payment.
          </p>
        </div>
      ),
    },
    {
      id: 'brokie-v1-pipeline',
      bgColorLeft: 'bg-[#0a1222]',
      textColorLeft: 'text-white',
      bgColorRight: 'bg-[#fff8ea]',
      textColorRight: 'text-[#0a1120]',
      leftTitle: 'Compression Pipeline',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="04" label="Pipeline" />
          <h2 className="max-w-[12ch] font-serif text-5xl leading-[0.92] tracking-tight text-white md:text-6xl">
            Five Stages. One Smaller Handoff.
          </h2>
          <p className="max-w-xl border-l-4 border-[#c9ff5b] pl-6 font-serif text-xl leading-relaxed text-white/76">
            Brokie V1 is not one compression trick. It is a stacked pipeline that attacks waste at different layers of the exchange, from message shape to transport bytes to graph-aware recovery.
          </p>
        </div>
      ),
      rightContent: (
        <div className="grid gap-4">
          <SignalCard
            title="Stage 4 / Template Codebook"
            body="Common agent-to-agent patterns compress into short machine-readable codes so repetitive status, need, block, and result messages stop spending full natural-language price."
            tone="light"
          />
          <SignalCard
            title="Stage 5 / Intra-Message Compression"
            body="Inside a single message, low-importance tokens are merged or dropped so the payload keeps the load-bearing structure without paying for every surface phrase."
            tone="light"
          />
          <SignalCard
            title="Stage 8 / Wire Compression"
            body="Once the payload is serialized, Zstandard handles the byte-level squeeze. This is the cheap efficiency layer that reduces raw transport cost without changing semantics."
            tone="light"
          />
          <SignalCard
            title="Stage 9 / Economic Monitor"
            body="Brokie also watches the route itself. Budget overruns, debate loops, and tool-call bloat get flagged before one bad chain poisons the rest of the workflow."
            tone="light"
          />
          <SignalCard
            title="Stage 10 / Graph Pointer Hydration"
            body="At the far end, the payload can collapse into graph pointers and rehydrate only the required subgraph. That is how the route stays compact without becoming blind."
            tone="light"
          />
        </div>
      ),
    },
    {
      id: 'brokie-v1-grounding',
      bgColorLeft: 'bg-[#fff4e8]',
      textColorLeft: 'text-[#0a1120]',
      bgColorRight: 'bg-[#12101a]',
      textColorRight: 'text-white',
      leftTitle: 'Research And OSS',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="05" label="Grounding" tone="dark" />
          <h2 className="max-w-[12ch] font-serif text-5xl leading-[0.92] tracking-tight text-[#0a1120] md:text-6xl">
            Current Compression Research. Practical OSS.
          </h2>
          <p className="max-w-xl border-l-4 border-[#ffb76b] pl-6 font-serif text-xl leading-relaxed text-black/76">
            Brokie V1 is not pretending prompt compression started here. The direction is informed by current research on budget-aware prompt reduction and by practical open-source compression tooling, then pushed into a graph-aware handoff protocol for agent routes.
          </p>
        </div>
      ),
      rightContent: (
        <div className="grid gap-4">
          <SignalCard
            title="Prompt Compression Lineage"
            body={
              <>
                The closest research neighbors are <span className="italic">LLMLingua</span> (EMNLP 2023), <span className="italic">LongLLMLingua</span> (ACL 2024), and <span className="italic">LLMLingua-2</span> (Findings of ACL 2024). They are relevant because they treat prompt compression as a fidelity problem, not just a truncation problem.
              </>
            }
          />
          <SignalCard
            title="OSS Wire Primitive"
            body="For the byte-level layer, Brokie uses Zstandard as the practical transport compressor. That is the lossless part of the stack: faster, cheaper payload movement without pretending the semantic compression problem is solved by bytes alone."
          />
          <SignalCard
            title="What Is Brokie-Specific"
            body="The Brokie-specific leap is turning compression into a handoff protocol. Codebooks, budget monitoring, graph pointers, and selective hydration are there so the next worker can recover exactly what the job needs and no more."
          />
        </div>
      ),
    },
    {
      id: 'brokie-v1-surface',
      bgColorLeft: 'bg-[#eef8ff]',
      textColorLeft: 'text-[#0a1120]',
      bgColorRight: 'bg-[#071827]',
      textColorRight: 'text-white',
      leftTitle: 'What You Can Open Here',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="06" label="Surface" tone="dark" />
          <h2 className="max-w-[12ch] font-serif text-5xl leading-[0.92] tracking-tight text-[#0a1120] md:text-6xl">
            The Book Explains The Logic. The Playground Shows The Path.
          </h2>
          <p className="max-w-xl border-l-4 border-[#15b8d6] pl-6 font-serif text-xl leading-relaxed text-black/76">
            This page is where I explain what Brokie is compressing, what it refuses to throw away, and why the recovery path matters. The playground is where the pipeline becomes legible step by step.
          </p>
        </div>
      ),
      rightContent: (
        <div className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2">
            <SystemCard title="Structural Pass" body="See the message before the heavy pruning starts so the payload shape stays intentional." />
            <SystemCard title="Codebook Layer" body="Inspect where repetitive agent language collapses into compact machine-readable form." />
            <SystemCard title="Budget Trace" body="Track where transport cost is falling and where the route is still wasting tokens." />
            <SystemCard title="Hydration Path" body="Open the recovery side of the protocol and inspect what the next worker would actually reload." />
          </div>

          <a
            href="/work/brokie-v1-app/out/index.html"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 border border-[#8eeeff]/22 bg-[#8eeeff]/8 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.28em] text-white transition-colors hover:bg-[#8eeeff]/14 opacity-50 cursor-not-allowed"
            onClick={(e) => e.preventDefault()}
          >
            Playground Locked
            <span aria-hidden="true">→</span>
          </a>

          <p className="max-w-2xl text-sm leading-relaxed text-white/60">
            The playground is there to make the protocol inspectable. It is not a claim that every compression edge case in the wider system is already solved.
          </p>
        </div>
      ),
    },
    {
      id: 'brokie-v1-capabilities',
      bgColorLeft: 'bg-[#d9f9ff]',
      textColorLeft: 'text-[#0a1120]',
      bgColorRight: 'bg-[#163750]',
      textColorRight: 'text-white',
      leftTitle: 'What It Demonstrates',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="07" label="AI Engineering Skills" tone="dark" />
          <h2 className="max-w-[13ch] font-serif text-5xl leading-[0.92] tracking-tight text-[#0a1120] md:text-6xl">
            A2A Protocol Design, Cost Control, And Context Compression.
          </h2>
          <p className="max-w-xl border-l-4 border-[#15b8d6] pl-6 font-serif text-xl leading-relaxed text-black/76">
            Brokie V1 demonstrates agent-to-agent protocol design, prompt compression, payload reduction, selective rehydration, and the cost discipline required to keep long-running AI systems alive under real load.
          </p>
        </div>
      ),
      rightContent: (
        <div className="grid gap-4 md:grid-cols-2">
          <SignalCard title="Multi-Agent Protocol Design" body="Every worker pass has a structure, a budget, and a recovery path instead of one more blob of repeated context." tone="light" />
          <SignalCard title="Context Compression" body="The pipeline is deliberately compression-aware so the route can stay useful without paying full natural-language price at every step." tone="light" />
          <SignalCard title="Selective Rehydration" body="Compact payloads can still reopen the right context later, which is what turns compression into a real protocol." tone="light" />
          <SignalCard title="Inference Cost Control" body="This is the economic layer of agentic engineering: cheaper passes, cleaner traces, and fewer routes dying under their own transport bill." tone="light" />
        </div>
      ),
    },
    {
      id: 'brokie-v1-footer',
      fullWidthContent: (
        <div className="relative flex min-h-[88vh] w-full items-end overflow-hidden bg-[#07111d] px-8 py-16 text-white md:px-24">
          <img
            src="/images/footer-stills/brokie-v1-footer.webp"
            alt=""
            loading="lazy"
            decoding="async"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-85 pointer-events-none"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(94,242,255,0.1),transparent_24%),linear-gradient(180deg,rgba(5,10,18,0.06),rgba(5,10,18,0.52)_78%)]" />
          <div className="relative z-10 max-w-5xl">
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.34em] text-[#8eeeff]/80">Brokie V1 / Closing Read</p>
            <h2 className="max-w-4xl font-serif text-4xl leading-tight md:text-5xl">
              Brokie V1 is about making the pass between workers cheaper without destroying the structure the next worker needs to finish the job.
            </h2>
            <p className="mt-8 max-w-3xl font-serif text-xl leading-relaxed text-white/80">
              If the payload gets smaller and the recovery path stays clear, the route can move faster, cost less, and survive more agent steps before context bloat starts dragging the whole chain back down.
            </p>
          </div>
        </div>
      ),
    },
  ],
};
