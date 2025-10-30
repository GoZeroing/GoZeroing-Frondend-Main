import { AI_RESPONSES } from '../constants/aiResponse'
import { VoiceState, AudioRefs } from '../types/types'

export const useAISpeech = (
  voiceState: VoiceState,
  setVoiceState: React.Dispatch<React.SetStateAction<VoiceState>>,
  setAiText: React.Dispatch<React.SetStateAction<string>>,
  setFullAiText: React.Dispatch<React.SetStateAction<string>>,
  audioRefs: AudioRefs
) => {
  const simulateAISpeech = () => {
    if (voiceState.isSpeaking) return

    setVoiceState(prev => ({ ...prev, isSpeaking: true, isListening: false }))

    if (audioRefs.mediaStream.current) {
      audioRefs.mediaStream.current.getTracks().forEach((track: MediaStreamTrack) => track.stop())
      audioRefs.mediaStream.current = null
    }

    const response = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)]
    setFullAiText(response)
    setAiText('')

    let currentWord = 0
    const words = response.split(' ')
    audioRefs.textRevealInterval.current = window.setInterval(() => {
      setAiText(words.slice(0, currentWord + 1).join(' '))
      currentWord++
      if (currentWord >= words.length) {
        clearInterval(audioRefs.textRevealInterval.current!)
      }
    }, 250)

    let phase = 0
    let wordIndex = 0
    const totalDuration = words.length * 300

    audioRefs.aiSpeechInterval.current = window.setInterval(() => {
      phase += 0.15
      wordIndex++

      const baseFrequency = Array(32).fill(0).map((_, i) => {
        const formant1 = Math.exp(-Math.pow((i - 3) / 2, 2)) * 180
        const formant2 = Math.exp(-Math.pow((i - 8) / 3, 2)) * 140
        const formant3 = Math.exp(-Math.pow((i - 15) / 4, 2)) * 100
        return formant1 + formant2 + formant3
      })

      const breathPattern = Math.sin(phase * 0.3) * 0.3 + 0.7
      const emphasis = Math.sin(phase * 1.2) * 0.4 + 0.6
      const consonantBurst = Math.random() > 0.7 ? Math.random() * 0.3 + 0.7 : 1

      const frequency = baseFrequency.map(f =>
        f * breathPattern * emphasis * consonantBurst * (0.8 + Math.random() * 0.4)
      )

      const baseVolume = 80 + Math.sin(phase * 0.5) * 30
      const microPause = Math.sin(phase * 3) > 0.9 ? 0.3 : 1
      const volume = baseVolume * emphasis * microPause

      setVoiceState(prev => ({ ...prev, frequency, volume }))

      if (wordIndex * 50 >= totalDuration) {
        if (audioRefs.aiSpeechInterval.current) clearInterval(audioRefs.aiSpeechInterval.current)
        if (audioRefs.textRevealInterval.current) clearInterval(audioRefs.textRevealInterval.current)
        setVoiceState(prev => ({ ...prev, isSpeaking: false, volume: 0, frequency: [] }))
        setTimeout(() => setAiText(''), 2000)
      }
    }, 50)
  }

  return { simulateAISpeech }
}