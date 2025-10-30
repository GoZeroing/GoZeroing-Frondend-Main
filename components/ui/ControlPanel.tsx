'use client';

import { Settings, Phone, PhoneOff } from 'lucide-react';

interface ControlPanelProps {
  isListening: boolean;
  onToggleListening: () => void;
  onSettings: () => void;
}

export default function ControlPanel({
  isListening,
  onToggleListening,
  onSettings
}: ControlPanelProps) {
  return (
    <>
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm text-center">
        {isListening
          ? 'Listening... Speak now'
          : 'Click the microphone to start'
        }
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 items-center">
        <button
          className={`
            flex items-center justify-center w-12 h-12 rounded-full border-none cursor-pointer 
            transition-all duration-300 ease-in-out backdrop-blur-md
            ${isListening 
              ? 'bg-gradient-to-br from-red-500/90 to-orange-500/90 border border-red-400/50' 
              : 'bg-gradient-to-br from-green-500/90 to-blue-500/90 border border-green-400/50'
            }
            hover:scale-110 hover:shadow-lg hover:shadow-white/30 active:scale-95
          `}
          onClick={onToggleListening}
          title={isListening ? 'Stop listening' : 'Start listening'}
        >
          {isListening ? (
            <PhoneOff size={20} className="text-white" />
          ) : (
            <Phone size={20} className="text-white" />
          )}
        </button>

        <button
          className="
            flex items-center justify-center w-12 h-12 rounded-full border-none cursor-pointer 
            transition-all duration-300 ease-in-out backdrop-blur-md
            bg-white/10 border border-white/20
            hover:scale-110 hover:shadow-lg hover:shadow-white/30 active:scale-95
          "
          onClick={onSettings}
          title="Settings"
        >
          <Settings size={20} className="text-white" />
        </button>
      </div>
    </>
  );
}