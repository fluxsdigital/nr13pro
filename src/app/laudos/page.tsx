"use client"

import { useEffect, useMemo, useState } from "react"
import { laudoService, equipamentoService, clienteService } from "@/lib/services"
import type { Laudo, Equipamento, Cliente } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, ArrowRight, Calendar, User, Building2 } from "lucide-react"
import Link from "next/link"

export default function Laudos() {
  const [data, setData] = useState<(Laudo & { eq?: Equipamento; cliente?: Cliente })[]>([])
  const [loading, setLoading] = useState(true)
  const [filtroCliente, setFiltroCliente] = useState("")

  useEffect(() => {
    laudoService.list().then(async (laudos) => {
      const enriched = await Promise.all(
        laudos.map(async (l) => {
          const eq = await equipamentoService.getById(l.equipamentoId)
          const cliente = eq ? await clienteService.getById(eq.clienteId) : undefined
          return { ...l, eq, cliente }
        })
      )
      setData(enriched)
      setLoading(false)
    }).catch((err) => {
      console.error("Erro ao carregar laudos:", err)
      setLoading(false)
    })
  }, [])

  const empresas = useMemo(() => {
    const nomes = new Set(data.map((d) => d.cliente?.nome).filter(Boolean))
    return Array.from(nomes).sort()
  }, [data])

  const filtradas = useMemo(() => {
    if (!filtroCliente) return data
    return data.filter((d) => d.cliente?.nome === filtroCliente)
  }, [data, filtroCliente])

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary tracking-tight">Laudos Técnicos</h1>
          <p className="text-text-secondary text-sm mt-1">Relatórios de inspeção de segurança emitidos</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="card-kpi">
          <CardContent className="p-4 flex items-center gap-3">
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <p className="text-2xl font-bold text-text-primary">{data.length}</p>
              <p className="text-xs text-text-secondary">Total de laudos</p>
            </div>
          </CardContent>
        </Card>
        <Card className="card-kpi">
          <CardContent className="p-4 flex items-center gap-3">
            <Building2 className="h-8 w-8 text-violet-600" />
            <div>
              <p className="text-2xl font-bold text-text-primary">{empresas.length}</p>
              <p className="text-xs text-text-secondary">Empresas atendidas</p>
            </div>
          </CardContent>
        </Card>
        <Card className="card-kpi">
          <CardContent className="p-4 flex items-center gap-3">
            <User className="h-8 w-8 text-text-secondary" />
            <div>
              <p className="text-2xl font-bold text-text-primary">
                {new Set(data.map((d) => d.plhNome)).size}
              </p>
              <p className="text-xs text-text-secondary">PLHs responsáveis</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="min-w-[280px]">
          <Select value={filtroCliente} onValueChange={(v) => setFiltroCliente(v ?? "")}>
          <SelectTrigger className="border-border bg-white h-9 text-sm w-full">
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
      </div>

      {loading ? (
        <p className="text-text-secondary">Carregando...</p>
      ) : filtradas.length === 0 ? (
        <Card className="border-border shadow-sm">
          <CardContent className="py-16 text-center">
            <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-text-secondary text-lg">Nenhum laudo encontrado</p>
            <p className="text-text-muted text-sm mt-1">
              {filtroCliente ? "Tente alterar o filtro" : "Os laudos são gerados automaticamente após cada inspeção"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div>
          {filtradas.map((l) => (
            <Link key={l.id} href={`/laudos/${l.id}`} className="block mb-6 last:mb-0">
              <Card className="card-hover cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-primary-subtle border border-primary/20 flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold text-text-primary">{l.numeroLaudo}</p>
                          <Badge variant="outline" className="text-xs border-border text-text-secondary font-mono">{l.eq?.tag}</Badge>
                        </div>
                        <p className="text-xs text-text-secondary truncate mt-0.5">{l.eq?.descricao}</p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                          <span className="flex items-center gap-1 text-xs text-primary">
                            <Building2 className="h-3 w-3 shrink-0" />
                            {l.cliente?.nome}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-text-secondary">
                            <Calendar className="h-3 w-3 shrink-0" />
                            {l.dataEmissao}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-text-secondary hidden sm:inline-flex">
                            <User className="h-3 w-3 shrink-0" />
                            {l.plhNome}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 sm:pl-3">
                      <div className="text-right">
                        <p className="text-xs font-medium text-text-secondary">Próx. inspeção</p>
                        <p className="text-xs text-text-secondary">{l.dataProximaInspecao}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-text-muted shrink-0" />
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
