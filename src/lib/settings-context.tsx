"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { settingsService } from "./services"
import type { Settings } from "./settings"

type Profile = { name: string; crea: string }

type SettingsContextValue = {
  profile: Profile
}

const SettingsContext = createContext<SettingsContextValue>({
  profile: { name: "", crea: "" },
})

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>({
    name: "",
    crea: "",
  })

  useEffect(() => {
    let cancelled = false

    function apply(s: Settings) {
      if (cancelled) return
      setProfile({ name: s.profile.nome, crea: s.profile.crea })
    }

    settingsService.get().then(apply).catch(() => {})

    const unsub = settingsService.onChange(() => {
      settingsService.get().then(apply).catch(() => {})
    })

    return () => {
      cancelled = true
      unsub()
    }
  }, [])

  return (
    <SettingsContext.Provider value={{ profile }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  return useContext(SettingsContext)
}
