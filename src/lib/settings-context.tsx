"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { settings } from "./store"
import { settingsService } from "./services"

type Profile = { name: string; crea: string }

type SettingsContextValue = {
  profile: Profile
}

const SettingsContext = createContext<SettingsContextValue>({
  profile: { name: "", crea: "" },
})

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>({
    name: settings.profile.nome,
    crea: settings.profile.crea,
  })

  useEffect(() => {
    function handleUpdate() {
      setProfile({
        name: settings.profile.nome,
        crea: settings.profile.crea,
      })
    }

    const unsub = settingsService.onChange(handleUpdate)
    window.addEventListener("settings-updated", handleUpdate)
    return () => {
      unsub()
      window.removeEventListener("settings-updated", handleUpdate)
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