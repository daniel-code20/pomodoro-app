import { useContext } from "react"
import {
  TimerSettingsContext,
  type ContextType,
} from "./TimerSettingsContext"

export const useTimerSettings = (): ContextType => {
  const ctx = useContext(TimerSettingsContext)
  if (!ctx)
    throw new Error(
      "useTimerSettings must be used inside TimerSettingsProvider"
    )
  return ctx
}
