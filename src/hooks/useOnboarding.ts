import { useState } from "react"

const STORAGE_KEY = "onboarding_completed"

export const useOnboarding = () => {
  const [isOpen, setIsOpen] = useState(() => {
    const completed = localStorage.getItem(STORAGE_KEY)
    return !completed
  })

  const completeOnboarding = () => {
    localStorage.setItem(STORAGE_KEY, "true")
    setIsOpen(false)
  }

  return {
    isOpen,
    completeOnboarding,
  }
}
