"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type AppSettings = {
  profile: {
    name: string
    email: string
    phone: string
    company: string
    position: string
  }
  notifications: {
    email: boolean
    browser: boolean
    sms: boolean
  }
  theme: "light" | "dark"
  language: "pt-BR" | "en-US"
}

type SettingsContextType = {
  settings: AppSettings
  updateSettings: (newSettings: Partial<AppSettings>) => void
  isLoading: boolean
}

const defaultSettings: AppSettings = {
  profile: {
    name: "Carlos Eduardo Mendes",
    email: "carlos.mendes@engenharia.com.br",
    phone: "(11) 9999-9999",
    company: "Engenharia e Consultoria Ltda",
    position: "Responsável Técnico",
  },
  notifications: {
    email: true,
    browser: true,
    sms: false,
  },
  theme: "dark",
  language: "pt-BR",
}

const SettingsContext = createContext<SettingsContextType | null>(null)

export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => {
    if (typeof window === "undefined") return defaultSettings
    
    const stored = localStorage.getItem("app-settings")
    if (!stored) return defaultSettings
    
    try {
      return JSON.parse(stored)
    } catch (e) {
      console.error("Error parsing app-settings:", e)
      return defaultSettings
    }
  })

  useEffect(() => {
    const stored = localStorage.getItem("app-settings")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setSettings(parsed)
      } catch (e) {
        console.error("Error parsing app-settings:", e)
      }
    }
    
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "light" || savedTheme === "dark") {
      document.documentElement.setAttribute("data-theme", savedTheme)
      setSettings(prev => ({ ...prev, theme: savedTheme }))
    }
  }, [])

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings }
    setSettings(updated)
    localStorage.setItem("app-settings", JSON.stringify(updated))
    
    if (newSettings.theme) {
      localStorage.setItem("theme", newSettings.theme)
      document.documentElement.setAttribute("data-theme", newSettings.theme)
    }
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, isLoading: false }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useAppSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error("useAppSettings must be used within AppSettingsProvider")
  return ctx
}
