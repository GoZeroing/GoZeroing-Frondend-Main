"use client";

import React from "react";
import { Baby, Wrench, Sparkles, Heart, Lightbulb } from "lucide-react";

interface CategoryPillProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

function CategoryPill({ icon, label, onClick }: CategoryPillProps) {
  return (
    <button
      onClick={onClick}
      className="
        inline-flex items-center gap-2 px-4 py-2.5 
        bg-[#2d2d2d] hover:bg-[#3a3a3a] 
        border border-border hover:border-gray-600
        rounded-full transition-all duration-200
        text-sm font-medium text-gray-300 hover:text-white
        whitespace-nowrap
      "
    >
      <span className="w-4 h-4 flex-shrink-0">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

export default function CategoryPills() {
  return (
    <div className="w-full max-w-3xl mx-auto mt-4">
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <CategoryPill 
          icon={<Baby className="w-full h-full" />} 
          label="Parenting" 
        />
        <CategoryPill 
          icon={<Wrench className="w-full h-full" />} 
          label="Troubleshoot" 
        />
        <CategoryPill 
          icon={<Sparkles className="w-full h-full" />} 
          label="Perplexity 101" 
        />
        <CategoryPill 
          icon={<Heart className="w-full h-full" />} 
          label="Health" 
        />
        <CategoryPill 
          icon={<Lightbulb className="w-full h-full" />} 
          label="Learn" 
        />
      </div>
    </div>
  );
}
