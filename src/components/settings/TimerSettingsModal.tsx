import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  settings: {
    work: number;
    shortBreak: number;
    longBreak: number;
  };
  onSave: (settings: Props["settings"]) => void;
};

type LocalSettings = {
  work: number | "";
  shortBreak: number | "";
  longBreak: number | "";
};

const minutes = (seconds: number) => Math.floor(seconds / 60);

const TimerSettingsModal = ({ isOpen, onClose, settings, onSave }: Props) => {
  const [local, setLocal] = useState<LocalSettings>({
    work: minutes(settings.work),
    shortBreak: minutes(settings.shortBreak),
    longBreak: minutes(settings.longBreak),
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100dvh";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // ---------- Validaciones ----------
  const errors = {
    work: local.work === "" || local.work < 1,
    shortBreak: local.shortBreak === "" || local.shortBreak < 1,
    longBreak: local.longBreak === "" || local.longBreak < 1,
  };

  const hasErrors = Object.values(errors).some(Boolean);

  // ---------- Handlers ----------
  const handleSave = () => {
    if (hasErrors) return;

    onSave({
      work: Number(local.work) * 60,
      shortBreak: Number(local.shortBreak) * 60,
      longBreak: Number(local.longBreak) * 60,
    });
    onClose();
  };

  const handleChange = (key: keyof LocalSettings, value: string) => {
    setLocal((prev) => ({
      ...prev,
      [key]: value === "" ? "" : Number(value),
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center px-4">
      <div className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-2xl p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4">Timer Settings</h2>

        <div className="space-y-4">
          {[
            { label: "Work", key: "work" },
            { label: "Short Break", key: "shortBreak" },
            { label: "Long Break", key: "longBreak" },
          ].map((item) => {
            const key = item.key as keyof LocalSettings;
            const hasError = errors[key];

            return (
              <div key={item.key} className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm">{item.label}</span>
                  <input
                    type="number"
                    min={1}
                    value={local[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className={`
                      w-20 px-2 py-1 rounded-md bg-transparent border
                      ${
                        hasError
                          ? "border-red-500 focus:outline-red-500"
                          : "border-neutral-300 dark:border-neutral-700"
                      }
                    `}
                  />
                </div>

                {hasError && (
                  <span className="text-xs text-red-500">
                    Must be a value greater than 0
                  </span>
                )}
              </div>
            );
          })}
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
            disabled={hasErrors}
            className={`
              px-4 py-2 rounded-lg text-sm transition
              ${
                hasErrors
                  ? "bg-neutral-400 cursor-not-allowed text-white"
                  : "bg-neutral-800 hover:bg-neutral-700 text-white"
              }
            `}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerSettingsModal;