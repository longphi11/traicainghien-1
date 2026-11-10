"""
Gemini Client with Multi-Key Pool & Automatic Failover (Trại Cai Nghiện)
Supports rotating through all configured Gemini API keys.
"""

import os
import json
import random
import urllib.request
import urllib.error
from typing import Optional, List

def load_gemini_keys() -> List[str]:
    """Load all available Gemini keys from environment or .env/.env.local."""
    keys = []
    
    # 1. Check GEMINI_API_KEYS (comma-separated)
    env_keys = os.environ.get("GEMINI_API_KEYS", "")
    if env_keys:
        for k in env_keys.split(","):
            k = k.strip()
            if k and k not in keys:
                keys.append(k)
                
    # 2. Check individual GEMINI_API_KEY_1..10
    for i in range(1, 11):
        k = os.environ.get(f"GEMINI_API_KEY_{i}", "").strip()
        if k and k not in keys:
            keys.append(k)
            
    # 3. Check default GEMINI_API_KEY
    default_k = os.environ.get("GEMINI_API_KEY", "").strip()
    if default_k and default_k not in keys:
        keys.append(default_k)
        
    # 4. Fallback: Parse .env or .env.local if keys list is still empty
    if not keys:
        candidates = [".env.local", ".env", "/root/traicainghien/.env"]
        for cpath in candidates:
            if os.path.exists(cpath):
                try:
                    with open(cpath, "r", encoding="utf-8", errors="ignore") as f:
                        for line in f:
                            line = line.strip()
                            if line.startswith("GEMINI_API_KEYS="):
                                raw = line.split("=", 1)[1].strip()
                                for k in raw.split(","):
                                    k = k.strip()
                                    if k and k not in keys:
                                        keys.append(k)
                            elif line.startswith("GEMINI_API_KEY") and "=" in line:
                                k = line.split("=", 1)[1].strip()
                                if k and k not in keys:
                                    keys.append(k)
                            elif line.startswith("API Key:") and "AQ." in line:
                                k = line.split(":", 1)[1].strip()
                                if k and k not in keys:
                                    keys.append(k)
                except:
                    pass
                if keys:
                    break
                    
    return keys

# Predefined key pool
_GEMINI_KEYS = load_gemini_keys()

def get_keys_pool() -> List[str]:
    global _GEMINI_KEYS
    if not _GEMINI_KEYS:
        _GEMINI_KEYS = load_gemini_keys()
    return _GEMINI_KEYS

def generate_content(
    prompt: str,
    system_instruction: Optional[str] = None,
    model: str = "gemini-3.5-flash",
    temperature: float = 0.7,
    max_tokens: int = 4096
) -> Optional[str]:
    """
    Generate content with automatic key rotation and failover.
    Cycles through all available keys and fallback models if a rate limit (429) or error occurs.
    """
    keys = list(get_keys_pool())
    if not keys:
        raise ValueError("No Gemini API keys found in environment or .env files!")
        
    # Put the first configured key (primary) at index 0 without hardcoding
    primary_key = os.environ.get("GEMINI_API_KEY", "").strip()
    if not primary_key and keys:
        primary_key = keys[0]
        
    ordered_keys = []
    if primary_key and primary_key in keys:
        ordered_keys.append(primary_key)
    for k in keys:
        if k not in ordered_keys:
            ordered_keys.append(k)
            
    models_to_try = ["gemini-3-flash-preview", "gemini-flash-lite-latest", "gemini-3.5-flash-lite", "gemma-4-26b-a4b-it"]
    
    last_error = None
    for target_model in models_to_try:
        for attempt_idx, key in enumerate(ordered_keys, 1):
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{target_model}:generateContent?key={key}"
            
            contents = []
            if system_instruction:
                contents.append({
                    "role": "user",
                    "parts": [{"text": f"Instruction: {system_instruction}\n\nTask: {prompt}"}]
                })
            else:
                contents.append({
                    "role": "user",
                    "parts": [{"text": prompt}]
                })
                
            payload = {
                "contents": contents,
                "generationConfig": {
                    "temperature": temperature,
                    "maxOutputTokens": max_tokens
                }
            }
            
            try:
                req = urllib.request.Request(
                    url,
                    data=json.dumps(payload).encode("utf-8"),
                    headers={"Content-Type": "application/json"}
                )
                with urllib.request.urlopen(req, timeout=45) as resp:
                    data = json.loads(resp.read().decode("utf-8"))
                    candidates = data.get("candidates", [])
                    if candidates:
                        parts = candidates[0].get("content", {}).get("parts", [])
                        if parts:
                            return parts[0].get("text", "")
            except urllib.error.HTTPError as e:
                err_body = e.read().decode("utf-8", errors="ignore")
                last_error = f"HTTP {e.code} ({target_model}): {err_body[:150]}"
                continue
            except Exception as e:
                last_error = f"{e} ({target_model})"
                continue
            
    print(f"❌ All Gemini API keys and models failed. Last error: {last_error}")
    return None

if __name__ == "__main__":
    print(f"Loaded {len(get_keys_pool())} Gemini keys in pool:")
    for idx, k in enumerate(get_keys_pool(), 1):
        print(f"  [{idx}] {k[:15]}...{k[-5:]}")
        
    print("\nTesting generate_content with failover pool...")
    test_res = generate_content("Nêu ngắn gọn 1 câu định nghĩa về Trại Cai Nghiện.")
    print("Response:\n", test_res)
