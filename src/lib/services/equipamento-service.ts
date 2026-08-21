import { api, getApiErrorMessage } from "@/lib/api"
import type { Equipamento, CreateEquipamentoDTO, UpdateEquipamentoDTO } from "@/lib/types"

export interface EquipamentoService {
  list(filters?: { clienteId?: string; search?: string; userId?: string }): Promise<Equipamento[]>
  getById(id: string): Promise<Equipamento | undefined>
  create(data: CreateEquipamentoDTO, userId: string): Promise<Equipamento>
  update(id: string, data: UpdateEquipamentoDTO): Promise<Equipamento>
  delete(id: string): Promise<void>
}

export const equipamentoService: EquipamentoService = {
  async list(filters) {
    try {
      const params: Record<string, string> = {}
      if (filters?.clienteId) params.clienteId = filters.clienteId
      if (filters?.search) params.search = filters.search
      // userId é ignorado: o backend já escopa pelo token JWT
      const { data } = await api.get<Equipamento[]>("/equipamentos", { params })
      return data
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async getById(id) {
    try {
      const { data } = await api.get<Equipamento>(`/equipamentos/${id}`)
      return data
    } catch {
      return undefined
    }
  },

  async create(data) {
    try {
      const { data: equipamento } = await api.post<Equipamento>("/equipamentos", data)
      return equipamento
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async update(id, data) {
    try {
      const { data: equipamento } = await api.patch<Equipamento>(`/equipamentos/${id}`, data)
      return equipamento
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async delete(id) {
    try {
      await api.delete(`/equipamentos/${id}`)
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },
}
