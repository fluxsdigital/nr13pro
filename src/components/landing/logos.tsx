"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/landing/container"
import { useReducedMotion } from "@/components/landing/motion-provider"

const placeholders = [
  "Indústria ABC",
  "PetroVale",
  "Aços Forte",
  "Química Sul",
  "Energia BR",
  "Usina Nova",
]

export function Logos() {
  const reduced = useReducedMotion()

  return (
    <section className="py-16 border-b border-border">
      <Container>
        <p className="text-center text-xs font-medium uppercase tracking-widest text-text-muted mb-8">
          Utilizado por profissionais de empresas como
        </p>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {placeholders.map((name, i) => (
            <motion.span
              key={name}
              initial={reduced ? undefined : { y: 15, opacity: 0 }}
              whileInView={reduced ? undefined : { y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
              className="text-lg font-semibold tracking-tight text-text-muted/40 select-none"
            >
              {name}
            </motion.span>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
