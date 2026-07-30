"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { clienteService, equipamentoService } from "@/lib/services"
import type { Cliente, Equipamento } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Phone, Mail, MapPin, FileText, Pencil, Plus } from "lucide-react"
import Link from "next/link"

export default function ClienteDetalhe() {
  const { user } = useAuth()
  const params = useParams()
  const [cliente, setCliente] = useState<Cliente | null>(null)
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([])

  useEffect(() => {
    const id = params.id as string
    clienteService.getById(id).then((c) => setCliente(c ?? null))
    equipamentoService.list({ clienteId: id, userId: user?.id }).then(setEquipamentos)
  }, [params.id, user?.id])

  if (!cliente) return <div className="p-4 sm:p-8 text-text-secondary">Carregando...</div>

  return (
    <div className="p-4 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Building2 className="h-6 w-6 text-primary shrink-0" />
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold text-text-primary tracking-tight truncate">{cliente.nome}</h1>
            <p className="text-text-secondary text-sm">{cliente.cnpj}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
          <Link href={`/clientes/${cliente.id}/editar`}>
            <Button variant="outline" className="border-border text-text-secondary w-full sm:w-auto">
              <Pencil className="h-4 w-4 mr-2" /> Editar
            </Button>
          </Link>
          <Link href={`/equipamentos/novo?clienteId=${cliente.id}`}>
            <Button variant="primary" className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" /> Novo Equipamento
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-text-primary text-sm">Informações de Contato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-text-muted" />
              <span className="text-text-secondary">{cliente.telefone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-text-muted" />
              <span className="text-text-secondary">{cliente.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-text-muted" />
              <span className="text-text-secondary">{cliente.endereco}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-text-primary text-sm">Equipamentos</CardTitle>
          </CardHeader>
          <CardContent>
            {equipamentos.length === 0 ? (
              <p className="text-sm text-text-muted py-8 text-center">Nenhum equipamento cadastrado</p>
            ) : (
              <div className="space-y-2">
                {equipamentos.map((eq) => (
                  <Link key={eq.id} href={`/equipamentos/${eq.id}`}>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-card-hover transition-colors">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-primary shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-text-primary">{eq.tag} — {eq.descricao}</p>
                          <p className="text-xs text-text-secondary">{eq.tipo} • {eq.localizacao}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-border">{eq.categoria}</Badge>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
