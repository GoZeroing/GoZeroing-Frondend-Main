"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from "@/components/Sidebar";
import TypePanel from "@/components/TypePanel";
import ParticleField from "@/components/ParticleField";
import { VoiceTranscript } from "@/components/VoiceTranscript";
import { ConversationThread } from "@/components/ConversationThread";
import { ConversationIndicator } from "@/components/ConversationIndicator";
import { useAudioSetup } from "@/hooks/useAudioSetup";
import { useVoiceRecognition } from "@/hooks/useVoiceRecognition";
import { useAIChat } from "@/hooks/useAIChat";
import { useAISpeech } from "@/hooks/useAISpeech";
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
  const [aiText, setAiText] = useState("");
  const [currentUserQuery, setCurrentUserQuery] = useState("");
  const [isInConversation, setIsInConversation] = useState(false);
  const router = useRouter();

  const audioRefs = useAudioSetup();
  const { voiceState, setVoiceState, toggleListening } = useVoiceRecognition(audioRefs);
  const { messages, isProcessing, sendMessage } = useAIChat();
  const { simulateAISpeech } = useAISpeech(
    voiceState,
    setVoiceState,
    setAiText,
    () => {},
    audioRefs
  );

  // Reset all states to clean initial values on mount
  useEffect(() => {
    setIsTyping(false);
    setIsVoiceActive(false);
    setIsConnected(false); // Reset connection state

    // Cleanup function to reset states on unmount
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

  // Simulate connection delay - only run once after reset
  useEffect(() => {
    const connectionTimer = setTimeout(() => {
      setIsConnected(true);
    }, 1500); // Reduced to 1.5 seconds for better UX

    return () => clearTimeout(connectionTimer);
  }, []); // Empty dependency array ensures it only runs once

  const handleParticleFieldClick = () => {
    if (!isTyping && !voiceState.isSpeaking) {
      if (!voiceState.isListening) {
        toggleListening();
        setIsVoiceActive(true);
      } else {
        toggleListening();
        setIsVoiceActive(false);
      }
    }
  };

  const handleSubmit = async (message: string) => {
    if (!message.trim()) return;
    
    // Start conversation mode
    setIsInConversation(true);
    setCurrentUserQuery(message);
    setIsVoiceActive(false);
    
    // Stop listening if active
    if (voiceState.isListening) {
      toggleListening();
    }
    
    // Send message to AI chat
    await sendMessage(message);
    
    // Clear query and show AI response after processing
    setTimeout(() => {
      setCurrentUserQuery("");
    }, 1500);
  };

  // Update AI text display when new message arrives
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant' && lastMessage.content) {
        // Set the AI text from the actual message
        setAiText(lastMessage.content);
        
        // Trigger speaking animation
        setVoiceState(prev => ({ ...prev, isSpeaking: true }));
        
        // Clear after speaking duration
        setTimeout(() => {
          setVoiceState(prev => ({ ...prev, isSpeaking: false }));
        }, 5000);
        
        // Clear text after display
        setTimeout(() => {
          setAiText("");
        }, 8000);
      }
    }
  }, [messages, setVoiceState]);


  return (
    <div className="flex h-screen w-screen bg-[#1a1a1a] overflow-hidden">
      {/* Conversation Indicator */}
      <ConversationIndicator 
        isActive={isInConversation}
        messageCount={messages.length}
      />

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
          <div className={`relative w-full gpu-accelerated transition-all duration-500`}
            style={{ 
              height: isTyping ? '100%' : '400px',
              opacity: isTyping ? 0.3 : 1,
              transform: isTyping ? 'scale(1.1)' : 'scale(1)',
              pointerEvents: isTyping ? 'none' : 'auto'
            }}
          >
            <ParticleField
              isListening={voiceState.isListening}
              isSpeaking={voiceState.isSpeaking}
              volume={voiceState.volume}
              frequency={voiceState.frequency}
            />
            
            {/* Voice Transcript - AI Response Display */}
            <VoiceTranscript 
              text={aiText}
              isAISpeaking={voiceState.isSpeaking}
              userQuery={currentUserQuery}
            />
            
            {/* Orb Click Area - Circular region over the orb */}
            {!isTyping && !voiceState.isSpeaking && (
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full cursor-pointer z-10 hover:scale-110 transition-transform"
                onClick={handleParticleFieldClick}
                style={{ 
                  background: 'transparent',
                  borderRadius: '50%'
                }}
              />
            )}
            
            {!isTyping && !isInConversation && !voiceState.isListening && (
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
            {(isVoiceActive || (isInConversation && voiceState.isListening)) && (
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-400 text-lg font-medium animate-pulse">
                  Listening...
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Speak your question
                </p>
              </motion.div>
            )}

            <div 
              className="relative z-20 w-full max-w-[750px] px-4 gpu-accelerated transition-all duration-500"
              style={{
                transform: `translateY(${isVoiceActive || isInConversation ? 256 : -64}px)`,
                opacity: 1
              }}
            >
              <TypePanel 
                onTyping={setIsTyping} 
                onSubmit={handleSubmit}
                voiceMode={isVoiceActive || isInConversation}
              />
            </div>

            
          </div>
        </div>

        {/* Conversation Thread - Message History */}
        <ConversationThread 
          messages={messages}
          isProcessing={isProcessing}
          isVisible={isInConversation && messages.length > 0}
        />
      </main>
    </div>
  );
}