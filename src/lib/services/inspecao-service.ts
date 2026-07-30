import { inspecoes } from "@/lib/store"
import type { Inspecao, CreateInspecaoDTO, UpdateInspecaoDTO } from "@/lib/types"

export interface InspecaoService {
  list(filters?: { equipamentoId?: string; userId?: string }): Promise<Inspecao[]>
  getById(id: string): Promise<Inspecao | undefined>
  create(data: CreateInspecaoDTO, userId: string): Promise<Inspecao>
  update(id: string, data: UpdateInspecaoDTO): Promise<Inspecao>
  delete(id: string): Promise<void>
}

class MockInspecaoService implements InspecaoService {
  private nextId = 100
  private nextSubId = 200

  async list(filters?: { equipamentoId?: string; userId?: string }) {
    let result = inspecoes
    if (filters?.userId) {
      result = result.filter((i) => i.userId === filters.userId)
    }
    if (filters?.equipamentoId) {
      result = result.filter((i) => i.equipamentoId === filters.equipamentoId)
    }
    return result
  }

  async getById(id: string) {
    return inspecoes.find((i) => i.id === id)
  }

  async create(data: CreateInspecaoDTO, userId: string) {
    const inspecao: Inspecao = {
      ...data,
      id: String(this.nextId++),
      userId,
      checklist: data.checklist.map((c, i) => ({
        ...c,
        id: String(this.nextSubId++),
      })),
      medicoes: data.medicoes.map((m) => ({
        ...m,
        id: String(this.nextSubId++),
        espessuraAnterior: null,
        dataMedicao: data.dataInicio,
      })),
      anomalias: data.anomalias.map((a) => ({
        ...a,
        id: String(this.nextSubId++),
      })),
      dispositivosSeguranca: data.dispositivosSeguranca.map((d) => ({
        ...d,
        id: String(this.nextSubId++),
      })),
      laudoId: null,
    }
    inspecoes.push(inspecao)
    return inspecao
  }

  async update(id: string, data: UpdateInspecaoDTO) {
    const idx = inspecoes.findIndex((i) => i.id === id)
    if (idx === -1) throw new Error("Inspeção não encontrada")
    // Only update simple fields, preserve sub-arrays
    const current = inspecoes[idx]
    if (data.concluida !== undefined) current.concluida = data.concluida
    if (data.parecer !== undefined) current.parecer = data.parecer
    if (data.laudoId !== undefined) current.laudoId = data.laudoId
    if (data.dataInicio !== undefined) current.dataInicio = data.dataInicio
    if (data.dataTermino !== undefined) current.dataTermino = data.dataTermino
    if (data.tipo !== undefined) current.tipo = data.tipo
    if (data.examesExternos !== undefined) current.examesExternos = data.examesExternos
    if (data.examesInternos !== undefined) current.examesInternos = data.examesInternos
    if (data.testeHidrostatico !== undefined) current.testeHidrostatico = data.testeHidrostatico
    if (data.temSPIE !== undefined) current.temSPIE = data.temSPIE
    return current
  }

  async delete(id: string) {
    const idx = inspecoes.findIndex((i) => i.id === id)
    if (idx === -1) throw new Error("Inspeção não encontrada")
    inspecoes.splice(idx, 1)
  }
}

export const inspecaoService: InspecaoService = new MockInspecaoService()
