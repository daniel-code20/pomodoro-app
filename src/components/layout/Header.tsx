import { useState } from "react"
import { useTheme } from "../../hooks/useTheme"
import { useTimerSettings } from "../../context/useTimerSettings"
import TimerSettingsModal from "../settings/TimerSettingsModal"

const Header = () => {
  const { theme, toggleTheme } = useTheme()
  const { settings, updateSettings } = useTimerSettings()
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="h-16 flex items-center justify-between px-6 border-b mb-4 border-gray-200 dark:border-neutral-700">
        <h1 className="font-semibold text-lg">Pomodoro Focus</h1>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-md bg-gray-200 dark:bg-neutral-800 hover:bg-gray-300 dark:hover:bg-neutral-700 transition"
            aria-label="Settings"
          >
            ⚙️
          </button>

          <button
            onClick={toggleTheme}
            className="text-sm px-3 py-1 rounded-md bg-gray-200 dark:bg-neutral-800 hover:bg-gray-300 dark:hover:bg-neutral-700 transition"
          >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </header>

      <TimerSettingsModal
        isOpen={open}
        onClose={() => setOpen(false)}
        settings={settings}
        onSave={updateSettings}
      />
    </>
  )
}

export default Header
