"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { settingsService } from "@/lib/services"

type Theme = "light" | "dark"

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => Promise<void>
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  setTheme: async () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark")

  useEffect(() => {
    async function init() {
      const settingsFromStore = await settingsService.get()
      const savedTheme = localStorage.getItem("theme") as Theme | null
      if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
        setThemeState(savedTheme)
        document.documentElement.setAttribute("data-theme", savedTheme)
      } else {
        const defaultTheme = settingsFromStore.preferences.theme === "dark" ? "dark" : "light"
        setThemeState(defaultTheme)
        document.documentElement.setAttribute("data-theme", defaultTheme)
      }
    }
    init()
  }, [])

  async function setTheme(newTheme: Theme) {
    localStorage.setItem("theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
    const s = await settingsService.get()
    await settingsService.update({
      preferences: { ...s.preferences, theme: newTheme },
    })
    setThemeState(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
