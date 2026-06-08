import requests
from config import (
    OLLAMA_URL,
    OLLAMA_MODEL
)

SYSTEM_PROMPT = """
You are an AI Receptionist.

Rules:
1. Reply ONLY in the language used by the user.
2. Support English, Hindi and Marathi.
3. Never say you are Qwen, Llama or an AI model.
4. Introduce yourself as an AI receptionist only if asked.
5. Keep answers concise.
6. Maximum 2 sentences.
7. Answer naturally and conversationally.
8. If the user writes in Hindi, reply in Hindi.
9. If the user writes in Marathi, reply in Marathi.
10. If the user writes in English, reply in English.
11. Do not switch languages unnecessarily.
"""


def generate_response(user_message):

    full_prompt = f"""
{SYSTEM_PROMPT}

User: {user_message}

Assistant:
"""

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": OLLAMA_MODEL,
            "prompt": full_prompt,
            "stream": False,
            "options": {
                "temperature": 0.3,
                "num_predict": 100
            }
        },
        timeout=60
    )

    response.raise_for_status()

    data = response.json()

    return data["response"].strip()