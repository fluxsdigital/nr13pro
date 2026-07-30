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

const defaultSettings: AppSettings = {
  profile: { nome: "", crea: "", email: "", foto: "" },
  payment: { cardNumber: "", holderName: "", expiry: "", brand: "", last4: "" },
  preferences: { theme: "dark", notifications: true },
  updatedAt: "",
}

const SettingsContext = createContext<SettingsContextType | null>(null)

export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("app-settings")
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AppSettings
        setSettings({ ...defaultSettings, ...parsed })
      } catch (e) {
        console.error("Error parsing app-settings:", e)
        localStorage.removeItem("app-settings")
      }
    } else {
      settingsService.get()
        .then((s) => {
          setSettings(s)
          localStorage.setItem("app-settings", JSON.stringify(s))
        })
        .catch((err) => {
          console.error("Error loading settings:", err)
          setSettings(defaultSettings)
          localStorage.setItem("app-settings", JSON.stringify(defaultSettings))
        })
        .finally(() => {
          setIsLoading(false)
        })
    }

    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "light" || savedTheme === "dark") {
      document.documentElement.setAttribute("data-theme", savedTheme)
    }
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
      const profileForSidebar = {
        nome: newSettings.profile.nome,
        crea: newSettings.profile.crea,
        email: newSettings.profile.email,
        foto: newSettings.profile.foto,
      }
      localStorage.setItem("profile-settings", JSON.stringify({ profile: profileForSidebar }))

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
  if (!ctx) throw new Error("useAppSettings must be used within AppSettingsProvider")
  return ctx
}
