"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { ClienteForm } from "@/components/cliente-form"
import { clienteService } from "@/lib/services"
import type { CreateClienteDTO } from "@/lib/types"

export default function NovoCliente() {
  const router = useRouter()
  const { user } = useAuth()

  const handleSubmit = async (data: CreateClienteDTO) => {
    await clienteService.create(data, user!.id)
    router.push("/clientes")
  }

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Novo Cliente</h1>
        <p className="text-slate-500 text-sm mt-1">Cadastre uma nova indústria contratante</p>
      </div>
      <ClienteForm onSubmit={handleSubmit} onCancel={() => router.push("/clientes")} />
    </div>
  )
}
