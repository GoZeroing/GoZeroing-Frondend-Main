"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from "@/components/Sidebar";
import TypePanel from "@/components/TypePanel";
import ParticleField from "@/components/ParticleField";
import { useAudioSetup } from "@/hooks/useAudioSetup";
import { useVoiceRecognition } from "@/hooks/useVoiceRecognition";
import { Instrument_Serif } from "next/font/google";
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
  const [isResponding, setIsResponding] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [history, setHistory] = useState<ChatHistory[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const audioRefs = useAudioSetup();
  const { voiceState, toggleListening } = useVoiceRecognition(audioRefs);

  useEffect(() => {
    if (isTyping && voiceState.isListening) {
      toggleListening();
    }
  }, [isTyping, voiceState.isListening, toggleListening]);

  // Simulate connection delay
  useEffect(() => {
    const connectionTimer = setTimeout(() => {
      setIsConnected(true);
    }, 2000); // 2 second connection delay

    return () => clearTimeout(connectionTimer);
  }, []);

  const handleParticleFieldClick = () => {
    if (!isTyping && !isResponding) {
      if (!voiceState.isListening) {
        toggleListening();
        setIsVoiceActive(true);
      } else {
        toggleListening();
        setIsVoiceActive(false);
      }
    }
  }

  const handleSubmit = async (message: string) => {
    const chatId = currentChatId || `chat-${Date.now()}`;
    setCurrentChatId(chatId);
    setUserQuery(message);
    setIsResponding(true);
    setIsStreaming(true);
    setAiResponse('');
    setIsVoiceActive(false); // Reset voice active state

    // Simulate AI streaming response
    const fullResponse = "I understand your question. Let me analyze this carefully. Based on the information available, here's what I can tell you: This is a comprehensive response that demonstrates the streaming capability similar to Perplexity AI. The system processes your query, searches through relevant information, and provides a detailed, thoughtful answer in real-time. This creates an engaging user experience where you can see the AI 'thinking' and formulating its response progressively.";
    
    let currentIndex = 0;
    const streamInterval = setInterval(() => {
      if (currentIndex < fullResponse.length) {
        const currentResponse = fullResponse.slice(0, currentIndex + 1);
        setAiResponse(currentResponse);
        currentIndex++;
      } else {
        setIsStreaming(false);
        clearInterval(streamInterval);
        
        // Save to history
        const newHistoryItem: ChatHistory = {
          id: chatId,
          title: message.slice(0, 50) + (message.length > 50 ? '...' : ''),
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          query: message,
          response: fullResponse
        };
        
        setHistory(prev => {
          const existingIndex = prev.findIndex(item => item.id === chatId);
          if (existingIndex >= 0) {
            const updated = [...prev];
            updated[existingIndex] = newHistoryItem;
            return updated;
          }
          return [newHistoryItem, ...prev];
        });
      }
    }, 20);
  };

  const handleNewChat = () => {
    setIsResponding(false);
    setUserQuery('');
    setAiResponse('');
    setIsStreaming(false);
    setCurrentChatId(null);
  };

  const handleSelectHistory = (id: string) => {
    const chat = history.find(item => item.id === id);
    if (chat) {
      setCurrentChatId(id);
      setUserQuery(chat.query);
      setAiResponse(chat.response);
      setIsResponding(true);
      setIsStreaming(false);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-background overflow-hidden">
      {/* Go Zeroing Brand Name - Top Left */}
      <div 
        className={`fixed top-6 z-40 transition-all duration-300 ease-out ${
          sidebarExpanded ? 'left-[260px]' : 'left-[88px]'
        }`}
      >
        <h1 className={`${instrumentSerif.className} text-2xl font-bold text-white/90 tracking-wide flex items-center`}>
          {isConnected ? (
            <>
              Go Zeroing
              {voiceState.isListening && <span className="inline-block w-0.5 h-6 bg-white/70 ml-1 animate-pulse"></span>}
            </>
          ) : (
            <>
              Connecting
              <span className="inline-block w-0.5 h-6 bg-white/70 ml-1 animate-pulse"></span>
              <div className="flex gap-0.5 ml-2">
                <div className="w-1 h-1 bg-white/70 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-white/70 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-1 h-1 bg-white/70 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </>
          )}
        </h1>
      </div>

      <Sidebar 
        onNewChat={handleNewChat}
        onSelectHistory={handleSelectHistory}
        history={history}
        currentChatId={currentChatId || undefined}
        isExpanded={sidebarExpanded}
        onExpandedChange={setSidebarExpanded}
      />

      <main className="flex-1 flex flex-col overflow-hidden relative pl-[72px]">
        {/* AI Response View */}
        {isResponding && (
          <div className="absolute inset-0 z-30 bg-background flex flex-col animate-in fade-in duration-500">
            <div className="flex-1 overflow-y-auto px-8 py-8">
              <div className="max-w-[800px] mx-auto space-y-6">
                {/* User Query */}
                <div className="animate-in slide-in-from-bottom-4 duration-500">
                  <div className="text-gray-400 text-sm mb-2 font-medium">Your Question</div>
                  <div className="text-white text-xl font-sans font-medium leading-relaxed">
                    {userQuery}
                  </div>
                </div>

                {/* AI Response */}
                <div className="animate-in slide-in-from-bottom-4 duration-700 delay-200">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <div className="text-gray-400 text-sm font-medium">Zeroing</div>
                        {isStreaming && (
                          <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-[shimmer_2s_ease-in-out_infinite]"></div>
                          </div>
                        )}
                      </div>
                      {isStreaming && (
                        <div className="flex gap-1">
                          <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></div>
                          <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-gray-300 text-base font-sans leading-relaxed whitespace-pre-wrap">
                    {aiResponse}
                    {isStreaming && <span className="inline-block w-2 h-5 bg-gray-400 ml-1 animate-pulse"></span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Input */}
            <div className="bg-background/95 backdrop-blur-sm animate-in slide-in-from-bottom duration-500 delay-300">
              <div className="max-w-[900px] mx-auto px-8 py-4">
                <TypePanel onTyping={setIsTyping} onSubmit={handleSubmit} responseMode={true} />
              </div>
            </div>
          </div>
        )}

        <div className={`flex-1 flex flex-col z-10 ${isResponding ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'}`}>
          <div 
            className={`relative w-full ${
              isTyping 
                ? 'absolute inset-0 pointer-events-none' 
                : 'h-[400px] hover:opacity-90'
            }`}
          >
            <ParticleField
              isListening={voiceState.isListening}
              isSpeaking={voiceState.isSpeaking}
              volume={voiceState.volume}
              frequency={voiceState.frequency}
            />
            
            {/* Orb Click Area - Circular region over the orb */}
            {!isTyping && (
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full cursor-pointer z-10"
                onClick={handleParticleFieldClick}
                style={{ 
                  background: 'transparent',
                  borderRadius: '50%'
                }}
              />
            )}
            
            {!isTyping && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-medium">Click to start voice session</p>
                </div>
              </div>
            )}
          </div>

          <div className={`flex-1 flex flex-col items-center transition-all duration-700 ease-out ${
            isTyping ? 'justify-center relative z-20' : 'justify-start pt-4'
          }`}>
            
            {/* Voice Active Message */}
            {isVoiceActive && !isResponding && (
              <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                <p className="text-gray-400 text-lg font-medium">Listening...</p>
                <p className="text-gray-500 text-sm mt-2">Speak your question</p>
              </div>
            )}

            <div className={`relative z-20 w-full max-w-[750px] px-4 transition-all duration-700 ease-out ${
              isVoiceActive ? 'translate-y-32' : '-mt-16'
            }`}>
              <TypePanel onTyping={setIsTyping} onSubmit={handleSubmit} />
            </div>

            
          </div>
        </div>
      </main>
    </div>
  );
}