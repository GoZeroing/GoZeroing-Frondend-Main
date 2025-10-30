"use client";

import React, { useState } from "react";
import { Paperclip, Send, Image as ImageIcon, Mic, MicOff, Settings, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation"; // ✅ for navigation

interface TypePanelProps {
  onTyping?: (isTyping: boolean) => void;
  onSubmit?: (message: string) => void; // ✅ optional submit callback
  responseMode?: boolean; // ✅ new prop for response page mode
  voiceMode?: boolean; // ✅ new prop for voice listening mode
}

export default function TypePanel({ onTyping, onSubmit, responseMode, voiceMode }: TypePanelProps) {
  const [message, setMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false);
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

  // Voice mode: compact follow-up input
  if (voiceMode) {
    return (
      <div 
        className="w-full mx-auto"
        style={{
          animation: 'fadeInSlideUp 1s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both'
        }}
      >
        <div className="bg-[#1f1f1f]/80 border border-[#404040] rounded-full px-6 py-3 backdrop-blur-sm ring-1 ring-white/10 hover:ring-white/20"
          style={{
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Left: Follow-up input */}
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-transparent outline-none border-none focus:outline-none focus:border-none focus:ring-0 text-base text-white placeholder:text-gray-500 font-medium"
              placeholder="Type a follow-up..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
            
            {/* Right: Control switches */}
            <div className="flex items-center gap-3">
              {/* Mute toggle */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-white hover:text-gray-300 transition-colors p-2 hover:bg-white/5 rounded-full"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              
              {/* Model selector */}
              <button
                className="text-white hover:text-gray-300 transition-colors p-2 hover:bg-white/5 rounded-full"
                title="Change Model"
              >
                <Sparkles className="w-5 h-5" />
              </button>
              
              {/* Settings */}
              <button
                className="text-white hover:text-gray-300 transition-colors p-2 hover:bg-white/5 rounded-full"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              
              {/* Send button */}
              {message.trim() && (
                <button
                  onClick={handleSubmit}
                  className="bg-primary hover:bg-primary-hover text-white p-2 rounded-full transition-all duration-200"
                >
                  <Send className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Normal mode: full type panel
  return (
    <div className={responseMode ? "" : "w-full mx-auto mt-16"}>
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
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
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
