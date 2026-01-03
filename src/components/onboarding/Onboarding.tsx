import { useState } from "react"

type Props = {
  onFinish: () => void
}

const steps = [
  {
    title: "Welcome 👋",
    description: "This is your Pomodoro space to focus and stay productive.",
  },
  {
    title: "Timer ⏱️",
    description:
      "Work in focused sessions and take breaks at the right time.",
  },
  {
    title: "Tasks ✅",
    description:
      "Create small tasks and complete them during your focus sessions.",
  },
  {
    title: "Music 🎧",
    description:
      "Choose relaxing sounds to stay focused and calm.",
  },
]

const Onboarding = ({ onFinish }: Props) => {
  const [step, setStep] = useState(0)

  const isLast = step === steps.length - 1

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-full max-w-sm text-center shadow-xl">
        <h2 className="text-xl font-semibold mb-2">
          {steps[step].title}
        </h2>

        <p className="text-sm opacity-70 mb-6">
          {steps[step].description}
        </p>

        <div className="flex justify-between">
          <span className="text-xs opacity-50">
            {step + 1} / {steps.length}
          </span>

          <button
            onClick={() =>
              isLast ? onFinish() : setStep(step + 1)
            }
            className="px-4 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black"
          >
            {isLast ? "Start focusing" : "Next"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Onboarding
