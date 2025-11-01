// components/PersistentSidebar.tsx

"use client";

import React, { useState, useEffect } from "react";
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
  const [history, setHistory] = useState<ChatHistory[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const savedHistory = localStorage.getItem("gozeroing-chat-history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error("Failed to load chat history:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("gozeroing-chat-history", JSON.stringify(history));
    }
  }, [history]);

  const handleNewChat = () => {
    router.push("/"); 
  };

  const handleSelectHistory = (id: string) => {
    const chat = history.find((item) => item.id === id);
    if (chat) {
      router.push(`/chat?initialMessage=${encodeURIComponent(chat.query)}`);
    }
  };

  const handleDiscover = () => {
    router.push("/discover");
  };

  const handleSpaces = () => {
    router.push("/spaces");
  };

  const handleProfile = () => {
    router.push("/profile");
  };

  const handleMemory = () => {
    // For now, just log - could navigate to a memory page later
    console.log("Memory graph clicked");
  };

  // Convert actual history to mock format for sidebar
  const sidebarHistory = history.length > 0 
    ? history.map(item => ({
        id: item.id,
        title: item.title,
        timestamp: item.timestamp
      }))
    : [
        { id: "1", title: "AI Models Comparison", timestamp: "2:30 PM" },
        { id: "2", title: "Machine Learning Basics", timestamp: "1:45 PM" },
        { id: "3", title: "Neural Networks Explained", timestamp: "12:20 PM" },
      ];

  return (
    <Sidebar
      onNewChat={handleNewChat}
      onSelectHistory={handleSelectHistory}
      history={sidebarHistory}
      onDiscover={handleDiscover}
      onSpaces={handleSpaces}
      onProfile={handleProfile}
      onMemory={handleMemory}
    />
  );
}