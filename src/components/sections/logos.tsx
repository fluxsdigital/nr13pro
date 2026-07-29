"use client"

import { motion } from "framer-motion"
import { Section } from "./section"
import { useReducedMotion } from "./motion-provider"

const logos = [
  { name: "PetroChem", color: "#C56A2D" },
  { name: "Indústria ABC", color: "#2E7D32" },
  { name: "Refinaria Nova Era", color: "#676767" },
  { name: "Papel e Celulose", color: "#D18A00" },
  { name: "Manutenção Pro", color: "#6B7B8D" },
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
            <span className="text-sm font-bold italic whitespace-nowrap" style={{ color: logo.color }}>{logo.name}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
