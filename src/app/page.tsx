"use client"

import { useState } from "react"
import {
  clientes, equipamentos, inspecoes, laudos,
  getEquipamentosDoCliente, getInspecoesDoCliente, getLaudoPorInspecao,
} from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Building2, ClipboardCheck, FileText, AlertTriangle,
  ArrowRight, Calendar, CheckCircle2, Clock, Ban,
} from "lucide-react"
import Link from "next/link"

type FiltroCliente = "todas" | string

function progressoCliente(clienteId: string) {
  const eqs = getEquipamentosDoCliente(clienteId)
  const insps = getInspecoesDoCliente(clienteId)
  const total = eqs.length
  const comLaudo = insps.filter((i) => i.concluida && laudos.some((l) => l.inspecaoId === i.id)).length
  const emAndamento = insps.filter((i) => !i.concluida).length
  const semInspecao = total - new Set(insps.map((i) => i.equipamentoId)).size
  const pct = total > 0 ? Math.round((comLaudo / total) * 100) : 0
  return { total, comLaudo, emAndamento, semInspecao, pct }
}

export default function Dashboard() {
  const [filtro, setFiltro] = useState<FiltroCliente>("todas")

  const totalEquipamentos = equipamentos.length
  const totalClientes = clientes.length
  const inspecoesConcluidas = inspecoes.filter((i) => i.concluida).length
  const laudosEmitidos = laudos.length
  const inspecoesPendentes = inspecoes.filter((i) => !i.concluida).length
  const semInspecaoGeral = equipamentos.filter(
    (eq) => !inspecoes.some((i) => i.equipamentoId === eq.id)
  ).length

  const certificadosPendentes = inspecoes.filter(
    (i) => i.concluida && !laudos.some((l) => l.inspecaoId === i.id)
  )

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Gestão das atividades de inspeção NR-13</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <label className="text-xs text-slate-500">Filtrar por cliente:</label>
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          >
            <option value="todas">Todas as empresas</option>
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
          </select>
        </div>
      </div>

      {filtro === "todas" ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Clientes Ativos</CardTitle>
                <Building2 className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">{totalClientes}</div>
                <p className="text-xs text-slate-400 mt-1">indústrias contratantes</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Equipamentos</CardTitle>
                <Building2 className="h-4 w-4 text-slate-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">{totalEquipamentos}</div>
                <p className="text-xs text-slate-400 mt-1">sob responsabilidade</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Inspeções Concluídas</CardTitle>
                <ClipboardCheck className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">{inspecoesConcluidas}</div>
                <p className="text-xs text-slate-400 mt-1">{certificadosPendentes.length} aguardando laudo</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Laudos Emitidos</CardTitle>
                <FileText className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">{laudosEmitidos}</div>
                <p className="text-xs text-slate-400 mt-1">entregues aos clientes</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Pendentes</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">{inspecoesPendentes + semInspecaoGeral}</div>
                <p className="text-xs text-slate-400 mt-1">
                  {inspecoesPendentes} em andamento, {semInspecaoGeral} sem inspeção
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-slate-900 text-lg">Progresso por Cliente</CardTitle>
                <Link href="/equipamentos" className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  Ver todos <ArrowRight className="h-3 w-3" />
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clientes.map((cli) => {
                    const p = progressoCliente(cli.id)
                    return (
                      <button
                        key={cli.id}
                        onClick={() => setFiltro(cli.id)}
                        className="w-full block p-4 rounded-lg border border-slate-100 bg-white hover:bg-slate-50 transition-colors text-left"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{cli.nome}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{cli.cnpj}</p>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {p.total} equip.
                          </Badge>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                          <div
                            className="h-full bg-emerald-500 rounded-full transition-all"
                            style={{ width: `${p.pct}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-emerald-600 font-medium">{p.pct}% inspecionado</span>
                          <div className="flex gap-3 text-slate-500">
                            <span className="flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                              {p.comLaudo}
                            </span>
                            {p.emAndamento > 0 && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3 text-amber-500" />
                                {p.emAndamento}
                              </span>
                            )}
                            {p.semInspecao > 0 && (
                              <span className="flex items-center gap-1">
                                <Ban className="h-3 w-3 text-red-400" />
                                {p.semInspecao}
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-slate-900 text-lg">Atividade Recente</CardTitle>
                <Link href="/inspecoes" className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  Ver todas <ArrowRight className="h-3 w-3" />
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[...inspecoes].reverse().map((ins) => {
                    const eq = equipamentos.find((e) => e.id === ins.equipamentoId)
                    const cliNome = eq ? clientes.find((c) => c.id === eq.clienteId)?.nome ?? "" : ""
                    return (
                      <Link
                        key={ins.id}
                        href={`/inspecoes/${ins.id}`}
                        className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-white hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Calendar className="h-4 w-4 text-blue-600 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">
                              {eq?.tag} — {eq?.descricao}
                            </p>
                            <p className="text-xs text-slate-400 truncate">{cliNome}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <Badge variant={ins.concluida ? "default" : "secondary"} className="text-xs">
                            {ins.concluida ? "Concluída" : "Em andamento"}
                          </Badge>
                          <p className="text-xs text-slate-400 mt-1">
                            {ins.dataInicio} {ins.dataTermino ? `a ${ins.dataTermino}` : ""}
                          </p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {certificadosPendentes.length > 0 && (
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Certificados Disponíveis para Emissão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {certificadosPendentes.map((ins) => {
                    const eq = equipamentos.find((e) => e.id === ins.equipamentoId)
                    const cli = eq ? clientes.find((c) => c.id === eq.clienteId) : null
                    return (
                      <Link
                        key={ins.id}
                        href={`/laudos/novo?inspecao=${ins.id}`}
                        className="flex items-center justify-between p-3 rounded-lg border border-blue-100 bg-blue-50 hover:bg-blue-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <div>
                            <p className="text-sm font-medium text-slate-900">{eq?.tag} — {eq?.descricao}</p>
                            <p className="text-xs text-slate-500">{cli?.nome} • Inspeção concluída em {ins.dataTermino}</p>
                          </div>
                        </div>
                        <Badge variant="default" className="bg-blue-600 text-xs">Emitir laudo</Badge>
                      </Link>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <DetalheCliente clienteId={filtro} onVoltar={() => setFiltro("todas")} />
      )}
    </div>
  )
}

function DetalheCliente({ clienteId, onVoltar }: { clienteId: string; onVoltar: () => void }) {
  const cli = clientes.find((c) => c.id === clienteId)
  if (!cli) return null

  const eqs = getEquipamentosDoCliente(clienteId)
  const insps = getInspecoesDoCliente(clienteId)
  const p = progressoCliente(clienteId)

  const certificadosDisponiveis = insps.filter(
    (i) => i.concluida && !laudos.some((l) => l.inspecaoId === i.id)
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onVoltar}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium shrink-0"
          >
            &larr; Voltar
          </button>
          <div className="h-5 w-px bg-slate-200" />
          <div className="min-w-0">
            <h2 className="text-xl font-semibold text-slate-900 truncate">{cli.nome}</h2>
            <p className="text-xs text-slate-500 truncate">{cli.cnpj} • {cli.contato}</p>
          </div>
        </div>
        <Link href={`/inspecoes/nova?cliente=${clienteId}`} className="shrink-0">
          <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm font-medium w-full sm:w-auto">
            Nova Inspeção
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-slate-900">{p.total}</p>
            <p className="text-xs text-slate-500">Total Equip.</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-emerald-600">{p.comLaudo}</p>
            <p className="text-xs text-slate-500">Inspecionados</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-amber-600">{p.emAndamento}</p>
            <p className="text-xs text-slate-500">Em Andamento</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-slate-400">{p.semInspecao}</p>
            <p className="text-xs text-slate-500">Pendentes</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-slate-700">Progresso de Inspeções</p>
            <span className="text-sm font-bold text-emerald-600">{p.pct}%</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${p.pct}%` }} />
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {p.comLaudo} de {p.total} equipamentos inspecionados e com laudo emitido
          </p>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-900 text-base">Equipamentos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left py-3 px-4 text-slate-500 font-medium text-xs uppercase tracking-wider">Tag</th>
                  <th className="text-left py-3 px-4 text-slate-500 font-medium text-xs uppercase tracking-wider">Descrição</th>
                  <th className="text-left py-3 px-4 text-slate-500 font-medium text-xs uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 text-slate-500 font-medium text-xs uppercase tracking-wider">Laudo</th>
                  <th className="text-left py-3 px-4 text-slate-500 font-medium text-xs uppercase tracking-wider">Próx. Inspeção</th>
                </tr>
              </thead>
              <tbody>
                {eqs.map((eq) => {
                  const ins = inspecoes
                    .filter((i) => i.equipamentoId === eq.id)
                    .sort((a, b) => b.dataInicio.localeCompare(a.dataInicio))
                  const ultima = ins[0]
                  const laudo = ultima ? getLaudoPorInspecao(ultima.id) : null

                  let statusLabel: string
                  let statusColor: "default" | "secondary" | "destructive" | "outline" = "secondary"
                  if (!ultima) {
                    statusLabel = "Sem inspeção"
                    statusColor = "destructive"
                  } else if (ultima.concluida && laudo) {
                    statusLabel = "Inspecionado"
                    statusColor = "default"
                  } else if (ultima.concluida && !laudo) {
                    statusLabel = "Aguardando laudo"
                    statusColor = "outline"
                  } else {
                    statusLabel = "Em andamento"
                    statusColor = "secondary"
                  }

                  return (
                    <tr
                      key={eq.id}
                      className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                      onClick={() => window.location.href = `/equipamentos/${eq.id}`}
                    >
                      <td className="py-3 px-4 font-medium text-slate-900">{eq.tag}</td>
                      <td className="py-3 px-4 text-slate-600">{eq.descricao}</td>
                      <td className="py-3 px-4">
                        <Badge variant={statusColor} className="text-xs">{statusLabel}</Badge>
                      </td>
                      <td className="py-3 px-4 text-xs">
                        {laudo ? (
                          <Link href={`/laudos/${laudo.id}`} className="text-blue-600 hover:underline">
                            {laudo.numeroLaudo}
                          </Link>
                        ) : ultima?.concluida ? (
                          <Link
                            href={`/laudos/novo?inspecao=${ultima.id}`}
                            className="text-blue-600 hover:underline font-medium"
                          >
                            Emitir
                          </Link>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-500">
                        {laudo?.dataProximaInspecao ?? "—"}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {certificadosDisponiveis.length > 0 && (
        <Card className="border-slate-200 shadow-sm border-blue-200">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center gap-2 text-base">
              <FileText className="h-4 w-4 text-blue-600" />
              Certificados Disponíveis para Emissão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {certificadosDisponiveis.map((ins) => {
                const eq = equipamentos.find((e) => e.id === ins.equipamentoId)
                return (
                  <Link
                    key={ins.id}
                    href={`/laudos/novo?inspecao=${ins.id}`}
                    className="flex items-center justify-between p-3 rounded-lg border border-blue-100 bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">{eq?.tag} — {eq?.descricao}</p>
                        <p className="text-xs text-slate-500">Inspeção concluída em {ins.dataTermino}</p>
                      </div>
                    </div>
                    <Badge variant="default" className="bg-blue-600 text-xs">Emitir laudo</Badge>
                  </Link>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
