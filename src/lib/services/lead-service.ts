import { leads, persistirLeads } from "@/lib/store"
import type { Lead, CreateLeadDTO, UpdateLeadDTO } from "@/lib/types"
import { authService } from "@/lib/services/auth-service"

// Duração da degustação liberada pelo closer (7 dias)
export const DIAS_DEGUSTACAO = 7

export interface LeadService {
  list(filters?: { status?: string; userId?: string }): Promise<Lead[]>
  getById(id: string): Promise<Lead | undefined>
  create(data: CreateLeadDTO, userId: string): Promise<Lead>
  update(id: string, data: UpdateLeadDTO): Promise<Lead>
  delete(id: string): Promise<void>
  // Automação WhatsApp: marca como contatado e registra o último contato
  enviarMensagemAutomatizada(id: string): Promise<Lead>
  // Transferência para consultor humano
  transferirParaConsultor(id: string): Promise<Lead>
  // Closer libera acesso de degustação (gera credenciais demo para o lead)
  liberarAcessoDegustacao(id: string): Promise<Lead>
}

class MockLeadService implements LeadService {
  private nextId = 100

  async list(filters?: { status?: string; userId?: string }) {
    let result = leads
    if (filters?.userId) {
      result = result.filter((l) => l.userId === filters.userId)
    }
    if (filters?.status && filters.status !== "") {
      result = result.filter((l) => l.status === filters.status)
    }
    return result
  }

  async getById(id: string) {
    return leads.find((l) => l.id === id)
  }

  async create(data: CreateLeadDTO, userId: string) {
    const lead: Lead = {
      ...data,
      id: String(this.nextId++),
      userId,
      criadoEm: new Date().toISOString(),
      ultimoContato: null,
      transferidoConsultor: false,
      acessoDegustacaoLiberado: false,
      dataLiberacaoAcesso: null,
      credenciaisDegustacao: null,
    }
    leads.push(lead)
    persistirLeads()
    return lead
  }

  async update(id: string, data: UpdateLeadDTO) {
    const idx = leads.findIndex((l) => l.id === id)
    if (idx === -1) throw new Error("Lead não encontrado")
    leads[idx] = { ...leads[idx], ...data }
    persistirLeads()
    return leads[idx]
  }

  async delete(id: string) {
    const idx = leads.findIndex((l) => l.id === id)
    if (idx === -1) throw new Error("Lead não encontrado")
    leads.splice(idx, 1)
    persistirLeads()
  }

  async enviarMensagemAutomatizada(id: string) {
    const idx = leads.findIndex((l) => l.id === id)
    if (idx === -1) throw new Error("Lead não encontrado")
    leads[idx] = {
      ...leads[idx],
      status: leads[idx].status === "novo" || leads[idx].status === "abandonou_checkout" ? "contatado" : leads[idx].status,
      ultimoContato: new Date().toISOString(),
    }
    persistirLeads()
    return leads[idx]
  }

  async transferirParaConsultor(id: string) {
    const idx = leads.findIndex((l) => l.id === id)
    if (idx === -1) throw new Error("Lead não encontrado")
    leads[idx] = {
      ...leads[idx],
      status: "consultor",
      transferidoConsultor: true,
      ultimoContato: new Date().toISOString(),
    }
    persistirLeads()
    return leads[idx]
  }

  async liberarAcessoDegustacao(id: string) {
    const idx = leads.findIndex((l) => l.id === id)
    if (idx === -1) throw new Error("Lead não encontrado")
    if (leads[idx].acessoDegustacaoLiberado) return leads[idx]

    // Gera credenciais de degustação com validade de 7 dias
    // Remove acentos (João → joao) antes de montar o e-mail
    const base = leads[idx].email
      ? leads[idx].email.split("@")[0]
      : leads[idx].nome
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]/g, ".")
    const email = `${base}@degustacao.nr13pro.com.br`
    const senha = "123456"
    const expiraEm = new Date(Date.now() + DIAS_DEGUSTACAO * 24 * 60 * 60 * 1000).toISOString()

    // Cria o usuário REAL no mock de autenticação — o lead poderá logar no sistema
    await authService.criarUsuarioDegustacao({
      nome: leads[idx].nome,
      email,
      senha,
      expiraEm,
    })

    leads[idx] = {
      ...leads[idx],
      status: "em_negociacao",
      acessoDegustacaoLiberado: true,
      dataLiberacaoAcesso: new Date().toISOString(),
      credenciaisDegustacao: { email, senha, expiraEm },
      ultimoContato: new Date().toISOString(),
    }
    persistirLeads()
    return leads[idx]
  }
}

export const leadService: LeadService = new MockLeadService()
