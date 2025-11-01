'use client';

import { motion, AnimatePresence } from "framer-motion";
import { AIMessage } from "@/types/types";
import { User, Sparkles, Loader2 } from "lucide-react";

interface ConversationThreadProps {
  messages: AIMessage[];
  isProcessing?: boolean;
  isVisible: boolean;
}

export const ConversationThread: React.FC<ConversationThreadProps> = ({ 
  messages, 
  isProcessing,
  isVisible 
}) => {
  if (!isVisible || messages.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-24 right-8 w-96 max-h-[70vh] z-40"
        initial={{ opacity: 0, x: 50, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, x: 50, y: -20 }}
        transition={{ 
          duration: 0.5,
          ease: [0.34, 1.56, 0.64, 1]
        }}
      >
        <div className="bg-black/40 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#6a9ea4]" />
              <h3 className="text-white font-semibold text-lg">Conversation</h3>
            </div>
            <div className="bg-[#6a9ea4]/20 px-3 py-1 rounded-full">
              <span className="text-[#6a9ea4] text-xs font-medium">
                {messages.length} {messages.length === 1 ? 'message' : 'messages'}
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="space-y-4 overflow-y-auto max-h-[calc(70vh-120px)] custom-scrollbar pr-2">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.4 
                }}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#6a9ea4] to-purple-500 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div className={`max-w-[75%] ${message.role === 'user' ? 'order-first' : ''}`}>
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-[#6a9ea4]/20 border border-[#6a9ea4]/30'
                      : 'bg-white/5 border border-white/10'
                  }`}>
                    <p className="text-white text-sm leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-1 px-2">
                    <span className="text-xs text-white/40">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                    {message.isStreaming && (
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-[#6a9ea4] rounded-full animate-pulse" />
                        <div className="w-1 h-1 bg-[#6a9ea4] rounded-full animate-pulse delay-75" />
                        <div className="w-1 h-1 bg-[#6a9ea4] rounded-full animate-pulse delay-150" />
                      </div>
                    )}
                  </div>
                </div>

                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </motion.div>
            ))}

            {/* Processing Indicator */}
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 items-center"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#6a9ea4] to-purple-500 flex items-center justify-center">
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-white/60 text-sm">Thinking</span>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 bg-[#6a9ea4] rounded-full"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
