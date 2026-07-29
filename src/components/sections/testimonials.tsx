"use client"

import { motion } from "framer-motion"
import { Section } from "./section"
import { useReducedMotion } from "./motion-provider"

const testimonials = [
  {
    name: "Carlos Mendes",
    role: "Inspetor NR-13",
    company: "Empresa de Inspeção ABC",
    text: "Reduzimos em 60% o tempo de emissão de laudos. O checklist digital no celular transformou a forma como trabalhamos em campo.",
    result: "60% mais rápido",
    rating: 5,
    avatar: (
      <svg viewBox="0 0 36 36" fill="none" className="w-full h-full">
        <rect width="36" height="36" rx="18" fill="#F8F0E8" />
        <circle cx="18" cy="13" r="5" fill="#DDB895" />
        <ellipse cx="18" cy="28" rx="11" ry="8" fill="#DDB895" />
        <circle cx="15" cy="12" r="1" fill="#8B6914" />
        <circle cx="21" cy="12" r="1" fill="#8B6914" />
        <path d="M15 16c1 .5 3 .5 4 0" stroke="#8B6914" strokeWidth="0.6" fill="none" />
      </svg>
    ),
  },
  {
    name: "Ana Oliveira",
    role: "Supervisora de Manutenção",
    company: "Refinaria Nova Era",
    text: "O QR Code foi um divisor de águas. Agora qualquer técnico escaneia e tem todo o histórico da válvula na mão. Simplesmente essencial.",
    result: "100% digital",
    rating: 5,
    avatar: (
      <svg viewBox="0 0 36 36" fill="none" className="w-full h-full">
        <rect width="36" height="36" rx="18" fill="#F0E8F0" />
        <circle cx="18" cy="13" r="5" fill="#E8C8D0" />
        <ellipse cx="18" cy="28" rx="11" ry="8" fill="#E8C8D0" />
        <circle cx="15" cy="12" r="1" fill="#8B6050" />
        <circle cx="21" cy="12" r="1" fill="#8B6050" />
        <path d="M14 17c1.5 1 4 1 6 0" stroke="#8B6050" strokeWidth="0.6" fill="none" />
      </svg>
    ),
  },
  {
    name: "Pedro Santos",
    role: "Engenheiro de Segurança",
    company: "Indústria de Celulose XPTO",
    text: "A gestão de prazos de vencimento acabou com nossas não conformidades. O dashboard dá visibilidade total do parque de válvulas.",
    result: "Zero não conformidades",
    rating: 5,
    avatar: (
      <svg viewBox="0 0 36 36" fill="none" className="w-full h-full">
        <rect width="36" height="36" rx="18" fill="#E8F0E8" />
        <circle cx="18" cy="13" r="5" fill="#C8D8B8" />
        <ellipse cx="18" cy="28" rx="11" ry="8" fill="#C8D8B8" />
        <circle cx="15" cy="12" r="1" fill="#5B6B3B" />
        <circle cx="21" cy="12" r="1" fill="#5B6B3B" />
        <path d="M15 16c1 .5 3 .5 4 0" stroke="#5B6B3B" strokeWidth="0.6" fill="none" />
      </svg>
    ),
  },
]

export function Testimonials() {
  const { prefersReducedMotion } = useReducedMotion()

  return (
    <Section
      id="depoimentos"
      title="O que nossos clientes dizem"
      subtitle="Empresas de inspeção que transformaram sua gestão com o NR-13 Pro."
      className="bg-white"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-white border border-[#EDE9E3] rounded-xl p-5 sm:p-6 card-hover"
          >
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#D18A00" stroke="#D18A00" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
            </div>
            <p className="text-sm text-[#676767] leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-medium text-[#171717]">{t.name}</div>
                  <div className="text-xs text-[#676767]">{t.role}, {t.company}</div>
                </div>
              </div>
              <span className="text-xs font-medium text-[#2E7D32] bg-[#EDF5ED] px-2 py-1 rounded-full">
                {t.result}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-4 text-xs text-[#9E9E9E]">
        * Depoimentos ilustrativos baseados em casos reais de clientes.
      </div>
    </Section>
  )
}
