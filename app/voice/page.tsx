"use client";

import React, { useState, useEffect } from "react";
import ParticleField from "@/components/ParticleField";
import VoiceVisualizer from "@/components/VoiceVisualizer";
import { AITextDisplay } from "@/components/AITextDisplay";
import { AIButton } from "@/components/AIButton";
import { useAudioSetup } from "@/hooks/useAudioSetup";
import { useVoiceRecognition } from "@/hooks/useVoiceRecognition";
import { useAISpeech } from "@/hooks/useAISpeech";
import { useRouter } from "next/navigation";

export default function VoicePage() {
  const [aiText, setAiText] = useState("");
  const [fullAiText, setFullAiText] = useState("");

  const audioRefs = useAudioSetup();
  const { voiceState, setVoiceState, toggleListening } = useVoiceRecognition(audioRefs);
  const { simulateAISpeech } = useAISpeech(
    voiceState,
    setVoiceState,
    setAiText,
    setFullAiText,
    audioRefs
  );

  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push("/");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated particle background */}
      <ParticleField
        isListening={voiceState.isListening}
        isSpeaking={voiceState.isSpeaking}
        volume={voiceState.volume}
        frequency={voiceState.frequency}
      />

      {/* Foreground content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <VoiceVisualizer onToggleListening={toggleListening} />
        <AITextDisplay text={aiText} />
        <AIButton
          isSpeaking={voiceState.isSpeaking}
          onClick={simulateAISpeech}
          disabled={voiceState.isSpeaking}
        />
      </div>

      {/* Close Button */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200 backdrop-blur-md border border-white/20 z-30"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 5L5 15M5 5l10 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
