"use client"

import { motion } from "framer-motion"
import { Section } from "./section"
import { useReducedMotion } from "./motion-provider"

const benefits = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <rect x="7" y="7" width="3" height="3"/>
        <rect x="14" y="7" width="3" height="3"/>
        <rect x="7" y="14" width="3" height="3"/>
        <rect x="14" y="14" width="3" height="3"/>
      </svg>
    ),
    title: "QR Code",
    description: "Cada válvula recebe um QR Code único. Escaneie com o celular e acesse todo o histórico de inspeções, laudos e documentos em segundos.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    title: "Laudos Técnicos Automáticos",
    description: "Gere laudos técnicos completos em PDF com assinatura digital. Prontos para apresentar à fiscalização e manter o compliance NR-13.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>
      </svg>
    ),
    title: "Histórico na Nuvem",
    description: "Todo o histórico das válvulas armazenado na nuvem. Acesse de qualquer lugar, compartilhe com a equipe e nunca mais perda dados.",
  },
]

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
          <motion.div
            key={benefit.title}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-white border border-[#EDE9E3] rounded-xl p-5 sm:p-7 card-hover cursor-default"
          >
            <div className="w-10 h-10 rounded-lg bg-[#F8F0E8] flex items-center justify-center text-[#C56A2D] mb-4">
              {benefit.icon}
            </div>
            <h3 className="text-base sm:text-lg font-medium text-[#171717] mb-2">{benefit.title}</h3>
            <p className="text-sm text-[#676767] leading-relaxed">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
