"use client";

import { useState, useEffect } from "react";

export default function AIChatVoiceBooking() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState<string | null>(null);

  // 🎤 Load ElevenLabs widget
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // 👤 Get user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setStudentId(user.id || user._id);
      } catch (err) {
        console.error("Invalid user in localStorage");
      }
    }
  }, []);

  // 💬 Shared booking function
  const handleBooking = async (text: string) => {
    if (!studentId) {
      setResponse("User not logged in");
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/ai/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          studentId, // ✅ now dynamic
        }),
      });

      const data = await res.json();
      setResponse(data.message);
    } catch (err) {
      setResponse("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 💬 Chat send
  const sendMessage = () => {
    if (!message.trim()) return;
    handleBooking(message);
    setMessage("");
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">

      {/* 🎤 Voice Bot */}
      <div className="border rounded-xl p-4">
        <h2 className="font-semibold mb-2">Voice Assistant</h2>

        <elevenlabs-convai
          id="voice_agent"
          agent-id="agent_4201kp1sm7cmfz1bf56j9wvft7fx"
        />
      </div>

      {/* 💬 Chat UI */}
      <div className="border rounded-xl p-4">
        <h2 className="font-semibold mb-2">Chat Assistant</h2>

        <input
          className="border p-2 w-full rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Book session with Ali tomorrow at 3 PM"
        />

        <button
          onClick={sendMessage}
          className="mt-2 bg-black text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Booking..." : "Send"}
        </button>

        {response && (
          <p className="mt-3 text-sm text-green-600">
            {response}
          </p>
        )}
      </div>

    </div>
  );
}