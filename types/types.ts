export interface VoiceState {
  isListening: boolean
  isSpeaking: boolean
  volume: number
  frequency: number[]
}

export interface AudioRefs {
  audioContext: React.MutableRefObject<AudioContext | null>
  analyser: React.MutableRefObject<AnalyserNode | null>
  mediaStream: React.MutableRefObject<MediaStream | null>
  aiSpeechInterval: React.MutableRefObject<number | null>
  textRevealInterval: React.MutableRefObject<number | null>
}

// Search and AI Response Types
export type SearchStage = 'memory' | 'quick' | 'deep' | 'generating' | 'complete';

export interface SearchProgress {
  stage: SearchStage;
  status: 'pending' | 'active' | 'complete';
  message: string;
  duration?: number;
}

export interface Source {
  id: string;
  title: string;
  url: string;
  snippet: string;
  favicon?: string;
  type: 'web' | 'memory' | 'document';
}

export interface Citation {
  id: string;
  sourceId: string;
  text: string;
  position: number;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: Source[];
  citations?: Citation[];
  searchProgress?: SearchProgress[];
  isStreaming?: boolean;
}

export interface ChatState {
  messages: AIMessage[];
  isProcessing: boolean;
  currentSearchStage?: SearchStage;
}