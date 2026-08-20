"use client"

import { useEffect, useMemo, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { leadService } from "@/lib/services"
import type { Lead, LeadStatus } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search, MessageCircle, UserCheck, Users, ShoppingCart, TrendingUp,
  CheckCircle2, XCircle, Phone, Mail, Clock, KeyRound, ShieldAlert,
  Copy, Check,
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const statusMeta: Record<LeadStatus, { label: string; color: string; badge: string }> = {
  novo: { label: "Novo", color: "text-blue-600", badge: "bg-blue-50 text-blue-700 border-blue-200" },
  abandonou_checkout: { label: "Abandonou Checkout", color: "text-amber-600", badge: "bg-amber-50 text-amber-700 border-amber-200" },
  contatado: { label: "Contatado", color: "text-indigo-600", badge: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  em_negociacao: { label: "Em negociação", color: "text-purple-600", badge: "bg-purple-50 text-purple-700 border-purple-200" },
  consultor: { label: "Com consultor", color: "text-primary", badge: "bg-primary-subtle text-primary border-primary/20" },
  convertido: { label: "Convertido", color: "text-success", badge: "bg-success-subtle text-success border-success/30" },
  perdido: { label: "Perdido", color: "text-text-muted", badge: "bg-card-hover text-text-muted border-border" },
}

function formatarWhatsApp(numero: string): string {
  const digits = numero.replace(/\D/g, "")
  if (digits.length === 13) return `+${digits.slice(0, 2)} (${digits.slice(2, 4)}) ${digits.slice(4, 9)}-${digits.slice(9)}`
  if (digits.length === 12) return `+${digits.slice(0, 2)} (${digits.slice(2, 4)}) ${digits.slice(4, 8)}-${digits.slice(8)}`
  return numero
}

function formatarData(iso: string | null): string {
  if (!iso) return "—"
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })
}

export default function Leads() {
  const { user } = useAuth()
  const [search, setSearch] = useState("")
  const [filtroStatus, setFiltroStatus] = useState("")
  const [data, setData] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [copiadoId, setCopiadoId] = useState<string | null>(null)

  const isCloser = user?.role === "closer"

  useEffect(() => {
    if (!isCloser) {
      setLoading(false)
      return
    }
    // Leads pertencem à empresa NR-13 Pro — closer vê toda a carteira
    leadService.list({ userId: "nr13pro_empresa" })
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [isCloser])

  const filtered = useMemo(() => {
    return data.filter((l) => {
      if (filtroStatus && l.status !== filtroStatus) return false
      const q = search.toLowerCase()
      return (
        l.nome.toLowerCase().includes(q) ||
        l.whatsapp.includes(q) ||
        l.email.toLowerCase().includes(q)
      )
    })
  }, [data, search, filtroStatus])

  const counts = useMemo(() => {
    return {
      total: data.length,
      abandonou: data.filter((l) => l.status === "abandonou_checkout").length,
      negociacao: data.filter((l) => l.status === "em_negociacao" || l.status === "consultor").length,
      convertidos: data.filter((l) => l.status === "convertido").length,
    }
  }, [data])

  const enviarWhatsApp = async (lead: Lead) => {
    // Simula o envio da mensagem automatizada via WhatsApp
    const atualizado = await leadService.enviarMensagemAutomatizada(lead.id)
    setData((prev) => prev.map((l) => (l.id === lead.id ? atualizado : l)))
    const msg = encodeURIComponent(
      lead.mensagemAutomatizada ??
      `Olá ${lead.nome.split(" ")[0]}! Vi que você demonstrou interesse no NR-13 Pro. Posso ajudar com alguma dúvida sobre o fechamento?`
    )
    window.open(`https://wa.me/${lead.whatsapp}?text=${msg}`, "_blank")
    toast.success(`Mensagem automatizada enviada para ${lead.nome.split(" ")[0]} via WhatsApp`)
  }

  const transferirConsultor = async (lead: Lead) => {
    const atualizado = await leadService.transferirParaConsultor(lead.id)
    setData((prev) => prev.map((l) => (l.id === lead.id ? atualizado : l)))
    toast.success(`Lead transferido para um consultor. Ele entrará em contato com ${lead.nome.split(" ")[0]}.`)
  }

  const liberarDegustacao = async (lead: Lead) => {
    try {
      const atualizado = await leadService.liberarAcessoDegustacao(lead.id)
      setData((prev) => prev.map((l) => (l.id === lead.id ? atualizado : l)))
      toast.success(`Acesso de degustação liberado para ${lead.nome.split(" ")[0]}! Credenciais geradas.`)
    } catch {
      toast.error("Erro ao liberar acesso de degustação.")
    }
  }

  const copiarCredenciais = async (lead: Lead) => {
    if (!lead.credenciaisDegustacao) return
    const texto = `NR-13 Pro — Acesso de degustação (7 dias)\nE-mail: ${lead.credenciaisDegustacao.email}\nSenha: ${lead.credenciaisDegustacao.senha}\nVálido até: ${formatarData(lead.credenciaisDegustacao.expiraEm)}`
    try {
      await navigator.clipboard.writeText(texto)
      setCopiadoId(lead.id)
      setTimeout(() => setCopiadoId(null), 2000)
      toast.success("Credenciais copiadas!")
    } catch {
      toast.error("Não foi possível copiar.")
    }
  }

  const mudarStatus = async (lead: Lead, status: LeadStatus) => {
    const atualizado = await leadService.update(lead.id, { status })
    setData((prev) => prev.map((l) => (l.id === lead.id ? atualizado : l)))
    toast.success(`Status atualizado para "${statusMeta[status].label}"`)
  }

  if (loading) return <div className="p-4 sm:p-8 text-text-secondary">Carregando...</div>

  if (!isCloser) {
    return (
      <div className="p-4 sm:p-8">
        <div className="max-w-md mx-auto mt-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="h-7 w-7 text-amber-500" />
          </div>
          <h1 className="text-xl font-semibold text-text-primary tracking-tight">Acesso restrito</h1>
          <p className="text-sm text-text-secondary mt-2 leading-relaxed">
            A carteira de leads é exclusiva do time de vendas (closer) da NR-13 Pro.
            Engenheiros que realizam inspeções e emitem laudos não têm acesso a esta área.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary tracking-tight">Leads — Carteira de Compradores</h1>
          <p className="text-text-secondary text-sm mt-1">
            Possíveis compradores capturados via WhatsApp. Automação entra em contato com quem demonstrou interesse e não concluiu a compra.
          </p>
        </div>
        <Badge className="bg-success-subtle text-success border-success/30 shrink-0 w-fit">
          <MessageCircle className="h-3 w-3 mr-1" />
          Automação WhatsApp ativa
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <Users className="h-8 w-8 text-primary shrink-0" />
            <div>
              <p className="text-2xl font-bold text-text-primary">{counts.total}</p>
              <p className="text-xs text-text-secondary">Total de leads</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-amber-500 shrink-0" />
            <div>
              <p className="text-2xl font-bold text-text-primary">{counts.abandonou}</p>
              <p className="text-xs text-text-secondary">Abandonaram o checkout</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-200 bg-purple-50 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-purple-500 shrink-0" />
            <div>
              <p className="text-2xl font-bold text-text-primary">{counts.negociacao}</p>
              <p className="text-xs text-text-secondary">Em negociação / consultor</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-success/30 bg-success-subtle shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle2 className="h-8 w-8 text-success shrink-0" />
            <div>
              <p className="text-2xl font-bold text-text-primary">{counts.convertidos}</p>
              <p className="text-xs text-text-secondary">Convertidos em clientes</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative w-full sm:flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <Input
            placeholder="Buscar por nome, WhatsApp ou e-mail..."
            className="pl-10 border-border bg-card"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-auto min-w-[220px]">
          <Select value={filtroStatus} onValueChange={(v) => setFiltroStatus(v ?? "")}>
            <SelectTrigger className="border-border bg-card h-9 text-sm w-full">
              <SelectValue placeholder="Todos os status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos os status</SelectItem>
              {(Object.keys(statusMeta) as LeadStatus[]).map((s) => (
                <SelectItem key={s} value={s}>{statusMeta[s].label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card className="border-border shadow-sm">
          <CardContent className="py-16 text-center">
            <Users className="h-16 w-16 text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary text-lg">Nenhum lead encontrado</p>
            <p className="text-text-muted text-sm mt-1">
              Os leads são capturados automaticamente quando um visitante informa o WhatsApp na plataforma ou inicia o checkout.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((lead) => (
            <Card key={lead.id} className="border-border shadow-sm card-hover">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-text-primary truncate">{lead.nome}</p>
                    <p className="text-[10px] text-text-muted capitalize">Origem: {lead.origem}</p>
                  </div>
                  <Badge className={cn("text-[10px] leading-tight py-0 px-1.5 shrink-0", statusMeta[lead.status].badge)}>
                    {statusMeta[lead.status].label}
                  </Badge>
                </div>

                <div className="space-y-1 text-xs text-text-secondary">
                  <p className="flex items-center gap-1.5">
                    <Phone className="h-3 w-3 shrink-0 text-text-muted" />
                    {formatarWhatsApp(lead.whatsapp)}
                  </p>
                  <p className="flex items-center gap-1.5 truncate">
                    <Mail className="h-3 w-3 shrink-0 text-text-muted" />
                    {lead.email}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3 shrink-0 text-text-muted" />
                    Capturado em {formatarData(lead.criadoEm)}
                    {lead.ultimoContato && <> • Último contato {formatarData(lead.ultimoContato)}</>}
                  </p>
                </div>

                {lead.mensagemAutomatizada && (
                  <div className="p-2 rounded-lg bg-card-hover border border-border text-[11px] text-text-secondary leading-relaxed">
                    <span className="font-medium text-text-primary">🤖 Automação: </span>
                    {lead.mensagemAutomatizada}
                  </div>
                )}

                {lead.acessoDegustacaoLiberado && lead.credenciaisDegustacao ? (
                  <div className="p-2.5 rounded-lg bg-success-subtle border border-success/30 space-y-1.5">
                    <p className="text-[11px] font-semibold text-success flex items-center gap-1">
                      <KeyRound className="h-3 w-3" />
                      Acesso de degustação liberado
                    </p>
                    <div className="text-[11px] text-text-secondary leading-relaxed font-mono">
                      <p>E-mail: {lead.credenciaisDegustacao.email}</p>
                      <p>Senha: {lead.credenciaisDegustacao.senha}</p>
                      <p className="text-success flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Válido até {formatarData(lead.credenciaisDegustacao.expiraEm)} (7 dias)
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copiarCredenciais(lead)}
                      className="border-success/30 text-success w-full h-7 text-[11px]"
                    >
                      {copiadoId === lead.id ? (
                        <><Check className="h-3 w-3 mr-1" /> Copiado!</>
                      ) : (
                        <><Copy className="h-3 w-3 mr-1" /> Copiar credenciais</>
                      )}
                    </Button>
                  </div>
                ) : (
                  lead.status !== "convertido" && lead.status !== "perdido" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => liberarDegustacao(lead)}
                      className="border-primary/30 text-primary w-full"
                    >
                      <KeyRound className="h-3.5 w-3.5 mr-1" />
                      Liberar acesso de degustação
                    </Button>
                  )
                )}

                <div className="flex flex-wrap gap-2 pt-1">
                  <Button variant="primary" size="sm" onClick={() => enviarWhatsApp(lead)} className="flex-1 min-w-[120px]">
                    <MessageCircle className="h-3.5 w-3.5 mr-1" />
                    WhatsApp
                  </Button>
                  {!lead.transferidoConsultor && lead.status !== "convertido" && lead.status !== "perdido" && (
                    <Button variant="outline" size="sm" onClick={() => transferirConsultor(lead)} className="border-border text-text-primary flex-1 min-w-[120px]">
                      <UserCheck className="h-3.5 w-3.5 mr-1" />
                      Consultor
                    </Button>
                  )}
                </div>

                {(lead.status === "contatado" || lead.status === "em_negociacao" || lead.status === "consultor") && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => mudarStatus(lead, "convertido")} className="border-success/30 text-success flex-1">
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                      Converter
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => mudarStatus(lead, "perdido")} className="border-border text-text-muted flex-1">
                      <XCircle className="h-3.5 w-3.5 mr-1" />
                      Perder
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
