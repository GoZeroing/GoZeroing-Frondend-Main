import { useEffect, useRef } from 'react'
import { AudioRefs } from '../types/types'

export const useAudioSetup = (): AudioRefs => {
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const aiSpeechIntervalRef = useRef<number | null>(null)
  const textRevealIntervalRef = useRef<number | null>(null)

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()

    return () => {
      if (audioContextRef.current) audioContextRef.current.close()
      if (aiSpeechIntervalRef.current) clearInterval(aiSpeechIntervalRef.current)
      if (textRevealIntervalRef.current) clearInterval(textRevealIntervalRef.current)
    }
  }, [])

  return {
    audioContext: audioContextRef,
    analyser: analyserRef,
    mediaStream: mediaStreamRef,
    aiSpeechInterval: aiSpeechIntervalRef,
    textRevealInterval: textRevealIntervalRef
  }
}