import {
  seedClientes, seedEquipamentos, seedInspecoes, seedLaudos,
} from "./seed-data"

import type { Settings } from "./settings"

export const clientes = seedClientes
export const equipamentos = seedEquipamentos
export const inspecoes = seedInspecoes
export const laudos = seedLaudos

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
