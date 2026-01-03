import { useState } from "react"
import {
  TimerSettingsContext,
  type Settings,
} from "./TimerSettingsContext"

const STORAGE_KEY = "timer_settings"

const DEFAULT_SETTINGS: Settings = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
}

export const TimerSettingsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [settings, setSettings] = useState<Settings>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : DEFAULT_SETTINGS
  })

  const updateSettings = (newSettings: Settings) => {
    setSettings(newSettings)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings))
  }

  return (
    <TimerSettingsContext.Provider
      value={{ settings, updateSettings }}
    >
      {children}
    </TimerSettingsContext.Provider>
  )
}
