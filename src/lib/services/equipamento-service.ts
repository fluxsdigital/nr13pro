import { equipamentos } from "@/lib/store"
import type { Equipamento, CreateEquipamentoDTO, UpdateEquipamentoDTO } from "@/lib/types"
import { classificarVaso, classificarCaldeira, obterGrupoPotencialRisco, calcularPV } from "@/lib/nr13"

export interface EquipamentoService {
  list(filters?: { clienteId?: string; search?: string }): Promise<Equipamento[]>
  getById(id: string): Promise<Equipamento | undefined>
  create(data: CreateEquipamentoDTO): Promise<Equipamento>
  update(id: string, data: UpdateEquipamentoDTO): Promise<Equipamento>
  delete(id: string): Promise<void>
}

function autoClassificar(data: CreateEquipamentoDTO) {
  if (data.tipo === "caldeira") {
    return { categoria: classificarCaldeira(data.pressaoOperacao), grupoPotencialRisco: null }
  }
  const pv = calcularPV(data.pressaoOperacao, data.volume)
  const grupo = obterGrupoPotencialRisco(pv)
  if (!grupo && data.classeFluido !== "A") {
    return { categoria: null, grupoPotencialRisco: null }
  }
  const result = classificarVaso(data.classeFluido, data.pressaoOperacao, data.volume)
  if (!result) {
    return { categoria: null, grupoPotencialRisco: grupo }
  }
  return { categoria: result.categoria, grupoPotencialRisco: result.grupo }
}

class MockEquipamentoService implements EquipamentoService {
  private nextId = 100

  async list(filters?: { clienteId?: string; search?: string }) {
    let result = equipamentos
    if (filters?.clienteId) {
      result = result.filter((e) => e.clienteId === filters.clienteId)
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase()
      result = result.filter(
        (e) =>
          e.tag.toLowerCase().includes(q) ||
          e.descricao.toLowerCase().includes(q) ||
          e.localizacao.toLowerCase().includes(q)
      )
    }
    return result
  }

  async getById(id: string) {
    return equipamentos.find((e) => e.id === id)
  }

  async create(data: CreateEquipamentoDTO) {
    const now = new Date().toISOString().slice(0, 10)
    const classificacao = autoClassificar(data)
    const equipamento: Equipamento = {
      ...data,
      id: String(this.nextId++),
      ...classificacao,
      createdAt: now,
    }
    equipamentos.push(equipamento)
    return equipamento
  }

  async update(id: string, data: UpdateEquipamentoDTO) {
    const idx = equipamentos.findIndex((e) => e.id === id)
    if (idx === -1) throw new Error("Equipamento não encontrado")
    const updated = { ...equipamentos[idx], ...data }
    if (data.pressaoOperacao !== undefined || data.volume !== undefined || data.classeFluido !== undefined || data.tipo !== undefined) {
      const classificacao = autoClassificar({
        clienteId: updated.clienteId, tag: updated.tag, descricao: updated.descricao,
        fabricante: updated.fabricante, numeroSerie: updated.numeroSerie,
        anoFabricacao: updated.anoFabricacao, pressaoOperacao: updated.pressaoOperacao,
        volume: updated.volume, pmta: updated.pmta, fluido: updated.fluido,
        classeFluido: updated.classeFluido, localizacao: updated.localizacao, tipo: updated.tipo,
      })
      updated.categoria = classificacao.categoria
      updated.grupoPotencialRisco = classificacao.grupoPotencialRisco
    }
    equipamentos[idx] = updated
    return updated
  }

  async delete(id: string) {
    const idx = equipamentos.findIndex((e) => e.id === id)
    if (idx === -1) throw new Error("Equipamento não encontrado")
    equipamentos.splice(idx, 1)
  }
}

export const equipamentoService: EquipamentoService = new MockEquipamentoService()
