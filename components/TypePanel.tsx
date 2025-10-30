"use client";

import React, { useState } from "react";
import { Paperclip, Send, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation"; // ✅ for navigation

interface TypePanelProps {
  onTyping?: (isTyping: boolean) => void;
  onSubmit?: (message: string) => void; // ✅ optional submit callback
  responseMode?: boolean; // ✅ new prop for response page mode
}

export default function TypePanel({ onTyping, onSubmit, responseMode }: TypePanelProps) {
  const [message, setMessage] = useState("");
  const router = useRouter(); // ✅ initialize router

  const handleSubmit = () => {
    if (message.trim()) {
      onTyping?.(true);
      onSubmit?.(message);
      console.log("Submitting:", message);
      if (!onSubmit) {
        setTimeout(() => {
          router.push(`/chat?initialMessage=${encodeURIComponent(message)}`);
        }, 500);
      }
      setMessage("");
      onTyping?.(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);

    // Trigger typing callback if needed
    if (value.length === 0 && onTyping) {
      onTyping(false);
    }
  };

  return (
    <div className={responseMode ? "" : "w-full max-w-[640px] mx-auto mt-16"}>
      <div className="bg-[#1f1f1f] border border-[#404040] rounded-2xl p-3 relative backdrop-blur-sm ring-1 ring-white/10 hover:ring-white/20 transition-all duration-300">
        {/* Textarea */}
        <textarea
          value={message}
          onChange={handleChange}
          className={`w-full bg-transparent resize-none outline-none border-none focus:outline-none focus:bg-transparent min-h-[80px] text-base leading-relaxed font-sans font-medium tracking-wide placeholder:text-gray-400 placeholder:opacity-80 placeholder:font-normal transition-all duration-200 ${
            message ? 'text-white' : 'text-gray-500'
          }`}
          placeholder="Type here to start the Zeroing…"
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              handleSubmit();
            }
          }}
        />

        {/* Bottom Actions */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#404040]">
          {/* Left icons */}
          <div className="flex items-center gap-3">
            <button className="text-white hover:text-gray-300 transition-colors p-1">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="10" cy="10" r="2" fill="currentColor" />
              </svg>
            </button>
            <button className="text-white hover:text-gray-300 transition-colors p-1">
              <ImageIcon className="w-5 h-5" />
            </button>
            <button className="text-white hover:text-gray-300 transition-colors p-1">
              <Paperclip className="w-5 h-5" />
            </button>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-3">
            <button className="text-white hover:text-gray-300 transition-colors p-1">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <button className="text-white hover:text-gray-300 transition-colors p-1">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 5v10M5 10h10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button className="text-white hover:text-gray-300 transition-colors p-1">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <button
              onClick={handleSubmit}
              disabled={!message.trim()}
              className={`p-2 rounded-lg transition-all duration-200 ${
                message.trim()
                  ? "bg-primary hover:bg-primary-hover text-white"
                  : "bg-[#2d2d2d] text-gray-400 cursor-not-allowed"
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
