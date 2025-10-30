'use client';

interface VoiceVisualizerProps {
  onToggleListening: () => void;
}

export default function VoiceVisualizer({ onToggleListening }: VoiceVisualizerProps) {
  return (
    <div 
      className="absolute w-[300px] h-[300px] flex items-center justify-center cursor-pointer"
      onClick={onToggleListening}
    >
      {/* The main particle field is now the only visible element */}
    </div>
  );
} 