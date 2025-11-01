"use client";

import React from "react";

interface Card {
  id: number;
  title: string;
  description: string;
  size: "small" | "medium" | "large" | "tall";
}

const cards: Card[] = [
  {
    id: 1,
    title: "Quick Start",
    description: "Begin your journey with GoZeroing",
    size: "medium",
  },
  {
    id: 2,
    title: "Documentation",
    description: "Learn about all features",
    size: "small",
  },
  {
    id: 3,
    title: "Advanced Features",
    description: "Explore powerful capabilities",
    size: "large",
  },
  {
    id: 4,
    title: "Community",
    description: "Join our growing community",
    size: "medium",
  },
  {
    id: 5,
    title: "API Reference",
    description: "Complete API documentation",
    size: "tall",
  },
  {
    id: 6,
    title: "Examples",
    description: "Real-world use cases",
    size: "medium",
  },
];

function Card({ card }: { card: Card }) {
  const sizeClasses = {
    small: "h-32",
    medium: "h-40",
    large: "h-56",
    tall: "h-64",
  };

  return (
    <div
      className={`
        ${sizeClasses[card.size]}
        bg-[#2d2d2d] rounded-xl border border-[#404040] p-6
        hover:bg-[#333] hover:border-[#505050]
        transition-all duration-300 cursor-pointer
        group overflow-hidden relative
      `}
    >
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
          {card.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {card.description}
        </p>
      </div>

      {/* Bottom Right Indicator */}
      <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-gray-600 group-hover:bg-primary transition-colors duration-300" />
    </div>
  );
}

export default function CardGrid() {
  return (
    <div className="w-full px-8">
      <div className="border border-[#333] rounded-2xl p-6 bg-[#1a1a1a] overflow-auto scrollbar-hide max-h-[600px]">
        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;  /* Chrome, Safari and Opera */
          }
          .scrollbar-hide:hover::-webkit-scrollbar,
          .scrollbar-hide:focus::-webkit-scrollbar {
            display: block;
            width: 8px;
            height: 8px;
          }
          .scrollbar-hide:hover::-webkit-scrollbar-track,
          .scrollbar-hide:focus::-webkit-scrollbar-track {
            background: #1a1a1a;
          }
          .scrollbar-hide:hover::-webkit-scrollbar-thumb,
          .scrollbar-hide:focus::-webkit-scrollbar-thumb {
            background: #404040;
            border-radius: 4px;
          }
          .scrollbar-hide:hover::-webkit-scrollbar-thumb:hover,
          .scrollbar-hide:focus::-webkit-scrollbar-thumb:hover {
            background: #505050;
          }
        `}</style>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-min">
          {/* Column 1: Stacked cards */}
          <div className="space-y-3">
            <div className="h-36 bg-[#2d2d2d] rounded-xl border border-[#404040] hover:bg-[#333] hover:border-[#505050] transition-all duration-300 cursor-pointer group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </div>
            <div className="h-52 bg-[#2d2d2d] rounded-xl border border-[#404040] hover:bg-[#333] hover:border-[#505050] transition-all duration-300 cursor-pointer group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </div>
            <div className="h-40 bg-[#2d2d2d] rounded-xl border border-[#404040] hover:bg-[#333] hover:border-[#505050] transition-all duration-300 cursor-pointer group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </div>
          </div>

          {/* Column 2: Tall cards */}
          <div className="space-y-3">
            <div className="h-[356px] bg-[#2d2d2d] rounded-xl border border-[#404040] hover:bg-[#333] hover:border-[#505050] transition-all duration-300 cursor-pointer group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </div>
            <div className="h-48 bg-[#2d2d2d] rounded-xl border border-[#404040] hover:bg-[#333] hover:border-[#505050] transition-all duration-300 cursor-pointer group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </div>
          </div>

          {/* Column 3: Stacked cards */}
          <div className="space-y-3">
            <div className="h-52 bg-[#2d2d2d] rounded-xl border border-[#404040] hover:bg-[#333] hover:border-[#505050] transition-all duration-300 cursor-pointer group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </div>
            <div className="h-36 bg-[#2d2d2d] rounded-xl border border-[#404040] hover:bg-[#333] hover:border-[#505050] transition-all duration-300 cursor-pointer group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </div>
            <div className="h-44 bg-[#2d2d2d] rounded-xl border border-[#404040] hover:bg-[#333] hover:border-[#505050] transition-all duration-300 cursor-pointer group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </div>
          </div>

          {/* Column 4: Tall cards */}
          <div className="space-y-3">
            <div className="h-[356px] bg-[#2d2d2d] rounded-xl border border-[#404040] hover:bg-[#333] hover:border-[#505050] transition-all duration-300 cursor-pointer group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </div>
            <div className="h-48 bg-[#2d2d2d] rounded-xl border border-[#404040] hover:bg-[#333] hover:border-[#505050] transition-all duration-300 cursor-pointer group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
