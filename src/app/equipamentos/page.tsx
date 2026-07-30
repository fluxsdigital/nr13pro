"use client"

import { useEffect, useMemo, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { equipamentoService, clienteService } from "@/lib/services"
import type { Equipamento, Cliente } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Pencil, Trash2, ArrowRight, FlaskConical, Building2, MapPin } from "lucide-react"
import Link from "next/link"

const statusMap: Record<string, "destructive" | "default" | "secondary" | "outline"> = {
  I: "destructive", II: "destructive", III: "default", IV: "secondary", V: "outline",
}

export default function Equipamentos() {
  const { user } = useAuth()
  const [search, setSearch] = useState("")
  const [data, setData] = useState<Equipamento[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [filtroCliente, setFiltroCliente] = useState("")

  useEffect(() => {
    equipamentoService.list({ userId: user?.id }).then(setData)
    clienteService.list(user?.id).then(setClientes)
  }, [user?.id])

  const empresas = useMemo(() => {
    return clientes.map((c) => c.nome).sort()
  }, [clientes])

  const filtered = useMemo(() => {
    return data.filter((eq) => {
      if (filtroCliente) {
        const cliente = clientes.find((c) => c.id === eq.clienteId)
        if (cliente?.nome !== filtroCliente) return false
      }
      if (search) {
        return (
          eq.tag.toLowerCase().includes(search.toLowerCase()) ||
          eq.descricao.toLowerCase().includes(search.toLowerCase()) ||
          eq.localizacao.toLowerCase().includes(search.toLowerCase())
        )
      }
      return true
    })
  }, [data, clientes, filtroCliente, search])

  const handleDelete = async (id: string, tag: string) => {
    if (!window.confirm(`Excluir equipamento ${tag}?`)) return
    await equipamentoService.delete(id)
    setData((prev) => prev.filter((e) => e.id !== id))
  }

  const porCliente = clientes.filter((c) =>
    data.some((eq) => eq.clienteId === c.id)
  ).length

  const nomeCliente = (id: string) => clientes.find((c) => c.id === id)?.nome ?? "—"

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary tracking-tight">Equipamentos</h1>
          <p className="text-text-secondary text-sm mt-1">Gerencie caldeiras, vasos de pressão, tubulações e tanques</p>
        </div>
        <Link href="/equipamentos/novo" className="shrink-0">
          <Button variant="primary" className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Novo Equipamento
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="card-kpi">
          <CardContent className="p-4 flex items-center gap-3">
            <FlaskConical className="h-8 w-8 text-primary shrink-0" />
            <div>
              <p className="text-2xl font-bold text-text-primary">{data.length}</p>
              <p className="text-xs text-text-secondary">Total</p>
            </div>
          </CardContent>
        </Card>
        <Card className="card-kpi">
          <CardContent className="p-4 flex items-center gap-3">
            <Building2 className="h-8 w-8 text-violet-600 shrink-0" />
            <div>
              <p className="text-2xl font-bold text-text-primary">{porCliente}</p>
              <p className="text-xs text-text-secondary">Empresas</p>
            </div>
          </CardContent>
        </Card>
        <Card className="card-kpi">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-success-subtle flex items-center justify-center shrink-0">
              <div className="h-3 w-3 rounded-full bg-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">
                {data.filter((eq) => eq.tipo === "vaso").length}
              </p>
              <p className="text-xs text-text-secondary">Vasos</p>
            </div>
          </CardContent>
        </Card>
        <Card className="card-kpi">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <div className="h-3 w-3 rounded-full bg-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">
                {data.filter((eq) => eq.tipo === "caldeira").length}
              </p>
              <p className="text-xs text-text-secondary">Caldeiras</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="w-full sm:w-auto min-w-0 sm:min-w-[280px]">
          <Select value={filtroCliente} onValueChange={(v) => setFiltroCliente(v ?? "")}>
            <SelectTrigger className="border-border bg-card h-9 text-sm w-full">
              <SelectValue placeholder="Todas as empresas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas as empresas</SelectItem>
              {empresas.map((nome) => (
                <SelectItem key={nome} value={nome}>{nome}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="relative w-full sm:flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <Input
            placeholder="Buscar por tag, descrição ou local..."
            className="pl-10 border-border bg-card"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card className="border-border shadow-sm">
          <CardContent className="py-16 text-center">
            <FlaskConical className="h-16 w-16 text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary text-lg">Nenhum equipamento encontrado</p>
            <p className="text-text-muted text-sm mt-1">
              {filtroCliente || search ? "Tente alterar os filtros" : "Cadastre o primeiro equipamento clicando no botão acima"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((eq) => {
            const catStr = eq.categoria ?? ""
            return (
              <div key={eq.id}>
                <Card className="card-hover cursor-pointer">
                  <Link href={`/equipamentos/${eq.id}`}>
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-primary-subtle border border-primary/20 flex items-center justify-center shrink-0">
                            <FlaskConical className="h-5 w-5 text-primary" />
                          </div>
                          <div className="min-w-0 overflow-hidden line-clamp-4">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-sm font-semibold text-text-primary">{eq.tag}</p>
                              <Badge variant="outline" className="border-border text-text-secondary capitalize text-xs">{eq.tipo}</Badge>
                              {catStr && <Badge className="text-xs">{catStr}</Badge>}
                            </div>
                            <p className="text-xs text-text-secondary truncate mt-0.5">{eq.descricao}</p>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                              <span className="flex items-center gap-1 text-xs text-primary">
                                <Building2 className="h-3 w-3 shrink-0" />
                                {nomeCliente(eq.clienteId)}
                              </span>
                              <span className="flex items-center gap-1 text-xs text-text-secondary">
                                <MapPin className="h-3 w-3 shrink-0" />
                                {eq.localizacao}
                              </span>
                              <span className="text-xs text-text-muted font-medium">{eq.classeFluido}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 sm:pl-3">
                          <Link href={`/equipamentos/${eq.id}/editar`} onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-text-muted hover:text-primary">
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-red-600"
                            onClick={(e) => { e.stopPropagation(); handleDelete(eq.id, eq.tag) }}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                          <ArrowRight className="h-4 w-4 text-text-muted shrink-0 hidden sm:block" />
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
