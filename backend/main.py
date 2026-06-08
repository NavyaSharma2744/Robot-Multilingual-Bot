from fastapi import (
    FastAPI,
    WebSocket,
    WebSocketDisconnect
)

from fastapi.middleware.cors import CORSMiddleware

from ai.llm import generate_response

import requests
import time

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():

    return {
        "message":
        "AI Receptionist Backend Running"
    }


@app.get("/health")
async def health():

    try:

        requests.get(
            "http://localhost:11434",
            timeout=3
        )

        return {
            "status": "healthy",
            "ollama": "running"
        }

    except Exception:

        return {
            "status": "error",
            "ollama": "offline"
        }


@app.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket
):

    await websocket.accept()

    print("Client connected")

    try:

        while True:

            user_message = (
                await websocket.receive_text()
            )

            print("\n====================")
            print("USER:")
            print(user_message)

            start_time = time.time()

            ai_response = (
                generate_response(
                    user_message
                )
            )

            latency = (
                time.time()
                - start_time
            )

            print("\nAI:")
            print(ai_response)

            print(
                f"\nLLM Time:"
                f" {latency:.2f}s"
            )

            await websocket.send_json(
                {
                    "text":
                    ai_response
                }
            )

    except WebSocketDisconnect:

        print(
            "Client disconnected"
        )

    except Exception as e:

        print(
            f"\nERROR: {e}"
        )

        await websocket.send_json(
            {
                "text":
                "Sorry, something went wrong."
            }
        )