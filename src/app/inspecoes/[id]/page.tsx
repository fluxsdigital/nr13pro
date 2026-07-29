"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { inspecaoService, equipamentoService, clienteService, laudoService } from "@/lib/services"
import type { Inspecao, Equipamento, Cliente, Laudo } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { FileText, Ruler, AlertTriangle, ShieldCheck, ClipboardCheck } from "lucide-react"

export default function InspecaoDetalhe() {
  const params = useParams()
  const [inspecao, setInspecao] = useState<Inspecao | null>(null)
  const [eq, setEq] = useState<Equipamento | undefined>(undefined)
  const [cliente, setCliente] = useState<Cliente | undefined>(undefined)
  const [laudo, setLaudo] = useState<Laudo | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = params.id as string
    inspecaoService.getById(id).then(async (ins) => {
      if (!ins) { setLoading(false); return }
      setInspecao(ins)
      const equip = await equipamentoService.getById(ins.equipamentoId)
      setEq(equip)
      if (equip) {
        const cli = await clienteService.getById(equip.clienteId)
        setCliente(cli)
      }
      const ld = await laudoService.getByInspecaoId(ins.id)
      setLaudo(ld)
      setLoading(false)
    }).catch((err) => {
      console.error("Erro ao carregar detalhe da inspeção:", err)
      setLoading(false)
    })
  }, [params.id])

  if (loading) return <div className="p-4 sm:p-8 text-text-secondary">Carregando...</div>
  if (!inspecao) return <div className="p-4 sm:p-8 text-text-secondary">Inspeção não encontrada</div>

  return (
    <div className="p-4 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-semibold text-text-primary tracking-tight capitalize">{inspecao.tipo.replace("_", " ")}</h1>
            <Badge variant={inspecao.concluida ? "default" : "secondary"}>
              {inspecao.concluida ? "Concluída" : "Em andamento"}
            </Badge>
          </div>
          <p className="text-text-secondary text-sm mt-1 truncate">
            {eq?.tag} — {eq?.descricao} • {inspecao.dataInicio} a {inspecao.dataTermino}
          </p>
          {cliente && <p className="text-xs text-primary mt-0.5">Cliente: {cliente.nome}</p>}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
          {!laudo && inspecao.concluida && (
            <Link href={`/laudos/novo?inspecao=${inspecao.id}`}>
              <Button variant="primary" className="w-full sm:w-auto">
                <FileText className="h-4 w-4 mr-2" />
                Gerar Laudo
              </Button>
            </Link>
          )}
          <Link href={`/equipamentos/${eq?.id}`}>
            <Button variant="outline" className="border-border text-text-secondary w-full sm:w-auto">Ver Equipamento</Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="resumo" className="w-full">
        <TabsList className="bg-card-hover border border-border overflow-x-auto flex-nowrap">
        <TabsTrigger value="resumo" className="data-[state=active]:bg-white data-[state=active]:shadow-sm shrink-0">Resumo</TabsTrigger>
           <TabsTrigger value="checklist" className="data-[state=active]:bg-white data-[state=active]:shadow-sm shrink-0">Checklist</TabsTrigger>
           <TabsTrigger value="medicoes" className="data-[state=active]:bg-white data-[state=active]:shadow-sm shrink-0">Medições</TabsTrigger>
           <TabsTrigger value="anomalias" className="data-[state=active]:bg-white data-[state=active]:shadow-sm shrink-0">Anomalias</TabsTrigger>
           <TabsTrigger value="dispositivos" className="data-[state=active]:bg-white data-[state=active]:shadow-sm shrink-0">Dispositivos</TabsTrigger>
        </TabsList>

        <TabsContent value="resumo" className="mt-4 space-y-4">
          <Card className="border-border shadow-sm">
            <CardHeader><CardTitle className="text-text-primary">Exames Realizados</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Exame Externo", ok: inspecao.examesExternos },
                  { label: "Exame Interno", ok: inspecao.examesInternos },
                  { label: "Teste Hidrostático", ok: inspecao.testeHidrostatico },
                ].map(({ label, ok }) => (
                  <div key={label} className={`p-3 rounded-lg text-center border ${
                    ok ? "bg-success-subtle border-success/30" : "bg-background border-border"
                  }`}>
                    <p className="text-sm text-text-primary">{label}</p>
                    <p className={`text-xs mt-1 ${ok ? "text-success" : "text-text-muted"}`}>{ok ? "Realizado" : "Não realizado"}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader><CardTitle className="text-text-primary">Parecer Técnico</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-text-secondary leading-relaxed">{inspecao.parecer}</p>
            </CardContent>
          </Card>

          {inspecao.parametrosUltrassom && (
            <Card className="border-border shadow-sm">
              <CardHeader><CardTitle className="text-text-primary text-sm">Parâmetros Ultrassom</CardTitle></CardHeader>
              <CardContent className="text-xs space-y-1">
                <p><strong>Aparelho:</strong> {inspecao.parametrosUltrassom.aparelho}</p>
                <p><strong>Transdutor:</strong> {inspecao.parametrosUltrassom.transdutor}</p>
                <p><strong>Velocidade Sônica:</strong> {inspecao.parametrosUltrassom.velocidadeSonica} m/s</p>
                <p><strong>Técnica:</strong> {inspecao.parametrosUltrassom.tecnica}</p>
                <p><strong>Bloco de Calibração:</strong> {inspecao.parametrosUltrassom.blocoCalibracao} mm</p>
              </CardContent>
            </Card>
          )}

          {laudo && (
            <Link href={`/laudos/${laudo.id}`}>
              <Card className="border-border shadow-sm hover:bg-card-hover cursor-pointer transition-colors">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-text-primary">Laudo: {laudo.numeroLaudo}</p>
                      <p className="text-xs text-text-secondary">Emitido em {laudo.dataEmissao}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-border">Visualizar</Badge>
                </CardContent>
              </Card>
            </Link>
          )}
        </TabsContent>

        <TabsContent value="checklist" className="mt-4 space-y-3">
          {inspecao.checklist.length === 0 ? (
            <Card className="border-border shadow-sm">
              <CardContent className="py-8 text-center">
                <ClipboardCheck className="h-10 w-10 text-text-muted mx-auto mb-3" />
                <p className="text-text-secondary">Nenhum item de checklist registrado</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {(() => {
                const secoes = [...new Set(inspecao.checklist.map((c) => c.secao))]
                return secoes.map((secao) => {
                  const items = inspecao.checklist.filter((c) => c.secao === secao)
                  return (
                    <Card key={secao} className="border-border shadow-sm">
                      <CardHeader className="pb-2"><CardTitle className="text-sm text-text-primary">{secao}</CardTitle></CardHeader>
                      <CardContent className="space-y-2">
                        {items.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3 text-sm">
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                              item.ok === true ? "bg-success border-success text-white text-xs flex items-center justify-center" :
                              item.ok === false ? "bg-red-100 border-red-400 text-red-600 text-xs flex items-center justify-center" :
                              "border-border text-text-muted"
                            }`}>
                              {item.ok === true ? "✓" : item.ok === false ? "✗" : ""}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={item.ok === false ? "text-red-600" : "text-text-primary"}>{item.item}</p>
                              {item.observacao && (
                                <p className="text-xs text-text-secondary mt-0.5">{item.observacao}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )
                })
              })()}
            </div>
          )}
        </TabsContent>

        <TabsContent value="medicoes" className="mt-4">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-text-primary flex items-center gap-2">
                <Ruler className="h-4 w-4 text-primary" />
                Medições de Espessura
              </CardTitle>
            </CardHeader>
            <CardContent>
              {inspecao.medicoes.length === 0 ? (
                <p className="text-sm text-text-muted italic">Nenhuma medição registrada</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-background">
                        <th className="text-left py-2 px-3 text-text-secondary font-medium">Ponto</th>
                        <th className="text-left py-2 px-3 text-text-secondary font-medium">Atual (mm)</th>
                        <th className="text-left py-2 px-3 text-text-secondary font-medium">Anterior (mm)</th>
                        <th className="text-left py-2 px-3 text-text-secondary font-medium">Variação</th>
                        <th className="text-left py-2 px-3 text-text-secondary font-medium">Obs</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inspecao.medicoes.map((med) => (
                        <tr key={med.id} className="border-b border-border">
                          <td className="py-2 px-3 font-medium text-text-primary">{med.ponto}</td>
                          <td className="py-2 px-3 text-text-secondary">{med.espessura}</td>
                          <td className="py-2 px-3 text-text-secondary">{med.espessuraAnterior ?? "—"}</td>
                          <td className="py-2 px-3">
                            {med.espessuraAnterior ? (
                              <span className={med.espessura < med.espessuraAnterior ? "text-red-600" : "text-success"}>
                                {((med.espessura - med.espessuraAnterior) / med.espessuraAnterior * 100).toFixed(1)}%
                              </span>
                            ) : "—"}
                          </td>
                          <td className="py-2 px-3 text-text-muted text-xs">{med.observacao}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anomalias" className="mt-4 space-y-3">
          {inspecao.anomalias.length === 0 ? (
            <Card className="border-border shadow-sm">
              <CardContent className="py-8 text-center">
                <AlertTriangle className="h-8 w-8 text-success mx-auto mb-2" />
                <p className="text-sm text-text-secondary">Nenhuma anomalia encontrada</p>
              </CardContent>
            </Card>
          ) : (
            inspecao.anomalias.map((ano) => (
              <Card key={ano.id} className="border-border shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        ano.gravidade === "critica" ? "destructive" :
                        ano.gravidade === "alta" ? "destructive" :
                        ano.gravidade === "media" ? "default" : "secondary"
                      } className="capitalize">{ano.gravidade}</Badge>
                      <span className="text-sm text-text-primary">{ano.descricao}</span>
                    </div>
                    <Badge variant={ano.resolvida ? "default" : "secondary"}>
                      {ano.resolvida ? "Resolvida" : "Pendente"}
                    </Badge>
                  </div>
                  {ano.planoAcao && (
                    <p className="text-xs text-text-secondary mt-2">Plano de ação: {ano.planoAcao}</p>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="dispositivos" className="mt-4">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-text-primary flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Dispositivos de Segurança
              </CardTitle>
            </CardHeader>
            <CardContent>
              {inspecao.dispositivosSeguranca.length === 0 ? (
                <p className="text-sm text-text-muted italic">Nenhum dispositivo registrado</p>
              ) : (
                <div className="space-y-2">
                      {inspecao.dispositivosSeguranca.map((d) => (
                     <div key={d.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-background">
                       <div className="flex items-center gap-3">
                         <div className={`w-2 h-2 rounded-full ${d.inspecaoOk ? "bg-success" : "bg-red-500"}`} />
                         <div>
                           <p className="text-sm text-text-primary font-medium capitalize">{d.tipo.replace("_", " ")}</p>
                           <p className="text-xs text-text-secondary">{d.tag}</p>
                           {d.fabricante && <p className="text-[10px] text-text-muted">{d.fabricante} {d.modelo ?? ""}</p>}
                           {d.pressaoAbertura && <p className="text-[10px] text-text-muted">PS: {d.pressaoAbertura} kPa</p>}
                         </div>
                       </div>
                       <div className="text-right text-xs text-text-secondary">
                         <p>{d.inspecaoOk ? "Aprovado" : "Reprovado"}</p>
                         {d.pressaoVedacao && <p>Vedação: {d.pressaoVedacao} kPa</p>}
                       </div>
                     </div>
                   ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
