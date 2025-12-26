import { useAudio } from "../../hooks/useAudio"

const MusicPlayer = () => {
  const {
    sounds,
    isPlaying,
    volume,
    sound,
    play,
    pause,
    setVolume,
    setSound,
  } = useAudio()

  return (
    <div className="mt-6 w-full max-w-sm rounded-xl border border-gray-200 dark:border-gray-700 p-4">
      <h3 className="text-sm font-semibold mb-3 opacity-70">
        Background sound
      </h3>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-4">
        {!isPlaying ? (
          <button
            onClick={play}
            className="px-4 py-1 rounded-md bg-green-600 text-white text-sm"
          >
            Play
          </button>
        ) : (
          <button
            onClick={pause}
            className="px-4 py-1 rounded-md bg-yellow-500 text-white text-sm"
          >
            Pause
          </button>
        )}

        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="flex-1"
        />
      </div>

      {/* Sound selector */}
      <div className="flex gap-2 flex-wrap">
        {sounds.map((s) => (
          <button
            key={s.src}
            onClick={() => setSound(s)}
            className={`px-3 py-1 rounded-md text-xs border transition
              ${
                sound.src === s.src
                  ? "bg-gray-200 dark:bg-gray-700"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MusicPlayer
