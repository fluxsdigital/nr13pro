import { api, getApiErrorMessage } from "@/lib/api"
import type { Laudo, CreateLaudoDTO, UpdateLaudoDTO } from "@/lib/types"

export interface LaudoService {
  list(userId?: string): Promise<Laudo[]>
  getById(id: string): Promise<Laudo | undefined>
  getByInspecaoId(inspecaoId: string): Promise<Laudo | undefined>
  create(data: CreateLaudoDTO, userId: string): Promise<Laudo>
  update(id: string, data: UpdateLaudoDTO): Promise<Laudo>
  delete(id: string): Promise<void>
}

export const laudoService: LaudoService = {
  async list() {
    try {
      const { data } = await api.get<Laudo[]>("/laudos")
      return [...data].sort((a, b) => b.dataEmissao.localeCompare(a.dataEmissao))
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async getById(id) {
    try {
      const { data } = await api.get<Laudo>(`/laudos/${id}`)
      return data
    } catch {
      return undefined
    }
  },

  async getByInspecaoId(inspecaoId) {
    try {
      const { data } = await api.get<Laudo>(`/laudos/inspecao/${inspecaoId}`)
      return data
    } catch {
      return undefined
    }
  },

  async create(data) {
    try {
      const { data: laudo } = await api.post<Laudo>("/laudos", data)
      return laudo
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async update(id, data) {
    try {
      const { data: laudo } = await api.patch<Laudo>(`/laudos/${id}`, data)
      return laudo
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async delete(id) {
    try {
      await api.delete(`/laudos/${id}`)
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },
}
