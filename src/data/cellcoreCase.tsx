import { ManagedHeroVideo } from '../components/ManagedHeroVideo';
import React from 'react';
import type { SectionContent } from './portfolio';

const Kicker = ({ n, label, tone = 'text-emerald-500/80' }: { n: string; label: string; tone?: string }) => (
  <p className={`mb-8 font-mono text-[10px] uppercase tracking-[0.32em] ${tone}`}>
    {n} — {label}
  </p>
);

const MetaBlock = ({ label, value, note }: { label: string; value: string; note?: string }) => (
  <div className="border-l-2 border-emerald-400/60 pl-5">
    <p className="font-mono text-[10px] uppercase tracking-widest text-emerald-200/70">{label}</p>
    <p className="mt-3 font-serif text-xl leading-snug text-white">{value}</p>
    {note && <p className="mt-3 text-sm leading-relaxed text-white/58">{note}</p>}
  </div>
);

const StakeholderCard = ({ title, body }: { title: string; body: string }) => (
  <div className="border border-white/12 bg-white/[0.04] p-5">
    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-300/78">{title}</p>
    <p className="text-sm leading-relaxed text-white/72">{body}</p>
  </div>
);

const RuleRow = ({ allowed, item, why }: { allowed: boolean; item: string; why: string }) => (
  <div className={`border px-4 py-4 ${allowed ? 'border-emerald-300/35 bg-emerald-50/75' : 'border-amber-500/28 bg-amber-50/80'}`}>
    <div className="flex items-start gap-3">
      <span className={`mt-0.5 font-mono text-[10px] font-black uppercase tracking-widest ${allowed ? 'text-emerald-700' : 'text-amber-700'}`}>
        {allowed ? 'Allowed' : 'Excluded'}
      </span>
      <div>
        <p className="text-sm font-medium leading-snug text-black/82">{item}</p>
        <p className="mt-2 text-sm leading-relaxed text-black/60">{why}</p>
      </div>
    </div>
  </div>
);

const PipelineStage = ({ stage, body }: { stage: string; body: string }) => (
  <div className="border-b border-emerald-900/10 pb-4">
    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-600">{stage}</p>
    <p className="mt-3 text-sm leading-relaxed text-black/68">{body}</p>
  </div>
);

const LayerCard = ({
  layer,
  method,
  purpose,
  tradeoff,
}: {
  layer: string;
  method: string;
  purpose: string;
  tradeoff: string;
}) => (
  <div className="border border-white/12 bg-black/12 p-6 backdrop-blur-sm">
    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-200/72">{layer}</p>
    <h4 className="font-serif text-2xl leading-tight text-white">{method}</h4>
    <p className="mt-4 text-sm leading-relaxed text-white/72">{purpose}</p>
    <p className="mt-4 border-t border-white/12 pt-4 text-sm leading-relaxed text-white/48">{tradeoff}</p>
  </div>
);

const FormulaCard = ({
  title,
  formula,
  body,
}: {
  title: string;
  formula: string;
  body: string;
}) => (
  <div className="border border-emerald-900/12 bg-white/88 p-5">
    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-600">{title}</p>
    <div className="mt-4 rounded-md border border-emerald-900/10 bg-emerald-50/90 px-4 py-3 font-mono text-[12px] leading-relaxed text-emerald-950">
      {formula}
    </div>
    <p className="mt-4 text-sm leading-relaxed text-black/64">{body}</p>
  </div>
);

const InsightCard = ({ title, body }: { title: string; body: string }) => (
  <div className="border border-emerald-900/10 bg-white/86 p-5">
    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-600">{title}</p>
    <p className="text-sm leading-relaxed text-black/68">{body}</p>
  </div>
);

const RolloutCard = ({ title, body, control }: { title: string; body: string; control: string }) => (
  <div className="border border-white/12 bg-white/[0.04] p-6">
    <h4 className="font-serif text-2xl leading-tight text-white">{title}</h4>
    <p className="mt-4 text-sm leading-relaxed text-white/70">{body}</p>
    <p className="mt-5 border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-200/72">
      {control}
    </p>
  </div>
);

const RiskRow = ({ risk, control }: { risk: string; control: string }) => (
  <div className="grid gap-4 border-b border-black/10 pb-4 md:grid-cols-[0.9fr_1.1fr]">
    <p className="font-medium text-black/80">{risk}</p>
    <p className="text-sm leading-relaxed text-black/60">{control}</p>
  </div>
);

const DemonstrationCard = ({ title, body }: { title: string; body: string }) => (
  <div className="border border-white/12 bg-black/12 p-6">
    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-200/72">{title}</p>
    <p className="text-sm leading-relaxed text-white/74">{body}</p>
  </div>
);

const SourceCard = ({ title, body }: { title: string; body: string }) => (
  <div className="border border-black/10 bg-white/80 p-5">
    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-600">{title}</p>
    <p className="text-sm leading-relaxed text-black/66">{body}</p>
  </div>
);

const cellcoreSections: SectionContent[] = [
  {
    id: 'cellcore-hero',
    fullWidthContent: (
      <div className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-[#0e3a31] p-8 text-white md:p-24">
        <ManagedHeroVideo
            src="/videos/cellcore-bg.mp4"
            idSeed="cellcore-hero-video"
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
            videoClassName="absolute inset-0 h-full w-full object-cover opacity-85 pointer-events-none"
          />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,25,22,0.26),rgba(8,28,24,0.58),rgba(6,20,17,0.88))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(196,255,218,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(230,255,171,0.1),transparent_28%)]" />

        <p className="relative z-10 mb-8 font-mono text-xs uppercase tracking-[0.34em] text-emerald-100/82">
          01 — Real case study / product analytics / data engineering / ML system design
        </p>

        <h1 className="relative z-10 max-w-5xl font-serif text-[13vw] leading-[0.84] tracking-tight md:text-[8.5vw]">
          Product Journeys Were Hiding In Order History.
        </h1>

        <p className="relative z-10 mt-10 max-w-4xl font-serif text-xl leading-snug text-white/86 md:text-2xl">
          My official title at CellCore was Business Analyst. The real work behind this project was product framing, data engineering, analytics, and AI-assisted ML implementation for a Markov-chain recommendation system that could estimate next-product movement, same-SKU reorder likelihood, protocol continuation, and next-best-product recommendations without exposing sensitive customer data to AI.
        </p>

        <div className="relative z-10 mt-16 grid gap-6 border-t border-white/20 pt-8 md:grid-cols-4">
          <MetaBlock label="Official Title" value="Business Analyst" note="That was the job title. The work itself extended into pipeline design, modeling, analytics, and technical handoff." />
          <MetaBlock label="Core System" value="Markov Chain Product Prediction And Recommendation System" note="One ML system with multiple layers, not a pile of unrelated experiments." />
          <MetaBlock label="AI Delivery Pattern" value="GPT-4 Accelerated, Privacy Preserved" note="No PII, no credentials, no raw records, and no database access were ever handed to the model." />
          <MetaBlock label="Public Claim Boundary" value="Offline Validated Prototype And Analytics Handoff" note="My contract ended before I could verify final production deployment, so I do not claim it." />
        </div>
      </div>
    ),
  },
  {
    id: 'cellcore-context',
    bgColorLeft: 'bg-[#f7f2e7]',
    textColorLeft: 'text-[#182619]',
    bgColorRight: 'bg-[#123d34]',
    textColorRight: 'text-white',
    leftContent: (
      <div>
        <Kicker n="02" label="Business Context" tone="text-emerald-600" />
        <h2 className="max-w-[11ch] font-serif text-5xl leading-tight md:text-6xl">
          This Was Protocol Commerce, Not Generic Ecommerce.
        </h2>
        <p className="mt-8 border-l-2 border-emerald-500 pl-5 font-serif text-lg leading-relaxed text-black/72">
          CellCore sold into a practitioner-and-consumer environment where products often belonged to bundles, pathways, and multi-step protocols. That changed the modeling problem. A customer who did not reorder the same SKU was not necessarily lost. They might have been moving correctly into the next step.
        </p>
        <p className="mt-6 text-base leading-relaxed text-black/64">
          That distinction matters for retention analysis, next-best-product logic, practitioner support, merchandising, email activation, and any serious attempt to understand product movement instead of merely counting transactions.
        </p>
      </div>
    ),
    rightContent: (
      <div className="space-y-5 py-8">
        <StakeholderCard title="Practitioner Teams" body="Needed to know which products or steps a patient was likely to need next, and where pathway adherence was failing." />
        <StakeholderCard title="Marketing And CRM" body="Needed to separate one-time buyers from continuation buyers so campaigns could reflect actual protocol behavior instead of blunt reorder logic." />
        <StakeholderCard title="Merchandising" body="Needed product affinity and pathway visibility to improve bundles, cross-sells, and protocol merchandising." />
        <StakeholderCard title="Leadership" body="Needed a business-readable explanation of product movement, churn, protocol progression, and where the customer journey was breaking." />
      </div>
    ),
  },
  {
    id: 'cellcore-problem',
    fullWidthContent: (
      <div className="flex w-full flex-col items-center border-y border-emerald-900/10 bg-[#e7f3ec] px-8 py-24 text-center md:px-20 md:py-32">
        <span className="mb-[-6rem] font-serif text-[11rem] leading-none text-emerald-700/12">"</span>
        <h2 className="relative z-10 max-w-5xl font-serif text-4xl leading-tight text-[#13362f] md:text-5xl">
          The hard part was not building a flashy recommender. The hard part was reconstructing real product journeys from messy order history well enough that the business could finally tell the difference between churn, replenishment, and protocol continuation.
        </h2>
        <p className="mt-10 max-w-3xl font-serif text-xl leading-relaxed text-black/62">
          That is why I did not start with a black-box deep model. I started with transparent state transitions, explicit basket logic, feature engineering, and model layers that commercial teams could understand and engineers could replay.
        </p>
      </div>
    ),
  },
  {
    id: 'cellcore-ai-delivery',
    bgColorLeft: 'bg-[#11251e]',
    textColorLeft: 'text-white',
    bgColorRight: 'bg-[#f6fbf8]',
    textColorRight: 'text-black',
    leftContent: (
      <div>
        <Kicker n="03" label="AI Delivery Model" tone="text-emerald-300/80" />
        <h2 className="max-w-[11ch] font-serif text-5xl leading-tight md:text-6xl">
          GPT-4 Helped Me Build It. GPT-4 Never Got The Data.
        </h2>
        <p className="mt-8 border-l-2 border-emerald-400 pl-5 font-serif text-lg leading-relaxed text-white/72">
          This work happened in mid-2025, before agentic coding stacks were truly usable. I used GPT-4 as a technical acceleration partner for SQL design, Python scaffolding, feature engineering, validation logic, debugging, and documentation. I did not use it as an autonomous operator and I did not connect it to the live database.
        </p>
        <p className="mt-6 text-base leading-relaxed text-white/60">
          The safe operating model was explicit: give the model schemas, table names, column names, sanitized row fragments, and business rules, then reconcile every output against the real data structure by hand.
        </p>
      </div>
    ),
    rightContent: (
      <div className="space-y-4 py-8">
        <RuleRow allowed={true} item="Table names, column names, normalized schema fragments, and synthetic examples" why="Enough structure to generate compatible SQL, feature logic, pseudocode, and validation queries without exposing customer identity." />
        <RuleRow allowed={true} item="Business rules, protocol mappings, edge cases, and modeling questions" why="That let the model act like a fast implementation and explanation partner while I still owned product logic and risk." />
        <RuleRow allowed={false} item="Raw customer records, direct database access, credentials, or PII" why="The model never became the processor of record. No names, emails, phone numbers, addresses, or sensitive wellness notes were needed for the work." />
      </div>
    ),
  },
  {
    id: 'cellcore-pipeline',
    bgColorLeft: 'bg-[#fff6d4]',
    textColorLeft: 'text-[#1c2319]',
    bgColorRight: 'bg-[#dff1ea]',
    textColorRight: 'text-black',
    leftContent: (
      <div>
        <Kicker n="04" label="Data Architecture And Pipeline" tone="text-emerald-700" />
        <h2 className="max-w-[11ch] font-serif text-5xl leading-tight md:text-6xl">
          Deterministic Transformations Before Any Model Ever Scored.
        </h2>
        <p className="mt-8 border-l-2 border-emerald-500 pl-5 font-serif text-lg leading-relaxed text-black/72">
          The system was designed as a local-first, batch-friendly pipeline. The essential job was not to give AI live system access. The essential job was to turn raw orders into normalized basket events, sequence-safe transitions, stable feature tables, and recommendation artifacts that could actually be audited.
        </p>
      </div>
    ),
    rightContent: (
      <div className="space-y-5 py-8">
        <PipelineStage stage="Source extraction" body="Pull paid and fulfilled orders, order lines, product metadata, account type, channel, subscription flags, and protocol mappings into raw staging tables." />
        <PipelineStage stage="Normalization" body="Resolve SKU aliases, kits, bundle semantics, cancellations, returns, duplicate events, and timestamp issues so the sequence logic stops inheriting junk from the source systems." />
        <PipelineStage stage="Basket builder" body="Group same-order line items into baskets so co-purchase behavior is modeled as a basket and not turned into fake intra-order sequence steps." />
        <PipelineStage stage="Sequence builder" body="Create first-order and higher-order transitions by customer, cohort, product, family, and protocol state." />
        <PipelineStage stage="Feature builder" body="Calculate recency, frequency, monetary value, days since last purchase, prior order count, pathway depth, practitioner flag, and bundle exposure." />
        <PipelineStage stage="Training, validation, and scoring" body="Estimate transition probabilities, reorder propensity, affinity rules, segments, ranking weights, then publish recommendation tables with reason codes and exclusions." />
      </div>
    ),
  },
  {
    id: 'cellcore-model-stack',
    fullWidthContent: (
      <div className="w-full bg-[#143c33] px-8 py-24 text-white md:px-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Kicker n="05" label="Model Stack And Methods" tone="text-emerald-200/78" />
          <h2 className="max-w-5xl font-serif text-4xl leading-tight md:text-5xl">
            One system. Six modeling layers. One commercial question: what is most likely to happen next, and what should the business do with that answer?
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <LayerCard
              layer="Layer 1"
              method="First-Order Markov Chain"
              purpose="Core next-product sequence model. Given the current state, estimate the most likely next product, family, basket, or protocol step."
              tradeoff="Transparent and strong as a baseline, but limited memory means it overweights the most recent state unless another layer extends it."
            />
            <LayerCard
              layer="Layer 2"
              method="Higher-Order Markov / N-Gram Paths"
              purpose="Conditions the next step on the last two or three states so protocol progression is not flattened into one-step transitions."
              tradeoff="Higher-order states get sparse quickly, so the implementation needs interpolation, backoff, and state simplification."
            />
            <LayerCard
              layer="Layer 3"
              method="Reorder Propensity Scoring"
              purpose="Binary same-SKU replenishment model. Separates true reorder behavior from pathway continuation so not every SKU change gets mislabeled as churn."
              tradeoff="Interpretable and operationally useful, but it can miss nonlinear effects and rare reorder edge cases if the data is thin."
            />
            <LayerCard
              layer="Layer 4"
              method="Association Rules And Basket Affinity"
              purpose="Uses support, confidence, and lift to identify which products naturally belong together inside the same order or customer journey."
              tradeoff="Great for co-purchase structure, but not personalized by default and easy to distort if popular items dominate the pair counts."
            />
            <LayerCard
              layer="Layer 5"
              method="Behavioral Segmentation"
              purpose="Cohorts customers into practitioner-led buyers, one-time detox buyers, replenishment buyers, bundle entrants, and pathway followers."
              tradeoff="Segments are useful only if they stay interpretable and stable across refreshes, so they need drift checks and human-readable definitions."
            />
            <LayerCard
              layer="Layer 6"
              method="Weighted Recommendation Ranking"
              purpose="Combines Markov probability, pathway continuation, reorder propensity, affinity lift, segment modifiers, and hard business rules into ranked outputs."
              tradeoff="Simple to govern and easy to explain, but weights still need temporal validation and controlled testing instead of stakeholder intuition alone."
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'cellcore-formulas',
    bgColorLeft: 'bg-[#0f1d30]',
    textColorLeft: 'text-white',
    bgColorRight: 'bg-[#edf6ef]',
    textColorRight: 'text-black',
    leftContent: (
      <div>
        <Kicker n="06" label="Formulas, Tradeoffs, And Failure Modes" tone="text-cyan-300/78" />
        <h2 className="max-w-[12ch] font-serif text-5xl leading-tight md:text-6xl">
          Simple, Explainable Models First.
        </h2>
        <p className="mt-8 border-l-2 border-cyan-400 pl-5 font-serif text-lg leading-relaxed text-white/72">
          The goal was not to win an academic benchmark. The goal was to produce something engineers could wire up, leaders could understand, and the business could actually trust. That is why I started with transparent probabilistic and statistical methods before entertaining heavier sequence models.
        </p>
        <p className="mt-6 text-base leading-relaxed text-white/58">
          A deep recommender might make sense later. It was not the right first production candidate for sparse protocol behavior, explainability requirements, and a business audience that needed to see why a recommendation existed.
        </p>
      </div>
    ),
    rightContent: (
      <div className="space-y-5 py-8">
        <FormulaCard
          title="First-order transition probability"
          formula="P(next = j | current = i) = (C_ij + α) / (Σ_k C_ik + αK)"
          body="This is the core Markov layer. Smoothing keeps rare but plausible next states from getting zeroed out just because the historical count is small."
        />
        <FormulaCard
          title="Higher-order pathway backoff"
          formula="P_final = λ2P2(j|s_t-2,s_t-1) + λ1P1(j|s_t-1) + λ0P_popular(j)"
          body="Higher-order paths capture protocol continuation, but sparse states require interpolation or backoff so the system stays usable when history is thin."
        />
        <FormulaCard
          title="Reorder propensity"
          formula="P(reorder = 1 | x) = 1 / (1 + exp(-(β0 + β1x1 + ... + βmxm)))"
          body="Used specifically for same-SKU replenishment. Timing, prior counts, pathway depth, customer type, and bundle context all matter."
        />
        <FormulaCard
          title="Weighted ranking"
          formula="score = w1P_markov + w2P_pathway + w3P_reorder + w4lift + w5segment + w6rules"
          body="The ranker stays intentionally lightweight. The value comes from combining understandable signals, not from hiding business logic behind an opaque scoring layer."
        />
      </div>
    ),
  },
  {
    id: 'cellcore-insights',
    bgColorLeft: 'bg-[#f7f0d1]',
    textColorLeft: 'text-[#1e2215]',
    bgColorRight: 'bg-[#eaf3ff]',
    textColorRight: 'text-black',
    leftContent: (
      <div>
        <Kicker n="07" label="Reconstructed Insights And Interpretation" tone="text-emerald-700" />
        <h2 className="max-w-[11ch] font-serif text-5xl leading-tight md:text-6xl">
          The Key Insight Was Not “Buy Again.” It Was “Move Correctly.”
        </h2>
        <p className="mt-8 border-l-2 border-emerald-500 pl-5 font-serif text-lg leading-relaxed text-black/70">
          Generic reorder probability looked weak for isolated purchases. The moment a buyer was attached to a practitioner, a protocol, a bundle, or a known pathway, the picture changed. That reframed the commercial interpretation from “they are not reordering” to “their behavior depends on where they are in the journey.”
        </p>
        <div className="mt-10 space-y-4 border border-emerald-900/10 bg-white/72 p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-600">Example transition view</p>
          <div className="grid grid-cols-[1.25fr_1fr_1fr] gap-3 text-sm text-black/66">
            <div className="font-medium text-black/78">Current state</div>
            <div className="font-medium text-black/78">Next candidate</div>
            <div className="font-medium text-black/78">Probability</div>
            <div>Step 1 / Energy + Drainage</div>
            <div>Step 2 / Gut + Immune</div>
            <div>0.31</div>
            <div>Binder category</div>
            <div>Drainage support</div>
            <div>0.27</div>
            <div>First direct single-SKU order</div>
            <div>No purchase in window</div>
            <div>0.62</div>
          </div>
        </div>
      </div>
    ),
    rightContent: (
      <div className="space-y-5 py-8">
        <InsightCard title="Pathway continuation" body="The model turned a missing same-SKU reorder into a meaningful pathway signal. That is a better product and retention interpretation than a raw repeat-purchase chart." />
        <InsightCard title="Cohort-specific activation" body="Practitioner-led buyers, direct one-time buyers, bundle entrants, and replenishment customers should not receive the same recommendation logic or the same campaign treatment." />
        <InsightCard title="Quantified affinity" body="Support, confidence, and lift replaced anecdotal adjacency with measurable product relationships that could inform bundles, merchandising, and education." />
        <InsightCard title="Operational output" body="The recommendation table was designed to feed BI, CRM, ecommerce modules, practitioner dashboards, or email audiences, not to die as a notebook artifact." />
      </div>
    ),
  },
  {
    id: 'cellcore-production',
    fullWidthContent: (
      <div className="w-full bg-[#112f46] px-8 py-24 text-white md:px-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Kicker n="08" label="Productionization Blueprint" tone="text-cyan-200/76" />
          <h2 className="max-w-5xl font-serif text-4xl leading-tight md:text-5xl">
            I do not claim final production deployment. I do claim a production-ready blueprint with replay, rollback, and validation discipline.
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <RolloutCard title="Data Extraction Job" body="Refresh normalized orders, order lines, product metadata, and account context on a schedule that the business can actually support." control="Versioned source snapshots" />
            <RolloutCard title="Model Build Job" body="Recompute transition counts, smoothed probabilities, affinity rules, segment labels, and score weights on each run." control="Run ID + artifact versioning" />
            <RolloutCard title="Validation Gate" body="Block publication if coverage drops, data quality fails, or the new artifact drifts materially from the prior known-good run." control="Fail closed to prior model" />
            <RolloutCard title="Scoring Job" body="Generate ranked customer-product recommendations with score components, reason codes, and exclusion flags so every output is auditable." control="Replay from source snapshots" />
            <RolloutCard title="Activation Tables" body="Expose the outputs to BI, CRM, ecommerce, and practitioner tools behind feature flags instead of letting recommendations jump directly into sensitive channels." control="Channel-level feature flagging" />
            <RolloutCard title="Monitoring And Rollback" body="Track hit rate, conversion, coverage, drift, availability of recommended products, and complaint signals. Keep the prior activation table ready for immediate rollback." control="Rollback to baseline recommender" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'cellcore-governance',
    bgColorLeft: 'bg-[#fbf6e7]',
    textColorLeft: 'text-[#1c2319]',
    bgColorRight: 'bg-[#dcefe9]',
    textColorRight: 'text-black',
    leftContent: (
      <div>
        <Kicker n="09" label="Governance, Privacy, And Risk" tone="text-emerald-700" />
        <h2 className="max-w-[11ch] font-serif text-5xl leading-tight md:text-6xl">
          AI Accelerated The Build. It Never Became The System Of Record.
        </h2>
        <p className="mt-8 border-l-2 border-emerald-500 pl-5 font-serif text-lg leading-relaxed text-black/70">
          This is one of the strongest things this project demonstrates. I used AI aggressively for speed, breadth, and implementation leverage without surrendering privacy, governance, or deployment ownership.
        </p>
      </div>
    ),
    rightContent: (
      <div className="space-y-5 py-8">
        <RiskRow risk="No PII to AI" control="Only table names, column names, business rules, synthetic rows, and sanitized fragments were used in the GPT-4 workflow." />
        <RiskRow risk="Hashed identifiers" control="Customer and order joins should use hashed or surrogate keys in the modeling tables so the ML layer never needs identity-bearing records." />
        <RiskRow risk="Least privilege access" control="The scoring pipeline only needs order, product, and metadata fields that directly support the model. It does not need names, emails, phone numbers, or health notes." />
        <RiskRow risk="Human review before sensitive activation" control="Recommendations should be reviewed before practitioner-facing or customer-facing activation, especially in a protocol-guided environment." />
        <RiskRow risk="Drift and sparse-state risk" control="Support thresholds, smoothing, backoff, product-map ownership, and scheduled monitoring keep the system from drifting quietly into garbage." />
        <RiskRow risk="Unverified deployment claims" control="The public framing stays explicit: offline validated model design and analytics handoff, with final production deployment status unknown after my contract ended." />
      </div>
    ),
  },
  {
    id: 'cellcore-demonstrates',
    fullWidthContent: (
      <div className="w-full bg-[#163f36] px-8 py-24 text-white md:px-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Kicker n="10" label="What This Demonstrates" tone="text-emerald-200/76" />
          <h2 className="max-w-5xl font-serif text-4xl leading-tight md:text-5xl">
            This is product management, data engineering, analytics, ML system design, and AI-assisted implementation working together on one real business problem.
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <DemonstrationCard title="Product Management" body="I translated a vague business problem into concrete outputs, activation paths, model boundaries, and claims language that the business could actually stand behind." />
            <DemonstrationCard title="Data Engineering" body="I designed normalization, basketization, sequence construction, feature tables, contracts, and repeatable artifacts instead of treating the work like a one-off notebook." />
            <DemonstrationCard title="Analytics" body="I turned raw order history into interpretable views of protocol continuation, cohort behavior, pathway drop-off, and product relationships." />
            <DemonstrationCard title="ML System Design" body="I chose transparent models that fit sparse sequential commerce, layered them correctly, specified validation, and defined the safe extension path toward heavier recommender systems later." />
            <DemonstrationCard title="Privacy-Constrained AI Delivery" body="I used GPT-4 to accelerate SQL, Python, feature engineering, debugging, and documentation without exposing PII, credentials, or direct database access." />
            <DemonstrationCard title="Enterprise Readiness" body="I designed the blueprint with replay, rollback, feature flags, reason codes, review gates, and clear public claim boundaries instead of pretending a prototype was a deployment." />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'cellcore-grounding',
    fullWidthContent: (
      <div className="relative w-full overflow-hidden bg-[#eef5ea] px-8 py-24 text-black md:px-20 md:py-28">
        <img
          src="/images/footer-stills/cellcore-footer.webp"
          alt=""
          loading="lazy"
          decoding="async"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-85 pointer-events-none"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(238,245,234,0.9),rgba(238,245,234,0.94))]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <Kicker n="11" label="Method Grounding And Claim Boundary" tone="text-emerald-700" />
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="max-w-4xl font-serif text-4xl leading-tight text-[#183228] md:text-5xl">
                The work is real. The public page is still disciplined about what I can and cannot claim.
              </h2>
              <p className="mt-8 font-serif text-xl leading-relaxed text-black/68">
                I can accurately say that I designed the model stack, data flow, SQL-style transformation plan, ranking logic, validation approach, and privacy-preserving AI workflow. I can accurately say that the project produced a serious offline model and analytics handoff. I do not claim final production deployment, medical decisioning, or access patterns that did not exist.
              </p>
              <p className="mt-6 font-serif text-lg leading-relaxed text-black/62">
                The methods themselves are grounded in established work: association-rule mining for product affinity, sequential recommendation research around Markov-chain behavior, classic logistic propensity scoring, K-means segmentation, GPT-4-era implementation acceleration, and NIST-style AI risk management controls.
              </p>
            </div>
            <div className="grid gap-4">
              <SourceCard title="Association rules" body="Agrawal, Imielinski, and Swami (SIGMOD 1993); Agrawal and Srikant (VLDB 1994)." />
              <SourceCard title="Sequential recommendation" body="Rendle, Freudenthaler, and Schmidt-Thieme on Factorizing Personalized Markov Chains (WWW 2010); He and McAuley on sparse sequential recommendation (ICDM 2016)." />
              <SourceCard title="Probabilistic scoring and segmentation" body="Cox (1958) for binary sequence regression foundations and MacQueen (1967) for K-means clustering." />
              <SourceCard title="AI implementation and governance" body="GPT-4 Technical Report, OpenAI data controls guidance, and the NIST AI RMF 1.0 governance model cited in the source document." />
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export default cellcoreSections;
