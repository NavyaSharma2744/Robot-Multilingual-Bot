# Multilingual AI Receptionist

## Overview

Multilingual AI Receptionist is a real-time conversational assistant designed as a prototype for a robotic receptionist system. The application supports English, Hindi, and Marathi interactions through a web interface and provides voice responses without generating or storing audio files.

The system uses a local Large Language Model (LLM) running through Ollama and browser-based speech synthesis for low-latency voice output.

---

## Features

### Multilingual Conversation

* English support
* Hindi support
* Marathi support
* Automatic language-aware responses

### Real-Time Communication

* FastAPI WebSocket backend
* Real-time message exchange
* Low response latency

### Voice Interaction

* Browser Speech Synthesis API
* No audio files generated
* No audio storage required
* Near-instant voice playback

### AI Receptionist Behavior

* Responds as a receptionist
* Short and conversational responses
* Supports admission and information-related queries
* Can be extended using Retrieval Augmented Generation (RAG)

---

## Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Web Speech API

### Backend

* FastAPI
* WebSockets
* Python

### AI Model

* Ollama
* Qwen / Llama Models

---

## System Architecture

User Input

↓

Frontend (Next.js)

↓

WebSocket

↓

FastAPI Backend

↓

Ollama LLM

↓

Text Response

↓

Browser Speech Synthesis

↓

Voice Output

---

## Project Structure

```text
Robot-Multilingual-Bot/

├── frontend/
│   ├── app/
│   │   └── page.tsx
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── ai/
│   │   └── llm.py
│   │
│   ├── main.py
│   ├── requirements.txt
│   └── env/
│
└── README.md
```

### Backend Setup

```bash
cd backend

python3 -m venv env

source env/bin/activate

pip install -r requirements.txt
```

### Install Ollama

Download and install Ollama.

Pull a model:

```bash
ollama pull llama3.2:3b
```

or

```bash
ollama pull qwen2.5:3b
```

### Start Backend

```bash
uvicorn main:app --reload
```

Backend runs at:

```text
http://localhost:8000
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:3000
```
---

## Current Limitations

* Marathi voice depends on browser speech synthesis support.
* Hindi and Marathi quality depends on the selected LLM.
* Voice input integration is not yet enabled.
* Knowledge is limited to the selected LLM unless RAG is added.

---

## Author

Navya Sharma


```
```
