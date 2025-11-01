"use client";

import React, { useState } from "react";
import { Paperclip, Send, Image as ImageIcon, Mic, MicOff, Settings, Brain, CloudUpload, Telescope } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface TypePanelProps {
  onTyping?: (isTyping: boolean) => void;
  onSubmit?: (message: string) => void;
  responseMode?: boolean;
  voiceMode?: boolean;
}

export default function TypePanel({ onTyping, onSubmit, responseMode, voiceMode }: TypePanelProps) {
  const [message, setMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRipple, setShowRipple] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    if (message.trim() && !isSubmitting) {
      setIsSubmitting(true);

      // Immediate navigation - no delays or animations
      if (onSubmit) {
        onSubmit(message);
      } else {
        router.push(`/chat?initialMessage=${encodeURIComponent(message)}`);
      }
      setMessage("");
      setIsSubmitting(false);
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
      <motion.div 
        className="w-full mx-auto"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.7, 
          delay: 0.3,
          ease: [0.34, 1.56, 0.64, 1]
        }}
      >
        <motion.div 
          className="bg-[#1f1f1f]/80 border border-[#404040] rounded-full px-6 py-3 backdrop-blur-sm ring-1 ring-white/10 hover:ring-white/20"
          whileHover={{ scale: 1.02, borderColor: "rgba(106, 158, 164, 0.4)" }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
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
                <Brain className="w-5 h-5" />
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
        </motion.div>
      </motion.div>
    );
  }

  // Normal mode: full type panel
  return (
    <div className={responseMode ? "" : "w-full mx-auto mt-16"}>
      <motion.div 
        className={`border rounded-3xl p-2 max-w-2xl relative ring-1 gpu-accelerated ${
          message.trim() ? 'border-[#6a9ea4]/40 ring-[#6a9ea4]/30 animate-typing-glow' : 'border-[#404040] ring-white/30'
        }`}
        whileHover={{ 
          scale: 1.01,
          borderColor: "rgba(106, 158, 164, 0.5)"
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Textarea with smooth transitions */}
        <motion.textarea
          value={message}
          onChange={handleChange}
          className={`w-full bg-transparent resize-none outline-none border-none focus:outline-none focus:bg-transparent min-h-[56px] pl-1 pr-4 pt-2 pb-2 text-base leading-relaxed font-sans font-medium tracking-wide placeholder:text-gray-400 placeholder:opacity-80 placeholder:font-normal transition-all duration-200 ${
            message ? 'text-white' : 'text-gray-500'
          }`}
          placeholder="Type here to start the Zeroing…"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          disabled={isSubmitting}
        />

        <motion.div 
          className="flex items-center justify-between mt-3"
        >
          {/* Left icons with hover effects */}
          <div className="flex items-center gap-3">
            <motion.button 
              className="text-white hover:text-gray-300 transition-colors p-1"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Brain className="w-5 h-5" />
            </motion.button>
            <motion.button 
              className="text-white hover:text-gray-300 transition-colors p-1"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <CloudUpload className="w-5 h-5" />
            </motion.button>
            <motion.button 
              className="text-white hover:text-gray-300 transition-colors p-1"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Telescope className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Right icons with animations */}
          <div className="flex items-center gap-3">
            <motion.button 
              className="text-white hover:text-gray-300 transition-colors p-1"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mic className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={handleSubmit}
              disabled={!message.trim() || isSubmitting}
              className={`p-1 rounded-3xl transition-all duration-200 border flex items-center justify-center ${
                message.trim() && !isSubmitting
                  ? "text-[#6a9ea4] border-[#6a9ea4] hover:text-[#5a8e94] hover:border-[#5a8e94]"
                  : "bg-[#2d2d2d] text-gray-400 border-[#404040] cursor-not-allowed"
              }`}
              whileHover={message.trim() && !isSubmitting ? { scale: 1.05 } : {}}
              whileTap={message.trim() && !isSubmitting ? { scale: 0.95 } : {}}
            >
              <svg 
                className="w-5 h-5" 
                viewBox="0 0 20 20" 
                fill="none"
              >
                <path d="M5 10L15 10M10 5L15 10L10 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
