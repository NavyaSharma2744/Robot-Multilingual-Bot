'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket(
      'ws://localhost:8000/ws'
    );

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setMessages((prev) => [
        ...prev,
        `Robot: ${data.text}`,
      ]);

      const utterance =
        new SpeechSynthesisUtterance(
          data.text
        );
      const voices =
        speechSynthesis.getVoices();
      const text = data.text;
      // Hindi / Marathi
      if (/[\u0900-\u097F]/.test(text)) {
        const hindiVoice =
          voices.find(
            voice =>
              voice.name === 'Lekha'
          );
        if (hindiVoice) {
          utterance.voice =
            hindiVoice;
        }
        utterance.lang = 'hi-IN';
      }
      //English
      else {
        const englishVoice =
          voices.find(
            voice =>
              voice.name === 'Rishi'
          );
        if (englishVoice) {
          utterance.voice =
            englishVoice;
        }
        utterance.lang = 'en-IN';
      }

speechSynthesis.cancel();

speechSynthesis.speak(
  utterance
);
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    socketRef.current?.send(message);

    setMessages((prev) => [
      ...prev,
      `You: ${message}`,
    ]);

    setMessage('');
  };

  return (
    <div className="
      min-h-screen
      bg-slate-950
      text-white
      flex
      items-center
      justify-center
      p-10
    ">

      <div className="
        flex
        gap-8
        items-center
      ">

        {/* ROBOT */}

        <div className="
          w-72
          h-[500px]
          bg-slate-900
          rounded-3xl
          border
          border-slate-700
          flex
          flex-col
          items-center
          justify-center
          shadow-2xl
        ">

          <div className="robot-head">

            <div className="robot-face">

              <div className="eyes">

                <div className="eye"></div>
                <div className="eye"></div>

              </div>

              <div className="smile"></div>

            </div>

          </div>

          <h2 className="
            text-xl
            font-semibold
            mt-8
          ">
            Virtual Assistant
          </h2>

          <p className="
            text-slate-400
            text-center
            px-6
            mt-2
          ">
            English • Hindi • Marathi
          </p>

        </div>

        {/* CHAT UI */}

        <div className="
          w-[700px]
          bg-white/10
          rounded-2xl
          p-6
        ">

          <h1 className="
            text-4xl
            font-bold
            mb-6
          ">
            AI Receptionist
          </h1>

          <div className="
            h-80
            overflow-y-auto
            border
            border-white/10
            rounded-xl
            p-4
            mb-6
            space-y-3
          ">

            {messages.map(
              (msg, index) => (

                <div
                  key={index}
                  className="
                    bg-white/10
                    p-3
                    rounded-xl
                  "
                >
                  {msg}
                </div>

              )
            )}

          </div>

          <div className="
            flex
            gap-4
          ">

            <input
              type="text"
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              onKeyDown={(e) =>
                e.key === 'Enter' &&
                sendMessage()
              }
              placeholder="Type message..."
              className="
                flex-1
                h-14
                rounded-xl
                bg-white/10
                px-4
                outline-none
              "
            />

            <button
              onClick={sendMessage}
              className="
                bg-cyan-500
                px-6
                rounded-xl
                font-semibold
              "
            >
              Send
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}