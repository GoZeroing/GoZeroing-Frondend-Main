"use client";

import React, { useState, useRef, useEffect } from "react";

interface FocusOption {
  id: string;
  label: string;
  description: string;
}

const focusOptions: FocusOption[] = [
  {
    id: "writing",
    label: "Writing",
    description: "Get help with writing tasks",
  },
  {
    id: "wolfram",
    label: "Wolfram",
    description: "Computational knowledge",
  },
  {
    id: "youtube",
    label: "YouTube",
    description: "Search video content",
  },
  {
    id: "reddit",
    label: "Reddit",
    description: "Community discussions",
  },
  {
    id: "academic",
    label: "Academic",
    description: "Scholarly research",
  },
];

export default function FocusSelector() {
  const [selectedFocus, setSelectedFocus] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-transparent hover:bg-[#3a3a3a] transition-all duration-200"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary"
        >
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="8" cy="8" r="2" fill="currentColor" />
        </svg>
        <span className="text-xs font-medium text-gray-300">
          {selectedFocus
            ? focusOptions.find((opt) => opt.id === selectedFocus)?.label
            : "Focus"}
        </span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path
            d="M2.5 4L5 6.5L7.5 4"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-[#1f1f1f] border border-[#333] rounded-lg shadow-2xl overflow-hidden z-50 animate-fadeIn">
          {/* Header */}
          <div className="px-3.5 py-2.5 border-b border-[#2d2d2d]">
            <h3 className="text-xs font-semibold text-white">Choose a Focus</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Select how you want to search
            </p>
          </div>

          {/* Options List */}
          <div className="py-1.5">
            {focusOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  setSelectedFocus(option.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full px-3.5 py-2.5 flex items-start gap-2.5 transition-all duration-200
                  ${
                    selectedFocus === option.id
                      ? "bg-primary/10 border-l-2 border-primary"
                      : "hover:bg-[#2a2a2a] border-l-2 border-transparent"
                  }
                `}
              >
                {/* Radio Button */}
                <div className="flex-shrink-0 mt-0.5">
                  <div
                    className={`
                    w-3.5 h-3.5 rounded-full border-[1.5px] flex items-center justify-center transition-all duration-200
                    ${
                      selectedFocus === option.id
                        ? "border-primary bg-primary/20"
                        : "border-gray-500"
                    }
                  `}
                  >
                    {selectedFocus === option.id && (
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-left">
                  <div className="text-[13px] font-medium text-white">
                    {option.label}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5 leading-tight">
                    {option.description}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="px-3.5 py-2.5 border-t border-[#2d2d2d] bg-[#1a1a1a]">
            <button
              onClick={() => {
                setSelectedFocus(null);
                setIsOpen(false);
              }}
              className="text-[11px] text-gray-400 hover:text-primary transition-colors font-medium"
            >
              Clear selection
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
