"use client";

import React, { useState } from "react";
import { Home, Plus, Clock, ChevronRight, User } from "lucide-react";
import Logo from "./Logo";

interface SidebarProps {
  onNewChat?: () => void;
  onSelectHistory?: (id: string) => void;
  history?: Array<{ id: string; title: string; timestamp: string }>;
  currentChatId?: string;
}

export default function Sidebar({ onNewChat, onSelectHistory, history = [], currentChatId }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  return (
    <aside 
      className={`h-screen bg-[#1a1a1a] border-r border-[#2a2a2a] flex flex-col transition-all duration-300 ease-out ${
        isExpanded ? 'w-[240px]' : 'w-[72px]'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => {
        setIsExpanded(false);
        setShowHistory(false);
      }}
    >
      {/* Logo */}
      <div className="pt-5 pb-4 px-4 flex items-center justify-center">
        <Logo />
      </div>

      {/* New Chat Button */}
      <div className="px-4 mb-5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNewChat();
          }}
          className="w-full h-10 flex items-center justify-center gap-2.5 px-3 rounded-lg bg-[#1f1f1f] hover:bg-[#252525] text-gray-400 hover:text-white transition-all duration-200 group border border-[#2a2a2a] hover:border-[#333333]"
          aria-label="New chat"
        >
          <Plus className="w-4 h-4 flex-shrink-0 transition-colors duration-200" />
          {isExpanded && (
            <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              New Chat
            </span>
          )}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 w-full px-3 overflow-y-auto scrollbar-hide">
        {/* Home Button */}
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-gray-400 hover:text-gray-200 hover:bg-[#252525] transition-all duration-200 group"
        >
          <Home className="w-4 h-4 flex-shrink-0" />
          {isExpanded && (
            <>
              <span className="text-sm font-medium flex-1 text-left whitespace-nowrap">Home</span>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 text-gray-500 ${
                showHistory ? 'rotate-90' : ''
              }`} />
            </>
          )}
        </button>

        {/* History List */}
        {isExpanded && showHistory && history.length > 0 && (
          <div className="ml-1 mt-1 space-y-0.5 animate-in slide-in-from-top-2 duration-200">
            {history.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectHistory?.(item.id)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-all duration-200 group ${
                  currentChatId === item.id
                    ? 'bg-[#252525] text-white'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-[#1f1f1f]'
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0 opacity-70"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate leading-tight">{item.title}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Empty State */}
        {isExpanded && showHistory && history.length === 0 && (
          <div className="ml-1 mt-2 px-2 py-3 text-xs text-gray-600 text-center">
            No conversations yet
          </div>
        )}
      </nav>

      {/* Bottom Section */}
      <div className="px-3 py-3 border-t border-[#2a2a2a]">
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-[#252525] flex items-center justify-center">
            <User className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </aside>
  );
}
