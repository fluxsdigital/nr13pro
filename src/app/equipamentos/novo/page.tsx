"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { EquipamentoForm } from "@/components/equipamento-form"
import { equipamentoService } from "@/lib/services"
import type { CreateEquipamentoDTO } from "@/lib/types"

export default function NovoEquipamento() {
  const router = useRouter()
  const { user } = useAuth()

  const handleSubmit = async (data: CreateEquipamentoDTO) => {
    await equipamentoService.create(data, user!.id)
    router.push("/equipamentos")
  }

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Novo Equipamento</h1>
        <p className="text-slate-500 text-sm mt-1">Cadastre um novo equipamento para inspeção NR-13</p>
      </div>
      <EquipamentoForm onSubmit={handleSubmit} onCancel={() => router.push("/equipamentos")} />
    </div>
  )
}
