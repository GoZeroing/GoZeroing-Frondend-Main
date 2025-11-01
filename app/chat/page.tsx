"use client";

import React, { useState, useEffect, Suspense, useCallback, useMemo } from "react";
import { Sparkles, Search, Loader2, CloudUpload, Mic, CheckCircle, Copy, Share, RotateCcw, ThumbsUp, Bookmark } from "lucide-react";
import { Inter } from "next/font/google";
import { useSearchParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

interface Source {
  id: string;
  title: string;
  url: string;
  domain: string;
}

interface SearchQuery {
  text: string;
}

interface Message {
  id: string;
  query: string;
  status: 'thinking' | 'searching' | 'complete';
  searchDescription?: string;
  searchQueries?: SearchQuery[];
  sources?: Source[];
  answer?: string;
}

// Mock data matching Perplexity exactly
const mockSources: Source[] = [
  { id: '1', title: 'Self-Adapting Language Models - arXiv', url: 'https://arxiv.org/example', domain: 'arxiv' },
  { id: '2', title: 'SEAL LLM That Writes Its Own Updates Solves 72.5% of ARC-AGI...', url: 'https://reddit.com/example', domain: 'reddit' },
  { id: '3', title: 'This AI Model Never Stops Learning - WIRED', url: 'https://wired.com/example', domain: 'wired' },
  { id: '4', title: 'MIT Researchers Unveil "SEAL": A New Step Towards Self...', url: 'https://syncedreview.com/example', domain: 'syncedreview' },
  { id: '5', title: 'Continual-Intelligence/SEAL: Self-Adapting Language Models', url: 'https://github.com/example', domain: 'github' },
  { id: '6', title: 'Paper page - SEAL: SEmantic-Augmented Imitation Learning via Language Model', url: 'https://huggingface.co/example', domain: 'huggingface' },
];

const searchQueries = [
  { text: 'Seal llm technology' },
  { text: 'Seal large language model' },
  { text: 'Seal AI model' },
];

function ChatContent() {
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("initialMessage");

  useEffect(() => {
    if (initialQuery) {
      handleSubmit(initialQuery);
    }
  }, [initialQuery]);

  const simulateSearch = async (query: string) => {
    const messageId = Date.now().toString();

    // Thinking phase
    setCurrentMessage({
      id: messageId,
      query,
      status: 'thinking',
      searchDescription: 'Analyzing your query and preparing comprehensive response.',
    });

    await new Promise(resolve => setTimeout(resolve, 1200));

    // Searching phase
    setCurrentMessage(prev => prev ? {
      ...prev,
      status: 'searching',
      searchQueries,
    } : null);

    await new Promise(resolve => setTimeout(resolve, 1500));

    // Answer first without sources
    setCurrentMessage(prev => prev ? {
      ...prev,
      status: 'complete',
      answer: `SEAL (Self-Evolving Artificial Intelligence Learning) represents a breakthrough in machine learning technology. This advanced system demonstrates the capability to continuously adapt and improve its own architecture without human intervention.

The technology works by implementing a meta-learning framework that allows the model to analyze its performance, identify areas for improvement, and automatically update its parameters. Research from MIT and other institutions shows that SEAL-based models achieve remarkable performance improvements, with some benchmarks showing up to 72.5% accuracy on complex reasoning tasks.

Key innovations include:

• **Continual Learning**: Unlike traditional models that require retraining, SEAL continuously learns from new data
• **Self-Modification**: The system can rewrite its own code and update its neural architecture
• **Adaptive Performance**: Automatically optimizes for specific tasks and domains

This represents a significant step toward artificial general intelligence (AGI), as it demonstrates systems that can improve autonomously over time.`,
    } : null);

    // Add sources after answer is displayed
    await new Promise(resolve => setTimeout(resolve, 800));
    setCurrentMessage(prev => prev ? {
      ...prev,
      sources: mockSources,
    } : null);
  };

  const handleSubmit = useCallback(async (query: string) => {
    if (!query.trim()) return;
    setInputValue("");
    await simulateSearch(query);
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(inputValue);
    }
  }, [inputValue, handleSubmit]);

  const handleUpload = useCallback(() => {
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*,audio/*,video/*,text/*,.pdf,.doc,.docx';
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        // Handle file upload - for now just log, but this could be extended
        console.log('Files selected:', Array.from(files).map(f => f.name));
        // You could add file handling logic here
      }
    };
    input.click();
  }, []);

  const handleVoiceToggle = useCallback(() => {
    setIsRecording(!isRecording);
    // Voice recording logic would go here
    if (!isRecording) {
      console.log('Starting voice recording...');
      // Start recording logic
    } else {
      console.log('Stopping voice recording...');
      // Stop recording and process audio
    }
  }, [isRecording]);

  const handleCopy = useCallback(async () => {
    if (currentMessage?.answer) {
      try {
        await navigator.clipboard.writeText(currentMessage.answer);
        // You could add a toast notification here
        console.log('Response copied to clipboard');
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  }, [currentMessage?.answer]);

  const handleShare = useCallback(() => {
    if (currentMessage?.answer && navigator.share) {
      navigator.share({
        title: 'AI Response',
        text: currentMessage.answer,
      });
    } else {
      // Fallback: copy to clipboard
      handleCopy();
    }
  }, [currentMessage?.answer, handleCopy]);

  const handleRewrite = useCallback(() => {
    if (currentMessage?.query) {
      // Trigger a new search with the same query
      handleSubmit(currentMessage.query);
    }
  }, [currentMessage?.query, handleSubmit]);

  const handleLike = useCallback(() => {
    setIsLiked(!isLiked);
    // You could save this preference to local storage or send to server
  }, [isLiked]);

  const handleBookmark = useCallback(() => {
    setIsBookmarked(!isBookmarked);
    // You could save this to bookmarks
  }, [isBookmarked]);


  return (
    <div className={`h-screen overflow-y-auto bg-background text-white ${inter.className} custom-scrollbar`}>

      <div className="max-w-3xl mx-auto px-6 py-8 pl-[88px] pb-48">
        {/* Query Header */}
        <AnimatePresence mode="wait">
        {currentMessage && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-normal text-gray-100 mb-6">
              {currentMessage.query}
            </h1>

            {/* Divider line */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#2a2a2a] to-transparent mb-6"></div>

            {/* Thinking Status */}
            <AnimatePresence>
            {currentMessage.status === 'thinking' && (
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Thinking...</span>
                </div>
                {currentMessage.searchDescription && (
                  <p className="text-sm text-gray-400 leading-relaxed">
                    • {currentMessage.searchDescription}
                  </p>
                )}
              </motion.div>
            )}
            </AnimatePresence>

            {/* Searching Status */}
            <AnimatePresence>
            {currentMessage.status === 'searching' && (
              <motion.div 
                className="space-y-4 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-sm text-gray-400">
                  <span className="font-medium">Searching</span>
                </div>
                
                {/* Search Queries */}
                <motion.div 
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  {currentMessage.searchQueries?.map((query, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full text-xs text-gray-400"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: 0.2 + idx * 0.06,
                        duration: 0.3
                      }}
                    >
                      <Search className="w-3 h-3" />
                      <span>{query.text}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Sources Preview During Search */}
                <motion.div 
                  className="text-xs text-gray-500 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  Finding relevant sources...
                </motion.div>
              </motion.div>
            )}
            </AnimatePresence>

            {/* Answer Section - Optimized */}
            <AnimatePresence>
            {currentMessage.status === 'complete' && currentMessage.answer && (
              <motion.div 
                className="space-y-8 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Answer Text - Shows First */}
                <motion.div 
                  className="prose prose-invert max-w-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <div className="text-[16px] leading-[2] text-gray-200 whitespace-pre-wrap max-w-none py-2">
                    {currentMessage.answer}
                  </div>
                </motion.div>

                {/* Sources Section - Shows After Answer */}
                {currentMessage.sources && currentMessage.sources.length > 0 && (
                  <motion.div 
                    className="space-y-3 pt-4 border-t border-[#2a2a2a]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <motion.h3 
                      className="text-sm font-medium text-gray-400 mb-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      Sources
                    </motion.h3>
                    <div className="grid grid-cols-1 gap-2">
                      {currentMessage.sources.map((source, idx) => (
                        <motion.a
                          key={source.id}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between px-4 py-2.5 bg-[#0f0f0f]/50 hover:bg-[#1a1a1a] border border-[#1f1f1f] hover:border-[#2a2a2a] rounded-lg transition-all group"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: 1.1 + idx * 0.08,
                            duration: 0.3
                          }}
                          whileHover={{ x: 4 }}
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-[#1a1a1a] border border-[#2a2a2a] rounded-md text-[10px] font-medium text-gray-400">
                              {idx + 1}
                            </span>
                            <span className="text-sm text-gray-300 truncate group-hover:text-white transition-colors">{source.title}</span>
                          </div>
                          <span className="text-xs text-gray-500 ml-3 flex-shrink-0">{source.domain}</span>
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <motion.div 
                  className="flex items-center justify-center gap-1 pt-6 border-t border-[#2a2a2a]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  {/* Copy */}
                  <motion.button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-all duration-200 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Copy response"
                  >
                    <Copy className="w-4 h-4 group-hover:text-[#6a9ea4] transition-colors" />
                    <span className="text-sm font-medium">Copy</span>
                  </motion.button>

                  {/* Share */}
                  <motion.button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-all duration-200 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Share response"
                  >
                    <Share className="w-4 h-4 group-hover:text-[#6a9ea4] transition-colors" />
                    <span className="text-sm font-medium">Share</span>
                  </motion.button>

                  {/* Rewrite */}
                  <motion.button
                    onClick={handleRewrite}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-all duration-200 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Regenerate response"
                  >
                    <RotateCcw className="w-4 h-4 group-hover:text-[#6a9ea4] transition-colors" />
                    <span className="text-sm font-medium">Rewrite</span>
                  </motion.button>

                  {/* Like */}
                  <motion.button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 group ${
                      isLiked 
                        ? 'text-red-400 hover:text-red-300 bg-red-500/10' 
                        : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={isLiked ? "Remove like" : "Like response"}
                  >
                    <ThumbsUp className={`w-4 h-4 transition-colors ${
                      isLiked ? 'group-hover:text-red-300' : 'group-hover:text-[#6a9ea4]'
                    }`} />
                    <span className="text-sm font-medium">Like</span>
                  </motion.button>

                  {/* Bookmark */}
                  <motion.button
                    onClick={handleBookmark}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 group ${
                      isBookmarked 
                        ? 'text-yellow-400 hover:text-yellow-300 bg-yellow-500/10' 
                        : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={isBookmarked ? "Remove bookmark" : "Bookmark response"}
                  >
                    <Bookmark className={`w-4 h-4 transition-colors ${
                      isBookmarked ? 'group-hover:text-yellow-300' : 'group-hover:text-[#6a9ea4]'
                    }`} />
                    <span className="text-sm font-medium">Save</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
            </AnimatePresence>
          </motion.div>
        )}
        </AnimatePresence>

        {/* Empty State */}
        <AnimatePresence>
        {!currentMessage && (
          <motion.div 
            className="flex flex-col items-center justify-center min-h-[60vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Sparkles className="w-12 h-12 text-gray-600 mb-4" />
            <p className="text-gray-500 text-sm">Ask anything to get started</p>
          </motion.div>
        )}
        </AnimatePresence>

        {/* Input Area - Enhanced with multiple controls */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-transparent pt-8 pb-6 pl-[72px]">
          <div className="max-w-3xl mx-auto px-6">
            <div className="relative bg-[#1a1a1a] border border-[#2a2a2a] focus-within:border-[#6a9ea4] rounded-2xl transition-all duration-200 overflow-hidden">
              {/* Main textarea area */}
              <div className="relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask a follow-up question..."
                  className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 resize-none text-sm text-gray-100 placeholder-gray-500 px-4 py-4 pr-32 min-h-[80px] leading-relaxed"
                  rows={3}
                />

                {/* Control buttons - positioned at bottom right */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  {/* Upload button */}
                  <motion.button
                    onClick={handleUpload}
                    className="p-2 rounded-xl text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-all duration-200 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Upload files"
                  >
                    <CloudUpload className="w-4 h-4 group-hover:text-[#6a9ea4] transition-colors" />
                  </motion.button>

                  {/* Voice recording button */}
                  <motion.button
                    onClick={handleVoiceToggle}
                    className={`p-2 rounded-xl transition-all duration-200 group ${
                      isRecording
                        ? 'text-red-400 hover:text-red-300 bg-red-500/10'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={isRecording ? "Stop recording" : "Start voice input"}
                  >
                    <Mic className={`w-4 h-4 transition-colors ${
                      isRecording ? 'group-hover:text-red-300' : 'group-hover:text-[#6a9ea4]'
                    }`} />
                  </motion.button>

                  {/* Send button */}
                  <motion.button
                    onClick={() => handleSubmit(inputValue)}
                    disabled={!inputValue.trim()}
                    className={`p-2 rounded-xl transition-all duration-200 flex items-center justify-center ${
                      inputValue.trim()
                        ? 'bg-[#6a9ea4] hover:bg-[#5a8e94] text-white shadow-lg'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                    whileHover={inputValue.trim() ? { scale: 1.05 } : {}}
                    whileTap={inputValue.trim() ? { scale: 0.95 } : {}}
                    title="Send message"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                      <path d="M5 10L15 10M10 5L15 10L10 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Recording indicator */}
              <AnimatePresence>
              {isRecording && (
                <motion.div
                  className="px-4 pb-3 flex items-center gap-2 text-red-400 text-xs"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span>Recording... Click mic to stop</span>
                </motion.div>
              )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
      </div>
    }>
      <ChatContent />
    </Suspense>
  );
}
