"use client"

import { useParams } from "next/navigation"
import { getEquipamento, inspecoes, getLaudoPorInspecao, getClientePorEquipamento } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { descricaoCategoria, descricaoClasseFluido, periodicidadeInspecao } from "@/lib/nr13"
import { FileText, ClipboardCheck, ArrowRight, Pencil } from "lucide-react"
import Link from "next/link"

export default function EquipamentoDetalhe() {
  const params = useParams()
  const eq = getEquipamento(params.id as string)

  if (!eq) {
    return <div className="p-4 sm:p-8 text-text-secondary">Equipamento não encontrado</div>
  }

  const cliente = getClientePorEquipamento(eq.id)
  const inspecoesEq = inspecoes.filter((i) => i.equipamentoId === eq.id)
  const catInfo = eq.categoria ? descricaoCategoria(eq.categoria as any) : null
  const periodicidade = eq.categoria && ["I", "II", "III", "IV", "V"].includes(eq.categoria)
    ? periodicidadeInspecao(eq.categoria as any, false)
    : null

  const ultimaInspecao = inspecoesEq[inspecoesEq.length - 1]
  const laudo = ultimaInspecao ? getLaudoPorInspecao(ultimaInspecao.id) : null

  return (
    <div className="p-4 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-semibold text-text-primary tracking-tight">{eq.tag}</h1>
            <Badge variant="outline" className="border-border text-text-secondary capitalize">{eq.tipo}</Badge>
            {eq.categoria && <Badge>{eq.categoria}</Badge>}
          </div>
          <p className="text-text-secondary mt-1 truncate">{eq.descricao}</p>
          {cliente && (
            <p className="text-xs text-primary mt-1 truncate">
              Cliente: {cliente.nome}
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
          <Link href={`/equipamentos/${eq.id}/editar`}>
            <Button variant="outline" className="border-border text-text-secondary w-full sm:w-auto">
              <Pencil className="h-4 w-4 mr-2" />
              Editar
            </Button>
          </Link>
          <Link href={`/inspecoes/nova?equipamento=${eq.id}`}>
            <Button variant="primary" className="w-full sm:w-auto">
              <ClipboardCheck className="h-4 w-4 mr-2" />
              Nova Inspeção
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-border shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-text-primary">Dados Técnicos</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 text-sm">
              <div>
                <dt className="text-text-secondary">Fabricante</dt>
                <dd className="text-text-primary font-medium">{eq.fabricante}</dd>
              </div>
              <div>
                <dt className="text-text-secondary">Nº de Série</dt>
                <dd className="text-text-primary font-medium">{eq.numeroSerie}</dd>
              </div>
              <div>
                <dt className="text-text-secondary">Ano de Fabricação</dt>
                <dd className="text-text-primary font-medium">{eq.anoFabricacao}</dd>
              </div>
              <div>
                <dt className="text-text-secondary">Pressão de Projeto (kPa)</dt>
                <dd className="text-text-primary font-medium">{eq.pressaoProjeto}</dd>
              </div>
              <div>
                <dt className="text-text-secondary">Pressão de Operação (kPa)</dt>
                <dd className="text-text-primary font-medium">{eq.pressaoOperacao}</dd>
              </div>
              <div>
                <dt className="text-text-secondary">Pressão Teste Hidrostático (kPa)</dt>
                <dd className="text-text-primary font-medium">{eq.pressaoTesteHidrostatico ?? "N/A"}</dd>
              </div>
              <div>
                <dt className="text-text-secondary">Volume (m³)</dt>
                <dd className="text-text-primary font-medium">{eq.volume}</dd>
              </div>
              <div>
                <dt className="text-text-secondary">PMTA (kPa)</dt>
                <dd className="text-text-primary font-medium">{eq.pmta}</dd>
              </div>
              <div>
                <dt className="text-text-secondary">P.V (produto)</dt>
                <dd className="text-text-primary font-medium">
                  {(eq.pressaoOperacao * eq.volume).toLocaleString("pt-BR")}
                </dd>
              </div>
              <div>
                <dt className="text-text-secondary">Temperatura de Projeto (°C)</dt>
                <dd className="text-text-primary font-medium">{eq.temperaturaProjeto ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-text-secondary">Temperatura de Operação (°C)</dt>
                <dd className="text-text-primary font-medium">{eq.temperaturaOperacao ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-text-secondary">Fluido</dt>
                <dd className="text-text-primary font-medium">{eq.fluido} (Classe {eq.classeFluido})</dd>
              </div>
              <div>
                <dt className="text-text-secondary">Diâmetro Interno (mm)</dt>
                <dd className="text-text-primary font-medium">{eq.diametroInterno ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-text-secondary">Altura / Comprimento (mm)</dt>
                <dd className="text-text-primary font-medium">{eq.alturaComprimento ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-text-secondary">Material de Construção</dt>
                <dd className="text-text-primary font-medium">{eq.materialConstrucao}</dd>
              </div>
              <div>
                <dt className="text-text-secondary">Código de Projeto</dt>
                <dd className="text-text-primary font-medium">{eq.codigoProjeto}</dd>
              </div>
              <div>
                <dt className="text-text-secondary">Localização</dt>
                <dd className="text-text-primary font-medium">{eq.localizacao}</dd>
              </div>
              <div className="col-span-full">
                <dt className="text-text-secondary">Classe do Fluido</dt>
                <dd className="text-text-secondary text-xs mt-0.5">{descricaoClasseFluido(eq.classeFluido)}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-text-primary">Classificação NR-13</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {catInfo && (
              <div className="p-3 rounded-lg bg-primary-subtle border border-primary/20">
                <p className="text-sm font-medium text-text-primary">{catInfo.nome}</p>
                <p className="text-xs text-text-secondary mt-1">{catInfo.risco}</p>
              </div>
            )}
            {periodicidade && (
              <div className="space-y-2">
                <p className="text-sm text-text-secondary font-medium">Periodicidade (sem SPIE)</p>
                <div className="flex gap-2">
                  <div className="flex-1 p-3 rounded-lg bg-background border border-border text-center">
                    <p className="text-xs text-text-secondary">Externo</p>
                    <p className="text-xl font-bold text-primary">{periodicidade.externo} ano(s)</p>
                  </div>
                  <div className="flex-1 p-3 rounded-lg bg-background border border-border text-center">
                    <p className="text-xs text-text-secondary">Interno</p>
                    <p className="text-xl font-bold text-primary">{periodicidade.interno} ano(s)</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inspecoes" className="w-full">
        <TabsList className="bg-card-hover border border-border overflow-x-auto flex-nowrap">
          <TabsTrigger value="inspecoes" className="data-[state=active]:bg-card data-[state=active]:shadow-sm shrink-0">Inspeções</TabsTrigger>
          <TabsTrigger value="laudos" className="data-[state=active]:bg-card data-[state=active]:shadow-sm shrink-0">Laudos</TabsTrigger>
        </TabsList>

        <TabsContent value="inspecoes" className="mt-4">
          {inspecoesEq.length === 0 ? (
            <Card className="border-border shadow-sm">
              <CardContent className="py-16 text-center">
                <ClipboardCheck className="h-12 w-12 text-text-muted mx-auto mb-3" />
                <p className="text-text-secondary">Nenhuma inspeção registrada para este equipamento</p>
                <Link href={`/inspecoes/nova?equipamento=${eq.id}`}>
                  <Button variant="outline" className="mt-4 border-border text-text-secondary">
                    Iniciar Primeira Inspeção
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {inspecoesEq.map((ins) => {
                const l = getLaudoPorInspecao(ins.id)
                return (
                  <Link key={ins.id} href={`/inspecoes/${ins.id}`} className="block">
                    <Card className="border-border shadow-sm hover:bg-card-hover transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-2 h-2 rounded-full ${ins.concluida ? "bg-success" : "bg-amber-500"}`} />
                            <div>
                              <p className="text-sm font-medium text-text-primary capitalize">{ins.tipo.replace("_", " ")}</p>
                              <p className="text-xs text-text-secondary">{ins.dataInicio} a {ins.dataTermino}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {l && <Badge variant="outline" className="text-xs border-border">{l.numeroLaudo}</Badge>}
                            <Badge variant={ins.concluida ? "default" : "secondary"}>
                              {ins.concluida ? "Concluída" : "Em andamento"}
                            </Badge>
                            <ArrowRight className="h-4 w-4 text-text-muted" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="laudos" className="mt-4">
          {laudo ? (
            <Link href={`/laudos/${laudo.id}`}>
              <Card className="border-border shadow-sm hover:bg-card-hover transition-colors">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-text-primary">{laudo.numeroLaudo}</p>
                      <p className="text-xs text-text-secondary">Emitido em {laudo.dataEmissao}</p>
                    </div>
                  </div>
                  <div className="text-right text-xs text-text-secondary">
                    <p>{laudo.plhNome}</p>
                    <p>{laudo.plhCrea}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ) : (
            <Card className="border-border shadow-sm">
              <CardContent className="py-16 text-center">
                <FileText className="h-12 w-12 text-text-muted mx-auto mb-3" />
                <p className="text-text-secondary">Nenhum laudo emitido para este equipamento</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
