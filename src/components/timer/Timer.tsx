import { useTimer } from "../../hooks/useTimer"
import TaskList from "../tasks/TaskList"
import MusicPlayer from "../music/MusicPlayer"

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m.toString().padStart(2, "0")}:${s
    .toString()
    .padStart(2, "0")}`
}

const getModeLabel = (mode: string) => {
  if (mode === "work") return "Work"
  if (mode === "short-break") return "Short break"
  return "Long break"
}

const Timer = () => {
  const { secondsLeft, isRunning, mode, rounds, start, pause, reset } =
    useTimer()

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Mode */}
      <span className="text-xs uppercase tracking-widest opacity-60">
        {getModeLabel(mode)}
      </span>

      {/* Time */}
      <span className="text-7xl md:text-9xl text-neutral-800 dark:text-white font-mono font-semibold tracking-tight">
        {formatTime(secondsLeft)}
      </span>

      {/* Controls */}
      <div className="flex gap-4">
        {!isRunning ? (
          <button
            onClick={start}
            className="px-6 py-2 rounded-lg bg-neutral-800 text-white hover:bg-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition"
          >
            Start
          </button>
        ) : (
          <button
            onClick={pause}
            className="px-6 py-2 rounded-lg bg-neutral-800 text-white hover:bg-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition"
          >
            Pause
          </button>
        )}

        <button
          onClick={reset}
          className="px-6 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-800 transition"
        >
          Reset
        </button>
      </div>

      {/* Rounds */}
      <div className="text-xs opacity-60">
        Rounds completed: {rounds}
      </div>

      <TaskList />
      <MusicPlayer />
    </div>
  )
}

export default Timer
