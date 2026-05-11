import os
import requests
import json
from pathlib import Path
from dotenv import load_dotenv

def main():
    here = Path(__file__).parent.parent
    agent_dir = here / "agents" / "summit_voice_agent"
    env_path = agent_dir / ".env.local"
    
    if not env_path.exists():
        print(f"Error: {env_path} not found")
        return

    load_dotenv(env_path)
    
    provider = os.getenv("SUMMIT_LLM_PROVIDER", "openai").lower()
    model = os.getenv("SUMMIT_LOCAL_LLM_MODEL", "")
    base_url = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434/v1")
    
    print(f"Checking provider: {provider}")
    print(f"Model: {model}")
    print(f"Base URL: {base_url}")
    
    if provider != "ollama":
        print("SUMMIT_LLM_PROVIDER is not set to 'ollama'")
        return

    url = f"{base_url.rstrip('/')}/chat/completions"
    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": "Return compact JSON only."},
            {"role": "user", "content": "Classify: I need an appointment for knee pain. Return {\"intent\":\"body_part_routing\"}"}
        ],
        "stream": False
    }
    
    try:
        response = requests.post(url, json=payload, timeout=20)
        if response.status_code == 200:
            data = response.json()
            content = data["choices"][0]["message"]["content"]
            print(f"Response: {content}")
            print("Summit Ollama provider smoke: PASS")
        else:
            print(f"Error: Status code {response.status_code}")
            print(response.text)
            print("Summit Ollama provider smoke: FAIL")
    except Exception as e:
        print(f"Error: {e}")
        print("Summit Ollama provider smoke: FAIL")

if __name__ == "__main__":
    main()
