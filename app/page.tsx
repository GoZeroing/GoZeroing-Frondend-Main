"use client";

import React, { useState, useEffect } from 'react';
import TypePanel from "@/components/TypePanel";
import ParticleField from "@/components/ParticleField";
import { useAudioSetup } from "@/hooks/useAudioSetup";
import { useVoiceRecognition } from "@/hooks/useVoiceRecognition";
import { Instrument_Serif } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
});

interface ChatHistory {
  id: string;
  title: string;
  timestamp: string;
  query: string;
  response: string;
}

export default function Home() {
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const router = useRouter();

  const audioRefs = useAudioSetup();
  const { voiceState, toggleListening } = useVoiceRecognition(audioRefs);

  // Reset all states to clean initial values on mount
  useEffect(() => {
    setIsTyping(false);
    setIsVoiceActive(false);
    setIsConnected(false);

    return () => {
      setIsTyping(false);
      setIsVoiceActive(false);
    };
  }, []);

  useEffect(() => {
    if (isTyping && voiceState.isListening) {
      toggleListening();
    }
  }, [isTyping, voiceState.isListening, toggleListening]);

  useEffect(() => {
    const connectionTimer = setTimeout(() => {
      setIsConnected(true);
    }, 1500);

    return () => clearTimeout(connectionTimer);
  }, []);

  // Navigate to /voice page and auto-start particle field
  const openParticleField = () => {
    router.push("/voice?autoStart=true");
  };

  const handleSubmit = async (message: string) => {
    router.push(`/chat?initialMessage=${encodeURIComponent(message)}`);
  };

  const handleVoiceSubmit = () => {
    if (voiceMessage.trim()) {
      handleSubmit(voiceMessage);
      setVoiceMessage("");
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#1a1a1a] overflow-hidden">
      {/* Go Zeroing Brand Name - Top Left */}
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
          <div
            className={`relative w-full gpu-accelerated transition-all duration-500`}
            style={{
              height: isTyping ? '100%' : '400px',
              opacity: isTyping ? 0.3 : 1,
              transform: isTyping ? 'scale(1.1)' : 'scale(1)',
              pointerEvents: isTyping ? 'none' : 'auto',
              marginLeft: '-36px'
            }}
          >
            <ParticleField
              isListening={voiceState.isListening}
              isSpeaking={voiceState.isSpeaking}
              volume={voiceState.volume}
              frequency={voiceState.frequency}
              isVoiceActive={isVoiceActive}
              voiceMessage={voiceMessage}
              onVoiceMessageChange={setVoiceMessage}
              onVoiceSubmit={handleVoiceSubmit}
              isMuted={isMuted}
              onMuteToggle={() => setIsMuted(!isMuted)}
              showVoiceUI={false}
            />

            {/* Orb Click Area - Circular region over the orb */}
            {!isTyping && (
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full cursor-pointer z-10 hover:scale-110 transition-transform"
                onClick={openParticleField}
                style={{
                  background: 'transparent',
                  borderRadius: '50%'
                }}
              />
            )}

            {!isTyping && !isVoiceActive && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 premium-blur premium-border opacity-0 hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-sm font-medium">Click to start voice session</p>
                </div>
              </div>
            )}
          </div>

          <div
            className="flex-1 flex flex-col items-center relative z-20"
            style={{
              justifyContent: 'flex-start',
              paddingTop: 16
            }}
          >
            {/* Voice Active Message */}
            {isVoiceActive && (
              <div className="text-center mb-8">
                <p className="text-gray-400 text-lg font-medium animate-pulse">
                  Listening...
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Speak your question
                </p>
              </div>
            )}

            <div
              className="relative z-20 w-full max-w-[750px] px-4 gpu-accelerated transition-all duration-500"
              style={{
                transform: `translateY(${isVoiceActive ? 256 : -64}px)`,
                opacity: isVoiceActive ? 0 : 1,
                pointerEvents: isVoiceActive ? 'none' : 'auto'
              }}
            >
              <TypePanel
                onTyping={setIsTyping}
                onSubmit={handleSubmit}
                voiceMode={isVoiceActive}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}