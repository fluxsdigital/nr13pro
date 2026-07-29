"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, Suspense, useRef } from "react"
import { equipamentos, clientes } from "@/lib/store"
import { inspecaoService, equipamentoService } from "@/lib/services"
import { toast } from "sonner"
import type { CreateInspecaoDTO } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Camera, Plus, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Step = "equipamento" | "exames" | "medicoes" | "anomalias" | "dispositivos" | "parecer"

function NovaInspecaoForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const equipamentoId = searchParams.get("equipamento")
  const [step, setStep] = useState<Step>(equipamentoId ? "exames" : "equipamento")
  const contentRef = useRef<HTMLDivElement>(null)

  const [selectedEq, setSelectedEq] = useState(equipamentos.find((e) => e.id === equipamentoId) ?? null)
  const [tipo, setTipo] = useState("periodica")
  const [examesExternos, setExamesExternos] = useState(true)
  const [examesInternos, setExamesInternos] = useState(true)
  const [testeHidrostatico, setTesteHidrostatico] = useState(false)
  const [temSPIE, setTemSPIE] = useState(false)
  const [parecer, setParecer] = useState("")
  const [dataInicio, setDataInicio] = useState(new Date().toISOString().slice(0, 10))
  const [dataTermino, setDataTermino] = useState(new Date().toISOString().slice(0, 10))
  const [saving, setSaving] = useState(false)

  const [medicoes, setMedicoes] = useState([{ ponto: "", espessura: "", observacao: "" }])
  const [anomalias, setAnomalias] = useState<{ descricao: string; gravidade: string; planoAcao: string }[]>([])
  const [dispositivos, setDispositivos] = useState([
    { tipo: "valvula_seguranca", tag: "", inspecaoOk: true, observacao: "" },
  ])

  const adicionarMedicao = () => setMedicoes([...medicoes, { ponto: "", espessura: "", observacao: "" }])
  const adicionarAnomalia = () => setAnomalias([...anomalias, { descricao: "", gravidade: "media", planoAcao: "" }])
  const adicionarDispositivo = () => setDispositivos([...dispositivos, { tipo: "valvula_seguranca", tag: "", inspecaoOk: true, observacao: "" }])

  const steps: { key: Step; label: string }[] = [
    ...(equipamentoId ? [] : [{ key: "equipamento" as Step, label: "Equipamento" }]),
    { key: "exames" as Step, label: "Exames" },
    { key: "medicoes" as Step, label: "Medições" },
    { key: "anomalias" as Step, label: "Anomalias" },
    { key: "dispositivos" as Step, label: "Dispositivos" },
    { key: "parecer" as Step, label: "Parecer" },
  ]

  const currentIndex = steps.findIndex((s) => s.key === step)
  const selectedClient = selectedEq ? clientes.find((c) => c.id === selectedEq.clienteId) : null

  const finalizar = async () => {
    if (!selectedEq) return
    setSaving(true)
    try {
      const data: CreateInspecaoDTO = {
        equipamentoId: selectedEq.id,
        tipo: tipo as CreateInspecaoDTO["tipo"],
        dataInicio,
        dataTermino,
        examesExternos,
        examesInternos,
        testeHidrostatico,
        temSPIE,
        parecer,
        concluida: true,
        medicoes: medicoes
          .filter((m) => m.ponto && m.espessura)
          .map((m) => ({
            ponto: m.ponto,
            espessura: parseFloat(m.espessura),
            espessuraAnterior: null,
            dataMedicao: dataInicio,
            observacao: m.observacao,
          })),
        anomalias: anomalias
          .filter((a) => a.descricao)
          .map((a) => ({
            descricao: a.descricao,
            gravidade: a.gravidade as "baixa" | "media" | "alta" | "critica",
            resolvida: false,
            planoAcao: a.planoAcao,
          })),
        dispositivosSeguranca: dispositivos
          .filter((d) => d.tag)
          .map((d) => ({
            tipo: d.tipo as "valvula_seguranca" | "disco_ruptura" | "manometro" | "termometro" | "visor_nivel",
            tag: d.tag,
            inspecaoOk: d.inspecaoOk,
            observacao: d.observacao,
          })),
      }
      const inspecao = await inspecaoService.create(data)
      toast.success("Inspeção registrada com sucesso!")
      router.push(`/inspecoes/${inspecao.id}`)
    } catch {
      toast.error("Erro ao salvar inspeção")
    } finally {
      setSaving(false)
    }
  }

  const podeAvancar = (): boolean => {
    if (step === "equipamento") return selectedEq !== null
    return true
  }

  const avancar = () => {
    const next = steps[currentIndex + 1]
    if (next) { setStep(next.key); contentRef.current?.scrollTo(0, 0) }
  }
  const voltar = () => {
    const prev = steps[currentIndex - 1]
    if (prev) { setStep(prev.key); contentRef.current?.scrollTo(0, 0) }
  }

  const renderEquipamento = () => (
    <div className="space-y-4">
      <Label className="text-text-primary">Selecione o Equipamento</Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {equipamentos.map((eq) => (
          <div
            key={eq.id}
            className={cn(
              "p-3 rounded-lg border cursor-pointer transition-all text-center",
              selectedEq?.id === eq.id ? "border-primary bg-primary-subtle ring-1 ring-primary" : "border-border bg-white hover:border-primary/30 hover:shadow-sm"
            )}
            onClick={() => setSelectedEq(eq)}
          >
            <p className="text-sm font-semibold text-text-primary truncate">{eq.tag}</p>
            <p className="text-[10px] text-text-secondary mt-0.5 leading-tight line-clamp-2">{eq.descricao}</p>
            <p className="text-[10px] text-text-muted mt-0.5">{eq.tipo} • Cat. {eq.categoria}</p>
            <Badge variant="outline" className="border-border mt-1.5 text-[10px]">{eq.classeFluido}</Badge>
          </div>
        ))}
      </div>
    </div>
  )

  const renderExames = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-text-primary">Data de Início</Label>
          <Input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} className="border-border bg-white w-full" />
        </div>
        <div className="space-y-2">
          <Label className="text-text-primary">Data de Término</Label>
          <Input type="date" value={dataTermino} onChange={(e) => setDataTermino(e.target.value)} className="border-border bg-white w-full" />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-text-primary">Tipo de Inspeção</Label>
        <Select value={tipo} onValueChange={(v) => v && setTipo(v)}>
          <SelectTrigger className="border-border bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="inicial">Inicial</SelectItem>
            <SelectItem value="periodica">Periódica</SelectItem>
            <SelectItem value="extraordinaria">Extraordinária</SelectItem>
            <SelectItem value="extraordinaria_especial">Extraordinária Especial</SelectItem>
            <SelectItem value="vida_remanescente">Vida Remanescente</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator className="bg-border" />

      <div className="space-y-3">
        <Label className="text-base text-text-primary font-medium">Exames Realizados</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { key: "examesExternos", label: "Exame Externo", val: examesExternos, set: setExamesExternos },
            { key: "examesInternos", label: "Exame Interno", val: examesInternos, set: setExamesInternos },
            { key: "testeHidrostatico", label: "Teste Hidrostático", val: testeHidrostatico, set: setTesteHidrostatico },
            { key: "temSPIE", label: "Com SPIE", val: temSPIE, set: setTemSPIE },
          ].map(({ key, label, val, set }) => (
            <div
              key={key}
              className={cn(
                "p-3 rounded-lg border cursor-pointer transition-colors",
                val ? "border-primary bg-primary-subtle" : "border-border bg-white hover:border-primary/30"
              )}
              onClick={() => set(!val)}
            >
              <p className="text-sm text-text-primary">{label}</p>
              <p className="text-xs text-text-secondary">{val ? "Realizado" : "Clique para marcar"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderMedicoes = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base text-text-primary font-medium">Medições de Espessura (Ultrassom)</Label>
        <Button variant="outline" size="sm" onClick={adicionarMedicao} className="border-border text-text-primary shrink-0">
          <Plus className="h-3 w-3 mr-1" /> Adicionar
        </Button>
      </div>
      {medicoes.map((med, i) => (
        <div key={i} className="p-4 rounded-lg border border-border bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-secondary font-medium">Ponto {i + 1}</span>
            {medicoes.length > 1 && (
              <Trash2 className="h-3 w-3 text-red-500 cursor-pointer" onClick={() => setMedicoes(medicoes.filter((_, j) => j !== i))} />
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-text-secondary">Ponto de Medição</Label>
              <Input value={med.ponto} onChange={(e) => { const m = [...medicoes]; m[i] = { ...m[i], ponto: e.target.value }; setMedicoes(m) }}
                placeholder="Ex: Costado Seção A" className="border-border bg-white h-9" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-text-secondary">Espessura (mm)</Label>
              <Input type="number" step="0.1" value={med.espessura} onChange={(e) => { const m = [...medicoes]; m[i] = { ...m[i], espessura: e.target.value }; setMedicoes(m) }}
                placeholder="12.5" className="border-border bg-white h-9" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-text-secondary">Observação</Label>
              <Input value={med.observacao} onChange={(e) => { const m = [...medicoes]; m[i] = { ...m[i], observacao: e.target.value }; setMedicoes(m) }}
                placeholder="Normal" className="border-border bg-white h-9" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderAnomalias = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base text-text-primary font-medium">Anomalias Encontradas</Label>
        <Button variant="outline" size="sm" onClick={adicionarAnomalia} className="border-border text-text-primary shrink-0">
          <Plus className="h-3 w-3 mr-1" /> Adicionar
        </Button>
      </div>
      {anomalias.map((ano, i) => (
        <div key={i} className="p-4 rounded-lg border border-border bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-secondary font-medium">Anomalia {i + 1}</span>
            {anomalias.length > 1 && (
              <Trash2 className="h-3 w-3 text-red-500 cursor-pointer" onClick={() => setAnomalias(anomalias.filter((_, j) => j !== i))} />
            )}
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-text-secondary">Descrição</Label>
            <Textarea value={ano.descricao} onChange={(e) => { const a = [...anomalias]; a[i] = { ...a[i], descricao: e.target.value }; setAnomalias(a) }}
              placeholder="Descreva a anomalia encontrada..." className="border-border bg-white min-h-[60px]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-text-secondary">Gravidade</Label>
              <Select value={ano.gravidade} onValueChange={(v) => { const a = [...anomalias]; a[i] = { ...a[i], gravidade: v ?? "media" }; setAnomalias(a) }}>
                <SelectTrigger className="border-border bg-white h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="critica">Crítica</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-text-secondary">Foto</Label>
              <Button variant="outline" className="w-full border-border text-text-primary h-9">
                <Camera className="h-3 w-3 mr-1" /> Anexar Foto
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-text-secondary">Plano de Ação</Label>
            <Input value={ano.planoAcao} onChange={(e) => { const a = [...anomalias]; a[i] = { ...a[i], planoAcao: e.target.value }; setAnomalias(a) }}
              placeholder="Ação corretiva proposta..." className="border-border bg-white h-9" />
          </div>
        </div>
      ))}
      {anomalias.length === 0 && <p className="text-sm text-text-muted italic">Nenhuma anomalia registrada</p>}
    </div>
  )

  const renderDispositivos = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base text-text-primary font-medium">Dispositivos de Segurança</Label>
        <Button variant="outline" size="sm" onClick={adicionarDispositivo} className="border-border text-text-primary shrink-0">
          <Plus className="h-3 w-3 mr-1" /> Adicionar
        </Button>
      </div>
      {dispositivos.map((disp, i) => (
        <div key={i} className="p-4 rounded-lg border border-border bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-secondary font-medium">Dispositivo {i + 1}</span>
            {dispositivos.length > 1 && (
              <Trash2 className="h-3 w-3 text-red-500 cursor-pointer" onClick={() => setDispositivos(dispositivos.filter((_, j) => j !== i))} />
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-text-secondary">Tipo</Label>
              <Select value={disp.tipo} onValueChange={(v) => { const d = [...dispositivos]; d[i] = { ...d[i], tipo: v ?? "valvula_seguranca" }; setDispositivos(d) }}>
                <SelectTrigger className="border-border bg-white h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="valvula_seguranca">Válvula de Segurança</SelectItem>
                  <SelectItem value="disco_ruptura">Disco de Ruptura</SelectItem>
                  <SelectItem value="manometro">Manômetro</SelectItem>
                  <SelectItem value="termometro">Termômetro</SelectItem>
                  <SelectItem value="visor_nivel">Visor de Nível</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-text-secondary">Tag</Label>
              <Input value={disp.tag} onChange={(e) => { const d = [...dispositivos]; d[i] = { ...d[i], tag: e.target.value }; setDispositivos(d) }}
                placeholder="Ex: PSV-101" className="border-border bg-white h-9" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex-1 p-2 rounded-lg border cursor-pointer text-center transition-colors",
                disp.inspecaoOk ? "border-primary bg-primary-subtle text-primary" : "border-border bg-white text-text-secondary"
              )}
              onClick={() => { const d = [...dispositivos]; d[i] = { ...d[i], inspecaoOk: !d[i].inspecaoOk }; setDispositivos(d) }}
            >
              <span className="text-xs font-medium">{disp.inspecaoOk ? "Aprovado" : "Reprovado"}</span>
            </div>
            <div className="flex-[2]">
              <Input value={disp.observacao} onChange={(e) => { const d = [...dispositivos]; d[i] = { ...d[i], observacao: e.target.value }; setDispositivos(d) }}
                placeholder="Observação..." className="border-border bg-white h-9" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderParecer = () => (
    <div className="space-y-6">
      <Card className="border-border bg-background">
        <CardContent className="p-4 space-y-1">
          <p className="text-sm text-text-primary font-medium">Resumo da Inspeção</p>
          <p className="text-xs text-text-secondary">
            Equipamento: {selectedEq?.tag} • {medicoes.length} ponto(s) medido(s) • {anomalias.length} anomalia(s) • {dispositivos.length} dispositivo(s)
          </p>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <Label className="text-text-primary">Parecer Técnico</Label>
        <Textarea
          value={parecer}
          onChange={(e) => setParecer(e.target.value)}
          placeholder="Descreva o parecer conclusivo sobre a integridade do equipamento..."
          className="border-border bg-white min-h-[120px]"
        />
      </div>

      <div className="p-4 rounded-lg bg-primary-subtle border border-primary/20">
        <p className="text-sm text-primary font-medium">Próximos passos</p>
        <p className="text-xs text-text-secondary mt-1">
          Após finalizar, o sistema gerará o registro da inspeção. Você poderá emitir o laudo técnico em seguida.
        </p>
      </div>
    </div>
  )

  const renderStep = () => {
    switch (step) {
      case "equipamento": return renderEquipamento()
      case "exames": return renderExames()
      case "medicoes": return renderMedicoes()
      case "anomalias": return renderAnomalias()
      case "dispositivos": return renderDispositivos()
      case "parecer": return renderParecer()
    }
  }

  return (
    <div className="min-h-dvh flex flex-col p-4 sm:p-8">
      <div className="w-full mx-auto flex flex-col flex-1 gap-4 sm:gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-text-primary tracking-tight">Nova Inspeção</h1>
            <p className="text-text-secondary text-xs sm:text-sm mt-0.5">Preencha os dados da inspeção de segurança</p>
            {selectedClient && (
              <p className="text-[11px] text-text-muted mt-0.5">
                {selectedClient.nome} • CNPJ {selectedClient.cnpj}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center gap-2 shrink-0">
                <div className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium transition-colors shrink-0",
                  i <= currentIndex ? "bg-primary text-white" : "bg-card-hover text-text-muted"
                )}>
                  {i + 1}
                </div>
                <span className={cn(
                  "text-[11px] whitespace-nowrap",
                  i <= currentIndex ? "text-text-primary font-medium" : "text-text-muted"
                )}>
                  {s.label}
                </span>
                {i < steps.length - 1 && <div className={cn("w-3 sm:w-4 h-px", i < currentIndex ? "bg-primary" : "bg-border")} />}
              </div>
            ))}
          </div>
        </div>

        <div ref={contentRef} className="flex-1 overflow-y-auto min-h-0">
          <Card className="border-border shadow-sm">
            <CardHeader className="p-4 sm:p-6 pb-3">
              <CardTitle className="text-text-primary text-base sm:text-lg capitalize">{steps[currentIndex].label.replace("_", " ")}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">{renderStep()}</CardContent>
          </Card>
        </div>

        <div className="sticky bottom-0 pb-0 bg-gradient-to-t from-background via-background/95 to-transparent pt-4 -mx-4 sm:-mx-8 px-4 sm:px-8">
          <div className="flex items-center justify-between gap-3">
            <Button variant="outline" onClick={voltar} disabled={currentIndex === 0}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Voltar
            </Button>
            {currentIndex < steps.length - 1 ? (
              <Button variant="primary" onClick={avancar} disabled={!podeAvancar()}>
                Avançar
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button variant="primary" onClick={finalizar} disabled={saving}>
                {saving ? "Salvando..." : "Finalizar Inspeção"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NovaInspecao() {
  return (
    <Suspense fallback={<div className="p-4 sm:p-8 text-text-secondary">Carregando...</div>}>
      <NovaInspecaoForm />
    </Suspense>
  )
}
