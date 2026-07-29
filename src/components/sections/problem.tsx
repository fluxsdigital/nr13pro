"use client"

import { motion } from "framer-motion"
import { Section } from "./section"
import { useReducedMotion } from "./motion-provider"

function SafariExcel() {
  return (
    <div className="bg-white rounded-lg shadow-[0_4px_20px_rgba(23,23,23,0.08)] overflow-hidden">
      <div className="flex items-center gap-1 px-3 pt-2 pb-1.5 bg-[#F7F5F2] border-b border-[#EDE9E3]">
        <div className="flex gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 flex justify-center mx-2">
          <div className="bg-white border border-[#EDE9E3] rounded px-2 py-0.5 text-[8px] text-[#676767] flex items-center gap-1 max-w-[200px] w-full">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
            <span className="truncate">planilha_inspecoes_v3.xlsx</span>
          </div>
        </div>
        <div className="flex gap-1">
          <div className="w-5 h-4 rounded bg-white border border-[#EDE9E3] flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#676767" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
          </div>
          <div className="w-5 h-4 rounded bg-white border border-[#EDE9E3] flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#676767" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[8px] border-collapse">
          <thead>
            <tr className="bg-[#F7F5F2]">
              {["Tag", "Tipo", "Fluido", "Data", "Status", "Obs"].map((h) => (
                <th key={h} className="border border-[#EDE9E3] px-1.5 py-1 text-left font-medium text-[#676767] uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["V-001", "Vaso", "Água", "10/01/24", "OK", ""],
              ["V-002", "Vaso", "Vapor", "22/03/24", "OK", ""],
              ["V-003", "Vaso", "Gás", "15/08/23", "Vencido", "REFAZER"],
              ["CAL-01", "Caldeira", "Vapor", "05/12/23", "Vencido", ""],
              ["TQ-01", "Tanque", "Água", "30/06/24", "OK", ""],
              ["V-004", "Vaso", "Ar", "18/02/23", "Vencido", "URGENTE"],
              ["V-005", "Vaso", "Gás", "---", "Sem dado", ""],
            ].map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#F7F5F2]/50"}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`border border-[#EDE9E3] px-1.5 py-1 text-[#171717] ${cell === "Vencido" || cell === "URGENTE" ? "text-[#C0392B] font-bold" : ""} ${cell === "REFAZER" ? "text-[#D18A00] font-bold" : ""} ${cell === "Sem dado" ? "text-[#9E9E9E]" : ""}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-3 py-1.5 bg-[#F7F5F2] border-t border-[#EDE9E3] text-[7px] text-[#9E9E9E]">
        <span>Planilha1</span>
        <span>7 registros</span>
      </div>
    </div>
  )
}

function PhoneApp() {
  return (
    <div className="relative mx-auto w-fit">
      <div className="w-[180px] sm:w-[200px] h-[360px] sm:h-[400px] bg-[#171717] rounded-[24px] p-2 shadow-[0_8px_40px_rgba(23,23,23,0.2)]">
        <div className="w-full h-full bg-[#F7F5F2] rounded-[20px] overflow-hidden flex flex-col">
          <div className="bg-[#171717] px-4 pt-4 pb-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-[6px] text-white font-medium">NR-13 Pro</span>
            </div>
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-[#28C840]" />
              <div className="w-3 h-1.5 rounded border border-white relative">
                <div className="absolute inset-0.5 right-1 rounded bg-[#28C840]" />
              </div>
            </div>
          </div>

          <div className="flex-1 p-2 space-y-1.5 overflow-hidden">
            <div className="bg-[#C56A2D] rounded-lg p-2 text-white">
              <div className="text-[8px] opacity-80">Próxima inspeção</div>
              <div className="text-[11px] font-bold">V-101</div>
              <div className="text-[7px] opacity-80">15/09/2026</div>
            </div>

            <div className="grid grid-cols-2 gap-1">
              {[
                { label: "Ativos", value: "156", color: "#C56A2D" },
                { label: "OK", value: "142", color: "#2E7D32" },
                { label: "Alertas", value: "14", color: "#D18A00" },
                { label: "Laudos", value: "89", color: "#C56A2D" },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-white rounded-lg p-1.5 text-center shadow-sm">
                  <div className="text-[10px] font-bold" style={{ color: kpi.color }}>{kpi.value}</div>
                  <div className="text-[6px] text-[#676767]">{kpi.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg p-1.5 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[7px] font-medium text-[#171717]">Últimas inspeções</span>
                <span className="text-[6px] text-[#C56A2D]">Ver tudo</span>
              </div>
              <div className="space-y-1">
                {[
                  { tag: "V-101", status: "Aprovado", color: "#2E7D32" },
                  { tag: "CAL-01", status: "Pendente", color: "#D18A00" },
                  { tag: "TQ-05", status: "Aprovado", color: "#2E7D32" },
                ].map((item) => (
                  <div key={item.tag} className="flex items-center justify-between">
                    <span className="text-[7px] font-medium text-[#171717]">{item.tag}</span>
                    <span className="text-[6px] font-medium" style={{ color: item.color }}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white border-t border-[#EDE9E3] px-4 py-1.5 flex justify-around">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-3 h-3 rounded bg-[#EDE9E3]" />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-[#171717] rounded-full opacity-80" />
    </div>
  )
}

export function Problem() {
  const { prefersReducedMotion } = useReducedMotion()

  const cardVariants = (direction: "left" | "right") => ({
    hidden: prefersReducedMotion ? {} : { opacity: 0, x: direction === "left" ? -30 : 30 },
    visible: prefersReducedMotion ? {} : { opacity: 1, x: 0 },
  })

  return (
    <Section
      id="problema"
      title="Antes e depois da gestão digital"
      subtitle="Compare como sua rotina muda quando você adota o NR-13 Pro."
      className="bg-white"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
        <motion.div
          variants={cardVariants("left")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center"
        >
          <div className="w-full max-w-[400px]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-[#C0392B]/10 flex items-center justify-center text-[#C0392B]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
              </div>
              <h3 className="text-sm font-medium text-[#C0392B]">Antes — O caos das planilhas</h3>
            </div>
            <SafariExcel />
            <ul className="mt-3 space-y-1.5">
              {[
                "Dados espalhados, ninguém confia",
                "Laudos manuais no Word",
                "Fotos perdidas no WhatsApp",
                "Prazos vencendo sem aviso",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-[#676767]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants("right")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
          className="flex flex-col items-center"
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-3 self-start">
              <div className="w-6 h-6 rounded-lg bg-[#2E7D32]/10 flex items-center justify-center text-[#2E7D32]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 className="text-sm font-medium text-[#2E7D32]">Depois — Tudo na palma da mão</h3>
            </div>
            <PhoneApp />
            <ul className="mt-3 space-y-1.5 self-start w-full max-w-[280px] mx-auto">
              {[
                "Dados na nuvem, em tempo real",
                "Laudos PDF automáticos",
                "Fotos anexadas na inspeção",
                "Notificações de vencimento",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-[#676767]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
