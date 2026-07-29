"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, Suspense } from "react"
import { equipamentos } from "@/lib/store"
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
import { Camera, Plus, Trash2 } from "lucide-react"

type Step = "equipamento" | "exames" | "medicoes" | "anomalias" | "dispositivos" | "parecer"

function NovaInspecaoForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const equipamentoId = searchParams.get("equipamento")
  const [step, setStep] = useState<Step>(equipamentoId ? "exames" : "equipamento")

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

  const renderEquipamento = () => (
    <div className="space-y-4">
      <Label className="text-slate-700">Selecione o Equipamento</Label>
      <div className="grid gap-3">
        {equipamentos.map((eq) => (
          <div
            key={eq.id}
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              selectedEq?.id === eq.id
                ? "border-blue-600 bg-blue-50"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
            onClick={() => setSelectedEq(eq)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">{eq.tag} — {eq.descricao}</p>
                <p className="text-xs text-slate-500">{eq.localizacao} • {eq.tipo} • Cat. {eq.categoria}</p>
              </div>
              <Badge variant="outline" className="border-slate-200">{eq.classeFluido}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderExames = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-700">Data de Início</Label>
              <Input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} className="border-slate-200 bg-white w-full" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700">Data de Término</Label>
              <Input type="date" value={dataTermino} onChange={(e) => setDataTermino(e.target.value)} className="border-slate-200 bg-white w-full" />
            </div>
      </div>

      <div className="space-y-2">
        <Label className="text-slate-700">Tipo de Inspeção</Label>
        <Select value={tipo} onValueChange={(v) => v && setTipo(v)}>
          <SelectTrigger className="border-slate-200 bg-white">
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

      <Separator className="bg-slate-200" />

      <div className="space-y-3">
        <Label className="text-base text-slate-900 font-medium">Exames Realizados</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { key: "examesExternos", label: "Exame Externo", val: examesExternos, set: setExamesExternos },
            { key: "examesInternos", label: "Exame Interno", val: examesInternos, set: setExamesInternos },
            { key: "testeHidrostatico", label: "Teste Hidrostático", val: testeHidrostatico, set: setTesteHidrostatico },
            { key: "temSPIE", label: "Com SPIE", val: temSPIE, set: setTemSPIE },
          ].map(({ key, label, val, set }) => (
            <div
              key={key}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                val ? "border-blue-600 bg-blue-50" : "border-slate-200 bg-white hover:border-slate-300"
              }`}
              onClick={() => set(!val)}
            >
              <p className="text-sm text-slate-900">{label}</p>
              <p className="text-xs text-slate-500">{val ? "Realizado" : "Clique para marcar"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderMedicoes = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base text-slate-900 font-medium">Medições de Espessura (Ultrassom)</Label>
        <Button variant="outline" size="sm" onClick={adicionarMedicao} className="border-slate-200 text-slate-700">
          <Plus className="h-3 w-3 mr-1" /> Adicionar Ponto
        </Button>
      </div>
      {medicoes.map((med, i) => (
        <div key={i} className="p-4 rounded-lg border border-slate-200 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Ponto {i + 1}</span>
            {medicoes.length > 1 && (
              <Trash2 className="h-3 w-3 text-red-500 cursor-pointer" onClick={() => setMedicoes(medicoes.filter((_, j) => j !== i))} />
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-slate-600">Ponto de Medição</Label>
              <Input value={med.ponto} onChange={(e) => { const m = [...medicoes]; m[i] = { ...m[i], ponto: e.target.value }; setMedicoes(m) }}
                placeholder="Ex: Costado Seção A" className="border-slate-200 bg-white h-9" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-slate-600">Espessura (mm)</Label>
              <Input type="number" step="0.1" value={med.espessura} onChange={(e) => { const m = [...medicoes]; m[i] = { ...m[i], espessura: e.target.value }; setMedicoes(m) }}
                placeholder="12.5" className="border-slate-200 bg-white h-9" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-slate-600">Observação</Label>
              <Input value={med.observacao} onChange={(e) => { const m = [...medicoes]; m[i] = { ...m[i], observacao: e.target.value }; setMedicoes(m) }}
                placeholder="Normal" className="border-slate-200 bg-white h-9" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderAnomalias = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base text-slate-900 font-medium">Anomalias Encontradas</Label>
        <Button variant="outline" size="sm" onClick={adicionarAnomalia} className="border-slate-200 text-slate-700">
          <Plus className="h-3 w-3 mr-1" /> Adicionar Anomalia
        </Button>
      </div>
      {anomalias.map((ano, i) => (
        <div key={i} className="p-4 rounded-lg border border-slate-200 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Anomalia {i + 1}</span>
            {anomalias.length > 1 && (
              <Trash2 className="h-3 w-3 text-red-500 cursor-pointer" onClick={() => setAnomalias(anomalias.filter((_, j) => j !== i))} />
            )}
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-slate-600">Descrição</Label>
            <Textarea value={ano.descricao} onChange={(e) => { const a = [...anomalias]; a[i] = { ...a[i], descricao: e.target.value }; setAnomalias(a) }}
              placeholder="Descreva a anomalia encontrada..." className="border-slate-200 bg-white min-h-[60px]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-slate-600">Gravidade</Label>
              <Select value={ano.gravidade} onValueChange={(v) => { const a = [...anomalias]; a[i] = { ...a[i], gravidade: v ?? "media" }; setAnomalias(a) }}>
                <SelectTrigger className="border-slate-200 bg-white h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="critica">Crítica</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-slate-600">Foto</Label>
              <Button variant="outline" className="w-full border-slate-200 text-slate-700 h-9">
                <Camera className="h-3 w-3 mr-1" /> Anexar Foto
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-slate-600">Plano de Ação</Label>
            <Input value={ano.planoAcao} onChange={(e) => { const a = [...anomalias]; a[i] = { ...a[i], planoAcao: e.target.value }; setAnomalias(a) }}
              placeholder="Ação corretiva proposta..." className="border-slate-200 bg-white h-9" />
          </div>
        </div>
      ))}
      {anomalias.length === 0 && <p className="text-sm text-slate-400 italic">Nenhuma anomalia registrada</p>}
    </div>
  )

  const renderDispositivos = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base text-slate-900 font-medium">Dispositivos de Segurança</Label>
        <Button variant="outline" size="sm" onClick={adicionarDispositivo} className="border-slate-200 text-slate-700">
          <Plus className="h-3 w-3 mr-1" /> Adicionar Dispositivo
        </Button>
      </div>
      {dispositivos.map((disp, i) => (
        <div key={i} className="p-4 rounded-lg border border-slate-200 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Dispositivo {i + 1}</span>
            {dispositivos.length > 1 && (
              <Trash2 className="h-3 w-3 text-red-500 cursor-pointer" onClick={() => setDispositivos(dispositivos.filter((_, j) => j !== i))} />
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-slate-600">Tipo</Label>
              <Select value={disp.tipo} onValueChange={(v) => { const d = [...dispositivos]; d[i] = { ...d[i], tipo: v ?? "valvula_seguranca" }; setDispositivos(d) }}>
                <SelectTrigger className="border-slate-200 bg-white h-9"><SelectValue /></SelectTrigger>
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
              <Label className="text-xs text-slate-600">Tag</Label>
              <Input value={disp.tag} onChange={(e) => { const d = [...dispositivos]; d[i] = { ...d[i], tag: e.target.value }; setDispositivos(d) }}
                placeholder="Ex: PSV-101" className="border-slate-200 bg-white h-9" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div
              className={`flex-1 p-2 rounded-lg border cursor-pointer text-center transition-colors ${
                disp.inspecaoOk ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-white text-slate-500"
              }`}
              onClick={() => { const d = [...dispositivos]; d[i] = { ...d[i], inspecaoOk: !d[i].inspecaoOk }; setDispositivos(d) }}
            >
              <span className="text-xs font-medium">{disp.inspecaoOk ? "Aprovado" : "Reprovado"}</span>
            </div>
            <div className="flex-[2]">
              <Input value={disp.observacao} onChange={(e) => { const d = [...dispositivos]; d[i] = { ...d[i], observacao: e.target.value }; setDispositivos(d) }}
                placeholder="Observação..." className="border-slate-200 bg-white h-9" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderParecer = () => (
    <div className="space-y-6">
      <Card className="border-slate-200 bg-slate-50">
        <CardContent className="p-4 space-y-1">
          <p className="text-sm text-slate-700 font-medium">Resumo da Inspeção</p>
          <p className="text-xs text-slate-500">
            Equipamento: {selectedEq?.tag} • {medicoes.length} ponto(s) medido(s) • {anomalias.length} anomalia(s) • {dispositivos.length} dispositivo(s)
          </p>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <Label className="text-slate-700">Parecer Técnico</Label>
        <Textarea
          value={parecer}
          onChange={(e) => setParecer(e.target.value)}
          placeholder="Descreva o parecer conclusivo sobre a integridade do equipamento..."
          className="border-slate-200 bg-white min-h-[150px]"
        />
      </div>

      <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
        <p className="text-sm text-blue-700 font-medium">Próximos passos</p>
        <p className="text-xs text-slate-600 mt-1">
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

  const podeAvancar = (): boolean => {
    if (step === "equipamento") return selectedEq !== null
    return true
  }

  const avancar = () => { const next = steps[currentIndex + 1]; if (next) setStep(next.key) }
  const voltar = () => { const prev = steps[currentIndex - 1]; if (prev) setStep(prev.key) }

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Nova Inspeção</h1>
        <p className="text-slate-500 text-sm mt-1">Preencha os dados da inspeção de segurança</p>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center gap-2 shrink-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
              i <= currentIndex ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"
            }`}>
              {i + 1}
            </div>
            <span className={`text-xs whitespace-nowrap ${i <= currentIndex ? "text-slate-700 font-medium" : "text-slate-400"}`}>{s.label}</span>
            {i < steps.length - 1 && <div className={`w-4 sm:w-6 h-px ${i < currentIndex ? "bg-blue-600" : "bg-slate-200"}`} />}
          </div>
        ))}
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-900 text-lg capitalize">{steps[currentIndex].label.replace("_", " ")}</CardTitle>
        </CardHeader>
        <CardContent>{renderStep()}</CardContent>
      </Card>

      <div className="flex items-center justify-between gap-3">
        <Button variant="outline" onClick={voltar} disabled={currentIndex === 0} className="border-slate-200 text-slate-700">
          Voltar
        </Button>
        {currentIndex < steps.length - 1 ? (
          <Button onClick={avancar} disabled={!podeAvancar()} className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
            Avançar
          </Button>
        ) : (
          <Button onClick={finalizar} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
            {saving ? "Salvando..." : "Finalizar Inspeção"}
          </Button>
        )}
      </div>
    </div>
  )
}

export default function NovaInspecao() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-500">Carregando...</div>}>
      <NovaInspecaoForm />
    </Suspense>
  )
}
