"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, AlertTriangle, ShieldCheck, Building2, Percent, FileText } from "lucide-react"

export default function Economia() {
  const [nomeCliente, setNomeCliente] = useState("")
  const [equipamentos, setEquipamentos] = useState(12)
  const [inspecoesVencidas, setInspecoesVencidas] = useState(4)
  const [porte, setPorte] = useState<"pequeno" | "medio" | "grande">("medio")
  const [diariaOperacional, setDiariaOperacional] = useState(80000)
  const [custoInspecao, setCustoInspecao] = useState(8500)
  const [qtdInspecoesAno, setQtdInspecoesAno] = useState(12)

  const fatorPorte = { pequeno: 1, medio: 2, grande: 4 }
  const multaBase = 25000 * fatorPorte[porte]
  const multasEvitadas = inspecoesVencidas * multaBase * 0.7
  const diasParadaEstimados = inspecoesVencidas * 1.5
  const paradasEvitadas = diasParadaEstimados * diariaOperacional
  const custoAtualInspecao = qtdInspecoesAno * custoInspecao
  const economiaSPIE = custoAtualInspecao * 0.55
  const descontoSeguro = custoAtualInspecao * 0.15
  const totalEconomia = multasEvitadas + paradasEvitadas + economiaSPIE + descontoSeguro
  const investimentoAnual = equipamentos * 400
  const roi = totalEconomia > 0 ? ((totalEconomia - investimentoAnual) / investimentoAnual) * 100 : 0
  const paybackDias = totalEconomia > 0 ? Math.round((investimentoAnual / totalEconomia) * 365) : 0

  const formatarMoeda = (valor: number) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

  return (
    <div className="p-4 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Calculadora de Economia</h1>
          <p className="text-slate-500 text-sm mt-1">
            Ferramenta comercial para apresentar a indústrias o ROI da conformidade NR-13
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-xs text-blue-700 shrink-0 self-start">
          <FileText className="h-3.5 w-3.5" />
          Use com seus clientes
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-blue-600" />
              Dados da Indústria Cliente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-600 text-xs">Nome da Indústria</Label>
              <Input
                type="text"
                value={nomeCliente}
                onChange={(e) => setNomeCliente(e.target.value)}
                placeholder="Ex: Indústria ABC Ltda."
                className="border-slate-200 bg-white"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-600 text-xs">Total de Equipamentos</Label>
                <Input type="number" value={equipamentos} onChange={(e) => setEquipamentos(Number(e.target.value))} className="border-slate-200 bg-white" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-600 text-xs">Inspeções Vencidas</Label>
                <Input type="number" value={inspecoesVencidas} onChange={(e) => setInspecoesVencidas(Number(e.target.value))} className="border-slate-200 bg-white" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-600 text-xs">Porte da Empresa</Label>
              <div className="grid grid-cols-3 gap-2">
                {(["pequeno", "medio", "grande"] as const).map((key) => (
                  <div key={key} className={`p-2 rounded-lg text-center text-xs cursor-pointer border transition-colors ${
                    porte === key ? "border-blue-600 bg-blue-50 text-blue-700 font-medium" : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                  }`} onClick={() => setPorte(key)}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </div>
                ))}
              </div>
            </div>
            <Separator className="bg-slate-200" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-600 text-xs">Custo Diário Operacional (R$)</Label>
                <Input type="number" value={diariaOperacional} onChange={(e) => setDiariaOperacional(Number(e.target.value))} className="border-slate-200 bg-white" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-600 text-xs">Custo Médio/Inspeção (R$)</Label>
                <Input type="number" value={custoInspecao} onChange={(e) => setCustoInspecao(Number(e.target.value))} className="border-slate-200 bg-white" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-600 text-xs">Inspeções por Ano</Label>
              <Input type="number" value={qtdInspecoesAno} onChange={(e) => setQtdInspecoesAno(Number(e.target.value))} className="border-slate-200 bg-white" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              Economia para a Indústria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-center">
              <p className="text-sm text-emerald-700 font-medium">ECONOMIA TOTAL ESTIMADA</p>
              <p className="text-3xl font-bold text-emerald-700 mt-1">{formatarMoeda(totalEconomia)}</p>
              <p className="text-xs text-slate-500 mt-1">por ano</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: AlertTriangle, label: "Multas Evitadas (NR-28)", value: multasEvitadas, color: "text-red-600" },
                { icon: TrendingUp, label: "Paradas Evitadas", value: paradasEvitadas, color: "text-orange-600" },
                { icon: ShieldCheck, label: "Otimização c/ SPIE", value: economiaSPIE, color: "text-blue-600" },
                { icon: Percent, label: "Desconto em Seguro", value: descontoSeguro, color: "text-purple-600" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="p-3 rounded-lg border border-slate-100 bg-slate-50">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`h-3 w-3 ${color}`} />
                    <p className="text-xs text-slate-500">{label}</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{formatarMoeda(value)}</p>
                </div>
              ))}
            </div>

            <Separator className="bg-slate-200" />
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Seu Retorno como Engenheiro</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg border border-slate-100 bg-slate-50 text-center">
                <p className="text-xs text-slate-500">Custo do SaaS / ano</p>
                <p className="text-lg font-bold text-slate-900">{formatarMoeda(investimentoAnual)}</p>
              </div>
              <div className="p-3 rounded-lg border border-slate-100 bg-slate-50 text-center">
                <p className="text-xs text-slate-500">ROI</p>
                <p className="text-lg font-bold text-emerald-600">{roi.toFixed(0)}%</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 text-center">
              <p className="text-xs text-slate-500">Payback</p>
              <p className="text-xl font-bold text-blue-700">{paybackDias} dias</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="text-slate-900 flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Proposta de Valor - Conformidade NR-13
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-slate-900">PROPOSTA DE VALOR</h3>
            <p className="text-sm text-slate-500">Economia estimada com a conformidade NR-13</p>
            {nomeCliente && <p className="text-sm font-medium text-blue-700 mt-1">Cliente: {nomeCliente}</p>}
          </div>

          <table className="w-full text-sm mb-6">
            <tbody>
              <tr className="border-b border-slate-200">
                <td className="py-2 font-semibold text-slate-700">Empresa</td>
                <td className="py-2 text-right">{nomeCliente || "—"}</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-2 font-semibold text-slate-700">Total de Equipamentos</td>
                <td className="py-2 text-right">{equipamentos}</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-2 font-semibold text-slate-700">Inspeções Vencidas</td>
                <td className="py-2 text-right text-red-600">{inspecoesVencidas}</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-2 font-semibold text-slate-700">Porte</td>
                <td className="py-2 text-right capitalize">{porte}</td>
              </tr>
            </tbody>
          </table>
          <Separator className="bg-slate-200 my-4" />
          <table className="w-full text-sm mb-6">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left py-2 px-3 font-semibold text-slate-700">Item</th>
                <th className="text-right py-2 px-3 font-semibold text-slate-700">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2 px-3">Multas Evitadas (NR-28)</td>
                <td className="py-2 px-3 text-right text-red-600">{formatarMoeda(multasEvitadas)}</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 px-3">Paradas de Produção Evitadas</td>
                <td className="py-2 px-3 text-right text-orange-600">{formatarMoeda(paradasEvitadas)}</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 px-3">Otimização com SPIE (55%)</td>
                <td className="py-2 px-3 text-right text-blue-600">{formatarMoeda(economiaSPIE)}</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 px-3">Desconto em Seguro</td>
                <td className="py-2 px-3 text-right text-purple-600">{formatarMoeda(descontoSeguro)}</td>
              </tr>
              <tr className="bg-emerald-50 font-bold">
                <td className="py-3 px-3 text-emerald-800">TOTAL ANUAL ESTIMADO</td>
                <td className="py-3 px-3 text-right text-emerald-800">{formatarMoeda(totalEconomia)}</td>
              </tr>
            </tbody>
          </table>
          <Separator className="bg-slate-200 my-6" />

          <div className="rounded-lg bg-blue-50 border border-blue-100 p-4 text-sm text-slate-700 space-y-2">
            <p className="font-medium text-blue-700">Como usar esta ferramenta:</p>
            <ol className="list-decimal list-inside space-y-1 text-xs text-slate-600">
              <li>Preencha os dados da indústria nos campos ao lado</li>
              <li>A economia é calculada automaticamente</li>
              <li>Apresente este relatório ao cliente como argumento comercial</li>
              <li>Mostre o quanto a indústria economiza com as inspeções em dia</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
