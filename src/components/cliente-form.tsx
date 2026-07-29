"use client"

import { useState } from "react"
import type { Cliente, CreateClienteDTO } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

interface Props {
  initial?: Cliente
  onSubmit: (data: CreateClienteDTO) => Promise<void>
  onCancel: () => void
}

export function ClienteForm({ initial, onSubmit, onCancel }: Props) {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<CreateClienteDTO>({
    nome: initial?.nome ?? "",
    cnpj: initial?.cnpj ?? "",
    contato: initial?.contato ?? "",
    email: initial?.email ?? "",
    telefone: initial?.telefone ?? "",
    endereco: initial?.endereco ?? "",
  })

  const set = (field: keyof CreateClienteDTO, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit(form)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border-border shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-text-secondary text-xs">Nome da Empresa</Label>
              <Input value={form.nome} onChange={(e) => set("nome", e.target.value)} placeholder="Ex: Indústria ABC Ltda." required className="border-border bg-white" />
            </div>
            <div className="space-y-2">
              <Label className="text-text-secondary text-xs">CNPJ</Label>
              <Input value={form.cnpj} onChange={(e) => set("cnpj", e.target.value)} placeholder="00.000.000/0001-00" required className="border-border bg-white" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-text-secondary text-xs">Contato</Label>
              <Input value={form.contato} onChange={(e) => set("contato", e.target.value)} placeholder="Nome do contato" required className="border-border bg-white" />
            </div>
            <div className="space-y-2">
              <Label className="text-text-secondary text-xs">E-mail</Label>
              <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="contato@empresa.com" required className="border-border bg-white" />
            </div>
            <div className="space-y-2">
              <Label className="text-text-secondary text-xs">Telefone</Label>
              <Input value={form.telefone} onChange={(e) => set("telefone", e.target.value)} placeholder="(11) 99999-8888" required className="border-border bg-white" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-text-secondary text-xs">Endereço</Label>
            <Input value={form.endereco} onChange={(e) => set("endereco", e.target.value)} placeholder="Rua, número, bairro - cidade, UF" required className="border-border bg-white" />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel} className="border-border text-text-secondary">
          Cancelar
        </Button>
        <Button type="submit" disabled={loading} variant="primary">
          {loading ? "Salvando..." : initial ? "Atualizar Cliente" : "Cadastrar Cliente"}
        </Button>
      </div>
    </form>
  )
}
