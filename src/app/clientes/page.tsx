"use client"

import { useEffect, useState } from "react"
import { clienteService } from "@/lib/services"
import type { Cliente } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Pencil, Trash2, Building2, Phone, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Clientes() {
  const [search, setSearch] = useState("")
  const [data, setData] = useState<Cliente[]>([])

  useEffect(() => {
    clienteService.list().then(setData)
  }, [])

  const filtered = data.filter((c) =>
    c.nome.toLowerCase().includes(search.toLowerCase()) ||
    c.cnpj.includes(search) ||
    c.contato.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (id: string, nome: string) => {
    if (!window.confirm(`Excluir cliente ${nome}?`)) return
    await clienteService.delete(id)
    setData((prev) => prev.filter((c) => c.id !== id))
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

      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Buscar por nome, CNPJ ou contato..."
          className="pl-10 border-slate-200 bg-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="py-16 text-center">
            <Building2 className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 text-lg">Nenhuma empresa encontrada</p>
            <p className="text-slate-400 text-sm mt-1">
              {search ? "Tente alterar a busca" : "Cadastre a primeira empresa clicando no botão acima"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div>
          {filtered.map((cli) => (
            <div key={cli.id} className="mb-6 last:mb-0">
              <Card className="border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                <Link href={`/clientes/${cli.id}`}>
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                          <Building2 className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900 truncate">{cli.nome}</p>
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
          ))}
        </div>
      )}
    </div>
  )
}
