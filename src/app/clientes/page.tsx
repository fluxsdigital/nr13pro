"use client"

import { useEffect, useMemo, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { clienteService } from "@/lib/services"
import type { Cliente } from "@/lib/types"
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
  Plus, Search, Pencil, Trash2, Building2, Phone, Mail,
  ArrowRight, AlertTriangle, AlertCircle, CheckCircle2, HelpCircle, Clock,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { equipamentos as eqStore, inspecoes as insStore, laudos as lauStore } from "@/lib/store"

interface ClienteStatus {
  overdue: number
  approaching: number
  safe: number
  unknown: number
  inProgress: number
}

function getStatus(clienteId: string): ClienteStatus {
  const eqs = eqStore.filter((eq) => eq.clienteId === clienteId)
  const today = new Date()
  let overdue = 0, approaching = 0, safe = 0, unknown = 0, inProgress = 0

  eqs.forEach((eq) => {
    const insps = insStore.filter((i) => i.equipamentoId === eq.id)
    if (insps.length === 0) { unknown++; return }

    const latest = insps.sort((a, b) => b.dataTermino.localeCompare(a.dataTermino))[0]
    if (!latest.concluida) { inProgress++; return }

    const laudo = lauStore.find((l) => l.id === latest.laudoId)
    if (!laudo?.dataProximaInspecao) { unknown++; return }

    const diff = Math.ceil(
      (new Date(laudo.dataProximaInspecao + "T23:59:59").getTime() - today.getTime())
      / (1000 * 60 * 60 * 24)
    )

    if (diff <= 0) overdue++
    else if (diff <= 60) approaching++
    else safe++
  })

  return { overdue, approaching, safe, unknown, inProgress }
}

type FiltroStatus = "todas" | "urgente" | "atencao" | "andamento"

export default function Clientes() {
  const { user } = useAuth()
  const [search, setSearch] = useState("")
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>("todas")
  const [filtroCliente, setFiltroCliente] = useState("")
  const [data, setData] = useState<Cliente[]>([])

  useEffect(() => {
    clienteService.list(user?.id).then(setData)
  }, [user?.id])

  const statusPorCliente = useMemo(() => {
    const map = new Map<string, ClienteStatus>()
    data.forEach((c) => map.set(c.id, getStatus(c.id)))
    return map
  }, [data])

  const filtered = useMemo(() => {
    return data.filter((c) => {
      if (filtroCliente && c.id !== filtroCliente) return false
      const match = c.nome.toLowerCase().includes(search.toLowerCase()) ||
        c.cnpj.includes(search) ||
        c.contato.toLowerCase().includes(search.toLowerCase())
      if (!match) return false
      if (filtroStatus === "todas") return true
      const s = statusPorCliente.get(c.id)
      if (filtroStatus === "urgente") return s ? s.overdue > 0 : false
      if (filtroStatus === "atencao") return s ? s.approaching > 0 : false
      if (filtroStatus === "andamento") return s ? s.inProgress > 0 : false
      return true
    })
  }, [data, search, filtroStatus, filtroCliente, statusPorCliente])

  const handleDelete = async (id: string, nome: string) => {
    if (!window.confirm(`Excluir cliente ${nome}?`)) return
    await clienteService.delete(id)
    setData((prev) => prev.filter((c) => c.id !== id))
  }

  const countUrgentes = useMemo(
    () => data.filter((c) => (statusPorCliente.get(c.id)?.overdue ?? 0) > 0).length,
    [data, statusPorCliente]
  )
  const countAtencao = useMemo(
    () => data.filter((c) => {
      const s = statusPorCliente.get(c.id)
      return s ? s.overdue === 0 && s.approaching > 0 : false
    }).length,
    [data, statusPorCliente]
  )

  const countAndamento = useMemo(
    () => data.filter(c => (statusPorCliente.get(c.id)?.inProgress ?? 0) > 0).length,
    [data, statusPorCliente]
  )

  const clienteUrgency = (s: ClienteStatus | undefined) => {
    if (!s) return "unknown"
    if (s.overdue > 0) return "urgente"
    if (s.approaching > 0) return "atencao"
    if (s.inProgress > 0) return "andamento"
    if (s.safe > 0) return "ok"
    return "unknown"
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary tracking-tight">Empresas Clientes</h1>
          <p className="text-text-secondary text-sm mt-1">Gerencie as indústrias contratantes</p>
        </div>
        <Link href="/clientes/novo" className="shrink-0">
          <Button variant="primary" className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-border shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary shrink-0" />
            <div>
              <p className="text-2xl font-bold text-text-primary">{data.length}</p>
              <p className="text-xs text-text-secondary">Total de clientes</p>
            </div>
          </CardContent>
        </Card>
        <Card className={cn("border shadow-sm", countUrgentes > 0 ? "border-red-200 bg-red-50" : "border-border")}>
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className={cn("h-8 w-8 shrink-0", countUrgentes > 0 ? "text-red-500" : "text-text-muted")} />
            <div>
              <p className="text-2xl font-bold text-text-primary">{countUrgentes}</p>
              <p className="text-xs text-text-secondary">Inspeções vencidas</p>
            </div>
          </CardContent>
        </Card>
        <Card className={cn("border shadow-sm", countAtencao > 0 ? "border-amber-200 bg-amber-50" : "border-border")}>
          <CardContent className="p-4 flex items-center gap-3">
            <AlertCircle className={cn("h-8 w-8 shrink-0", countAtencao > 0 ? "text-amber-500" : "text-text-muted")} />
            <div>
              <p className="text-2xl font-bold text-text-primary">{countAtencao}</p>
              <p className="text-xs text-text-secondary">Próximas 60 dias</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative w-full sm:flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <Input
            placeholder="Buscar por nome, CNPJ ou contato..."
            className="pl-10 border-border bg-card"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-auto min-w-[220px]">
          <Select value={filtroCliente} onValueChange={(v) => setFiltroCliente(v ?? "")}>
            <SelectTrigger className="border-border bg-card h-9 text-sm w-full">
              <SelectValue placeholder="Todas as empresas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas as empresas</SelectItem>
              {data.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {(filtroCliente !== "" || filtroStatus !== "todas") && (
          <button
            onClick={() => { setFiltroCliente(""); setFiltroStatus("todas") }}
            className="text-xs text-text-muted hover:text-text-primary shrink-0 ml-auto sm:ml-0"
          >
            Limpar filtros
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {(["todas", "urgente", "atencao", "andamento"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setFiltroStatus(t)}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors",
              filtroStatus === t
                ? t === "urgente" ? "bg-red-50 text-red-700 border-red-200"
                  : t === "atencao" ? "bg-amber-50 text-amber-700 border-amber-200"
                  : t === "andamento" ? "bg-blue-50 text-blue-700 border-blue-200"
                  : "bg-primary-subtle text-primary border-primary/20"
                : "bg-card text-text-secondary border-border hover:bg-card-hover"
            )}
          >
            {t === "todas" ? "Todas" : t === "urgente" ? "Vencidas" : t === "atencao" ? "Aguardando" : "Em andamento"}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card className="border-border shadow-sm">
          <CardContent className="py-16 text-center">
            <Building2 className="h-16 w-16 text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary text-lg">Nenhuma empresa encontrada</p>
            <p className="text-text-muted text-sm mt-1">
              {search || filtroStatus !== "todas" ? "Tente alterar os filtros" : "Cadastre a primeira empresa clicando no botão acima"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((cli) => {
            const status = statusPorCliente.get(cli.id)
            const urgency = clienteUrgency(status)

            return (
              <div key={cli.id}>
                <Card className={cn(
                  "card-hover cursor-pointer",
                  urgency === "urgente" ? "border-red-200 hover:!border-red-300" :
                  urgency === "atencao" ? "border-amber-200 hover:!border-amber-300" :
                  urgency === "andamento" ? "border-blue-200 hover:!border-blue-300" :
                  ""
                )}>
                  <Link href={`/clientes/${cli.id}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={cn(
                          "w-8 h-8 rounded-lg border flex items-center justify-center shrink-0",
                          urgency === "urgente" ? "bg-red-50 border-red-100" :
                          urgency === "atencao" ? "bg-amber-50 border-amber-100" :
                          "bg-primary-subtle border-primary/20"
                        )}>
                          <Building2 className={cn(
                            "h-4 w-4",
                            urgency === "urgente" ? "text-red-500" :
                            urgency === "atencao" ? "text-amber-500" :
                            "text-primary"
                          )} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-semibold text-text-primary truncate">{cli.nome}</p>
                            {urgency === "urgente" && (
                              <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-100 text-[10px] leading-tight py-0 px-1.5">
                                <AlertTriangle className="h-2.5 w-2.5 mr-0.5" />
                                Vencida
                              </Badge>
                            )}
                            {urgency === "atencao" && (
                              <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100 text-[10px] leading-tight py-0 px-1.5">
                                <AlertCircle className="h-2.5 w-2.5 mr-0.5" />
                                Próxima
                              </Badge>
                            )}
                          </div>
                          <p className="text-[10px] text-text-secondary">{cli.cnpj}</p>
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
                            <span className="flex items-center gap-1 text-[10px] text-text-secondary">
                              <Mail className="h-2.5 w-2.5 shrink-0" />
                              {cli.contato}
                            </span>
                            <span className="flex items-center gap-1 text-[10px] text-text-secondary">
                              <Phone className="h-2.5 w-2.5 shrink-0" />
                              {cli.telefone}
                            </span>
                            <span className="text-[10px] text-text-muted truncate">{cli.email}</span>
                          </div>
                          {status && (status.overdue > 0 || status.approaching > 0 || status.unknown > 0 || status.inProgress > 0) && (
                            <div className="flex items-center gap-2 mt-1 overflow-hidden text-ellipsis whitespace-nowrap">
                              {status.overdue > 0 && (
                                <span className="flex items-center gap-1 text-[10px] text-red-600 font-medium shrink-0">
                                  <AlertTriangle className="h-2.5 w-2.5" />
                                  {status.overdue} vencida{status.overdue > 1 ? "s" : ""}
                                </span>
                              )}
                              {status.approaching > 0 && (
                                <span className="flex items-center gap-1 text-[10px] text-amber-600 font-medium shrink-0">
                                  <AlertCircle className="h-2.5 w-2.5" />
                                  {status.approaching} à fazer
                                </span>
                              )}
                              {status.unknown > 0 && (
                                <span className="flex items-center gap-1 text-[10px] text-text-muted shrink-0">
                                  <HelpCircle className="h-2.5 w-2.5" />
                                  {status.unknown} sem inspeção
                                </span>
                              )}
                              {status.inProgress > 0 && (
                                <span className="flex items-center gap-1 text-[10px] text-blue-600 font-medium shrink-0">
                                  <Clock className="h-2.5 w-2.5" />
                                  {status.inProgress} em andamento
                                </span>
                              )}
                              {status.safe > 0 && (
                                <span className="flex items-center gap-1 text-[10px] text-success shrink-0">
                                  <CheckCircle2 className="h-2.5 w-2.5" />
                                  {status.safe} em dia
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
