import React from 'react';
import { SectionContent } from './portfolio';
import { BeforeAfter, BubbleDiagram } from '../components/Visuals';
import { STANDARD_SOURCE_NOTE_LABEL, STANDARD_SOURCE_NOTE_TEXT } from './caseStudyMeta';

const Stat = ({ value, label, note }: { value: string; label: string; note: string }) => (
  <div className="border border-white/10 bg-white/5 p-6">
    <div className="font-mono text-4xl font-black tracking-tight">{value}</div>
    <p className="mt-3 font-mono text-xs uppercase tracking-widest text-purple-300">{label}</p>
    <p className="mt-4 text-sm leading-relaxed text-white/55">{note}</p>
  </div>
);

const EvidenceCard = ({ signal, meaning }: { signal: string; meaning: string }) => (
  <div className="border border-black/10 bg-white/75 p-6">
    <p className="font-mono text-[11px] uppercase tracking-widest text-purple-600">Public signal</p>
    <h4 className="mt-3 text-lg font-semibold leading-snug">{signal}</h4>
    <p className="mt-4 text-sm leading-relaxed text-black/60">{meaning}</p>
  </div>
);

const RiskCard = ({ risk, control, level }: { risk: string; control: string; level: string }) => (
  <div className="grid grid-cols-[80px_1fr] gap-5 border border-black/10 bg-white p-5">
    <span className="font-mono text-[11px] uppercase tracking-widest text-red-600">{level}</span>
    <div>
      <h4 className="font-semibold">{risk}</h4>
      <p className="mt-2 text-sm leading-relaxed text-black/60">{control}</p>
    </div>
  </div>
);

const FlowStep = ({ n, title, body }: { n: string; title: string; body: string }) => (
  <div className="grid grid-cols-[44px_1fr] gap-4 border-b border-black/10 pb-5">
    <span className="font-mono text-sm font-bold text-purple-600">{n}</span>
    <div>
      <h4 className="font-semibold">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-black/62">{body}</p>
    </div>
  </div>
);

const maybeMortgageSections: SectionContent[] = [
  {
    id: 'mm-hero',
    fullWidthContent: (
      <div className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-black p-8 text-white md:p-24">
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-[0.09]">
          {Array.from({ length: 64 }).map((_, i) => <div key={i} className="border border-white/35" />)}
        </div>
        <div className="absolute right-10 top-16 h-72 w-72 rounded-full border border-white/20" />
        <div className="absolute right-28 top-40 h-28 w-28 rounded-full bg-white/10" />
        <p className="relative z-10 mb-10 font-mono text-xs uppercase tracking-[0.32em] text-white/55">Public-source enterprise case study</p>
        <h1 className="relative z-10 max-w-6xl font-serif text-[16vw] leading-[0.78] tracking-tight md:text-[9vw]">
          Mortgage intake without pretending to underwrite.
        </h1>
        <p className="relative z-10 mt-10 max-w-4xl font-serif text-2xl leading-snug text-white/74 md:text-3xl">
          An AI-assisted loan-readiness layer for mortgage teams: faster intake, cleaner files, better borrower communication, and a strict separation between workflow automation and credit judgment.
        </p>
        <div className="relative z-10 mt-20 grid grid-cols-2 gap-6 border-t border-white/15 pt-8 font-mono text-sm md:grid-cols-4">
          <div><p className="text-white/35">Source</p><p className="mt-2">Mortgage AI Case Study.pdf</p></div>
          <div><p className="text-white/35">Case Type</p><p className="mt-2">Enterprise case study</p></div>
          <div><p className="text-white/35">Boundary</p><p className="mt-2">Readiness, not approval</p></div>
          <div><p className="text-white/35">Design Bias</p><p className="mt-2">Extend before rewrite</p></div>
        </div>
      </div>
    )
  },
  {
    id: 'mm-positioning',
    bgColorLeft: 'bg-black',
    textColorLeft: 'text-white',
    bgColorRight: 'bg-transparent',
    textColorRight: 'text-black',
    leftTitle: 'Positioning',
    leftContent: (
      <div>
        <p className="mb-4 font-mono text-sm uppercase tracking-[0.24em] text-purple-300">01 / Operating Thesis</p>
        <h2 className="font-serif text-5xl leading-tight md:text-6xl">The right mortgage AI wedge lives before the credit decision.</h2>
      </div>
    ),
    rightContent: (
      <div className="space-y-7 py-12 text-lg leading-relaxed text-black/72">
        <p>
          The public mortgage stack already exposes the pattern: LOS APIs, borrower portals, GSE validation services, document analyzers, and compliance knowledge bases. The missing layer is not another destination app. It is a governed system that turns fragmented intake activity into a cleaner file, a clearer next step, and a more inspectable operating rhythm.
        </p>
        <p>
          That choice reflects a real tradeoff. Underwriting automation sounds bigger, but it pushes the product into the most regulated, least forgiving part of the workflow. Readiness automation captures value earlier: fewer manual follow-ups, tighter borrower communication, better processor leverage, and fewer avoidable conditions, while leaving approval, denial, pricing, and disclosure ownership where lenders and regulators expect it to stay.
        </p>
        <div className="border-l-4 border-purple-600 bg-white/70 p-6">
          <p className="font-serif text-xl italic">
            In mortgage, the first durable win is not autonomous approval. It is a faster path to a file a human can trust.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'mm-evidence',
    fullWidthContent: (
      <div className="w-full bg-[#f7f3ee] p-8 md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-purple-600">02 / Evidence Base</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">The source material points toward workflow orchestration, verified data, and compliance-aware communication.</h3>
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          <EvidenceCard
            signal="Encompass Developer Connect exposes mortgage workflow APIs."
            meaning="The system can be designed around adapters, events, document status, loan milestones, and controlled write-backs instead of replacing the LOS."
          />
          <EvidenceCard
            signal="Fannie Mae DU Validation Service and Freddie Mac AIM support data-driven verification."
            meaning="A serious design should distinguish verified third-party data from extracted, unverified document facts."
          />
          <EvidenceCard
            signal="ICE Mortgage Analyzers and Blend Autopilot show market movement toward document automation and follow-up."
            meaning="The problem is already legible: document classification, missing-item detection, exception routing, and borrower communication."
          />
          <EvidenceCard
            signal="TRID and Regulation B create hard timing and adverse-action constraints."
            meaning="The system needs deterministic compliance gates. An LLM should not decide when a Loan Estimate is triggered or explain adverse action."
          />
        </div>
      </div>
    )
  },
  {
    id: 'mm-before-after',
    fullWidthContent: (
      <div className="w-full bg-white p-8 md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-purple-600">03 / Current vs Target</p>
        <h3 className="mt-5 font-serif text-5xl">A small borrower upload can create a very expensive delay.</h3>
        <div className="mt-12">
          <BeforeAfter
            beforeLabel="Current pattern"
            afterLabel="Target pattern"
            before={
              <div className="text-sm leading-relaxed text-black/68">
                <h4 className="mb-4 text-xl font-semibold text-black">Document chase by memory and inbox.</h4>
                <p>A borrower uploads a paystub after business hours. The file waits. A processor later notices that year-to-date income, employer name, or pay period does not line up cleanly with the application. The follow-up email is written manually, the checklist is updated manually, and the loan officer is left explaining status from a partial view.</p>
                <p className="mt-4">Nothing here is exotic. It is just the daily tax of fragmented systems, timing pressure, and documents that arrive in imperfect condition.</p>
              </div>
            }
            after={
              <div className="text-sm leading-relaxed text-black/68">
                <h4 className="mb-4 text-xl font-semibold text-black">Readiness loop with human ownership.</h4>
                <p>The file event triggers document classification, extraction, confidence scoring, and checklist comparison. The borrower gets an exact next-step request. The processor gets an exception card, not a scavenger hunt. The loan officer gets a summary that explains what is ready, what is blocked, and what cannot be said.</p>
                <p className="mt-4">The system speeds up preparation. It does not approve, deny, price, waive, or issue regulated decisions.</p>
              </div>
            }
          />
        </div>
      </div>
    )
  },
  {
    id: 'mm-workflow',
    bgColorLeft: 'bg-transparent',
    textColorLeft: 'text-black',
    bgColorRight: 'bg-white',
    textColorRight: 'text-black',
    leftTitle: 'Workflow',
    leftContent: (
      <div>
        <p className="mb-4 font-mono text-sm uppercase tracking-[0.24em] text-purple-600">04 / Target State</p>
        <h2 className="font-serif text-5xl leading-tight">The copilot lives around the file because the file is where cost accumulates.</h2>
        <p className="mt-8 text-lg leading-relaxed text-black/60">It monitors timing, prepares evidence, and hands humans the moments that carry regulatory or credit consequence.</p>
      </div>
    ),
    rightContent: (
      <div className="space-y-5 py-12">
        <FlowStep n="01" title="Borrower enters an authenticated flow" body="The assistant can answer status and intake questions, but it routes identity, consent, and sensitive account access through existing controls." />
        <FlowStep n="02" title="TRID trigger monitor runs deterministically" body="The six application data points are tracked as explicit state, not inferred through loose conversation." />
        <FlowStep n="03" title="Document intelligence prepares the file" body="Uploads are scanned, classified, OCRed, extracted, and scored. Low-confidence fields become review tasks instead of quiet writes." />
        <FlowStep n="04" title="Readiness engine compares the file" body="Extracted facts are compared against checklist requirements, application facts, verification status, and known policy sources." />
        <FlowStep n="05" title="Humans approve regulated communication" body="The system drafts borrower messages and loan-officer summaries, but approval gates stay in place for anything that could become a regulated statement." />
      </div>
    )
  },
  {
    id: 'mm-architecture',
    fullWidthContent: (
      <div className="w-full bg-[#090909] p-8 text-white md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-purple-300">05 / Reference Architecture</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">A governed intelligence layer around the lender stack.</h3>
        <div className="mt-14 grid gap-4 font-mono text-sm">
          {[
            ['Borrower channels', 'web chat, portal, SMS, secure email, optional voice'],
            ['Conversation orchestrator', 'intent routing, identity state, consent state, TRID trigger monitor'],
            ['Document intelligence', 'malware scan, OCR, classification, extraction, validation, confidence'],
            ['Policy retrieval', 'approved SOPs, investor guides, AllRegs-style corpus, templates'],
            ['Mortgage facts graph', 'borrower, property, application, income, assets, docs, conditions'],
            ['Readiness engine', 'checklist comparison, discrepancy detection, task routing'],
            ['Human workbenches', 'borrower support, LO, processor, compliance, underwriting readiness'],
            ['Audit plane', 'prompts, retrievals, approvals, timing events, write-backs, rollback']
          ].map(([title, detail]) => (
            <div key={title} className="grid gap-3 border border-white/10 bg-white/[0.03] p-5 md:grid-cols-[240px_1fr]">
              <p className="text-purple-300">{title}</p>
              <p className="text-white/55">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'mm-model-strategy',
    bgColorLeft: 'bg-black',
    textColorLeft: 'text-white',
    bgColorRight: 'bg-[#111]',
    textColorRight: 'text-white',
    leftTitle: 'Model Strategy',
      leftContent: (
      <div>
        <h2 className="font-serif text-5xl leading-tight">Use intelligence where ambiguity is expensive. Use rules where the law is literal.</h2>
        <p className="mt-8 text-lg leading-relaxed text-white/62">Three design choices matter most here: verified data beats extracted paper when available, high-recall escalation beats elegant under-escalation, and drafted communication beats fully autonomous outreach when regulated language is involved.</p>
      </div>
    ),
    rightContent: (
      <div className="space-y-4 py-12 text-sm">
        {[
          ['TRID six-item trigger', 'Deterministic rules', 'Timing obligations cannot depend on model interpretation.'],
          ['Adverse-action routing', 'Rules plus high-recall classifier', 'The system should escalate too often before it escalates too late.'],
          ['Document classification', 'ML classifier', 'This is pattern recognition with measurable precision and recall.'],
          ['Field extraction', 'OCR / IDP pipeline', 'Structured facts need confidence scores and human review thresholds.'],
          ['Borrower messages', 'LLM plus templates', 'Tone and clarity matter, but regulated language remains approval-gated.'],
          ['Policy questions', 'RAG over approved corpus', 'Answers should cite source material or refuse.'],
          ['Underwriting', 'Not AI-controlled', 'AUS, underwriters, compliance, and existing workflows remain in charge.']
        ].map(([task, method, reason]) => (
          <div key={task} className="grid gap-3 border-b border-white/10 pb-4 md:grid-cols-[160px_160px_1fr]">
            <span className="font-mono text-purple-300">{task}</span>
            <span className="font-semibold">{method}</span>
            <span className="text-white/55">{reason}</span>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 'mm-risk',
    fullWidthContent: (
      <div className="w-full bg-[#f7f3ee] p-8 md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-purple-600">06 / Risk Register</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">The sharp edges define the product, not just the risk review.</h3>
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
          <RiskCard level="critical" risk="AI implies approval or denial" control="Hard refusal language, adverse-action detection, and escalation into regulated workflows." />
          <RiskCard level="critical" risk="TRID trigger is missed" control="Track the six data points as explicit state and alert before deadline risk." />
          <RiskCard level="high" risk="Extraction writes a bad fact" control="Confidence thresholds, field validation, human review, idempotent write-back, and rollback." />
          <RiskCard level="high" risk="Borrower document includes prompt injection" control="Treat uploaded text as evidence, never as system instruction." />
          <RiskCard level="medium" risk="Policy answer hallucinates" control="Require retrieval-backed answers; no source means no answer." />
          <RiskCard level="medium" risk="Borrower trust is damaged by automation" control="Use clear status language, human handoff, and no fake certainty about decisions." />
        </div>
      </div>
    )
  },
  {
    id: 'mm-evaluation',
    fullWidthContent: (
      <div className="w-full bg-white p-8 md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-purple-600">07 / Evaluation</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">The demo is not credible unless the failure tests are visible.</h3>
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            ['95%+', 'Doc classification', 'Labeled synthetic and anonymized examples across paystubs, W-2s, bank statements, IDs, and misc uploads.'],
            ['90%+', 'Field extraction', 'Field-level precision and recall, with low-confidence routing counted separately.'],
            ['100%', 'Safety blocks', 'Approval/denial, adverse-action, unsupported legal advice, and prompt-injection tests must fail closed.'],
            ['95%+', 'Retrieval hit rate', 'Policy answers measured against expected source documents, not vibes.'],
            ['< 2 sec', 'Simple status latency', 'Fast enough for borrower confidence without skipping guardrails.'],
            ['Audit complete', 'Replay coverage', 'Every draft, retrieval, approval, refusal, and write-back has a trace ID.']
          ].map(([value, label, note]) => (
            <div key={label} className="border border-black/10 bg-[#fbfaf7] p-7">
              <div className="font-mono text-4xl font-black text-purple-700">{value}</div>
              <p className="mt-3 font-mono text-xs uppercase tracking-widest">{label}</p>
              <p className="mt-4 text-sm leading-relaxed text-black/60">{note}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'mm-roi',
    fullWidthContent: (
      <div className="w-full bg-black p-8 text-white md:p-24">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-purple-300">08 / Modeled Value</p>
        <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-tight">The value case is strongest when the model stays out of credit judgment.</h3>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/60">
          The value model assumes a representative lender and keeps the benefit categories deliberately plain: less document chase, fewer duplicate touches, faster exception resolution, and clearer communication. The tradeoff is worthwhile. By staying out of approval, denial, and pricing, the upside is narrower than full decisioning, but the implementation path is far more credible, faster to approve, and much easier to govern.
        </p>
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          <Stat value="90m" label="Processor time saved per loan" note="Modeled reduction from document chase, duplicate review, and manually assembled borrower follow-up." />
          <Stat value="3-5d" label="Cycle-time improvement" note="Modeled improvement from earlier missing-document detection and clearer readiness packaging." />
          <Stat value="10-20%" label="Throughput improvement" note="Modeled capacity gain when processors spend more time resolving exceptions and less time hunting context." />
        </div>
      </div>
    )
  },
  {
    id: 'mm-demo',
    bgColorLeft: 'bg-[#f7f3ee]',
    textColorLeft: 'text-black',
    bgColorRight: 'bg-white',
    textColorRight: 'text-black',
    leftTitle: 'Demo Plan',
    leftContent: (
      <div>
        <h2 className="font-serif text-5xl leading-tight">A credible review should surface judgment, not just automation.</h2>
      </div>
    ),
    rightContent: (
      <div className="space-y-6 py-12 text-base leading-relaxed text-black/68">
        <p>The strongest walkthrough begins with a nearly complete application and a small but consequential mismatch: five of six TRID elements have been provided, a paystub arrives after hours, and the extracted income data does not align cleanly with the application. The system should catch the discrepancy, prepare the next safe request, and leave every credit implication to the human workflow.</p>
        <p>What matters is not that the assistant chats fluently. What matters is that it separates application receipt from underwriting readiness, shows the evidence behind the exception, and refuses to cross into approval or denial language. That is the difference between impressive copy and credible mortgage product judgment.</p>
        <div className="border border-black/10 bg-black p-6 text-white">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-purple-300">What this proves</p>
          <p className="mt-4 font-serif text-2xl leading-snug">The design creates operational leverage before it creates compliance exposure.</p>
        </div>
      </div>
    )
  },
  {
    id: 'mm-disclaimer',
    fullWidthContent: (
      <div className="flex w-full flex-col items-center bg-gray-100 p-8 text-center md:p-32">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.28em] text-purple-600">{STANDARD_SOURCE_NOTE_LABEL}</p>
        <p className="max-w-3xl font-serif text-xl italic leading-relaxed text-black/68">
          {STANDARD_SOURCE_NOTE_TEXT}
        </p>
      </div>
    )
  }
];

export default maybeMortgageSections;
