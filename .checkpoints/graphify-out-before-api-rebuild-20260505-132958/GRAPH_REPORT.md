# Graph Report - calebs-3d-case-study  (2026-05-05)

## Corpus Check
- 125 files · ~233,131 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 871 nodes · 1502 edges · 96 communities (79 shown, 17 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 60 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f1788506`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]

## God Nodes (most connected - your core abstractions)
1. `Draggable()` - 26 edges
2. `Codex Agent` - 25 edges
3. `t()` - 20 edges
4. `n()` - 18 edges
5. `E()` - 18 edges
6. `Tween()` - 16 edges
7. `r()` - 16 edges
8. `i()` - 14 edges
9. `o()` - 13 edges
10. `applyDetailPage()` - 12 edges

## Surprising Connections (you probably didn't know these)
- `TypeScript Config` --references--> `App Entry Point`  [INFERRED]
  tsconfig.json → src/App.tsx
- `Graphify Project (AGENTS.md)` --semantically_similar_to--> `Graphify Project (CLAUDE.md)`  [INFERRED] [semantically similar]
  AGENTS.md → CLAUDE.md
- `Graphify Project (AGENTS.md)` --semantically_similar_to--> `Graphify Project (GEMINI.md)`  [INFERRED] [semantically similar]
  AGENTS.md → GEMINI.md
- `Graphify Project (CLAUDE.md)` --semantically_similar_to--> `Graphify Project (GEMINI.md)`  [INFERRED] [semantically similar]
  CLAUDE.md → GEMINI.md
- `Graph Report` --references--> `Bookshelf Component`  [INFERRED]
  graphify-out/GRAPH_REPORT.md → src/components/Bookshelf.tsx

## Communities (96 total, 17 thin omitted)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (71): $(), $a(), aa(), ad(), Animation(), _assertThisInitialized(), ba(), bd() (+63 more)

### Community 2 - "Community 2"
Cohesion: 0.08
Nodes (36): ed(), A(), Ae(), b(), Bt(), ce(), D(), Dt() (+28 more)

### Community 3 - "Community 3"
Cohesion: 0.13
Nodes (32): A(), ba(), Ca(), da(), Draggable(), Ea(), Fa(), Ga() (+24 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (34): a(), aq(), bD(), $C(), cD(), dq(), eD(), fM() (+26 more)

### Community 5 - "Community 5"
Cohesion: 0.07
Nodes (4): BeforeAfter(), BubbleDiagram(), HandwrittenNote(), ProcessFlow()

### Community 6 - "Community 6"
Cohesion: 0.12
Nodes (21): captureAndAnalyze(), drawDetections(), startCapture(), stopCapture(), cancelRecordingInternal(), handleVoiceInput(), monitorAudio(), playRawAudio() (+13 more)

### Community 7 - "Community 7"
Cohesion: 0.07
Nodes (12): Book(), Bookshelf(), CaseStudyDetail(), FactoryScene(), handleBookClick(), playPageTurnSound(), cn(), getActiveViewFromLocation() (+4 more)

### Community 8 - "Community 8"
Cohesion: 0.16
Nodes (23): applyDetailPage(), applyLinkList(), applySharedChrome(), applySidebarCard(), applyWorkIndexPage(), fitAllTitles(), fitTitleNode(), getProject() (+15 more)

### Community 9 - "Community 9"
Cohesion: 0.11
Nodes (28): Antigravity Agent, Claude Code Agent, Codex Agent, Gemini Agent, Agent Handoff Log, Agents Config, App Entry Point, Book Component (+20 more)

### Community 10 - "Community 10"
Cohesion: 0.17
Nodes (23): $(), a(), B(), d(), e(), f(), G(), h() (+15 more)

### Community 11 - "Community 11"
Cohesion: 0.12
Nodes (25): b(), bS(), d(), d1(), E(), f(), Ih(), Jm() (+17 more)

### Community 12 - "Community 12"
Cohesion: 0.13
Nodes (13): curtainIn(), curtainOut(), nextFrame(), preparePaperCurtain(), runPaperCurtainSwap(), animateRail(), applyOffset(), clampOffset() (+5 more)

### Community 13 - "Community 13"
Cohesion: 0.15
Nodes (14): componentDidCatch(), constructor(), getDerivedStateFromError(), VisualEditor(), CustomCursor(), downloadAsFolder(), downloadZip(), handleClone() (+6 more)

### Community 14 - "Community 14"
Cohesion: 0.14
Nodes (22): docs/agent-handoff.md (AGENTS.md ref), Bookshelf.tsx (AGENTS.md ref), GRAPH_REPORT.md (AGENTS.md ref), graphify explain (AGENTS.md command), graphify path (AGENTS.md command), Graphify Project (AGENTS.md), graphify query (AGENTS.md command), graphify update . (AGENTS.md command) (+14 more)

### Community 15 - "Community 15"
Cohesion: 0.12
Nodes (21): onReady(), df(), Ef(), EU(), ff(), fN(), hs(), If() (+13 more)

### Community 16 - "Community 16"
Cohesion: 0.13
Nodes (20): Af(), bF(), E1(), gf(), hf(), In(), jF(), jo() (+12 more)

### Community 17 - "Community 17"
Cohesion: 0.12
Nodes (17): dS(), eM(), Fy(), I1(), IU(), je(), LG(), mU() (+9 more)

### Community 19 - "Community 19"
Cohesion: 0.14
Nodes (16): AS(), AU(), Dy(), fS(), gU(), Ly(), Ms(), My() (+8 more)

### Community 20 - "Community 20"
Cohesion: 0.17
Nodes (12): di(), dx(), fx(), gx(), lx(), Oa(), pI(), px() (+4 more)

### Community 22 - "Community 22"
Cohesion: 0.27
Nodes (11): cP(), DE(), FE(), GE(), ME(), Py(), u(), UP() (+3 more)

### Community 23 - "Community 23"
Cohesion: 0.18
Nodes (11): bL(), eL(), hL(), iP(), jL(), ML(), oe(), oL() (+3 more)

### Community 24 - "Community 24"
Cohesion: 0.29
Nodes (8): Above Canvas (WebGL), Caleb Cooper — AI Systems Engineer, Google Fonts — Caveat, GSAP 3.12.2, initEffect(), main.tsx (Entry Point), PaperCurtainEffect, React Root Mount Point

### Community 25 - "Community 25"
Cohesion: 0.39
Nodes (8): boot(), ensureCanvas(), initEffect(), loadGsapIfNeeded(), loadScript(), rewriteLegacyProjectLinks(), setCanvasSize(), shouldShowArrivalCover()

### Community 27 - "Community 27"
Cohesion: 0.43
Nodes (6): addWidget(), handleKeyDown(), openAddModal(), removeWidget(), renderPlaceholder(), resetWidgets()

### Community 28 - "Community 28"
Cohesion: 0.43
Nodes (4): installBackAllFix(), installGlobalPageTransitionFix(), isPlainInternalNavigation(), navigateWithCurtain()

### Community 30 - "Community 30"
Cohesion: 0.6
Nodes (3): boot(), clearRevealFlag(), releaseCover()

### Community 32 - "Community 32"
Cohesion: 0.5
Nodes (4): Hx(), jG(), wG(), _x()

### Community 36 - "Community 36"
Cohesion: 0.67
Nodes (3): DP(), FP(), vP()

### Community 37 - "Community 37"
Cohesion: 0.67
Nodes (3): bq(), Kv(), Mq()

## Knowledge Gaps
- **16 isolated node(s):** `Google Fonts — Caveat`, `Caleb Cooper — AI Systems Engineer`, `Navigation Component`, `Portfolio Data`, `Graphify Ignore Config` (+11 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `c()` connect `Community 3` to `Community 1`, `Community 10`, `Community 4`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `Ie()` connect `Community 2` to `Community 0`, `Community 3`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Why does `a()` connect `Community 4` to `Community 0`, `Community 3`, `Community 11`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Draggable()` (e.g. with `be()` and `he()`) actually correct?**
  _`Draggable()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Google Fonts — Caveat`, `Caleb Cooper — AI Systems Engineer`, `Navigation Component` to the rest of the system?**
  _16 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.02 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._