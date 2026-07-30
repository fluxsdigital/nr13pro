import { settings } from "@/lib/store"
import type { Settings, UpdateSettingsDTO } from "@/lib/settings"

type SettingsListener = () => void
const listeners: SettingsListener[] = []

function notifyListeners() {
  listeners.forEach((l) => l())
  window.dispatchEvent(new Event("settings-updated"))
}

export interface SettingsService {
  get(): Promise<Settings>
  update(data: UpdateSettingsDTO): Promise<Settings>
  onChange(listener: () => void): () => void
}

class MockSettingsService implements SettingsService {
  async get() {
    return settings
  }

  async update(data: UpdateSettingsDTO) {
    if (data.profile) {
      settings.profile = { ...settings.profile, ...data.profile }
    }
    if (data.payment) {
      settings.payment = { ...settings.payment, ...data.payment }
    }
    if (data.preferences) {
      settings.preferences = { ...settings.preferences, ...data.preferences }
    }
    settings.updatedAt = new Date().toISOString()
    notifyListeners()
    return settings
  }

  onChange(listener: () => void) {
    listeners.push(listener)
    return () => {
      const idx = listeners.indexOf(listener)
      if (idx !== -1) listeners.splice(idx, 1)
    }
  }
}

export const settingsService: SettingsService = new MockSettingsService()
