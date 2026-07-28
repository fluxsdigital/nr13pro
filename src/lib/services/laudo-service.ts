import { laudos } from "@/lib/store"
import type { Laudo, CreateLaudoDTO, UpdateLaudoDTO } from "@/lib/types"

export interface LaudoService {
  list(): Promise<Laudo[]>
  getById(id: string): Promise<Laudo | undefined>
  getByInspecaoId(inspecaoId: string): Promise<Laudo | undefined>
  create(data: CreateLaudoDTO): Promise<Laudo>
  update(id: string, data: UpdateLaudoDTO): Promise<Laudo>
  delete(id: string): Promise<void>
}

class MockLaudoService implements LaudoService {
  private nextId = 100

  async list() {
    return [...laudos].sort((a, b) => b.dataEmissao.localeCompare(a.dataEmissao))
  }

  async getById(id: string) {
    return laudos.find((l) => l.id === id)
  }

  async getByInspecaoId(inspecaoId: string) {
    return laudos.find((l) => l.inspecaoId === inspecaoId)
  }

  async create(data: CreateLaudoDTO) {
    const laudo: Laudo = {
      ...data,
      id: String(this.nextId++),
      pdfUrl: null,
    }
    laudos.push(laudo)
    return laudo
  }

  async update(id: string, data: UpdateLaudoDTO) {
    const idx = laudos.findIndex((l) => l.id === id)
    if (idx === -1) throw new Error("Laudo não encontrado")
    laudos[idx] = { ...laudos[idx], ...data }
    return laudos[idx]
  }

  async delete(id: string) {
    const idx = laudos.findIndex((l) => l.id === id)
    if (idx === -1) throw new Error("Laudo não encontrado")
    laudos.splice(idx, 1)
  }
}

export const laudoService: LaudoService = new MockLaudoService()
