import { useState } from "react"

type Props = {
  isOpen: boolean
  onClose: () => void
  settings: {
    work: number
    shortBreak: number
    longBreak: number
  }
  onSave: (settings: Props["settings"]) => void
}

const minutes = (seconds: number) => Math.floor(seconds / 60)

const TimerSettingsModal = ({
  isOpen,
  onClose,
  settings,
  onSave,
}: Props) => {
  const [local, setLocal] = useState({
    work: minutes(settings.work),
    shortBreak: minutes(settings.shortBreak),
    longBreak: minutes(settings.longBreak),
  })

  if (!isOpen) return null

  const handleSave = () => {
    onSave({
      work: local.work * 60,
      shortBreak: local.shortBreak * 60,
      longBreak: local.longBreak * 60,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4">
          Timer Settings
        </h2>

        <div className="space-y-3">
          {[
            { label: "Work", key: "work" },
            { label: "Short Break", key: "shortBreak" },
            { label: "Long Break", key: "longBreak" },
          ].map((item) => (
            <div key={item.key} className="flex justify-between items-center">
              <span className="text-sm">{item.label}</span>
              <input
                type="number"
                min={1}
                className="w-20 px-2 py-1 rounded-md border dark:border-neutral-700 bg-transparent"
                value={local[item.key as keyof typeof local]}
                onChange={(e) =>
                  setLocal({
                    ...local,
                    [item.key]: Number(e.target.value),
                  })
                }
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm opacity-70 hover:opacity-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-neutral-800 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default TimerSettingsModal
