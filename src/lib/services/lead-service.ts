import { api, getApiErrorMessage } from "@/lib/api"
import type { Lead, CreateLeadDTO, UpdateLeadDTO } from "@/lib/types"

// Duração da degustação liberada pelo closer (7 dias)
export const DIAS_DEGUSTACAO = 7

export interface LeadService {
  list(filters?: { status?: string; userId?: string }): Promise<Lead[]>
  getById(id: string): Promise<Lead | undefined>
  create(data: CreateLeadDTO): Promise<Lead>
  update(id: string, data: UpdateLeadDTO): Promise<Lead>
  delete(id: string): Promise<void>
  // Automação WhatsApp: marca como contatado e registra o último contato
  enviarMensagemAutomatizada(id: string): Promise<Lead>
  // Transferência para consultor humano
  transferirParaConsultor(id: string): Promise<Lead>
  // Closer libera acesso de degustação (gera credenciais demo para o lead)
  liberarAcessoDegustacao(id: string): Promise<Lead>
}

export const leadService: LeadService = {
  async list(filters) {
    try {
      const params: Record<string, string> = {}
      if (filters?.status && filters.status !== "") params.status = filters.status
      // userId é ignorado: backend escopa por role (closer vê tudo)
      const { data } = await api.get<Lead[]>("/leads", { params })
      return data
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async getById(id) {
    try {
      const { data } = await api.get<Lead>(`/leads/${id}`)
      return data
    } catch {
      return undefined
    }
  },

  // Rota pública no backend (captura na landing/checkout)
  async create(data) {
    try {
      const { data: lead } = await api.post<Lead>("/leads", data)
      return lead
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async update(id, data) {
    try {
      const { data: lead } = await api.patch<Lead>(`/leads/${id}`, data)
      return lead
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async delete(id) {
    try {
      await api.delete(`/leads/${id}`)
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async enviarMensagemAutomatizada(id) {
    try {
      const { data } = await api.post<Lead>(`/leads/${id}/whatsapp`)
      return data
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async transferirParaConsultor(id) {
    try {
      const { data } = await api.post<Lead>(`/leads/${id}/consultor`)
      return data
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async liberarAcessoDegustacao(id) {
    try {
      // Backend cria o usuário de degustação e devolve o lead atualizado
      const { data } = await api.post<Lead>(`/leads/${id}/degustacao`)
      return data
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },
}
