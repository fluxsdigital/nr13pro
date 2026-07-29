"use client"

import { motion } from "framer-motion"
import { Section } from "./section"
import { useReducedMotion } from "./motion-provider"

const steps = [
  {
    number: "01",
    title: "Cadastre suas válvulas",
    description: "Importe ou cadastre manualmente. Adicione tags, fotos, documentos e dados técnicos de cada equipamento.",
    color: "#C56A2D",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="8.5" cy="7" r="4"/>
        <polyline points="17 11 19 13 23 9"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Gere QR Codes",
    description: "Imprima etiquetas com QR Code. Cada válvula tem um identificador único para acesso rápido em campo.",
    color: "#2E7D32",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <rect x="7" y="7" width="3" height="3"/>
        <rect x="14" y="7" width="3" height="3"/>
        <rect x="7" y="14" width="3" height="3"/>
        <rect x="14" y="14" width="3" height="3"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Realize inspeções",
    description: "Use o checklist digital no celular. Adicione fotos, anotações e assine eletronicamente em campo.",
    color: "#D18A00",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4"/>
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
  },
  {
    number: "04",
    title: "Emita laudos em PDF",
    description: "Laudos técnicos automáticos com assinatura digital. Prontos para download, impressão e envio ao cliente.",
    color: "#C56A2D",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
    ),
  },
  {
    number: "05",
    title: "Acompanhe o histórico",
    description: "Dashboard com KPIs, gráficos e alertas. Saiba exatamente quais válvulas precisam de atenção.",
    color: "#2E7D32",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
  },
]

export function Timeline() {
  const { prefersReducedMotion } = useReducedMotion()

  return (
    <Section
      id="como-funciona"
      title="Como funciona"
      subtitle="Cinco passos para transformar a gestão de inspeção da sua empresa."
    >
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-[#EDE9E3] hidden sm:block" />

        <div className="space-y-8 sm:space-y-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative flex items-start gap-4 sm:gap-6"
            >
              <div
                className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-sm"
                style={{ backgroundColor: step.color }}
              >
                {step.icon}
              </div>
              <div className="pt-2">
                <div className="text-xs font-medium mb-1" style={{ color: step.color }}>{step.number}</div>
                <h3 className="text-base sm:text-lg font-medium text-[#171717] mb-1">{step.title}</h3>
                <p className="text-sm text-[#676767] leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
