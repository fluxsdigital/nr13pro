import { clientes } from "@/lib/store"
import type { Cliente, CreateClienteDTO, UpdateClienteDTO } from "@/lib/types"

export interface ClienteService {
  list(userId?: string): Promise<Cliente[]>
  getById(id: string): Promise<Cliente | undefined>
  create(data: CreateClienteDTO, userId: string): Promise<Cliente>
  update(id: string, data: UpdateClienteDTO): Promise<Cliente>
  delete(id: string): Promise<void>
}

class MockClienteService implements ClienteService {
  private nextId = 100

  async list(userId?: string) {
    if (!userId) return clientes
    return clientes.filter((c) => c.userId === userId)
  }

  async getById(id: string) {
    return clientes.find((c) => c.id === id)
  }

  async create(data: CreateClienteDTO, userId: string) {
    const now = new Date().toISOString().slice(0, 10)
    const cliente: Cliente = { ...data, userId, id: String(this.nextId++), createdAt: now }
    clientes.push(cliente)
    return cliente
  }

  async update(id: string, data: UpdateClienteDTO) {
    const idx = clientes.findIndex((c) => c.id === id)
    if (idx === -1) throw new Error("Cliente não encontrado")
    clientes[idx] = { ...clientes[idx], ...data }
    return clientes[idx]
  }

  async delete(id: string) {
    const idx = clientes.findIndex((c) => c.id === id)
    if (idx === -1) throw new Error("Cliente não encontrado")
    clientes.splice(idx, 1)
  }
}

export const clienteService: ClienteService = new MockClienteService()
