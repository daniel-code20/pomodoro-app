import { createContext } from "react"

export type Settings = {
  work: number
  shortBreak: number
  longBreak: number
}

export type ContextType = {
  settings: Settings
  updateSettings: (s: Settings) => void
}

export const TimerSettingsContext =
  createContext<ContextType | null>(null)
