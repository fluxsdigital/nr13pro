"use client"

import { useEffect, useState } from "react"
import { clienteService } from "@/lib/services"
import type { Cliente } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Pencil, Trash2, Building2, Phone, Mail } from "lucide-react"
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

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-900 text-lg">Todas as Empresas</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left py-3 px-4 text-slate-500 font-medium text-xs uppercase tracking-wider">Empresa</th>
                  <th className="text-left py-3 px-4 text-slate-500 font-medium text-xs uppercase tracking-wider">CNPJ</th>
                  <th className="text-left py-3 px-4 text-slate-500 font-medium text-xs uppercase tracking-wider">Contato</th>
                  <th className="text-left py-3 px-4 text-slate-500 font-medium text-xs uppercase tracking-wider">Telefone</th>
                  <th className="text-left py-3 px-4 text-slate-500 font-medium text-xs uppercase tracking-wider">E-mail</th>
                  <th className="text-right py-3 px-4 text-slate-500 font-medium text-xs uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((cli) => (
                  <tr key={cli.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td
                      className="py-3 px-4 font-medium text-slate-900 cursor-pointer"
                      onClick={() => window.location.href = `/clientes/${cli.id}`}
                    >
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-blue-600 shrink-0" />
                        {cli.nome}
                      </div>
                    </td>
                    <td
                      className="py-3 px-4 text-slate-600 cursor-pointer"
                      onClick={() => window.location.href = `/clientes/${cli.id}`}
                    >{cli.cnpj}</td>
                    <td className="py-3 px-4 text-slate-600">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-slate-400" />
                        {cli.contato}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-slate-400" />
                        {cli.telefone}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{cli.email}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/clientes/${cli.id}/editar`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-blue-600">
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-red-600"
                          onClick={() => handleDelete(cli.id, cli.nome)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
