"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ClienteForm } from "@/components/cliente-form"
import { clienteService } from "@/lib/services"
import type { Cliente, CreateClienteDTO } from "@/lib/types"

export default function EditarCliente() {
  const params = useParams()
  const router = useRouter()
  const [cliente, setCliente] = useState<Cliente | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    clienteService.getById(params.id as string).then((c) => {
      if (!c) { router.push("/clientes"); return }
      setCliente(c)
      setLoading(false)
    })
  }, [params.id, router])

  const handleSubmit = async (data: CreateClienteDTO) => {
    if (!cliente) return
    await clienteService.update(cliente.id, data)
    router.push(`/clientes/${cliente.id}`)
  }

  if (loading) return <div className="p-4 sm:p-8 text-slate-500">Carregando...</div>
  if (!cliente) return null

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Editar Cliente</h1>
        <p className="text-slate-500 text-sm mt-1">{cliente.nome}</p>
      </div>
      <ClienteForm initial={cliente} onSubmit={handleSubmit} onCancel={() => router.back()} />
    </div>
  )
}
