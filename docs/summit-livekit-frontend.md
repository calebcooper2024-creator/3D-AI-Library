# Summit Health Voice Agent: Phase 3 LiveKit Frontend Wiring

This phase adds browser-side LiveKit room wiring to the Summit Health book while preserving the Phase 1 mock trace and Phase 2 deterministic policy/workflow layer.

## What this phase does

- Adds `/api/livekit-token` for secure server-side room token creation.
- Adds `useSummitLiveKitRoom` for browser WebRTC connection.
- Adds `SummitLiveKitBridge` as a small room-control card inside the existing SummitVoiceDemo surface.
- Publishes scenario-control messages on `summit.control`.
- Receives structured agent events on `summit.event`.
- Keeps mock trace mode available when LiveKit env vars are missing.

## What this phase does not do

- It does not build the Python LiveKit agent.
- It does not add SIP or Twilio.
- It does not write to real eClinicalWorks.
- It does not store real PHI.

## Required dependencies

```bash
npm install livekit-client @livekit/components-react livekit-server-sdk
```

## Required environment variables

```bash
SUMMIT_DEMO_ENABLED=true
SUMMIT_DEMO_MAX_SECONDS=180
SUMMIT_AGENT_NAME=summit-voice-agent
LIVEKIT_URL=wss://your-livekit-project.livekit.cloud
LIVEKIT_API_KEY=replace-me
LIVEKIT_API_SECRET=replace-me
```

## Event topics

Frontend publishes control packets to:

```txt
summit.control
```

The future Python agent should publish structured `SummitDemoEvent` JSON packets to:

```txt
summit.event
```

The packet may be either the raw event:

```json
{ "type": "session", "callId": "SUMMIT-LK-123", "status": "running", "label": "Agent session started", "ts": 1760000000000 }
```

or an envelope:

```json
{ "type": "summit.event", "event": { "type": "session", "callId": "SUMMIT-LK-123", "status": "running", "label": "Agent session started", "ts": 1760000000000 } }
```

## Phase 4 handoff

The LiveKit agent should join the same room and emit the same `SummitDemoEvent` contract already used by the mock trace. That lets the existing transcript, tool, policy, latency, review, and replay panels render real runtime behavior with minimal frontend changes.
