"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { inspecaoService, equipamentoService, clienteService } from "@/lib/services"
import type { Inspecao, Equipamento, Cliente } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ClipboardCheck, Plus, ArrowRight, FileText, AlertCircle } from "lucide-react"

type StatusFiltro = "andamento" | "concluidas"

export default function Inspecoes() {
  const [data, setData] = useState<(Inspecao & { eq?: Equipamento; cliente?: Cliente })[]>([])
  const [loading, setLoading] = useState(true)
  const [filtroCliente, setFiltroCliente] = useState("")
  const [filtroStatus, setFiltroStatus] = useState<StatusFiltro | "">("")

  useEffect(() => {
    inspecaoService.list().then(async (inspecoes) => {
      const enriched = await Promise.all(
        inspecoes.map(async (ins) => {
          const eq = await equipamentoService.getById(ins.equipamentoId)
          const cliente = eq ? await clienteService.getById(eq.clienteId) : undefined
          return { ...ins, eq, cliente }
        })
      )
      setData(enriched)
      setLoading(false)
    }).catch((err) => {
      console.error("Erro ao carregar inspeções:", err)
      setLoading(false)
    })
  }, [])

  const empresas = useMemo(() => {
    const nomes = new Set(data.map((d) => d.cliente?.nome).filter(Boolean))
    return Array.from(nomes).sort()
  }, [data])

  const filtradas = useMemo(() => {
    return data.filter((d) => {
      if (filtroCliente && d.cliente?.nome !== filtroCliente) return false
      if (filtroStatus === "andamento" && d.concluida) return false
      if (filtroStatus === "concluidas" && !d.concluida) return false
      return true
    })
  }, [data, filtroCliente, filtroStatus])

  const totalCount = data.length
  const concluidasCount = data.filter((d) => d.concluida).length
  const andamentoCount = data.filter((d) => !d.concluida).length

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Inspeções</h1>
          <p className="text-slate-500 text-sm mt-1">Histórico de inspeções realizadas</p>
        </div>
        <Link href="/inspecoes/nova" className="shrink-0">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Nova Inspeção
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <ClipboardCheck className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">{totalCount}</p>
              <p className="text-xs text-slate-500">Total</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{concluidasCount}</p>
              <p className="text-xs text-slate-500">Concluídas</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{andamentoCount}</p>
              <p className="text-xs text-slate-500">Em andamento</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="min-w-[280px]">
          <Select value={filtroCliente} onValueChange={(v) => setFiltroCliente(v ?? "")}>
            <SelectTrigger className="border-slate-200 bg-white h-9 text-sm w-full">
              <SelectValue placeholder="Todas as empresas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas as empresas</SelectItem>
              {empresas.map((nome) => (
                <SelectItem key={nome} value={nome!}>{nome}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="min-w-[200px]">
          <Select value={filtroStatus} onValueChange={(v) => setFiltroStatus(v as StatusFiltro)}>
            <SelectTrigger className="border-slate-200 bg-white h-9 text-sm w-full">
              <SelectValue placeholder="Todos os status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos os status</SelectItem>
              <SelectItem value="andamento">Em andamento</SelectItem>
              <SelectItem value="concluidas">Concluídas</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {(filtroCliente !== "" || filtroStatus !== "") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setFiltroCliente(""); setFiltroStatus("") }}
            className="text-slate-500 text-xs"
          >
            Limpar filtros
          </Button>
        )}
      </div>

      {loading ? (
        <p className="text-slate-500">Carregando...</p>
      ) : filtradas.length === 0 ? (
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="py-16 text-center">
            <ClipboardCheck className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 text-lg">Nenhuma inspeção encontrada</p>
            <p className="text-slate-400 text-sm mt-1">
              {filtroCliente || filtroStatus
                ? "Tente alterar os filtros"
                : "Inicie a primeira inspeção clicando no botão acima"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div>
          {filtradas.map((ins) => (
            <Link key={ins.id} href={`/inspecoes/${ins.id}`} className="block mb-6 last:mb-0">
              <Card className="border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-2.5 h-2.5 rounded-full shrink-0 mt-0.5 ${ins.concluida ? "bg-emerald-500" : "bg-amber-500"}`} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold text-slate-900 capitalize truncate">{ins.tipo.replace("_", " ")}</p>
                          <Badge variant="outline" className="text-xs border-slate-200 text-slate-600 font-mono shrink-0">{ins.eq?.tag}</Badge>
                        </div>
                        <p className="text-xs text-slate-500 truncate mt-0.5">{ins.eq?.descricao}</p>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1">
                          <p className="text-xs font-medium text-blue-600 truncate">{ins.cliente?.nome}</p>
                          <span className="text-xs text-slate-400 hidden sm:inline">•</span>
                          <p className="text-xs text-slate-500">{ins.dataInicio}{ins.dataTermino ? ` — ${ins.dataTermino}` : ""}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 sm:pl-3">
                      {ins.concluida && !ins.laudoId && (
                        <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100 text-xs">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Laudo pendente
                        </Badge>
                      )}
                      {ins.laudoId && (
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100 text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          Com laudo
                        </Badge>
                      )}
                      <Badge variant={ins.concluida ? "default" : "secondary"} className="text-xs">
                        {ins.concluida ? "Concluída" : "Em andamento"}
                      </Badge>
                      <ArrowRight className="h-4 w-4 text-slate-400 shrink-0" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
