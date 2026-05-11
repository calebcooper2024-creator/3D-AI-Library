"""
Summit Health Voice Agent — event_bus.py
Publishes SummitDemoEvent envelopes to the LiveKit room data channel
and decodes incoming summit.control packets from the frontend.
"""
from __future__ import annotations

import json
import logging
from typing import Any, Callable, Dict, Optional

from .events import envelope as make_envelope, EVENT_TOPIC, CONTROL_TOPIC

logger = logging.getLogger(__name__)


class SummitEventBus:
    """
    Wraps a LiveKit room to publish SummitDemoEvent envelopes and
    receive summit.control messages from the browser.
    """

    def __init__(self, room: Any, event_topic: str = EVENT_TOPIC, control_topic: str = CONTROL_TOPIC):
        self._room = room
        self.event_topic = event_topic
        self.control_topic = control_topic

    async def publish(self, event: Dict[str, Any]) -> None:
        """Serialize an event into the envelope format and publish to the room."""
        wrapped = make_envelope(event)
        payload = json.dumps(wrapped).encode("utf-8")
        try:
            await self._room.local_participant.publish_data(
                payload,
                reliable=True,
                topic=self.event_topic,
            )
        except Exception as exc:
            logger.warning("SummitEventBus.publish failed: %s", exc)


def decode_control_packet(raw: bytes) -> Optional[Dict[str, Any]]:
    """
    Parse a raw data packet from the frontend.
    Accepts three shapes:
      1. { "action": "start_scenario", "scenarioId": "..." }   (raw)
      2. { "type": "summit.control", "payload": { ... } }      (envelope)
      3. { "type": "summit.control", "control": { ... } }      (alternate envelope)
    Returns a normalized dict with "action" and "scenarioId" keys, or None if invalid.
    """
    try:
        obj = json.loads(raw.decode("utf-8"))
    except (json.JSONDecodeError, UnicodeDecodeError):
        logger.debug("Control packet is not valid JSON")
        return None

    if not isinstance(obj, dict):
        return None

    # Unwrap envelope formats
    if obj.get("type") == CONTROL_TOPIC:
        inner = obj.get("payload") or obj.get("control")
        if isinstance(inner, dict):
            obj = inner
        # If there's no inner payload, fall through to use obj as-is

    # Validate required "action" field
    if "action" not in obj:
        logger.debug("Control packet missing 'action': %s", obj)
        return None

    return obj


def register_control_handler(
    room: Any,
    handler: Callable[[Dict[str, Any]], Any],
    control_topic: str = CONTROL_TOPIC,
) -> None:
    """
    Register a LiveKit data-received handler that filters for control_topic
    and calls handler(decoded_packet) for each valid packet.
    """
    try:
        from livekit import rtc  # type: ignore

        @room.on("data_received")
        def on_data(data_packet: rtc.DataPacket) -> None:  # type: ignore
            if data_packet.topic != control_topic:
                return
            decoded = decode_control_packet(data_packet.data)
            if decoded is not None:
                try:
                    import asyncio
                    loop = asyncio.get_event_loop()
                    if asyncio.iscoroutinefunction(handler):
                        loop.create_task(handler(decoded))
                    else:
                        handler(decoded)
                except Exception as exc:
                    logger.warning("Control handler error: %s", exc)

    except ImportError:
        # LiveKit not installed — safe for contract_replay.py and tests
        logger.debug("LiveKit not available; control handler not registered")
