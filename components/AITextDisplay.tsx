'use client';

interface AITextDisplayProps {
  text: string;
}

export const AITextDisplay: React.FC<AITextDisplayProps> = ({ text }) => {
  if (!text) return null;
  
  return (
    <div className="
      absolute bottom-48 w-4/5 max-w-2xl
      text-center text-white text-xl font-medium 
      leading-relaxed transition-opacity duration-600 
      z-30 tracking-wide
      bg-black/30 backdrop-blur-sm 
      rounded-2xl p-6
      border border-white/10
    ">
      {text}
    </div>
  );
};