"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Section } from "./section"
import { useReducedMotion } from "./motion-provider"

const logos = [
  { name: "PetroChem", color: "#C56A2D" },
  { name: "Indústria ABC", color: "#2E7D32" },
  { name: "Refinaria Nova Era", color: "#676767" },
  { name: "Papel e Celulose", color: "#D18A00" },
  { name: "Alimentos Bonsabor", color: "#C0392B" },
  { name: "Manutenção Pro", color: "#6B7B8D" },
]

export function Logos() {
  const { prefersReducedMotion } = useReducedMotion()

  return (
    <Section title="" className="py-10 sm:py-14">
      <div className="text-center mb-6 sm:mb-8">
        <span className="text-xs text-[#676767] tracking-wider uppercase">
          Utilizado por empresas de inspeção em todo o Brasil
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        {logos.map((logo, i) => (
          <motion.div
            key={logo.name}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#EDE9E3]"
          >
            <div className="w-5 h-5 rounded" style={{ backgroundColor: `${logo.color}20` }} />
            <span className="text-sm font-medium" style={{ color: logo.color }}>{logo.name}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
