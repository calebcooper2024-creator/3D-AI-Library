# Graph Report - calebs-3d-case-study  (2026-05-12)

## Corpus Check
- 202 files · ~328,562 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1259 nodes · 2218 edges · 143 communities (111 shown, 32 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 115 edges (avg confidence: 0.78)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `38ff4d60`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
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
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
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
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 131|Community 131]]
- [[_COMMUNITY_Community 132|Community 132]]
- [[_COMMUNITY_Community 133|Community 133]]
- [[_COMMUNITY_Community 134|Community 134]]
- [[_COMMUNITY_Community 135|Community 135]]
- [[_COMMUNITY_Community 136|Community 136]]
- [[_COMMUNITY_Community 137|Community 137]]
- [[_COMMUNITY_Community 138|Community 138]]

## God Nodes (most connected - your core abstractions)
1. `Draggable()` - 26 edges
2. `t()` - 20 edges
3. `ManagedHeroVideo()` - 19 edges
4. `n()` - 18 edges
5. `E()` - 18 edges
6. `SummitHealthAgent` - 17 edges
7. `Tween()` - 17 edges
8. `cn()` - 17 edges
9. `_run_replay()` - 16 edges
10. `MockEcwAdapter` - 16 edges

## Surprising Connections (you probably didn't know these)
- `stepByPage()` --calls--> `Tween()`  [INFERRED]
  src/components/Bookshelf.tsx → public/assets/js/gsap.min-85b2c7594d.js
- `markReady()` --calls--> `onReady()`  [INFERRED]
  src/components/Bookshelf.tsx → public/assets/js/nav-fix.js
- `SummitHealthAgent` --uses--> `SummitEventBus`  [INFERRED]
  agents/summit_voice_agent/agent.py → agents/summit_voice_agent/event_bus.py
- `SummitHealthAgent` --uses--> `MockEcwAdapter`  [INFERRED]
  agents/summit_voice_agent/agent.py → agents/summit_voice_agent/mock_ecw.py
- `SummitHealthAgent` --uses--> `SummitWorkflowState`  [INFERRED]
  agents/summit_voice_agent/agent.py → agents/summit_voice_agent/workflow_state.py

## Communities (143 total, 32 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.02
Nodes (24): ax(), bq(), bR(), DP(), dr(), f0(), FP(), FR() (+16 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (72): $(), $a(), aa(), ad(), Animation(), _assertThisInitialized(), ba(), bd() (+64 more)

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (32): Book(), Bookshelf(), CaseStudyDetail(), FactoryScene(), handleBookClick(), playPageTurnSound(), getScrollThreshold(), handleNavigate() (+24 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (55): A(), ba(), Ca(), da(), Draggable(), Ea(), Fa(), Ga() (+47 more)

### Community 4 - "Community 4"
Cohesion: 0.08
Nodes (34): ed(), A(), Ae(), b(), be(), ce(), D(), Dt() (+26 more)

### Community 5 - "Community 5"
Cohesion: 0.06
Nodes (30): AcceptanceMetric(), FooterCard(), GateRow(), Kicker(), Phase(), ReviewField(), StackRow(), StatBlock() (+22 more)

### Community 6 - "Community 6"
Cohesion: 0.1
Nodes (27): BeforeAfter(), BubbleDiagram(), HandwrittenNote(), ProcessFlow(), ImagePlaceholder(), Choice(), Metric(), Risk() (+19 more)

### Community 7 - "Community 7"
Cohesion: 0.12
Nodes (29): getWorkDetail(), clearAllHeavyMotion(), createHeavyMotionSettler(), dispatchHeavyMotion(), isHeavyMotionActive(), setHeavyMotion(), curtainIn(), curtainOut() (+21 more)

### Community 8 - "Community 8"
Cohesion: 0.11
Nodes (25): createSummitStaffTask(), deterministicLatency(), findSummitProvidersForBodyPart(), getSummitProviderAvailability(), hashText(), logSummitPatientStatement(), lookupSummitPatient(), normalize() (+17 more)

### Community 9 - "Community 9"
Cohesion: 0.12
Nodes (22): captureAndAnalyze(), drawDetections(), startCapture(), stopCapture(), cancelRecordingInternal(), handleVoiceInput(), monitorAudio(), playRawAudio() (+14 more)

### Community 10 - "Community 10"
Cohesion: 0.1
Nodes (30): Af(), df(), Ef(), ff(), fN(), gf(), hs(), If() (+22 more)

### Community 11 - "Community 11"
Cohesion: 0.11
Nodes (29): a(), aq(), bD(), cD(), dq(), eD(), eM(), fM() (+21 more)

### Community 12 - "Community 12"
Cohesion: 0.11
Nodes (18): animate(), applyTransform(), getMaxOffset(), handleItemKeyDown(), handleSelectInstance(), handleTouchEnd(), handleTouchMove(), handleWheelEvent() (+10 more)

### Community 13 - "Community 13"
Cohesion: 0.16
Nodes (23): applyDetailPage(), applyLinkList(), applySharedChrome(), applySidebarCard(), applyWorkIndexPage(), fitAllTitles(), fitTitleNode(), getProject() (+15 more)

### Community 14 - "Community 14"
Cohesion: 0.13
Nodes (16): _build_worker(), classify_call_intent(), create_staff_task(), flag_for_review(), get_provider_availability(), log_patient_statement(), lookup_patient(), main() (+8 more)

### Community 15 - "Community 15"
Cohesion: 0.17
Nodes (23): _entrypoint(), _medical_question_replay(), Summit Health Voice Agent — contract_replay.py Offline smoke test. No LiveKit r, Verify workers comp blocks scheduling and allows transfer., Verify medical question blocks scheduling and allows log_patient_statement., _run_replay(), _workers_comp_replay(), failure_event() (+15 more)

### Community 16 - "Community 16"
Cohesion: 0.11
Nodes (23): b(), bS(), $C(), d1(), E(), eL(), g(), hL() (+15 more)

### Community 17 - "Community 17"
Cohesion: 0.15
Nodes (14): componentDidCatch(), constructor(), getDerivedStateFromError(), VisualEditor(), CustomCursor(), downloadAsFolder(), downloadZip(), handleClone() (+6 more)

### Community 18 - "Community 18"
Cohesion: 0.16
Nodes (18): delay(), getPhaseMessage(), isMobile(), prepareProjectEntry(), computeBufferedRatio(), computeProgress(), getVideoReadinessSnapshot(), markManagedVideoPlaying() (+10 more)

### Community 19 - "Community 19"
Cohesion: 0.12
Nodes (20): AS(), AU(), Dy(), EU(), fS(), gU(), Is(), Ly() (+12 more)

### Community 20 - "Community 20"
Cohesion: 0.14
Nodes (18): cP(), DE(), FE(), Fy(), GE(), IU(), ME(), mU() (+10 more)

### Community 21 - "Community 21"
Cohesion: 0.15
Nodes (5): _make_slots(), MockEcwAdapter, Summit Health Voice Agent — mock_ecw.py Fake eClinicalWorks adapter. No real n, Returns one or two providers depending on scenario., Always returns staff_review_only — never a real EHR write.

### Community 22 - "Community 22"
Cohesion: 0.12
Nodes (12): Agent, _LKAgent, decode_control_packet(), Summit Health Voice Agent — event_bus.py Publishes SummitDemoEvent envelopes to, Wraps a LiveKit room to publish SummitDemoEvent envelopes and     receive summi, Serialize an event into the envelope format and publish to the room., Parse a raw data packet from the frontend.     Accepts three shapes:       1. {, Parse a raw data packet from the frontend.     Accepts three shapes:       1. (+4 more)

### Community 24 - "Community 24"
Cohesion: 0.13
Nodes (15): bL(), dS(), I1(), je(), LG(), ML(), oL(), pL() (+7 more)

### Community 25 - "Community 25"
Cohesion: 0.15
Nodes (13): ke(), di(), dx(), fx(), gx(), lx(), Oa(), pI() (+5 more)

### Community 26 - "Community 26"
Cohesion: 0.21
Nodes (13): d(), f(), h(), Ih(), l(), LS(), LU(), p() (+5 more)

### Community 27 - "Community 27"
Cohesion: 0.31
Nodes (8): handleHeavyMotion(), handleVisibilityChange(), safeId(), getActiveManagedVideoId(), pauseAllManagedVideos(), pauseManagedVideo(), registerManagedVideo(), requestManagedVideoPlayback()

### Community 29 - "Community 29"
Cohesion: 0.23
Nodes (5): NetworkMesh(), handleDeploy(), handleViewAgent(), StatusDot(), toggleTheme()

### Community 30 - "Community 30"
Cohesion: 0.42
Nodes (9): _clarify(), evaluate_policy(), _pass(), PolicyResult, Summit Health Voice Agent — policy_gate.py Deterministic Python port of src/lib, Evaluate whether a tool call is allowed given the current workflow state.     T, _reject(), _review() (+1 more)

### Community 31 - "Community 31"
Cohesion: 0.25
Nodes (4): load_config(), Summit Health Voice Agent — config.py Loads environment variables from .env.loc, Build a SummitAgentConfig from the current environment., SummitAgentConfig

### Community 33 - "Community 33"
Cohesion: 0.22
Nodes (7): publish_review_from_output(), Summit Health Voice Agent — tools.py Policy-gated tool runner. Every LLM tool c, Emit a review event from a prepare_appointment_for_review tool output., IntentClassification, Summit Health Voice Agent — workflow_state.py Deterministic call-state machine, SummitAppointmentDraft, SummitIdentityCapture

### Community 34 - "Community 34"
Cohesion: 0.39
Nodes (8): boot(), ensureCanvas(), initEffect(), loadGsapIfNeeded(), loadScript(), rewriteLegacyProjectLinks(), setCanvasSize(), shouldShowArrivalCover()

### Community 35 - "Community 35"
Cohesion: 0.43
Nodes (6): addWidget(), handleKeyDown(), openAddModal(), removeWidget(), renderPlaceholder(), resetWidgets()

### Community 36 - "Community 36"
Cohesion: 0.48
Nodes (5): Byc2wMosaic(), Kicker(), MetricTile(), SignalCard(), SystemCard()

### Community 37 - "Community 37"
Cohesion: 0.33
Nodes (6): bF(), E1(), hf(), jF(), R1(), u1()

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
Cohesion: 0.53
Nodes (4): Kicker(), MetricTile(), SignalCard(), SystemCard()

### Community 44 - "Community 44"
Cohesion: 0.53
Nodes (4): FeatureCard(), Kicker(), MetricTile(), SignalCard()

### Community 45 - "Community 45"
Cohesion: 0.53
Nodes (4): Kicker(), MetricTile(), SignalCard(), SystemCard()

### Community 46 - "Community 46"
Cohesion: 0.53
Nodes (4): Kicker(), MetricTile(), SignalCard(), SystemCard()

### Community 47 - "Community 47"
Cohesion: 0.53
Nodes (4): Kicker(), MetricTile(), SignalCard(), SystemCard()

### Community 48 - "Community 48"
Cohesion: 0.53
Nodes (4): Kicker(), MetricTile(), SignalCard(), SystemCard()

### Community 49 - "Community 49"
Cohesion: 0.53
Nodes (4): Kicker(), MetricTile(), SignalCard(), SystemCard()

### Community 50 - "Community 50"
Cohesion: 0.6
Nodes (3): boot(), clearRevealFlag(), releaseCover()

### Community 52 - "Community 52"
Cohesion: 0.5
Nodes (4): Hx(), jG(), wG(), _x()

## Knowledge Gaps
- **48 isolated node(s):** `Summit Health Voice Agent — agent.py LiveKit Agents 1.x worker entrypoint.  R`, `Per-session state and tool/policy/event pipeline.`, `Deterministic keyword-based fallback for weak tool calling.`, `Classify the caller's intent from their first statement.`, `Look up a patient by name and date of birth.` (+43 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **32 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ManagedHeroVideo()` connect `Community 64` to `Community 36`, `Community 5`, `Community 6`, `Community 39`, `Community 7`, `Community 41`, `Community 42`, `Community 40`, `Community 44`, `Community 45`, `Community 46`, `Community 47`, `Community 48`, `Community 49`, `Community 43`, `Community 27`, `Community 28`?**
  _High betweenness centrality (0.154) - this node is a cross-community bridge._
- **Why does `createHeavyMotionSettler()` connect `Community 7` to `Community 12`?**
  _High betweenness centrality (0.147) - this node is a cross-community bridge._
- **Why does `onReady()` connect `Community 12` to `Community 10`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Draggable()` (e.g. with `be()` and `he()`) actually correct?**
  _`Draggable()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Summit Health Voice Agent — agent.py LiveKit Agents 1.x worker entrypoint.  R`, `Per-session state and tool/policy/event pipeline.`, `Deterministic keyword-based fallback for weak tool calling.` to the rest of the system?**
  _48 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.02 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
