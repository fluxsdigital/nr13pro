import {
  seedClientes, seedEquipamentos, seedInspecoes, seedLaudos, seedLeads,
} from "./seed-data"

import type { Settings } from "./settings"
import type { Lead } from "./types"

export const clientes = seedClientes
export const equipamentos = seedEquipamentos
export const inspecoes = seedInspecoes
export const laudos = seedLaudos

// Leads persistem em localStorage — o lead criado na landing deve aparecer
// para o closer mesmo após recarregar a página ou abrir em outra aba.
const LEADS_STORAGE_KEY = "nr13pro_leads"

function carregarLeads(): Lead[] {
  if (typeof window === "undefined") return seedLeads
  try {
    const stored = localStorage.getItem(LEADS_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as Lead[]
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {
    // localStorage indisponível — usa o seed em memória
  }
  return seedLeads
}

export const leads: Lead[] = carregarLeads()

export function persistirLeads(): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads))
  } catch {
    // localStorage indisponível — mantém apenas em memória
  }
}

export const settings: Settings = {
  profile: {
    nome: "Carlos Eduardo Mendes",
    crea: "CREA-SP • 123.456",
    email: "carlos.mendes@engenharia.com.br",
    foto: "",
  },
  payment: {
    cardNumber: "**** **** **** 4242",
    holderName: "CARLOS EDUARDO MENDES",
    expiry: "12/28",
    brand: "Visa",
    last4: "4242",
  },
  preferences: {
    theme: "dark",
    notifications: true,
  },
  updatedAt: new Date().toISOString(),
}
