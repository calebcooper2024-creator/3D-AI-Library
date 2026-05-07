# Graph Report - calebs-3d-case-study  (2026-05-06)

## Corpus Check
- 162 files · ~297,575 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 968 nodes · 1712 edges · 114 communities (92 shown, 22 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 41 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5f8ff4bd`
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
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
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
- [[_COMMUNITY_Community 38|Community 38]]
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
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]

## God Nodes (most connected - your core abstractions)
1. `Draggable()` - 26 edges
2. `t()` - 20 edges
3. `n()` - 18 edges
4. `E()` - 18 edges
5. `cn()` - 17 edges
6. `Tween()` - 16 edges
7. `r()` - 16 edges
8. `i()` - 14 edges
9. `BeforeAfter()` - 14 edges
10. `BubbleDiagram()` - 14 edges

## Surprising Connections (you probably didn't know these)
- `Draggable()` --calls--> `he()`  [INFERRED]
  public/assets/js/Draggable.min-2c75b760fb.js → public/assets/js/jquery-3.5.1.min.dc5e7f18c8-e07f811afa.js
- `Draggable()` --calls--> `K()`  [INFERRED]
  public/assets/js/Draggable.min-2c75b760fb.js → public/assets/js/locomotive-scroll.min-cc8f42dcb9.js
- `tV()` --calls--> `Ka()`  [INFERRED]
  public/assets/js/webflow.07467efa9-52e4f0421f.js → public/assets/js/Draggable.min-2c75b760fb.js
- `Draggable()` --calls--> `pe()`  [INFERRED]
  public/assets/js/Draggable.min-2c75b760fb.js → public/assets/js/jquery-3.5.1.min.dc5e7f18c8-e07f811afa.js
- `Draggable()` --calls--> `ke()`  [INFERRED]
  public/assets/js/Draggable.min-2c75b760fb.js → public/assets/js/jquery-3.5.1.min.dc5e7f18c8-e07f811afa.js

## Communities (114 total, 22 thin omitted)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (73): $(), $a(), aa(), ad(), Animation(), _assertThisInitialized(), ba(), bd() (+65 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (22): Book(), Bookshelf(), CaseStudyDetail(), FactoryScene(), handleBookClick(), playPageTurnSound(), getScrollThreshold(), handleNavigate() (+14 more)

### Community 3 - "Community 3"
Cohesion: 0.08
Nodes (34): A(), Ae(), b(), ce(), D(), Dt(), Ee(), ft() (+26 more)

### Community 4 - "Community 4"
Cohesion: 0.08
Nodes (46): a(), aq(), b(), bD(), bS(), $C(), cD(), d1() (+38 more)

### Community 5 - "Community 5"
Cohesion: 0.1
Nodes (27): BeforeAfter(), BubbleDiagram(), HandwrittenNote(), ProcessFlow(), ImagePlaceholder(), Choice(), Metric(), Risk() (+19 more)

### Community 6 - "Community 6"
Cohesion: 0.13
Nodes (26): getWorkDetail(), clearAllHeavyMotion(), createHeavyMotionSettler(), dispatchHeavyMotion(), setHeavyMotion(), curtainIn(), curtainOut(), nextFrame() (+18 more)

### Community 7 - "Community 7"
Cohesion: 0.13
Nodes (32): A(), ba(), Ca(), da(), Draggable(), Ea(), Fa(), Ga() (+24 more)

### Community 8 - "Community 8"
Cohesion: 0.09
Nodes (32): onReady(), Af(), df(), Ef(), ff(), fN(), gf(), hf() (+24 more)

### Community 9 - "Community 9"
Cohesion: 0.12
Nodes (21): captureAndAnalyze(), drawDetections(), startCapture(), stopCapture(), cancelRecordingInternal(), handleVoiceInput(), monitorAudio(), playRawAudio() (+13 more)

### Community 10 - "Community 10"
Cohesion: 0.16
Nodes (23): applyDetailPage(), applyLinkList(), applySharedChrome(), applySidebarCard(), applyWorkIndexPage(), fitAllTitles(), fitTitleNode(), getProject() (+15 more)

### Community 11 - "Community 11"
Cohesion: 0.17
Nodes (23): $(), a(), B(), d(), e(), f(), G(), h() (+15 more)

### Community 12 - "Community 12"
Cohesion: 0.15
Nodes (14): componentDidCatch(), constructor(), getDerivedStateFromError(), VisualEditor(), CustomCursor(), downloadAsFolder(), downloadZip(), handleClone() (+6 more)

### Community 13 - "Community 13"
Cohesion: 0.12
Nodes (20): AS(), AU(), Dy(), EU(), fS(), gU(), Is(), Ly() (+12 more)

### Community 14 - "Community 14"
Cohesion: 0.12
Nodes (17): dS(), eM(), Fy(), I1(), IU(), je(), LG(), mU() (+9 more)

### Community 16 - "Community 16"
Cohesion: 0.21
Nodes (13): d(), f(), h(), Ih(), l(), LS(), LU(), p() (+5 more)

### Community 18 - "Community 18"
Cohesion: 0.28
Nodes (7): ManagedHeroVideo(), safeId(), getActiveManagedVideoId(), pauseAllManagedVideos(), pauseManagedVideo(), registerManagedVideo(), requestManagedVideoPlayback()

### Community 19 - "Community 19"
Cohesion: 0.17
Nodes (12): di(), dx(), fx(), gx(), lx(), Oa(), pI(), px() (+4 more)

### Community 21 - "Community 21"
Cohesion: 0.3
Nodes (10): AcceptanceMetric(), FooterCard(), GateRow(), Kicker(), Phase(), ReviewField(), StackRow(), StatBlock() (+2 more)

### Community 22 - "Community 22"
Cohesion: 0.27
Nodes (11): cP(), DE(), FE(), GE(), ME(), Py(), u(), UP() (+3 more)

### Community 23 - "Community 23"
Cohesion: 0.18
Nodes (11): bL(), eL(), hL(), iP(), jL(), ML(), oe(), oL() (+3 more)

### Community 24 - "Community 24"
Cohesion: 0.39
Nodes (8): boot(), ensureCanvas(), initEffect(), loadGsapIfNeeded(), loadScript(), rewriteLegacyProjectLinks(), setCanvasSize(), shouldShowArrivalCover()

### Community 25 - "Community 25"
Cohesion: 0.43
Nodes (6): addWidget(), handleKeyDown(), openAddModal(), removeWidget(), renderPlaceholder(), resetWidgets()

### Community 26 - "Community 26"
Cohesion: 0.43
Nodes (4): installBackAllFix(), installGlobalPageTransitionFix(), isPlainInternalNavigation(), navigateWithCurtain()

### Community 27 - "Community 27"
Cohesion: 0.48
Nodes (5): Byc2wMosaic(), Kicker(), MetricTile(), SignalCard(), SystemCard()

### Community 29 - "Community 29"
Cohesion: 0.53
Nodes (4): Kicker(), MetricTile(), ProjectCard(), RoleCard()

### Community 30 - "Community 30"
Cohesion: 0.53
Nodes (4): FeatureCard(), Kicker(), MetricTile(), SignalCard()

### Community 31 - "Community 31"
Cohesion: 0.53
Nodes (4): Kicker(), MetricTile(), SignalCard(), SystemCard()

### Community 32 - "Community 32"
Cohesion: 0.53
Nodes (4): Kicker(), MetricTile(), SignalCard(), SystemCard()

### Community 33 - "Community 33"
Cohesion: 0.53
Nodes (4): Kicker(), MetricTile(), SignalCard(), SystemCard()

### Community 34 - "Community 34"
Cohesion: 0.53
Nodes (4): Kicker(), MetricTile(), SignalCard(), SystemCard()

### Community 35 - "Community 35"
Cohesion: 0.53
Nodes (4): Kicker(), MetricTile(), SignalCard(), SystemCard()

### Community 36 - "Community 36"
Cohesion: 0.53
Nodes (4): Kicker(), MetricTile(), SignalCard(), SystemCard()

### Community 37 - "Community 37"
Cohesion: 0.53
Nodes (4): Kicker(), MetricTile(), SignalCard(), SystemCard()

### Community 38 - "Community 38"
Cohesion: 0.53
Nodes (4): Kicker(), MetricTile(), SignalCard(), SystemCard()

### Community 39 - "Community 39"
Cohesion: 0.53
Nodes (4): Kicker(), MetricTile(), SignalCard(), SystemCard()

### Community 40 - "Community 40"
Cohesion: 0.6
Nodes (3): boot(), clearRevealFlag(), releaseCover()

### Community 41 - "Community 41"
Cohesion: 0.4
Nodes (5): bF(), E1(), jF(), R1(), u1()

### Community 43 - "Community 43"
Cohesion: 0.5
Nodes (4): Hx(), jG(), wG(), _x()

### Community 47 - "Community 47"
Cohesion: 0.67
Nodes (3): DP(), FP(), vP()

### Community 48 - "Community 48"
Cohesion: 0.67
Nodes (3): bq(), Kv(), Mq()

## Knowledge Gaps
- **22 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `c()` connect `Community 7` to `Community 1`, `Community 11`, `Community 4`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Why does `Ie()` connect `Community 3` to `Community 0`, `Community 7`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `a()` connect `Community 4` to `Community 0`, `Community 16`, `Community 7`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Draggable()` (e.g. with `be()` and `he()`) actually correct?**
  _`Draggable()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.02 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._