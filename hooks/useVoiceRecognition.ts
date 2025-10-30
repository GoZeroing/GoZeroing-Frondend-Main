import { useState } from 'react'
import { VoiceState, AudioRefs } from '../types/types'

export const useVoiceRecognition = (audioRefs: AudioRefs) => {
  const [voiceState, setVoiceState] = useState<VoiceState>({
    isListening: false,
    isSpeaking: false,
    volume: 0,
    frequency: []
  })

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      audioRefs.mediaStream.current = stream

      if (audioRefs.audioContext.current && audioRefs.audioContext.current.state === 'suspended') {
        await audioRefs.audioContext.current.resume()
      }

      const source = audioRefs.audioContext.current!.createMediaStreamSource(stream)
      const analyser = audioRefs.audioContext.current!.createAnalyser()
      analyser.fftSize = 256
      source.connect(analyser)
      audioRefs.analyser.current = analyser

      setVoiceState(prev => ({ ...prev, isListening: true }))

      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)

      const updateFrequency = () => {
        if (audioRefs.analyser.current) {
          audioRefs.analyser.current.getByteFrequencyData(dataArray)
          const frequency = Array.from(dataArray).slice(0, 32)
          setVoiceState(prev => ({
            ...prev,
            frequency,
            volume: frequency.reduce((sum, val) => sum + val, 0) / frequency.length
          }))
        }
        requestAnimationFrame(updateFrequency)
      }

      updateFrequency()
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const stopListening = () => {
    if (audioRefs.mediaStream.current) {
      audioRefs.mediaStream.current.getTracks().forEach((track: MediaStreamTrack) => track.stop())
      audioRefs.mediaStream.current = null
    }
    setVoiceState(prev => ({ ...prev, isListening: false, volume: 0, frequency: [] }))
  }

  const toggleListening = () => {
    if (voiceState.isListening) stopListening()
    else startListening()
  }

  return {
    voiceState,
    setVoiceState,
    toggleListening,
    stopListening
  }
}