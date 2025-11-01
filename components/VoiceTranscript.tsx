'use client';

import { motion, AnimatePresence } from "framer-motion";

interface VoiceTranscriptProps {
  text: string;
  isAISpeaking?: boolean;
  userQuery?: string;
}

export const VoiceTranscript: React.FC<VoiceTranscriptProps> = ({ 
  text, 
  isAISpeaking,
  userQuery 
}) => {
  return (
    <AnimatePresence mode="wait">
      {(text || userQuery) && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="max-w-3xl w-full"
            initial={{ y: 20, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -20, scale: 0.95 }}
            transition={{ 
              duration: 0.5,
              ease: [0.34, 1.56, 0.64, 1]
            }}
          >
            {/* User Query Display */}
            <AnimatePresence>
              {userQuery && (
                <motion.div
                  className="mb-6 text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="inline-block bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-3">
                    <p className="text-white/60 text-sm font-medium mb-1">You asked:</p>
                    <p className="text-white text-lg font-normal">{userQuery}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* AI Response Display */}
            <AnimatePresence>
              {text && (
                <motion.div
                  className="bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.4,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                >
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6a9ea4]/5 via-transparent to-purple-500/5 opacity-50" />
                  
                  {/* Speaking indicator */}
                  {isAISpeaking && (
                    <motion.div 
                      className="absolute top-4 right-4 flex items-center gap-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1 h-4 bg-[#6a9ea4] rounded-full"
                            animate={{
                              scaleY: [1, 1.5, 1],
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
                      <span className="text-[#6a9ea4] text-sm font-medium">Speaking...</span>
                    </motion.div>
                  )}

                  {/* AI Text Content */}
                  <motion.div 
                    className="relative z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  >
                    <p className="text-white text-lg leading-relaxed font-normal tracking-wide whitespace-pre-wrap">
                      {text}
                    </p>
                  </motion.div>

                  {/* Decorative elements */}
                  <div className="absolute -bottom-2 -right-2 w-32 h-32 bg-[#6a9ea4]/10 rounded-full blur-3xl" />
                  <div className="absolute -top-2 -left-2 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
