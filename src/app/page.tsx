"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { clientes, equipamentos, inspecoes, laudos } from "@/lib/store"
import {
  getEquipamentosDoCliente, getInspecoesDoCliente, getLaudoPorInspecao,
} from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Building2, ClipboardCheck, FileText, FlaskConical, AlertTriangle,
  ArrowRight, Calendar, CheckCircle2, Clock, Ban,
} from "lucide-react"
import Link from "next/link"

type FiltroCliente = "todas" | string

function progressoCliente(clienteId: string, laudosRef: typeof laudos) {
  const eqs = getEquipamentosDoCliente(clienteId)
  const insps = getInspecoesDoCliente(clienteId)
  const total = eqs.length
  const comLaudo = insps.filter((i) => i.concluida && laudosRef.some((l) => l.inspecaoId === i.id)).length
  const emAndamento = insps.filter((i) => !i.concluida).length
  const semInspecao = total - new Set(insps.map((i) => i.equipamentoId)).size
  const pct = total > 0 ? Math.round((comLaudo / total) * 100) : 0
  return { total, comLaudo, emAndamento, semInspecao, pct }
}

export default function Dashboard() {
  const { user } = useAuth()
  const meusClientes = clientes.filter(c => c.userId === user?.id)
  const meusEquipamentos = equipamentos.filter(e => e.userId === user?.id)
  const minhasInspecoes = inspecoes.filter(i => i.userId === user?.id)
  const meusLaudos = laudos.filter(l => l.userId === user?.id)

  const [filtro, setFiltro] = useState<FiltroCliente>("todas")

  const totalEquipamentos = meusEquipamentos.length
  const totalClientes = meusClientes.length
  const inspecoesConcluidas = minhasInspecoes.filter((i) => i.concluida).length
  const laudosEmitidos = meusLaudos.length
  const inspecoesPendentes = minhasInspecoes.filter((i) => !i.concluida).length
  const semInspecaoGeral = meusEquipamentos.filter(
    (eq) => !minhasInspecoes.some((i) => i.equipamentoId === eq.id)
  ).length

  const certificadosPendentes = minhasInspecoes.filter(
    (i) => i.concluida && !meusLaudos.some((l) => l.inspecaoId === i.id)
  )

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary tracking-tight">Dashboard</h1>
          <p className="text-text-secondary text-sm mt-1">Gestão das atividades de inspeção NR-13</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <label className="text-xs text-text-secondary">Filtrar por cliente:</label>
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="text-sm border border-border rounded-lg px-3 py-1.5 bg-card text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-auto"
          >
            <option value="todas">Todas as empresas</option>
            {meusClientes.map((c) => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
          </select>
        </div>
      </div>

      {filtro === "todas" ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="card-kpi">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-text-secondary">Clientes Ativos</CardTitle>
                <div className="w-8 h-8 rounded-lg bg-primary-subtle border border-primary/20 flex items-center justify-center">
                  <Building2 className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-text-primary">{totalClientes}</div>
                <p className="text-xs text-text-muted mt-1">indústrias contratantes</p>
              </CardContent>
            </Card>

            <Card className="card-kpi">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-text-secondary">Equipamentos</CardTitle>
                <div className="w-8 h-8 rounded-lg bg-primary-subtle border border-primary/20 flex items-center justify-center">
                  <FlaskConical className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-text-primary">{totalEquipamentos}</div>
                <p className="text-xs text-text-muted mt-1">sob responsabilidade</p>
              </CardContent>
            </Card>

            <Card className="card-kpi">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-text-secondary">Inspeções Concluídas</CardTitle>
                <div className="w-8 h-8 rounded-lg bg-success-subtle border border-success/30 flex items-center justify-center">
                  <ClipboardCheck className="h-4 w-4 text-success" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-text-primary">{inspecoesConcluidas}</div>
                <p className="text-xs text-text-muted mt-1">{certificadosPendentes.length} aguardando laudo</p>
              </CardContent>
            </Card>

            <Card className="card-kpi">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-text-secondary">Laudos Emitidos</CardTitle>
                <div className="w-8 h-8 rounded-lg bg-primary-subtle border border-primary/20 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-text-primary">{laudosEmitidos}</div>
                <p className="text-xs text-text-muted mt-1">entregues aos clientes</p>
              </CardContent>
            </Card>

            <Card className="card-kpi">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-text-secondary">Pendentes</CardTitle>
                <div className="w-8 h-8 rounded-lg bg-danger-subtle border border-danger/20 flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-danger" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-text-primary">{inspecoesPendentes + semInspecaoGeral}</div>
                <p className="text-xs text-text-muted mt-1">
                  {inspecoesPendentes} em andamento, {semInspecaoGeral} sem inspeção
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-kpi">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-text-primary text-lg">Progresso por Cliente</CardTitle>
                <Link href="/equipamentos" className="text-xs text-primary hover:text-primary flex items-center gap-1">
                  Ver todos <ArrowRight className="h-3 w-3" />
                </Link>
              </CardHeader>
              <CardContent>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {meusClientes.map((cli) => {
                     const p = progressoCliente(cli.id, meusLaudos)
                    return (
                      <button
                        key={cli.id}
                        onClick={() => setFiltro(cli.id)}
                        className="block p-4 rounded-lg border border-border bg-card hover:bg-background transition-colors text-left"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-sm font-semibold text-text-primary">{cli.nome}</p>
                            <p className="text-xs text-text-secondary mt-0.5">{cli.cnpj}</p>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {p.total} equip.
                          </Badge>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-2">
                          <div
                            className="h-full bg-success rounded-full transition-all"
                            style={{ width: `${p.pct}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-success font-medium">{p.pct}% inspecionado</span>
                          <div className="flex gap-3 text-text-secondary">
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

            <Card className="card-kpi">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-text-primary text-lg">Atividade Recente</CardTitle>
                <Link href="/inspecoes" className="text-xs text-primary hover:text-primary flex items-center gap-1">
                  Ver todas <ArrowRight className="h-3 w-3" />
                </Link>
              </CardHeader>
              <CardContent>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {[...minhasInspecoes].reverse().map((ins) => {
                     const eq = meusEquipamentos.find((e) => e.id === ins.equipamentoId)
                     const cliNome = eq ? meusClientes.find((c) => c.id === eq.clienteId)?.nome ?? "" : ""
                    return (
                      <Link
                        key={ins.id}
                        href={`/inspecoes/${ins.id}`}
                        className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-background transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Calendar className="h-4 w-4 text-primary shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-text-primary truncate">
                              {eq?.tag} — {eq?.descricao}
                            </p>
                            <p className="text-xs text-text-muted truncate">{cliNome}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <Badge variant={ins.concluida ? "default" : "secondary"} className="text-xs">
                            {ins.concluida ? "Concluída" : "Em andamento"}
                          </Badge>
                          <p className="text-xs text-text-muted mt-1">
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
            <Card className="card-kpi">
              <CardHeader>
                <CardTitle className="text-text-primary flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Certificados Disponíveis para Emissão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {certificadosPendentes.map((ins) => {
                    const eq = meusEquipamentos.find((e) => e.id === ins.equipamentoId)
                    const cli = eq ? meusClientes.find((c) => c.id === eq.clienteId) : null
                    return (
                      <Link
                        key={ins.id}
                        href={`/laudos/novo?inspecao=${ins.id}`}
                        className="flex items-center justify-between p-3 rounded-lg border border-primary/20 bg-primary-subtle hover:bg-primary-subtle transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-primary" />
                          <div>
                            <p className="text-sm font-medium text-text-primary">{eq?.tag} — {eq?.descricao}</p>
                            <p className="text-xs text-text-secondary">{cli?.nome} • Inspeção concluída em {ins.dataTermino}</p>
                          </div>
                        </div>
                        <Badge variant="default" className="bg-primary text-xs">Emitir laudo</Badge>
                      </Link>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <DetalheCliente clienteId={filtro} onVoltar={() => setFiltro("todas")} meusClientes={meusClientes} meusLaudos={meusLaudos} minhasInspecoes={minhasInspecoes} meusEquipamentos={meusEquipamentos} />
      )}
    </div>
  )
}

function DetalheCliente({ clienteId, onVoltar, meusClientes, meusLaudos, minhasInspecoes, meusEquipamentos }: {
  clienteId: string; onVoltar: () => void; meusClientes: typeof clientes; meusLaudos: typeof laudos; minhasInspecoes: typeof inspecoes; meusEquipamentos: typeof equipamentos
}) {
  const cli = meusClientes.find((c) => c.id === clienteId)
  if (!cli) return null

  const eqs = getEquipamentosDoCliente(clienteId)
  const insps = getInspecoesDoCliente(clienteId)
  const p = progressoCliente(clienteId, meusLaudos)

  const certificadosDisponiveis = insps.filter(
    (i) => i.concluida && !meusLaudos.some((l) => l.inspecaoId === i.id)
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onVoltar}
            className="text-sm text-primary hover:text-primary font-medium shrink-0"
          >
            &larr; Voltar
          </button>
          <div className="h-5 w-px bg-border" />
          <div className="min-w-0">
            <h2 className="text-xl font-semibold text-text-primary truncate">{cli.nome}</h2>
            <p className="text-xs text-text-secondary truncate">{cli.cnpj} • {cli.contato}</p>
          </div>
        </div>
        <Link href={`/inspecoes/nova?cliente=${clienteId}`} className="shrink-0">
          <button className="text-sm bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg shadow-sm font-medium w-full sm:w-auto">
            Nova Inspeção
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="card-kpi">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-text-primary">{p.total}</p>
            <p className="text-xs text-text-secondary">Total Equip.</p>
          </CardContent>
        </Card>
        <Card className="card-kpi">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-success">{p.comLaudo}</p>
            <p className="text-xs text-text-secondary">Inspecionados</p>
          </CardContent>
        </Card>
        <Card className="card-kpi">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-amber-600">{p.emAndamento}</p>
            <p className="text-xs text-text-secondary">Em Andamento</p>
          </CardContent>
        </Card>
        <Card className="card-kpi">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-text-muted">{p.semInspecao}</p>
            <p className="text-xs text-text-secondary">Pendentes</p>
          </CardContent>
        </Card>
      </div>

      <Card className="card-kpi">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-text-secondary">Progresso de Inspeções</p>
            <span className="text-sm font-bold text-success">{p.pct}%</span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-success rounded-full transition-all" style={{ width: `${p.pct}%` }} />
          </div>
          <p className="text-xs text-text-muted mt-2">
            {p.comLaudo} de {p.total} equipamentos inspecionados e com laudo emitido
          </p>
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-text-primary text-base">Equipamentos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-background">
                  <th className="text-left py-3 px-4 text-text-secondary font-medium text-xs uppercase tracking-wider">Tag</th>
                  <th className="text-left py-3 px-4 text-text-secondary font-medium text-xs uppercase tracking-wider">Descrição</th>
                  <th className="text-left py-3 px-4 text-text-secondary font-medium text-xs uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 text-text-secondary font-medium text-xs uppercase tracking-wider">Laudo</th>
                  <th className="text-left py-3 px-4 text-text-secondary font-medium text-xs uppercase tracking-wider">Próx. Inspeção</th>
                </tr>
              </thead>
              <tbody>
                {eqs.map((eq) => {
                  const ins = minhasInspecoes
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
                      className="border-b border-border hover:bg-background cursor-pointer transition-colors"
                      onClick={() => window.location.href = `/equipamentos/${eq.id}`}
                    >
                      <td className="py-3 px-4 font-medium text-text-primary">{eq.tag}</td>
                      <td className="py-3 px-4 text-text-secondary">{eq.descricao}</td>
                      <td className="py-3 px-4">
                        <Badge variant={statusColor} className="text-xs">{statusLabel}</Badge>
                      </td>
                      <td className="py-3 px-4 text-xs">
                        {laudo ? (
                          <Link href={`/laudos/${laudo.id}`} className="text-primary hover:underline">
                            {laudo.numeroLaudo}
                          </Link>
                        ) : ultima?.concluida ? (
                          <Link
                            href={`/laudos/novo?inspecao=${ultima.id}`}
                            className="text-primary hover:underline font-medium"
                          >
                            Emitir
                          </Link>
                        ) : (
                          <span className="text-text-muted">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-xs text-text-secondary">
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
        <Card className="border-border shadow-sm border-primary/20">
          <CardHeader>
            <CardTitle className="text-text-primary flex items-center gap-2 text-base">
              <FileText className="h-4 w-4 text-primary" />
              Certificados Disponíveis para Emissão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {certificadosDisponiveis.map((ins) => {
                const eq = meusEquipamentos.find((e) => e.id === ins.equipamentoId)
                return (
                  <Link
                    key={ins.id}
                    href={`/laudos/novo?inspecao=${ins.id}`}
                    className="flex items-center justify-between p-3 rounded-lg border border-primary/20 bg-primary-subtle hover:bg-primary-subtle transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <div>
                        <p className="text-sm font-medium text-text-primary">{eq?.tag} — {eq?.descricao}</p>
                        <p className="text-xs text-text-secondary">Inspeção concluída em {ins.dataTermino}</p>
                      </div>
                    </div>
                    <Badge variant="default" className="bg-primary text-xs">Emitir laudo</Badge>
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
