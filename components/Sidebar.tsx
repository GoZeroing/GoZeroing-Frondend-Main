"use client";

import React, { useState, memo } from "react";
import {
  Plus,
  Star,
  Globe,
  Settings,
  LogOut,
  Sparkles,
  Zap,
  Layers,
  BookMarked,
} from "lucide-react";
import Logo from "./Logo";

// Custom modern icon components
const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 22V12H15V22M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DiscoverIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1"/>
  </svg>
);

const SpacesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23 21V19.5C23 18.5 22.5 17.5 21.5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ProfileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05"/>
    <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1"/>
    <path d="M14.5 15.5c0-1.5-1.5-2.5-3-2.5s-3 1-3 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const TrendingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 6H23V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UsersGroupIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
    <path d="M2 21V19C2 17.9391 2.42143 16.9217 3.17157 16.1716C3.92172 15.4214 4.93913 15 6 15H12C13.0609 15 14.0783 15.4214 14.8284 16.1716C15.5786 16.9217 16 17.9391 16 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="17" cy="7" r="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M22 21V19.5C22 18.5 21.5 17.5 20.5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: string;
}

interface DiscoverItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
}

interface SpaceItem {
  id: string;
  name: string;
  members: number;
  description: string;
  isPublic: boolean;
}

interface SidebarProps {
  onNewChat?: () => void;
  onSelectHistory?: (id: string) => void;
  onDiscover?: () => void;
  onSpaces?: () => void;
  onProfile?: () => void;
  history?: ChatHistoryItem[];
  currentChatId?: string;
  isExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  currentSection?: "home" | "discover" | "spaces" | "profile";
  setCurrentSection?: (s: "home" | "discover" | "spaces" | "profile") => void;
}

const Sidebar = memo(function Sidebar({
  onNewChat,
  onSelectHistory,
  history = [],
  currentChatId,
  onDiscover,
  onSpaces,
  onProfile,
}: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<"home" | "discover" | "spaces" | "profile">("home");

  // Dummy data for Discover section
  const discoverItems: DiscoverItem[] = [
    {
      id: "1",
      title: "AI Art Gallery",
      description: "Explore stunning AI-generated artwork",
      icon: "",
      category: "Art & Design"
    },
    {
      id: "2",
      title: "Code Assistant",
      description: "Get help with programming and debugging",
      icon: "",
      category: "Technology"
    },
    {
      id: "3",
      title: "Creative Writing",
      description: "Boost your storytelling skills",
      icon: "",
      category: "Writing"
    },
    {
      id: "4",
      title: "Science Explorer",
      description: "Discover latest scientific breakthroughs",
      icon: "",
      category: "Science"
    }
  ];

  // Dummy data for Spaces section
  const spacesItems: SpaceItem[] = [
    {
      id: "1",
      name: "AI Enthusiasts",
      members: 1247,
      description: "Discussing the future of artificial intelligence",
      isPublic: true
    },
    {
      id: "2",
      name: "Creative Writers",
      members: 892,
      description: "Share and critique creative writing",
      isPublic: true
    },
    {
      id: "3",
      name: "Tech Innovators",
      members: 543,
      description: "Building the next big thing together",
      isPublic: false
    },
    {
      id: "4",
      name: "Science Community",
      members: 1567,
      description: "Exploring the wonders of science",
      isPublic: true
    }
  ];

  // Dummy data for Profile
  const userProfile = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    memberSince: "Jan 2024",
    stats: {
      chats: history.length,
      spaces: 3,
      discoveries: 12
    }
  };

  const renderHomeContent = () => (
    <div className="p-6 text-gray-200">
      <h2 className="text-lg font-semibold mb-4">Home</h2>
      <div className="mb-4 border-b border-[#2a2a2a] pb-3">
        <h3 className="text-sm font-medium mb-2">Quick Categories</h3>
        <ul className="space-y-2 text-sm">
          <li className="hover:text-white cursor-pointer flex items-center gap-2">
            
            Travel & Exploration
          </li>
          <li className="hover:text-white cursor-pointer flex items-center gap-2">
            
            Academic Research
          </li>
          <li className="hover:text-white cursor-pointer flex items-center gap-2">
            
            Music & Entertainment
          </li>
          <li className="hover:text-white cursor-pointer flex items-center gap-2">
            
            Business & Strategy
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xs uppercase tracking-wide text-gray-500 mb-2 flex items-center justify-between">
          Recent Chats 
          <span className="text-gray-400 text-lg cursor-pointer hover:text-white">
            <Plus className="w-4 h-4" />
          </span>
        </h3>
        <ul className="space-y-1">
          {history.map((item) => (
            <li
              key={item.id}
              onClick={() => onSelectHistory?.(item.id)}
              className={`cursor-pointer rounded-md px-2 py-1 text-sm truncate ${
                currentChatId === item.id
                  ? "bg-[#252525] text-white"
                  : "text-gray-400 hover:text-gray-200 hover:bg-[#1a1a1a]"
              }`}
            >
              {item.title}
            </li>
          ))}
          {history.length === 0 && (
            <li className="text-gray-500 text-sm italic px-2 py-1">
              No recent chats
            </li>
          )}
        </ul>
      </div>
    </div>
  );

  const renderDiscoverContent = () => (
    <div className="p-6 text-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Discover</h2>
        <TrendingIcon />
      </div>

      <div className="space-y-4">
        {discoverItems.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#333] cursor-pointer transition-all duration-200 hover:bg-[#252525]"
            onClick={onDiscover}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">
                
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-white text-sm truncate">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500 bg-[#2a2a2a] px-2 py-1 rounded">
                    {item.category}
                  </span>
                  <Star className="w-4 h-4 text-gray-500 hover:text-yellow-400 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-[#2a2a2a]">
        <button 
          onClick={onDiscover}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-[#1f1f1f] hover:bg-[#252525] text-gray-300 hover:text-white transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm">Explore More</span>
        </button>
      </div>
    </div>
  );

  const renderSpacesContent = () => (
    <div className="p-6 text-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Spaces</h2>
        <UsersGroupIcon />
      </div>

      <div className="space-y-4">
        {spacesItems.map((space) => (
          <div
            key={space.id}
            className="p-3 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#333] cursor-pointer transition-all duration-200 hover:bg-[#252525]"
            onClick={onSpaces}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-white text-sm truncate">
                    {space.name}
                  </h3>
                  {space.isPublic ? (
                    <Globe className="w-3 h-3 text-blue-400" />
                  ) : (
                    <Layers className="w-3 h-3 text-green-400" />
                  )}
                </div>
                <p className="text-gray-400 text-xs mb-2 line-clamp-2">
                  {space.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    
                    {space.members.toLocaleString()} members
                  </span>
                  <button className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded transition-colors">
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-[#2a2a2a]">
        <button 
          onClick={onSpaces}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-[#1f1f1f] hover:bg-[#252525] text-gray-300 hover:text-white transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm">Create Space</span>
        </button>
      </div>
    </div>
  );

  const renderProfileContent = () => (
    <div className="p-6 text-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Profile</h2>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3 mb-6 p-3 rounded-lg bg-[#1a1a1a]">
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-sm truncate">
            {userProfile.name}
          </h3>
          <p className="text-gray-400 text-xs truncate">{userProfile.email}</p>
          <p className="text-gray-500 text-xs mt-1">
            Member since {userProfile.memberSince}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        <div className="text-center p-2 rounded-lg bg-[#1a1a1a]">
          <div className="text-white font-semibold text-sm">{userProfile.stats.chats}</div>
          <div className="text-gray-400 text-xs">Chats</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-[#1a1a1a]">
          <div className="text-white font-semibold text-sm">{userProfile.stats.spaces}</div>
          <div className="text-gray-400 text-xs">Spaces</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-[#1a1a1a]">
          <div className="text-white font-semibold text-sm">{userProfile.stats.discoveries}</div>
          <div className="text-gray-400 text-xs">Discoveries</div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <button className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-[#1a1a1a] transition-colors">
          <Settings className="w-4 h-4" />
          <span className="text-sm">Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-[#1a1a1a] transition-colors">
          <BookMarked className="w-4 h-4" />
          <span className="text-sm">Documentation</span>
        </button>
        <button 
          onClick={onProfile}
          className="w-full flex items-center gap-3 p-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-[#1a1a1a] transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );

  const renderExpandedContent = () => {
    switch (hoveredSection) {
      case "home":
        return renderHomeContent();
      case "discover":
        return renderDiscoverContent();
      case "spaces":
        return renderSpacesContent();
      case "profile":
        return renderProfileContent();
      default:
        return renderHomeContent();
    }
  };

  const handleIconHover = (section: "home" | "discover" | "spaces" | "profile") => {
    setHoveredSection(section);
  };

  return (
    <div className="fixed left-0 top-0 h-screen z-50 flex">
      {/* Compact Sidebar */}
      <aside
        className={`h-full bg-[#1a1a1a] border-r border-[#2a2a2a] transition-all duration-300 ease-out
                    flex flex-col items-center w-[75px]`}
      >
        {/* Logo */}
        <div className="pt-3 pb-4 flex items-center justify-center">
          <Logo />
        </div>

        {/* New Chat Button with proper spacing */}
        <div className="w-full px-3 mb-6 mt-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onNewChat?.();
            }}
            onMouseEnter={() => handleIconHover("home")}
            className="w-full h-12 flex items-center justify-center rounded-lg
                       bg-[#1f1f1f] hover:bg-[#252525] text-gray-300 hover:text-white
                       transition-all duration-200 border border-[#2a2a2a] hover:border-[#333]
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            aria-label="New Chat"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Visual separator */}
        <div className="w-full px-3 mb-4">
          <div className="w-full h-[1px] bg-[#2a2a2a] opacity-50"></div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col items-center w-full space-y-2 px-3">
          {/* Home */}
          <button
            onMouseEnter={() => {
              handleIconHover("home");
              setIsExpanded(true);
            }}
            onMouseLeave={() => setIsExpanded(false)}
            onClick={onNewChat}
            className="w-full flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg transition-all duration-200 text-gray-200 hover:text-white hover:bg-[#252525] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <HomeIcon />
            <span className="text-xs font-medium mt-1">Home</span>
          </button>

          {/* Discover */}
          <button
            onMouseEnter={() => {
              handleIconHover("discover");
              setIsExpanded(true);
            }}
            onMouseLeave={() => setIsExpanded(false)}
            onClick={onDiscover}
            className="w-full flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg transition-all duration-200 text-gray-200 hover:text-white hover:bg-[#252525] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <DiscoverIcon />
            <span className="text-xs font-medium mt-1">Discover</span>
          </button>

          {/* Spaces */}
          <button
            onMouseEnter={() => {
              handleIconHover("spaces");
              setIsExpanded(true);
            }}
            onMouseLeave={() => setIsExpanded(false)}
            onClick={onSpaces}
            className="w-full flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg transition-all duration-200 text-gray-200 hover:text-white hover:bg-[#252525] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <SpacesIcon />
            <span className="text-xs font-medium mt-1">Spaces</span>
          </button>
        </nav>

        {/* Profile at bottom */}
        <div className="w-full px-3 mt-auto mb-4">
          <button
            onMouseEnter={() => handleIconHover("profile")}
            onClick={onProfile}
            className="w-full flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg transition-all duration-200 text-gray-200 hover:text-white hover:bg-[#252525] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <ProfileIcon />
            <span className="text-xs font-medium mt-1">Profile</span>
          </button>
        </div>
      </aside>

      {/* Expanded Panel (appears on hover) */}
      <div
        className={`h-full bg-[#1a1a1a] border-r border-[#2a2a2a] transition-all duration-300 overflow-hidden ${
          isExpanded ? "w-[240px] opacity-100" : "w-0 opacity-0"
        }`}
      >
        {renderExpandedContent()}
      </div>
    </div>
  );
});

export default Sidebar;