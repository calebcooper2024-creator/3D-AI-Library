import React from 'react';
import { BookProject } from './portfolio';
import { works } from './works';

const gimShell = works.find((work) => work.id === 'global-intelligence-market');

if (!gimShell) {
  throw new Error('Global Intelligence Market shelf record is missing.');
}

const Kicker = ({ n, label, tone = 'light' }: { n: string; label: string; tone?: 'light' | 'dark' }) => (
  <p
    className={`mb-8 font-mono text-[10px] uppercase tracking-[0.32em] ${
      tone === 'light' ? 'text-[#8fe7ff]/84' : 'text-[#0d7ee8]'
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
        tone === 'light' ? 'text-[#8fe7ff]/84' : 'text-[#0d7ee8]'
      }`}
    >
      {label}
    </p>
    <div
      className={`mt-4 min-h-[4.2rem] max-w-[10ch] font-sans text-[clamp(1.55rem,2vw,2.35rem)] font-black leading-[0.95] tracking-tight ${
        tone === 'light' ? 'text-white' : 'text-[#0a1320]'
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
          ? 'mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#8fe7ff]/84'
          : 'mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#0d7ee8]'
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
    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#8fe7ff]/84">{title}</p>
    <p className="font-serif text-lg leading-relaxed text-white/84">{body}</p>
  </div>
);

export const globalIntelligenceMarketBook: BookProject = {
  ...gimShell,
  showAuthorBadge: false,
  sections: [
    {
      id: 'gim-hero',
      fullWidthContent: (
        <div className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-[#08111e] px-8 py-16 text-white md:px-24">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/books/global_market_1777746384925.png"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.9]"
          >
            <source src="/videos/gim-4k.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(143,231,255,0.14),transparent_22%),radial-gradient(circle_at_82%_22%,rgba(253,224,71,0.12),transparent_20%),radial-gradient(circle_at_62%_78%,rgba(59,130,246,0.1),transparent_22%),linear-gradient(180deg,rgba(6,12,24,0.08),rgba(6,12,24,0.66))]" />

          <div className="relative z-10 max-w-6xl">
            <p className="mb-10 font-mono text-sm uppercase tracking-[0.36em] text-[#8fe7ff]/82">Global Intelligence Market / Personal Project</p>
            <h1 className="max-w-4xl font-serif text-[8.6vw] leading-[0.84] tracking-tight md:text-[4.9vw]">
              Compute Endpoints, Not Subscriptions.
            </h1>
            <p className="mt-8 max-w-3xl font-serif text-[1.32rem] leading-relaxed text-white/88 md:text-[1.5rem]">
              Global Intelligence Market is where small models, large models, embeddings, rerankers, deterministic kernels, verifiers, and retrieval pipelines get treated as routeable compute instruments instead of one giant AI subscription blob. The goal is better results than a frontier model alone can usually deliver.
            </p>

            <div className="mt-20 grid gap-6 border-t border-white/16 pt-8 md:grid-cols-4">
              <MetricTile value="Hybrid RAG" label="Retrieval" note="Dense retrieval, sparse retrieval, and reranking can be combined instead of forcing one generic context path." />
              <MetricTile value="GraphRAG Ready" label="Memory" note="Graph-backed retrieval and routeable memory operations can sit beside standard document retrieval." />
              <MetricTile value="Small + Large Models" label="Model Mix" note="Fast models, stronger models, and verifier models each play different roles in the market." />
              <MetricTile value="Deterministic Endpoints" label="Execution" note="Some of the best results come from tools, graph algorithms, or symbolic systems instead of pure generation." />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'gim-origin',
      bgColorLeft: 'bg-[#edf8ff]',
      textColorLeft: 'text-[#0a1320]',
      bgColorRight: 'bg-[#0a1523]',
      textColorRight: 'text-white',
      leftTitle: 'Why GIM Exists',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="02" label="Origin" tone="dark" />
          <h2 className="max-w-[12ch] font-serif text-5xl leading-[0.92] tracking-tight text-[#0a1320] md:text-6xl">
            One Frontier Model Is Not The Whole Market.
          </h2>
          <p className="max-w-xl border-l-4 border-[#0ea5e9] pl-6 font-serif text-xl leading-relaxed text-black/76">
            A single large model can sound convincing, but it cannot by itself give you the best blend of hybrid retrieval, GraphRAG, verifier passes, embeddings, reranking, deterministic math, cost control, and route explanations. GIM exists to make that full mix explicit.
          </p>
        </div>
      ),
      rightContent: (
        <div className="space-y-8">
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/86 md:text-[1.24rem]">
            The core idea is simple: anything that can be health-probed, scored, tagged, and routed should be allowed to compete as an intelligence endpoint. That includes LLMs, embedding services, rerankers, graph algorithms, retrieval systems, verifiers, simulation kernels, memory operations, and other deterministic services.
          </p>
          <p className="font-serif text-[1.15rem] leading-relaxed text-white/80 md:text-[1.24rem]">
            That is how the system gets beyond average results. A small model can classify. An embedding model can retrieve. A reranker can sort. A deterministic kernel can verify. A larger model can synthesize. The answer gets better because the path gets smarter.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <SignalCard title="Small Models" body="Cheap fast passes handle triage, extraction, and other bounded jobs before expensive reasoning is invited in." />
            <SignalCard title="Embeddings + Rerankers" body="Retrieval quality improves when the system treats embedding endpoints and reranking as first-class routeable assets." />
            <SignalCard title="Deterministic Kernels" body="Graph algorithms, symbolic solvers, and verification tools can outperform free-form generation on the jobs they were actually built for." />
          </div>
        </div>
      ),
    },
    {
      id: 'gim-thesis',
      fullWidthContent: (
        <div className="relative flex w-full flex-col items-center overflow-hidden border-y border-[#8fe7ff] bg-[linear-gradient(135deg,#071223_0%,#0b4aa7_42%,#f3be2f_100%)] px-8 py-24 text-center text-white md:px-24 md:py-32">
          <span className="mb-[-4.5rem] select-none font-serif text-[10rem] leading-none text-white/18 md:text-[14rem]">"</span>
          <p className="relative z-10 max-w-5xl font-serif text-4xl leading-tight md:text-5xl">
            The future is not one bigger model pretending to do everything. It is a market where retrieval, GraphRAG, embeddings, verifiers, symbolic logic, and large-model synthesis can all be routed together on purpose.
          </p>
        </div>
      ),
    },
    {
      id: 'gim-runtime',
      bgColorLeft: 'bg-[#06111d]',
      textColorLeft: 'text-white',
      bgColorRight: 'bg-[#eef6ff]',
      textColorRight: 'text-[#0a1320]',
      leftTitle: 'What GIM Routes',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="03" label="Endpoint Ontology" />
          <h2 className="max-w-[12ch] font-serif text-5xl leading-[0.92] tracking-tight text-white md:text-6xl">
            Models, Retrieval, Graphs, Verifiers, And Tools.
          </h2>
          <p className="max-w-xl border-l-4 border-[#8fe7ff] pl-6 font-serif text-xl leading-relaxed text-white/76">
            GIM demonstrates endpoint thinking, route scoring, calibration, retrieval engineering, and multi-stage AI system design. It is a market architecture for intelligence, not a prettier wrapper around one provider.
          </p>
        </div>
      ),
      rightContent: (
        <div className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2">
            <SignalCard title="RAG + GraphRAG" body="Text retrieval and graph-backed retrieval can be mixed depending on whether the problem wants documents, relationships, or both." tone="light" />
            <SignalCard title="Embedding Endpoints" body="Embedding models become routeable building blocks for search, matching, clustering, and hybrid retrieval." tone="light" />
            <SignalCard title="Verifier Models" body="A smaller verifier or reranker can improve trust and precision without paying frontier-model prices for every decision." tone="light" />
            <SignalCard title="Deterministic Services" body="Symbolic math, graph algorithms, and other deterministic endpoints strengthen results precisely because they are not trying to behave like chat." tone="light" />
          </div>

          <a
            href="/work/global-intelligence-market/playground/index.html"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 border border-black/12 bg-black px-6 py-4 font-mono text-[11px] uppercase tracking-[0.28em] text-white transition-colors hover:bg-black/85"
          >
            Open GIM Playground
            <span aria-hidden="true">{'->'}</span>
          </a>

          <p className="max-w-2xl text-sm leading-relaxed text-black/56">
            The real value is not that every endpoint is always live. It is that the market makes intelligence acquisition, route choice, and compute composition explicit enough to inspect and improve.
          </p>
        </div>
      ),
    },
    {
      id: 'gim-skills',
      bgColorLeft: 'bg-[#fff1b8]',
      textColorLeft: 'text-[#0a1320]',
      bgColorRight: 'bg-[#0b2f6d]',
      textColorRight: 'text-white',
      leftTitle: 'What It Demonstrates',
      leftContent: (
        <div className="space-y-8">
          <Kicker n="04" label="AI Retrieval And Search Skills" tone="dark" />
          <h2 className="max-w-[13ch] font-serif text-5xl leading-[0.92] tracking-tight text-[#0a1320] md:text-6xl">
            Retrieval Engineering, Model Composition, And Search Quality.
          </h2>
          <p className="max-w-xl border-l-4 border-[#0d7ee8] pl-6 font-serif text-xl leading-relaxed text-black/76">
            Global Intelligence Market demonstrates retrieval engineering, model pairing, embeddings, reranking, and deterministic endpoint design. It is about assembling a better search-and-synthesis path than a frontier model alone can usually deliver.
          </p>
        </div>
      ),
      rightContent: (
        <div className="grid gap-4 md:grid-cols-2">
          <SystemCard title="Hybrid Retrieval" body="Dense retrieval, sparse retrieval, and reranking can be mixed on purpose so search quality stops being hostage to one generic retrieval layer." />
          <SystemCard title="Graph Retrieval" body="When the answer depends on relationships, sequence, or claim topology, graph-backed retrieval becomes a different class of intelligence path." />
          <SystemCard title="Small And Large Model Composition" body="Fast models can classify and prepare, larger models can synthesize, and verifier passes can pressure-test the result before it looks finished." />
          <SystemCard title="Embeddings And Reranking" body="Embedding endpoints and rerankers stay in the market because they often outperform pure generation on search quality, cost, or both." />
        </div>
      ),
    },
    {
      id: 'gim-footer',
      fullWidthContent: (
        <div className="relative min-h-[72vh] overflow-hidden bg-[#06111d] px-8 py-20 text-white md:px-24">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/books/global_market_1777746384925.png"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.84]"
          >
            <source src="/videos/gim-4k.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,28,0.14),rgba(7,16,28,0.58))]" />
          <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-5xl flex-col justify-end">
            <Kicker n="05" label="Closing Note" />
            <h2 className="max-w-4xl font-serif text-5xl leading-[0.9] tracking-tight md:text-6xl">
              The smarter system is the one that knows when not to ask the biggest model.
            </h2>
            <p className="mt-8 max-w-3xl font-serif text-2xl leading-relaxed text-white/82">
              Global Intelligence Market is the expression of that idea: use small models, large models, retrieval, GraphRAG, embeddings, rerankers, deterministic endpoints, and calibration together so the result is more accurate, more efficient, and more intentional than raw frontier-model brute force.
            </p>
          </div>
        </div>
      ),
    },
  ],
};
