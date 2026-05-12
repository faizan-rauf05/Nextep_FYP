"use client";

import { useState, useEffect } from "react";
import { Mic, Send, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(0,99,196,0.25)",
  backdropFilter: "blur(8px)",
  borderRadius: "1rem",
};

const pageBackground: React.CSSProperties = {
  background:
    "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)",
  minHeight: "100vh",
};

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

    return () => {
      document.body.removeChild(script);
    };
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
          studentId,
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

  // 💬 Send Message
  const sendMessage = () => {
    if (!message.trim()) return;

    handleBooking(message);
    setMessage("");
  };

  return (
    <div
      className="min-h-screen px-6 py-10 relative overflow-hidden"
      style={pageBackground}
    >
      {/* Background Blobs */}
      <div
        className="pointer-events-none fixed -top-32 -left-32 h-96 w-96 rounded-full blur-3xl -z-10"
        style={{ background: "rgba(0,99,196,0.2)" }}
      />

      <div
        className="pointer-events-none fixed -bottom-32 -right-32 h-96 w-96 rounded-full blur-3xl -z-10"
        style={{ background: "rgba(0,99,196,0.15)" }}
      />

      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">
              AI Booking Assistant
            </h1>

            <p
              className="text-sm mt-1"
              style={{ color: "#64748b" }}
            >
              Book counseling sessions using voice or chat
            </p>
          </div>

          <div
            className="h-10 w-10 rounded-xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,99,196,0.3), rgba(0,74,147,0.2))",
              border: "1px solid rgba(0,99,196,0.4)",
            }}
          >
            <Sparkles
              className="h-5 w-5"
              style={{ color: "#60a5fa" }}
            />
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-6 items-start">

          {/* Voice Assistant */}
          <div
            style={glassCard}
            className="p-6 space-y-5"
          >
            {/* Card Header */}
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,99,196,0.3), rgba(0,74,147,0.2))",
                  border: "1px solid rgba(0,99,196,0.4)",
                }}
              >
                <Mic
                  className="h-5 w-5"
                  style={{ color: "#60a5fa" }}
                />
              </div>

              <div>
                <h2 className="font-semibold text-white">
                  Voice Assistant
                </h2>

                <p
                  className="text-xs"
                  style={{ color: "#64748b" }}
                >
                  Speak naturally to book your session
                </p>
              </div>
            </div>

            {/* Widget Container */}
            <div
              className="rounded-2xl p-5 min-h-[600px] overflow-visible flex flex-col"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(0,99,196,0.15)",
              }}
            >
              <div className="w-full h-full flex-1">
                <elevenlabs-convai
                  id="voice_agent"
                  agent-id="agent_4201kp1sm7cmfz1bf56j9wvft7fx"
                />
              </div>
            </div>
          </div>

          {/* Chat Assistant */}
          <div
            style={glassCard}
            className="p-6 space-y-5"
          >
            {/* Card Header */}
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,99,196,0.3), rgba(0,74,147,0.2))",
                  border: "1px solid rgba(0,99,196,0.4)",
                }}
              >
                <Bot
                  className="h-5 w-5"
                  style={{ color: "#60a5fa" }}
                />
              </div>

              <div>
                <h2 className="font-semibold text-white">
                  Chat Assistant
                </h2>

                <p
                  className="text-xs"
                  style={{ color: "#64748b" }}
                >
                  Type your booking request naturally
                </p>
              </div>
            </div>

            {/* Chat Area */}
            <div className="space-y-4">

              {/* Input */}
              <div className="relative">
                <textarea
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Book a career guidance session with Ali tomorrow at 3 PM"
                  className="w-full rounded-2xl p-4 text-sm text-white resize-none outline-none"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(0,99,196,0.25)",
                    color: "white",
                  }}
                />

                <div
                  className="absolute bottom-3 right-3 text-xs"
                  style={{ color: "#64748b" }}
                >
                  AI Powered
                </div>
              </div>

              {/* Send Button */}
              <Button
                onClick={sendMessage}
                disabled={loading}
                className="w-full h-11 border-0 text-white font-semibold"
                style={{
                  background: loading
                    ? "rgba(255,255,255,0.06)"
                    : "linear-gradient(135deg, #0063c4, #004a93)",
                  boxShadow: loading
                    ? "none"
                    : "0 4px 20px rgba(0,99,196,0.4)",
                  color: loading ? "#64748b" : "white",
                }}
              >
                <div className="flex items-center gap-2">
                  <Send className="h-4 w-4" />

                  {loading ? "Booking..." : "Send Message"}
                </div>
              </Button>

              {/* Response */}
              {response && (
                <div
                  className="rounded-2xl p-4 text-sm leading-relaxed"
                  style={{
                    background: "rgba(16,185,129,0.08)",
                    border: "1px solid rgba(16,185,129,0.25)",
                    color: "#d1fae5",
                  }}
                >
                  {response}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Suggestions */}
        {/* <div
          style={glassCard}
          className="p-5 flex items-start gap-4"
        >
          <div
            className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,99,196,0.3), rgba(0,74,147,0.2))",
              border: "1px solid rgba(0,99,196,0.4)",
            }}
          >
            <Sparkles
              className="h-5 w-5"
              style={{ color: "#60a5fa" }}
            />
          </div> */}

          {/* <div>
            <h3 className="text-sm font-semibold text-white mb-1">
              Smart Booking Suggestions
            </h3>

            <p
              className="text-sm leading-relaxed"
              style={{ color: "#64748b" }}
            >
              Try prompts like:
              <span className="text-white">
                {" "}
                “Book interview prep with Sarah next Monday”
              </span>
              {" "}or{" "}
              <span className="text-white">
                “Find a counsellor for resume review tomorrow evening”
              </span>
            </p>
          </div> */}
        {/* </div> */}
      </div>
    </div>
  );
}