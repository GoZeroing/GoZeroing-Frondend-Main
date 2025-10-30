'use client';

interface AIButtonProps {
  isSpeaking: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const AIButton: React.FC<AIButtonProps> = ({ isSpeaking, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        absolute bottom-24 left-1/2 transform -translate-x-1/2 
        px-8 py-4 text-base font-semibold text-white 
        bg-gradient-to-br from-purple-500 to-purple-700 
        border-2 border-white/20 rounded-full 
        cursor-pointer transition-all duration-300 
        shadow-lg shadow-purple-500/40 
        hover:scale-105 hover:shadow-xl hover:shadow-purple-500/60 
        active:scale-95 
        disabled:opacity-50 disabled:cursor-not-allowed 
        z-20
      "
    >
      {isSpeaking ? 'AI Speaking...' : 'Let AI Speak'}
    </button>
  );
};