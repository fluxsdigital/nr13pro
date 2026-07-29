"use client"

import { useEffect, useMemo, useState } from "react"
import { equipamentoService, clienteService } from "@/lib/services"
import type { Equipamento, Cliente } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"

const statusMap: Record<string, "destructive" | "default" | "secondary" | "outline"> = {
  I: "destructive", II: "destructive", III: "default", IV: "secondary", V: "outline",
}

export default function Equipamentos() {
  const [search, setSearch] = useState("")
  const [data, setData] = useState<Equipamento[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [filtroCliente, setFiltroCliente] = useState("")

  useEffect(() => {
    equipamentoService.list().then(setData)
    clienteService.list().then(setClientes)
  }, [])

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

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Equipamentos</h1>
          <p className="text-slate-500 text-sm mt-1">Gerencie caldeiras, vasos de pressão, tubulações e tanques</p>
        </div>
        <Link href="/equipamentos/novo" className="shrink-0">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Novo Equipamento
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div>
              <p className="text-2xl font-bold text-slate-900">{data.length}</p>
              <p className="text-xs text-slate-500">Total</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div>
              <p className="text-2xl font-bold text-slate-900">{porCliente}</p>
              <p className="text-xs text-slate-500">Empresas</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {data.filter((eq) => eq.tipo === "vaso").length}
              </p>
              <p className="text-xs text-slate-500">Vasos</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {data.filter((eq) => eq.tipo === "caldeira").length}
              </p>
              <p className="text-xs text-slate-500">Caldeiras</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="w-full sm:w-auto min-w-0 sm:min-w-[280px]">
          <Select value={filtroCliente} onValueChange={(v) => setFiltroCliente(v ?? "")}>
            <SelectTrigger className="border-slate-200 bg-white h-9 text-sm w-full">
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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar por tag, descrição ou local..."
            className="pl-10 border-slate-200 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-900 text-lg">
            {filtroCliente || "Todos os Equipamentos"}
            <span className="text-sm font-normal text-slate-500 ml-2">({filtered.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left py-3 px-4 text-slate-500 font-medium text-xs uppercase tracking-wider">Tag</th>
                  <th className="text-left py-3 px-4 text-slate-500 font-medium text-xs uppercase tracking-wider">Descrição</th>
                  <th className="text-left py-3 px-4 text-slate-500 font-medium text-xs uppercase tracking-wider">Cliente</th>
                  <th className="text-left py-3 px-4 text-slate-500 font-medium text-xs uppercase tracking-wider">Tipo</th>
                  <th className="text-left py-3 px-4 text-slate-500 font-medium text-xs uppercase tracking-wider">Cat.</th>
                  <th className="text-left py-3 px-4 text-slate-500 font-medium text-xs uppercase tracking-wider">Classe</th>
                  <th className="text-left py-3 px-4 text-slate-500 font-medium text-xs uppercase tracking-wider">Local</th>
                  <th className="text-right py-3 px-4 text-slate-500 font-medium text-xs uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">Nenhum equipamento encontrado</td>
                  </tr>
                ) : (
                  filtered.map((eq) => {
                    const catStr = eq.categoria ?? ""
                    return (
                      <tr
                        key={eq.id}
                        className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                      >
                        <td
                          className="py-3 px-4 font-medium text-slate-900 cursor-pointer"
                          onClick={() => window.location.href = `/equipamentos/${eq.id}`}
                        >{eq.tag}</td>
                        <td
                          className="py-3 px-4 text-slate-600 cursor-pointer"
                          onClick={() => window.location.href = `/equipamentos/${eq.id}`}
                        >{eq.descricao}</td>
                        <td className="py-3 px-4 text-slate-600">
                          {clientes.find((c) => c.id === eq.clienteId)?.nome ?? "—"}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="capitalize border-slate-200 text-slate-600">{eq.tipo}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={statusMap[catStr] ?? "outline"}>
                            {catStr || "N/A"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-slate-700 font-medium">{eq.classeFluido}</td>
                        <td className="py-3 px-4 text-slate-600">{eq.localizacao}</td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Link href={`/equipamentos/${eq.id}/editar`}>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-blue-600">
                                <Pencil className="h-3.5 w-3.5" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-slate-400 hover:text-red-600"
                              onClick={() => handleDelete(eq.id, eq.tag)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
