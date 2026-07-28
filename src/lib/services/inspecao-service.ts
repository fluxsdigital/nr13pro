import { inspecoes } from "@/lib/store"
import type { Inspecao, CreateInspecaoDTO, UpdateInspecaoDTO } from "@/lib/types"

export interface InspecaoService {
  list(filters?: { equipamentoId?: string }): Promise<Inspecao[]>
  getById(id: string): Promise<Inspecao | undefined>
  create(data: CreateInspecaoDTO): Promise<Inspecao>
  update(id: string, data: UpdateInspecaoDTO): Promise<Inspecao>
  delete(id: string): Promise<void>
}

class MockInspecaoService implements InspecaoService {
  private nextId = 100
  private nextSubId = 200

  async list(filters?: { equipamentoId?: string }) {
    let result = inspecoes
    if (filters?.equipamentoId) {
      result = result.filter((i) => i.equipamentoId === filters.equipamentoId)
    }
    return result
  }

  async getById(id: string) {
    return inspecoes.find((i) => i.id === id)
  }

  async create(data: CreateInspecaoDTO) {
    const inspecao: Inspecao = {
      ...data,
      id: String(this.nextId++),
      medicoes: data.medicoes.map((m) => ({
        ...m,
        id: String(this.nextSubId++),
        espessuraAnterior: null,
        dataMedicao: data.dataInicio,
      })),
      anomalias: data.anomalias.map((a) => ({
        ...a,
        id: String(this.nextSubId++),
        foto: null,
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
    if (data.laudoId !== undefined) inspecoes[idx].laudoId = data.laudoId
    return inspecoes[idx]
  }

  async delete(id: string) {
    const idx = inspecoes.findIndex((i) => i.id === id)
    if (idx === -1) throw new Error("Inspeção não encontrada")
    inspecoes.splice(idx, 1)
  }
}

export const inspecaoService: InspecaoService = new MockInspecaoService()
