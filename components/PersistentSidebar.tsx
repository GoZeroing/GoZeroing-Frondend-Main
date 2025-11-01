"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

interface ChatHistory {
  id: string;
  title: string;
  timestamp: string;
  query: string;
  response: string;
}

export default function PersistentSidebar() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [history, setHistory] = useState<ChatHistory[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  // Persist sidebar state in localStorage
  useEffect(() => {
    const savedExpanded = localStorage.getItem('gozeroing-sidebar-expanded');
    if (savedExpanded) {
      setSidebarExpanded(JSON.parse(savedExpanded));
    }
  }, []);

  // Save sidebar state whenever it changes
  useEffect(() => {
    localStorage.setItem('gozeroing-sidebar-expanded', JSON.stringify(sidebarExpanded));
  }, [sidebarExpanded]);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('gozeroing-chat-history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Failed to load chat history:', error);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('gozeroing-chat-history', JSON.stringify(history));
    }
  }, [history]);

  const handleNewChat = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleSelectHistory = useCallback((id: string) => {
    const chat = history.find(item => item.id === id);
    if (chat) {
      router.push(`/chat?initialMessage=${encodeURIComponent(chat.query)}`);
    }
  }, [history, router]);

  const mockHistory = [
    { id: '1', title: 'AI Models Comparison', timestamp: '2:30 PM' },
    { id: '2', title: 'Machine Learning Basics', timestamp: '1:45 PM' },
    { id: '3', title: 'Neural Networks Explained', timestamp: '12:20 PM' },
  ];

  return (
    <Sidebar
      onNewChat={handleNewChat}
      onSelectHistory={handleSelectHistory}
      history={mockHistory}
      isExpanded={sidebarExpanded}
      onExpandedChange={setSidebarExpanded}
    />
  );
}
