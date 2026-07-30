"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { settingsService } from "@/lib/services"

type AppSettings = {
  profile: {
    nome: string
    crea: string
    email: string
    foto: string
  }
  payment: {
    cardNumber: string
    holderName: string
    expiry: string
    brand: string
    last4: string
  }
  preferences: {
    theme: "light" | "dark"
    notifications: boolean
  }
  updatedAt: string
}

type SettingsContextType = {
  settings: AppSettings
  updateSettings: (newSettings: Partial<AppSettings>) => Promise<void>
  isLoading: boolean
}

const SettingsContext = createContext<SettingsContextType | null>(null)

const DEFAULT_SETTINGS: AppSettings = {
  profile: { nome: "", crea: "", email: "", foto: "" },
  payment: { cardNumber: "", holderName: "", expiry: "", brand: "", last4: "" },
  preferences: { theme: "dark", notifications: true },
  updatedAt: "",
}

export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => {
    if (typeof window === "undefined") {
      return DEFAULT_SETTINGS
    }

    const stored = localStorage.getItem("app-settings")
    if (!stored) return DEFAULT_SETTINGS

    try {
      return JSON.parse(stored) as AppSettings
    } catch {
      console.error("Error parsing app-settings")
      return DEFAULT_SETTINGS
    }
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = () => {
      const stored = localStorage.getItem("app-settings")
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as AppSettings
          setSettings({ ...parsed })
        } catch {
          console.error("Error parsing app-settings")
        }
      }

      settingsService.get()
        .then((s) => {
          setSettings(s)
          localStorage.setItem("app-settings", JSON.stringify(s))
        })
        .catch(() => {
          if (!localStorage.getItem("app-settings")) {
            setSettings(DEFAULT_SETTINGS)
            localStorage.setItem("app-settings", JSON.stringify(DEFAULT_SETTINGS))
          }
        })
        .finally(() => {
          setIsLoading(false)
        })
    }

    loadData()
  }, [])

  const updateSettings = async (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings }
    setSettings(updated)
    localStorage.setItem("app-settings", JSON.stringify(updated))

    if (newSettings.preferences?.theme) {
      localStorage.setItem("theme", newSettings.preferences.theme)
      document.documentElement.setAttribute("data-theme", newSettings.preferences.theme)
    }

    if (newSettings.profile) {
      await settingsService.update({
        profile: newSettings.profile
      })
    }
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, isLoading }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useAppSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error("AppSettingsProvider not found")
  return ctx
}
