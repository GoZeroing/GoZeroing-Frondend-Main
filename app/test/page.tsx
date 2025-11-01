"use client";

import React, { useState } from 'react';
import SearchProgress from "@/components/SearchProgress";
import SourceCard from "@/components/SourceCard";
import AIResponseStream from "@/components/AIResponseStream";
import { SearchProgress as SearchProgressType, Source } from "@/types/types";

const testStages: SearchProgressType[] = [
  { stage: 'memory', status: 'complete', message: 'Retrieving relevant memories...', duration: 1200 },
  { stage: 'quick', status: 'complete', message: 'Quick search across sources...', duration: 1000 },
  { stage: 'deep', status: 'active', message: 'Deep search for comprehensive results...' },
  { stage: 'generating', status: 'pending', message: 'Generating response...' },
];

const testSources: Source[] = [
  {
    id: '1',
    title: 'Test Source 1',
    url: 'https://example.com/1',
    snippet: 'This is a test source snippet',
    type: 'web',
  },
  {
    id: '2',
    title: 'Test Source 2',
    url: 'https://example.com/2',
    snippet: 'Another test source',
    type: 'memory',
  },
];

export default function TestPage() {
  const [showComponents, setShowComponents] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white mb-8">Component Test Page</h1>
        
        <button
          onClick={() => setShowComponents(!showComponents)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          {showComponents ? 'Hide' : 'Show'} Components
        </button>

        {showComponents && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">1. SearchProgress Component</h2>
              <SearchProgress stages={testStages} currentStage="deep" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">2. SourceCard Component</h2>
              <SourceCard sources={testSources} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">3. AIResponseStream Component</h2>
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
                <AIResponseStream
                  content="This is a test response with citations [1] and [2]. The streaming animation should work smoothly."
                  isStreaming={false}
                />
              </div>
            </div>
          </div>
        )}

        <div className="bg-green-500 text-white p-4 rounded-lg">
          ✅ If you can see this green box, React is working!
        </div>
      </div>
    </div>
  );
}
