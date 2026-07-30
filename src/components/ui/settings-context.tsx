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

export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => {
    if (typeof window === "undefined") return {
      profile: { nome: "", crea: "", email: "", foto: "" },
      payment: { cardNumber: "", holderName: "", expiry: "", brand: "", last4: "" },
      preferences: { theme: "dark", notifications: true },
      updatedAt: "",
    }
    
    const stored = localStorage.getItem("app-settings")
    if (!stored) return {
      profile: { nome: "", crea: "", email: "", foto: "" },
      payment: { cardNumber: "", holderName: "", expiry: "", brand: "", last4: "" },
      preferences: { theme: "dark", notifications: true },
      updatedAt: "",
    }
    
    try {
      return JSON.parse(stored) as AppSettings
    } catch (e) {
      console.error("Error parsing app-settings:", e)
      return {
        profile: { nome: "", crea: "", email: "", foto: "" },
        payment: { cardNumber: "", holderName: "", expiry: "", brand: "", last4: "" },
        preferences: { theme: "dark", notifications: true },
        updatedAt: "",
      }
    }
  })

  useEffect(() => {
    const stored = localStorage.getItem("app-settings")
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AppSettings
        setSettings(parsed)
      } catch (e) {
        console.error("Error parsing app-settings:", e)
      }
    }

    settingsService.get()
      .then((s) => {
        setSettings(s)
        localStorage.setItem("app-settings", JSON.stringify(s))
      })
      .catch((err) => {
        console.error("Error loading settings:", err)
        if (!localStorage.getItem("app-settings")) {
          setSettings({
            profile: { nome: "", crea: "", email: "", foto: "" },
            payment: { cardNumber: "", holderName: "", expiry: "", brand: "", last4: "" },
            preferences: { theme: "dark", notifications: true },
            updatedAt: "",
          })
          localStorage.setItem("app-settings", JSON.stringify({
            profile: { nome: "", crea: "", email: "", foto: "" },
            payment: { cardNumber: "", holderName: "", expiry: "", brand: "", last4: "" },
            preferences: { theme: "dark", notifications: true },
            updatedAt: "",
          }))
        }
      })
  }, [])

  async function updateSettings(newSettings: Partial<AppSettings>) {
    const updated = { ...settings, ...newSettings }
    setSettings(updated)
    localStorage.setItem("app-settings", JSON.stringify(updated))

    await settingsService.update(newSettings)
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
