"use client"

import { useEffect, useState } from "react"
import type { Equipamento, CreateEquipamentoDTO, Cliente, TipoEquipamento, ClasseFluido, UnidadePressao } from "@/lib/types"
import { clienteService } from "@/lib/services"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { calcularPV, obterGrupoPotencialRisco, classificarVaso, classificarCaldeira, converterParaKpa, converterDeKpa } from "@/lib/nr13"

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

const unidadeOptions: { value: UnidadePressao; label: string }[] = [
  { value: "kPa", label: "kPa" },
  { value: "kgf/cm²", label: "kgf/cm²" },
  { value: "bar", label: "bar" },
  { value: "PSI", label: "PSI" },
]

const codigoProjetoOptions = [
  "ASME VIII Div.1",
  "ASME VIII Div.2",
  "API 510",
  "API 620",
  "API 650",
  "EN 13445",
  "NR-13",
  "Outro",
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
    pressaoProjeto: initial?.pressaoProjeto ?? 0,
    pressaoOperacao: initial?.pressaoOperacao ?? 0,
    unidadePressao: initial?.unidadePressao ?? "kPa",
    pressaoTesteHidrostatico: initial?.pressaoTesteHidrostatico ?? null,
    volume: initial?.volume ?? 0,
    pmta: initial?.pmta ?? 0,
    temperaturaProjeto: initial?.temperaturaProjeto ?? null,
    temperaturaOperacao: initial?.temperaturaOperacao ?? null,
    diametroInterno: initial?.diametroInterno ?? null,
    alturaComprimento: initial?.alturaComprimento ?? null,
    materialConstrucao: initial?.materialConstrucao ?? "",
    codigoProjeto: initial?.codigoProjeto ?? "",
    fluido: initial?.fluido ?? "",
    classeFluido: initial?.classeFluido ?? "C",
    localizacao: initial?.localizacao ?? "",
    tipo: initial?.tipo ?? "vaso",
  })

  useEffect(() => {
    clienteService.list().then(setClientes)
  }, [])

  const unidade = form.unidadePressao

  // Exibe o valor em kPa convertido para a unidade selecionada
  const exibir = (valorKpa: number | null) =>
    valorKpa === null || valorKpa === undefined ? "" : converterDeKpa(valorKpa, unidade)

  // Converte o valor digitado (na unidade selecionada) para kPa
  const setPressao = (field: "pressaoProjeto" | "pressaoOperacao" | "pressaoTesteHidrostatico" | "pmta", valor: string) => {
    const num = Number(valor)
    set(field, valor === "" ? (field === "pressaoTesteHidrostatico" ? null : 0) : converterParaKpa(num, unidade))
  }

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

  const mudarUnidade = (nova: UnidadePressao) => {
    // Mantém os valores em kPa; apenas a exibição muda
    set("unidadePressao", nova)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border-border shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-text-secondary text-xs">Cliente</Label>
              <select
                value={form.clienteId}
                onChange={(e) => set("clienteId", e.target.value)}
                required
                className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-card text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Selecione...</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-text-secondary text-xs">Tipo de Equipamento</Label>
              <select
                value={form.tipo}
                onChange={(e) => set("tipo", e.target.value)}
                className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-card text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {tipoOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-text-secondary text-xs">Tag</Label>
              <Input
                value={form.tag}
                onChange={(e) => set("tag", e.target.value)}
                placeholder="Ex: V-101"
                required
                className="border-border bg-card"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-text-secondary text-xs">Descrição</Label>
              <Input
                value={form.descricao}
                onChange={(e) => set("descricao", e.target.value)}
                placeholder="Ex: Reservatório de Ar Comprimido"
                required
                className="border-border bg-card"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-text-secondary text-xs">Fabricante</Label>
              <Input
                value={form.fabricante}
                onChange={(e) => set("fabricante", e.target.value)}
                placeholder="Ex: VasosTech"
                required
                className="border-border bg-card"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-text-secondary text-xs">Ano de Fabricação</Label>
              <Input
                type="number"
                value={form.anoFabricacao}
                onChange={(e) => set("anoFabricacao", Number(e.target.value))}
                required
                className="border-border bg-card"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-text-secondary">Parâmetros Operacionais</p>
            <div className="flex items-center gap-2">
              <Label className="text-text-secondary text-xs">Unidade de pressão:</Label>
              <select
                value={unidade}
                onChange={(e) => mudarUnidade(e.target.value as UnidadePressao)}
                className="text-xs border border-border rounded-lg px-2 py-1.5 bg-card text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {unidadeOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-text-secondary text-xs">Pressão de Projeto ({unidade})</Label>
              <Input
                type="number"
                value={exibir(form.pressaoProjeto)}
                onChange={(e) => setPressao("pressaoProjeto", e.target.value)}
                required
                className="border-border bg-card"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-text-secondary text-xs">Pressão de Operação ({unidade})</Label>
              <Input
                type="number"
                value={exibir(form.pressaoOperacao)}
                onChange={(e) => setPressao("pressaoOperacao", e.target.value)}
                required
                className="border-border bg-card"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-text-secondary text-xs">Pressão Teste Hidrostático ({unidade})</Label>
              <Input
                type="number"
                value={exibir(form.pressaoTesteHidrostatico)}
                onChange={(e) => setPressao("pressaoTesteHidrostatico", e.target.value)}
                placeholder="Opcional"
                className="border-border bg-card"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-text-secondary text-xs">Volume (m³)</Label>
              <Input
                type="number"
                value={form.volume}
                onChange={(e) => set("volume", Number(e.target.value))}
                required
                className="border-border bg-card"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-text-secondary text-xs">PMTA ({unidade})</Label>
              <Input
                type="number"
                value={exibir(form.pmta)}
                onChange={(e) => setPressao("pmta", e.target.value)}
                required
                className="border-border bg-card"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-text-secondary text-xs">Temperatura de Projeto (°C)</Label>
              <Input
                type="number"
                value={form.temperaturaProjeto ?? ""}
                onChange={(e) => set("temperaturaProjeto", e.target.value ? Number(e.target.value) : null)}
                placeholder="Opcional"
                className="border-border bg-card"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-text-secondary text-xs">Temperatura de Operação (°C)</Label>
              <Input
                type="number"
                value={form.temperaturaOperacao ?? ""}
                onChange={(e) => set("temperaturaOperacao", e.target.value ? Number(e.target.value) : null)}
                placeholder="Opcional"
                className="border-border bg-card"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-text-secondary text-xs">Fluido</Label>
              <Input
                value={form.fluido}
                onChange={(e) => set("fluido", e.target.value)}
                placeholder="Ex: Ar Comprimido"
                required
                className="border-border bg-card"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-text-secondary text-xs">Classe do Fluido</Label>
              <select
                value={form.classeFluido}
                onChange={(e) => set("classeFluido", e.target.value)}
                className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-card text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {classeOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-text-secondary text-xs">Localização</Label>
              <Input
                value={form.localizacao}
                onChange={(e) => set("localizacao", e.target.value)}
                placeholder="Ex: Compressores - Prédio 1"
                required
                className="border-border bg-card"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-text-secondary text-xs">Código de Projeto</Label>
              <select
                value={codigoProjetoOptions.includes(form.codigoProjeto) ? form.codigoProjeto : "Outro"}
                onChange={(e) => set("codigoProjeto", e.target.value)}
                className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-card text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {codigoProjetoOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              {!codigoProjetoOptions.includes(form.codigoProjeto) && form.codigoProjeto !== "" && (
                <Input
                  value={form.codigoProjeto}
                  onChange={(e) => set("codigoProjeto", e.target.value)}
                  placeholder="Informe o código de projeto"
                  className="border-border bg-card mt-2"
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm">
        <CardContent className="p-6 space-y-4">
          <p className="text-sm font-medium text-text-secondary">Dados Construtivos</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-text-secondary text-xs">Diâmetro Interno (mm)</Label>
              <Input
                type="number"
                value={form.diametroInterno ?? ""}
                onChange={(e) => set("diametroInterno", e.target.value ? Number(e.target.value) : null)}
                placeholder="Opcional"
                className="border-border bg-card"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-text-secondary text-xs">Altura / Comprimento (mm)</Label>
              <Input
                type="number"
                value={form.alturaComprimento ?? ""}
                onChange={(e) => set("alturaComprimento", e.target.value ? Number(e.target.value) : null)}
                placeholder="Opcional"
                className="border-border bg-card"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-text-secondary text-xs">Material de Construção</Label>
              <Input
                value={form.materialConstrucao}
                onChange={(e) => set("materialConstrucao", e.target.value)}
                placeholder="Ex: Aço Carbono"
                className="border-border bg-card"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-text-secondary text-xs">Nº de Série</Label>
              <Input
                value={form.numeroSerie}
                onChange={(e) => set("numeroSerie", e.target.value)}
                placeholder="Ex: VT-2024-001"
                required
                className="border-border bg-card"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm">
        <CardContent className="p-6">
          <p className="text-sm font-medium text-text-secondary mb-3">Prévia da Classificação NR-13</p>
          <div className="p-3 rounded-lg bg-muted border border-border">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-text-secondary">P.V:</span>{" "}
                <span className="font-medium text-text-primary">{pv.toLocaleString("pt-BR")}</span>
              </div>
              <div>
                <span className="text-text-secondary">Grupo:</span>{" "}
                <span className="font-medium text-text-primary">{grupo ? `Grupo ${grupo}` : "—"}</span>
              </div>
              <div>
                <span className="text-text-secondary">Categoria:</span>{" "}
                <span className="font-medium text-primary">{previewCategoria}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel} className="border-border text-text-secondary">
          Cancelar
        </Button>
        <Button type="submit" disabled={loading} variant="primary">
          {loading ? "Salvando..." : initial ? "Atualizar Equipamento" : "Cadastrar Equipamento"}
        </Button>
      </div>
    </form>
  )
}
