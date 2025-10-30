"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import TypePanel from "@/components/TypePanel";
import { Instrument_Serif } from "next/font/google";
import { useSearchParams } from "next/navigation";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
});

export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const initialMessage = searchParams.get("initialMessage");

  useEffect(() => {
    if (initialMessage) {
      setMessages([initialMessage]);
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, "Hello! How can I assist you today?"]);
      }, 1000);
    }
  }, [initialMessage]);

  const handleSubmit = (msg: string) => {
    if (!msg.trim()) return;
    // TODO: Connect this to your /api/chat endpoint or OpenAI API
    console.log("Sending to chat endpoint:", msg);
    setMessages((prev) => [...prev, msg]);
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, "That's an interesting question. Let me think about it."]);
    }, 1000);
  };

  return (
    <div
      className={`flex h-screen w-screen bg-background overflow-hidden ${instrumentSerif.className}`}
    >
      <Sidebar />
      <main className="flex-1 flex flex-col items-center justify-between px-4 py-6 relative">
        {/* Chat area */}
        <div className="flex-1 w-full max-w-[640px] overflow-y-auto mb-4 space-y-4 text-white">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full opacity-40">
              <p>Start typing to begin your conversation…</p>
            </div>
          ) : (
            messages.map((m, i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-2xl p-3 border border-[#333]">
                {m}
              </div>
            ))
          )}
        </div>

        {/* Input area */}
        <TypePanel
          onTyping={() => {}}
          onSubmit={handleSubmit}
        />
      </main>
    </div>
  );
}
