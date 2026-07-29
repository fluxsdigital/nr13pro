"use client"

import { motion } from "framer-motion"
import { Section } from "./section"
import { useReducedMotion } from "./motion-provider"

const benefits = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <rect x="7" y="7" width="3" height="3"/>
        <rect x="14" y="7" width="3" height="3"/>
        <rect x="7" y="14" width="3" height="3"/>
        <rect x="14" y="14" width="3" height="3"/>
      </svg>
    ),
    title: "QR Code",
    description: "Cada válvula recebe um QR Code único. Escaneie com o celular e acesse todo o histórico de inspeções, laudos e documentos em segundos.",
    url: "app.nr13pro.com.br/equipamentos/V-101/qrcode",
    screen: (
      <div className="flex flex-col items-center gap-2 py-1">
        <div className="w-12 h-12 bg-white border-2 border-[#171717] rounded flex items-center justify-center">
          <div className="grid grid-cols-5 gap-[1px]">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 ${Math.random() > 0.5 ? "bg-[#171717]" : "bg-white"}`} />
            ))}
          </div>
        </div>
        <div className="text-center">
          <div className="text-[9px] font-medium text-[#171717]">V-101</div>
          <div className="text-[8px] text-[#676767]">Vaso de Pressão</div>
        </div>
        <div className="flex gap-1.5">
          {["Baixar PDF", "Imprimir", "Compartilhar"].map((b) => (
            <div key={b} className="h-5 px-2.5 rounded bg-[#F7F5F2] border border-[#EDE9E3] flex items-center">
              <span className="text-[7px] text-[#676767]">{b}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    title: "Laudos Técnicos Automáticos",
    description: "Gere laudos técnicos completos em PDF com assinatura digital. Prontos para apresentar à fiscalização e manter o compliance NR-13.",
    url: "app.nr13pro.com.br/laudos/LAU-2026-001",
    screen: (
      <div className="space-y-1.5 py-1">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[9px] font-bold text-[#171717]">LAUDO NR-13</div>
            <div className="text-[7px] text-[#9E9E9E]">LAU-2026-001</div>
          </div>
          <div className="flex gap-1">
            <div className="h-5 px-2 rounded bg-[#C56A2D] flex items-center">
              <span className="text-[6px] text-white font-medium">PDF</span>
            </div>
            <div className="h-5 px-2 rounded bg-[#C56A2D] flex items-center">
              <span className="text-[6px] text-white font-medium">✉</span>
            </div>
          </div>
        </div>
        <div className="bg-white border border-[#EDE9E3] rounded p-2 space-y-1">
          {[
            { l: "Cliente", v: "Empresa ABC Ltda" },
            { l: "Equipamento", v: "V-101 — Vaso de Pressão" },
            { l: "Data", v: "15/06/2026" },
            { l: "Parecer Técnico", v: "Aprovado" },
          ].map((r) => (
            <div key={r.l} className="flex justify-between text-[7px]">
              <span className="text-[#9E9E9E]">{r.l}</span>
              <span className="font-medium text-[#171717]">{r.v}</span>
            </div>
          ))}
          <div className="h-4 bg-[#2E7D32]/10 rounded flex items-center justify-center mt-1">
            <span className="text-[6px] text-[#2E7D32] font-bold">✓ Conforme NR-13</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>
      </svg>
    ),
    title: "Histórico na Nuvem",
    description: "Todo o histórico das válvulas armazenado na nuvem. Acesse de qualquer lugar, compartilhe com a equipe e nunca mais perca dados.",
    url: "app.nr13pro.com.br/historico/V-101",
    screen: (
      <div className="space-y-1.5 py-1">
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-4 h-4 rounded-full bg-[#F7F5F2] flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#C56A2D" strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg>
          </div>
          <span className="text-[8px] font-medium text-[#171717]">V-101</span>
          <span className="text-[6px] text-[#676767] ml-auto">Vaso de Pressão</span>
        </div>
        <div className="space-y-1">
          {[
            { d: "15/09/2026", s: "Aprovado", c: "#2E7D32", t: "Periódica" },
            { d: "10/06/2026", s: "Pendente", c: "#D18A00", t: "Extraordinária" },
            { d: "12/03/2026", s: "Aprovado", c: "#2E7D32", t: "Inicial" },
            { d: "08/12/2025", s: "Aprovado", c: "#2E7D32", t: "Periódica" },
          ].map((i) => (
            <div key={i.d} className="flex items-center justify-between border-b border-[#EDE9E3] pb-0.5 last:border-0">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: i.c }} />
                <span className="text-[7px] text-[#171717] font-medium">{i.d}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[6px] text-[#9E9E9E]">{i.t}</span>
                <span className="text-[6px] font-medium" style={{ color: i.c }}>{i.s}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
]

function SafariCard({
  benefit,
  index,
  prefersReducedMotion,
}: {
  benefit: (typeof benefits)[0]
  index: number
  prefersReducedMotion: boolean
}) {
  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-white border border-[#EDE9E3] rounded-xl overflow-hidden cursor-default"
    >
      <div className="flex items-center gap-1 px-3 pt-2 pb-1.5 bg-[#F7F5F2] border-b border-[#EDE9E3]">
        <div className="flex gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 flex justify-center mx-2">
          <div className="bg-white border border-[#EDE9E3] rounded px-2 py-0.5 text-[7px] text-[#676767] flex items-center gap-1 max-w-[160px] w-full truncate">
            <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
            <span className="truncate">{benefit.url}</span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-[#F8F0E8] flex items-center justify-center text-[#C56A2D] flex-shrink-0">
            {benefit.icon}
          </div>
          <h3 className="text-sm sm:text-base font-medium text-[#171717]">{benefit.title}</h3>
        </div>

        <div className="mb-3 p-2.5 bg-[#FAFAF8] border border-[#EDE9E3] rounded min-h-[80px]">
          {benefit.screen}
        </div>

        <p className="text-xs sm:text-sm text-[#676767] leading-relaxed">
          {benefit.description}
        </p>
      </div>
    </motion.div>
  )
}

export function Benefits() {
  const { prefersReducedMotion } = useReducedMotion()

  return (
    <Section
      id="beneficios"
      title="Por que escolher o NR-13 Pro?"
      subtitle="Três razões para simplificar sua gestão de inspeção de válvulas."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {benefits.map((benefit, i) => (
          <SafariCard key={benefit.title} benefit={benefit} index={i} prefersReducedMotion={prefersReducedMotion} />
        ))}
      </div>
    </Section>
  )
}
