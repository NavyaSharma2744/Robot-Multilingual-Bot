# Multilingual AI Receptionist 🤖 

A real-time multilingual (English, Hindi, and Marathi) AI receptionist built using FastAPI, Next.js, WebSockets, Ollama, and Browser Speech Synthesis. It recieves text responses and and give text and speech output simulteneously.

---

## System Architecture

```text
User Input
      │
      ▼
Next.js Frontend
      │
      ▼
WebSocket Connection
      │
      ▼
FastAPI Backend
      │
      ▼
Ollama LLM
      │
      ▼
Generated Response
      │
      ▼
Browser Speech Synthesis
      │
      ▼
Voice Output
```

---

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Web Speech API

### Backend
- FastAPI
- WebSockets
- Python

### AI Layer
- Ollama
- Llama / Qwen Models
- Prompt Engineering

---

## Project Structure

```text
Robot-Multilingual-Bot/

├── README.md
├── .gitignore
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── package.json
│   ├── next.config.ts
│   └── tsconfig.json
│
└── backend/
    ├── ai/
    │   └── llm.py
    │
    ├── main.py
    └── requirements.txt
```

---

### Backend Setup

```bash
cd backend

python3 -m venv env

source env/bin/activate

pip install -r requirements.txt
```

---

### Install Ollama

Download and install Ollama:

https://ollama.com

Pull a model:

```bash
ollama pull llama3.2:3b
```

---

### Start Backend

```bash
uvicorn main:app --reload
```

Backend runs on:

```text
http://localhost:8000
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```
---

## Author

Navya Sharma
---

## License

MIT License