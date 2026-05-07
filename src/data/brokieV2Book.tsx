import { ManagedHeroVideo } from '../components/ManagedHeroVideo';
import React from 'react';
import { BookProject } from './portfolio';
import { works } from './works';

const brokieV2Shell = works.find((work) => work.id === 'brokie-v2');

if (!brokieV2Shell) {
  throw new Error('Brokie V2 shelf record is missing.');
}

const Kicker = ({ n, label, tone = 'light' }: { n: string; label: string; tone?: 'light' | 'dark' }) => (
  <p
    className={`mb-8 font-mono text-[10px] uppercase tracking-[0.32em] ${
      tone === 'light' ? 'text-[#a9ffe0]/78' : 'text-[#0f7f67]'
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
      tone === 'light' ? 'border-white/12 bg-black/22' : 'border-black/10 bg-white/80'
    }`}
  >
    <p
      className={`font-mono text-[10px] uppercase tracking-[0.28em] ${
        tone === 'light' ? 'text-[#a9ffe0]/78' : 'text-[#0f7f67]'
      }`}
    >
      {label}
    </p>
    <div
      className={`mt-4 min-h-[4.2rem] max-w-[10ch] font-sans text-[clamp(1.55rem,2vw,2.35rem)] font-black leading-[0.95] tracking-tight ${
        tone === 'light' ? 'text-white' : 'text-[#08131b]'
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
  <div className={tone === 'dark' ? 'border border-white/10 bg-white/6 p-6' : 'border border-black/10 bg-white/80 p-6'}>
    <p
      className={
        tone === 'dark'
          ? 'mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#a9ffe0]/80'
          : 'mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#0f7f67]'
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
    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#a9ffe0]/80">{title}</p>
    <p className="font-serif text-lg leading-relaxed text-white/82">{body}</p>
  </div>
);

export const brokieV2Book: BookProject = {
  ...brokieV2Shell,
  showAuthorBadge: false,
  sections: [
    {
      id: 'brokie-v2-hero',
      fullWidthContent: (
        <div className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-[#07130f] px-8 py-16 text-white md:px-24">
          <ManagedHeroVideo
            src="/videos/brokie-v2-bg.mp4"
            idSeed="brokie-v2-hero-video"
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
            videoClassName="absolute inset-0 h-full w-full object-cover opacity-85 pointer-events-none"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(58,255,180,0.1),transparent_24%),radial-gradient(circle_at_80%_24%,rgba(115,245,255,0.08),transparent_22%),radial-gradient(circle_at_62%_78%,rgba(255,216,107,0.07),transparent_26%),linear-gradient(180deg,rgba(4,10,8,0.08),rgba(4,10,8,0.72))]" />

          <div className="relative z-10 max-w-6xl">
            <p className="mb-10 font-mono text-sm uppercase tracking-[0.36em] text-[#a9ffe0]/78">Brokie V2 / Personal Project</p>
            <h1 className="max-w-4xl font-serif text-[9vw] leading-[0.84] tracking-tight md:text-[5vw]">
              Memory That Can Be Cross-Examined.
            </h1>
            <p className="mt-8 max-w-3xl font-serif text-[1.32rem] leading-relaxed text-white/88 md:text-[1.5rem]">
              Brokie V2 builds on the efficient agent-to-agent transport discipline established in Brokie V1 and extends it into graph-backed memory and reviewable claim state. It keeps propositions, evidence packets, contradictions, oversight signals, and projection surfaces distinct so a swarm can communicate cheaply, remember durably, dispute cleanly, resolve claims deliberately, and retrace what it thinks it knows.
            </p>

            <div className="mt-20 grid gap-6 border-t border-white/16 pt-8 md:grid-cols-4">
              <MetricTile value="Stores Claims" label="Propositions" note="Memory lands as typed claims instead of one more pile of narrative residue." />
              <MetricTile value="Carries Evidence" label="Grounding" note="Claims stay attached to packets, sources, and retrace paths that can be inspected later." />
              <MetricTile value="Keeps Disputes" label="Contradictions" note="Conflicts remain visible instead of being flattened into fake certainty." />
              <MetricTile value="Projects State" label="Operator Lens" note="The graph can answer, summarize, and surface settlement state without pretending every node is truth." />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'brokie-v2-origin',
      bgColorLeft: 'bg-[#eefcf6]',
      textColorLeft: 'text-[#08131b]',
      bgColorRight: 'bg-[#0a1515]',
      textColorRight: 'text-white',
      leftTitle: 'Why Brokie V2 Exists',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="02" label="Origin" tone="dark" />
          <h2 className="max-w-[13ch] font-serif text-5xl leading-[0.92] tracking-tight text-[#08131b] md:text-6xl">
            V1 Made Handoffs Cheaper. V2 Makes Memory Durable.
          </h2>
          <p className="max-w-xl border-l-4 border-[#12b981] pl-6 font-serif text-xl leading-relaxed text-black/76">
            Brokie V1 solved the transport side of the problem by making agent-to-agent communication efficient enough to survive real swarm load. V2 keeps that base intact and solves the next problem: memory discipline, claim identity, contradiction handling, and settlement.
          </p>
        </div>
      ),
      rightContent: (
        <div className="space-y-8">
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/86 md:text-[1.24rem]">
            Brokie V2 is the answer to that second problem. It does not replace Brokie V1's efficient A2A communication layer. It builds on top of it, moving the system away from vague chat-memory behavior and toward a graph where claims, evidence, review state, and projection layers are explicit.
          </p>
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/80 md:text-[1.24rem]">
            The value is not that the graph makes the system look smarter. The value is that it gives the system a way to remember without pretending every remembered thing is true. Unsettled claims can stay provisional. Conflicts can stay visible. Operators can retrace how a result was formed.
          </p>
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/80 md:text-[1.24rem]">
            That is what turns memory into infrastructure instead of mythology.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <SignalCard title="Claim Identity" body="Each proposition needs a stable identity if the graph is supposed to survive revisions, disputes, and settlement." />
            <SignalCard title="Visible Uncertainty" body="The graph should be able to say a thing is pending, disputed, stale, or unresolved without collapsing the nuance." />
            <SignalCard title="Retraceable State" body="An operator should be able to walk backward from a statement to the evidence and runtime events that produced it." />
          </div>
        </div>
      ),
    },
    {
      id: 'brokie-v2-thesis',
      fullWidthContent: (
        <div className="relative flex w-full flex-col items-center overflow-hidden border-y border-[#c9fff2] bg-[linear-gradient(135deg,#defbf4_0%,#e7fff2_38%,#fff2cc_100%)] px-8 py-24 text-center text-[#08131b] md:px-24 md:py-32">
          <span className="mb-[-4.5rem] select-none font-serif text-[10rem] leading-none text-white/46 md:text-[14rem]">"</span>
          <p className="relative z-10 max-w-5xl font-serif text-4xl leading-tight md:text-5xl">
            If multi-agent memory cannot show where a claim came from, what argues against it, and why it is being treated as settled, it is not memory. It is just a cleaner way to forget how the system decided to sound certain.
          </p>
        </div>
      ),
    },
    {
      id: 'brokie-v2-graph',
      bgColorLeft: 'bg-[#081414]',
      textColorLeft: 'text-white',
      bgColorRight: 'bg-[#fff7ea]',
      textColorRight: 'text-[#08131b]',
      leftTitle: 'What The Graph Holds',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="03" label="Graph Anatomy" />
          <h2 className="max-w-[12ch] font-serif text-5xl leading-[0.92] tracking-tight text-white md:text-6xl">
            Claims, Evidence, Contradictions, And Projections.
          </h2>
          <p className="max-w-xl border-l-4 border-[#7fffd4] pl-6 font-serif text-xl leading-relaxed text-white/76">
            Brokie V2 works because it keeps the record types separate enough to be trustworthy and close enough to be useful in the same runtime.
          </p>
        </div>
      ),
      rightContent: (
        <div className="grid gap-4">
          <SignalCard
            title="Propositions"
            body="The durable unit is a claim with identity, timestamps, provenance, and settlement state. That is more useful than throwing raw chat into a bucket and calling it memory."
            tone="light"
          />
          <SignalCard
            title="Evidence Packets"
            body="Evidence stays attached to the claim path, not buried as an afterthought. That is how Brokie can answer from rooted material instead of invented confidence."
            tone="light"
          />
          <SignalCard
            title="Contradiction Records"
            body="Competing claims do not disappear just because the UI wants a clean answer. The graph keeps disagreement visible until something actually resolves it."
            tone="light"
          />
          <SignalCard
            title="Projection Layers"
            body="Operator views, conversational answers, and visual surfaces are projections over the graph. They are not allowed to silently become the truth model themselves."
            tone="light"
          />
        </div>
      ),
    },
    {
      id: 'brokie-v2-runtime',
      bgColorLeft: 'bg-[#effff9]',
      textColorLeft: 'text-[#08131b]',
      bgColorRight: 'bg-[#0d1018]',
      textColorRight: 'text-white',
      leftTitle: 'How It Serves The Swarm',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="04" label="Runtime" tone="dark" />
          <h2 className="max-w-[12ch] font-serif text-5xl leading-[0.92] tracking-tight text-[#08131b] md:text-6xl">
            Memory For Agents, Review, And Operators.
          </h2>
          <p className="max-w-xl border-l-4 border-[#16a34a] pl-6 font-serif text-xl leading-relaxed text-black/76">
            Brokie V2 is not only for storage. It is for runtime use: a place where watchers, operator surfaces, and conversational projections can all pull from the same durable substrate without blurring their roles.
          </p>
        </div>
      ),
      rightContent: (
        <div className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2">
            <SystemCard title="Oversight Runtime" body="Observation, contradiction, and review flows write into the same graph they later inspect." />
            <SystemCard title="Reviewable Claim State" body="Raw outputs are not durable truth. Claims need review state, provenance, and a clear path from open question to settled record." />
            <SystemCard title="Built On V1" body="The graph layer assumes Brokie V1 is still carrying efficient agent-to-agent handoffs underneath it, so memory quality improves without sacrificing communication efficiency." />
            <SystemCard title="Projection Surface" body="Mindball-style visual surfaces can show the graph without inventing a second private memory model." />
            <SystemCard title="Retrace" body="When an answer matters, the operator should be able to retrace the claim path instead of trusting the summary tone." />
          </div>

          <a
            href="/work/brokie-v2/brokie-playground/index.html"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 border border-white/18 bg-white/6 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.28em] text-white transition-colors hover:bg-white/10 opacity-50 cursor-not-allowed"
            onClick={(e) => e.preventDefault()}
          >
            Playground Locked
            <span aria-hidden="true">{'->'}</span>
          </a>

          <p className="max-w-2xl text-sm leading-relaxed text-white/58">
            The playground is a projection surface, not a claim that the whole graph is finished. The point is to show how memory, settlement, and visibility are being shaped into one usable substrate.
          </p>
        </div>
      ),
    },
    {
      id: 'brokie-v2-skills',
      bgColorLeft: 'bg-[#dcfff2]',
      textColorLeft: 'text-[#08131b]',
      bgColorRight: 'bg-[#0b4048]',
      textColorRight: 'text-white',
      leftTitle: 'What It Demonstrates',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="05" label="AI Memory And Retrieval Skills" tone="dark" />
          <h2 className="max-w-[13ch] font-serif text-5xl leading-[0.92] tracking-tight text-[#08131b] md:text-6xl">
            Knowledge Graphs, Evidence Handling, Retrieval, And Human Review.
          </h2>
          <p className="max-w-xl border-l-4 border-[#0f7f67] pl-6 font-serif text-xl leading-relaxed text-black/76">
            Brokie V2 demonstrates knowledge-graph design, evidence-backed memory, contradiction handling, retrieval over structured state, and human-review workflows for AI systems that need durable context.
          </p>
        </div>
      ),
      rightContent: (
        <div className="grid gap-4 md:grid-cols-2">
          <SystemCard title="Structured Memory Design" body="Memory is stored as structured propositions and relationships instead of being buried in narrative residue that cannot survive revision." />
          <SystemCard title="Evidence And Provenance" body="Claims move through review, contradiction, and settlement states so the graph can distinguish uncertain work from durable truth." />
          <SystemCard title="Graph Retrieval" body="The memory layer can support retrieval over claims, evidence, and relationships when plain document lookup would miss the structure that matters." />
          <SystemCard title="Human Review Workflows" body="The graph keeps contradiction, review, and post-write oversight visible over time instead of hiding them behind summary language." />
        </div>
      ),
    },
    {
      id: 'brokie-v2-footer',
      fullWidthContent: (
        <div className="relative min-h-[72vh] overflow-hidden bg-[#06110e] px-8 py-20 text-white md:px-24">
          <ManagedHeroVideo
            src="/videos/brokie-v2-bg.mp4"
            idSeed="brokie-v2-secondary-video"
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
            videoClassName="absolute inset-0 h-full w-full object-cover opacity-85 pointer-events-none"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,12,10,0.32),rgba(4,12,10,0.68))]" />
          <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-5xl flex-col justify-end">
            <Kicker n="06" label="Closing Note" />
            <h2 className="max-w-4xl font-serif text-5xl leading-[0.9] tracking-tight md:text-6xl">
              Durable memory should make the system more honest, not more theatrical.
            </h2>
            <p className="mt-8 max-w-3xl font-serif text-2xl leading-relaxed text-white/82">
              Brokie V2 is the layer that gives agent work somewhere serious to remember. It is built so the system can keep state, surface uncertainty, settle truth deliberately, and still show its work when the answer matters.
            </p>
          </div>
        </div>
      ),
    },
  ],
};
