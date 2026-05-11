# Graph Report - calebs-3d-case-study  (2026-05-09)

## Corpus Check
- 190 files · ~318,523 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1106 nodes · 1968 edges · 127 communities (104 shown, 23 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 58 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `19244db3`
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
- [[_COMMUNITY_Community 51|Community 51]]
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
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 68|Community 68]]

## God Nodes (most connected - your core abstractions)
1. `Draggable()` - 26 edges
2. `t()` - 20 edges
3. `ManagedHeroVideo()` - 19 edges
4. `n()` - 18 edges
5. `E()` - 18 edges
6. `Tween()` - 17 edges
7. `cn()` - 17 edges
8. `r()` - 16 edges
9. `i()` - 14 edges
10. `BeforeAfter()` - 14 edges

## Surprising Connections (you probably didn't know these)
- `stepByPage()` --calls--> `Tween()`  [INFERRED]
  src/components/Bookshelf.tsx → public/assets/js/gsap.min-85b2c7594d.js
- `Draggable()` --calls--> `he()`  [INFERRED]
  public/assets/js/Draggable.min-2c75b760fb.js → public/assets/js/jquery-3.5.1.min.dc5e7f18c8-e07f811afa.js
- `Draggable()` --calls--> `K()`  [INFERRED]
  public/assets/js/Draggable.min-2c75b760fb.js → public/assets/js/locomotive-scroll.min-cc8f42dcb9.js
- `markReady()` --calls--> `onReady()`  [INFERRED]
  src/components/Bookshelf.tsx → public/assets/js/nav-fix.js
- `clampOffset()` --calls--> `getMaxOffset()`  [EXTRACTED]
  src/components/project/ProjectDetailPage.tsx → performance-context-for-chatgpt/files/src/components/project/ProjectDetailPage.tsx

## Communities (127 total, 23 thin omitted)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (73): $(), $a(), aa(), ad(), Animation(), _assertThisInitialized(), ba(), bd() (+65 more)

### Community 2 - "Community 2"
Cohesion: 0.08
Nodes (39): Bookshelf(), getCachedBookData(), hasCustomBookData(), loadBookData(), delay(), getPhaseMessage(), isMobile(), prepareProjectEntry() (+31 more)

### Community 3 - "Community 3"
Cohesion: 0.08
Nodes (34): A(), Ae(), b(), ce(), D(), Dt(), Ee(), ft() (+26 more)

### Community 4 - "Community 4"
Cohesion: 0.1
Nodes (27): BeforeAfter(), BubbleDiagram(), HandwrittenNote(), ProcessFlow(), ImagePlaceholder(), Choice(), Metric(), Risk() (+19 more)

### Community 5 - "Community 5"
Cohesion: 0.13
Nodes (28): getWorkDetail(), clearAllHeavyMotion(), createHeavyMotionSettler(), dispatchHeavyMotion(), setHeavyMotion(), curtainIn(), curtainOut(), nextFrame() (+20 more)

### Community 6 - "Community 6"
Cohesion: 0.11
Nodes (25): createSummitStaffTask(), deterministicLatency(), findSummitProvidersForBodyPart(), getSummitProviderAvailability(), hashText(), logSummitPatientStatement(), lookupSummitPatient(), normalize() (+17 more)

### Community 7 - "Community 7"
Cohesion: 0.07
Nodes (20): buildParticipantName(), useSummitLiveKitRoom(), SummitCallControls(), getSummitScenario(), getEventTitle(), materializeSummitEvent(), SummitFailureControls(), createSummitLiveKitControlMessage() (+12 more)

### Community 8 - "Community 8"
Cohesion: 0.13
Nodes (31): A(), ba(), Ca(), da(), Draggable(), Ea(), Fa(), Ga() (+23 more)

### Community 9 - "Community 9"
Cohesion: 0.08
Nodes (10): Book(), CaseStudyDetail(), FactoryScene(), handleBookClick(), playPageTurnSound(), getScrollThreshold(), handleNavigate(), TopBar() (+2 more)

### Community 10 - "Community 10"
Cohesion: 0.12
Nodes (21): captureAndAnalyze(), drawDetections(), startCapture(), stopCapture(), cancelRecordingInternal(), handleVoiceInput(), monitorAudio(), playRawAudio() (+13 more)

### Community 11 - "Community 11"
Cohesion: 0.11
Nodes (29): a(), aq(), bD(), cD(), dq(), eD(), eM(), fM() (+21 more)

### Community 12 - "Community 12"
Cohesion: 0.16
Nodes (23): applyDetailPage(), applyLinkList(), applySharedChrome(), applySidebarCard(), applyWorkIndexPage(), fitAllTitles(), fitTitleNode(), getProject() (+15 more)

### Community 13 - "Community 13"
Cohesion: 0.09
Nodes (27): b(), bS(), $C(), d1(), dS(), E(), g(), I1() (+19 more)

### Community 14 - "Community 14"
Cohesion: 0.17
Nodes (24): $(), a(), B(), c(), d(), e(), f(), G() (+16 more)

### Community 15 - "Community 15"
Cohesion: 0.13
Nodes (17): animate(), applyTransform(), getMaxOffset(), handleSelectInstance(), handleTouchEnd(), handleTouchMove(), handleWheelEvent(), markReady() (+9 more)

### Community 16 - "Community 16"
Cohesion: 0.15
Nodes (14): componentDidCatch(), constructor(), getDerivedStateFromError(), VisualEditor(), CustomCursor(), downloadAsFolder(), downloadZip(), handleClone() (+6 more)

### Community 17 - "Community 17"
Cohesion: 0.13
Nodes (20): Af(), bF(), E1(), gf(), hf(), In(), jF(), jo() (+12 more)

### Community 18 - "Community 18"
Cohesion: 0.13
Nodes (20): df(), Ef(), EU(), ff(), fN(), hs(), If(), Is() (+12 more)

### Community 19 - "Community 19"
Cohesion: 0.13
Nodes (17): AS(), AU(), Dy(), Fy(), IU(), Ly(), Ms(), mU() (+9 more)

### Community 20 - "Community 20"
Cohesion: 0.15
Nodes (17): cP(), DE(), FE(), fS(), GE(), gU(), ME(), ns() (+9 more)

### Community 22 - "Community 22"
Cohesion: 0.25
Nodes (10): handleHeavyMotion(), handleVisibilityChange(), safeId(), isHeavyMotionActive(), getActiveManagedVideoId(), pauseAllManagedVideos(), pauseManagedVideo(), registerManagedVideo() (+2 more)

### Community 23 - "Community 23"
Cohesion: 0.21
Nodes (13): d(), f(), h(), Ih(), l(), LS(), LU(), p() (+5 more)

### Community 25 - "Community 25"
Cohesion: 0.17
Nodes (12): di(), dx(), fx(), gx(), lx(), Oa(), pI(), px() (+4 more)

### Community 27 - "Community 27"
Cohesion: 0.3
Nodes (10): AcceptanceMetric(), FooterCard(), GateRow(), Kicker(), Phase(), ReviewField(), StackRow(), StatBlock() (+2 more)

### Community 28 - "Community 28"
Cohesion: 0.18
Nodes (11): bL(), eL(), hL(), iP(), jL(), ML(), oe(), oL() (+3 more)

### Community 29 - "Community 29"
Cohesion: 0.39
Nodes (8): boot(), ensureCanvas(), initEffect(), loadGsapIfNeeded(), loadScript(), rewriteLegacyProjectLinks(), setCanvasSize(), shouldShowArrivalCover()

### Community 30 - "Community 30"
Cohesion: 0.43
Nodes (6): addWidget(), handleKeyDown(), openAddModal(), removeWidget(), renderPlaceholder(), resetWidgets()

### Community 31 - "Community 31"
Cohesion: 0.48
Nodes (5): Byc2wMosaic(), Kicker(), MetricTile(), SignalCard(), SystemCard()

### Community 33 - "Community 33"
Cohesion: 0.53
Nodes (4): FeatureCard(), Kicker(), MetricTile(), SignalCard()

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
Cohesion: 0.53
Nodes (4): Kicker(), MetricTile(), SignalCard(), SystemCard()

### Community 41 - "Community 41"
Cohesion: 0.53
Nodes (4): Kicker(), MetricTile(), SignalCard(), SystemCard()

### Community 42 - "Community 42"
Cohesion: 0.53
Nodes (4): Kicker(), MetricTile(), ProjectCard(), RoleCard()

### Community 43 - "Community 43"
Cohesion: 0.53
Nodes (4): Kicker(), MetricTile(), SignalCard(), SystemCard()

### Community 44 - "Community 44"
Cohesion: 0.6
Nodes (3): boot(), clearRevealFlag(), releaseCover()

### Community 46 - "Community 46"
Cohesion: 0.5
Nodes (4): Hx(), jG(), wG(), _x()

### Community 50 - "Community 50"
Cohesion: 0.67
Nodes (3): DP(), FP(), vP()

### Community 51 - "Community 51"
Cohesion: 0.67
Nodes (3): bq(), Kv(), Mq()

## Knowledge Gaps
- **23 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ManagedHeroVideo()` connect `Community 54` to `Community 33`, `Community 34`, `Community 35`, `Community 36`, `Community 5`, `Community 4`, `Community 39`, `Community 40`, `Community 41`, `Community 42`, `Community 43`, `Community 37`, `Community 38`, `Community 22`, `Community 24`, `Community 27`, `Community 31`?**
  _High betweenness centrality (0.208) - this node is a cross-community bridge._
- **Why does `createHeavyMotionSettler()` connect `Community 5` to `Community 15`?**
  _High betweenness centrality (0.204) - this node is a cross-community bridge._
- **Why does `onReady()` connect `Community 15` to `Community 18`?**
  _High betweenness centrality (0.171) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Draggable()` (e.g. with `be()` and `he()`) actually correct?**
  _`Draggable()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.02 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._