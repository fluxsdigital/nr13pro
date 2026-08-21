import { api, getApiErrorMessage } from "@/lib/api"
import type { Cliente, CreateClienteDTO, UpdateClienteDTO } from "@/lib/types"

export interface ClienteService {
  list(userId?: string): Promise<Cliente[]>
  getById(id: string): Promise<Cliente | undefined>
  create(data: CreateClienteDTO, userId: string): Promise<Cliente>
  update(id: string, data: UpdateClienteDTO): Promise<Cliente>
  delete(id: string): Promise<void>
}

export const clienteService: ClienteService = {
  async list() {
    try {
      const { data } = await api.get<Cliente[]>("/clientes")
      return data
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async getById(id) {
    try {
      const { data } = await api.get<Cliente>(`/clientes/${id}`)
      return data
    } catch {
      return undefined
    }
  },

  async create(data) {
    try {
      const { data: cliente } = await api.post<Cliente>("/clientes", data)
      return cliente
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async update(id, data) {
    try {
      const { data: cliente } = await api.patch<Cliente>(`/clientes/${id}`, data)
      return cliente
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async delete(id) {
    try {
      await api.delete(`/clientes/${id}`)
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },
}
