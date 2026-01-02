import { useEffect } from "react"
import { useLocalStorage } from "./useLocalStorage"

type Theme = "light" | "dark"

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "dark")

  useEffect(() => {
    const root = document.documentElement

    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  return {
    theme,
    toggleTheme,
  }
}
