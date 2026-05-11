"""
Summit Health Voice Agent — config.py
Loads environment variables from .env.local and .env.
All LiveKit credentials stay server-side only.
"""
from __future__ import annotations

import os
from dataclasses import dataclass, field
from pathlib import Path

from dotenv import load_dotenv

# Load .env.local first (local overrides), then .env
_here = Path(__file__).parent
for _candidate in [_here / ".env.local", _here / ".env"]:
    if _candidate.exists():
        load_dotenv(_candidate, override=False)


@dataclass(frozen=True)
class SummitAgentConfig:
    livekit_url: str
    livekit_api_key: str
    livekit_api_secret: str
    agent_name: str
    event_topic: str
    control_topic: str
    default_scenario: str
    max_call_seconds: int
    stt_model: str
    stt_language: str
    llm_model: str
    tts_model: str
    tts_voice: str
    openai_api_key: str
    deepgram_api_key: str
    cartesia_api_key: str
    llm_provider: str
    ollama_base_url: str
    ollama_api_key: str
    local_llm_model: str

    @property
    def is_configured(self) -> bool:
        """True when the minimum LiveKit credentials are present."""
        return bool(self.livekit_url and self.livekit_api_key and self.livekit_api_secret)

    @property
    def has_llm(self) -> bool:
        if self.llm_provider == "ollama":
            return bool(self.ollama_base_url and self.local_llm_model)
        return bool(self.openai_api_key)

    @property
    def has_stt(self) -> bool:
        return bool(self.deepgram_api_key)

    @property
    def has_tts(self) -> bool:
        return bool(self.cartesia_api_key)


def load_config() -> SummitAgentConfig:
    """Build a SummitAgentConfig from the current environment."""
    return SummitAgentConfig(
        livekit_url=os.getenv("LIVEKIT_URL", ""),
        livekit_api_key=os.getenv("LIVEKIT_API_KEY", ""),
        livekit_api_secret=os.getenv("LIVEKIT_API_SECRET", ""),
        agent_name=os.getenv("SUMMIT_AGENT_NAME", "summit-voice-agent"),
        event_topic=os.getenv("SUMMIT_EVENT_TOPIC", "summit.event"),
        control_topic=os.getenv("SUMMIT_CONTROL_TOPIC", "summit.control"),
        default_scenario=os.getenv("SUMMIT_DEFAULT_SCENARIO", "normal_scheduling_knee"),
        max_call_seconds=int(os.getenv("SUMMIT_MAX_CALL_SECONDS", "180")),
        stt_model=os.getenv("SUMMIT_STT_MODEL", "deepgram/nova-3"),
        stt_language=os.getenv("SUMMIT_STT_LANGUAGE", "en"),
        llm_model=os.getenv("SUMMIT_LLM_MODEL", "openai/gpt-4o"),
        tts_model=os.getenv("SUMMIT_TTS_MODEL", "cartesia/sonic-3"),
        tts_voice=os.getenv("SUMMIT_TTS_VOICE", "9626c31c-bec5-4cca-baa8-f8ba9e84c8bc"),
        openai_api_key=os.getenv("OPENAI_API_KEY", ""),
        deepgram_api_key=os.getenv("DEEPGRAM_API_KEY", ""),
        cartesia_api_key=os.getenv("CARTESIA_API_KEY", ""),
        llm_provider=os.getenv("SUMMIT_LLM_PROVIDER", "openai").lower(),
        ollama_base_url=os.getenv("OLLAMA_BASE_URL", "http://localhost:11434/v1"),
        ollama_api_key=os.getenv("OLLAMA_API_KEY", "ollama"),
        local_llm_model=os.getenv("SUMMIT_LOCAL_LLM_MODEL", ""),
    )


# Module-level singleton — safe for import-time inspection
CONFIG = load_config()
