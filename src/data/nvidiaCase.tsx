import React from 'react';
import { SectionContent } from './portfolio';
import { BeforeAfter, BubbleDiagram } from '../components/Visuals';
import { STANDARD_SOURCE_NOTE_LABEL, STANDARD_SOURCE_NOTE_TEXT } from './caseStudyMeta';

const Signal = ({ title, source, body }: { title: string; source: string; body: string }) => (
  <div className="border border-white/10 bg-white/[0.04] p-6">
    <p className="font-mono text-[11px] uppercase tracking-widest text-green-300">{source}</p>
    <h4 className="mt-3 text-lg font-semibold leading-snug text-white">{title}</h4>
    <p className="mt-4 text-sm leading-relaxed text-white/58">{body}</p>
  </div>
);

const Step = ({ n, title, body }: { n: string; title: string; body: string }) => (
  <div className="grid grid-cols-[44px_1fr] gap-4 border-b border-black/10 pb-5">
    <span className="font-mono text-sm font-bold text-green-700">{n}</span>
    <div>
      <h4 className="font-semibold">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-black/62">{body}</p>
    </div>
  </div>
);

const Choice = ({ subject, method, reason }: { subject: string; method: string; reason: string }) => (
  <div className="grid gap-3 border-b border-white/10 pb-4 md:grid-cols-[175px_190px_1fr]">
    <span className="font-mono text-green-300">{subject}</span>
    <span className="font-semibold text-white">{method}</span>
    <span className="text-sm leading-relaxed text-white/55">{reason}</span>
  </div>
);

const Risk = ({ risk, control, owner }: { risk: string; control: string; owner: string }) => (
  <div className="border border-black/10 bg-white p-5">
    <p className="font-mono text-[11px] uppercase tracking-widest text-red-600">{owner}</p>
    <h4 className="mt-3 font-semibold">{risk}</h4>
    <p className="mt-2 text-sm leading-relaxed text-black/60">{control}</p>
  </div>
);

const Metric = ({ value, label, note }: { value: string; label: string; note: string }) => (
  <div className="border border-white/10 bg-white/[0.04] p-7">
    <div className="font-mono text-5xl font-black tracking-tight text-white">{value}</div>
    <p className="mt-3 font-mono text-xs uppercase tracking-widest text-green-300">{label}</p>
    <p className="mt-4 text-sm leading-relaxed text-white/55">{note}</p>
  </div>
);

const nvidiaSections: SectionContent[] = [
  {
    id: 'nv-hero',
    fullWidthContent: (
      <div className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-black p-8 text-white md:p-24">
        <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)', backgroundSize: '34px 34px' }} />
        <div className="absolute -right-52 -top-52 h-[760px] w-[760px] rounded-full border border-green-400/10" />
        <div className="absolute bottom-0 left-0 h-[1px] w-full bg-green-400/30" />
        <p className="relative z-10 mb-10 font-mono text-xs uppercase tracking-[0.32em] text-green-300/70">Built from publicly available research</p>
        <h1 className="relative z-10 max-w-6xl font-serif text-[14vw] leading-[0.8] tracking-tight md:text-[7.6vw]">
          AI factories fail quietly when capacity knowledge is not operational memory.
        </h1>
        <p className="relative z-10 mt-10 max-w-4xl font-serif text-2xl leading-snug text-white/74 md:text-3xl">
          A GPU cluster capacity and inference optimization agent for NVIDIA-style Enterprise AI Factory operations: grounded retrieval, benchmark replay, serving recommendations, and approval-gated change control.
        </p>
        <div className="relative z-10 mt-20 grid grid-cols-2 gap-6 border-t border-white/15 pt-8 font-mono text-sm md:grid-cols-4">
          <div><p className="text-white/35">Research Base</p><p className="mt-2">Public NVIDIA materials</p></div>
          <div><p className="text-white/35">Focus</p><p className="mt-2">AI factory operations</p></div>
          <div><p className="text-white/35">Surface</p><p className="mt-2">Inference + GPU capacity</p></div>
          <div><p className="text-white/35">Boundary</p><p className="mt-2">Recommend, benchmark, approve</p></div>
        </div>
      </div>
    )
  },
  {
    id: 'nv-thesis',
    bgColorLeft: 'bg-black',
    textColorLeft: 'text-white',
    bgColorRight: 'bg-transparent',
    textColorRight: 'text-black',
    leftTitle: 'Thesis',
    leftContent: (
      <div>
        <p className="mb-4 font-mono text-sm uppercase tracking-[0.24em] text-green-300">01 / Operating Thesis</p>
        <h2 className="font-serif text-5xl leading-tight md:text-6xl">The most NVIDIA-native AI case is infrastructure intelligence, not another chatbot.</h2>
      </div>
    ),
    rightContent: (
      <div className="space-y-7 py-12 text-lg leading-relaxed text-black/72">
        <p>
          Based on publicly available research, the strongest flagship is a GPU Cluster Capacity and Inference Optimization Agent inside an Enterprise AI Factory. That fits NVIDIA's public story better than an app-only assistant because the company's center of gravity is large-scale AI infrastructure, validated reference architectures, model serving, benchmarking, fleet operations, and enterprise deployment discipline.
        </p>
        <p>
          The product tradeoff is important. A generic developer-support copilot would be easier to demo, but easier to dismiss. An operations agent has to understand telemetry, model manifests, benchmark traces, serving engines, quota policy, Kubernetes deployment state, and approval workflows. That makes it harder to build, but much more credible for a company whose public stack includes NIM, Triton, TensorRT-LLM, NeMo, Run:ai, Mission Control, Base Command Manager, GPU Operator, and DCGM.
        </p>
        <p>
          The design does not let natural language mutate production directly. The agent assembles evidence, recommends benchmark-backed options, prepares approval packets, and can enter canary workflows only through controlled gates. That is how the system creates value without turning infrastructure operations into an unreviewed prompt surface.
        </p>
        <div className="border-l-4 border-green-600 bg-green-50 p-6">
          <p className="font-serif text-xl italic text-green-950">
            The product is not "AI for AI." It is operational memory for the systems that make AI economical.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'nv-evidence',
    fullWidthContent: (
      <div className="w-full bg-[#050805] p-8 text-white md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-green-300">02 / Evidence Base</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">The public stack already contains the pieces. The product challenge is turning them into an operating loop.</h3>
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Signal
            source="NVIDIA Enterprise AI Factory guidance"
            title="AI factory is an articulated architecture pattern."
            body="Public design guidance already describes agentic workflows, data connectors, GitOps, artifact repositories, security, and observability. This product belongs in that system, not beside it."
          />
          <Signal
            source="Mission Control / Base Command Manager / Run:ai"
            title="NVIDIA already has a public fleet-operations control-plane story."
            body="Cluster management, provisioning, monitoring, orchestration, and policy-driven GPU scheduling should be extended rather than reimplemented."
          />
          <Signal
            source="NIM / Triton / TensorRT-LLM / AIPerf"
            title="Inference optimization is benchmark and serving discipline."
            body="The agent must reason over TTFT, ITL, throughput, memory fit, batching, concurrency, engine choice, and cost per token, not just summarize documentation."
          />
          <Signal
            source="NeMo Retriever / Evaluator / Guardrails / AI-Q"
            title="Grounded retrieval, evaluation, and policy controls are first-class NVIDIA patterns."
            body="The system should treat RAG quality, evaluator results, guardrail traces, and long-running operational analysis as core product behavior."
          />
        </div>
      </div>
    )
  },
  {
    id: 'nv-scale',
    fullWidthContent: (
      <div className="w-full bg-[#eff7ef] p-8 md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-green-700">03 / Scale Signals</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">At AI factory scale, a tuning decision is also a capacity decision.</h3>
        <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">
          {[
            ['$215.9B', 'FY2026 revenue signal', "Public NVIDIA materials place the company's center of gravity around data-center AI infrastructure and software."],
            ['32-256', 'Reference architecture GPUs', 'Enterprise AI factory patterns are bounded, validated, and repeatable rather than vague scale claims.'],
            ['1.1B+', 'Internal documents cited', "NVIDIA's public AI factory story validates knowledge operations at enterprise scale."],
            ['128', 'Modeled GPU estate', 'The ROI model shows how utilization, tuning, and incident response can pay back without fantasy assumptions.']
          ].map(([value, label, note]) => (
            <div key={label} className="border border-black/10 bg-white p-6">
              <div className="font-mono text-4xl font-black text-green-800">{value}</div>
              <p className="mt-3 font-mono text-xs uppercase tracking-widest">{label}</p>
              <p className="mt-4 text-sm leading-relaxed text-black/60">{note}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'nv-map',
    fullWidthContent: (
      <div className="grid min-h-[70vh] w-full grid-cols-1 border-b border-black/10 md:grid-cols-2">
        <div className="flex items-center justify-center bg-black p-8 md:p-20">
          <BubbleDiagram title="" items={[
            { label: 'NIM', size: 122, color: 'bg-green-600' },
            { label: 'Triton', size: 112, color: 'bg-lime-600' },
            { label: 'TensorRT-LLM', size: 104, color: 'bg-emerald-700' },
            { label: 'NeMo RAG', size: 92, color: 'bg-green-500' },
            { label: 'Run:ai', size: 82, color: 'bg-slate-600' },
            { label: 'DCGM', size: 70, color: 'bg-zinc-600' }
          ]} />
        </div>
        <div className="flex flex-col justify-center bg-[#f6fff6] p-8 md:p-20">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-green-700">04 / Product Posture</p>
          <h3 className="mt-5 font-serif text-5xl leading-tight">The agent sits above the tools, not around them.</h3>
          <p className="mt-8 text-lg leading-relaxed text-black/65">
            It should not become a second scheduler, a second observability stack, or a second deployment platform. Its job is to connect evidence across those systems: what changed, what regressed, what benchmark proves the option, what capacity policy applies, and what rollback threshold makes the change safe enough to try.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'nv-before-after',
    fullWidthContent: (
      <div className="w-full bg-white p-8 md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-green-700">05 / Current vs Target</p>
        <h3 className="mt-5 font-serif text-5xl">The expensive failure is not a slow model. It is a slow model no one can explain quickly.</h3>
        <div className="mt-12">
          <BeforeAfter
            beforeLabel="Current pattern"
            afterLabel="Target pattern"
            before={
              <div className="text-sm leading-relaxed text-black/68">
                <h4 className="mb-4 text-xl font-semibold text-black">Manual diagnosis across strong but separate systems.</h4>
                <p>An endpoint regresses after a model update. Platform engineers check deployment manifests, GPU metrics, prior benchmark runs, release notes, scheduler pressure, memory use, and tickets separately. The answer exists, but the path to it is spread across tools, traces, documents, and team memory.</p>
                <p className="mt-4">That is manageable for a handful of endpoints. It breaks down when the AI factory has dozens or hundreds of services and every tuning cycle competes for scarce accelerator capacity.</p>
              </div>
            }
            after={
              <div className="text-sm leading-relaxed text-black/68">
                <h4 className="mb-4 text-xl font-semibold text-black">Evidence-backed recommendation with replay.</h4>
                <p>The agent retrieves the last change bundle, compares benchmark history, checks DCGM and serving telemetry, identifies likely batching or memory-pressure causes, proposes two configuration options, launches a replay benchmark, estimates cost-per-token change, and generates a canary approval packet with rollback thresholds.</p>
                <p className="mt-4">The human still approves. The system turns diagnosis and tuning into reusable operational memory.</p>
              </div>
            }
          />
        </div>
      </div>
    )
  },
  {
    id: 'nv-workflow',
    bgColorLeft: 'bg-transparent',
    textColorLeft: 'text-black',
    bgColorRight: 'bg-white',
    textColorRight: 'text-black',
    leftTitle: 'Workflow',
    leftContent: (
      <div>
        <p className="mb-4 font-mono text-sm uppercase tracking-[0.24em] text-green-700">06 / Target State</p>
        <h2 className="font-serif text-5xl leading-tight">The agent turns every tuning cycle into a reusable decision record.</h2>
        <p className="mt-8 text-lg leading-relaxed text-black/60">That is the difference between one-off debugging and an AI factory that gets smarter as it operates.</p>
      </div>
    ),
    rightContent: (
      <div className="space-y-5 py-12">
        <Step n="01" title="Request or regression enters the operations queue" body="A latency regression, GPU shortage, new endpoint request, or rollout uncertainty is routed with service, namespace, model, and business priority context." />
        <Step n="02" title="Evidence is assembled" body="The agent retrieves deployment manifests, prior tickets, benchmark traces, release notes, serving configuration, GPU telemetry, and relevant NVIDIA docs." />
        <Step n="03" title="Candidate causes are ranked" body="The analysis separates model changes, batching behavior, memory pressure, quota contention, hardware health, traffic shape, and software-version effects." />
        <Step n="04" title="Benchmark plan is generated" body="AIPerf, Triton Model Analyzer, or TensorRT-LLM comparisons validate the options before the system recommends action." />
        <Step n="05" title="Approval packet is prepared" body="The packet includes expected impact, cost-per-token estimate, risk, canary scope, rollback condition, and source citations." />
        <Step n="06" title="Outcome becomes operational memory" body="Accepted, rejected, reverted, and successful recommendations are stored with telemetry and reviewer notes for future retrieval." />
      </div>
    )
  },
  {
    id: 'nv-architecture',
    fullWidthContent: (
      <div className="w-full bg-[#030503] p-8 text-white md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-green-300">07 / Reference Architecture</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">A control-plane assistant for an Enterprise AI Factory.</h3>
        <div className="mt-14 grid gap-4 font-mono text-sm">
          {[
            ['Operations channels', 'platform SRE console, inference engineering workspace, customer engineering view, approval queue'],
            ['Agent control plane', 'intent routing, evidence planner, tool permissions, approval planner, replay IDs'],
            ['Knowledge and retrieval', 'NeMo Retriever, hybrid search, technical docs, prior incidents, benchmark archives, release notes'],
            ['Serving and inference layer', 'NIM endpoints, Triton Inference Server, TensorRT-LLM engines, NIM Operator, Kubernetes manifests'],
            ['Benchmark and evaluation layer', 'AIPerf, Triton Model Analyzer, NeMo Evaluator, custom replay sets, cost-per-token ledger'],
            ['Fleet operations layer', 'Mission Control, Base Command Manager, Run:ai, GPU Operator, MIG and quota policies'],
            ['Telemetry layer', 'DCGM Exporter, Prometheus, Grafana, request traces, GPU memory, queue wait, p95 latency, TTFT, ITL'],
            ['Governance plane', 'RBAC, namespace scope, prompt and model registry, audit ledger, canary gates, rollback controller']
          ].map(([title, detail]) => (
            <div key={title} className="grid gap-3 border border-white/10 bg-white/[0.03] p-5 md:grid-cols-[260px_1fr]">
              <p className="text-green-300">{title}</p>
              <p className="text-white/55">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'nv-model-strategy',
    bgColorLeft: 'bg-black',
    textColorLeft: 'text-white',
    bgColorRight: 'bg-[#071007]',
    textColorRight: 'text-white',
    leftTitle: 'Model Strategy',
    leftContent: (
      <div>
        <h2 className="font-serif text-5xl leading-tight">Prompting cannot replace profiling.</h2>
        <p className="mt-8 text-lg leading-relaxed text-white/62">The model can synthesize evidence and propose next steps, but performance claims need benchmark artifacts, telemetry, and replayable experiments.</p>
      </div>
    ),
    rightContent: (
      <div className="space-y-4 py-12">
        <Choice subject="Evidence retrieval" method="NeMo Retriever + hybrid search" reason="Operational answers need docs, tickets, release notes, and benchmark history with freshness and branch awareness." />
        <Choice subject="RAG quality" method="NeMo Evaluator" reason="Groundedness, recall, citation accuracy, and abstention quality need explicit regression tests." />
        <Choice subject="Inference tuning" method="AIPerf + Model Analyzer" reason="Batching, concurrency, memory fit, TTFT, ITL, and throughput are measured, not guessed." />
        <Choice subject="Serving decision" method="NIM / Triton / TensorRT-LLM" reason="The agent recommends serving patterns using NVIDIA-native abstractions and engine evidence." />
        <Choice subject="GPU placement" method="Run:ai / MIG / quotas" reason="Capacity decisions must respect priority, isolation, fairness, and policy constraints." />
        <Choice subject="Production mutation" method="Approval-gated canary" reason="Natural language prepares a change packet. Humans and policy gates decide whether it runs." />
      </div>
    )
  },
  {
    id: 'nv-risk',
    fullWidthContent: (
      <div className="w-full bg-white p-8 md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-green-700">08 / Risk Register</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">The product fails if it makes infrastructure feel easier while becoming harder to govern.</h3>
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Risk owner="Platform" risk="Hallucinated optimization advice" control="Require cited evidence, benchmark artifacts, and golden-set evaluation before action eligibility." />
          <Risk owner="SRE" risk="Unsafe automation mutates production" control="No direct production writes. Use approval-gated canaries, namespace-scoped operators, and rollback thresholds." />
          <Risk owner="Capacity" risk="GPU fragmentation or starvation" control="Run:ai quota classes, MIG isolation, priority queues, and explicit sharing tiers." />
          <Risk owner="Knowledge" risk="Retrieval staleness" control="Freshness-aware ranking, software-branch tags, deprecation labels, and corpus versioning." />
          <Risk owner="Finance" risk="Latency win creates cost regression" control="Track cost per token alongside p95 latency, TTFT, ITL, and throughput in the benchmark ledger." />
          <Risk owner="Security" risk="Sensitive logs leak into generalized retrieval" control="Source sensitivity tags, private registry boundaries, role scope, and complete audit logging." />
        </div>
      </div>
    )
  },
  {
    id: 'nv-evaluation',
    fullWidthContent: (
      <div className="w-full bg-[#eff7ef] p-8 md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-green-700">09 / Evaluation</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">A hiring manager should see a measurable platform, not just an architecture diagram.</h3>
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            ['Recall@k', 'Retrieval quality', 'Expected docs, tickets, benchmark traces, and release notes should be found with branch and freshness context.'],
            ['TTFT / ITL', 'Serving quality', 'Inference recommendations are measured against first-token latency, inter-token latency, p95 latency, and throughput.'],
            ['Cost/token', 'Economic fit', 'Every tuning option should show cost impact, not only latency or throughput improvement.'],
            ['0', 'Unauthorized writes', 'Production mutation tests should prove no natural-language path can bypass approval controls.'],
            ['<5m', 'Rollback readiness', 'Canary workflows should define rollback thresholds and prove reversibility under test.'],
            ['99%+', 'Audit completeness', 'Prompts, retrievals, benchmark jobs, recommendations, approvals, and outcomes should be replayable.']
          ].map(([value, label, note]) => (
            <div key={label} className="border border-black/10 bg-white p-7">
              <div className="font-mono text-4xl font-black text-green-800">{value}</div>
              <p className="mt-3 font-mono text-xs uppercase tracking-widest">{label}</p>
              <p className="mt-4 text-sm leading-relaxed text-black/60">{note}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'nv-roi',
    fullWidthContent: (
      <div className="w-full bg-black p-8 text-white md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-green-300">10 / Modeled Value</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">The ROI case is credible because it attacks GPU economics and engineering time together.</h3>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/62">
          A conservative 128-GPU estate is enough to make the economics legible: capacity deferral, faster incident triage, benchmark automation, and avoided bad rollouts all compound. That is the right shape for an NVIDIA case: if the system cannot improve utilization, serving quality, or operational decision speed, it is not worth calling an AI factory subsystem.
        </p>
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          <Metric value="$911K" label="Illustrative annual gross value" note="Modeled total across capacity deferral, incident triage, benchmark automation, and avoided misconfiguration." />
          <Metric value="$840K" label="Illustrative build cost" note="Modeled build, integration, hardening, security review, dashboards, and evaluation work." />
          <Metric value="~11mo" label="Modeled payback" note="Conservative payback estimate before larger-estate upside, cloud-burst avoidance, or high-volume endpoint optimization." />
        </div>
      </div>
    )
  },
  {
    id: 'nv-demo',
    bgColorLeft: 'bg-[#eff7ef]',
    textColorLeft: 'text-black',
    bgColorRight: 'bg-white',
    textColorRight: 'text-black',
    leftTitle: 'Demo Plan',
    leftContent: (
      <div>
        <h2 className="font-serif text-5xl leading-tight">The demo should prove the benchmark loop, not just the chat surface.</h2>
      </div>
    ),
    rightContent: (
      <div className="space-y-6 py-12 text-base leading-relaxed text-black/68">
        <p>Use a synthetic AI factory with Kubernetes manifests, NIM endpoints, Triton configs, benchmark traces, DCGM metrics, release notes, and prior incident tickets. The user asks why a specific LLM endpoint regressed after a model update.</p>
        <p>The agent should retrieve the change bundle, isolate the likely batching and memory-pressure issue, compare two serving configurations, run a replay benchmark, estimate cost-per-token impact, and produce a 5% canary approval packet with rollback thresholds. The strongest moment is when it refuses to apply the change directly and explains the approval path.</p>
        <div className="border border-black/10 bg-black p-6 text-white">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-green-300">What this proves</p>
          <p className="mt-4 font-serif text-2xl leading-snug">The product understands the business of accelerated infrastructure: capacity, latency, cost, risk, and repeatable evidence.</p>
        </div>
      </div>
    )
  },
  {
    id: 'nv-source-note',
    fullWidthContent: (
      <div className="flex w-full flex-col items-center bg-gray-100 p-8 text-center md:p-32">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.28em] text-green-700">{STANDARD_SOURCE_NOTE_LABEL}</p>
        <p className="max-w-3xl font-serif text-xl italic leading-relaxed text-black/68">
          {STANDARD_SOURCE_NOTE_TEXT}
        </p>
      </div>
    )
  }
];

export default nvidiaSections;
