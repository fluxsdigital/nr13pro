"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { inspecaoService, equipamentoService, clienteService } from "@/lib/services"
import type { Inspecao, Equipamento, Cliente } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Printer, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CertificadoPSVPage() {
  return <Suspense><CertificadoPSV /></Suspense>
}

function CertificadoPSV() {
  const searchParams = useSearchParams()
  const router = useRouter()
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

  const valvulas = inspecao.dispositivosSeguranca.filter((d) => d.tipo === "valvula_seguranca")

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

      {valvulas.length === 0 ? (
        <p className="text-text-secondary">Nenhuma válvula de segurança registrada nesta inspeção</p>
      ) : (
        valvulas.map((v, idx) => (
          <div key={v.id} className="border border-border rounded-lg p-8 bg-white print:border-black">
            <div className="text-center mb-8">
              <h1 className="text-lg font-bold uppercase">Certificado de Inspeção e Teste</h1>
              <h2 className="text-base font-bold uppercase text-primary">Válvula de Segurança (PSV)</h2>
              <p className="text-xs text-text-secondary mt-1">NR-13 — Item 13.5.4.9</p>
              <Separator className="my-3" />
            </div>

            <table className="w-full text-xs border-collapse mb-6">
              <tbody>
                <tr><td className="font-semibold py-1 pr-4 w-1/3 text-text-secondary">Cliente:</td><td className="py-1 text-text-primary">{cliente?.nome ?? ""}</td></tr>
                <tr><td className="font-semibold py-1 pr-4 text-text-secondary">CNPJ:</td><td className="py-1 text-text-primary">{cliente?.cnpj ?? ""}</td></tr>
                <tr><td className="font-semibold py-1 pr-4 text-text-secondary">Endereço:</td><td className="py-1 text-text-primary">{cliente?.endereco ?? ""}</td></tr>
                <tr><td className="font-semibold py-1 pr-4 text-text-secondary">Equipamento:</td><td className="py-1 text-text-primary">{eq?.tag} — {eq?.descricao}</td></tr>
                <tr><td className="font-semibold py-1 pr-4 text-text-secondary">Data do Teste:</td><td className="py-1 text-text-primary">{inspecao.dataTermino || inspecao.dataInicio}</td></tr>
              </tbody>
            </table>

            <h3 className="text-sm font-bold uppercase bg-card-hover px-2 py-1 rounded mb-3">Identificação da Válvula</h3>
            <table className="w-full text-xs border-collapse mb-6">
              <tbody>
                <tr><td className="font-semibold py-1 pr-4 w-1/3 text-text-secondary">Tag:</td><td className="py-1 text-text-primary">{v.tag}</td></tr>
                <tr><td className="font-semibold py-1 pr-4 text-text-secondary">Fabricante:</td><td className="py-1 text-text-primary">{v.fabricante ?? "—"}</td></tr>
                <tr><td className="font-semibold py-1 pr-4 text-text-secondary">Modelo:</td><td className="py-1 text-text-primary">{v.modelo ?? "—"}</td></tr>
                <tr><td className="font-semibold py-1 pr-4 text-text-secondary">Nº de Série:</td><td className="py-1 text-text-primary">{v.numeroSerie ?? "—"}</td></tr>
                <tr><td className="font-semibold py-1 pr-4 text-text-secondary">Pressão de Abertura (PS):</td><td className="py-1 text-text-primary">{v.pressaoAbertura ? `${v.pressaoAbertura} kPa` : "—"}</td></tr>
                <tr><td className="font-semibold py-1 pr-4 text-text-secondary">Pressão de Vedação:</td><td className="py-1 text-text-primary">{v.pressaoVedacao ? `${v.pressaoVedacao} kPa` : "—"}</td></tr>
                <tr><td className="font-semibold py-1 pr-4 text-text-secondary">Última Calibração:</td><td className="py-1 text-text-primary">{v.ultimaCalibracao ?? "—"}</td></tr>
                <tr><td className="font-semibold py-1 pr-4 text-text-secondary">Próxima Calibração:</td><td className="py-1 text-text-primary">{v.proximaCalibracao ?? "—"}</td></tr>
                <tr><td className="font-semibold py-1 pr-4 text-text-secondary">Situação:</td><td className="py-1"><span className={v.inspecaoOk ? "text-success font-bold" : "text-red-600 font-bold"}>{v.inspecaoOk ? "Aprovada" : "Reprovada"}</span></td></tr>
                {v.observacao && <tr><td className="font-semibold py-1 pr-4 text-text-secondary">Observação:</td><td className="py-1 text-text-primary">{v.observacao}</td></tr>}
              </tbody>
            </table>

            <h3 className="text-sm font-bold uppercase bg-card-hover px-2 py-1 rounded mb-3">Resultados dos Testes (3 Ciclos)</h3>
            <table className="w-full text-xs border-collapse mb-6">
              <thead>
                <tr className="bg-card-hover">
                  <th className="border border-border px-2 py-1 text-left">Ciclo</th>
                  <th className="border border-border px-2 py-1 text-right">Pressão Abertura (kPa)</th>
                  <th className="border border-border px-2 py-1 text-right">Pressão Vedação (kPa)</th>
                  <th className="border border-border px-2 py-1 text-right">Altura do Regulador (mm)</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((ciclo) => (
                  <tr key={ciclo}>
                    <td className="border border-border px-2 py-1 font-medium">{ciclo}º</td>
                    <td className="border border-border px-2 py-1 text-right">{"—"}</td>
                    <td className="border border-border px-2 py-1 text-right">{"—"}</td>
                    <td className="border border-border px-2 py-1 text-right">{"—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="grid grid-cols-2 gap-6 text-xs mb-6">
              <div>
                <h4 className="font-semibold text-text-secondary mb-1">Padrões Utilizados</h4>
                <p className="text-text-primary">{"—"}</p>
              </div>
              <div>
                <h4 className="font-semibold text-text-secondary mb-1">Condições Ambientais</h4>
                <p className="text-text-primary">Temperatura: — °C / Umidade: —%</p>
              </div>
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
