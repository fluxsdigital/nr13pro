"use client"

import { useEffect, useMemo, useState } from "react"
import { clienteService } from "@/lib/services"
import type { Cliente } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Plus, Search, Pencil, Trash2, Building2, Phone, Mail,
  ArrowRight, AlertTriangle, AlertCircle, CheckCircle2, HelpCircle,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { equipamentos as eqStore, inspecoes as insStore, laudos as lauStore } from "@/lib/store"

interface ClienteStatus {
  overdue: number
  approaching: number
  safe: number
  unknown: number
}

function getStatus(clienteId: string): ClienteStatus {
  const eqs = eqStore.filter((eq) => eq.clienteId === clienteId)
  const today = new Date()
  let overdue = 0, approaching = 0, safe = 0, unknown = 0

  eqs.forEach((eq) => {
    const insps = insStore.filter((i) => i.equipamentoId === eq.id && i.concluida && i.laudoId)
    if (insps.length === 0) { unknown++; return }

    const latest = insps.sort((a, b) => b.dataTermino.localeCompare(a.dataTermino))[0]
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

  return { overdue, approaching, safe, unknown }
}

type FiltroStatus = "todas" | "urgente" | "atencao"

export default function Clientes() {
  const [search, setSearch] = useState("")
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>("todas")
  const [data, setData] = useState<Cliente[]>([])

  useEffect(() => {
    clienteService.list().then(setData)
  }, [])

  const statusPorCliente = useMemo(() => {
    const map = new Map<string, ClienteStatus>()
    data.forEach((c) => map.set(c.id, getStatus(c.id)))
    return map
  }, [data])

  const filtered = useMemo(() => {
    return data.filter((c) => {
      const match = c.nome.toLowerCase().includes(search.toLowerCase()) ||
        c.cnpj.includes(search) ||
        c.contato.toLowerCase().includes(search.toLowerCase())
      if (!match) return false
      if (filtroStatus === "todas") return true
      const s = statusPorCliente.get(c.id)
      if (filtroStatus === "urgente") return s ? s.overdue > 0 : false
      if (filtroStatus === "atencao") return s ? s.overdue === 0 && s.approaching > 0 : false
      return true
    })
  }, [data, search, filtroStatus, statusPorCliente])

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

  const clienteUrgency = (s: ClienteStatus | undefined) => {
    if (!s) return "unknown"
    if (s.overdue > 0) return "urgente"
    if (s.approaching > 0) return "atencao"
    if (s.safe > 0) return "ok"
    return "unknown"
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Empresas Clientes</h1>
          <p className="text-slate-500 text-sm mt-1">Gerencie as indústrias contratantes</p>
        </div>
        <Link href="/clientes/novo" className="shrink-0">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <Building2 className="h-8 w-8 text-blue-600 shrink-0" />
            <div>
              <p className="text-2xl font-bold text-slate-900">{data.length}</p>
              <p className="text-xs text-slate-500">Total de clientes</p>
            </div>
          </CardContent>
        </Card>
        <Card className={cn("border shadow-sm", countUrgentes > 0 ? "border-red-200 bg-red-50" : "border-slate-200")}>
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className={cn("h-8 w-8 shrink-0", countUrgentes > 0 ? "text-red-500" : "text-slate-300")} />
            <div>
              <p className="text-2xl font-bold text-slate-900">{countUrgentes}</p>
              <p className="text-xs text-slate-500">Inspeções vencidas</p>
            </div>
          </CardContent>
        </Card>
        <Card className={cn("border shadow-sm", countAtencao > 0 ? "border-amber-200 bg-amber-50" : "border-slate-200")}>
          <CardContent className="p-4 flex items-center gap-3">
            <AlertCircle className={cn("h-8 w-8 shrink-0", countAtencao > 0 ? "text-amber-500" : "text-slate-300")} />
            <div>
              <p className="text-2xl font-bold text-slate-900">{countAtencao}</p>
              <p className="text-xs text-slate-500">Próximas 60 dias</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative w-full sm:flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar por nome, CNPJ ou contato..."
            className="pl-10 border-slate-200 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {(["todas", "urgente", "atencao"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFiltroStatus(t)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors",
                filtroStatus === t
                  ? t === "urgente" ? "bg-red-50 text-red-700 border-red-200"
                    : t === "atencao" ? "bg-amber-50 text-amber-700 border-amber-200"
                    : "bg-blue-50 text-blue-700 border-blue-200"
                  : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
              )}
            >
              {t === "todas" ? "Todas" : t === "urgente" ? "Vencidas" : "Próximas"}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="py-16 text-center">
            <Building2 className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 text-lg">Nenhuma empresa encontrada</p>
            <p className="text-slate-400 text-sm mt-1">
              {search || filtroStatus !== "todas" ? "Tente alterar os filtros" : "Cadastre a primeira empresa clicando no botão acima"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div>
          {filtered.map((cli) => {
            const status = statusPorCliente.get(cli.id)
            const urgency = clienteUrgency(status)

            return (
              <div key={cli.id} className="mb-6 last:mb-0">
                <Card className={cn(
                  "card-hover cursor-pointer",
                  urgency === "urgente" ? "border-red-200 hover:!border-red-300" :
                  urgency === "atencao" ? "border-amber-200 hover:!border-amber-300" :
                  ""
                )}>
                  <Link href={`/clientes/${cli.id}`}>
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={cn(
                            "w-9 h-9 rounded-lg border flex items-center justify-center shrink-0",
                            urgency === "urgente" ? "bg-red-50 border-red-100" :
                            urgency === "atencao" ? "bg-amber-50 border-amber-100" :
                            "bg-blue-50 border-blue-100"
                          )}>
                            <Building2 className={cn(
                              "h-5 w-5",
                              urgency === "urgente" ? "text-red-500" :
                              urgency === "atencao" ? "text-amber-500" :
                              "text-blue-600"
                            )} />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-sm font-semibold text-slate-900 truncate">{cli.nome}</p>
                              {urgency === "urgente" && (
                                <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-100 text-xs">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Vencida
                                </Badge>
                              )}
                              {urgency === "atencao" && (
                                <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100 text-xs">
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  Próxima
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-slate-500">{cli.cnpj}</p>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                              <span className="flex items-center gap-1 text-xs text-slate-500">
                                <Mail className="h-3 w-3 shrink-0" />
                                {cli.contato}
                              </span>
                              <span className="flex items-center gap-1 text-xs text-slate-500">
                                <Phone className="h-3 w-3 shrink-0" />
                                {cli.telefone}
                              </span>
                              <span className="text-xs text-slate-400 truncate">{cli.email}</span>
                            </div>
                            {status && (status.overdue > 0 || status.approaching > 0 || status.unknown > 0) && (
                              <div className="flex items-center gap-3 mt-2">
                                {status.overdue > 0 && (
                                  <span className="flex items-center gap-1 text-xs text-red-600 font-medium">
                                    <AlertTriangle className="h-3 w-3" />
                                    {status.overdue} vencida{status.overdue > 1 ? "s" : ""}
                                  </span>
                                )}
                                {status.approaching > 0 && (
                                  <span className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                                    <AlertCircle className="h-3 w-3" />
                                    {status.approaching} em {status.approaching > 1 ? "até" : "até"} 60 dias
                                  </span>
                                )}
                                {status.unknown > 0 && (
                                  <span className="flex items-center gap-1 text-xs text-slate-400">
                                    <HelpCircle className="h-3 w-3" />
                                    {status.unknown} sem inspeção
                                  </span>
                                )}
                                {status.safe > 0 && (
                                  <span className="flex items-center gap-1 text-xs text-emerald-600">
                                    <CheckCircle2 className="h-3 w-3" />
                                    {status.safe} em dia
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 sm:pl-3">
                          <Link href={`/clientes/${cli.id}/editar`} onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-blue-600">
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-red-600"
                            onClick={(e) => { e.stopPropagation(); handleDelete(cli.id, cli.nome) }}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                          <ArrowRight className="h-4 w-4 text-slate-400 shrink-0 hidden sm:block" />
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
