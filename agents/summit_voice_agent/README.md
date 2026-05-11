# Summit Health Voice Agent (Phase 4)

Python LiveKit agent worker for the Summit Health demo.

## Overview

This agent joins a `summit-demo-*` LiveKit room, subscribes to `summit.control` from the browser, runs a real-time voice pipeline (STT → policy gate → tool execution → TTS), and publishes structured `SummitDemoEvent` packets to `summit.event`.

**No real PHI. No real eClinicalWorks. No real appointments.**

---

## Setup

### 1. Create and activate a virtual environment

```bash
cd agents/summit_voice_agent
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS/Linux
source .venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment

```bash
copy .env.example .env.local
# Edit .env.local and set real values for:
# LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET
# OPENAI_API_KEY, DEEPGRAM_API_KEY, CARTESIA_API_KEY
```

### 4. Verify the event contract (no LiveKit required)

```bash
# From repo root:
python scripts/verify-summit-agent-contract.py

# Or from the agent dir:
python contract_replay.py
```

### 5. Start the agent worker

```bash
# From the agent dir (venv active):
python agent.py dev      # development mode — connects to LiveKit
python agent.py start    # production worker mode
```

---

## Environment Variables

| Variable | Required | Default | Notes |
|---|---|---|---|
| `LIVEKIT_URL` | ✅ | — | `wss://your-project.livekit.cloud` |
| `LIVEKIT_API_KEY` | ✅ | — | From LiveKit Cloud dashboard |
| `LIVEKIT_API_SECRET` | ✅ | — | From LiveKit Cloud dashboard |
| `SUMMIT_AGENT_NAME` | — | `summit-voice-agent` | Must match the name the browser expects |
| `SUMMIT_EVENT_TOPIC` | — | `summit.event` | Do not change |
| `SUMMIT_CONTROL_TOPIC` | — | `summit.control` | Do not change |
| `SUMMIT_DEFAULT_SCENARIO` | — | `normal_scheduling_knee` | |
| `OPENAI_API_KEY` | ⚠️ | — | Required for LLM voice pipeline |
| `DEEPGRAM_API_KEY` | ⚠️ | — | Required for STT |
| `CARTESIA_API_KEY` | ⚠️ | — | Required for TTS |

---

## Topic Contract

| Direction | Topic | Format |
|---|---|---|
| Browser → Agent | `summit.control` | `{ "action": "start_scenario", "scenarioId": "..." }` |
| Agent → Browser | `summit.event` | `{ "type": "summit.event", "event": SummitDemoEvent }` |

---

## ⚠️ Safety Constraints

- **No real PHI.** Demo patients only (Jordan Miles, Maria Rivera, Caleb Demo).
- **No real EHR writes.** All appointment creation returns `staff_review_only`.
- **No medical advice.** Medical questions are logged and escalated only.
- **No workers-comp scheduling.** Immediate transfer required.
- **No insurance verification.** Blocked by policy gate.
- **No surgery scheduling.** Blocked by policy gate.
- **No real call transfers.** All transfers are simulated in demo mode.
