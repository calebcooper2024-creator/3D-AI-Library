# Graph Report - calebs-3d-case-study  (2026-05-07)

## Corpus Check
- 168 files · ~303,423 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1009 nodes · 1812 edges · 119 communities (97 shown, 22 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 45 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `675bdbcb`
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
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
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
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]

## God Nodes (most connected - your core abstractions)
1. `Draggable()` - 26 edges
2. `t()` - 20 edges
3. `n()` - 18 edges
4. `E()` - 18 edges
5. `ManagedHeroVideo()` - 18 edges
6. `cn()` - 17 edges
7. `Tween()` - 16 edges
8. `r()` - 16 edges
9. `i()` - 14 edges
10. `BeforeAfter()` - 14 edges

## Surprising Connections (you probably didn't know these)
- `Draggable()` --calls--> `he()`  [INFERRED]
  public/assets/js/Draggable.min-2c75b760fb.js → public/assets/js/jquery-3.5.1.min.dc5e7f18c8-e07f811afa.js
- `Draggable()` --calls--> `K()`  [INFERRED]
  public/assets/js/Draggable.min-2c75b760fb.js → public/assets/js/locomotive-scroll.min-cc8f42dcb9.js
- `handleBookSelect()` --calls--> `prepareProjectEntry()`  [INFERRED]
  src/App.tsx → src/lib/projectEntryGate.ts
- `clampOffset()` --calls--> `getMaxOffset()`  [EXTRACTED]
  src/components/project/ProjectDetailPage.tsx → performance-context-for-chatgpt/files/src/components/project/ProjectDetailPage.tsx
- `animateRail()` --calls--> `getMaxOffset()`  [EXTRACTED]
  src/components/project/ProjectDetailPage.tsx → performance-context-for-chatgpt/files/src/components/project/ProjectDetailPage.tsx

## Communities (119 total, 22 thin omitted)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (73): $(), $a(), aa(), ad(), Animation(), _assertThisInitialized(), ba(), bd() (+65 more)

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (31): Book(), Bookshelf(), CaseStudyDetail(), FactoryScene(), handleBookClick(), playPageTurnSound(), getScrollThreshold(), handleNavigate() (+23 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (33): A(), Ae(), b(), ce(), D(), Dt(), Ee(), ft() (+25 more)

### Community 4 - "Community 4"
Cohesion: 0.12
Nodes (29): getWorkDetail(), clearAllHeavyMotion(), createHeavyMotionSettler(), dispatchHeavyMotion(), isHeavyMotionActive(), setHeavyMotion(), curtainIn(), curtainOut() (+21 more)

### Community 5 - "Community 5"
Cohesion: 0.1
Nodes (27): BeforeAfter(), BubbleDiagram(), HandwrittenNote(), ProcessFlow(), ImagePlaceholder(), Choice(), Metric(), Risk() (+19 more)

### Community 6 - "Community 6"
Cohesion: 0.13
Nodes (31): A(), ba(), Ca(), da(), Draggable(), Ea(), Fa(), Ga() (+23 more)

### Community 7 - "Community 7"
Cohesion: 0.09
Nodes (34): aq(), bD(), cD(), dq(), eD(), eM(), fM(), h() (+26 more)

### Community 8 - "Community 8"
Cohesion: 0.12
Nodes (21): captureAndAnalyze(), drawDetections(), startCapture(), stopCapture(), cancelRecordingInternal(), handleVoiceInput(), monitorAudio(), playRawAudio() (+13 more)

### Community 9 - "Community 9"
Cohesion: 0.16
Nodes (23): applyDetailPage(), applyLinkList(), applySharedChrome(), applySidebarCard(), applyWorkIndexPage(), fitAllTitles(), fitTitleNode(), getProject() (+15 more)

### Community 10 - "Community 10"
Cohesion: 0.11
Nodes (28): a(), b(), bS(), $C(), d(), d1(), E(), f() (+20 more)

### Community 11 - "Community 11"
Cohesion: 0.17
Nodes (24): $(), a(), B(), c(), d(), e(), f(), G() (+16 more)

### Community 12 - "Community 12"
Cohesion: 0.1
Nodes (25): ke(), onReady(), df(), Ef(), EU(), ff(), fN(), gf() (+17 more)

### Community 13 - "Community 13"
Cohesion: 0.15
Nodes (18): delay(), getPhaseMessage(), isMobile(), prepareProjectEntry(), computeBufferedRatio(), computeProgress(), getVideoReadinessSnapshot(), markManagedVideoPlaying() (+10 more)

### Community 14 - "Community 14"
Cohesion: 0.15
Nodes (14): componentDidCatch(), constructor(), getDerivedStateFromError(), VisualEditor(), CustomCursor(), downloadAsFolder(), downloadZip(), handleClone() (+6 more)

### Community 16 - "Community 16"
Cohesion: 0.14
Nodes (16): AS(), AU(), Dy(), fS(), gU(), Ly(), Ms(), My() (+8 more)

### Community 17 - "Community 17"
Cohesion: 0.12
Nodes (16): dS(), Fy(), I1(), IU(), je(), LG(), mU(), OU() (+8 more)

### Community 18 - "Community 18"
Cohesion: 0.29
Nodes (9): handleHeavyMotion(), handleVisibilityChange(), ManagedHeroVideo(), safeId(), getActiveManagedVideoId(), pauseAllManagedVideos(), pauseManagedVideo(), registerManagedVideo() (+1 more)

### Community 21 - "Community 21"
Cohesion: 0.3
Nodes (10): AcceptanceMetric(), FooterCard(), GateRow(), Kicker(), Phase(), ReviewField(), StackRow(), StatBlock() (+2 more)

### Community 22 - "Community 22"
Cohesion: 0.18
Nodes (11): di(), dx(), fx(), gx(), lx(), Oa(), pI(), px() (+3 more)

### Community 23 - "Community 23"
Cohesion: 0.18
Nodes (11): bL(), eL(), hL(), iP(), jL(), ML(), oe(), oL() (+3 more)

### Community 24 - "Community 24"
Cohesion: 0.27
Nodes (11): cP(), DE(), FE(), GE(), ME(), Py(), u(), UP() (+3 more)

### Community 25 - "Community 25"
Cohesion: 0.39
Nodes (8): boot(), ensureCanvas(), initEffect(), loadGsapIfNeeded(), loadScript(), rewriteLegacyProjectLinks(), setCanvasSize(), shouldShowArrivalCover()

### Community 26 - "Community 26"
Cohesion: 0.31
Nodes (9): Af(), jo(), lf(), Of(), rF(), Sf(), Tf(), Tn() (+1 more)

### Community 27 - "Community 27"
Cohesion: 0.43
Nodes (6): addWidget(), handleKeyDown(), openAddModal(), removeWidget(), renderPlaceholder(), resetWidgets()

### Community 28 - "Community 28"
Cohesion: 0.43
Nodes (4): installBackAllFix(), installGlobalPageTransitionFix(), isPlainInternalNavigation(), navigateWithCurtain()

### Community 29 - "Community 29"
Cohesion: 0.29
Nodes (7): bF(), E1(), hf(), jF(), R1(), u1(), yf()

### Community 30 - "Community 30"
Cohesion: 0.48
Nodes (5): Byc2wMosaic(), Kicker(), MetricTile(), SignalCard(), SystemCard()

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
Nodes (4): FeatureCard(), Kicker(), MetricTile(), SignalCard()

### Community 37 - "Community 37"
Cohesion: 0.53
Nodes (4): Kicker(), MetricTile(), SignalCard(), SystemCard()

### Community 38 - "Community 38"
Cohesion: 0.53
Nodes (4): Kicker(), MetricTile(), SignalCard(), SystemCard()

### Community 39 - "Community 39"
Cohesion: 0.53
Nodes (4): Kicker(), MetricTile(), ProjectCard(), RoleCard()

### Community 40 - "Community 40"
Cohesion: 0.53
Nodes (4): Kicker(), MetricTile(), SignalCard(), SystemCard()

### Community 41 - "Community 41"
Cohesion: 0.53
Nodes (4): Kicker(), MetricTile(), SignalCard(), SystemCard()

### Community 42 - "Community 42"
Cohesion: 0.53
Nodes (4): Kicker(), MetricTile(), SignalCard(), SystemCard()

### Community 43 - "Community 43"
Cohesion: 0.6
Nodes (3): boot(), clearRevealFlag(), releaseCover()

### Community 45 - "Community 45"
Cohesion: 0.5
Nodes (4): Hx(), jG(), wG(), _x()

### Community 49 - "Community 49"
Cohesion: 0.67
Nodes (3): bq(), Kv(), Mq()

### Community 50 - "Community 50"
Cohesion: 0.67
Nodes (3): DP(), FP(), vP()

## Knowledge Gaps
- **22 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ManagedHeroVideo()` connect `Community 18` to `Community 32`, `Community 33`, `Community 34`, `Community 35`, `Community 4`, `Community 37`, `Community 36`, `Community 39`, `Community 40`, `Community 41`, `Community 5`, `Community 38`, `Community 42`, `Community 19`, `Community 21`, `Community 30`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **Why does `c()` connect `Community 11` to `Community 1`, `Community 10`, `Community 6`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `Ie()` connect `Community 3` to `Community 0`, `Community 6`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Draggable()` (e.g. with `be()` and `he()`) actually correct?**
  _`Draggable()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.02 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._