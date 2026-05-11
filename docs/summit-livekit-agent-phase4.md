# Summit Health Voice Agent: Phase 4 — Python LiveKit Agent

## Scope

Phase 4 adds the server-side Python LiveKit agent that joins the browser-created `summit-demo-*` room, runs a real-time voice pipeline, enforces the deterministic policy gate before every tool action, and publishes structured `SummitDemoEvent` packets so all browser panels receive live data.

Phases 1–3 (mock UI, policy engine, frontend wiring) are unchanged and remain fully functional when the Python agent is not running.

---

## Files Added

```
agents/summit_voice_agent/
  __init__.py
  agent.py            — LiveKit Agents 1.x worker + SummitHealthAgent class
  config.py           — SummitAgentConfig dataclass (env vars)
  events.py           — Python event builders mirroring summitEvents.ts
  event_bus.py        — LiveKit data publish + control packet decode
  workflow_state.py   — Deterministic state machine + intent classifier
  policy_gate.py      — Python port of summitPolicyGate.ts
  mock_ecw.py         — Fake eClinicalWorks adapter (no real data)
  tools.py            — Policy-gated tool runner
  contract_replay.py  — Offline event trace prover
  requirements.txt
  .env.example
  README.md

scripts/
  verify-summit-agent-contract.py

docs/
  summit-livekit-agent-phase4.md (this file)
```

---

## Event Contract

All events published to `summit.event` use the envelope format:

```json
{
  "type": "summit.event",
  "event": {
    "type": "transcript",
    "callId": "SUMMIT-LK-ABC123",
    "speaker": "caller",
    "text": "I need an appointment for knee pain",
    "isFinal": true,
    "ts": 1760000000000
  }
}
```

### Event Types

| Type | When published |
|---|---|
| `session` | connect, running, ended, error |
| `transcript` | caller speech (STT), agent speech (where available) |
| `intent` | after classify_call_intent tool runs |
| `tool` | requested → approved/rejected → running → succeeded/failed |
| `policy` | after every evaluate_policy call |
| `latency` | tool_roundtrip after each tool execution |
| `review` | after prepare_appointment_for_review succeeds |
| `failure` | scenario injection label at session start |

---

## Tool List

| Tool | Policy gate(s) |
|---|---|
| `classify_call_intent` | None (always allowed) |
| `lookup_patient` | identity_confirmation |
| `get_provider_availability` | provider_confidence, slot_availability |
| `prepare_appointment_for_review` | identity_confirmation, appointment_confirmation, demo_write_guard |
| `transfer_call` | Blocked by workers_comp/billing/surgery when scheduling needed |
| `create_staff_task` | Always allowed in safe escalation path |
| `flag_for_review` | Always allowed |
| `log_patient_statement` | Always allowed (blocked from scheduling contexts) |

---

## Policy Invariants

These must hold regardless of LLM output:

1. Workers comp → scheduling blocked, transfer_call allowed
2. Medical question → scheduling blocked, log/create_staff_task allowed, no clinical advice
3. Billing → scheduling blocked, transfer_call allowed
4. Surgery → scheduling blocked
5. Insurance → scheduling blocked
6. Low intent confidence → all tools blocked, clarify required
7. Low provider confidence → availability blocked, clarify required
8. EHR timeout → availability blocked, staff callback required
9. prepare_appointment_for_review requires identity_confirmed AND caller_confirmed
10. All appointment creation returns staff_review_only — never real EHR write

---

## Local Verification

```bash
# No LiveKit required:
python scripts/verify-summit-agent-contract.py   # → PASS
node scripts/verify-summit-policy.mjs            # → PASS
node scripts/verify-summit-livekit-env.mjs       # → NOT CONFIGURED (expected)
npm run lint                                     # → clean
npm run build                                    # → clean

# With venv active:
cd agents/summit_voice_agent
python contract_replay.py                        # prints event envelopes
```

---

## Deployed Verification (requires env vars)

1. Set `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET` in Vercel environment variables.
2. Set same vars + `OPENAI_API_KEY`, `DEEPGRAM_API_KEY`, `CARTESIA_API_KEY` in `agents/summit_voice_agent/.env.local`.
3. Start agent: `python agent.py dev`
4. Open `/CalebCooper/Library/summit-health` and scroll to "The Agent On The Line."
5. Click **Connect LiveKit room**.
6. Confirm agent joins as `summit-voice-agent`.
7. Speak: *"I need an appointment for knee pain."*
8. Confirm browser transcript, tool, policy, latency, and review panels update.
9. Test: *"This is workers comp."* → no scheduling, transfer behavior.
10. Test: *"Is this swelling dangerous?"* → no medical advice, clinical task created.

---

## Known Dependency on Env Vars

The LiveKit agent runtime cannot be tested locally without valid `LIVEKIT_URL`, `LIVEKIT_API_KEY`, and `LIVEKIT_API_SECRET`. The contract verifier and contract_replay run without these.

Agent transcript mirroring (publishing agent TTS text as `speaker: "agent"` transcript events) depends on LiveKit session event availability in the installed plugin version. If `conversation_item_added` is not available, transcript events are published for caller speech only, and agent transcript mirroring is documented as a Phase 4.1 follow-up.

---

## Phase 5 Next Step

- End-to-end live browser conversation hardening
- Latency measurements against real STT/LLM/TTS
- Eval test suite comparing agent behavior to expected policy outcomes per scenario
- SIP/Twilio ingress wiring (Phase 5.1)
- Real eClinicalWorks integration gating (Phase 5.2, requires BAA and production approval)
