"use client"

import { Suspense, useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useAppSettings } from "@/components/ui/app-settings-context"
import { useSearchParams, useRouter } from "next/navigation"
import { inspecaoService, laudoService, equipamentoService, clienteService } from "@/lib/services"
import { periodicidadeInspecao } from "@/lib/nr13"
import type { Equipamento, Inspecao, Cliente } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { SignaturePad } from "@/components/ui/signature-pad"
import { FileText } from "lucide-react"
import Link from "next/link"

function NovoLaudoForm() {
  const { user } = useAuth()
  const { settings } = useAppSettings()
  const searchParams = useSearchParams()
  const router = useRouter()
  const inspecaoId = searchParams.get("inspecao")

  const [inspecao, setInspecao] = useState<Inspecao | null>(null)
  const [equipamento, setEquipamento] = useState<Equipamento | null>(null)
  const [cliente, setCliente] = useState<Cliente | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Auto-preenche PLH com dados do usuário logado + settings
  const [plhNome, setPlhNome] = useState("")
  const [plhCrea, setPlhCrea] = useState("")
  const [dataEmissao, setDataEmissao] = useState(new Date().toISOString().slice(0, 10))
  const [dataProxima, setDataProxima] = useState("")
  const [plhAssinatura, setPlhAssinatura] = useState<string | null>(null)
  const [observacoes, setObservacoes] = useState("")

  const [numeroLaudo, setNumeroLaudo] = useState("")

  useEffect(() => {
    // Define PLH vindo do usuário logado ou settings
    const nomeDoPLH = user?.name || settings?.profile?.nome || ""
    const creaDoPLH = user?.crea || settings?.profile?.crea || ""
    setPlhNome(nomeDoPLH)
    setPlhCrea(creaDoPLH)
  }, [user, settings])

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
      setNumeroLaudo(`NR13-LD-${ano}-${String(count).toString().padStart(4, "0")}`)

      const prox = new Date()
      const temSPIE = ins?.temSPIE ?? false
      if (eq?.categoria && eq.tipo === "caldeira") {
        prox.setFullYear(prox.getFullYear() + 1)
      } else if (eq?.categoria && ["I","II","III","IV","V"].includes(eq.categoria)) {
        const prazos = periodicidadeInspecao(eq.categoria as any, temSPIE)
        prox.setFullYear(prox.getFullYear() + prazos.externo)
      } else if (eq?.categoria) {
        const prazos = periodicidadeInspecao(eq.categoria as any, temSPIE)
        prox.setFullYear(prox.getFullYear() + prazos.externo)
      } else {
        prox.setFullYear(prox.getFullYear() + 1)
      }
      setDataProxima(prox.toISOString().slice(0, 10))

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
        plhAssinatura,
        dataProximaInspecao: dataProxima,
        observacoes,
      }, user!.id)
      await inspecaoService.update(inspecao.id, { laudoId: laudo.id })
      router.push(`/laudos/${laudo.id}`)
    } finally {
      setSaving(false)
    }
  }

  if (!inspecaoId) {
    return (
      <div className="p-4 sm:p-8 max-w-2xl mx-auto space-y-6">
        <Card className="border-border shadow-sm">
          <CardContent className="py-16 text-center">
            <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-text-secondary text-lg">Nenhuma inspeção selecionada</p>
            <p className="text-text-muted text-sm mt-1">
              O laudo deve ser gerado a partir de uma inspeção concluída.
              Selecione uma inspeção e clique em &quot;Gerar Laudo&quot;.
            </p>
            <Link href="/inspecoes">
              <Button variant="outline" className="mt-4 border-border text-text-secondary">Ver Inspeções</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) return <div className="p-4 sm:p-8 text-text-secondary">Carregando...</div>
  if (!inspecao || !equipamento) return <div className="p-4 sm:p-8 text-text-secondary">Inspeção não encontrada</div>

  // Se o usuário não preencheu PLH, força a preencher
  const plhVazio = !plhNome.trim() || !plhCrea.trim()

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary tracking-tight">Gerar Laudo Técnico</h1>
        <p className="text-text-secondary text-sm mt-1 truncate">
          {equipamento.tag} — {equipamento.descricao}
          {cliente && ` • ${cliente.nome}`}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-text-primary text-sm">Dados do Laudo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-text-secondary text-xs">Nº do Laudo</Label>
                <Input value={numeroLaudo} onChange={(e) => setNumeroLaudo(e.target.value)} required className="border-border bg-card font-mono" />
              </div>
              <div className="space-y-2">
                <Label className="text-text-secondary text-xs">Data de Emissão</Label>
                <Input type="date" value={dataEmissao} onChange={(e) => setDataEmissao(e.target.value)} required className="border-border bg-card" />
              </div>
            </div>
            <Separator className="bg-border" />

            <div className="space-y-3">
              <p className="text-xs font-semibold text-text-primary">Profissional Legalmente Habilitado (PLH)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-text-secondary text-xs">Nome</Label>
                  <Input value={plhNome} onChange={(e) => setPlhNome(e.target.value)} required
                    placeholder="Seu nome completo"
                    className="border-border bg-card" />
                </div>
                <div className="space-y-2">
                  <Label className="text-text-secondary text-xs">CREA</Label>
                  <Input value={plhCrea} onChange={(e) => setPlhCrea(e.target.value)} required
                    placeholder="Seu registro CREA"
                    className="border-border bg-card" />
                </div>
              </div>
              {plhVazio && (
                <p className="text-xs text-amber-600">
                  Preencha seu nome e CREA. Você pode atualizar seus dados em Configurações.
                </p>
              )}
            </div>

            <Separator className="bg-border" />
            <div className="space-y-2">
              <Label className="text-text-secondary text-xs">Data da Próxima Inspeção</Label>
              <Input type="date" value={dataProxima} onChange={(e) => setDataProxima(e.target.value)} required className="border-border bg-card" />
            </div>
            <Separator className="bg-border" />

            <SignaturePad value={plhAssinatura} onChange={setPlhAssinatura} label="Assinatura do PLH" height={160} />

            <div className="space-y-2">
              <Label className="text-text-secondary text-xs">Observações</Label>
              <Textarea value={observacoes} onChange={(e) => setObservacoes(e.target.value)} rows={3} className="border-border bg-card" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm bg-primary-subtle border-primary/20">
          <CardContent className="p-4">
            <p className="text-xs text-primary">
              O laudo será gerado com base na inspeção <strong>{inspecao.tipo.replace("_", " ")}</strong> realizada em {inspecao.dataInicio}.
              Certifique-se de que todos os exames, medições e anomalias foram registrados antes da emissão.
            </p>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.back()} className="border-border text-text-secondary">
            Cancelar
          </Button>
          <Button type="submit" variant="primary" disabled={saving || plhVazio}>
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
    <Suspense fallback={<div className="p-8 text-text-secondary">Carregando...</div>}>
      <NovoLaudoForm />
    </Suspense>
  )
}
