"""
Summit Health Voice Agent — tools.py
Policy-gated tool runner. Every LLM tool call routes through this
module. The policy gate decides whether execution proceeds.
"""
from __future__ import annotations

import asyncio
import logging
import time
from typing import Any, Callable, Dict, Optional

from .events import (
    tool_event,
    policy_event as policy_ev,
    latency_event,
    review_event,
)
from .policy_gate import evaluate_policy
from .workflow_state import SummitWorkflowState

logger = logging.getLogger(__name__)


async def run_policy_gated_tool(
    *,
    call_id: str,
    state: SummitWorkflowState,
    bus: Any,  # SummitEventBus
    tool_name: str,
    tool_input: Dict[str, Any],
    action: Callable[[], Any],  # async callable returning dict with "ok"
) -> Dict[str, Any]:
    """
    Execute a tool through the policy gate and publish events at each stage.

    Returns:
        {"ok": bool, "data": ..., "reason": ..., "gate": ..., "decision": ...}
    """
    # 1. Publish tool requested
    await bus.publish(tool_event(call_id, tool_name, "requested", input=tool_input))

    # 2. Evaluate policy
    policy = evaluate_policy(state, tool_name)

    # 3. Publish policy event
    await bus.publish(policy_ev(call_id, policy.gate, policy.decision, policy.reason))

    if not policy.ok:
        # 4a. Publish tool rejected
        await bus.publish(tool_event(call_id, tool_name, "rejected", reason=policy.reason))
        return {
            "ok": False,
            "gate": policy.gate,
            "decision": policy.decision,
            "reason": policy.reason,
            "required_clarification": policy.required_clarification,
        }

    # 4b. Publish tool approved
    await bus.publish(tool_event(call_id, tool_name, "approved", reason=policy.reason))

    # 5. Publish tool running
    await bus.publish(tool_event(call_id, tool_name, "running"))

    # 6. Execute action and measure latency
    t0 = time.monotonic()
    try:
        result = await action()
    except Exception as exc:
        latency_ms = int((time.monotonic() - t0) * 1000)
        msg = str(exc)
        logger.exception("Tool %s raised: %s", tool_name, msg)
        await bus.publish(tool_event(call_id, tool_name, "failed", latency_ms=latency_ms, reason=msg))
        return {"ok": False, "gate": policy.gate, "decision": policy.decision, "reason": msg}

    latency_ms = int((time.monotonic() - t0) * 1000)

    # 7. Publish latency
    await bus.publish(latency_event(call_id, "tool_roundtrip", latency_ms, target_ms=500))

    if not result.get("ok"):
        reason = result.get("message", "Tool call failed")
        await bus.publish(tool_event(call_id, tool_name, "failed", latency_ms=latency_ms, reason=reason))
        return {"ok": False, "gate": policy.gate, "decision": policy.decision, "reason": reason}

    output_data = result.get("data", {})
    await bus.publish(
        tool_event(call_id, tool_name, "succeeded", latency_ms=latency_ms, output=output_data)
    )

    return {
        "ok": True,
        "gate": policy.gate,
        "decision": policy.decision,
        "data": output_data,
    }


async def publish_review_from_output(
    *,
    call_id: str,
    bus: Any,
    tool_output: Dict[str, Any],
    review_status: str = "needs_review",
    summary: str = "Appointment draft ready for staff review",
) -> None:
    """Emit a review event from a prepare_appointment_for_review tool output."""
    payload = tool_output.get("data", tool_output)
    await bus.publish(review_event(call_id, review_status, summary, payload))
