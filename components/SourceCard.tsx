"use client";

import React, { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp, Brain, Globe, FileText } from 'lucide-react';
import { Source } from '@/types/types';

interface SourceCardProps {
  sources: Source[];
}

const sourceTypeIcons = {
  web: Globe,
  memory: Brain,
  document: FileText,
};

const sourceTypeColors = {
  web: 'text-blue-400',
  memory: 'text-purple-400',
  document: 'text-green-400',
};

export default function SourceCard({ sources }: SourceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!sources || sources.length === 0) return null;

  const displayedSources = isExpanded ? sources : sources.slice(0, 3);
  const hasMore = sources.length > 3;

  return (
    <div className="w-full space-y-3 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-400 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Sources ({sources.length})
        </h3>
        {hasMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1 transition-colors"
          >
            {isExpanded ? (
              <>
                Show less <ChevronUp className="w-3 h-3" />
              </>
            ) : (
              <>
                Show all <ChevronDown className="w-3 h-3" />
              </>
            )}
          </button>
        )}
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 gap-3">
        {displayedSources.map((source, index) => {
          const Icon = sourceTypeIcons[source.type];
          const colorClass = sourceTypeColors[source.type];

          return (
            <a
              key={source.id}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex gap-3 p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl hover:border-[#3a3a3a] hover:bg-[#1f1f1f] transition-all duration-300 animate-slide-in-up"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {/* Source number badge */}
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#2a2a2a] flex items-center justify-center text-xs font-semibold text-gray-400 group-hover:bg-[#3a3a3a] transition-colors">
                {index + 1}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-white line-clamp-1 group-hover:text-blue-400 transition-colors">
                    {source.title}
                  </h4>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-blue-400 flex-shrink-0 transition-colors" />
                </div>

                <p className="text-xs text-gray-400 line-clamp-2 mb-2">
                  {source.snippet}
                </p>

                <div className="flex items-center gap-2">
                  <Icon className={`w-3.5 h-3.5 ${colorClass}`} />
                  <span className="text-xs text-gray-500 truncate">
                    {new URL(source.url).hostname}
                  </span>
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </a>
          );
        })}
      </div>
    </div>
  );
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3L13.5 7.5L18 9L13.5 10.5L12 15L10.5 10.5L6 9L10.5 7.5L12 3Z"
        fill="currentColor"
      />
      <path
        d="M19 12L19.75 14.25L22 15L19.75 15.75L19 18L18.25 15.75L16 15L18.25 14.25L19 12Z"
        fill="currentColor"
      />
      <path
        d="M19 3L19.75 5.25L22 6L19.75 6.75L19 9L18.25 6.75L16 6L18.25 5.25L19 3Z"
        fill="currentColor"
      />
    </svg>
  );
}
