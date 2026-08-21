"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useState, useEffect, Suspense, useRef, useMemo } from "react"
import { clienteService, equipamentoService, inspecaoService } from "@/lib/services"
import { toast } from "sonner"
import type { Cliente, CreateInspecaoDTO, Equipamento, TipoTampo } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { ImageUpload } from "@/components/ui/image-upload"
import { cn } from "@/lib/utils"
import { calcularPMTACasco, calcularPMTATampoEliptico, formatarPressao } from "@/lib/nr13"

import { CHECKLIST_INSPECAO } from "@/lib/checklist-data"

type Step = "equipamento" | "exames" | "checklist" | "medicoes" | "anomalias" | "dispositivos" | "parecer"

const tipoTampoOptions: { value: TipoTampo; label: string }[] = [
  { value: "eliptico", label: "Elíptico" },
  { value: "torisferico", label: "Torisférico" },
  { value: "plano", label: "Plano" },
  { value: "conico", label: "Cônico" },
  { value: "sem_tampo", label: "Sem tampo" },
]

const localizacaoOptions = [
  { value: "tampo_superior", label: "Tampo Superior" },
  { value: "costado", label: "Costado" },
  { value: "tampo_inferior", label: "Tampo Inferior" },
]

function NovaInspecaoForm() {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const router = useRouter()
  const equipamentoId = searchParams.get("equipamento")
  const [step, setStep] = useState<Step>(equipamentoId ? "exames" : "equipamento")
  const contentRef = useRef<HTMLDivElement>(null)

  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [selectedEq, setSelectedEq] = useState<Equipamento | null>(null)

  useEffect(() => {
    let cancelled = false
    Promise.all([equipamentoService.list(), clienteService.list()])
      .then(([eqs, cls]) => {
        if (cancelled) return
        setEquipamentos(eqs)
        setClientes(cls)
        if (equipamentoId) {
          const found = eqs.find((e) => e.id === equipamentoId)
          if (found) setSelectedEq(found)
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [equipamentoId])
  const [tipo, setTipo] = useState("periodica")
  const [examesExternos, setExamesExternos] = useState(true)
  const [examesInternos, setExamesInternos] = useState(true)
  const [testeHidrostatico, setTesteHidrostatico] = useState(false)
  const [temSPIE, setTemSPIE] = useState(false)
  const [parecer, setParecer] = useState("")
  const [dataInicio, setDataInicio] = useState(new Date().toISOString().slice(0, 10))
  const [dataTermino, setDataTermino] = useState(new Date().toISOString().slice(0, 10))
  const [saving, setSaving] = useState(false)

  // PLH responsável — auto-preenchido com o usuário logado
  const [plhResponsavel, setPlhResponsavel] = useState(user?.name ?? "")
  const [plhCrea, setPlhCrea] = useState(user?.crea ?? "")

  // Resultados do Teste Hidrostático
  const [thVazamentosVisiveis, setThVazamentosVisiveis] = useState<boolean | null>(null)
  const [thDeformacao, setThDeformacao] = useState<boolean | null>(null)
  const [thAprovado, setThAprovado] = useState<boolean | null>(null)
  const [thMotivo, setThMotivo] = useState("")

  const ehVaso = selectedEq?.tipo === "vaso" || selectedEq?.tipo === "tanque"

  const [checklist, setChecklist] = useState<
    { secao: string; item: string; ok: boolean | null; naoAplicavel: boolean; observacao: string }[]
  >(
    CHECKLIST_INSPECAO.flatMap((s) =>
      s.itens.map((i) => ({
        secao: s.secao,
        item: i.item,
        ok: null,
        // Para vaso de pressão, itens como visor de nível, termômetro, procedimentos,
        // treinamento, EPI, intertravamento e válvula de bloqueio são N/A
        naoAplicavel: false,
        observacao: "",
      }))
    )
  )

  // Pré-marca itens N/A quando o equipamento é vaso de pressão
  const aplicarNAVaso = () => {
    if (!ehVaso) return
    setChecklist((prev) =>
      prev.map((c) => {
        const def = CHECKLIST_INSPECAO.flatMap((s) => s.itens).find((i) => i.item === c.item)
        return def?.naoAplicavelVaso ? { ...c, naoAplicavel: true, ok: null } : c
      })
    )
  }

  const setCheck = (idx: number, ok: boolean | null) =>
    setChecklist((prev) => prev.map((c, i) => (i === idx ? { ...c, ok, naoAplicavel: ok !== null ? false : c.naoAplicavel } : c)))

  const setCheckNA = (idx: number) =>
    setChecklist((prev) => prev.map((c, i) => (i === idx ? { ...c, naoAplicavel: !c.naoAplicavel, ok: !c.naoAplicavel ? null : c.ok } : c)))

  const setCheckObs = (idx: number, observacao: string) =>
    setChecklist((prev) => prev.map((c, i) => (i === idx ? { ...c, observacao } : c)))

  const [medicoes, setMedicoes] = useState<
    { ponto: string; localizacao: string; tipoTampo: string; espessura: string; foto: string | null; observacao: string }[]
  >([{ ponto: "", localizacao: "costado", tipoTampo: "eliptico", espessura: "", foto: null, observacao: "" }])
  const [anomalias, setAnomalias] = useState<{ descricao: string; gravidade: string; planoAcao: string; foto: string | null }[]>([])
  const [dispositivos, setDispositivos] = useState<
    { tipo: string; tag: string; fabricante: string; modelo: string; numeroSerie: string; pressaoAbertura: string; pressaoVedacao: string; calibrada: boolean; ultimaCalibracao: string; proximaCalibracao: string; numeroCertificado: string; inspecaoOk: boolean; observacao: string }[]
  >([
    { tipo: "valvula_seguranca", tag: "", fabricante: "", modelo: "", numeroSerie: "", pressaoAbertura: "", pressaoVedacao: "", calibrada: true, ultimaCalibracao: "", proximaCalibracao: "", numeroCertificado: "", inspecaoOk: true, observacao: "" },
  ])

  const adicionarMedicao = () => setMedicoes([...medicoes, { ponto: "", localizacao: "costado", tipoTampo: "eliptico", espessura: "", foto: null, observacao: "" }])
  const adicionarAnomalia = () => setAnomalias([...anomalias, { descricao: "", gravidade: "media", planoAcao: "", foto: null }])
  const adicionarDispositivo = () => setDispositivos([...dispositivos, { tipo: "valvula_seguranca", tag: "", fabricante: "", modelo: "", numeroSerie: "", pressaoAbertura: "", pressaoVedacao: "", calibrada: true, ultimaCalibracao: "", proximaCalibracao: "", numeroCertificado: "", inspecaoOk: true, observacao: "" }])

  const steps: { key: Step; label: string }[] = [
    ...(equipamentoId ? [] : [{ key: "equipamento" as Step, label: "Equipamento" }]),
    { key: "exames" as Step, label: "Exames" },
    { key: "checklist" as Step, label: "Checklist" },
    { key: "medicoes" as Step, label: "Medições" },
    { key: "anomalias" as Step, label: "Anomalias" },
    { key: "dispositivos" as Step, label: "Dispositivos" },
    { key: "parecer" as Step, label: "Parecer" },
  ]

  const currentIndex = steps.findIndex((s) => s.key === step)
  const selectedClient = selectedEq ? clientes.find((c) => c.id === selectedEq.clienteId) : null

  // ── PMTA ao vivo (menor espessura medida) ──
  const pmtaPreview = useMemo(() => {
    if (!selectedEq || !selectedEq.diametroInterno) return null
    const medidas = medicoes
      .filter((m) => m.espessura && Number(m.espessura) > 0)
      .map((m) => ({ ...m, espessuraNum: Number(m.espessura) }))
    if (medidas.length === 0) return null
    const menor = medidas.reduce((a, b) => (a.espessuraNum < b.espessuraNum ? a : b))
    const pmtaCasco = calcularPMTACasco(
      selectedEq.materialConstrucao, selectedEq.codigoProjeto,
      selectedEq.diametroInterno, menor.espessuraNum
    )
    const pmtaTampo = calcularPMTATampoEliptico(
      selectedEq.materialConstrucao, selectedEq.codigoProjeto,
      selectedEq.diametroInterno, menor.espessuraNum, null
    )
    return { menor, pmtaCasco, pmtaTampo }
  }, [medicoes, selectedEq])

  const finalizar = async () => {
    if (!selectedEq) return
    if (medicoes.filter((m) => m.ponto && m.espessura).length < 6) {
      toast.error("O mínimo de pontos de coleta é 6 (2 em cada tampo + restante no costado).")
      setStep("medicoes")
      return
    }
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
        thVazamentosVisiveis: testeHidrostatico ? thVazamentosVisiveis : null,
        thDeformacao: testeHidrostatico ? thDeformacao : null,
        thAprovado: testeHidrostatico ? thAprovado : null,
        thMotivo: testeHidrostatico ? thMotivo : "",
        plhResponsavel,
        plhCrea,
        temSPIE,
        parecer,
        concluida: true,
        parametrosUltrassom: null,
        checklist: checklist,
        medicoes: medicoes
          .filter((m) => m.ponto && m.espessura)
          .map((m) => ({
            ponto: m.ponto,
            tipoTampo: (m.localizacao === "costado" ? null : m.tipoTampo) as TipoTampo | null,
            foto: m.foto,
            espessura: parseFloat(m.espessura),
            espessuraAnterior: null,
            espessuraConstrucao: null,
            tempoOperacao: null,
            dataMedicao: dataInicio,
            observacao: m.observacao,
          })),
        anomalias: anomalias.map(a => ({ descricao: a.descricao, gravidade: a.gravidade, planoAcao: a.planoAcao, foto: a.foto }))
          .filter((a) => a.descricao)
          .map((a) => ({
            descricao: a.descricao,
            gravidade: a.gravidade as "baixa" | "media" | "alta" | "critica",
            foto: a.foto,
            resolvida: false,
            planoAcao: a.planoAcao,
          })),
        dispositivosSeguranca: dispositivos
          .filter((d) => d.tag)
          .map((d) => ({
            tipo: d.tipo as "valvula_seguranca" | "disco_ruptura" | "manometro" | "termometro" | "visor_nivel",
            tag: d.tag,
            fabricante: d.fabricante || undefined,
            modelo: d.modelo || undefined,
            numeroSerie: d.numeroSerie || undefined,
            pressaoAbertura: d.pressaoAbertura ? Number(d.pressaoAbertura) : undefined,
            pressaoVedacao: d.pressaoVedacao ? Number(d.pressaoVedacao) : undefined,
            ultimaCalibracao: d.ultimaCalibracao || undefined,
            proximaCalibracao: d.proximaCalibracao || undefined,
            numeroCertificado: d.numeroCertificado || undefined,
            inspecaoOk: d.tipo === "valvula_seguranca" && ehVaso ? d.calibrada : d.inspecaoOk,
            observacao: d.observacao,
          })),
      }
      const inspecao = await inspecaoService.create(data, user!.id)
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
              selectedEq?.id === eq.id ? "border-primary bg-primary-subtle ring-1 ring-primary" : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
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
          <Input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} className="border-border bg-card w-full" />
        </div>
        <div className="space-y-2">
          <Label className="text-text-primary">Data de Término</Label>
          <Input type="date" value={dataTermino} onChange={(e) => setDataTermino(e.target.value)} className="border-border bg-card w-full" />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-text-primary">Tipo de Inspeção</Label>
        <Select value={tipo} onValueChange={(v) => v && setTipo(v)}>
          <SelectTrigger className="border-border bg-card">
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
        <p className="text-xs font-semibold text-text-primary">Profissional Legalmente Habilitado (PLH) Responsável</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs text-text-secondary">Nome do PLH</Label>
            <Input value={plhResponsavel} onChange={(e) => setPlhResponsavel(e.target.value)}
              placeholder="Nome do responsável técnico" className="border-border bg-card h-9" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-text-secondary">CREA</Label>
            <Input value={plhCrea} onChange={(e) => setPlhCrea(e.target.value)}
              placeholder="Registro CREA" className="border-border bg-card h-9" />
          </div>
        </div>
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
                val ? "border-primary bg-primary-subtle" : "border-border bg-card hover:border-primary/30"
              )}
              onClick={() => set(!val)}
            >
              <p className="text-sm text-text-primary">{label}</p>
              <p className="text-xs text-text-secondary">{val ? "Realizado" : "Clique para marcar"}</p>
            </div>
          ))}
        </div>
      </div>

      {testeHidrostatico && (
        <div className="p-4 rounded-lg border border-primary/30 bg-primary-subtle space-y-4">
          <p className="text-sm font-semibold text-text-primary">Resultado do Teste Hidrostático</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-text-secondary">1. Houve vazamentos visíveis?</Label>
              <div className="flex gap-2">
                <button type="button" onClick={() => setThVazamentosVisiveis(thVazamentosVisiveis === true ? null : true)}
                  className={cn("flex-1 py-2 rounded-lg border text-sm font-medium transition-colors",
                    thVazamentosVisiveis === true ? "bg-red-500 text-white border-red-500" : "border-border bg-card text-text-secondary hover:border-red-500/50")}>
                  Sim
                </button>
                <button type="button" onClick={() => setThVazamentosVisiveis(thVazamentosVisiveis === false ? null : false)}
                  className={cn("flex-1 py-2 rounded-lg border text-sm font-medium transition-colors",
                    thVazamentosVisiveis === false ? "bg-success text-white border-success" : "border-border bg-card text-text-secondary hover:border-success/50")}>
                  Não
                </button>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-text-secondary">2. Houve deformação?</Label>
              <div className="flex gap-2">
                <button type="button" onClick={() => setThDeformacao(thDeformacao === true ? null : true)}
                  className={cn("flex-1 py-2 rounded-lg border text-sm font-medium transition-colors",
                    thDeformacao === true ? "bg-red-500 text-white border-red-500" : "border-border bg-card text-text-secondary hover:border-red-500/50")}>
                  Sim
                </button>
                <button type="button" onClick={() => setThDeformacao(thDeformacao === false ? null : false)}
                  className={cn("flex-1 py-2 rounded-lg border text-sm font-medium transition-colors",
                    thDeformacao === false ? "bg-success text-white border-success" : "border-border bg-card text-text-secondary hover:border-success/50")}>
                  Não
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-text-secondary">3. Aprovado?</Label>
            <div className="flex gap-2">
              <button type="button" onClick={() => setThAprovado(thAprovado === true ? null : true)}
                className={cn("flex-1 py-2 rounded-lg border text-sm font-medium transition-colors",
                  thAprovado === true ? "bg-success text-white border-success" : "border-border bg-card text-text-secondary hover:border-success/50")}>
                Aprovado
              </button>
              <button type="button" onClick={() => setThAprovado(thAprovado === false ? null : false)}
                className={cn("flex-1 py-2 rounded-lg border text-sm font-medium transition-colors",
                  thAprovado === false ? "bg-red-500 text-white border-red-500" : "border-border bg-card text-text-secondary hover:border-red-500/50")}>
                Reprovado
              </button>
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-text-secondary">4. Justificativa / Observações do resultado</Label>
            <Textarea value={thMotivo} onChange={(e) => setThMotivo(e.target.value)}
              placeholder="Descreva o motivo da aprovação ou reprovação..." className="border-border bg-card min-h-[60px]" />
          </div>
        </div>
      )}
    </div>
  )

  const renderChecklist = () => {
    const secoes = CHECKLIST_INSPECAO
    let checkIdx = 0
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-base font-medium text-text-primary">Checklist de Inspeção</p>
          {ehVaso && (
            <Button variant="outline" size="sm" onClick={aplicarNAVaso} className="border-border text-text-primary shrink-0">
              Marcar itens N/A para vaso de pressão
            </Button>
          )}
        </div>
        {secoes.map((s) => {
          const startIdx = checkIdx
          checkIdx += s.itens.length
          return (
            <div key={s.secao} className="border border-border rounded-lg overflow-hidden">
              <div className="bg-card-hover px-4 py-2 font-medium text-sm text-text-primary">{s.secao}</div>
              <div className="divide-y divide-border">
                {(checklist.slice(startIdx, startIdx + s.itens.length) as typeof checklist).map((item, j) => {
                  const idx = startIdx + j
                  return (
                    <div key={idx} className={cn("px-4 py-3 flex items-start gap-3", item.naoAplicavel && "opacity-50")}>
                      <div className="flex gap-1 shrink-0 mt-0.5">
                        <button
                          type="button"
                          onClick={() => setCheck(idx, item.ok === true ? null : true)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                            item.ok === true
                              ? "bg-success text-white"
                              : "bg-background border border-border text-text-muted hover:border-success/50"
                          }`}
                        >Sim</button>
                        <button
                          type="button"
                          onClick={() => setCheck(idx, item.ok === false ? null : false)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                            item.ok === false
                              ? "bg-red-500 text-white"
                              : "bg-background border border-border text-text-muted hover:border-red-500/50"
                          }`}
                        >Não</button>
                        <button
                          type="button"
                          onClick={() => setCheckNA(idx)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                            item.naoAplicavel
                              ? "bg-text-muted text-white"
                              : "bg-background border border-border text-text-muted hover:border-text-muted/50"
                          }`}
                          title="Não aplicável"
                        >N/A</button>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${item.naoAplicavel ? "text-text-muted line-through" : item.ok === null ? "text-text-secondary" : item.ok ? "text-success font-medium" : "text-red-600 font-medium"}`}>
                          {item.item}
                        </p>
                        {item.naoAplicavel && (
                          <p className="text-[10px] text-text-muted mt-0.5">Não aplicável a este equipamento</p>
                        )}
                        {item.ok === false && !item.naoAplicavel && (
                          <input
                            value={item.observacao}
                            onChange={(e) => setCheckObs(idx, e.target.value)}
                            placeholder="Observação..."
                            className="mt-1 w-full text-xs border border-border rounded px-2 py-1 bg-card"
                          />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderMedicoes = () => {
    const pontosValidos = medicoes.filter((m) => m.ponto && m.espessura).length
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base text-text-primary font-medium">Medições de Espessura (Ultrassom)</Label>
            <p className="text-xs text-text-secondary mt-0.5">
              Mínimo de <strong>6 pontos</strong>: 2 em cada tampo (superior e inferior) + restante no costado
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={adicionarMedicao} className="border-border text-text-primary shrink-0">
            <Plus className="h-3 w-3 mr-1" /> Adicionar
          </Button>
        </div>

        <div className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg border text-xs",
          pontosValidos >= 6 ? "border-success/30 bg-success-subtle text-success" : "border-amber-300 bg-amber-50 text-amber-700"
        )}>
          <span className="font-semibold">{pontosValidos} / 6</span>
          <span>pontos preenchidos</span>
          {pontosValidos < 6 && <span className="ml-auto">Adicione mais {6 - pontosValidos} ponto(s)</span>}
        </div>

        {medicoes.map((med, i) => (
          <div key={i} className="p-4 rounded-lg border border-border bg-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary font-medium">Ponto {i + 1}</span>
              {medicoes.length > 1 && (
                <Trash2 className="h-3 w-3 text-red-500 cursor-pointer" onClick={() => setMedicoes(medicoes.filter((_, j) => j !== i))} />
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-text-secondary">Localização do Ponto</Label>
                <Select value={med.localizacao} onValueChange={(v) => { const m = [...medicoes]; m[i] = { ...m[i], localizacao: v ?? "costado" }; setMedicoes(m) }}>
                  <SelectTrigger className="border-border bg-card h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {localizacaoOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {med.localizacao !== "costado" ? (
                <div className="space-y-1">
                  <Label className="text-xs text-text-secondary">Tipo de Tampo</Label>
                  <Select value={med.tipoTampo} onValueChange={(v) => { const m = [...medicoes]; m[i] = { ...m[i], tipoTampo: v ?? "eliptico" }; setMedicoes(m) }}>
                    <SelectTrigger className="border-border bg-card h-9"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {tipoTampoOptions.map((o) => (
                        <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div className="space-y-1">
                  <Label className="text-xs text-text-secondary">Ponto de Medição</Label>
                  <Input value={med.ponto} onChange={(e) => { const m = [...medicoes]; m[i] = { ...m[i], ponto: e.target.value }; setMedicoes(m) }}
                    placeholder="Ex: Costado Seção A" className="border-border bg-card h-9" />
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {med.localizacao === "costado" ? (
                <div className="space-y-1">
                  <Label className="text-xs text-text-secondary">Ponto de Medição</Label>
                  <Input value={med.ponto} onChange={(e) => { const m = [...medicoes]; m[i] = { ...m[i], ponto: e.target.value }; setMedicoes(m) }}
                    placeholder="Ex: Costado Seção A" className="border-border bg-card h-9" />
                </div>
              ) : (
                <div className="space-y-1">
                  <Label className="text-xs text-text-secondary">Ponto de Medição</Label>
                  <Input value={med.ponto} onChange={(e) => { const m = [...medicoes]; m[i] = { ...m[i], ponto: e.target.value }; setMedicoes(m) }}
                    placeholder="Ex: Tampo Superior - Centro" className="border-border bg-card h-9" />
                </div>
              )}
              <div className="space-y-1">
                <Label className="text-xs text-text-secondary">Espessura (mm)</Label>
                <Input type="number" step="0.1" value={med.espessura} onChange={(e) => { const m = [...medicoes]; m[i] = { ...m[i], espessura: e.target.value }; setMedicoes(m) }}
                  placeholder="12.5" className="border-border bg-card h-9" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-text-secondary">Foto do Ponto</Label>
                <ImageUpload value={med.foto} onChange={(v) => { const m = [...medicoes]; m[i] = { ...m[i], foto: v }; setMedicoes(m) }} label="Anexar Foto" />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-text-secondary">Observação</Label>
              <Input value={med.observacao} onChange={(e) => { const m = [...medicoes]; m[i] = { ...m[i], observacao: e.target.value }; setMedicoes(m) }}
                placeholder="Normal" className="border-border bg-card h-9" />
            </div>
          </div>
        ))}

        {pmtaPreview && (
          <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
            <p className="text-sm font-semibold text-amber-800 mb-2">Cálculo de PMTA (menor espessura medida)</p>
            <div className="text-xs space-y-1 text-amber-700">
              <p>Menor espessura: <strong>{pmtaPreview.menor.espessuraNum} mm</strong> ({pmtaPreview.menor.ponto})</p>
              <p>PMTA casco: <strong>{pmtaPreview.pmtaCasco ? `${pmtaPreview.pmtaCasco.toFixed(2)} kgf/cm² (${(pmtaPreview.pmtaCasco * 98.0665).toFixed(1)} kPa)` : "—"}</strong></p>
              <p>PMTA tampo elíptico: <strong>{pmtaPreview.pmtaTampo ? `${pmtaPreview.pmtaTampo.toFixed(2)} kgf/cm² (${(pmtaPreview.pmtaTampo * 98.0665).toFixed(1)} kPa)` : "—"}</strong></p>
              <p>PMTA atual do equipamento: <strong>{selectedEq ? formatarPressao(selectedEq.pmta, selectedEq.unidadePressao ?? "kPa") : "—"}</strong></p>
              <p className={pmtaPreview.pmtaCasco && (pmtaPreview.pmtaCasco * 98.0665) >= selectedEq!.pmta ? "text-success font-semibold" : "text-red-600 font-semibold"}>
                {pmtaPreview.pmtaCasco && (pmtaPreview.pmtaCasco * 98.0665) >= selectedEq!.pmta
                  ? "✓ PMTA calculada ≥ PMTA atual — Espessura suficiente"
                  : "✗ PMTA calculada < PMTA atual — Atenção"}
              </p>
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderAnomalias = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base text-text-primary font-medium">Anomalias Encontradas</Label>
        <Button variant="outline" size="sm" onClick={adicionarAnomalia} className="border-border text-text-primary shrink-0">
          <Plus className="h-3 w-3 mr-1" /> Adicionar
        </Button>
      </div>
      {anomalias.map((ano, i) => (
        <div key={i} className="p-4 rounded-lg border border-border bg-card space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-secondary font-medium">Anomalia {i + 1}</span>
            {anomalias.length > 1 && (
              <Trash2 className="h-3 w-3 text-red-500 cursor-pointer" onClick={() => setAnomalias(anomalias.filter((_, j) => j !== i))} />
            )}
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-text-secondary">Descrição</Label>
            <Textarea value={ano.descricao} onChange={(e) => { const a = [...anomalias]; a[i] = { ...a[i], descricao: e.target.value }; setAnomalias(a) }}
              placeholder="Descreva a anomalia encontrada..." className="border-border bg-card min-h-[60px]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-text-secondary">Gravidade</Label>
              <Select value={ano.gravidade} onValueChange={(v) => { const a = [...anomalias]; a[i] = { ...a[i], gravidade: v ?? "media" }; setAnomalias(a) }}>
                <SelectTrigger className="border-border bg-card h-9"><SelectValue /></SelectTrigger>
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
              <ImageUpload value={ano.foto} onChange={(v) => { const a = [...anomalias]; a[i] = { ...a[i], foto: v }; setAnomalias(a) }} label="Anexar Foto" />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-text-secondary">Plano de Ação</Label>
            <Input value={ano.planoAcao} onChange={(e) => { const a = [...anomalias]; a[i] = { ...a[i], planoAcao: e.target.value }; setAnomalias(a) }}
              placeholder="Ação corretiva proposta..." className="border-border bg-card h-9" />
          </div>
        </div>
      ))}
      {anomalias.length === 0 && <p className="text-sm text-text-muted italic">Nenhuma anomalia registrada</p>}
    </div>
  )

  const renderDispositivos = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-base text-text-primary font-medium">Dispositivos de Segurança</Label>
          {ehVaso && (
            <p className="text-xs text-text-secondary mt-0.5">
              No ato da instalação de vaso, a válvula de segurança requer apenas a confirmação de calibração e validade
            </p>
          )}
        </div>
        <Button variant="outline" size="sm" onClick={adicionarDispositivo} className="border-border text-text-primary shrink-0">
          <Plus className="h-3 w-3 mr-1" /> Adicionar
        </Button>
      </div>
      {dispositivos.map((disp, i) => {
        const ehValvulaSimplificada = disp.tipo === "valvula_seguranca" && ehVaso
        return (
          <div key={i} className="p-4 rounded-lg border border-border bg-card space-y-3">
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
                  <SelectTrigger className="border-border bg-card h-9"><SelectValue /></SelectTrigger>
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
                  placeholder="Ex: PSV-101" className="border-border bg-card h-9" />
              </div>
            </div>

            {ehValvulaSimplificada ? (
              <>
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex-1 p-2 rounded-lg border cursor-pointer text-center transition-colors",
                      disp.calibrada ? "border-primary bg-primary-subtle text-primary" : "border-border bg-card text-text-secondary"
                    )}
                    onClick={() => { const d = [...dispositivos]; d[i] = { ...d[i], calibrada: !d[i].calibrada }; setDispositivos(d) }}
                  >
                    <span className="text-xs font-medium">{disp.calibrada ? "✓ Calibrada" : "Não calibrada"}</span>
                  </div>
                  <div className="flex-[2]">
                    <Input value={disp.observacao} onChange={(e) => { const d = [...dispositivos]; d[i] = { ...d[i], observacao: e.target.value }; setDispositivos(d) }}
                      placeholder="Observação..." className="border-border bg-card h-9" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-text-secondary">Última Calibração</Label>
                    <Input type="date" value={disp.ultimaCalibracao} onChange={(e) => { const d = [...dispositivos]; d[i] = { ...d[i], ultimaCalibracao: e.target.value }; setDispositivos(d) }}
                      className="border-border bg-card h-8 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-text-secondary">Próxima Calibração</Label>
                    <Input type="date" value={disp.proximaCalibracao} onChange={(e) => { const d = [...dispositivos]; d[i] = { ...d[i], proximaCalibracao: e.target.value }; setDispositivos(d) }}
                      className="border-border bg-card h-8 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-text-secondary">Nº Certificado</Label>
                    <Input value={disp.numeroCertificado} onChange={(e) => { const d = [...dispositivos]; d[i] = { ...d[i], numeroCertificado: e.target.value }; setDispositivos(d) }}
                      placeholder="Ex: CAL-PSV-2026-001" className="border-border bg-card h-8 text-xs" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-text-secondary">Fabricante</Label>
                    <Input value={disp.fabricante} onChange={(e) => { const d = [...dispositivos]; d[i] = { ...d[i], fabricante: e.target.value }; setDispositivos(d) }}
                      placeholder="Ex: Spirax Sarco" className="border-border bg-card h-8 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-text-secondary">Modelo</Label>
                    <Input value={disp.modelo} onChange={(e) => { const d = [...dispositivos]; d[i] = { ...d[i], modelo: e.target.value }; setDispositivos(d) }}
                      placeholder="Ex: SCV-25" className="border-border bg-card h-8 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-text-secondary">Nº Série</Label>
                    <Input value={disp.numeroSerie} onChange={(e) => { const d = [...dispositivos]; d[i] = { ...d[i], numeroSerie: e.target.value }; setDispositivos(d) }}
                      placeholder="Ex: SS-2025-001" className="border-border bg-card h-8 text-xs" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-text-secondary">Pressão de Abertura (kPa)</Label>
                    <Input type="number" value={disp.pressaoAbertura} onChange={(e) => { const d = [...dispositivos]; d[i] = { ...d[i], pressaoAbertura: e.target.value }; setDispositivos(d) }}
                      placeholder="Ex: 1650" className="border-border bg-card h-8 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-text-secondary">Pressão de Vedação (kPa)</Label>
                    <Input type="number" value={disp.pressaoVedacao} onChange={(e) => { const d = [...dispositivos]; d[i] = { ...d[i], pressaoVedacao: e.target.value }; setDispositivos(d) }}
                      placeholder="Ex: 1480" className="border-border bg-card h-8 text-xs" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex-1 p-2 rounded-lg border cursor-pointer text-center transition-colors",
                      disp.inspecaoOk ? "border-primary bg-primary-subtle text-primary" : "border-border bg-card text-text-secondary"
                    )}
                    onClick={() => { const d = [...dispositivos]; d[i] = { ...d[i], inspecaoOk: !d[i].inspecaoOk }; setDispositivos(d) }}
                  >
                    <span className="text-xs font-medium">{disp.inspecaoOk ? "Aprovado" : "Reprovado"}</span>
                  </div>
                  <div className="flex-[2]">
                    <Input value={disp.observacao} onChange={(e) => { const d = [...dispositivos]; d[i] = { ...d[i], observacao: e.target.value }; setDispositivos(d) }}
                      placeholder="Observação..." className="border-border bg-card h-9" />
                  </div>
                </div>
              </>
            )}
          </div>
        )
      })}
    </div>
  )

  const renderParecer = () => (
    <div className="space-y-6">
      <Card className="border-border bg-background">
        <CardContent className="p-4 space-y-1">
          <p className="text-sm text-text-primary font-medium">Resumo da Inspeção</p>
          <p className="text-xs text-text-secondary">
            Equipamento: {selectedEq?.tag} • {medicoes.filter((m) => m.ponto && m.espessura).length} ponto(s) medido(s) • {anomalias.length} anomalia(s) • {dispositivos.length} dispositivo(s)
          </p>
          {plhResponsavel && (
            <p className="text-xs text-text-secondary">PLH Responsável: {plhResponsavel} {plhCrea && `• ${plhCrea}`}</p>
          )}
        </CardContent>
      </Card>

      <div className="space-y-2">
        <Label className="text-text-primary">Parecer Técnico</Label>
        <Textarea
          value={parecer}
          onChange={(e) => setParecer(e.target.value)}
          placeholder="Descreva o parecer conclusivo sobre a integridade do equipamento..."
          className="border-border bg-card min-h-[120px]"
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
      case "checklist": return renderChecklist()
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
