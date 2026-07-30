import { clientes, equipamentos, inspecoes, laudos } from "./store"

export function getCliente(id: string) {
  return clientes.find((c) => c.id === id)
}

export function getClientePorEquipamento(equipamentoId: string) {
  const eq = equipamentos.find((e) => e.id === equipamentoId)
  if (!eq) return undefined
  return clientes.find((c) => c.id === eq.clienteId)
}

export function getEquipamento(id: string) {
  return equipamentos.find((e) => e.id === id)
}

export function getEquipamentosDoCliente(clienteId: string) {
  return equipamentos.filter((e) => e.clienteId === clienteId)
}

export function getInspecoesPorEquipamento(equipamentoId: string) {
  return inspecoes.filter((i) => i.equipamentoId === equipamentoId)
}

export function getInspecoesDoCliente(clienteId: string) {
  const eqs = equipamentos.filter((e) => e.clienteId === clienteId)
  return inspecoes.filter((i) => eqs.some((e) => e.id === i.equipamentoId))
}

export function getLaudoPorInspecao(inspecaoId: string) {
  return laudos.find((l) => l.inspecaoId === inspecaoId)
}
