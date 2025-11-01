import { useState, useCallback } from 'react';
import { AIMessage, SearchProgress, Source } from '@/types/types';

interface UseAIChatOptions {
  onMessageSent?: (message: string) => void;
  onResponseComplete?: (response: AIMessage) => void;
}

export function useAIChat(options: UseAIChatOptions = {}) {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [currentStages, setCurrentStages] = useState<SearchProgress[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const searchStages: SearchProgress[] = [
    { stage: 'memory', status: 'pending', message: 'Retrieving relevant memories...' },
    { stage: 'quick', status: 'pending', message: 'Quick search across sources...' },
    { stage: 'deep', status: 'pending', message: 'Deep search for comprehensive results...' },
    { stage: 'generating', status: 'pending', message: 'Generating response...' },
  ];

  const simulateSearchStages = useCallback(async (): Promise<SearchProgress[]> => {
    const stages = [...searchStages];
    setCurrentStages(stages);

    // Memory retrieval
    await new Promise(resolve => setTimeout(resolve, 800));
    stages[0] = { ...stages[0], status: 'active' };
    setCurrentStages([...stages]);

    await new Promise(resolve => setTimeout(resolve, 1200));
    stages[0] = { ...stages[0], status: 'complete', duration: 1200 };
    setCurrentStages([...stages]);

    // Quick search
    stages[1] = { ...stages[1], status: 'active' };
    setCurrentStages([...stages]);

    await new Promise(resolve => setTimeout(resolve, 1000));
    stages[1] = { ...stages[1], status: 'complete', duration: 1000 };
    setCurrentStages([...stages]);

    // Deep search
    stages[2] = { ...stages[2], status: 'active' };
    setCurrentStages([...stages]);

    await new Promise(resolve => setTimeout(resolve, 1500));
    stages[2] = { ...stages[2], status: 'complete', duration: 1500 };
    setCurrentStages([...stages]);

    // Generating
    stages[3] = { ...stages[3], status: 'active' };
    setCurrentStages([...stages]);

    await new Promise(resolve => setTimeout(resolve, 500));
    stages[3] = { ...stages[3], status: 'complete', duration: 500 };
    setCurrentStages([...stages]);

    return stages;
  }, []);

  const sendMessage = useCallback(async (content: string, sources?: Source[]) => {
    if (!content.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsProcessing(true);
    options.onMessageSent?.(content);

    // Simulate search stages
    const completedStages = await simulateSearchStages();

    // Create AI response
    const aiResponse: AIMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `Based on my analysis of your query "${content}", I've gathered information from multiple sources. This comprehensive approach ensures we provide you with accurate and well-researched information.`,
      timestamp: new Date(),
      sources,
      searchProgress: completedStages,
      isStreaming: true,
    };

    setMessages((prev) => [...prev, aiResponse]);
    setCurrentStages([]);
    setIsProcessing(false);
    options.onResponseComplete?.(aiResponse);
  }, [simulateSearchStages, options]);

  const updateMessageStreaming = useCallback((messageId: string, isStreaming: boolean) => {
    setMessages(prev =>
      prev.map(m =>
        m.id === messageId ? { ...m, isStreaming } : m
      )
    );
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setCurrentStages([]);
    setIsProcessing(false);
  }, []);

  return {
    messages,
    currentStages,
    isProcessing,
    sendMessage,
    updateMessageStreaming,
    clearMessages,
  };
}
