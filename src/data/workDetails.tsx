import React from 'react';

export interface WorkGalleryItem {
  src: string;
  alt: string;
  kicker?: string;
  title?: string;
  caption?: string;
}

export interface WorkDetailSection {
  id: string;
  eyebrow?: string;
  title: string;
  body: string | React.ReactNode;
  media?: {
    type: 'image' | 'video' | 'custom';
    src?: string;
    alt?: string;
    node?: React.ReactNode;
  };
}

export interface WorkDetail {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  client: string;
  tags: string[];
  heroImage: string;
  heroVideo?: string;
  heroBackdropImage?: string;
  heroOverlayImage?: string;
  intro: string;
  longIntro?: string;
  playgroundHref?: string;
  playgroundLabel?: string;
  heroIframeDisabled?: boolean;
  heroPlaygroundHref?: string;
  gallery: WorkGalleryItem[];
  sections: WorkDetailSection[];
  footerNote?: string;
}

const workDetails: WorkDetail[] = [
  {
    slug: 'global-intelligence-market',
    title: 'Global Intelligence Market',
    subtitle: 'Compute Endpoints, Not Subscriptions',
    year: '2026',
    client: 'Caleb Cooper',
    tags: ['AI Marketplace', 'API Design', 'Compute', 'Agentic'],
    heroImage: '/images/books/global_market_1777746384925.png',
    heroBackdropImage: '/assets/img/645b54372e6d6f19ddf847a7_thumbnail-big-1e8c72e34f.webp',
    intro:
      'The AI economy does not need another subscription dashboard. It needs a market. Global Intelligence Market is a compute-endpoint exchange where agents and developers bid, route, and settle AI inference in real time — no per-seat pricing, no walled gardens.',
    longIntro:
      'Every model run is a transaction. Every transaction has a fair market price. GIM exposes that price surface through a live order book, giving builders the same cost transparency that algo traders expect from a stock exchange. The result: multi-agent workflows that route to the cheapest capable endpoint automatically, without humans micromanaging model selection.',
    playgroundHref: '/work/global-intelligence-market/playground/index.html',
    playgroundLabel: 'Open GIM Playground',
    heroPlaygroundHref: '/work/global-intelligence-market/playground/index.html',
    gallery: [
      {
        src: '/images/books/global_market_1777746384925.png',
        alt: 'Global Intelligence Market — dashboard overview',
        kicker: '01',
        title: 'Live Order Book',
        caption: 'Real-time bid/ask spread across inference providers.',
      },
    ],
    sections: [
      {
        id: 'challenge',
        eyebrow: 'The Problem',
        title: 'Subscriptions are opacity at scale',
        body: 'Flat-rate AI pricing hides the real cost of each token, each model switch, each routing decision. When you run dozens of agents in parallel the hidden overhead compounds fast. GIM makes every compute unit a tradeable asset with a visible price.',
      },
      {
        id: 'system',
        eyebrow: 'Architecture',
        title: 'An exchange, not a wrapper',
        body: 'GIM is built around a CLOB (central limit order book) that matches agent demand with provider supply. Agents submit intents — model class, latency budget, max price-per-token — and the matching engine settles them in microseconds. No static routing tables, no manual fallbacks.',
      },
      {
        id: 'result',
        eyebrow: 'Outcome',
        title: 'Transparent compute, dynamic routing',
        body: 'Early benchmarks show 30–55% reduction in per-task inference spend when agents are allowed to route freely across the exchange rather than being locked to a single provider contract.',
      },
    ],
    footerNote: 'Global Intelligence Market — Compute Endpoints, Not Subscriptions — 2026',
  },

  {
    slug: 'brokie-v2',
    title: 'Brokie V2',
    subtitle: 'Graph-Backed Agent Memory Engine',
    year: '2026',
    client: 'Caleb Cooper',
    tags: ['Graph Memory', 'Multi-Agent', 'Conversational AI', 'Portfolio Intelligence'],
    heroImage: '/images/books/brokie_v2_1777746399761.png',
    heroVideo: '/videos/brokie-v2-bg.mp4',
    heroBackdropImage: '/assets/img/615d9670b144655ffd217ac6_thumbnail-big-4951f49aae.jpeg',
    intro:
      'Brokie V2 is a graph-backed asset memory and portfolio intelligence engine with conversational AI surfaces. Where V1 focused on compression, V2 adds persistent, queryable memory — so agents remember what they did and why.',
    longIntro:
      'Every trade, every research note, every conversation thread becomes a typed node in a property graph. Relationships between assets, decisions, and outcomes are first-class citizens. Brokie V2\'s conversational layer lets you ask "why did we hold X through the correction?" and get a reasoned, cited answer pulled from the graph — not a hallucination.',
    playgroundHref: '/work/brokie-v2/brokie-playground/index.html',
    playgroundLabel: 'Open Brokie V2 Playground',
    heroPlaygroundHref: '/work/brokie-v2/brokie-playground/index.html',
    gallery: [
      {
        src: '/images/books/brokie_v2_1777746399761.png',
        alt: 'Brokie V2 — graph memory visualization',
        kicker: '01',
        title: 'Graph Memory Layer',
        caption: 'Typed nodes and edges connecting assets, agents, and decisions.',
      },
    ],
    sections: [
      {
        id: 'memory',
        eyebrow: 'Core System',
        title: 'Memory as a typed property graph',
        body: 'V2 replaces the V1 flat index with a property graph where every entity — asset, position, agent task, research source — is a node. Edges carry semantic relationships: SUPPORTS, CONTRADICTS, TRIGGERED, FOLLOWS. Queries traverse relationships, not keyword indices.',
      },
      {
        id: 'conversation',
        eyebrow: 'Interface',
        title: 'Conversation on top of structure',
        body: 'The chat interface is not a general LLM wrapper. It is a structured query compiler that translates natural language into graph traversals, then formats results with citations pointing back to the originating node and timestamp. You cannot get an answer that is not grounded in the graph.',
      },
      {
        id: 'agents',
        eyebrow: 'Orchestration',
        title: 'Multiple agents, one memory surface',
        body: 'Research agents, execution agents, and monitoring agents all read and write to the same graph. Each agent stamps its writes with identity and confidence. When agents disagree, the conflict is a first-class graph event — not a silent overwrite.',
      },
    ],
    footerNote: 'Brokie V2 — Graph-Backed Agent Memory — 2026',
  },

  {
    slug: 'cortex',
    title: 'Cortex',
    subtitle: 'Pure-Math Agent Routing',
    year: '2026',
    client: 'Caleb Cooper',
    tags: ['Agent Routing', 'Linear Programming', 'Multi-Agent', 'Cost Optimization'],
    heroImage: '/images/books/cortex_1777746414041.png',
    heroVideo: '/videos/cortex-bg.mp4',
    heroBackdropImage: '/assets/img/cortex-header-hero.png',
    intro:
      'Cortex is an agent routing engine built entirely on linear programming and constraint satisfaction — no heuristics, no lookup tables, no gradient-trained classifiers. Given a task graph and a fleet of available agents, Cortex solves for the minimum-cost valid assignment in real time.',
    longIntro:
      'Most multi-agent orchestrators use ad-hoc priority queues or hand-tuned rules to decide which agent handles which subtask. Cortex treats routing as what it is: a constrained optimization problem. The objective function minimizes total latency-weighted cost. Constraints capture agent capability, concurrency limits, and budget ceilings. The solver runs on every task submission.',
    playgroundHref: '/cortex-playground/dist/index.html',
    playgroundLabel: 'Open Cortex Playground',
    gallery: [
      {
        src: '/images/books/cortex_1777746414041.png',
        alt: 'Cortex — routing matrix visualization',
        kicker: '01',
        title: 'Routing Matrix',
        caption: 'LP solution surface for a 12-agent, 40-task benchmark run.',
      },
    ],
    sections: [
      {
        id: 'problem',
        eyebrow: 'Motivation',
        title: 'Routing is an optimization problem',
        body: 'When you have 20 agent types and a heterogeneous task queue, the combinatorial space of valid assignments is huge. Random or greedy routing leaves significant performance on the table. Cortex formulates the assignment as a MILP and solves it to optimality for realistic fleet sizes in under 50ms.',
      },
      {
        id: 'solver',
        eyebrow: 'Technical Design',
        title: 'Constraint-based, not heuristic-based',
        body: 'Each agent is modeled with a capability vector and cost coefficient. Each task carries a requirement vector and urgency weight. The LP solver finds the assignment matrix that minimizes weighted cost subject to feasibility constraints. No training data required — the math is the model.',
      },
      {
        id: 'benchmarks',
        eyebrow: 'Results',
        title: '40% lower cost at equal quality',
        body: 'In head-to-head tests against a well-tuned priority-queue router, Cortex achieves equivalent task completion rates at 38–42% lower aggregate cost by exploiting price differentials across agent providers that the heuristic router ignores.',
      },
    ],
    footerNote: 'Cortex — Pure-Math Agent Routing — 2026',
  },

  {
    slug: 'life-tap-labs',
    title: 'Life Tap Labs',
    subtitle: 'Agentic Cost Observability',
    year: '2026',
    client: 'Caleb Cooper',
    tags: ['Observability', 'Cost Analytics', 'Agentic Workflows', 'Dashboards'],
    heroImage: '/images/books/life_tap_1777746431592.png',
    heroBackdropImage: '/assets/img/62220c9574d2ddf1fd74e6fe_thumbnail-big-a8bd4a4fc5.jpeg',
    intro:
      'Life Tap Labs is an agentic cost observability platform. It instruments multi-agent workflows at the token, model, and task level so teams can see exactly where spend is going and which agents are burning budget without proportionate output.',
    longIntro:
      'AI costs are opaque by default. Providers bill by token, but a single user-facing action may trigger dozens of agent-to-agent calls, each priced differently. Life Tap Labs adds an instrumentation layer that traces every LLM call back to the originating task, agent identity, and business outcome — turning a billing line item into an actionable signal.',
    playgroundHref: '/work/life-tap-labs/ltl-playground/dist/index.html',
    playgroundLabel: 'Open Life Tap Labs Playground',
    gallery: [
      {
        src: '/images/books/life_tap_1777746431592.png',
        alt: 'Life Tap Labs — cost waterfall dashboard',
        kicker: '01',
        title: 'Cost Waterfall',
        caption: 'Per-agent token spend broken down by task and model call.',
      },
    ],
    sections: [
      {
        id: 'instrumentation',
        eyebrow: 'Core Capability',
        title: 'Trace every token to its source',
        body: 'Life Tap wraps the LLM call layer with an async trace emitter. Each call gets a span ID, parent span (the originating agent task), model endpoint, input/output token counts, and latency. Spans are stitched into a DAG that mirrors the actual agent execution tree.',
      },
      {
        id: 'analytics',
        eyebrow: 'Analytics Layer',
        title: 'Cost attribution, not just cost reporting',
        body: 'Aggregate dashboards show spend by agent type, model family, time window, and business unit. Anomaly detection flags agents whose cost-to-outcome ratio deviates from their rolling baseline. The result is a system that tells you which agent is expensive AND whether it is worth it.',
      },
      {
        id: 'outcome',
        eyebrow: 'Business Impact',
        title: 'Budgets that actually hold',
        body: 'Teams using Life Tap report that they can set meaningful per-workflow cost budgets for the first time, because they have the data to calibrate them. Runaway agent chains are caught at the span level before they compound into large billing surprises.',
      },
    ],
    footerNote: 'Life Tap Labs — Agentic Cost Observability — 2026',
  },

  {
    slug: 'panopticon',
    title: 'The Panopticon',
    subtitle: 'Agentic Observability at the Edge',
    year: '2026',
    client: 'Caleb Cooper',
    tags: ['Edge Observability', 'Distributed Agents', 'Real-Time', 'Monitoring'],
    heroImage: '/images/books/panopticon_1777746444071.png',
    heroBackdropImage: '/assets/img/621f31389342fe66a9cc3b20_thumbnail-big-2388c6998e.jpeg',
    intro:
      'The Panopticon is an edge-first observability system for distributed agentic deployments. Where Life Tap Labs focuses on cost, Panopticon focuses on behavior — capturing every state transition, every tool call, every inter-agent message at the edge before it reaches a central collector.',
    longIntro:
      'Distributed agents fail in opaque ways. A routing agent in region A sends a malformed intent to a tool agent in region B, which silently drops it and returns an empty result. Nobody notices until a downstream agent hallucinates a completion. Panopticon captures the full message graph at the point of emission, not at central ingestion, so no event is ever lost to network failure or aggregation lag.',
    playgroundHref: '/work/panopticon/panopticon-playground/World Model.html',
    playgroundLabel: 'Open Panopticon Playground',
    gallery: [
      {
        src: '/images/books/panopticon_1777746444071.png',
        alt: 'The Panopticon — distributed agent topology view',
        kicker: '01',
        title: 'Agent Topology',
        caption: 'Live visualization of agent message flow across edge nodes.',
      },
    ],
    sections: [
      {
        id: 'edge-capture',
        eyebrow: 'Architecture',
        title: 'Capture at emission, not ingestion',
        body: 'Traditional observability pipelines collect at a central point. By the time a message arrives at the collector, context about the sending agent\'s state is gone. Panopticon runs a sidecar process on each edge node that captures the full envelope — sender state, intent, payload, and routing metadata — before the message leaves the node.',
      },
      {
        id: 'graph',
        eyebrow: 'Data Model',
        title: 'Message graph, not log stream',
        body: 'Events are stored as a directed message graph, not a flat time-series. You can replay any sub-graph from any point in time, isolate a specific agent\'s decision chain, or compare two runs of the same workflow side by side at the message level.',
      },
      {
        id: 'alerting',
        eyebrow: 'Observability',
        title: 'Behavioral anomaly detection',
        body: 'Panopticon learns the normal message topology for each workflow and alerts when the live graph diverges — a missing edge, an unexpected cycle, an agent that has gone silent. Alerts carry the message graph context, so on-call engineers see the problem, not just a threshold breach.',
      },
    ],
    footerNote: 'The Panopticon — Agentic Observability at the Edge — 2026',
  },

  {
    slug: 'bonnie',
    title: 'Bonnie',
    subtitle: 'Your AI Gaming Companion',
    year: '2026',
    client: 'Caleb Cooper',
    tags: ['Gaming AI', 'Companion Agent', 'GTAV Online', 'Real-Time NPC'],
    heroImage: '/images/books/bonnie_1777746458866.png',
    heroVideo: '/videos/bonnie-bg.mp4',
    heroBackdropImage: '/assets/img/621f2de58c0579490e2c5a94_thumbnail-big-a47c11a456.jpeg',
    intro:
      'Bonnie is an AI companion designed for GTAV Online — a persistent agent that remembers your crew, tracks your heist history, and gives tactical advice in real time based on what is actually happening in the session.',
    longIntro:
      'Most game AI is reactive and stateless. Bonnie is proactive and persistent. She remembers who your crew members are, which heists you have completed together, which roles each player prefers, and how prior missions went wrong. In session, she monitors the game state feed and surfaces advice — not generic tips, but context-aware calls based on your specific crew composition and the current threat environment.',
    playgroundHref: '/work/bonnie/bonnie-playground/dist/index.html',
    playgroundLabel: 'Open Bonnie Playground',
    gallery: [
      {
        src: '/images/books/bonnie_1777746458866.png',
        alt: 'Bonnie — companion interface in session',
        kicker: '01',
        title: 'In-Session Companion',
        caption: 'Bonnie\'s real-time advice panel during an active heist.',
      },
    ],
    sections: [
      {
        id: 'memory',
        eyebrow: 'Core System',
        title: 'Persistent crew memory',
        body: 'Bonnie maintains a structured memory of your crew across sessions: player roles, preferred loadouts, communication patterns, and outcome history. When you form a crew for a new heist, she pre-briefings you on each member\'s track record with that mission type.',
      },
      {
        id: 'realtime',
        eyebrow: 'Real-Time Layer',
        title: 'Game-state-aware advice',
        body: 'A lightweight game state monitor feeds session events — enemy positions, player health, objective progress, wanted level — to Bonnie\'s reasoning layer. Her advice is grounded in the actual game state, not a generic FAQ. She tells you to breach the east entrance because the three enemies on the north flank are within two seconds of your current angle, not because it is a fixed tip.',
      },
      {
        id: 'personality',
        eyebrow: 'Character',
        title: 'A voice, not a dashboard',
        body: 'Bonnie\'s output is conversational and characterful. She is direct, occasionally dry, and always useful. The interface is minimal — she speaks, you listen, you act. No UI cluttering your screen. A single voice and a clean transcript.',
      },
    ],
    footerNote: 'Bonnie — AI Gaming Companion — GTAV Online — 2026',
  },

  {
    slug: 'byc2w',
    title: 'BYC2W',
    subtitle: '3 Hours. 5 Laffy Taffys. One Vision.',
    year: '2025',
    client: 'Caleb Cooper',
    tags: ['Rapid Prototype', '3-Hour Build', 'Web App', 'Concept'],
    heroImage: '/images/books/byc2w_1777746475201.png',
    heroVideo: '/videos/byc2w-bg.mp4',
    heroBackdropImage: '/assets/img/byc2w-milky-overview.png',
    intro:
      'BYC2W is the proof that constraint produces clarity. Built in three hours on sugar and conviction, it is a single-feature web app distilled from a larger product idea to its absolute essential: one interaction, executed perfectly.',
    longIntro:
      'The best way to find out if an idea is real is to build the smallest version of it that you can honestly demo. BYC2W is that experiment — a three-hour sprint with a clear brief, a time box, and zero tolerance for scope creep. What came out the other side was sharp, deployable, and more honest about the product\'s core value than any wireframe or spec document.',
    playgroundHref: '/work/byc2w/playground/dist/index.html',
    playgroundLabel: 'Open BYC2W Playground',
    gallery: [
      {
        src: '/images/books/byc2w_1777746475201.png',
        alt: 'BYC2W — the core interaction',
        kicker: '01',
        title: 'The One Interaction',
        caption: 'The single feature that justified the whole sprint.',
      },
    ],
    sections: [
      {
        id: 'constraint',
        eyebrow: 'Process',
        title: 'The time box is the design tool',
        body: 'A three-hour constraint forces you to make the hard product call immediately: what is the one thing this needs to do? Every decision after that is in service of that one thing. No rabbit holes. No "while we\'re at it." The box is brutal and clarifying in equal measure.',
      },
      {
        id: 'output',
        eyebrow: 'Output',
        title: 'Ship it, ugly or not',
        body: 'BYC2W shipped at the three-hour mark with rough edges and zero styling regret. The interaction worked. The concept was legible. The feedback loop started immediately. Polished is a later-phase problem.',
      },
      {
        id: 'learning',
        eyebrow: 'What It Proved',
        title: 'Ideas that survive a sprint are real',
        body: 'A concept that cannot be made demonstrable in three hours is either too complex or not ready. BYC2W survived the sprint — which means the idea was real enough to carry forward to a proper build phase.',
      },
    ],
    footerNote: 'BYC2W — 3 Hours. 5 Laffy Taffys. One Vision. — 2025',
  },

  {
    slug: 'boonk',
    title: 'Boonk',
    subtitle: 'High-Fidelity Component Cloning',
    year: '2025',
    client: 'Caleb Cooper',
    tags: ['Component Library', 'Design Engineering', 'Fidelity', 'UI Systems'],
    heroImage: '/images/books/boonk_1777746488106.png',
    heroVideo: '/videos/boonk-bg.mp4',
    intro:
      'Boonk is a high-fidelity component cloning system that captures the precise visual and behavioral DNA of production UI components and reproduces them in a target tech stack — pixel-accurate, interaction-accurate, and accessible.',
    longIntro:
      'Design handoff is still broken. Figma specs approximate visual intent but lose interaction nuance. Engineers re-implement from spec and introduce subtle behavioral drift that compounds across a design system. Boonk bypasses the spec entirely: it instruments the running component, captures its visual state machine, interaction handlers, and accessibility tree, then generates target-stack code that passes the same behavioral test suite.',
    playgroundHref: '/work/boonk/boonk-v2-app/dist/index.html',
    playgroundLabel: 'Open Boonk Playground',
    gallery: [
      {
        src: '/images/books/boonk_1777746488106.png',
        alt: 'Boonk — component clone comparison view',
        kicker: '01',
        title: 'Clone Comparison',
        caption: 'Side-by-side fidelity check: original vs. generated component.',
      },
    ],
    sections: [
      {
        id: 'capture',
        eyebrow: 'Capture Layer',
        title: 'Instrument, don\'t screenshot',
        body: 'Boonk attaches to the running component via a browser extension, not a static export. It captures computed styles at every state transition, records interaction handlers from the event delegation tree, and extracts the accessibility role/label map. The output is a behavioral specification, not a visual mockup.',
      },
      {
        id: 'generation',
        eyebrow: 'Code Generation',
        title: 'Target-stack aware output',
        body: 'The generator takes the behavioral spec and produces idiomatic code for the target stack — React, Vue, Svelte, or web components. It does not produce a verbatim clone of the source implementation. It produces the semantically equivalent component in the target idiom, including proper ARIA attributes and keyboard interaction patterns.',
      },
      {
        id: 'fidelity',
        eyebrow: 'Validation',
        title: 'Test-driven fidelity',
        body: 'Each generated component ships with a behavioral test suite generated from the captured state machine. Pass rate is the fidelity metric. In practice, first-pass generated components score 91–97% on the behavioral suite, with the remaining delta in edge-case interaction states that require manual review.',
      },
    ],
    footerNote: 'Boonk — High-Fidelity Component Cloning — 2025',
  },

  {
    slug: 'brokie-v1',
    title: 'Brokie V1',
    subtitle: 'Premium Token Compression for Multi-Agent Workflows',
    year: '2026',
    client: 'Caleb Cooper',
    tags: ['Compression', 'Multi-Agent', 'AI Cost', 'Token Optimization'],
    heroImage: '/images/books/brokie_v1_1777746500531.png',
    heroVideo: '/videos/brokie-v1-bg.mp4',
    heroBackdropImage: '/assets/img/616ec1b825309eb624d89bc1_thumbnail-big-f78878601a.jpeg',
    intro:
      'Intelligence should not cost a fortune. Every round-trip between agents carries a price — raw context, repeated history, redundant embeddings compounding across dozens of parallel workers. Brokie V1 is a premium token compression pipeline built for multi-agent workflows.',
    longIntro:
      'Brokie V1 runs nine stages in sequence: structural analysis, network design, token budget enforcement, language compression, deduplication, memory indexing, network pruning, anomaly checking, and final Brokie Protocol serialization. What enters as a natural language payload exits as a constant-size binary pointer. Agents on the receiving end hydrate only what they need — nothing more.',
    playgroundHref: '/work/brokie-v1-app/out/index.html',
    playgroundLabel: 'Open Brokie V1 Playground',
    gallery: [
      {
        src: '/images/books/brokie_v1_1777746500531.png',
        alt: 'Brokie V1 — compression pipeline visualization',
        kicker: '01',
        title: 'Nine-Stage Pipeline',
        caption: 'Token count collapse from natural language input to Brokie Protocol output.',
      },
    ],
    sections: [
      {
        id: 'pipeline',
        eyebrow: 'System Design',
        title: 'Nine stages. One objective.',
        body: 'Each stage in the Brokie pipeline has a single responsibility: structural analysis identifies redundant subtrees, network design maps the dependency graph, budget enforcement sets hard token ceilings per hop, language compression strips syntactic noise, deduplication removes repeated content, memory indexing builds the hydration index, pruning cuts low-information edges, anomaly checking flags malformed payloads, and Brokie Protocol serialization packages the result.',
      },
      {
        id: 'protocol',
        eyebrow: 'The Protocol',
        title: 'Constant-size binary pointers',
        body: 'The output of the pipeline is not a shorter message. It is a binary pointer into a distributed hydration index. The receiving agent resolves the pointer against its local or shared index and reconstructs only the context it actually needs for its next task. Messages stop growing with conversation length.',
      },
      {
        id: 'playground',
        eyebrow: 'Try It',
        title: 'Watch your token count collapse',
        body: 'The interactive playground lets you feed any prompt through the full nine-stage pipeline and watch the token count shrink in real time. You can inspect each stage\'s output and see exactly which compression stage contributed the most reduction.',
      },
    ],
    footerNote: 'Brokie V1 — Premium Token Compression — 2026',
  },

  // Hidden project — kept in data but not surfaced in navigation
  {
    slug: 'project-winter-haven',
    title: 'Project Winter Haven',
    subtitle: 'World Model to Agentic UI',
    year: '2026',
    client: 'Caleb Cooper',
    tags: ['World Model', 'Agentic UI', 'Research', 'Foundation Model'],
    heroImage: '/images/books/winter_haven_1777746369741.png',
    heroBackdropImage: '/assets/img/647dc0753912d7cfbd50fe17_thumbnail-big-4ea1b44312.webp',
    intro:
      'Project Winter Haven is an ongoing research build exploring the gap between world model representations and the interfaces agents need to act on them. The question: if an agent has a rich internal model of the world, what does the ideal agentic UI look like?',
    longIntro:
      'Current agentic UIs are built for human operators observing agent behavior. Winter Haven inverts the problem: design an interface that the agent itself can use to ground its actions in the world model, request clarification, and signal uncertainty to humans in a structured way.',
    playgroundHref: undefined,
    playgroundLabel: undefined,
    gallery: [
      {
        src: '/images/books/winter_haven_1777746369741.png',
        alt: 'Project Winter Haven — world model interface sketch',
        kicker: '01',
        title: 'World Model Interface',
        caption: 'Early sketch of an agent-facing world model grounding surface.',
      },
    ],
    sections: [
      {
        id: 'question',
        eyebrow: 'Research Question',
        title: 'What does an agent need from its UI?',
        body: 'Humans need dashboards that surface information for comprehension. Agents need surfaces that provide grounding for action — structured representations of uncertainty, confidence, and environmental state that can be queried programmatically without natural language parsing overhead.',
      },
    ],
    footerNote: 'Project Winter Haven — World Model to Agentic UI — 2026',
  },

  {
    slug: 'ai-library',
    title: 'The AI Library',
    subtitle: 'Real Business Is Done On Paper. Okay? Write that down.',
    year: '2026',
    client: 'Caleb Cooper',
    tags: ['Agentic UI', 'Prompt Engineering', 'AI Development', 'Interactive'],
    heroImage: '/images/books/stuttgart_library.jpg',
    heroVideo: '/videos/library-bg.mp4',
    intro: 'This entire website was built with zero design experience using advanced prompt engineering and agentic reasoning loops. Design is no longer a manual skill—it\'s a logical output of high-fidelity intent.',
    longIntro: 'The secret to this library isn\'t just code—it\'s the translation of abstract feeling into technical constraints. By treating the AI as an expert architect, we bypassed years of design debt and built a premium, editorial experience from scratch.',
    playgroundHref: '/?tab=library',
    playgroundLabel: 'Explore the Interactive Shelf',
    gallery: [
      {
        src: '/images/books/stuttgart_library.jpg',
        alt: 'The AI Library — architectural vision',
        kicker: '01',
        title: 'Architectural Intelligence',
        caption: 'The Stuttgart-inspired minimalist design language used throughout the project.',
      },
    ],
    sections: [
      {
        id: 'the-vision',
        eyebrow: 'System Philosophy',
        title: 'Intent as the primary interface',
        body: 'I didn\'t start with a grid or a color palette. I started by describing the "feeling" of an ultra-premium, intellectual library. The AI didn\'t just write code; it reasoned about how typography and spacing contribute to that feeling.',
      },
      {
        id: 'the-dialogue',
        eyebrow: 'The Philosophy',
        title: 'Paper Over Pixels',
        body: (
          <div className="space-y-8 py-4">
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-40">The Question</span>
              <p className="font-serif text-lg italic leading-relaxed opacity-70">
                "Sir, as a company that primarily distributes paper, how have you adapted your business model to function in an increasingly paperless world?"
              </p>
            </div>
            <div className="space-y-2 pt-6 border-t border-black/5">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c5a059]">The Response</span>
              <p className="font-serif text-2xl font-bold leading-tight">
                "We can’t overestimate the value of computers. Yes, they are great for playing games and forwarding funny emails, but <span className="text-[#c5a059]">real business is done on paper.</span> Okay? Write that down."
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest opacity-30 mt-4">
                — Michael Scott, The Office
              </p>
            </div>
          </div>
        )
      },
      {
        id: 'the-agent',
        eyebrow: 'Engineering',
        title: 'The Reasoning Loop',
        body: 'The project was built using iterative agentic loops. We didn\'t just ask for a "bookshelf." We described the physics of how a book should rotate, the timing of the "Paper Curtain" transition, and the logic of the dynamic routing system.',
      },
      {
        id: 'the-outcome',
        eyebrow: 'Conclusion',
        title: 'The future of development',
        body: 'This site proves that the barrier between idea and execution has collapsed. High-fidelity output is now available to anyone who can master the art of the intent-description and the reasoning-loop.',
      },
    ],
    footerNote: 'The AI Library — Built with Intelligence — 2026',
  },
];

export const getWorkDetail = (slug: string): WorkDetail | undefined =>
  workDetails.find((d) => d.slug === slug);

export default workDetails;
