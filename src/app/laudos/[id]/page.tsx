"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { laudoService, equipamentoService, inspecaoService, clienteService } from "@/lib/services"
import type { Laudo, Equipamento, Inspecao, Cliente } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { calcularPMTACasco, calcularPMTATampoEliptico } from "@/lib/nr13"
import { FileText, Download, Printer, ArrowLeft, ShieldCheck, Gauge } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

function handlePrint() {
  window.print()
}

function handleDownloadPDF() {
  toast.success("PDF gerado com sucesso!")
  window.print()
}

export default function LaudoDetalhe() {
  const { user } = useAuth()
  const params = useParams()
  const [laudo, setLaudo] = useState<Laudo | null>(null)
  const [eq, setEq] = useState<Equipamento | undefined>(undefined)
  const [inspecao, setInspecao] = useState<Inspecao | undefined>(undefined)
  const [cliente, setCliente] = useState<Cliente | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = params.id as string
    laudoService.getById(id).then(async (l) => {
      if (!l) { setLoading(false); return }
      setLaudo(l)
      const equip = await equipamentoService.getById(l.equipamentoId)
      setEq(equip)
      if (equip) {
        const cli = await clienteService.getById(equip.clienteId)
        setCliente(cli)
      }
      const ins = await inspecaoService.getById(l.inspecaoId)
      setInspecao(ins)
      setLoading(false)
    }).catch((err) => {
      console.error("Erro ao carregar detalhe do laudo:", err)
      setLoading(false)
    })
  }, [params.id])

  if (loading) return <div className="p-4 sm:p-8 text-text-secondary">Carregando...</div>
  if (!laudo) return <div className="p-4 sm:p-8 text-text-secondary">Laudo não encontrado</div>

  return (
    <div className="p-4 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/laudos" className="text-text-secondary hover:text-text-primary shrink-0">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold text-text-primary tracking-tight truncate">{laudo.numeroLaudo}</h1>
            <p className="text-text-secondary text-sm truncate">{eq?.tag} — {eq?.descricao}</p>
            {cliente && <p className="text-xs text-primary truncate">{cliente.nome}</p>}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 no-print">
          <Button variant="outline" onClick={handlePrint} className="border-border text-text-secondary w-full sm:w-auto">
            <Printer className="h-4 w-4 mr-2" /> Imprimir
          </Button>
          <Button variant="primary" onClick={handleDownloadPDF} className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" /> Exportar PDF
          </Button>
        </div>
      </div>

      <Card className="border-border shadow-sm print:shadow-none print:border-none">
        <CardContent className="p-8 print:p-0">
          {/* Cabeçalho do Laudo */}
          <div className="text-center mb-10">
            <h2 className="text-xl font-bold uppercase tracking-wide text-text-primary">RELATÓRIO DE INSPEÇÃO DE SEGURANÇA</h2>
            <p className="text-sm text-text-secondary mt-1">NR-13 — Caldeiras, Vasos de Pressão, Tubulações e Tanques Metálicos de Armazenamento</p>
            <Separator className="my-4 bg-border" />
            <p className="text-lg font-semibold text-text-primary">{laudo.numeroLaudo}</p>
          </div>

          {/* Identificação do Equipamento */}
          <section className="mb-8">
            <h3 className="text-base font-bold uppercase bg-card-hover px-3 py-2 rounded mb-4 text-text-primary">1. Identificação do Equipamento</h3>
            <table className="w-full text-sm">
              <tbody>
                {[
                  ["Cliente:", cliente?.nome ?? ""],
                  ["CNPJ:", cliente?.cnpj ?? ""],
                  ["Tag / Identificação:", eq?.tag ?? ""],
                  ["Descrição:", eq?.descricao ?? ""],
                  ["Fabricante:", eq?.fabricante ?? ""],
                  ["Nº de Série:", eq?.numeroSerie ?? ""],
                  ["Ano de Fabricação:", String(eq?.anoFabricacao ?? "")],
                  ["Localização:", eq?.localizacao ?? ""],
                  ["Fluido de Serviço:", eq ? `${eq.fluido} (Classe ${eq.classeFluido})` : ""],
                  ["Pressão de Projeto:", eq ? `${eq.pressaoProjeto} ${eq.unidadePressao ?? "kPa"}` : ""],
                  ["Pressão de Operação:", eq ? `${eq.pressaoOperacao} ${eq.unidadePressao ?? "kPa"}` : ""],
                  ["Pressão Teste Hidrostático:", eq?.pressaoTesteHidrostatico ? `${eq.pressaoTesteHidrostatico} ${eq.unidadePressao ?? "kPa"}` : "N/A"],
                  ["Volume:", eq ? `${eq.volume} m³` : ""],
                  ["PMTA:", eq ? `${eq.pmta} ${eq.unidadePressao ?? "kPa"}` : ""],
                  ["Temperatura de Projeto:", eq?.temperaturaProjeto ? `${eq.temperaturaProjeto}°C` : "—"],
                  ["Temperatura de Operação:", eq?.temperaturaOperacao ? `${eq.temperaturaOperacao}°C` : "—"],
                  ["Diâmetro Interno:", eq?.diametroInterno ? `${eq.diametroInterno} mm` : "—"],
                  ["Altura / Comprimento:", eq?.alturaComprimento ? `${eq.alturaComprimento} mm` : "—"],
                  ["Material de Construção:", eq?.materialConstrucao ?? ""],
                  ["Código de Projeto:", eq?.codigoProjeto ?? ""],
                  ["Categoria:", eq?.categoria ?? ""],
                ].map(([label, value]) => (
                  <tr key={label} className="border-b border-border">
                    <td className="py-2 pr-4 font-semibold text-text-secondary w-1/3">{label}</td>
                    <td className="py-2 text-text-primary">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Dados da Inspeção */}
          <section className="mb-8">
            <h3 className="text-base font-bold uppercase bg-card-hover px-3 py-2 rounded mb-4 text-text-primary">2. Dados da Inspeção</h3>
            <table className="w-full text-sm">
              <tbody>
                {[
                  ["Tipo de Inspeção:", inspecao ? inspecao.tipo.replace("_", " ").replace(/\b\w/g, (l: string) => l.toUpperCase()) : ""],
                  ["Data de Início:", inspecao?.dataInicio ?? ""],
                  ["Data de Término:", inspecao?.dataTermino ?? ""],
                  ["Exame Externo:", inspecao?.examesExternos ? "Realizado" : "Não Realizado"],
                  ["Exame Interno:", inspecao?.examesInternos ? "Realizado" : "Não Realizado"],
                  ["Teste Hidrostático:", inspecao?.testeHidrostatico ? "Realizado" : "Não Realizado"],
                  ["SPIE:", inspecao?.temSPIE ? "Sim" : "Não"],
                  ["PLH Responsável:", inspecao?.plhResponsavel ? `${inspecao.plhResponsavel}${inspecao.plhCrea ? ` (${inspecao.plhCrea})` : ""}` : ""],
                ].map(([label, value]) => (
                  <tr key={label} className="border-b border-border">
                    <td className="py-2 pr-4 font-semibold text-text-secondary w-1/3">{label}</td>
                    <td className="py-2 text-text-primary">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Resultado do Teste Hidrostático */}
          {inspecao && inspecao.testeHidrostatico && (
            <section className="mb-8">
              <h3 className="text-base font-bold uppercase bg-card-hover px-3 py-2 rounded mb-4 text-text-primary">2.1. Resultado do Teste Hidrostático</h3>
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ["Vazamentos visíveis:", inspecao.thVazamentosVisiveis === true ? "Sim" : inspecao.thVazamentosVisiveis === false ? "Não" : "Não informado"],
                    ["Deformação:", inspecao.thDeformacao === true ? "Sim" : inspecao.thDeformacao === false ? "Não" : "Não informado"],
                    ["Resultado:", inspecao.thAprovado === true ? "APROVADO" : inspecao.thAprovado === false ? "REPROVADO" : "Não informado"],
                    ["Justificativa:", inspecao.thMotivo || "—"],
                  ].map(([label, value]) => (
                    <tr key={label} className="border-b border-border">
                      <td className="py-2 pr-4 font-semibold text-text-secondary w-1/3">{label}</td>
                      <td className={`py-2 ${label === "Resultado:" ? (inspecao.thAprovado ? "text-success font-semibold" : "text-red-600 font-semibold") : "text-text-primary"}`}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {/* Medições */}
          {inspecao && inspecao.medicoes.length > 0 && (
            <section className="mb-8">
              <h3 className="text-base font-bold uppercase bg-card-hover px-3 py-2 rounded mb-4 text-text-primary">3. Medições de Espessura (Ultrassom)</h3>
              
              {/* Parâmetros do Ultrassom */}
              {inspecao.parametrosUltrassom && (
                <div className="mb-4 p-3 bg-card-hover rounded text-xs space-y-1">
                  <p><strong>Aparelho:</strong> {inspecao.parametrosUltrassom.aparelho} &nbsp;|&nbsp; 
                  <strong>Transdutor:</strong> {inspecao.parametrosUltrassom.transdutor} &nbsp;|&nbsp; 
                  <strong>Velocidade Sônica:</strong> {inspecao.parametrosUltrassom.velocidadeSonica} m/s</p>
                  <p><strong>Técnica:</strong> {inspecao.parametrosUltrassom.tecnica} &nbsp;|&nbsp; 
                  <strong>Bloco de Calibração:</strong> {inspecao.parametrosUltrassom.blocoCalibracao} mm</p>
                </div>
              )}
              
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-card-hover">
                    <th className="border border-border px-3 py-2 text-left text-text-secondary">Ponto</th>
                    <th className="border border-border px-3 py-2 text-left text-text-secondary">Tampo</th>
                    <th className="border border-border px-3 py-2 text-right text-text-secondary">Atual (mm)</th>
                    <th className="border border-border px-3 py-2 text-right text-text-secondary">Anterior (mm)</th>
                    <th className="border border-border px-3 py-2 text-right text-text-secondary">Construção (mm)</th>
                    <th className="border border-border px-3 py-2 text-right text-text-secondary">Perda Total (mm)</th>
                    <th className="border border-border px-3 py-2 text-right text-text-secondary">Variação (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {inspecao.medicoes.map((med) => {
                    const perdaTotal = med.espessuraConstrucao ? (med.espessuraConstrucao - med.espessura).toFixed(2) : null
                    return (
                      <tr key={med.id}>
                        <td className="border border-border px-3 py-2 text-text-primary">{med.ponto}</td>
                        <td className="border border-border px-3 py-2 text-text-secondary">{med.tipoTampo ? med.tipoTampo.replace("_", " ") : "—"}</td>
                        <td className="border border-border px-3 py-2 text-right text-text-primary">{med.espessura}</td>
                        <td className="border border-border px-3 py-2 text-right text-text-secondary">{med.espessuraAnterior ?? "—"}</td>
                        <td className="border border-border px-3 py-2 text-right text-text-secondary">{med.espessuraConstrucao ?? "—"}</td>
                        <td className="border border-border px-3 py-2 text-right text-text-secondary">{perdaTotal ?? "—"}</td>
                        <td className="border border-border px-3 py-2 text-right text-text-primary">
                          {med.espessuraAnterior
                            ? ((med.espessura - med.espessuraAnterior) / med.espessuraAnterior * 100).toFixed(1) + "%"
                            : "—"}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              {inspecao.medicoes.some((m) => m.foto && m.foto.startsWith("data:image")) && (
                <div className="mt-3">
                  <p className="text-xs font-semibold text-text-secondary mb-2">Fotos dos pontos de coleta</p>
                  <div className="flex flex-wrap gap-2">
                    {inspecao.medicoes.filter((m) => m.foto && m.foto.startsWith("data:image")).map((m) => (
                      <div key={m.id} className="text-center">
                        <img src={m.foto!} alt={`Foto ${m.ponto}`} className="h-20 w-28 object-cover rounded border border-border cursor-pointer hover:opacity-90"
                          onClick={() => { if (m.foto) window.open(m.foto, "_blank") }} />
                        <p className="text-[10px] text-text-muted mt-0.5">{m.ponto}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PMTA calculado */}
              {eq && inspecao.medicoes.length > 0 && eq.diametroInterno && (
                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm font-semibold text-amber-800 mb-2">Cálculo de PMTA (menor espessura medida)</p>
                  {(() => {
                    const menorMedicao = [...inspecao.medicoes].sort((a, b) => a.espessura - b.espessura)[0]
                    if (!menorMedicao) return null
                    const pmtaCasco = calcularPMTACasco(
                      eq.materialConstrucao, eq.codigoProjeto,
                      eq.diametroInterno, menorMedicao.espessura
                    )
                    return (
                      <div className="text-xs space-y-1 text-amber-700">
                        <p>Menor espessura medida: <strong>{menorMedicao.espessura} mm</strong> ({menorMedicao.ponto})</p>
                        <p>PMTA calculada (casco): <strong>{pmtaCasco ? `${pmtaCasco.toFixed(2)} kgf/cm² (${(pmtaCasco * 98.0665).toFixed(1)} kPa)` : "—"}</strong></p>
                        <p>PMTA atual do equipamento: <strong>{eq.pmta} kPa</strong></p>
                        <p className={pmtaCasco && (pmtaCasco * 98.0665) >= eq.pmta ? "text-success font-semibold" : "text-red-600 font-semibold"}>
                          {pmtaCasco && (pmtaCasco * 98.0665) >= eq.pmta 
                            ? "✓ PMTA calculada ≥ PMTA atual — Espessura suficiente"
                            : "✗ PMTA calculada < PMTA atual — Atenção"}
                        </p>
                      </div>
                    )
                  })()}
                </div>
              )}
            </section>
          )}

          {/* Anomalias */}
          {inspecao && inspecao.anomalias.length > 0 && (
            <section className="mb-8">
              <h3 className="text-base font-bold uppercase bg-card-hover px-3 py-2 rounded mb-4 text-text-primary">4. Anomalias Encontradas</h3>
              {inspecao.anomalias.map((ano, i) => (
                <div key={ano.id} className="mb-3 p-3 border border-border rounded">
                  <p className="font-semibold text-sm text-text-primary">Anomalia {i + 1}</p>
                  <p className="text-sm mt-1 text-text-secondary">{ano.descricao}</p>
                  <div className="flex gap-4 mt-2 text-xs text-text-secondary">
                    <span>Gravidade: <strong className="uppercase">{ano.gravidade}</strong></span>
                    <span>Plano de Ação: {ano.planoAcao}</span>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Dispositivos */}
          {inspecao && inspecao.dispositivosSeguranca.length > 0 && (
            <section className="mb-8">
              <h3 className="text-base font-bold uppercase bg-card-hover px-3 py-2 rounded mb-4 text-text-primary">5. Dispositivos de Segurança</h3>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-card-hover">
                    <th className="border border-border px-3 py-2 text-left text-text-secondary">Tipo</th>
                    <th className="border border-border px-3 py-2 text-left text-text-secondary">Tag</th>
                    <th className="border border-border px-3 py-2 text-left text-text-secondary">Situação</th>
                  </tr>
                </thead>
                <tbody>
                  {inspecao.dispositivosSeguranca.map((d) => (
                    <tr key={d.id}>
                      <td className="border border-border px-3 py-2 capitalize text-text-primary">{d.tipo.replace("_", " ")}</td>
                      <td className="border border-border px-3 py-2 text-text-primary">{d.tag}</td>
                      <td className="border border-border px-3 py-2 text-text-secondary">{d.inspecaoOk ? "Aprovado" : "Reprovado"}{d.observacao ? ` — ${d.observacao}` : ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-3 flex gap-2 no-print">
                {inspecao.dispositivosSeguranca.some((d) => d.tipo === "valvula_seguranca") && (
                  <Link href={`/certificados/psv?inspecao=${inspecao.id}`}>
                    <Button variant="outline" size="sm" className="border-border text-text-secondary">
                      <ShieldCheck className="h-3.5 w-3.5 mr-1" /> Certificado PSV
                    </Button>
                  </Link>
                )}
                {inspecao.dispositivosSeguranca.some((d) => d.tipo === "manometro") && (
                  <Link href={`/certificados/calibracao?inspecao=${inspecao.id}`}>
                    <Button variant="outline" size="sm" className="border-border text-text-secondary">
                      <Gauge className="h-3.5 w-3.5 mr-1" /> Certificado Calibração
                    </Button>
                  </Link>
                )}
               </div>
             </section>
          )}

          {/* Checklist */}
          {inspecao && inspecao.checklist.length > 0 && (
            <section className="mb-8">
              <h3 className="text-base font-bold uppercase bg-card-hover px-3 py-2 rounded mb-4 text-text-primary">Checklist de Inspeção</h3>
              {(() => {
                const secoes = [...new Set(inspecao.checklist.map((c) => c.secao))]
                return secoes.map((secao) => {
                  const items = inspecao.checklist.filter((c) => c.secao === secao)
                  return (
                    <div key={secao} className="mb-3">
                      <h4 className="text-sm font-semibold text-text-primary mb-2">{secao}</h4>
                      <div className="space-y-1.5">
                        {items.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm">
                            <span className={`shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                              item.ok === true ? "bg-success text-white" :
                              item.ok === false ? "bg-red-100 text-red-600" :
                              "border border-border text-text-muted"
                            }`}>
                              {item.ok === true ? "✓" : item.ok === false ? "✗" : ""}
                            </span>
                            <span className={item.ok === false ? "text-red-600" : item.naoAplicavel ? "text-text-muted line-through" : "text-text-secondary"}>{item.item}</span>
                            {item.naoAplicavel && <span className="text-[10px] text-text-muted ml-1">(N/A)</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })
              })()}
            </section>
          )}

          {/* Parecer */}
          <section className="mb-8">
            <h3 className="text-base font-bold uppercase bg-card-hover px-3 py-2 rounded mb-4 text-text-primary">6. Parecer Conclusivo</h3>
            <p className="text-sm leading-relaxed text-text-secondary">{inspecao?.parecer}</p>
          </section>

          {/* Assinatura */}
          <section className="mb-8">
            <h3 className="text-base font-bold uppercase bg-card-hover px-3 py-2 rounded mb-4 text-text-primary">7. Responsável Técnico</h3>
            <div className="border-2 border-border rounded-lg p-6 text-center mt-4">
              <p className="font-semibold text-text-primary">{laudo.plhNome}</p>
              <p className="text-sm text-text-secondary">{laudo.plhCrea}</p>
              {laudo.plhAssinatura ? (
                <div className="mt-4 mb-2 flex justify-center">
                  <img src={laudo.plhAssinatura} alt="Assinatura do PLH" className="h-20 object-contain" />
                </div>
              ) : (
                <div className="mt-8 mb-4 border-b border-text-muted max-w-xs mx-auto" />
              )}
              <p className="text-sm text-text-secondary">Assinatura do Profissional Legalmente Habilitado (PLH)</p>
            </div>
          </section>

          {/* Próxima Inspeção */}
          <section>
            <h3 className="text-base font-bold uppercase bg-card-hover px-3 py-2 rounded mb-4 text-text-primary">8. Próxima Inspeção</h3>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-center">
              <p className="text-sm text-text-secondary">Data prevista para próxima inspeção:</p>
              <p className="text-xl font-bold text-amber-700 mt-1">{laudo.dataProximaInspecao}</p>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
