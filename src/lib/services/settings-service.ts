import type { Settings, UpdateSettingsDTO } from "@/lib/settings"

// Sem rota correspondente no backend: preferências ficam locais
// (por usuário via chave derivada do e-mail quando disponível).
const STORAGE_KEY = "nr13pro_settings"

const DEFAULT_SETTINGS: Settings = {
  profile: { nome: "", crea: "", email: "", foto: "" },
  payment: { cardNumber: "", holderName: "", expiry: "", brand: "", last4: "" },
  preferences: { theme: "light", notifications: true },
  updatedAt: new Date().toISOString(),
}

type SettingsListener = () => void
const listeners: Set<SettingsListener> = new Set()

function notifyListeners() {
  listeners.forEach((l) => l())
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("settings-updated"))
  }
}

function readStored(): Settings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_SETTINGS
    const parsed = JSON.parse(raw) as Partial<Settings>
    return {
      profile: { ...DEFAULT_SETTINGS.profile, ...parsed.profile },
      payment: { ...DEFAULT_SETTINGS.payment, ...parsed.payment },
      preferences: { ...DEFAULT_SETTINGS.preferences, ...parsed.preferences },
      updatedAt: parsed.updatedAt ?? DEFAULT_SETTINGS.updatedAt,
    }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export interface SettingsService {
  get(): Promise<Settings>
  update(data: UpdateSettingsDTO): Promise<Settings>
  onChange(listener: () => void): () => void
}

export const settingsService: SettingsService = {
  async get() {
    return readStored()
  },

  async update(data) {
    const current = readStored()
    const next: Settings = {
      profile: data.profile ? { ...current.profile, ...data.profile } : current.profile,
      payment: data.payment ? { ...current.payment, ...data.payment } : current.payment,
      preferences: data.preferences
        ? { ...current.preferences, ...data.preferences }
        : current.preferences,
      updatedAt: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    notifyListeners()
    return next
  },

  onChange(listener) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
}
