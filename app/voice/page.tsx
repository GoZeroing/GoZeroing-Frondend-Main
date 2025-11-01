"use client";

import React, { useState, useEffect, Suspense } from "react";
import ParticleField from "@/components/ParticleField";
import VoiceVisualizer from "@/components/VoiceVisualizer";
import { AITextDisplay } from "@/components/AITextDisplay";
import { useAudioSetup } from "@/hooks/useAudioSetup";
import { useVoiceRecognition } from "@/hooks/useVoiceRecognition";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Instrument_Serif } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
});

function VoiceContent() {
  const [aiText, setAiText] = useState("");
  const [autoStarted, setAutoStarted] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [voiceMessage, setVoiceMessage] = useState("");

  const audioRefs = useAudioSetup();
  const { voiceState, toggleListening, stopListening } = useVoiceRecognition(audioRefs);

  const router = useRouter();
  const searchParams = useSearchParams();

  const fromHome = searchParams.get("autoStart") === "true";

  // Auto-start listening when coming from home page
  useEffect(() => {
    if (fromHome && !autoStarted && !voiceState.isListening) {
      const timer = setTimeout(() => {
        toggleListening();
        setAutoStarted(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [fromHome, autoStarted, voiceState.isListening, toggleListening]);

  // Handle ESC key to go home
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // Stop listening before navigating
        if (voiceState.isListening && stopListening) {
          stopListening();
        }
        router.push("/");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, voiceState.isListening, stopListening]);

  useEffect(() => {
    const connectionTimer = setTimeout(() => {
      setIsConnected(true);
    }, 1500);

    return () => clearTimeout(connectionTimer);
  }, []);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(loadingTimer);
  }, []);

  const handleVoiceSubmit = () => {
    if (voiceMessage.trim()) {
      console.log("Submitting message:", voiceMessage);
      setVoiceMessage("");
    }
  };

  // FIX 2: Toggle listening when clicking orb (stay on voice page)
  const handleOrbClick = () => {
    toggleListening();
  };

  // FIX 2: Handle close button click
  const handleCloseClick = () => {
    // Stop listening if active
    if (voiceState.isListening && stopListening) {
      stopListening();
    }
    // Navigate to home
    router.push("/");
  };

  return (
    <div className="flex h-screen w-screen bg-[#1a1a1a] overflow-hidden">
      <div className="fixed top-6 left-[88px] z-40">
        <h1 className={`${instrumentSerif.className} text-2xl font-bold text-white/90 tracking-wide flex items-center`}>
          <AnimatePresence mode="wait">
            {isConnected ? (
              <motion.span
                key="connected"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center"
              >
                Go Zeroing
                {voiceState.isListening && (
                  <span
                    className="inline-block w-0.5 h-6 bg-white/70 ml-1 animate-pulse"
                  />
                )}
              </motion.span>
            ) : (
              <motion.span
                key="connecting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center"
              >
                Connecting
                <span
                  className="inline-block w-0.5 h-6 bg-white/70 ml-1 animate-pulse"
                />
              </motion.span>
            )}
          </AnimatePresence>
        </h1>
      </div>

      <main className="flex-1 flex flex-col overflow-hidden relative pl-[72px]">
        <div className="flex-1 flex flex-col">
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center z-50 bg-[#1a1a1a]"
              >
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="w-12 h-12 text-white/60 animate-spin" />
                  <div className="flex items-center">
                    <p className="text-white/60 text-lg font-medium">Connecting</p>
                    <span className="inline-block w-0.5 h-6 bg-white/70 ml-1 animate-pulse" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!isLoading && (
            <>
              {/* Particle Field Container - SAME as home page */}
              <div
                className="relative w-full"
                style={{
                  height: '50vh',
                  minHeight: '400px',
                  maxHeight: '600px'
                }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <ParticleField
                    isListening={voiceState.isListening}
                    isSpeaking={voiceState.isSpeaking}
                    volume={voiceState.volume}
                    frequency={voiceState.frequency}
                    isVoiceActive={true}
                    voiceMessage={voiceMessage}
                    onVoiceMessageChange={setVoiceMessage}
                    onVoiceSubmit={handleVoiceSubmit}
                    isMuted={false}
                    onMuteToggle={() => {}}
                    showVoiceUI={true}
                    aiText={aiText}
                    setAiText={setAiText}
                  />
                </motion.div>

                {/* VoiceVisualizer centered in the sphere area */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                >
                  <VoiceVisualizer onToggleListening={toggleListening} />
                </motion.div>

                {/* Close button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  onClick={handleCloseClick}
                  className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200 backdrop-blur-md border border-white/20 z-30 premium-blur premium-border pointer-events-auto"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </motion.button>

                {/* FIX 2: Clickable orb area - goes to home WITHOUT staying on voice page */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full cursor-pointer z-10 hover:scale-110 transition-transform pointer-events-auto"
                  onClick={handleOrbClick}
                  style={{
                    background: 'transparent',
                    borderRadius: '50%'
                  }}
                />

                {/* Hover hint */}
                {!voiceState.isListening && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <div className="bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 premium-blur premium-border transition-all duration-300">
                      <p className="text-white text-sm font-medium">Click orb to return home</p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Content area below - AI Text and Input Box */}
              <div className="flex-1 relative z-20 flex flex-col items-center px-6" style={{ paddingTop: '4rem' }}>
                {/* AI Text Display - Fixed height container to prevent input shifting */}
                <div className="w-full max-w-3xl mb-8" style={{ minHeight: '80px' }}>
                  {aiText && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-center space-y-2">
                        <p className="text-white text-lg font-medium leading-relaxed line-clamp-2">
                          {aiText}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Voice Input Box - Fixed position */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="w-full max-w-3xl bg-[#1f1f1f]/90 border border-[#404040] rounded-full px-6 py-3 backdrop-blur-md flex items-center gap-4"
                >
                  <div className="flex-1 relative min-w-0">
                    <input
                      type="text"
                      value={voiceMessage}
                      onChange={(e) => setVoiceMessage(e.target.value)}
                      className="w-full bg-transparent text-base text-white placeholder:text-gray-400 font-medium focus:outline-none"
                      placeholder="Type a follow-up..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleVoiceSubmit();
                        }
                      }}
                      autoComplete="off"
                      spellCheck="false"
                    />
                  </div>

                  <button
                    onClick={handleVoiceSubmit}
                    className="bg-[#6a9ea4] hover:bg-[#5a8e94] text-white p-2 rounded-full transition-all duration-200 flex-shrink-0"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </motion.div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default function VoicePage() {
  return (
    <Suspense fallback={
      <div className="w-screen h-screen bg-[#1a1a1a] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white/40 animate-spin" />
      </div>
    }>
      <VoiceContent />
    </Suspense>
  );
}