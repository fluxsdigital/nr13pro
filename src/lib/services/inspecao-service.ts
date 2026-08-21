import { api, getApiErrorMessage } from "@/lib/api"
import type { Inspecao, CreateInspecaoDTO, UpdateInspecaoDTO } from "@/lib/types"

export interface InspecaoService {
  list(filters?: { equipamentoId?: string; userId?: string }): Promise<Inspecao[]>
  getById(id: string): Promise<Inspecao | undefined>
  create(data: CreateInspecaoDTO, userId: string): Promise<Inspecao>
  update(id: string, data: UpdateInspecaoDTO): Promise<Inspecao>
  delete(id: string): Promise<void>
}

export const inspecaoService: InspecaoService = {
  async list(filters) {
    try {
      const params: Record<string, string> = {}
      if (filters?.equipamentoId) params.equipamentoId = filters.equipamentoId
      // userId é ignorado: o backend já escopa pelo token JWT
      const { data } = await api.get<Inspecao[]>("/inspecoes", { params })
      return data
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async getById(id) {
    try {
      const { data } = await api.get<Inspecao>(`/inspecoes/${id}`)
      return data
    } catch {
      return undefined
    }
  },

  async create(data) {
    try {
      const { data: inspecao } = await api.post<Inspecao>("/inspecoes", data)
      return inspecao
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async update(id, data) {
    try {
      const { data: inspecao } = await api.patch<Inspecao>(`/inspecoes/${id}`, data)
      return inspecao
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async delete(id) {
    try {
      await api.delete(`/inspecoes/${id}`)
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },
}
