# Graph Report - calebs-3d-case-study  (2026-05-05)

## Corpus Check
- 159 files · ~4,318,349 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 885 nodes · 1899 edges · 120 communities (97 shown, 23 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 55 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f1788506`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_webflow.07467efa9-52e4f0421f.js|webflow.07467efa9-52e4f0421f.js]]
- [[_COMMUNITY_gsap.min-85b2c7594d.js|gsap.min-85b2c7594d.js]]
- [[_COMMUNITY_Draggable.min-2c75b760fb.js|Draggable.min-2c75b760fb.js]]
- [[_COMMUNITY_caleb-cooper-works.js|caleb-cooper-works.js]]
- [[_COMMUNITY_App.tsx|App.tsx]]
- [[_COMMUNITY_On()|On()]]
- [[_COMMUNITY_BeforeAfter()|BeforeAfter()]]
- [[_COMMUNITY_r()|r()]]
- [[_COMMUNITY_ProjectDetailPage.tsx|ProjectDetailPage.tsx]]
- [[_COMMUNITY_AS()|AS()]]
- [[_COMMUNITY_server.js|server.js]]
- [[_COMMUNITY_paper-curtain-bootstrap.js|paper-curtain-bootstrap.js]]
- [[_COMMUNITY_VisionPanel.tsx|VisionPanel.tsx]]
- [[_COMMUNITY_VoiceChat.tsx|VoiceChat.tsx]]
- [[_COMMUNITY_di()|di()]]
- [[_COMMUNITY_globe.js|globe.js]]
- [[_COMMUNITY_nav-fix.js|nav-fix.js]]
- [[_COMMUNITY_cn()|cn()]]
- [[_COMMUNITY_page.tsx|page.tsx]]
- [[_COMMUNITY_helloPatientCase.tsx|helloPatientCase.tsx]]
- [[_COMMUNITY_Ef()|Ef()]]
- [[_COMMUNITY_GlobalCommand.tsx|GlobalCommand.tsx]]
- [[_COMMUNITY_jF()|jF()]]
- [[_COMMUNITY_Book()|Book()]]
- [[_COMMUNITY_panels.js|panels.js]]
- [[_COMMUNITY_NetworkGraph()|NetworkGraph()]]
- [[_COMMUNITY_bq()|bq()]]
- [[_COMMUNITY_vP()|vP()]]
- [[_COMMUNITY_ProcessGraph.tsx|ProcessGraph.tsx]]
- [[_COMMUNITY_TacticalRadar.tsx|TacticalRadar.tsx]]
- [[_COMMUNITY_syncHistoryForView()|syncHistoryForView()]]
- [[_COMMUNITY_test()|test()]]
- [[_COMMUNITY_app.js|app.js]]
- [[_COMMUNITY_PromptRegistry.tsx|PromptRegistry.tsx]]
- [[_COMMUNITY_WorkflowMap.tsx|WorkflowMap.tsx]]
- [[_COMMUNITY_nR()|nR()]]
- [[_COMMUNITY_ph()|ph()]]
- [[_COMMUNITY_ax()|ax()]]
- [[_COMMUNITY_jG()|jG()]]
- [[_COMMUNITY_f0()|f0()]]
- [[_COMMUNITY_mM()|mM()]]
- [[_COMMUNITY_bR()|bR()]]
- [[_COMMUNITY_nL()|nL()]]
- [[_COMMUNITY_UR()|UR()]]
- [[_COMMUNITY_Kq()|Kq()]]
- [[_COMMUNITY_qU()|qU()]]
- [[_COMMUNITY_run_bridge()|run_bridge()]]
- [[_COMMUNITY_useIsMobile()|useIsMobile()]]
- [[_COMMUNITY_generateMockData()|generateMockData()]]
- [[_COMMUNITY_MarqueeContent()|MarqueeContent()]]
- [[_COMMUNITY_onKey()|onKey()]]
- [[_COMMUNITY_playBookOpeningSound()|playBookOpeningSound()]]
- [[_COMMUNITY_fix_portfolio.py|fix_portfolio.py]]
- [[_COMMUNITY_process_stamp.py|process_stamp.py]]
- [[_COMMUNITY_vite.config.ts|vite.config.ts]]
- [[_COMMUNITY_store.ts|store.ts]]

## God Nodes (most connected - your core abstractions)
1. `Draggable()` - 40 edges
2. `t()` - 31 edges
3. `E()` - 31 edges
4. `o()` - 28 edges
5. `r()` - 26 edges
6. `N()` - 24 edges
7. `i()` - 22 edges
8. `q()` - 21 edges
9. `u()` - 20 edges
10. `$a()` - 20 edges

## Surprising Connections (you probably didn't know these)
- `Draggable()` --calls--> `he()`  [INFERRED]
  public/assets/js/Draggable.min-2c75b760fb.js → public/assets/js/jquery-3.5.1.min.dc5e7f18c8-e07f811afa.js
- `Draggable()` --calls--> `K()`  [INFERRED]
  public/assets/js/Draggable.min-2c75b760fb.js → public/assets/js/locomotive-scroll.min-cc8f42dcb9.js
- `p()` --calls--> `cn()`  [EXTRACTED]
  public/assets/js/gsap.min-85b2c7594d.js → src/lib/utils.ts
- `r()` --calls--> `cn()`  [EXTRACTED]
  public/assets/js/gsap.min-85b2c7594d.js → src/lib/utils.ts
- `onReady()` --calls--> `fN()`  [INFERRED]
  public/assets/js/nav-fix.js → public/assets/js/webflow.07467efa9-52e4f0421f.js

## Communities (120 total, 23 thin omitted)

### Community 0 - "webflow.07467efa9-52e4f0421f.js"
Cohesion: 0.05
Nodes (100): A(), ba(), Ca(), da(), Draggable(), Ea(), Fa(), Ga() (+92 more)

### Community 2 - "gsap.min-85b2c7594d.js"
Cohesion: 0.08
Nodes (39): A(), Ae(), b(), ce(), D(), Dt(), Ee(), ft() (+31 more)

### Community 3 - "Draggable.min-2c75b760fb.js"
Cohesion: 0.09
Nodes (51): $a(), $c(), fb(), hd(), M(), N(), mt(), a() (+43 more)

### Community 4 - "caleb-cooper-works.js"
Cohesion: 0.09
Nodes (26): constructor(), applyDetailPage(), applyLinkList(), applySharedChrome(), applySidebarCard(), applyWorkIndexPage(), fitAllTitles(), fitTitleNode() (+18 more)

### Community 5 - "App.tsx"
Cohesion: 0.09
Nodes (9): BeforeAfter(), BubbleDiagram(), HandwrittenNote(), ProcessFlow(), Choice(), Metric(), Risk(), Signal() (+1 more)

### Community 6 - "On()"
Cohesion: 0.15
Nodes (19): captureAndAnalyze(), drawDetections(), startCapture(), stopCapture(), cancelRecordingInternal(), handleVoiceInput(), monitorAudio(), playRawAudio() (+11 more)

### Community 7 - "BeforeAfter()"
Cohesion: 0.17
Nodes (23): $(), a(), B(), d(), e(), f(), G(), h() (+15 more)

### Community 8 - "r()"
Cohesion: 0.13
Nodes (13): curtainIn(), curtainOut(), nextFrame(), preparePaperCurtain(), runPaperCurtainSwap(), animateRail(), applyOffset(), clampOffset() (+5 more)

### Community 9 - "ProjectDetailPage.tsx"
Cohesion: 0.14
Nodes (20): Af(), fN(), gf(), hs(), If(), In(), jo(), lf() (+12 more)

### Community 10 - "AS()"
Cohesion: 0.16
Nodes (20): ma(), t(), bF(), bS(), d1(), E1(), fM(), jF() (+12 more)

### Community 11 - "server.js"
Cohesion: 0.16
Nodes (19): cb(), Cn(), r(), dS(), gx(), hf(), I1(), je() (+11 more)

### Community 12 - "paper-curtain-bootstrap.js"
Cohesion: 0.18
Nodes (19): u(), cP(), DE(), EU(), FE(), fS(), Fy(), GE() (+11 more)

### Community 13 - "VisionPanel.tsx"
Cohesion: 0.24
Nodes (14): startServer(), applyColorSwaps(), discoverPages(), downloadAsset(), extractCssUrls(), getAssetFilename(), getBrowser(), getColorVariants() (+6 more)

### Community 14 - "VoiceChat.tsx"
Cohesion: 0.23
Nodes (11): VisualEditor(), CustomCursor(), downloadAsFolder(), downloadZip(), handleClone(), handleDownloadAsset(), handleRewrite(), handleScrape() (+3 more)

### Community 15 - "di()"
Cohesion: 0.26
Nodes (11): boot(), ensureCanvas(), initEffect(), loadGsapIfNeeded(), loadScript(), rewriteLegacyProjectLinks(), setCanvasSize(), shouldShowArrivalCover() (+3 more)

### Community 16 - "globe.js"
Cohesion: 0.24
Nodes (7): Bookshelf(), CaseStudyDetail(), getActiveViewFromLocation(), getActiveViewUrl(), handlePopState(), handleTabChange(), syncHistoryForView()

### Community 17 - "nav-fix.js"
Cohesion: 0.18
Nodes (6): NetworkMesh(), App(), handleDeploy(), handleViewAgent(), StatusDot(), toggleTheme()

### Community 18 - "cn()"
Cohesion: 0.49
Nodes (9): el(), fibPoints(), gcDist(), knn(), lonLatToXYZ(), mount(), regionFieldFor(), rng() (+1 more)

### Community 19 - "page.tsx"
Cohesion: 0.2
Nodes (10): di(), dx(), fx(), lx(), pI(), px(), Sa(), ux() (+2 more)

### Community 20 - "helloPatientCase.tsx"
Cohesion: 0.24
Nodes (10): AS(), AU(), Dy(), Ly(), Ms(), My(), os(), pU() (+2 more)

### Community 23 - "GlobalCommand.tsx"
Cohesion: 0.36
Nodes (5): installBackAllFix(), installGlobalPageTransitionFix(), isPlainInternalNavigation(), navigateWithCurtain(), onReady()

### Community 24 - "jF()"
Cohesion: 0.25
Nodes (8): bL(), eL(), hL(), iP(), jL(), ML(), oe(), QL()

### Community 26 - "panels.js"
Cohesion: 0.43
Nodes (6): addWidget(), handleKeyDown(), openAddModal(), removeWidget(), renderPlaceholder(), resetWidgets()

### Community 27 - "NetworkGraph()"
Cohesion: 0.38
Nodes (7): df(), Ef(), ff(), K2(), pf(), vf(), y2()

### Community 31 - "TacticalRadar.tsx"
Cohesion: 0.33
Nodes (3): FactoryScene(), handleMouseMove(), handleMouseUp()

### Community 32 - "syncHistoryForView()"
Cohesion: 0.6
Nodes (3): renderLeft(), renderRightEmpty(), renderRightRegion()

### Community 33 - "test()"
Cohesion: 0.5
Nodes (3): handleActionUpdate(), playVoice(), startListening()

### Community 35 - "PromptRegistry.tsx"
Cohesion: 0.5
Nodes (3): Book(), handleBookClick(), playPageTurnSound()

### Community 36 - "WorkflowMap.tsx"
Cohesion: 0.5
Nodes (4): gU(), Oi(), xy(), yU()

### Community 37 - "nR()"
Cohesion: 0.5
Nodes (4): Hx(), jG(), wG(), _x()

### Community 42 - "mM()"
Cohesion: 0.67
Nodes (3): DP(), FP(), vP()

### Community 43 - "bR()"
Cohesion: 0.67
Nodes (3): IU(), mU(), OU()

### Community 44 - "nL()"
Cohesion: 0.67
Nodes (3): bq(), Kv(), Mq()

## Knowledge Gaps
- **23 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Ef()` to `webflow.07467efa9-52e4f0421f.js`, `PromptRegistry.tsx`, `server.js`, `globe.js`, `TacticalRadar.tsx`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Why does `PaperCurtain` connect `caleb-cooper-works.js` to `ProjectDetailPage.tsx`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Why does `In()` connect `ProjectDetailPage.tsx` to `jquery-3.5.1.min.dc5e7f18c8-e07f811afa.js`, `caleb-cooper-works.js`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Draggable()` (e.g. with `be()` and `he()`) actually correct?**
  _`Draggable()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `E()` (e.g. with `ad()` and `ed()`) actually correct?**
  _`E()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Should `webflow.07467efa9-52e4f0421f.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
- **Should `jquery-3.5.1.min.dc5e7f18c8-e07f811afa.js` be split into smaller, more focused modules?**
  _Cohesion score 0.02 - nodes in this community are weakly interconnected._