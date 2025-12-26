import { useEffect, useRef, useState } from "react"
import { useLocalStorage } from "./useLocalStorage"

type Sound = {
  label: string
  src: string
}

const SOUNDS: Sound[] = [
  { label: "Rain", src: "/sounds/rain.mp3" },
  { label: "Lo-fi", src: "/sounds/lofi.mp3" },
  { label: "White Noise", src: "/sounds/whitenoise.mp3" },
]

export const useAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useLocalStorage<number>("volume", 0.5)
  const [sound, setSound] = useLocalStorage<Sound>(
    "sound",
    SOUNDS[0]
  )

  // Inicializar audio
  useEffect(() => {
    audioRef.current = new Audio(sound.src)
    audioRef.current.loop = true
    audioRef.current.volume = volume

    if (isPlaying) {
      audioRef.current.play()
    }

    return () => {
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [sound])

  // Volumen
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Play / Pause
  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  return {
    sounds: SOUNDS,
    isPlaying,
    volume,
    sound,
    play: () => setIsPlaying(true),
    pause: () => setIsPlaying(false),
    setVolume,
    setSound,
  }
}
