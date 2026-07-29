"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { inspecaoService, equipamentoService, clienteService } from "@/lib/services"
import type { Inspecao, Equipamento, Cliente } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Printer, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CertificadoCalibracaoPage() {
  return <Suspense><CertificadoCalibracao /></Suspense>
}

function CertificadoCalibracao() {
  const searchParams = useSearchParams()
  const [inspecao, setInspecao] = useState<Inspecao | null>(null)
  const [eq, setEq] = useState<Equipamento | undefined>(undefined)
  const [cliente, setCliente] = useState<Cliente | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const insId = searchParams.get("inspecao")
    if (!insId) { setLoading(false); return }
    inspecaoService.getById(insId).then(async (ins) => {
      if (!ins) { setLoading(false); return }
      setInspecao(ins)
      const equip = await equipamentoService.getById(ins.equipamentoId)
      setEq(equip)
      if (equip) {
        const cli = await clienteService.getById(equip.clienteId)
        setCliente(cli)
      }
      setLoading(false)
    })
  }, [searchParams])

  if (loading) return <div className="p-4 sm:p-8 text-text-secondary">Carregando...</div>
  if (!inspecao) return <div className="p-4 sm:p-8 text-text-secondary">Inspeção não encontrada</div>

  const manometros = inspecao.dispositivosSeguranca.filter((d) => d.tipo === "manometro")

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between no-print">
        <Link href={`/laudos/${inspecao.laudoId ?? "#"}`} className="text-text-secondary hover:text-text-primary">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <Button variant="outline" onClick={() => window.print()} className="border-border text-text-secondary">
          <Printer className="h-4 w-4 mr-2" /> Imprimir
        </Button>
      </div>

      {manometros.length === 0 ? (
        <p className="text-text-secondary">Nenhum manômetro registrado nesta inspeção</p>
      ) : (
        manometros.map((m, idx) => (
          <div key={m.id} className="border border-border rounded-lg p-8 bg-white print:border-black">
            <div className="text-center mb-8">
              <h1 className="text-lg font-bold uppercase">Certificado de Calibração</h1>
              <h2 className="text-base font-bold uppercase text-primary">Manômetro</h2>
              <p className="text-xs text-text-secondary mt-1">Procedimento conforme DOQ-Cgcre-47</p>
              <Separator className="my-3" />
            </div>

            <table className="w-full text-xs border-collapse mb-6">
              <tbody>
                <tr><td className="font-semibold py-1 pr-4 w-1/3 text-text-secondary">Cliente:</td><td className="py-1 text-text-primary">{cliente?.nome ?? ""}</td></tr>
                <tr><td className="font-semibold py-1 pr-4 text-text-secondary">CNPJ:</td><td className="py-1 text-text-primary">{cliente?.cnpj ?? ""}</td></tr>
                <tr><td className="font-semibold py-1 pr-4 text-text-secondary">Equipamento:</td><td className="py-1 text-text-primary">{eq?.tag} — {eq?.descricao}</td></tr>
                <tr><td className="font-semibold py-1 pr-4 text-text-secondary">Data da Calibração:</td><td className="py-1 text-text-primary">{inspecao.dataTermino || inspecao.dataInicio}</td></tr>
                <tr><td className="font-semibold py-1 pr-4 text-text-secondary">Próxima Calibração:</td><td className="py-1 text-text-primary">{(() => {
                  const d = new Date(inspecao.dataTermino || inspecao.dataInicio)
                  d.setFullYear(d.getFullYear() + 1)
                  return d.toISOString().slice(0, 10)
                })()}</td></tr>
              </tbody>
            </table>

            <h3 className="text-sm font-bold uppercase bg-card-hover px-2 py-1 rounded mb-3">Identificação do Instrumento</h3>
            <table className="w-full text-xs border-collapse mb-6">
              <tbody>
                <tr><td className="font-semibold py-1 pr-4 w-1/3 text-text-secondary">Tag:</td><td className="py-1 text-text-primary">{m.tag}</td></tr>
                <tr><td className="font-semibold py-1 pr-4 text-text-secondary">Fabricante:</td><td className="py-1 text-text-primary">{"—"}</td></tr>
                <tr><td className="font-semibold py-1 pr-4 text-text-secondary">Nº de Série:</td><td className="py-1 text-text-primary">{"—"}</td></tr>
                <tr><td className="font-semibold py-1 pr-4 text-text-secondary">Faixa Nominal:</td><td className="py-1 text-text-primary">{"—"}</td></tr>
                <tr><td className="font-semibold py-1 pr-4 text-text-secondary">Divisão:</td><td className="py-1 text-text-primary">{"—"}</td></tr>
                <tr><td className="font-semibold py-1 pr-4 text-text-secondary">Classe de Exatidão:</td><td className="py-1 text-text-primary">{"—"}</td></tr>
                <tr><td className="font-semibold py-1 pr-4 text-text-secondary">Situação:</td><td className="py-1"><span className={m.inspecaoOk ? "text-success font-bold" : "text-red-600 font-bold"}>{m.inspecaoOk ? "Aprovado" : "Reprovado"}</span></td></tr>
              </tbody>
            </table>

            <h3 className="text-sm font-bold uppercase bg-card-hover px-2 py-1 rounded mb-3">Resultados da Calibração</h3>
            <table className="w-full text-xs border-collapse mb-6">
              <thead>
                <tr className="bg-card-hover">
                  <th className="border border-border px-2 py-1 text-left">Ponto (%)</th>
                  <th className="border border-border px-2 py-1 text-right">Padrão</th>
                  <th className="border border-border px-2 py-1 text-right">Indicação</th>
                  <th className="border border-border px-2 py-1 text-right">Erro (kPa)</th>
                  <th className="border border-border px-2 py-1 text-right">Histerese (kPa)</th>
                </tr>
              </thead>
              <tbody>
                {[0, 25, 50, 75, 100].map((pct) => (
                  <tr key={pct}>
                    <td className="border border-border px-2 py-1 font-medium">{pct}%</td>
                    <td className="border border-border px-2 py-1 text-right">{"—"}</td>
                    <td className="border border-border px-2 py-1 text-right">{"—"}</td>
                    <td className="border border-border px-2 py-1 text-right">{"—"}</td>
                    <td className="border border-border px-2 py-1 text-right">{"—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-xs text-text-secondary mb-6">
              <p>Incerteza expandida (k=2, 95%): —</p>
              <p>Padrão utilizado: — (Nº certificado: — / Validade: —)</p>
            </div>

            <div className="border-t border-border pt-4 mt-6 text-center">
              <p className="text-xs text-text-secondary mb-8">Assinatura do Responsável Técnico</p>
              <div className="border-b border-text-muted max-w-xs mx-auto mb-1" />
            </div>
          </div>
        ))
      )}
    </div>
  )
}
