"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ChatAssistant() {
  const [messages, setMessages] = useState<{ user: boolean; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { user: true, text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages([...newMessages, { user: false, text: data.answer }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { user: false, text: "Error: Could not get response." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded p-4 max-w-xl mx-auto">
      <div className="h-80 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={msg.user ? "text-right" : "text-left"}>
            <span
              className={`inline-block p-2 rounded ${
                msg.user ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about your roadmap..."
        />
        <Button onClick={sendMessage} disabled={loading}>
          {loading ? "..." : "Send"}
        </Button>
      </div>
    </div>
  );
}