"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { inspecaoService, laudoService, equipamentoService, clienteService } from "@/lib/services"
import type { Equipamento, Inspecao, Cliente } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { FileText } from "lucide-react"
import Link from "next/link"

function NovoLaudoForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const inspecaoId = searchParams.get("inspecao")

  const [inspecao, setInspecao] = useState<Inspecao | null>(null)
  const [equipamento, setEquipamento] = useState<Equipamento | null>(null)
  const [cliente, setCliente] = useState<Cliente | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [plhNome, setPlhNome] = useState("Eng. Carlos Alberto Santos")
  const [plhCrea, setPlhCrea] = useState("CREA-SP 123.456")
  const [dataEmissao, setDataEmissao] = useState(new Date().toISOString().slice(0, 10))
  const [dataProxima, setDataProxima] = useState("")
  const [observacoes, setObservacoes] = useState("")

  const [numeroLaudo, setNumeroLaudo] = useState("")

  useEffect(() => {
    if (!inspecaoId) { setLoading(false); return }
    inspecaoService.getById(inspecaoId).then(async (ins) => {
      if (!ins) { setLoading(false); return }
      setInspecao(ins)
      const eq = await equipamentoService.getById(ins.equipamentoId)
      setEquipamento(eq ?? null)
      if (eq) {
        const cli = await clienteService.getById(eq.clienteId)
        setCliente(cli ?? null)
      }
      const ano = new Date().getFullYear()
      const count = (await laudoService.list()).length + 1
      setNumeroLaudo(`NR13-LD-${ano}-${String(count).padStart(4, "0")}`)

      if (eq?.categoria && ["I","II","III","IV","V"].includes(eq.categoria)) {
        const mapa: Record<string, number> = { I: 3, II: 4, III: 6, IV: 8, V: 10 }
        const anos = mapa[eq.categoria as string] ?? 3
        const prox = new Date()
        prox.setFullYear(prox.getFullYear() + anos)
        setDataProxima(prox.toISOString().slice(0, 10))
      } else {
        const prox = new Date()
        prox.setFullYear(prox.getFullYear() + 1)
        setDataProxima(prox.toISOString().slice(0, 10))
      }

      setLoading(false)
    })
  }, [inspecaoId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inspecao || !equipamento) return
    setSaving(true)
    try {
      const laudo = await laudoService.create({
        inspecaoId: inspecao.id,
        equipamentoId: equipamento.id,
        numeroLaudo,
        dataEmissao,
        plhNome,
        plhCrea,
        dataProximaInspecao: dataProxima,
        observacoes,
      })
      await inspecaoService.update(inspecao.id, { laudoId: laudo.id })
      router.push(`/laudos/${laudo.id}`)
    } finally {
      setSaving(false)
    }
  }

  if (!inspecaoId) {
    return (
      <div className="p-8 max-w-2xl mx-auto space-y-6">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="py-16 text-center">
            <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 text-lg">Nenhuma inspeção selecionada</p>
            <p className="text-slate-400 text-sm mt-1">Selecione uma inspeção concluída para gerar o laudo</p>
            <Link href="/inspecoes">
              <Button variant="outline" className="mt-4 border-slate-200 text-slate-700">Ver Inspeções</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) return <div className="p-8 text-slate-500">Carregando...</div>
  if (!inspecao || !equipamento) return <div className="p-8 text-slate-500">Inspeção não encontrada</div>

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Gerar Laudo Técnico</h1>
        <p className="text-slate-500 text-sm mt-1">
          {equipamento.tag} — {equipamento.descricao}
          {cliente && ` • ${cliente.nome}`}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900 text-sm">Dados do Laudo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-600 text-xs">Nº do Laudo</Label>
                <Input value={numeroLaudo} onChange={(e) => setNumeroLaudo(e.target.value)} required className="border-slate-200 bg-white font-mono" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-600 text-xs">Data de Emissão</Label>
                <Input type="date" value={dataEmissao} onChange={(e) => setDataEmissao(e.target.value)} required className="border-slate-200 bg-white" />
              </div>
            </div>
            <Separator className="bg-slate-200" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-600 text-xs">PLH - Nome</Label>
                <Input value={plhNome} onChange={(e) => setPlhNome(e.target.value)} required className="border-slate-200 bg-white" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-600 text-xs">PLH - CREA</Label>
                <Input value={plhCrea} onChange={(e) => setPlhCrea(e.target.value)} required className="border-slate-200 bg-white" />
              </div>
            </div>
            <Separator className="bg-slate-200" />
            <div className="space-y-2">
              <Label className="text-slate-600 text-xs">Data da Próxima Inspeção</Label>
              <Input type="date" value={dataProxima} onChange={(e) => setDataProxima(e.target.value)} required className="border-slate-200 bg-white" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-600 text-xs">Observações</Label>
              <Textarea value={observacoes} onChange={(e) => setObservacoes(e.target.value)} rows={3} className="border-slate-200 bg-white" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm bg-blue-50 border-blue-100">
          <CardContent className="p-4">
            <p className="text-xs text-blue-700">
              O laudo será gerado com base na inspeção <strong>{inspecao.tipo.replace("_", " ")}</strong> realizada em {inspecao.dataInicio}.
              Certifique-se de que todos os exames, medições e anomalias foram registrados antes da emissão.
            </p>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.back()} className="border-slate-200 text-slate-700">
            Cancelar
          </Button>
          <Button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
            <FileText className="h-4 w-4 mr-2" />
            {saving ? "Gerando..." : "Emitir Laudo"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default function NovoLaudo() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-500">Carregando...</div>}>
      <NovoLaudoForm />
    </Suspense>
  )
}
