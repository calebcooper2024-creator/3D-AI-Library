import React from 'react';
import { SectionContent } from './portfolio';
import { BeforeAfter, BubbleDiagram } from '../components/Visuals';
import { STANDARD_SOURCE_NOTE_LABEL, STANDARD_SOURCE_NOTE_TEXT } from './caseStudyMeta';

const Evidence = ({ label, body }: { label: string; body: string }) => (
  <div className="border border-black/10 bg-white/80 p-6">
    <p className="font-mono text-[11px] uppercase tracking-widest text-purple-700">Source signal</p>
    <h4 className="mt-3 text-lg font-semibold leading-snug">{label}</h4>
    <p className="mt-4 text-sm leading-relaxed text-black/60">{body}</p>
  </div>
);

const Boundary = ({ title, body }: { title: string; body: string }) => (
  <div className="border-l-4 border-pink-600 bg-white p-6">
    <h4 className="font-semibold">{title}</h4>
    <p className="mt-3 text-sm leading-relaxed text-black/62">{body}</p>
  </div>
);

const Row = ({ subject, choice, reason }: { subject: string; choice: string; reason: string }) => (
  <div className="grid gap-3 border-b border-white/10 pb-4 md:grid-cols-[170px_180px_1fr]">
    <span className="font-mono text-pink-300">{subject}</span>
    <span className="font-semibold text-white">{choice}</span>
    <span className="text-sm leading-relaxed text-white/55">{reason}</span>
  </div>
);

const Risk = ({ risk, control }: { risk: string; control: string }) => (
  <div className="border border-black/10 bg-white p-5">
    <h4 className="font-semibold">{risk}</h4>
    <p className="mt-3 text-sm leading-relaxed text-black/60">{control}</p>
  </div>
);

const lightWonderSections: SectionContent[] = [
  {
    id: 'lw-hero',
    fullWidthContent: (
      <div className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-gradient-to-br from-purple-950 via-fuchsia-950 to-pink-900 p-8 text-white md:p-24">
        <div className="absolute left-10 top-16 h-72 w-72 rounded-full border border-white/10" />
        <div className="absolute bottom-24 right-20 h-96 w-96 rounded-full border border-pink-200/15" />
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-white/20" />
        <p className="relative z-10 mb-10 font-mono text-xs uppercase tracking-[0.32em] text-pink-100/60">Public-source enterprise case study</p>
        <h1 className="relative z-10 max-w-6xl font-serif text-[14vw] leading-[0.8] tracking-tight md:text-[7.5vw]">
          Operator intelligence, not player exploitation.
        </h1>
        <p className="relative z-10 mt-10 max-w-4xl font-serif text-2xl leading-snug text-white/74 md:text-3xl">
          A governed operator-intelligence layer for casino systems and iGaming: cross-system explanation, support acceleration, compliance retrieval, and safer escalation in regulated markets.
        </p>
        <div className="relative z-10 mt-20 grid grid-cols-2 gap-6 border-t border-white/15 pt-8 font-mono text-sm md:grid-cols-4">
          <div><p className="text-white/35">Source</p><p className="mt-2">Light & Wonder.pdf</p></div>
          <div><p className="text-white/35">Case Type</p><p className="mt-2">Enterprise case study</p></div>
          <div><p className="text-white/35">Domain</p><p className="mt-2">Regulated gaming tech</p></div>
          <div><p className="text-white/35">Boundary</p><p className="mt-2">Human-owned decisions</p></div>
        </div>
      </div>
    )
  },
  {
    id: 'lw-positioning',
    bgColorLeft: 'bg-purple-950',
    textColorLeft: 'text-white',
    bgColorRight: 'bg-transparent',
    textColorRight: 'text-black',
    leftTitle: 'Positioning',
    leftContent: (
      <div>
        <p className="mb-4 font-mono text-sm uppercase tracking-[0.24em] text-pink-300">01 / Product Thesis</p>
        <h2 className="font-serif text-5xl leading-tight md:text-6xl">The first product choice is ethical, commercial, and architectural at the same time.</h2>
      </div>
    ),
    rightContent: (
      <div className="space-y-7 py-12 text-lg leading-relaxed text-black/72">
        <p>
          Light & Wonder's public footprint spans gaming devices, casino systems, iGaming, operator support, and jurisdiction-sensitive workflows. That makes AI potentially valuable in many places, but not all value is equal. The highest-quality wedge is operator intelligence: helping teams explain trends, resolve incidents, retrieve rules, and prepare support or compliance work faster.
        </p>
        <p>
          That is a deliberate tradeoff. More aggressive player-level optimization might look commercially tempting, but it collides with responsible-gaming, privacy, and regulatory scrutiny. A governed operator layer is the stronger product choice because it improves service quality, incident response, and operational trust without drifting into manipulative behavior or uncertified game-math decisioning.
        </p>
        <div className="border-l-4 border-pink-600 bg-white/75 p-6">
          <p className="font-serif text-xl italic">
            In regulated gaming, the durable advantage is governed clarity, not unchecked personalization.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'lw-evidence',
    fullWidthContent: (
      <div className="w-full bg-[#f7eff7] p-8 md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-purple-700">02 / Evidence Base</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">The public footprint supports a broad operating layer, but governance has to be part of the product.</h3>
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Evidence
            label="Gaming technology, casino systems, iGaming, support, compliance, and responsible-gaming workflows are all in scope."
            body="That scope implies more than analytics. The system needs role boundaries, jurisdiction filters, escalation queues, and immutable traces."
          />
          <Evidence
            label="The brief cites enterprise scale: thousands of games, billions of monthly rounds, and many regulated jurisdictions."
            body="The architecture should assume multi-tenant data, jurisdiction-specific policy, high-volume telemetry, and strict access control from day one."
          />
          <Evidence
            label="Support and operator workflows are plausible near-term entry points."
            body="Ticket drafting, product documentation retrieval, anomaly explanation, and release-support packaging are useful without touching regulated game math."
          />
          <Evidence
            label="Responsible-gaming and AML signals require evidence packaging, not autonomous conclusions."
            body="The AI can assemble context and route cases, but interventions, filings, and regulated judgments remain human-owned."
          />
        </div>
      </div>
    )
  },
  {
    id: 'lw-scale',
    fullWidthContent: (
      <div className="w-full bg-[#0a0610] p-8 text-white md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-pink-300">03 / Public Scale Signals In The Brief</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">Scale changes both the architecture and the duty of care.</h3>
        <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">
          {[
            ['6.5k+', 'Team members', 'Cross-functional operating surface, not a single product lane.'],
            ['6.5k+', 'Games', 'Large product/documentation corpus and release-support burden.'],
            ['5B+', 'Monthly rounds', 'Volume makes anomaly triage and explainability valuable.'],
            ['36', 'Regulated jurisdictions', 'Policy filtering and access control are core product requirements.']
          ].map(([value, label, note]) => (
            <div key={label} className="border border-white/10 bg-white/[0.04] p-6">
              <div className="font-mono text-4xl font-black text-pink-300">{value}</div>
              <p className="mt-3 font-mono text-xs uppercase tracking-widest">{label}</p>
              <p className="mt-4 text-sm leading-relaxed text-white/52">{note}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'lw-map',
    fullWidthContent: (
      <div className="grid min-h-[70vh] w-full grid-cols-1 border-b border-black/10 md:grid-cols-2">
        <div className="flex items-center justify-center bg-white p-8 md:p-20">
          <BubbleDiagram title="" items={[
            { label: 'Compliance', size: 120, color: 'bg-pink-700' },
            { label: 'Responsible gaming', size: 112, color: 'bg-red-600' },
            { label: 'Ops insight', size: 104, color: 'bg-purple-700' },
            { label: 'Support', size: 92, color: 'bg-fuchsia-600' },
            { label: 'Anomaly', size: 80, color: 'bg-violet-500' },
            { label: 'Audit', size: 66, color: 'bg-slate-600' }
          ]} />
        </div>
        <div className="flex flex-col justify-center bg-[#fbf2fb] p-8 md:p-20">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-purple-700">04 / Product Posture</p>
          <h3 className="mt-5 font-serif text-5xl leading-tight">The copilot sits between systems, not above them.</h3>
          <p className="mt-8 text-lg leading-relaxed text-black/65">
            It should not become an informal regulator, floor manager, math authority, or player-targeting engine. It should read scoped evidence, explain operational signals, draft support work, and route high-risk cases to the people who already own the decision. That keeps the product commercially useful without turning it into an opaque decision-maker in a sensitive industry.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'lw-before-after',
    fullWidthContent: (
      <div className="w-full bg-white p-8 md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-purple-700">05 / Current vs Target</p>
        <h3 className="mt-5 font-serif text-5xl">The hard part is not seeing a trend. It is explaining it responsibly.</h3>
        <div className="mt-12">
          <BeforeAfter
            beforeLabel="Current pattern"
            afterLabel="Target pattern"
            before={
              <div className="text-sm leading-relaxed text-black/68">
                <h4 className="mb-4 text-xl font-semibold text-black">Manual cross-system investigation.</h4>
                <p>An operator notices performance movement. Support checks tickets. Product checks release notes. Analytics checks performance. Compliance checks jurisdiction language. If the issue crosses systems, the answer depends on exports, memory, and repeated handoffs.</p>
              </div>
            }
            after={
              <div className="text-sm leading-relaxed text-black/68">
                <h4 className="mb-4 text-xl font-semibold text-black">Governed intelligence layer.</h4>
                <p>The operator asks why a game family underperformed in a property or region. The copilot queries aggregate metrics, checks device/session anomalies, retrieves relevant release notes and tickets, applies jurisdiction filters, summarizes likely causes, and routes sensitive items to review.</p>
              </div>
            }
          />
        </div>
      </div>
    )
  },
  {
    id: 'lw-workflow',
    bgColorLeft: 'bg-transparent',
    textColorLeft: 'text-black',
    bgColorRight: 'bg-white',
    textColorRight: 'text-black',
    leftTitle: 'Workflow',
    leftContent: (
      <div>
        <p className="mb-4 font-mono text-sm uppercase tracking-[0.24em] text-purple-700">06 / Target State</p>
        <h2 className="font-serif text-5xl leading-tight">Every answer passes through role, scope, jurisdiction, and risk.</h2>
      </div>
    ),
    rightContent: (
      <div className="space-y-5 py-12">
        {[
          ['01', 'Normalize events', 'Property, device, session, iGaming, ticket, release, and document events enter a canonical event layer.'],
          ['02', 'Resolve entities', 'Operator, property, game, cabinet, device, session, ticket, incident, jurisdiction, rule, and review case become explicit objects.'],
          ['03', 'Gate by policy', 'A policy gateway checks role, operator scope, jurisdiction, task type, and risk before any model call or tool action.'],
          ['04', 'Route by task', 'Requests go to deterministic rules, metrics queries, RAG, anomaly scoring, drafting services, or human review.'],
          ['05', 'Return evidence', 'Outputs include citations, confidence, trace IDs, scope, caveats, and recommended next action.'],
          ['06', 'Escalate high risk', 'RG, AML, major incidents, regulator-facing drafts, and P1/P2 cases route to the correct human queue.']
        ].map(([n, title, body]) => (
          <div key={n} className="grid grid-cols-[44px_1fr] gap-4 border-b border-black/10 pb-5">
            <span className="font-mono text-sm font-bold text-purple-700">{n}</span>
            <div>
              <h4 className="font-semibold">{title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-black/62">{body}</p>
            </div>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 'lw-architecture',
    fullWidthContent: (
      <div className="w-full bg-[#09050d] p-8 text-white md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-pink-300">07 / Reference Architecture</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">The architecture is a governance system with AI inside it.</h3>
        <div className="mt-14 grid gap-4 font-mono text-sm">
          {[
            ['Source systems', 'SDS, CMP, CANVAS-class UI, OpenGaming, PAM, support portal, release docs, rule docs'],
            ['Event and document ingestion', 'connectors, batch loads, secure uploads, CDC/webhooks, schema validation'],
            ['Canonical data layer', 'operator, property, device, cabinet, game, session, ticket, incident, jurisdiction, rule, review case'],
            ['Analytics warehouse and feature store', 'daily metrics, anomaly features, game-performance marts, support marts, compliance marts'],
            ['Policy and orchestration gateway', 'RBAC/ABAC, jurisdiction filter, task router, risk classifier, tool permissions, trace IDs'],
            ['RAG and explanation services', 'product docs, support SOPs, rule sources, technical standards, source-grounded summaries'],
            ['Risk triage service', 'responsible-gaming and AML evidence packaging, routing, human review queue'],
            ['Governance and evaluation plane', 'audit ledger, replay harness, model registry, prompt registry, corpus versions, kill switches']
          ].map(([title, detail]) => (
            <div key={title} className="grid gap-3 border border-white/10 bg-white/[0.03] p-5 md:grid-cols-[270px_1fr]">
              <p className="text-pink-300">{title}</p>
              <p className="text-white/55">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'lw-boundaries',
    fullWidthContent: (
      <div className="w-full bg-[#f7eff7] p-8 md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-purple-700">08 / Agent Boundaries</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">The agents are useful because they stop before the dangerous part.</h3>
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Boundary title="Ops Insight Agent" body="Explains game, device, and session trends. Humans approve floor, release, or commercial action." />
          <Boundary title="Support Drafting Agent" body="Drafts B2B support responses with ticket context. P1/P2 and low-confidence cases require human review." />
          <Boundary title="Compliance Answer Agent" body="Retrieves jurisdiction-specific guidance. Regulator-facing content needs signoff." />
          <Boundary title="Risk Triage Agent" body="Packages RG/AML signals for review. Every intervention or filing remains human-owned." />
          <Boundary title="Release Pack Agent" body="Assists release and certification documentation. Final math and submission approvals remain outside the model." />
          <Boundary title="Audit Scribe Agent" body="Records immutable traceability. It can append, but not alter or delete records." />
        </div>
      </div>
    )
  },
  {
    id: 'lw-model-strategy',
    bgColorLeft: 'bg-purple-950',
    textColorLeft: 'text-white',
    bgColorRight: 'bg-[#0d0711]',
    textColorRight: 'text-white',
    leftTitle: 'Model Strategy',
    leftContent: (
      <div>
        <h2 className="font-serif text-5xl leading-tight">Game math is not a generation problem.</h2>
        <p className="mt-8 text-lg leading-relaxed text-white/62">A serious design knows which tasks belong to rules, which belong to statistics, and which belong to people. The more regulated or commercially sensitive the action becomes, the less generative the system should be.</p>
      </div>
    ),
    rightContent: (
      <div className="space-y-4 py-12">
        <Row subject="Permissions" choice="Deterministic rules" reason="Access control must be explicit, repeatable, and testable." />
        <Row subject="Compliance routing" choice="Policy engine + classifier" reason="High recall is more important than creative phrasing." />
        <Row subject="Ops summaries" choice="LLM + evidence" reason="Useful for synthesis when source documents and metrics are attached." />
        <Row subject="Support drafts" choice="LLM + RAG + templates" reason="Language-heavy work, but final customer-facing action can stay approval-gated." />
        <Row subject="Device anomalies" choice="Statistical ML" reason="Numeric pattern detection belongs to models trained for patterns, not prose." />
        <Row subject="RG/AML evidence" choice="Rules + ML + summary" reason="Humans decide outcomes; AI packages evidence and routes the case." />
        <Row subject="Game math/payout" choice="No LLM" reason="Must remain deterministic, certified, and regulated." />
        <Row subject="Regulatory conclusions" choice="No autonomous AI" reason="Human compliance ownership is required." />
      </div>
    )
  },
  {
    id: 'lw-risks',
    fullWidthContent: (
      <div className="w-full bg-white p-8 md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-purple-700">09 / Risk Register</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">The system has to be useful without becoming manipulative.</h3>
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Risk risk="Manipulative personalization" control="Prohibited-use policy, aggregate-first analytics, responsible-gaming guardrails, and human review." />
          <Risk risk="Wrong jurisdiction answer" control="Jurisdiction-filtered retrieval, effective dates, and no-citation refusal." />
          <Risk risk="Responsible-gaming under-escalation" control="High-recall triage, human review, longitudinal evaluation, and review-queue auditing." />
          <Risk risk="AML false confidence" control="Evidence packaging only. No autonomous SAR decision or legal conclusion." />
          <Risk risk="P1/P2 mishandling" control="Deterministic severity routing and escalation reminders before generated drafting." />
          <Risk risk="Hallucinated support response" control="Template constraints, source citations, and draft-only mode for material responses." />
        </div>
      </div>
    )
  },
  {
    id: 'lw-evaluation',
    fullWidthContent: (
      <div className="w-full bg-[#f7eff7] p-8 md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-purple-700">10 / Evaluation</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">Evaluation has to include the cases the product hopes are rare.</h3>
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            ['95%', 'Retrieval recall', 'Golden product, support, and compliance Q&A with expected sources.'],
            ['99%', 'Jurisdiction accuracy', 'Cross-jurisdiction rule questions with effective-date checks.'],
            ['100%', 'P1/P2 escalation', 'Severity test suite routes critical cases to humans.'],
            ['99%+', 'Prompt injection defense', 'Malicious ticket and document tests fail closed.'],
            ['100%', 'Access control', 'Cross-tenant and role-boundary tests block leakage.'],
            ['70%+', 'Pilot acceptance', 'Weekly active use and rubric-rated usefulness in controlled pilot.']
          ].map(([value, label, note]) => (
            <div key={label} className="border border-black/10 bg-white p-7">
              <div className="font-mono text-4xl font-black text-purple-800">{value}</div>
              <p className="mt-3 font-mono text-xs uppercase tracking-widest">{label}</p>
              <p className="mt-4 text-sm leading-relaxed text-black/60">{note}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'lw-roi',
    fullWidthContent: (
      <div className="w-full bg-purple-950 p-8 text-white md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-pink-300">11 / Modeled Value</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">The value is not more gambling activity. The value is fewer blind spots and faster operator response.</h3>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/62">
          The source model ties value to operator efficiency rather than higher player extraction. That is the right business case. Support productivity, release throughput, faster incident recovery, and fewer cross-system blind spots are all legible benefits; anything more aggressive would be harder to defend to operators, regulators, and internal risk teams.
        </p>
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            ['$1.62M', 'Year-one investment', 'Modeled build, integration, governance, and rollout cost.'],
            ['$2.95M', 'Expected annual benefit', 'Modeled benefit across support, compliance productivity, incident recovery, and operations.'],
            ['$1.33M', 'Net year-one value', 'Modeled difference, explicitly not a production result claim.']
          ].map(([value, label, note]) => (
            <div key={label} className="border border-white/10 bg-white/[0.04] p-7">
              <div className="font-mono text-5xl font-black">{value}</div>
              <p className="mt-3 font-mono text-xs uppercase tracking-widest text-pink-300">{label}</p>
              <p className="mt-4 text-sm leading-relaxed text-white/55">{note}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'lw-demo',
    bgColorLeft: 'bg-[#f7eff7]',
    textColorLeft: 'text-black',
    bgColorRight: 'bg-white',
    textColorRight: 'text-black',
    leftTitle: 'Demo Plan',
    leftContent: (
      <div>
        <h2 className="font-serif text-5xl leading-tight">A credible review should test the uncomfortable cases.</h2>
      </div>
    ),
    rightContent: (
      <div className="space-y-6 py-12 text-base leading-relaxed text-black/68">
        <p>Use synthetic operator data: properties, games, cabinets, sessions, support tickets, release notes, and jurisdiction rules. The operator asks why a game family underperformed. The system returns a sourced answer, shows scope, states uncertainty, and recommends review actions.</p>
        <p>Then run the uncomfortable cases: a responsible-gaming signal, a jurisdiction conflict, a P1 incident, a prompt-injected support ticket, and a request to change game math. The strongest demo is the one that refuses the wrong request clearly and shows why the refusal is a product strength.</p>
        <div className="border border-black/10 bg-purple-950 p-6 text-white">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-pink-300">What this proves</p>
          <p className="mt-4 font-serif text-2xl leading-snug">The product creates faster operator understanding and safer escalation without crossing into manipulative or uncertified behavior.</p>
        </div>
      </div>
    )
  },
  {
    id: 'lw-disclaimer',
    fullWidthContent: (
      <div className="flex w-full flex-col items-center bg-gray-100 p-8 text-center md:p-32">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.28em] text-purple-700">{STANDARD_SOURCE_NOTE_LABEL}</p>
        <p className="max-w-3xl font-serif text-xl italic leading-relaxed text-black/68">
          {STANDARD_SOURCE_NOTE_TEXT}
        </p>
      </div>
    )
  }
];

export default lightWonderSections;
