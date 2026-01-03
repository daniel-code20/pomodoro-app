import { useEffect, useReducer, useRef } from "react"
import {
  WORK_TIME,
  SHORT_BREAK_TIME,
  LONG_BREAK_TIME,
  ROUNDS_BEFORE_LONG_BREAK,
} from "../utils/constants"
import type { TimerMode } from "../types"

type State = {
  secondsLeft: number
  isRunning: boolean
  mode: TimerMode
  rounds: number
}

type Action =
  | { type: "START" }
  | { type: "PAUSE" }
  | { type: "RESET" }
  | { type: "TICK" }
  | { type: "FINISH" }
  | { type: "SET_MODE"; mode: TimerMode }

const initialState: State = {
  secondsLeft: WORK_TIME,
  isRunning: false,
  mode: "work",
  rounds: 0,
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "START":
      return { ...state, isRunning: true }

    case "PAUSE":
      return { ...state, isRunning: false }

    case "RESET":
      return initialState

    case "TICK":
      return {
        ...state,
        secondsLeft: state.secondsLeft - 1,
      }

    case "SET_MODE": {
      let seconds = WORK_TIME

      if (action.mode === "short-break") {
        seconds = SHORT_BREAK_TIME
      }

      if (action.mode === "long-break") {
        seconds = LONG_BREAK_TIME
      }

      return {
        ...state,
        mode: action.mode,
        secondsLeft: seconds,
        isRunning: false,
      }
    }

    case "FINISH": {
      if (state.mode === "work") {
        const nextRounds = state.rounds + 1
        const isLongBreak =
          nextRounds % ROUNDS_BEFORE_LONG_BREAK === 0

        return {
          ...state,
          rounds: nextRounds,
          mode: isLongBreak ? "long-break" : "short-break",
          secondsLeft: isLongBreak
            ? LONG_BREAK_TIME
            : SHORT_BREAK_TIME,
          isRunning: false,
        }
      }

      return {
        ...state,
        mode: "work",
        secondsLeft: WORK_TIME,
        isRunning: false,
      }
    }

    default:
      return state
  }
}

export const useTimer = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const intervalRef = useRef<number | null>(null)

  // ⏲️ Interval
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

  // ⏹️ Finish
  useEffect(() => {
    if (state.secondsLeft === 0) {
      dispatch({ type: "FINISH" })
    }
  }, [state.secondsLeft])

  return {
    ...state,
    start: () => dispatch({ type: "START" }),
    pause: () => dispatch({ type: "PAUSE" }),
    reset: () => dispatch({ type: "RESET" }),
    setMode: (mode: TimerMode) =>
      dispatch({ type: "SET_MODE", mode }),
  }
}
