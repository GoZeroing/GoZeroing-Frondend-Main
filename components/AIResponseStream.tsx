"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, ThumbsUp, ThumbsDown, Share2, RotateCcw } from 'lucide-react';

interface AIResponseStreamProps {
  content: string;
  isStreaming?: boolean;
  onComplete?: () => void;
  showCitations?: boolean;
}

export default function AIResponseStream({
  content,
  isStreaming = false,
  onComplete,
  showCitations = true,
}: AIResponseStreamProps) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const streamIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Streaming effect
  useEffect(() => {
    if (isStreaming && content) {
      setCurrentIndex(0);
      setDisplayedContent('');

      streamIntervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= content.length - 1) {
            if (streamIntervalRef.current) {
              clearInterval(streamIntervalRef.current);
            }
            onComplete?.();
            return content.length;
          }
          return prev + 1;
        });
      }, 20); // Adjust speed here (lower = faster)

      return () => {
        if (streamIntervalRef.current) {
          clearInterval(streamIntervalRef.current);
        }
      };
    } else {
      setDisplayedContent(content);
    }
  }, [content, isStreaming, onComplete]);

  useEffect(() => {
    if (isStreaming && currentIndex > 0) {
      setDisplayedContent(content.slice(0, currentIndex));
    }
  }, [currentIndex, content, isStreaming]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Parse content for citations [1], [2], etc.
  const renderContentWithCitations = (text: string) => {
    if (!showCitations) return text;

    const parts = text.split(/(\[\d+\])/g);
    return parts.map((part, index) => {
      const citationMatch = part.match(/\[(\d+)\]/);
      if (citationMatch) {
        return (
          <sup
            key={index}
            className="inline-flex items-center justify-center w-5 h-5 ml-0.5 text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/30 rounded cursor-pointer hover:bg-blue-500/20 transition-colors"
          >
            {citationMatch[1]}
          </sup>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="w-full space-y-4">
      {/* Main content */}
      <div className="relative group">
        <div className="prose prose-invert max-w-none">
          <div className="text-[15px] leading-relaxed text-gray-100 whitespace-pre-wrap">
            {renderContentWithCitations(displayedContent)}
            {isStreaming && (
              <span className="inline-block w-1 h-5 ml-1 bg-blue-400 animate-pulse-cursor" />
            )}
          </div>
        </div>

        {/* Action buttons - appear on hover */}
        {!isStreaming && displayedContent && (
          <div className="absolute -right-2 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex flex-col gap-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-1 shadow-lg">
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-[#2a2a2a] rounded transition-colors"
                title="Copy"
              >
                {isCopied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Feedback buttons */}
      {!isStreaming && displayedContent && (
        <div className="flex items-center gap-2 pt-4 border-t border-[#2a2a2a] animate-fade-in">
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-400 hover:text-white bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] rounded-lg transition-all duration-200">
            <ThumbsUp className="w-3.5 h-3.5" />
            Good
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-400 hover:text-white bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] rounded-lg transition-all duration-200">
            <ThumbsDown className="w-3.5 h-3.5" />
            Bad
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-400 hover:text-white bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] rounded-lg transition-all duration-200">
            <RotateCcw className="w-3.5 h-3.5" />
            Regenerate
          </button>
          <div className="flex-1" />
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-400 hover:text-white bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] rounded-lg transition-all duration-200">
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
        </div>
      )}
    </div>
  );
}
