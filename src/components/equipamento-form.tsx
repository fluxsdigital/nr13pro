"use client"

import { useEffect, useState } from "react"
import type { Equipamento, CreateEquipamentoDTO, Cliente, TipoEquipamento, ClasseFluido } from "@/lib/types"
import { clienteService } from "@/lib/services"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { calcularPV, obterGrupoPotencialRisco, classificarVaso, classificarCaldeira } from "@/lib/nr13"

interface Props {
  initial?: Equipamento
  onSubmit: (data: CreateEquipamentoDTO) => Promise<void>
  onCancel: () => void
}

const tipoOptions: { value: TipoEquipamento; label: string }[] = [
  { value: "vaso", label: "Vaso de Pressão" },
  { value: "caldeira", label: "Caldeira" },
  { value: "tubulacao", label: "Tubulação" },
  { value: "tanque", label: "Tanque Metálico" },
]

const classeOptions: { value: ClasseFluido; label: string }[] = [
  { value: "A", label: "A - Inflamáveis / Tóxicos" },
  { value: "B", label: "B - Combustíveis < 200°C" },
  { value: "C", label: "C - Vapor / Ar Comprimido" },
  { value: "D", label: "D - Demais fluidos" },
]

export function EquipamentoForm({ initial, onSubmit, onCancel }: Props) {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<CreateEquipamentoDTO>({
    clienteId: initial?.clienteId ?? "",
    tag: initial?.tag ?? "",
    descricao: initial?.descricao ?? "",
    fabricante: initial?.fabricante ?? "",
    numeroSerie: initial?.numeroSerie ?? "",
    anoFabricacao: initial?.anoFabricacao ?? new Date().getFullYear(),
    pressaoOperacao: initial?.pressaoOperacao ?? 0,
    volume: initial?.volume ?? 0,
    pmta: initial?.pmta ?? 0,
    fluido: initial?.fluido ?? "",
    classeFluido: initial?.classeFluido ?? "C",
    localizacao: initial?.localizacao ?? "",
    tipo: initial?.tipo ?? "vaso",
  })

  useEffect(() => {
    clienteService.list().then(setClientes)
  }, [])

  const pv = calcularPV(form.pressaoOperacao, form.volume)
  const grupo = obterGrupoPotencialRisco(pv)

  let previewCategoria: string | null = null
  if (form.tipo === "caldeira") {
    previewCategoria = classificarCaldeira(form.pressaoOperacao)
  } else if (grupo !== null || form.classeFluido === "A") {
    const result = classificarVaso(form.classeFluido, form.pressaoOperacao, form.volume)
    previewCategoria = result ? `Vaso Cat. ${result.categoria}` : "Fora da NR-13 (P.V < 1)"
  } else {
    previewCategoria = "Fora da NR-13 (P.V < 1)"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit(form)
    } finally {
      setLoading(false)
    }
  }

  const set = (field: keyof CreateEquipamentoDTO, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-600 text-xs">Cliente</Label>
              <select
                value={form.clienteId}
                onChange={(e) => set("clienteId", e.target.value)}
                required
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione...</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-600 text-xs">Tipo de Equipamento</Label>
              <select
                value={form.tipo}
                onChange={(e) => set("tipo", e.target.value)}
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {tipoOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-600 text-xs">Tag</Label>
              <Input
                value={form.tag}
                onChange={(e) => set("tag", e.target.value)}
                placeholder="Ex: V-101"
                required
                className="border-slate-200 bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-600 text-xs">Descrição</Label>
              <Input
                value={form.descricao}
                onChange={(e) => set("descricao", e.target.value)}
                placeholder="Ex: Reservatório de Ar Comprimido"
                required
                className="border-slate-200 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-600 text-xs">Fabricante</Label>
              <Input
                value={form.fabricante}
                onChange={(e) => set("fabricante", e.target.value)}
                placeholder="Ex: VasosTech"
                required
                className="border-slate-200 bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-600 text-xs">Nº de Série</Label>
              <Input
                value={form.numeroSerie}
                onChange={(e) => set("numeroSerie", e.target.value)}
                placeholder="Ex: VT-2024-001"
                required
                className="border-slate-200 bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-600 text-xs">Ano de Fabricação</Label>
              <Input
                type="number"
                value={form.anoFabricacao}
                onChange={(e) => set("anoFabricacao", Number(e.target.value))}
                required
                className="border-slate-200 bg-white"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-6 space-y-4">
          <p className="text-sm font-medium text-slate-700">Parâmetros Operacionais</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-600 text-xs">Pressão de Operação (kPa)</Label>
              <Input
                type="number"
                value={form.pressaoOperacao}
                onChange={(e) => set("pressaoOperacao", Number(e.target.value))}
                required
                className="border-slate-200 bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-600 text-xs">Volume (m³)</Label>
              <Input
                type="number"
                value={form.volume}
                onChange={(e) => set("volume", Number(e.target.value))}
                required
                className="border-slate-200 bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-600 text-xs">PMTA (kPa)</Label>
              <Input
                type="number"
                value={form.pmta}
                onChange={(e) => set("pmta", Number(e.target.value))}
                required
                className="border-slate-200 bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-600 text-xs">Fluido</Label>
              <Input
                value={form.fluido}
                onChange={(e) => set("fluido", e.target.value)}
                placeholder="Ex: Ar Comprimido"
                required
                className="border-slate-200 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-600 text-xs">Classe do Fluido</Label>
              <select
                value={form.classeFluido}
                onChange={(e) => set("classeFluido", e.target.value)}
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {classeOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-600 text-xs">Localização</Label>
              <Input
                value={form.localizacao}
                onChange={(e) => set("localizacao", e.target.value)}
                placeholder="Ex: Compressores - Prédio 1"
                required
                className="border-slate-200 bg-white"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-6">
          <p className="text-sm font-medium text-slate-700 mb-3">Prévia da Classificação NR-13</p>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-slate-500">P.V:</span>{" "}
                <span className="font-medium text-slate-900">{pv.toLocaleString("pt-BR")}</span>
              </div>
              <div>
                <span className="text-slate-500">Grupo:</span>{" "}
                <span className="font-medium text-slate-900">{grupo ? `Grupo ${grupo}` : "—"}</span>
              </div>
              <div>
                <span className="text-slate-500">Categoria:</span>{" "}
                <span className="font-medium text-blue-700">{previewCategoria}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel} className="border-slate-200 text-slate-700">
          Cancelar
        </Button>
        <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
          {loading ? "Salvando..." : initial ? "Atualizar Equipamento" : "Cadastrar Equipamento"}
        </Button>
      </div>
    </form>
  )
}
