"use client";

import React from 'react';
import { Brain, Search, Zap, Sparkles, CheckCircle2 } from 'lucide-react';
import { SearchProgress as SearchProgressType } from '@/types/types';

interface SearchProgressProps {
  stages: SearchProgressType[];
  currentStage?: string;
}

const stageIcons = {
  memory: Brain,
  quick: Zap,
  deep: Search,
  generating: Sparkles,
  complete: CheckCircle2,
};

const stageColors = {
  memory: 'text-purple-400',
  quick: 'text-yellow-400',
  deep: 'text-blue-400',
  generating: 'text-green-400',
  complete: 'text-emerald-400',
};

const stageBgColors = {
  memory: 'bg-purple-500/10 border-purple-500/30',
  quick: 'bg-yellow-500/10 border-yellow-500/30',
  deep: 'bg-blue-500/10 border-blue-500/30',
  generating: 'bg-green-500/10 border-green-500/30',
  complete: 'bg-emerald-500/10 border-emerald-500/30',
};

export default function SearchProgress({ stages, currentStage }: SearchProgressProps) {
  console.log('SearchProgress component rendered with stages:', stages, 'currentStage:', currentStage);
  if (!stages || stages.length === 0) {
    console.log('SearchProgress: No stages to render');
    return null;
  }

  return (
    <div className="w-full space-y-3 mb-6">
      {stages.map((stage, index) => {
        const Icon = stageIcons[stage.stage];
        const isActive = stage.status === 'active';
        const isComplete = stage.status === 'complete';
        const isPending = stage.status === 'pending';

        return (
          <div
            key={`${stage.stage}-${index}`}
            className={`
              relative flex items-center gap-3 p-4 rounded-xl border
              transition-all duration-500 ease-out
              ${isActive ? stageBgColors[stage.stage] + ' scale-[1.02]' : ''}
              ${isComplete ? 'bg-[#1a1a1a]/50 border-[#2a2a2a]' : ''}
              ${isPending ? 'bg-[#1a1a1a]/30 border-[#252525] opacity-50' : ''}
              ${isActive ? 'animate-pulse-subtle' : ''}
            `}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            {/* Icon */}
            <div
              className={`
                flex items-center justify-center w-10 h-10 rounded-full
                transition-all duration-300
                ${isActive ? stageBgColors[stage.stage] : 'bg-[#2a2a2a]'}
                ${isActive ? 'animate-spin-slow' : ''}
              `}
            >
              <Icon
                className={`
                  w-5 h-5 transition-colors duration-300
                  ${isActive ? stageColors[stage.stage] : 'text-gray-500'}
                  ${isComplete ? 'text-emerald-400' : ''}
                `}
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4
                  className={`
                    text-sm font-semibold transition-colors duration-300
                    ${isActive ? 'text-white' : ''}
                    ${isComplete ? 'text-gray-400' : ''}
                    ${isPending ? 'text-gray-600' : ''}
                  `}
                >
                  {stage.message}
                </h4>
                {stage.duration && isComplete && (
                  <span className="text-xs text-gray-500">
                    {stage.duration}ms
                  </span>
                )}
              </div>

              {/* Progress bar for active stage */}
              {isActive && (
                <div className="mt-2 h-1 bg-[#2a2a2a] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${stageColors[stage.stage].replace('text-', 'bg-')} animate-progress-bar`}
                  />
                </div>
              )}
            </div>

            {/* Status indicator */}
            {isComplete && (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 animate-scale-in" />
            )}

            {isActive && (
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce-dot" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce-dot" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce-dot" style={{ animationDelay: '300ms' }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
