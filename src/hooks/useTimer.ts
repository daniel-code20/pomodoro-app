import { useEffect, useReducer, useRef } from "react"
import { useTimerSettings } from "../context/useTimerSettings"
import type { TimerMode } from "../types"

type State = {
  secondsLeft: number
  isRunning: boolean
  mode: TimerMode
  rounds: number
}

type Times = {
  work: number
  shortBreak: number
  longBreak: number
}

type Action =
  | { type: "START" }
  | { type: "PAUSE" }
  | { type: "TICK" }
  | { type: "RESET"; time: number }
  | { type: "SET_MODE"; mode: TimerMode; times: Times }
  | {
      type: "FINISH"
      times: Times
      roundsBeforeLong: number
    }

const getTimeForMode = (mode: TimerMode, times: Times) => {
  switch (mode) {
    case "work":
      return times.work
    case "short-break":
      return times.shortBreak
    case "long-break":
      return times.longBreak
  }
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "START":
      return { ...state, isRunning: true }

    case "PAUSE":
      return { ...state, isRunning: false }

    case "TICK":
      return {
        ...state,
        secondsLeft: state.secondsLeft - 1,
      }

    case "RESET":
      return {
        ...state,
        secondsLeft: action.time,
        isRunning: false,
        rounds: 0,
      }

    case "SET_MODE": {
      const seconds = getTimeForMode(action.mode, action.times)

      return {
        ...state,
        mode: action.mode,
        secondsLeft: seconds,
        isRunning: false,
      }
    }

    case "FINISH": {
      const { work, shortBreak, longBreak } = action.times

      if (state.mode === "work") {
        const nextRounds = state.rounds + 1
        const isLongBreak = nextRounds % action.roundsBeforeLong === 0

        return {
          ...state,
          rounds: nextRounds,
          mode: isLongBreak ? "long-break" : "short-break",
          secondsLeft: isLongBreak ? longBreak : shortBreak,
          isRunning: false,
        }
      }

      return {
        ...state,
        mode: "work",
        secondsLeft: work,
        isRunning: false,
      }
    }

    default:
      return state
  }
}

export const useTimer = () => {
  const { settings } = useTimerSettings()
  const intervalRef = useRef<number | null>(null)

  const [state, dispatch] = useReducer(reducer, {
    secondsLeft: settings.work,
    isRunning: false,
    mode: "work",
    rounds: 0,
  })

  useEffect(() => {
    if (!state.isRunning) return

    intervalRef.current = window.setInterval(() => {
      dispatch({ type: "TICK" })
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [state.isRunning])

  useEffect(() => {
    if (state.secondsLeft === 0) {
      dispatch({
        type: "FINISH",
        times: settings,
        roundsBeforeLong: 4,
      })
    }
  }, [state.secondsLeft, settings])

  useEffect(() => {
    if (state.isRunning) return

    const time = getTimeForMode(state.mode, settings)

    dispatch({
      type: "RESET",
      time,
    })
  }, [settings, state.mode, state.isRunning])

  return {
    ...state,
    start: () => dispatch({ type: "START" }),
    pause: () => dispatch({ type: "PAUSE" }),
    reset: () => {
      const time = getTimeForMode(state.mode, settings)
      dispatch({ type: "RESET", time })
    },
    setMode: (mode: TimerMode) =>
      dispatch({
        type: "SET_MODE",
        mode,
        times: settings,
      }),
  }
}
