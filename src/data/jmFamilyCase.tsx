import React from 'react';
import { SectionContent } from './portfolio';
import { BeforeAfter, BubbleDiagram } from '../components/Visuals';
import { STANDARD_SOURCE_NOTE_LABEL, STANDARD_SOURCE_NOTE_TEXT } from './caseStudyMeta';

const Signal = ({ title, source, body }: { title: string; source: string; body: string }) => (
  <div className="border border-white/10 bg-white/[0.04] p-6">
    <p className="font-mono text-[11px] uppercase tracking-widest text-violet-300">{source}</p>
    <h4 className="mt-3 text-lg font-semibold leading-snug text-white">{title}</h4>
    <p className="mt-4 text-sm leading-relaxed text-white/58">{body}</p>
  </div>
);

const Step = ({ n, title, body }: { n: string; title: string; body: string }) => (
  <div className="grid grid-cols-[44px_1fr] gap-4 border-b border-black/10 pb-5">
    <span className="font-mono text-sm font-bold text-violet-700">{n}</span>
    <div>
      <h4 className="font-semibold">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-black/62">{body}</p>
    </div>
  </div>
);

const Choice = ({ subject, method, reason }: { subject: string; method: string; reason: string }) => (
  <div className="grid gap-3 border-b border-white/10 pb-4 md:grid-cols-[175px_180px_1fr]">
    <span className="font-mono text-violet-300">{subject}</span>
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
    <p className="mt-3 font-mono text-xs uppercase tracking-widest text-violet-300">{label}</p>
    <p className="mt-4 text-sm leading-relaxed text-white/55">{note}</p>
  </div>
);

const jmFamilySections: SectionContent[] = [
  {
    id: 'jm-hero',
    fullWidthContent: (
      <div className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-violet-950 p-8 text-white md:p-24">
        <div className="absolute -right-56 -top-56 h-[860px] w-[860px] rounded-full border border-white/5" />
        <div className="absolute -right-16 top-16 h-80 w-80 rounded-full border border-violet-300/15" />
        <div className="absolute left-10 top-20 h-28 w-28 rounded-full bg-white/5" />
        <p className="relative z-10 mb-10 font-mono text-xs uppercase tracking-[0.32em] text-violet-200/70">Public-source enterprise case study</p>
        <h1 className="relative z-10 max-w-6xl font-serif text-[14vw] leading-[0.8] tracking-tight md:text-[7.6vw]">
          Dealer support gets expensive when knowledge lives in too many systems.
        </h1>
        <p className="relative z-10 mt-10 max-w-4xl font-serif text-2xl leading-snug text-white/74 md:text-3xl">
          A dealer operations copilot for JM Family-style F&amp;I support, claims readiness, compliance-aware drafting, and manager analytics across high-volume dealer workflows.
        </p>
        <div className="relative z-10 mt-20 grid grid-cols-2 gap-6 border-t border-white/15 pt-8 font-mono text-sm md:grid-cols-4">
          <div><p className="text-white/35">Source</p><p className="mt-2">JM Family AI Case Study.pdf</p></div>
          <div><p className="text-white/35">Focus</p><p className="mt-2">Dealer ops + F&amp;I</p></div>
          <div><p className="text-white/35">Boundary</p><p className="mt-2">Retrieve, draft, escalate</p></div>
          <div><p className="text-white/35">Design Bias</p><p className="mt-2">Extend existing portals</p></div>
        </div>
      </div>
    )
  },
  {
    id: 'jm-thesis',
    bgColorLeft: 'bg-violet-950',
    textColorLeft: 'text-white',
    bgColorRight: 'bg-transparent',
    textColorRight: 'text-black',
    leftTitle: 'Thesis',
    leftContent: (
      <div>
        <p className="mb-4 font-mono text-sm uppercase tracking-[0.24em] text-violet-300">01 / Operating Thesis</p>
        <h2 className="font-serif text-5xl leading-tight md:text-6xl">The strongest first wedge is dealer operations, not generic enterprise search.</h2>
      </div>
    ),
    rightContent: (
      <div className="space-y-7 py-12 text-lg leading-relaxed text-black/72">
        <p>
          The source PDF points to a practical AI story, not a speculative one. JM Family already has a public AI Center of Excellence, an AI Council, a Responsible AI program, and Azure-based internal assistant tooling. Its CTO has also publicly framed AI as best suited for proven, routine work that supports people rather than replacing them.
        </p>
        <p>
          That makes dealer operations the right first product surface. JM&amp;A serves 3,800+ dealer partners, Southeast Toyota Distributors supports 178 dealerships across five states, and Southeast Toyota Finance operates at contract volumes large enough for every repeated support delay to matter. A dealer-facing copilot can attach directly to handle time, reopen rate, claims packet completeness, and escalation quality.
        </p>
        <p>
          The tradeoff is intentional. A broad knowledge assistant is easier to describe, but weaker to measure. A narrow dealer-operations copilot demands deeper workflow understanding, yet it produces cleaner KPIs, clearer approval gates, and a more believable path from pilot to enterprise adoption.
        </p>
        <div className="border-l-4 border-violet-600 bg-violet-50 p-6">
          <p className="font-serif text-xl italic text-violet-950">
            The best enterprise AI work does not start with the biggest surface area. It starts where operational friction and source authority are both obvious.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'jm-evidence',
    fullWidthContent: (
      <div className="w-full bg-[#0c0814] p-8 text-white md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-violet-300">02 / Evidence Base</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">The public signals support a workflow copilot with governance at the center.</h3>
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Signal
            source="JM Family company news"
            title="AI governance is already publicly part of the enterprise posture."
            body="The AI Center of Excellence, AI Council, Responsible AI program, and Hubert assistant make a governed, cloud-first implementation more credible than a greenfield experiment."
          />
          <Signal
            source="JM&amp;A / Southeast Toyota public scale"
            title="Dealer support is large enough to justify specialized workflow intelligence."
            body="3,800+ dealer partners, 178 dealerships, nearly 500,000 annual retail and fleet sales, and large finance-servicing operations create repeatable support and claims volume."
          />
          <Signal
            source="Dealer Source / Gyde / compliance services"
            title="The right move is extension, not replacement."
            body="Dealer portals, product guidance, claims workflows, and compliance services already exist. The AI layer should retrieve, summarize, and draft around them rather than forcing a new operating surface."
          />
          <Signal
            source="FTC Safeguards Rule / CFPB / NIST"
            title="The business value is real, but the compliance floor is non-negotiable."
            body="Dealer and customer data are sensitive, indirect auto lending is compliance-sensitive, and every output has to survive access-control, citation, and audit scrutiny."
          />
        </div>
      </div>
    )
  },
  {
    id: 'jm-scale',
    fullWidthContent: (
      <div className="w-full bg-[#f4effd] p-8 md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-violet-700">03 / Public Scale Signals</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">Scale matters here because repeated dealer questions quickly become operating cost.</h3>
        <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">
          {[
            ['178', 'Toyota dealerships', 'A five-state dealer network is large enough to benefit from consistent, source-grounded support workflows.'],
            ['3.8k+', 'Dealer partners', 'JM&amp;A public scale suggests repeated product, claims, and compliance questions are not edge cases.'],
            ['697k+', 'Serviced contracts', 'Finance operations volume makes bounded assistance more valuable than generic search.'],
            ['500k', 'Annual sales', 'At this scale, small improvements in support flow and case quality compound quickly.']
          ].map(([value, label, note]) => (
            <div key={label} className="border border-black/10 bg-white p-6">
              <div className="font-mono text-4xl font-black text-violet-800">{value}</div>
              <p className="mt-3 font-mono text-xs uppercase tracking-widest">{label}</p>
              <p className="mt-4 text-sm leading-relaxed text-black/60">{note}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'jm-map',
    fullWidthContent: (
      <div className="grid min-h-[70vh] w-full grid-cols-1 border-b border-black/10 md:grid-cols-2">
        <div className="flex items-center justify-center bg-white p-8 md:p-20">
          <BubbleDiagram title="" items={[
            { label: 'Claims', size: 118, color: 'bg-violet-700' },
            { label: 'F&I rules', size: 110, color: 'bg-purple-700' },
            { label: 'Compliance', size: 102, color: 'bg-red-600' },
            { label: 'RAG', size: 88, color: 'bg-indigo-600' },
            { label: 'Analytics', size: 78, color: 'bg-slate-700' },
            { label: 'Audit', size: 66, color: 'bg-zinc-600' }
          ]} />
        </div>
        <div className="flex flex-col justify-center bg-[#faf6ff] p-8 md:p-20">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-violet-700">04 / Product Posture</p>
          <h3 className="mt-5 font-serif text-5xl leading-tight">The copilot sits between the case record, the policy corpus, and the approval path.</h3>
          <p className="mt-8 text-lg leading-relaxed text-black/65">
            That placement is deliberate. Dealers do not need another portal, and frontline teams do not need a model inventing answers from memory. They need a faster way to see authoritative product rules, claim requirements, contract context, case chronology, and the next safe action.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'jm-before-after',
    fullWidthContent: (
      <div className="w-full bg-white p-8 md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-violet-700">05 / Current vs Target</p>
        <h3 className="mt-5 font-serif text-5xl">The hard part is not finding one answer. It is finding the right answer fast enough to trust it.</h3>
        <div className="mt-12">
          <BeforeAfter
            beforeLabel="Current pattern"
            afterLabel="Target pattern"
            before={
              <div className="text-sm leading-relaxed text-black/68">
                <h4 className="mb-4 text-xl font-semibold text-black">Case handling by note-reading and document chase.</h4>
                <p>A dealer asks whether a service-contract claim can move forward. The specialist checks the portal, prior notes, claim requirements, product rules, and approved language separately. If a required inspection image or form is missing, the answer often depends on manual comparison, memory, and escalation.</p>
                <p className="mt-4">The cost is not just handle time. It is reopen loops, inconsistent explanations, and preventable reviewer work.</p>
              </div>
            }
            after={
              <div className="text-sm leading-relaxed text-black/68">
                <h4 className="mb-4 text-xl font-semibold text-black">Cited answer with compliance-aware workflow support.</h4>
                <p>The copilot assembles the case timeline, retrieves the current product rule and claims checklist, detects missing documentation, highlights sensitive phrasing risk, and prepares a draft response that asks for the right next item without implying a coverage or finance decision.</p>
                <p className="mt-4">Humans keep authority. The system removes scavenger work and makes the reasoning inspectable.</p>
              </div>
            }
          />
        </div>
      </div>
    )
  },
  {
    id: 'jm-workflow',
    bgColorLeft: 'bg-transparent',
    textColorLeft: 'text-black',
    bgColorRight: 'bg-white',
    textColorRight: 'text-black',
    leftTitle: 'Workflow',
    leftContent: (
      <div>
        <p className="mb-4 font-mono text-sm uppercase tracking-[0.24em] text-violet-700">06 / Target State</p>
        <h2 className="font-serif text-5xl leading-tight">The AI belongs in the support loop, not the approval loop.</h2>
        <p className="mt-8 text-lg leading-relaxed text-black/60">It speeds up retrieval, document readiness, and drafting while preserving the workflows that carry policy, finance, or legal consequence.</p>
      </div>
    ),
    rightContent: (
      <div className="space-y-5 py-12">
        <Step n="01" title="Dealer question or case enters the queue" body="A portal event, email, phone note, or field escalation lands with dealer, contract, and product context." />
        <Step n="02" title="Operational context is hydrated" body="The system pulls case notes, claim status, contract data, finance context, and program metadata from existing systems of record." />
        <Step n="03" title="Authoritative sources are retrieved" body="Hybrid search ranks product guides, claims instructions, compliance templates, and training materials by freshness, ownership, and scope." />
        <Step n="04" title="The workflow is classified" body="The copilot determines whether the case is a knowledge question, a claims packet issue, a finance-sensitive matter, or a compliance-sensitive escalation." />
        <Step n="05" title="A bounded draft is prepared" body="The output includes a case summary, evidence links, missing-item flags, confidence, and a draft response if the workflow allows one." />
        <Step n="06" title="Humans approve or escalate" body="Sensitive answers, commitments, or low-confidence cases route to the right reviewer queue with a full trace for audit and coaching." />
      </div>
    )
  },
  {
    id: 'jm-architecture',
    fullWidthContent: (
      <div className="w-full bg-[#120b1b] p-8 text-white md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-violet-300">07 / Reference Architecture</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">A workflow intelligence layer that respects source ownership.</h3>
        <div className="mt-14 grid gap-4 font-mono text-sm">
          {[
            ['Dealer and support channels', 'dealer portal, Dealer Source-style workflows, CRM case screen, email add-in, manager dashboard'],
            ['AI orchestration layer', 'intent router, case summarizer, retrieval planner, approval router, template manager'],
            ['Bounded agent layer', 'knowledge retrieval, case summary, claims packet, draft response, compliance gate, workflow insight'],
            ['Retrieval and policy layer', 'hybrid search, keyword index, vector index, authority ranking, version and effective-date filters'],
            ['Operational context adapters', 'case state, dealer profile, contract status, claim status, finance context, logistics events'],
            ['Systems of record', 'dealer portal, CRM/case management, claims systems, contract systems, finance systems, document repositories'],
            ['Manager analytics plane', 'aging, reopen reasons, repeat questions, backlog clusters, workflow heatmaps'],
            ['Control plane', 'RBAC, audit ledger, prompt registry, eval harness, red-team tests, monitoring, rollback']
          ].map(([title, detail]) => (
            <div key={title} className="grid gap-3 border border-white/10 bg-white/[0.03] p-5 md:grid-cols-[260px_1fr]">
              <p className="text-violet-300">{title}</p>
              <p className="text-white/55">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'jm-model-strategy',
    bgColorLeft: 'bg-violet-950',
    textColorLeft: 'text-white',
    bgColorRight: 'bg-[#150d1f]',
    textColorRight: 'text-white',
    leftTitle: 'Model Strategy',
    leftContent: (
      <div>
        <h2 className="font-serif text-5xl leading-tight">Use models for synthesis. Use rules for exposure. Use humans for commitment.</h2>
        <p className="mt-8 text-lg leading-relaxed text-white/62">
          The sharp tradeoffs are operational. Azure-style enterprise hosting is plausible because JM Family already references it publicly, but the system should still sit behind a model gateway so prompts, models, and vendors can change without rewriting workflow services.
        </p>
      </div>
    ),
    rightContent: (
      <div className="space-y-4 py-12">
        <Choice subject="Product/rule lookup" method="RAG + metadata filters" reason="Answers need current, cited, program-aware sources rather than fluent guesses." />
        <Choice subject="Claims packet completeness" method="OCR + classifier + rules" reason="Structured document workflow is measurable and should produce explicit missing-item logic." />
        <Choice subject="Dealer response drafts" method="LLM + templates + citations" reason="Language work benefits from generation, but the output must stay approval-gated." />
        <Choice subject="Compliance routing" method="Rules + classifier" reason="High recall matters more than elegance when the cost of under-escalation is legal or financial exposure." />
        <Choice subject="Manager bottlenecks" method="SQL + BI + anomaly detection" reason="Backlog, reopen, and repeat-question patterns are better surfaced from structured data than prose." />
        <Choice subject="Claims approval" method="Human / system-owned" reason="Coverage, commitments, finance terms, and legal interpretations remain outside the model boundary." />
      </div>
    )
  },
  {
    id: 'jm-risk',
    fullWidthContent: (
      <div className="w-full bg-white p-8 md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-violet-700">08 / Risk Register</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">The risks are exactly what make the workflow worth designing carefully.</h3>
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Risk owner="Compliance / Legal" risk="Wrong product or program version is cited" control="Authority ranking, effective-date filters, role scope, and no-citation refusal for policy answers." />
          <Risk owner="Finance Ops" risk="Draft implies a finance or coverage commitment" control="Template constraints, blocked intents, approval gates, and escalation into approved workflows." />
          <Risk owner="Security" risk="Dealer or customer data leaks across scopes" control="RBAC plus dealer or operator scoping, field-level redaction, audit logging, and retrieval-boundary tests." />
          <Risk owner="Claims" risk="Missing-document logic is wrong" control="Document-confidence thresholds, checklist rules, and human confirmation before claim action." />
          <Risk owner="ML / Security" risk="Prompt injection changes model behavior" control="Attachments treated as data, tool allowlists, schema validation, and adversarial testing." />
          <Risk owner="Product" risk="Frontline teams overtrust the draft" control="Visible citations, confidence labels, editable output, and explicit human-approval ownership." />
        </div>
      </div>
    )
  },
  {
    id: 'jm-evaluation',
    fullWidthContent: (
      <div className="w-full bg-[#f4effd] p-8 md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-violet-700">09 / Evaluation</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">The system is only credible if the evidence, escalation, and audit paths are measurable.</h3>
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            ['95%+', 'Citation correctness', 'Approved dealer-policy and product questions should return the right source, version, and answer boundary.'],
            ['98%+', 'Sensitive escalation recall', 'Finance-sensitive, compliance-sensitive, and unsafe prompts should route correctly before harm.'],
            ['90%+', 'Missing-doc recall', 'Claims packet tests should catch missing or inconsistent documentation with clear reviewer thresholds.'],
            ['0', 'Successful prompt-injection tool misuse', 'Malicious tickets and attachments should fail closed in test suites.'],
            ['99%+', 'Audit trace completeness', 'Prompts, retrievals, drafts, edits, approvals, and overrides should all be replayable.'],
            ['60-75%', 'Draft acceptance', 'Scoped pilot workflows should produce useful first drafts without forcing frontline teams into cleanup labor.']
          ].map(([value, label, note]) => (
            <div key={label} className="border border-black/10 bg-white p-7">
              <div className="font-mono text-4xl font-black text-violet-800">{value}</div>
              <p className="mt-3 font-mono text-xs uppercase tracking-widest">{label}</p>
              <p className="mt-4 text-sm leading-relaxed text-black/60">{note}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'jm-roi',
    fullWidthContent: (
      <div className="w-full bg-violet-950 p-8 text-white md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-violet-300">10 / Modeled Value</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">The value case is strongest when it stays tied to the mechanics of dealer work.</h3>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/62">
          The source PDF models value across knowledge retrieval, drafting, claims packet quality, lower reopen rates, and manager visibility. That is the right framing. It avoids fantasy ROI and instead ties the case to the repeated tasks leaders can actually inspect, measure, and improve.
        </p>
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          <Metric value="15-25%" label="Handle-time reduction" note="Modeled improvement for scoped, assisted dealer-support cases with faster retrieval and cleaner drafts." />
          <Metric value="10-20%" label="Fewer reopened cases" note="Modeled reduction when the first response includes the right evidence, the right next step, and the right missing-item request." />
          <Metric value="$2.4M" label="Expected annual gross benefit" note="Source-model midpoint across retrieval savings, drafting gains, claims completeness, escalations, and manager analytics." />
        </div>
      </div>
    )
  },
  {
    id: 'jm-demo',
    bgColorLeft: 'bg-[#f4effd]',
    textColorLeft: 'text-black',
    bgColorRight: 'bg-white',
    textColorRight: 'text-black',
    leftTitle: 'Demo Plan',
    leftContent: (
      <div>
        <h2 className="font-serif text-5xl leading-tight">A credible review should show source control, escalation control, and communication judgment.</h2>
      </div>
    ),
    rightContent: (
      <div className="space-y-6 py-12 text-base leading-relaxed text-black/68">
        <p>The strongest walkthrough starts with a realistic dealer request: a service-contract claim is in motion, but the packet may be missing an inspection photo and the dealer wants to know whether the claim can proceed. The copilot should summarize the case, surface the authoritative rule, flag that AI cannot confirm coverage, detect the missing requirement, and prepare the next safe dealer response.</p>
        <p>A serious demo also shows the uncomfortable paths: an out-of-scope finance question, a prompt-injected attachment, a stale program rule, a low-confidence OCR read, and an answer that correctly routes to compliance rather than pretending certainty. That is where a recruiter or buyer sees whether the system was thought through or merely decorated.</p>
        <div className="border border-black/10 bg-violet-950 p-6 text-white">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-violet-300">What this proves</p>
          <p className="mt-4 font-serif text-2xl leading-snug">The product is designed around authoritative answers, safer dealer communication, and measurable workflow improvement, not generic chat novelty.</p>
        </div>
      </div>
    )
  },
  {
    id: 'jm-source-note',
    fullWidthContent: (
      <div className="flex w-full flex-col items-center bg-gray-100 p-8 text-center md:p-32">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.28em] text-violet-700">{STANDARD_SOURCE_NOTE_LABEL}</p>
        <p className="max-w-3xl font-serif text-xl italic leading-relaxed text-black/68">
          {STANDARD_SOURCE_NOTE_TEXT}
        </p>
      </div>
    )
  }
];

export default jmFamilySections;
