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