import React from 'react';
import { SectionContent } from './portfolio';
import { BeforeAfter, BubbleDiagram } from '../components/Visuals';
import { STANDARD_SOURCE_NOTE_LABEL, STANDARD_SOURCE_NOTE_TEXT } from './caseStudyMeta';

const Signal = ({ title, source, body }: { title: string; source: string; body: string }) => (
  <div className="border border-white/10 bg-white/[0.04] p-6">
    <p className="font-mono text-[11px] uppercase tracking-widest text-blue-300">{source}</p>
    <h4 className="mt-3 text-lg font-semibold leading-snug text-white">{title}</h4>
    <p className="mt-4 text-sm leading-relaxed text-white/58">{body}</p>
  </div>
);

const Step = ({ n, title, body }: { n: string; title: string; body: string }) => (
  <div className="grid grid-cols-[44px_1fr] gap-4 border-b border-black/10 pb-5">
    <span className="font-mono text-sm font-bold text-blue-700">{n}</span>
    <div>
      <h4 className="font-semibold">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-black/62">{body}</p>
    </div>
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
    <p className="mt-3 font-mono text-xs uppercase tracking-widest text-blue-300">{label}</p>
    <p className="mt-4 text-sm leading-relaxed text-white/55">{note}</p>
  </div>
);

const nextEraSections: SectionContent[] = [
  {
    id: 'ne-hero',
    fullWidthContent: (
      <div className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-blue-950 p-8 text-white md:p-24">
        <div className="absolute -right-80 -top-80 h-[1100px] w-[1100px] rounded-full border border-white/5" />
        <div className="absolute -right-48 -top-48 h-[760px] w-[760px] rounded-full border-2 border-blue-300/10" />
        <div className="absolute -right-20 -top-20 h-[380px] w-[380px] rounded-full border-4 border-blue-300/20" />
        <p className="relative z-10 mb-10 font-mono text-xs uppercase tracking-[0.32em] text-blue-200/65">Public-source enterprise case study</p>
        <h1 className="relative z-10 max-w-6xl font-serif text-[15vw] leading-[0.8] tracking-tight md:text-[8vw]">
          Field crews need context, not another dashboard.
        </h1>
        <p className="relative z-10 mt-10 max-w-4xl font-serif text-2xl leading-snug text-white/72 md:text-3xl">
          A utility field-operations copilot designed around work-package quality, restoration policy, storm readiness, and a strict separation between decision support and grid control.
        </p>
        <div className="relative z-10 mt-20 grid grid-cols-2 gap-6 border-t border-white/15 pt-8 font-mono text-sm md:grid-cols-4">
          <div><p className="text-white/35">Source</p><p className="mt-2">Next Era AI Case Study 2.pdf</p></div>
          <div><p className="text-white/35">Use Case</p><p className="mt-2">Field operations</p></div>
          <div><p className="text-white/35">Mode</p><p className="mt-2">Recommend, retrieve, brief</p></div>
          <div><p className="text-white/35">Hard Boundary</p><p className="mt-2">Never control grid assets</p></div>
        </div>
      </div>
    )
  },
  {
    id: 'ne-thesis',
    bgColorLeft: 'bg-blue-950',
    textColorLeft: 'text-white',
    bgColorRight: 'bg-transparent',
    textColorRight: 'text-black',
    leftTitle: 'Thesis',
    leftContent: (
      <div>
        <p className="mb-4 font-mono text-sm uppercase tracking-[0.24em] text-blue-300">01 / Operating Thesis</p>
        <h2 className="font-serif text-5xl leading-tight md:text-6xl">Utility AI earns trust by improving preparation, not by taking control.</h2>
      </div>
    ),
    rightContent: (
      <div className="space-y-7 py-12 text-lg leading-relaxed text-black/72">
        <p>
          The public signals in the source PDF are unusually strong. NextEra and Google Cloud explicitly point to AI-enhanced field operations, while FPL already operates a sophisticated smart-grid and restoration environment. That makes field support a credible first product because the operational data already exists and the user pain is real: dispatchers and crews need fast synthesis across outages, assets, weather, parts, and safety procedures.
        </p>
        <p>
          The central tradeoff is speed versus authority. The closer the system gets to switching, dispatch, ETA commitments, or restoration sequencing, the more every hallucination becomes an operational risk. Keeping AI on incident packets, source-linked retrieval, and replayable recommendations narrows the scope, but it dramatically improves deployability in a critical-infrastructure environment.
        </p>
        <div className="border-l-4 border-blue-600 bg-blue-50 p-6">
          <p className="font-serif text-xl italic text-blue-950">
            The smartest system in utility operations is the one that knows where human authority begins.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'ne-evidence',
    fullWidthContent: (
      <div className="w-full bg-[#090d18] p-8 text-white md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-blue-300">02 / Evidence Base</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">The use case is not speculative. The autonomy boundary is.</h3>
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Signal
            source="NextEra Energy Newsroom"
            title="NextEra and Google Cloud publicly identified AI-enhanced field operations."
            body="The source brief specifically ties field operations to asset data, weather, supply-chain bottlenecks, crew availability, and scheduling. That makes field decision support the right flagship use case."
          />
          <Signal
            source="FPL reliability material"
            title="FPL smart-grid devices are described as avoiding more than 17 million interruptions since 2011."
            body="The system should extend a mature automation and reliability environment, not imply that LLMs are suddenly the control plane."
          />
          <Signal
            source="FPL restoration guidance"
            title="Restoration sequencing is policy-governed."
            body="Plants, transmission, substations, critical facilities, major thoroughfares, and smaller groups have priority logic. Recommendation ranking must respect that sequencing deterministically."
          />
          <Signal
            source="NIST AI RMF"
            title="Critical-infrastructure AI needs governance, measurement, and rollback."
            body="A serious implementation has to show risk ownership, replay tests, and fallback modes alongside the interface."
          />
        </div>
      </div>
    )
  },
  {
    id: 'ne-system-map',
    fullWidthContent: (
      <div className="grid min-h-[70vh] w-full grid-cols-1 border-b border-black/10 md:grid-cols-2">
        <div className="flex items-center justify-center bg-white p-8 md:p-20">
          <BubbleDiagram title="" items={[
            { label: 'Safety gate', size: 132, color: 'bg-red-600' },
            { label: 'Asset graph', size: 108, color: 'bg-yellow-600' },
            { label: 'RAG', size: 94, color: 'bg-blue-700' },
            { label: 'Forecast', size: 86, color: 'bg-green-700' },
            { label: 'Work package', size: 78, color: 'bg-blue-500' },
            { label: 'Replay', size: 64, color: 'bg-slate-600' }
          ]} />
        </div>
        <div className="flex flex-col justify-center bg-[#f2f6ff] p-8 md:p-20">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-blue-700">03 / Operating Model</p>
          <h3 className="mt-5 font-serif text-5xl leading-tight">A copilot is only valuable when every system keeps its authority.</h3>
          <p className="mt-8 text-lg leading-relaxed text-black/65">
            OMS, ADMS, SCADA summaries, AMI, EAM, GIS, workforce management, weather feeds, inspections, manuals, and SOP repositories are not interchangeable. The system must preserve each source's authority and show the user where every recommendation came from.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'ne-before-after',
    fullWidthContent: (
      <div className="w-full bg-white p-8 md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-blue-700">04 / Before and After</p>
        <h3 className="mt-5 font-serif text-5xl">Storm pressure is where interface debt becomes operational debt.</h3>
        <div className="mt-12">
          <BeforeAfter
            beforeLabel="Before AI"
            afterLabel="After AI"
            before={
              <div className="text-sm leading-relaxed text-black/68">
                <h4 className="mb-4 text-xl font-semibold text-black">Fragmented context under storm load.</h4>
                <p>A dispatcher sees multiple outage events after a storm band passes through. They check OMS, GIS, asset history, crew availability, weather, restoration priorities, and safety material manually. A crew gets a work order, but the briefing may not include recent faults, vegetation exposure, access constraints, or equipment history.</p>
              </div>
            }
            after={
              <div className="text-sm leading-relaxed text-black/68">
                <h4 className="mb-4 text-xl font-semibold text-black">AI-assembled work package.</h4>
                <p>The copilot clusters related events, identifies likely affected assets, retrieves SOPs and historical notes, summarizes hazards, proposes crew skills and parts, ranks the packet against restoration priorities, and generates a mobile-ready briefing for dispatcher approval.</p>
              </div>
            }
          />
        </div>
      </div>
    )
  },
  {
    id: 'ne-workflow',
    bgColorLeft: 'bg-transparent',
    textColorLeft: 'text-black',
    bgColorRight: 'bg-white',
    textColorRight: 'text-black',
    leftTitle: 'Workflow',
    leftContent: (
      <div>
        <p className="mb-4 font-mono text-sm uppercase tracking-[0.24em] text-blue-700">05 / Target State</p>
        <h2 className="font-serif text-5xl leading-tight">The AI is in the preparation loop, not the control loop.</h2>
        <p className="mt-8 text-lg leading-relaxed text-black/60">That sounds narrower than full automation, but it is exactly why the product can move faster without weakening safety ownership.</p>
      </div>
    ),
    rightContent: (
      <div className="space-y-5 py-12">
        <Step n="01" title="Event enters the stream" body="Outage, alarm, inspection, or asset-health signals are normalized with source, time, region, and severity context." />
        <Step n="02" title="Affected assets are resolved" body="The system links feeder, customer segment, GIS location, nearby critical facilities, weather track, and known hazards." />
        <Step n="03" title="Work package is drafted" body="The copilot assembles likely issue, asset history, SOPs, parts, crew skills, confidence, and source links." />
        <Step n="04" title="Dispatcher approves or edits" body="Humans can accept, edit, reject, or escalate before assignment. Critical-facility and safety-sensitive cases require review." />
        <Step n="05" title="Crew sees a briefing, not a command" body="Mobile briefing includes map context, asset history, hazards, photos, and linked manuals without issuing switching instructions." />
        <Step n="06" title="Incident replay closes the loop" body="Outcome, edits, field notes, timing, and recommendation quality feed evaluation and future routing." />
      </div>
    )
  },
  {
    id: 'ne-architecture',
    fullWidthContent: (
      <div className="w-full bg-[#07101f] p-8 text-white md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-blue-300">06 / Reference Architecture</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">The architecture is designed to fail safe, not just scale.</h3>
        <div className="mt-14 grid gap-4 font-mono text-sm">
          {[
            ['Field and operations channels', 'dispatcher console, crew mobile app, storm command view, reliability workbench'],
            ['AI operations orchestrator', 'event routing, policy checks, tool permissions, approval gates, replay IDs'],
            ['RAG service', 'SOPs, manuals, switching guidelines, safety rules, storm playbooks'],
            ['Asset intelligence service', 'asset graph, inspection history, failure modes, work-order history'],
            ['Forecasting service', 'weather, outage risk, asset health, crew and parts constraints'],
            ['GIS and work package builder', 'maps, access notes, critical facilities, feeder topology'],
            ['Data lakehouse and streaming bus', 'OMS, ADMS, SCADA summaries, AMI, EAM, GIS, WFM, weather, drone inspections'],
            ['Audit and replay plane', 'prompts, retrievals, features, recommendations, approvals, outcomes, rollback snapshots']
          ].map(([title, detail]) => (
            <div key={title} className="grid gap-3 border border-white/10 bg-white/[0.03] p-5 md:grid-cols-[260px_1fr]">
              <p className="text-blue-300">{title}</p>
              <p className="text-white/55">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'ne-agents',
    fullWidthContent: (
      <div className="w-full bg-[#f3f7ff] p-8 md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-blue-700">07 / Agent Boundaries</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">Bounded agents make the system faster without making it reckless.</h3>
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            ['Event Triage Agent', 'Clusters outage events and identifies likely affected assets.', 'Read-only. Dispatcher approves.'],
            ['Asset Context Agent', 'Summarizes EAM, inspections, manuals, and failure history.', 'Reliability review for sensitive cases.'],
            ['Safety Retrieval Agent', 'Retrieves SOPs and safety rules by work type and asset.', 'Source-linked only. No invented procedure.'],
            ['Work Package Agent', 'Drafts crew-ready packet from incident, weather, crew, and asset context.', 'Draft-only. Dispatcher owns assignment.'],
            ['Crew Fit Agent', 'Recommends skills and parts based on constraints.', 'Recommend-only. Humans assign crews.'],
            ['Incident Replay Agent', 'Reconstructs event timeline, AI output, human decision, and outcome.', 'Read-only. Operations validates lessons.']
          ].map(([name, purpose, boundary]) => (
            <div key={name} className="border-l-4 border-blue-700 bg-white p-6">
              <h4 className="font-semibold">{name}</h4>
              <p className="mt-3 text-sm leading-relaxed text-black/62">{purpose}</p>
              <p className="mt-5 bg-blue-50 p-3 font-mono text-xs text-blue-900">{boundary}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'ne-model-strategy',
    bgColorLeft: 'bg-blue-950',
    textColorLeft: 'text-white',
    bgColorRight: 'bg-[#0b1220]',
    textColorRight: 'text-white',
    leftTitle: 'Model Strategy',
    leftContent: (
      <div>
        <h2 className="font-serif text-5xl leading-tight">Put ML on prediction. Put rules on policy. Put humans on authority.</h2>
      </div>
    ),
    rightContent: (
      <div className="space-y-4 py-12 text-sm">
        {[
          ['Restoration priority', 'Deterministic rules', 'Safety and policy sequencing must not rely on model creativity.'],
          ['Critical facility detection', 'Rules plus GIS lookup', 'The system needs auditable, repeatable behavior.'],
          ['Outage clustering', 'Graph / ML algorithms', 'Event grouping is a legitimate statistical problem.'],
          ['Asset risk scoring', 'Time-series ML', 'Sensor trends, failure history, and weather patterns are better handled by models than prose.'],
          ['SOP retrieval', 'RAG', 'Guidance must be source-linked and version-aware.'],
          ['Crew briefing', 'LLM plus templates', 'Summarization helps, but approval and source links are mandatory.'],
          ['Switching and energization', 'Not AI-controlled', 'Safety-critical operations stay with trained operators.']
        ].map(([task, method, reason]) => (
          <div key={task} className="grid gap-3 border-b border-white/10 pb-4 md:grid-cols-[170px_170px_1fr]">
            <span className="font-mono text-blue-300">{task}</span>
            <span className="font-semibold">{method}</span>
            <span className="text-white/55">{reason}</span>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 'ne-risk',
    fullWidthContent: (
      <div className="w-full bg-white p-8 md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-blue-700">08 / Risk Register</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">The risk register is not a compliance appendix. It is the product spine.</h3>
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Risk risk="AI appears to control grid assets" owner="Operations / Legal" control="Hard no-control boundary, read-only operational data in MVP, explicit UI language." />
          <Risk risk="Unsafe field instruction" owner="Safety" control="SOP retrieval only, no invented procedures, supervisor review on sensitive work." />
          <Risk risk="Bad prioritization during storm" owner="Operations" control="Deterministic restoration policy rules and storm replay test cases." />
          <Risk risk="Cyber exposure" owner="CISO" control="Segmented environment, RBAC, logging, vendor review, and least-privilege tools." />
          <Risk risk="Forecast drift" owner="ML" control="Backtesting, drift monitors, and automatic removal of risk score from ranking until revalidated." />
          <Risk risk="Overtrust by field crews" owner="Product" control="Confidence, source links, approval gates, and human-factors UAT." />
        </div>
      </div>
    )
  },
  {
    id: 'ne-evaluation',
    fullWidthContent: (
      <div className="w-full bg-[#eff5ff] p-8 md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-blue-700">09 / Evaluation</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">Every claim has to survive replay.</h3>
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            ['95%', 'Retrieval alignment', 'SOP/manual questions must return the right source and effective version.'],
            ['90%', 'Briefing usefulness', 'Human review says the packet is useful without major correction.'],
            ['100%', 'Safety block rate', 'Unsafe control instructions must be refused every time.'],
            ['85%+', 'Outage clustering precision', 'Synthetic incident labels validate event grouping.'],
            ['75%+', 'Human acceptance', 'Dispatcher and supervisor rubric approves with minor edits.'],
            ['<5m', 'Operational rollback', 'Disable write-back and generated recommendations quickly.']
          ].map(([value, label, note]) => (
            <div key={label} className="border border-black/10 bg-white p-7">
              <div className="font-mono text-4xl font-black text-blue-800">{value}</div>
              <p className="mt-3 font-mono text-xs uppercase tracking-widest">{label}</p>
              <p className="mt-4 text-sm leading-relaxed text-black/60">{note}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'ne-roi',
    fullWidthContent: (
      <div className="w-full bg-blue-950 p-8 text-white md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-blue-300">10 / Modeled Value</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">The value model is strongest when it stays tied to operational mechanics.</h3>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/60">
          The business case becomes credible when it is explained in the same language operators use every day: fewer minutes assembling incident packets, shorter crew briefings, fewer repeat truck rolls, and better after-action learning. This is not an autonomous dispatch story, and that restraint is precisely what makes the ROI easier to defend.
        </p>
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          <Metric value="20%" label="Dispatcher prep reduction" note="Expected scenario from the source model for faster incident packet preparation." />
          <Metric value="10m" label="Faster crew briefing" note="Expected improvement in briefing assembly per work order." />
          <Metric value="5%" label="Avoided repeat truck rolls" note="Expected reduction from better context, parts planning, and incident learning." />
        </div>
      </div>
    )
  },
  {
    id: 'ne-demo',
    bgColorLeft: 'bg-[#eff5ff]',
    textColorLeft: 'text-black',
    bgColorRight: 'bg-white',
    textColorRight: 'text-black',
    leftTitle: 'Demo Plan',
    leftContent: (
      <div>
        <h2 className="font-serif text-5xl leading-tight">A serious review should show a refusal as clearly as a recommendation.</h2>
      </div>
    ),
    rightContent: (
      <div className="space-y-6 py-12 text-base leading-relaxed text-black/68">
        <p>Build a synthetic Florida service territory with feeders, assets, storm tracks, crew rosters, SOP excerpts, and work-order history. The demo starts when a storm event hits a synthetic feeder and the copilot builds an incident packet.</p>
        <p>The important moment is not the briefing itself. It is when the user asks for a switching instruction or ETA publication and the system refuses, routes to the proper human workflow, and leaves an auditable trace. That is the point where the product stops being a polished interface and starts looking operationally credible.</p>
        <div className="border border-black/10 bg-blue-950 p-6 text-white">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-blue-300">What this proves</p>
          <p className="mt-4 font-serif text-2xl leading-snug">The product improves decision quality and response speed without asking a utility to surrender operational authority to a model.</p>
        </div>
      </div>
    )
  },
  {
    id: 'ne-disclaimer',
    fullWidthContent: (
      <div className="flex w-full flex-col items-center bg-gray-100 p-8 text-center md:p-32">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.28em] text-blue-700">{STANDARD_SOURCE_NOTE_LABEL}</p>
        <p className="max-w-3xl font-serif text-xl italic leading-relaxed text-black/68">
          {STANDARD_SOURCE_NOTE_TEXT}
        </p>
      </div>
    )
  }
];

export default nextEraSections;
