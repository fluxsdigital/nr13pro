"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { EquipamentoForm } from "@/components/equipamento-form"
import { equipamentoService } from "@/lib/services"
import type { Equipamento, CreateEquipamentoDTO } from "@/lib/types"

export default function EditarEquipamento() {
  const params = useParams()
  const router = useRouter()
  const [equipamento, setEquipamento] = useState<Equipamento | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    equipamentoService.getById(params.id as string).then((eq) => {
      if (!eq) {
        router.push("/equipamentos")
        return
      }
      setEquipamento(eq)
      setLoading(false)
    })
  }, [params.id, router])

  const handleSubmit = async (data: CreateEquipamentoDTO) => {
    if (!equipamento) return
    await equipamentoService.update(equipamento.id, data)
    router.push(`/equipamentos/${equipamento.id}`)
  }

  if (loading) {
    return <div className="p-4 sm:p-8 text-slate-500">Carregando...</div>
  }

  if (!equipamento) return null

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Editar Equipamento</h1>
        <p className="text-slate-500 text-sm mt-1">{equipamento.tag} — {equipamento.descricao}</p>
      </div>
      <EquipamentoForm initial={equipamento} onSubmit={handleSubmit} onCancel={() => router.back()} />
    </div>
  )
}
