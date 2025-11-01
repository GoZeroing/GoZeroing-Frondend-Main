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
  const [isVoiceActivated, setIsVoiceActivated] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [voiceSessionData, setVoiceSessionData] = useState<{
    id: string;
    startTime: number;
    messages: string[];
    duration: number;
  } | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    visible: boolean;
  }>({ message: "", visible: false });
  const router = useRouter();

  const audioRefs = useAudioSetup();
  const { voiceState, toggleListening } = useVoiceRecognition(audioRefs);

  // Track voice session when activated
  useEffect(() => {
    if (isVoiceActivated && !voiceSessionData) {
      // Start tracking voice session
      setVoiceSessionData({
        id: `voice_${Date.now()}`,
        startTime: Date.now(),
        messages: [],
        duration: 0
      });
    }
  }, [isVoiceActivated, voiceSessionData]);

  // Update session duration
  useEffect(() => {
    if (voiceSessionData && isVoiceActivated) {
      const interval = setInterval(() => {
        setVoiceSessionData(prev => prev ? {
          ...prev,
          duration: Date.now() - prev.startTime
        } : null);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [voiceSessionData, isVoiceActivated]);

  // Stop listening when typing
  useEffect(() => {
    if (isTyping && voiceState.isListening) {
      toggleListening();
    }
  }, [isTyping, voiceState.isListening, toggleListening]);

  // Save voice session as thread
  const saveVoiceSession = () => {
    if (voiceSessionData) {
      const threadData = {
        ...voiceSessionData,
        endTime: Date.now(),
        type: 'voice',
        title: voiceMessage || 'Voice Session',
        lastActivity: new Date().toISOString()
      };

      // Get existing threads from localStorage
      const existingThreads = JSON.parse(localStorage.getItem('voiceThreads') || '[]');
      
      // Add new thread
      existingThreads.unshift(threadData);
      
      // Keep only last 50 threads
      if (existingThreads.length > 50) {
        existingThreads.splice(50);
      }
      
      // Save back to localStorage
      localStorage.setItem('voiceThreads', JSON.stringify(existingThreads));
      
      // Show notification
      setNotification({ message: "Session saved to history", visible: true });
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification({ message: "", visible: false });
      }, 3000);
      
      console.log('Voice session saved as thread:', threadData);
    }
  };

  // Activate voice and toggle listening
  const handleOrbClick = () => {
    if (!isVoiceActivated) {
      setIsVoiceActivated(true);
    }
    toggleListening();
  };

  // End session and save thread
  const handleEndSession = () => {
    saveVoiceSession();
    setIsVoiceActivated(false);
    if (voiceState.isListening) {
      toggleListening();
    }
    setVoiceMessage("");
    setVoiceSessionData(null);
  };

  const handleSubmit = async (message: string) => {
    router.push(`/chat?initialMessage=${encodeURIComponent(message)}`);
  };

  const handleVoiceSubmit = () => {
    if (voiceMessage.trim()) {
      // Add message to session tracking
      if (voiceSessionData) {
        setVoiceSessionData(prev => prev ? {
          ...prev,
          messages: [...prev.messages, voiceMessage.trim()]
        } : null);
      }
      handleSubmit(voiceMessage);
      setVoiceMessage("");
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#1a1a1a] overflow-hidden">
      {/* Go Zeroing Brand Name - Top Left */}
      <div className="fixed top-6 left-[88px] z-40">
        <h1 className={`${instrumentSerif.className} text-2xl font-bold text-white/90 tracking-wide flex items-center`}>
          Go Zeroing
          {voiceState.isListening && (
            <span className="inline-block w-0.5 h-6 bg-white/70 ml-1 animate-pulse" />
          )}
        </h1>
      </div>

      {/* Notification - Top Right */}
      {notification.visible && (
        <div className="fixed top-6 right-4 z-50">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="bg-[#6a9ea4]/90 backdrop-blur-md text-white px-4 py-2 rounded-lg shadow-lg border border-[#6a9ea4]/30"
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">{notification.message}</span>
            </div>
          </motion.div>
        </div>
      )}

      {/* End Session Button - Top Right */}
      {isVoiceActivated && (
        <div className="fixed top-6 right-6 z-40">
          <button
            onClick={handleEndSession}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-200 backdrop-blur-md border border-white/20 hover:border-white/30"
            title="End voice session and save as thread"
          >
            <span className="text-lg font-bold">×</span>
          </button>
        </div>
      )}

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
              isVoiceActive={isVoiceActivated}
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
                onClick={handleOrbClick}
                style={{
                  background: 'transparent',
                  borderRadius: '50%'
                }}
              />
            )}

            {!isTyping && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 premium-blur premium-border opacity-0 hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-sm font-medium">
                    {isVoiceActivated ? "Click to toggle voice" : "Click to activate voice"}
                  </p>
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
            {/* Voice Active Message - Fixed over orb */}
            {isVoiceActivated && (
              <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 z-20 pointer-events-none text-center" style={{ left: 'calc(50% - 95px)' }}>
                <p className="text-gray-400 text-lg font-medium animate-pulse mb-2">
                  {voiceState.isListening ? "Listening..." : "Muted"}
                </p>
                <p className="text-gray-500 text-sm">
                  Speak your question
                </p>
              </div>
            )}

            {/* Follow-up Box - Below voice text */}
            {isVoiceActivated && (
              <div
                className="relative z-20 w-full max-w-[750px] px-4 transition-all duration-500"
                style={{
                  transform: `translateY(280px)`,
                  opacity: 1,
                  pointerEvents: 'auto'
                }}
              >
                <TypePanel
                  onTyping={setIsTyping}
                  onSubmit={handleSubmit}
                  voiceMode={isVoiceActivated}
                />
              </div>
            )}

            {/* Main input when not voice activated */}
            {!isVoiceActivated && (
              <div
                className="relative z-20 w-full max-w-[750px] px-4 gpu-accelerated transition-all duration-500"
                style={{
                  transform: 'translateY(-64px)',
                  opacity: 1,
                  pointerEvents: 'auto'
                }}
              >
                <TypePanel
                  onTyping={setIsTyping}
                  onSubmit={handleSubmit}
                  voiceMode={isVoiceActivated}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}