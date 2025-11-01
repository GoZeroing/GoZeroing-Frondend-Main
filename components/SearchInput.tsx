"use client";

import React, { useState } from "react";
import { Search, Image, Mic, ArrowRight } from "lucide-react";
import FocusSelector from "./FocusSelector";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        className={`
          relative bg-[#2d2d2d] rounded-2xl transition-all duration-200
          ${isFocused ? 'ring-2 ring-primary/50' : 'ring-1 ring-border'}
        `}
      >
        {/* Input Container */}
        <div className="flex items-center gap-3 px-4 py-3">
          {/* Search Icon */}
          <button className="flex-shrink-0 text-gray-400 hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>

          {/* Image Upload Icon */}
          <button className="flex-shrink-0 text-gray-400 hover:text-white transition-colors">
            <Image className="w-5 h-5" />
          </button>

          {/* Focus Selector */}
          <div className="flex-shrink-0">
            <FocusSelector />
          </div>

          {/* Input Field */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask anything. Type @ for mentions."
            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-[15px]"
          />

          {/* Right Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Attach Icon */}
            <button className="text-gray-400 hover:text-white transition-colors">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5 3.5L4.5 9.5C3.67157 10.3284 3.67157 11.6716 4.5 12.5C5.32843 13.3284 6.67157 13.3284 7.5 12.5L13.5 6.5C15.1569 4.84315 15.1569 2.15685 13.5 0.5C11.8431 -1.15685 9.15685 -1.15685 7.5 0.5L1.5 6.5C-0.5 8.5 -0.5 11.5 1.5 13.5C3.5 15.5 6.5 15.5 8.5 13.5L14.5 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform="translate(2.5, 3)"
                />
              </svg>
            </button>

            {/* Code Icon */}
            <button className="text-gray-400 hover:text-white transition-colors">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 4L2 10L6 16M14 4L18 10L14 16M11 2L9 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Mic Icon */}
            <button className="text-gray-400 hover:text-white transition-colors">
              <Mic className="w-5 h-5" />
            </button>

            {/* Submit Button */}
            <button
              className={`
                w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200
                ${query.trim() 
                  ? 'bg-primary hover:bg-primary-hover text-white' 
                  : 'bg-secondary text-gray-500 cursor-not-allowed'
                }
              `}
              disabled={!query.trim()}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
