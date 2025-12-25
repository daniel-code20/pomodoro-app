import { useTimer } from "../../hooks/useTimer"
import ProgressRing from "./ProgressRing"
import {
  WORK_TIME,
  SHORT_BREAK_TIME,
  LONG_BREAK_TIME,
} from "../../utils/constants"

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m.toString().padStart(2, "0")}:${s
    .toString()
    .padStart(2, "0")}`
}

const getTotalTime = (mode: string) => {
  if (mode === "work") return WORK_TIME
  if (mode === "short-break") return SHORT_BREAK_TIME
  return LONG_BREAK_TIME
}

const getModeColor = (mode: string) => {
  if (mode === "work") return "#FFFF" // green
  if (mode === "short-break") return "#0ea5e9" // blue
  return "#8b5cf6" // purple
}

const Timer = () => {
  const {
    secondsLeft,
    isRunning,
    mode,
    rounds,
    start,
    pause,
    reset,
  } = useTimer()

  const totalTime = getTotalTime(mode)
  const progress = (secondsLeft / totalTime) * 100

  return (
    <div className="flex flex-col items-center gap-6">
      <span className="text-xs uppercase tracking-widest opacity-60">
        {mode.replace("-", " ")}
      </span>

      {/* Ring */}
      <div className="relative">
        <ProgressRing
          radius={120}
          stroke={8}
          progress={progress}
          color={getModeColor(mode)}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-mono font-semibold">
            {formatTime(secondsLeft)}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        {!isRunning ? (
          <button
            onClick={start}
            className="px-6 py-2 rounded-lg bg-white text-black hover:bg-zinc-200 transition"
          >
            Start
          </button>
        ) : (
          <button
            onClick={pause}
            className="px-6 py-2 rounded-lg bg-white text-black hover:bg-zinc-200 transition"
          >
            Pause
          </button>
        )}

        <button
          onClick={reset}
          className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-zinc-900 transition"
        >
          Reset
        </button>
      </div>

      <div className="text-xs opacity-60">
        Rounds completed: {rounds}
      </div>
    </div>
  )
}

export default Timer
