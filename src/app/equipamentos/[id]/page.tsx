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
    return <div className="p-4 sm:p-8 text-slate-500">Equipamento não encontrado</div>
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
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">{eq.tag}</h1>
            <Badge variant="outline" className="border-slate-200 text-slate-600 capitalize">{eq.tipo}</Badge>
            {eq.categoria && <Badge>{eq.categoria}</Badge>}
          </div>
          <p className="text-slate-500 mt-1 truncate">{eq.descricao}</p>
          {cliente && (
            <p className="text-xs text-blue-600 mt-1 truncate">
              Cliente: {cliente.nome}
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
          <Link href={`/equipamentos/${eq.id}/editar`}>
            <Button variant="outline" className="border-slate-200 text-slate-700 w-full sm:w-auto">
              <Pencil className="h-4 w-4 mr-2" />
              Editar
            </Button>
          </Link>
          <Link href={`/inspecoes/nova?equipamento=${eq.id}`}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm w-full sm:w-auto">
              <ClipboardCheck className="h-4 w-4 mr-2" />
              Nova Inspeção
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-slate-200 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-slate-900">Dados Técnicos</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
              <div>
                <dt className="text-slate-500">Fabricante</dt>
                <dd className="text-slate-900 font-medium">{eq.fabricante}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Nº de Série</dt>
                <dd className="text-slate-900 font-medium">{eq.numeroSerie}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Ano de Fabricação</dt>
                <dd className="text-slate-900 font-medium">{eq.anoFabricacao}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Pressão de Operação (kPa)</dt>
                <dd className="text-slate-900 font-medium">{eq.pressaoOperacao}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Volume (m³)</dt>
                <dd className="text-slate-900 font-medium">{eq.volume}</dd>
              </div>
              <div>
                <dt className="text-slate-500">PMTA (kPa)</dt>
                <dd className="text-slate-900 font-medium">{eq.pmta}</dd>
              </div>
              <div>
                <dt className="text-slate-500">P.V (produto)</dt>
                <dd className="text-slate-900 font-medium">
                  {(eq.pressaoOperacao * eq.volume).toLocaleString("pt-BR")}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Fluido</dt>
                <dd className="text-slate-900 font-medium">{eq.fluido} (Classe {eq.classeFluido})</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-slate-500">Classe do Fluido</dt>
                <dd className="text-slate-600 text-xs mt-0.5">{descricaoClasseFluido(eq.classeFluido)}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Localização</dt>
                <dd className="text-slate-900 font-medium">{eq.localizacao}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900">Classificação NR-13</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {catInfo && (
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                <p className="text-sm font-medium text-slate-900">{catInfo.nome}</p>
                <p className="text-xs text-slate-500 mt-1">{catInfo.risco}</p>
              </div>
            )}
            {periodicidade && (
              <div className="space-y-2">
                <p className="text-sm text-slate-500 font-medium">Periodicidade (sem SPIE)</p>
                <div className="flex gap-2">
                  <div className="flex-1 p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
                    <p className="text-xs text-slate-500">Externo</p>
                    <p className="text-xl font-bold text-blue-600">{periodicidade.externo} ano(s)</p>
                  </div>
                  <div className="flex-1 p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
                    <p className="text-xs text-slate-500">Interno</p>
                    <p className="text-xl font-bold text-blue-600">{periodicidade.interno} ano(s)</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inspecoes" className="w-full">
        <TabsList className="bg-slate-100 border border-slate-200 overflow-x-auto flex-nowrap">
          <TabsTrigger value="inspecoes" className="data-[state=active]:bg-white data-[state=active]:shadow-sm shrink-0">Inspeções</TabsTrigger>
          <TabsTrigger value="laudos" className="data-[state=active]:bg-white data-[state=active]:shadow-sm shrink-0">Laudos</TabsTrigger>
        </TabsList>

        <TabsContent value="inspecoes" className="mt-4">
          {inspecoesEq.length === 0 ? (
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="py-16 text-center">
                <ClipboardCheck className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">Nenhuma inspeção registrada para este equipamento</p>
                <Link href={`/inspecoes/nova?equipamento=${eq.id}`}>
                  <Button variant="outline" className="mt-4 border-slate-200 text-slate-700">
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
                    <Card className="border-slate-200 shadow-sm hover:bg-slate-50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-2 h-2 rounded-full ${ins.concluida ? "bg-emerald-500" : "bg-amber-500"}`} />
                            <div>
                              <p className="text-sm font-medium text-slate-900 capitalize">{ins.tipo.replace("_", " ")}</p>
                              <p className="text-xs text-slate-500">{ins.dataInicio} a {ins.dataTermino}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {l && <Badge variant="outline" className="text-xs border-slate-200">{l.numeroLaudo}</Badge>}
                            <Badge variant={ins.concluida ? "default" : "secondary"}>
                              {ins.concluida ? "Concluída" : "Em andamento"}
                            </Badge>
                            <ArrowRight className="h-4 w-4 text-slate-400" />
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
              <Card className="border-slate-200 shadow-sm hover:bg-slate-50 transition-colors">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">{laudo.numeroLaudo}</p>
                      <p className="text-xs text-slate-500">Emitido em {laudo.dataEmissao}</p>
                    </div>
                  </div>
                  <div className="text-right text-xs text-slate-500">
                    <p>{laudo.plhNome}</p>
                    <p>{laudo.plhCrea}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ) : (
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="py-16 text-center">
                <FileText className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">Nenhum laudo emitido para este equipamento</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
