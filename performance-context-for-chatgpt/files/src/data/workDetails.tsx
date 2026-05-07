import React from 'react';
import type { NarrativeSection } from './caseStudyMeta';

export interface WorkGalleryItem {
  src: string;
  alt: string;
  kicker?: string;
  title?: string;
  caption?: string;
}

export type WorkDetailSection = NarrativeSection;

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
    heroVideo: '/videos/gim-4k.mp4',
    heroBackdropImage: '/assets/img/645b54372e6d6f19ddf847a7_thumbnail-big-1e8c72e34f.webp',
    intro:
      'Global Intelligence Market is WinterMarket: a local-first, contract-first engine for intelligence acquisition, evidence handling, calibration, routing, and execution inside Winter Haven. It serves L3 work orders from L2 supervisors by materializing probeable HTTP endpoints, recording route decisions, and keeping evidence packets auditable.',
    longIntro:
      'WinterMarket is not a model farm and not a final-answer engine. It is the operational registry and local endpoint engine for routeable intelligence work: deterministic tools, verifiers, retrievers, rerankers, and composite pipelines can all be discovered, materialized, probed, and routed through explicit execution slots. The Cortex bridge handles provider and route coordination, while WinterMarket records the resulting route decisions, probe results, and calibration signals with auditability. The system is designed to expose what is actually available locally, not to imply that every endpoint is live or healthy.',
    playgroundHref: '/CalebCooper/Library/global-intelligence-market/Playground',
    playgroundLabel: 'Open GIM Playground',
    heroPlaygroundHref: '/CalebCooper/Library/global-intelligence-market/Playground',
    gallery: [
      {
        src: '/images/books/global_market_1777746384925.png',
        alt: 'Global Intelligence Market - dashboard overview',
        kicker: '01',
        title: 'Endpoint Ontology',
        caption: 'Local discovery surface for routeable endpoints, execution slots, and audit records.',
      },
    ],
    sections: [
      {
        id: 'challenge',
        eyebrow: 'Problem',
        title: 'Intelligence work needs explicit route control',
        body: 'When L3 work orders arrive from L2 supervisors, the system needs a grounded way to decide what can run locally, what can be verified, what can be retried, and what must be rejected. WinterMarket exists to make that routing legible instead of burying it inside a generic model wrapper.',
      },
      {
        id: 'system',
        eyebrow: 'Architecture',
        title: 'Discovery, materialization, and execution slots',
        body: 'The local endpoint engine maintains an operational registry of routeable HTTP endpoints and their contracts. Discovery surfaces what exists, materialization exposes it as callable endpoints, and execution slots hold the actual route decision that sent a probe or work order to a specific deterministic tool, verifier, retriever, reranker, or composite pipeline.',
      },
      {
        id: 'result',
        eyebrow: 'Operational Result',
        title: 'Auditable routing instead of black-box inference',
        body: 'The value is not that everything is automated or universally available. The value is that each probe result, calibration signal, and route decision is recorded clearly enough for operators to inspect what was attempted, what succeeded, and what remains unavailable.',
      },
    ],
    footerNote: 'Global Intelligence Market - WinterMarket local endpoint engine and evidence registry - 2026',
  },

  {
    slug: 'brokie-v2',
    title: 'Brokie V2',
    subtitle: 'Local Graph Memory and Truth Settlement',
    year: '2026',
    client: 'Caleb Cooper',
    tags: ['Graph Memory', 'Truth Settlement', 'Watcher Runtime', 'Projection'],
    heroImage: '/images/books/brokie_v2_1777746399761.png',
    heroVideo: '/videos/brokie-v2-bg.mp4',
    heroBackdropImage: '/assets/img/615d9670b144655ffd217ac6_thumbnail-big-4951f49aae.jpeg',
    intro:
      'Brokie V2 is the local Brokie workspace as a graph substrate: it holds memory, truth settlement, watcher runtime signals, and projection surfaces for Winter Haven. Where V1 focused on compression and handoff discipline, V2 centers the graph itself â€” so claims, evidence, and retrace paths stay queryable in one place.',
    longIntro:
      'Brokie V2 is not a generic frontend and not a promise that every graph node is true. It is the working graph for local memory and settlement: proposition-backed claims, evidence packets, watcher observations, projection views, and retraceable paths live alongside one another with explicit provenance. The surface is designed to show how the workspace reasons about what is settled, what is still disputed, and what needs more evidence before it can be treated as durable truth.',
    playgroundHref: '/CalebCooper/Library/brokie-v2/Playground',
    playgroundLabel: 'Open Brokie V2 Playground',
    heroPlaygroundHref: '/CalebCooper/Library/brokie-v2/Playground',
    gallery: [
      {
        src: '/images/books/brokie_v2_1777746399761.png',
        alt: 'Brokie V2 â€” graph memory visualization',
        kicker: '01',
        title: 'Graph Substrate',
        caption: 'Typed nodes, propositions, evidence, and watcher projections living in one local workspace.',
      },
    ],
    sections: [
      {
        id: 'memory',
        eyebrow: 'Core System',
        title: 'Memory, settlement, and retrace in one graph',
        body: 'V2 uses a local graph substrate where memory is organized around propositions, evidence, watcher notes, and projection surfaces. The point is not to flatten the workspace into a single truth bucket. It is to keep the relationships explicit so operators can retrace how a claim moved from observation to dispute to settlement, or why it never did.',
      },
      {
        id: 'conversation',
        eyebrow: 'Interface',
        title: 'Projection surfaces over durable records',
        body: 'The conversational layer is a projection lens over the graph, not the graph itself. It can answer from rooted evidence, surface the current settlement state, and point back to the originating proposition or watcher event, but it should never be mistaken for universal truth coverage. If the evidence is incomplete, the interface should say so.',
      },
      {
        id: 'agents',
        eyebrow: 'Orchestration',
        title: 'Watcher runtime with explicit provenance',
        body: 'The local workspace includes watcher-driven flows for observation, projection, and settlement. Each write needs an identity, a source, and a provenance trail. When claims conflict, the conflict remains visible instead of being collapsed into a single asserted fact, which keeps the graph honest about uncertainty and review state.',
      },
    ],
    footerNote: 'Brokie V2 â€” Local graph memory, truth settlement, and watcher projection â€” 2026',
  },

  {
    slug: 'cortex',
    title: 'Cortex',
    subtitle: 'Dynamic Routing Runtime',
    year: '2026',
    client: 'Caleb Cooper',
    tags: ['Routing Runtime', 'Failover', 'Telemetry', 'Policy Simulation'],
    heroImage: '/images/books/cortex_1777746414041.png',
    heroVideo: '/videos/cortex-4k.mp4',
    heroBackdropImage: '/assets/img/cortex-header-hero.png',
    intro:
      'Cortex is the dynamic intelligence routing and runtime substrate in Winter Haven. It slots model and endpoint choices, maintains backup routes and failover chains, watches health and quota, and keeps latency, headroom, and execution policy visible to the operator instead of hidden inside a black box.',
    longIntro:
      'Cortex is not the cognitive boss and it does not choose L2 supervisors or own final user composition. Its job is narrower and more operational: evaluate route conditions, select among available endpoint slots, propagate traces, aggregate SSE telemetry, and expose the route explanation that shows why a request moved through a particular chain. It also feeds policy simulation so operators can compare routing behavior before changing production policy. Cortex integrates with WinterMarket for routeable execution and with Brokie for graph and truth-state visibility, keeping the runtime honest about what is available, what is degraded, and what is only a fallback.',
    playgroundHref: '/CalebCooper/Library/cortex/Playground',
    playgroundLabel: 'Open Cortex Playground',
    gallery: [
      {
        src: '/images/books/cortex_1777746414041.png',
        alt: 'Cortex â€” routing matrix visualization',
        kicker: '01',
        title: 'Routing Matrix',
        caption: 'Endpoint slots, failover paths, and live telemetry in one operational view.',
      },
    ],
    sections: [
      {
        id: 'problem',
        eyebrow: 'Motivation',
        title: 'Routing needs a runtime, not a slogan',
        body: 'When requests can land on different providers, models, or local endpoints, the real problem is not abstract optimization. It is knowing what is healthy, what is over quota, what should fail over, and what route explanation should be shown when the system makes a conservative choice.',
      },
      {
        id: 'solver',
        eyebrow: 'Technical Design',
        title: 'Endpoint slots, trace propagation, and policy checks',
        body: 'Cortex tracks live endpoint slots, routes work through backup chains when the primary path is unhealthy, and preserves trace propagation across the decision path. It surfaces telemetry ledger data, health and quota state, latency and headroom, and the policy rules that were applied before execution was handed off.',
      },
      {
        id: 'benchmarks',
        eyebrow: 'Results',
        title: 'Operational routing that can be inspected',
        body: 'The useful result is not a fantasy benchmark. It is that operators can see route explanations, review policy simulation output, understand why failover happened, and inspect the telemetry and graph signals that informed the runtime without pretending Cortex is the final reasoning authority.',
      },
    ],
    footerNote: 'Cortex â€” Dynamic Routing Runtime and Telemetry Substrate â€” 2026',
  },

  {
    slug: 'life-tap-labs',
    title: 'Agentic Dashboards',
    subtitle: 'Operator Surfaces for Agentic Systems',
    year: '2026',
    client: 'Caleb Cooper',
    tags: ['Control Plane', 'Telemetry', 'Governance', 'Execution Views'],
    heroVideo: '/videos/agentic-dashboards-4k.mp4',
    heroImage: '/images/books/life_tap_1777746431592.png',
    heroBackdropImage: '/assets/img/62220c9574d2ddf1fd74e6fe_thumbnail-big-a8bd4a4fc5.jpeg',
    intro:
      'Life Tap Labs is the storefront and operator surface for the Winter Haven control plane. It presents telemetry, governance queues, prompt artifacts, routing substrate state, and execution views in one place so operators can inspect the system without collapsing it into a generic BI dashboard.',
    longIntro:
      'The surface is built for control, not theater. It organizes the Winter Haven workflow around trace telemetry, approval gates, governance review, and prompt or artifact management while keeping the boundaries honest: some panels are live runtime signals, others are queued, projected, or historical views. The point is to make operator intent legible and keep execution pathways inspectable without claiming every displayed metric is audited truth.',
    playgroundHref: '/CalebCooper/Library/life-tap-labs/Playground',
    playgroundLabel: 'Open Life Tap Labs Playground',
    gallery: [
      {
        src: '/images/books/life_tap_1777746431592.png',
        alt: 'Life Tap Labs â€” operator surface overview',
        kicker: '01',
        title: 'Cost Waterfall',
        caption: 'Per-agent token spend broken down by task and model call.',
      },
    ],
    sections: [
      {
        id: 'operator-surface',
        eyebrow: 'Core Surface',
        title: 'A control plane, not a generic dashboard',
        body: 'Life Tap Labs organizes the Winter Haven storefront around operator tasks: view trace telemetry, review the governance queue, inspect prompt artifacts, and move between execution views without losing the thread of what is live versus what is projected. The layout is designed to support decisions, approvals, and handoffs instead of just reporting numbers.',
      },
      {
        id: 'governance',
        eyebrow: 'Governance Layer',
        title: 'Approvals, review, and artifact state',
        body: 'Governance lives beside execution, not behind a separate admin tool. Operators can inspect approval gates, compare prompt or artifact versions, and review routing decisions as they move through the control plane. That keeps the system accountable while still acknowledging that some records are pending, some are derived, and some are only operator-facing projections.',
      },
      {
        id: 'execution',
        eyebrow: 'Execution View',
        title: 'Make the handoff visible',
        body: 'The value of the storefront is that it exposes how work actually moves: trace telemetry feeds the operator surface, governance decisions constrain what can proceed, and execution views show the current state of the system without pretending every panel has the same truth status. It is a practical orchestration UX for Winter Haven, not a synthetic analytics layer.',
      },
    ],
    footerNote: 'Life Tap Labs â€” Winter Haven storefront and operator surface â€” 2026',
  },

  {
    slug: 'panopticon',
    title: 'The Panopticon',
    subtitle: 'Local-First Voice Observability',
    year: '2026',
    client: 'Caleb Cooper',
    tags: ['Local-First', 'Voice Companion', 'Read-Only Inspection', 'Workspace Grounding'],
    heroVideo: '/videos/panopticon-4k.mp4',
    heroImage: '/images/books/panopticon_1777746444071.png',
    heroBackdropImage: '/assets/img/621f31389342fe66a9cc3b20_thumbnail-big-2388c6998e.jpeg',
    intro:
      'The Panopticon is a local-first, voice-enabled desktop companion built for observability, grounding, and read-only inspection. It stays close to the workspace roots, surfaces source status and freshness, and helps operators see what is real without pretending to own the system it observes.',
    longIntro:
      'Panopticon is the observer first, analyst second, companion third layer of the local stack. Its job is to make local evidence legible: timelines, workspace roots, source status, and health signals that help explain what is current, what is stale, and what needs review. It does not claim write authority over Winter Haven or broader durable truth; by default it remains read-only relative to the rest of the ecosystem, focused on honest inspection rather than control.',
    playgroundHref: '/CalebCooper/Library/panopticon/Playground',
    playgroundLabel: 'Open Panopticon Playground',
    gallery: [
      {
        src: '/images/books/panopticon_1777746444071.png',
        alt: 'The Panopticon â€” distributed agent topology view',
        kicker: '01',
        title: 'Agent Topology',
        caption: 'Live visualization of agent message flow across edge nodes.',
      },
    ],
    sections: [
      {
        id: 'observatory',
        eyebrow: 'Observatory',
        title: 'See the workspace before you trust it',
        body: 'Panopticon organizes local evidence the way an observatory organizes a sky: by source, freshness, and visibility. It surfaces what is connected to which workspace root, when each source last changed, and where the current view is grounded in actual files versus derived projections.',
      },
      {
        id: 'timeline',
        eyebrow: 'Timeline',
        title: 'Track freshness and drift',
        body: 'The timeline is built to answer simple operational questions fast: what updated, what stalled, what is newly observed, and what may be stale. That makes the companion useful for inspection without turning it into a generalized control plane or pretending it can settle truth on its own.',
      },
      {
        id: 'read-only',
        eyebrow: 'Guardrails',
        title: 'Inspect by default, write nowhere by accident',
        body: 'Panopticon is intentionally read-only relative to Winter Haven. It can summarize health, surface local evidence, and annotate source status, but it does not claim broad write authority or durable truth ownership. The distinction keeps the companion honest and keeps its role separate from Life Tap Labs and the operator surface.',
      },
    ],
    footerNote: 'The Panopticon â€” local-first observability, grounding, and read-only inspection â€” 2026',
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
      'Bonnie is an AI companion designed for GTAV Online â€” a persistent agent that remembers your crew, tracks your heist history, and gives tactical advice in real time based on what is actually happening in the session.',
    longIntro:
      'Most game AI is reactive and stateless. Bonnie is proactive and persistent. She remembers who your crew members are, which heists you have completed together, which roles each player prefers, and how prior missions went wrong. In session, she monitors the game state feed and surfaces advice â€” not generic tips, but context-aware calls based on your specific crew composition and the current threat environment.',
    playgroundHref: '/CalebCooper/Library/bonnie/Playground',
    playgroundLabel: 'Open Bonnie Playground',
    gallery: [
      {
        src: '/images/books/bonnie_1777746458866.png',
        alt: 'Bonnie â€” companion interface in session',
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
        body: 'A lightweight game state monitor feeds session events â€” enemy positions, player health, objective progress, wanted level â€” to Bonnie\'s reasoning layer. Her advice is grounded in the actual game state, not a generic FAQ. She tells you to breach the east entrance because the three enemies on the north flank are within two seconds of your current angle, not because it is a fixed tip.',
      },
      {
        id: 'personality',
        eyebrow: 'Character',
        title: 'A voice, not a dashboard',
        body: 'Bonnie\'s output is conversational and characterful. She is direct, occasionally dry, and always useful. The interface is minimal â€” she speaks, you listen, you act. No UI cluttering your screen. A single voice and a clean transcript.',
      },
    ],
    footerNote: 'Bonnie â€” AI Gaming Companion â€” GTAV Online â€” 2026',
  },

  {
    slug: 'byc2w',
    title: 'BYC2W',
    subtitle: '3 Hours. 5 Laffy Taffys. One Vision.',
    year: '2025',
    client: 'Caleb Cooper',
    tags: ['Rapid Prototype', '3-Hour Build', 'Web App', 'Concept'],
    heroImage: '/images/books/byc2w_1777746475201.png',
    heroVideo: '/videos/byc2w-4k.mp4',
    heroBackdropImage: '/assets/img/byc2w-milky-overview.png',
    intro:
      'BYC2W is the proof that constraint produces clarity. Built in three hours on sugar and conviction, it is a single-feature web app distilled from a larger product idea to its absolute essential: one interaction, executed perfectly.',
    longIntro:
      'The best way to find out if an idea is real is to build the smallest version of it that you can honestly demo. BYC2W is that experiment â€” a three-hour sprint with a clear brief, a time box, and zero tolerance for scope creep. What came out the other side was sharp, deployable, and more honest about the product\'s core value than any wireframe or spec document.',
    playgroundHref: '/CalebCooper/Library/byc2w/Playground',
    playgroundLabel: 'Open BYC2W Playground',
    gallery: [
      {
        src: '/images/books/byc2w_1777746475201.png',
        alt: 'BYC2W â€” the core interaction',
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
        body: 'A concept that cannot be made demonstrable in three hours is either too complex or not ready. BYC2W survived the sprint â€” which means the idea was real enough to carry forward to a proper build phase.',
      },
    ],
    footerNote: 'BYC2W â€” 3 Hours. 5 Laffy Taffys. One Vision. â€” 2025',
  },

  {
    slug: 'boonk',
    title: 'Boonk',
    subtitle: 'High-Fidelity Website Cloning',
    year: '2025',
    client: 'Caleb Cooper',
    tags: ['Website Cloning', 'Playwright', 'Asset Localization', 'Preview Runtime'],
    heroImage: '/images/books/boonk_1777746488106.png',
    heroVideo: '/videos/boonk-bg.mp4',
    intro:
      'Boonk is a local-first website cloning pipeline that inspects live sites, captures their pages and assets, rewrites them for local preview, and exports a working copy that preserves layout, media, and navigation instead of settling for a flat screenshot.',
    longIntro:
      'The real Boonk workspace is a clone-and-preview system, not a generic design-system toy. It uses live inspection, Playwright-driven capture, asset interception, URL rewriting, multipage export logic, and preview hardening to pull a running site into a portable local copy. The hard problems are not just visual fidelity. They are things like avoiding network-idle hangs on animation-heavy pages, localizing CSS and media references, preserving same-origin navigation, handling Webflow quirks, and keeping preview output stable enough to inspect and iterate on.',
    playgroundHref: '/CalebCooper/Library/boonk/Playground',
    playgroundLabel: 'Open Boonk Cloner',
    gallery: [
      {
        src: '/images/books/boonk_1777746488106.png',
        alt: 'Boonk â€” local website clone preview',
        kicker: '01',
        title: 'Clone Preview',
        caption: 'A localized site preview with captured assets, rewritten links, and export-ready structure.',
      },
    ],
    sections: [
      {
        id: 'capture',
        eyebrow: 'Inspection Layer',
        title: 'Inspect the live site before cloning',
        body: 'Boonk starts with the real running site. The local workspace emphasizes bounded navigation, page discovery, technology detection, and clone-safe inspection so animation-heavy or Webflow-driven pages do not hang forever. Instead of trusting static exports, it works from the live DOM, network responses, and page structure the runtime is actually serving.',
      },
      {
        id: 'localization',
        eyebrow: 'Localization',
        title: 'Rewrite the web for portable local preview',
        body: 'The core job is localization. Boonk intercepts CSS, fonts, video references, JSON payloads, and downloaded assets, then rewrites internal links and URL-like references so the clone can run locally instead of reaching back to the origin site. Multipage navigation, CSS `url()` references, imported stylesheets, and media paths all need explicit handling for the preview to hold together.',
      },
      {
        id: 'preview',
        eyebrow: 'Preview Hardening',
        title: 'Keep the clone useful after export',
        body: 'Boonk is only successful if the exported preview is still navigable, inspectable, and honest about what was captured. The local handoff docs focus on preview parity, fallback-safe headers, asset completeness, local filename strategy, and regression protection for clone-specific edge cases like Webflow forms, responsive images, videos, and nested scrollers.',
      },
    ],
    footerNote: 'Boonk â€” high-fidelity website cloning and local preview hardening â€” 2025',
  },

  {
    slug: 'brokie-v1',
    title: 'Brokie V1',
    subtitle: 'Compression Protocol for Multi-Agent Handoffs',
    year: '2026',
    client: 'Caleb Cooper',
    tags: ['Compression', 'Protocol', 'Cost Discipline', 'Handoffs'],
    heroImage: '/images/books/brokie_v1_1777746500531.png',
    heroVideo: '/videos/brokie-v1-4k.mp4',
    heroBackdropImage: '/assets/img/616ec1b825309eb624d89bc1_thumbnail-big-f78878601a.jpeg',
    intro:
      'Intelligence should not burn budget on repetition. Every round-trip between agents carries context cost, history duplication, and avoidable payload weight. Brokie V1 is the local compression and handoff protocol that keeps multi-agent work disciplined by collapsing expensive context into a tighter exchange format.',
    longIntro:
      'Brokie V1 still belongs to the older compression framing, but only in a scoped sense: it is the cost-control layer for agent handoff. The pipeline analyzes structure, enforces token budgets, removes redundancy, indexes the remaining references, and serializes the result into a smaller transport form that downstream workers can hydrate selectively. It is not a claim that all context can or should be erased, only that the system should spend less to move the pieces that matter.',
    playgroundHref: '/CalebCooper/Library/brokie-v1/Playground',
    playgroundLabel: 'Open Brokie V1 Playground',
    gallery: [
      {
        src: '/images/books/brokie_v1_1777746500531.png',
        alt: 'Brokie V1 â€” compression pipeline visualization',
        kicker: '01',
        title: 'Compression Protocol',
        caption: 'A disciplined handoff path that reduces payload cost before the next agent hydrates it.',
      },
    ],
    sections: [
      {
        id: 'pipeline',
        eyebrow: 'System Design',
        title: 'Nine stages for less waste per handoff',
        body: 'Each stage has a narrow job in the compression path: structural analysis finds redundancy, network design maps dependency shape, budget enforcement sets hard ceilings, language compression trims noise, deduplication removes repeated content, memory indexing preserves the references worth hydrating, pruning cuts low-information edges, anomaly checking flags malformed payloads, and serialization packages the result for the next worker.',
      },
      {
        id: 'protocol',
        eyebrow: 'The Protocol',
        title: 'Smaller payloads, not pretendless memory',
        body: 'The point is to reduce transport cost and preserve the right references, not to pretend the system has no memory at all. Downstream agents resolve the compressed output against their local or shared hydration index and reconstruct only the context needed for the next task. That keeps the handoff sharp without inflating every message.',
      },
      {
        id: 'playground',
        eyebrow: 'Try It',
        title: 'Inspect the cost discipline',
        body: 'The interactive playground lets you run a prompt through the pipeline and inspect how each stage changes the payload shape, token count, and hydration surface. The useful result is not spectacle; it is seeing where the system is spending context and where it is saving it.',
      },
    ],
    footerNote: 'Brokie V1 â€” Compression and handoff infrastructure for multi-agent work â€” 2026',
  },

  // Hidden project â€” kept in data but not surfaced in navigation
  {
    slug: 'project-winter-haven',
    title: 'Winter Haven',
    subtitle: 'World Models for Agentic Systems and A2-UI',
    year: '2026',
    client: 'Caleb Cooper',
    tags: ['World Model', 'Agentic UI', 'Research', 'Foundation Model'],
    heroVideo: '/videos/winter-haven-4k.mp4',
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
        alt: 'Project Winter Haven â€” world model interface sketch',
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
        body: 'Humans need dashboards that surface information for comprehension. Agents need surfaces that provide grounding for action â€” structured representations of uncertainty, confidence, and environmental state that can be queried programmatically without natural language parsing overhead.',
      },
    ],
    footerNote: 'Project Winter Haven â€” World Model to Agentic UI â€” 2026',
  },

  {
    slug: 'ai-library',
    title: 'The AI Library',
    subtitle: 'Real Business Is Done On Paper. Okay? Write That Down.',
    year: '2026',
    client: 'Caleb Cooper',
    tags: ['Agentic UI', 'Prompt Engineering', 'AI Storytelling', 'Rapid Prototyping'],
    heroImage: '/images/books/stuttgart_library.jpg',
    heroVideo: '/videos/library-4k.mp4',
    intro: 'The AI Library is the public surface where I turned a screenshot-level idea into a working editorial site with books, transitions, and project narratives that people can actually open and judge.',
    longIntro: 'The shelf is the spectacle, but the real point is the build loop. High-fidelity intent, repeated implementation, and hard revision were enough to turn a visual reference into a working interface system.',
    playgroundHref: '/CalebCooper/Library',
    playgroundLabel: 'Explore the Interactive Shelf',
    gallery: [
      {
        src: '/images/books/stuttgart_library.jpg',
        alt: 'The AI Library - architectural vision',
        kicker: '01',
        title: 'Editorial Architecture',
        caption: 'The shelf treats interface like an authored object instead of a neutral dashboard.',
      },
    ],
    sections: [
      {
        id: 'the-origin',
        eyebrow: 'Origin',
        title: 'A Screenshot Became a Working Shelf',
        body: 'The project started with a reference image and a strong enough brief to keep the implementation honest. From there, the site was built through repeated prompt, inspect, revise loops until the shelf felt like a product instead of a novelty interaction.',
      },
      {
        id: 'the-dialogue',
        eyebrow: 'Paper Philosophy',
        title: 'Paper Over Pixels',
        body: (
          <div className="space-y-8 py-4">
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-40">The Question</span>
              <p className="font-serif text-lg italic leading-relaxed opacity-70">
                "Sir, as a company that primarily distributes paper, how have you adapted your business model to function in an increasingly paperless world?"
              </p>
            </div>
            <div className="space-y-2 border-t border-black/5 pt-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c5a059]">The Response</span>
              <p className="font-serif text-2xl font-bold leading-tight">
                "We can't overestimate the value of computers. Yes, they are great for playing games and forwarding funny emails, but <span className="text-[#c5a059]">real business is done on paper.</span> Okay? Write that down."
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest opacity-30">
                - Michael Scott, The Office
              </p>
            </div>
          </div>
        ),
      },
      {
        id: 'the-system',
        eyebrow: 'Implementation',
        title: 'The Shelf Is the Wrapper. The System Is the Point.',
        body: 'Under the surface, the site is a real React system with explicit book data, transitions, routing, page composition, and media handling. The point of the build is not that AI produced one pretty frame. The point is that AI helped direct a coherent interface system into existence.',
      },
      {
        id: 'the-proof',
        eyebrow: 'Proof',
        title: 'What This Site Shows',
        body: 'Across the shelf, the site also exposes examples of agentic tools, graph-backed reasoning, AI storytelling, rapid prototyping, and broader generative AI product work. The AI Library is the container, but the deeper claim is about how much serious implementation can now be accelerated by good direction.',
      },
    ],
    footerNote: 'The AI Library - editorial interface, prompt-built system, and living showcase - 2026',
  },
];

export const getWorkDetail = (slug: string): WorkDetail | undefined =>
  workDetails.find((d) => d.slug === slug);

export default workDetails;

