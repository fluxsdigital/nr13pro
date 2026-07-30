import { settings } from "@/lib/store"
import type { Settings, UpdateSettingsDTO } from "@/lib/settings"

export interface SettingsService {
  get(): Promise<Settings>
  update(data: UpdateSettingsDTO): Promise<Settings>
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
    return settings
  }
}

export const settingsService: SettingsService = new MockSettingsService()