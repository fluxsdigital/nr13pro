"use client"

import { motion } from "framer-motion"
import { Section } from "./section"
import { useReducedMotion } from "./motion-provider"

const logos = [
  {
    name: "PetroChem",
    logo: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#C56A2D20" stroke="#C56A2D" strokeWidth="1.5" />
        <path d="M12 6v6l4 2" stroke="#C56A2D" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Indústria ABC",
    logo: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#2E7D3220" stroke="#2E7D32" strokeWidth="1.5" />
        <path d="M8 8h8M8 12h8M8 16h5" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Refinaria Nova Era",
    logo: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7l3-7z" fill="#67676720" stroke="#676767" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    name: "Papel e Celulose",
    logo: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" fill="#D18A0020" stroke="#D18A00" strokeWidth="1.5" />
        <path d="M14 2v6h6M8 12h8M8 16h6" stroke="#D18A00" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Alimentos Bonsabor",
    logo: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#C0392B20" stroke="#C0392B" strokeWidth="1.5" />
        <path d="M12 8v4M8 12h8M12 16h.01" stroke="#C0392B" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Manutenção Pro",
    logo: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#6B7B8D20" stroke="#6B7B8D" strokeWidth="1.5" />
        <path d="M12 6v6l4 4M16 12H8" stroke="#6B7B8D" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Qualitéc",
    logo: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M9 12l2 2 4-4" stroke="#C56A2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="10" fill="#C56A2D15" stroke="#C56A2D" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    name: "Solução em Equipamentos",
    logo: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="3" fill="#2E7D3215" stroke="#2E7D32" strokeWidth="1.2" />
        <circle cx="12" cy="12" r="3" fill="#2E7D3230" stroke="#2E7D32" strokeWidth="1" />
      </svg>
    ),
  },
]

export function Logos() {
  const { prefersReducedMotion } = useReducedMotion()

  return (
    <Section title="" className="py-10 sm:py-14 overflow-hidden">
      <div className="text-center mb-6 sm:mb-8">
        <span className="text-xs text-[#676767] tracking-wider uppercase">
          Utilizado por empresas de inspeção em todo o Brasil
        </span>
      </div>
      <div className="flex items-center justify-center gap-8 sm:gap-12 flex-nowrap">
        {logos.map((logo, i) => (
          <motion.div
            key={logo.name}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center gap-2 flex-shrink-0"
          >
            {logo.logo}
            <span className="text-sm font-medium text-[#676767] whitespace-nowrap">{logo.name}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
