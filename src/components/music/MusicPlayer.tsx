import { Play, Pause } from "lucide-react"
import { useAudio } from "../../hooks/useAudio"

const MusicPlayer = () => {
  const {
    sounds,
    isPlaying,
    sound,
    play,
    pause,
    setSound,
  } = useAudio()

  return (
    <div className="mt-6 w-full max-w-sm rounded-xl border border-gray-200 dark:border-neutral-700 p-4">
      <h3 className="text-sm font-semibold mb-4 opacity-70 text-center">
        Background sound
      </h3>

      {/* Play / Pause button */}
      <div className="flex justify-center mb-5">
        <button
          onClick={isPlaying ? pause : play}
          className="
            w-14 h-14 rounded-full
            bg-neutral-900 hover:bg-neutral-700 dark:bg-neutral-800
            flex items-center justify-center
            text-white
            transition-transform active:scale-95
            shadow-lg
          "
        >
          {isPlaying ? (
            <Pause size={26} fill="white" />
          ) : (
            <Play size={26} fill="white" className="ml-1" />
          )}
        </button>
      </div>

      {/* Sound selector */}
      <div className="flex gap-2 flex-wrap justify-center">
        {sounds.map((s) => (
          <button
            key={s.src}
            onClick={() => setSound(s)}
            className={`px-3 py-1 rounded-md text-xs transition
              ${
                sound.src === s.src
                  ? "bg-gray-200 dark:bg-neutral-800"
                  : "hover:bg-gray-300 dark:hover:bg-neutral-700"
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
