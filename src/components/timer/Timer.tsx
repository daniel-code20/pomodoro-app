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

const Timer = () => {
  const {
    secondsLeft,
    isRunning,
    mode,
    rounds,
    start,
    pause,
    reset,
    setMode,
  } = useTimer()

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Mode selector */}
      <div className="flex gap-2 bg-gray-200 dark:bg-neutral-800 p-1 rounded-xl">
        {[
          { label: "Work", value: "work" },
          { label: "Short Break", value: "short-break" },
          { label: "Long Break", value: "long-break" },
        ].map((item) => (
          <button
            key={item.value}
            onClick={() => setMode(item.value as never)}
            className={`px-4 py-1.5 text-xs rounded-lg transition
              ${
                mode === item.value
                  ? "bg-neutral-800 text-white dark:bg-neutral-700 dark:text-white"
                  : "opacity-60 hover:opacity-100"
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Time */}
      <span className="text-7xl md:text-9xl text-neutral-800 dark:text-white font-bold tracking-tight">
        {formatTime(secondsLeft)}
      </span>

      {/* Controls */}
      <div className="flex gap-4">
        {!isRunning ? (
          <button
            onClick={start}
            className="px-6 py-2 rounded-lg bg-neutral-800 text-white hover:bg-neutral-700 transition"
          >
            Start
          </button>
        ) : (
          <button
            onClick={pause}
            className="px-6 py-2 rounded-lg bg-neutral-800 text-white hover:bg-neutral-700 transition"
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
