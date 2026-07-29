"use client"

import { motion } from "framer-motion"
import { ArrowRight, Shield } from "lucide-react"
import { Container } from "@/components/landing/container"
import { Button } from "@/components/landing/button"
import { MacbookMockup } from "@/components/landing/macbook-mockup"
import { AnimatedCounter } from "@/components/landing/animated-counter"
import { useReducedMotion } from "@/components/landing/motion-provider"

const trustItems = [
  { label: "Empresas que confiam", value: 50 },
  { label: "Inspeções realizadas", value: 2400 },
  { label: "Laudos emitidos", value: 1800 },
]

export function Hero() {
  const reduced = useReducedMotion()

  return (
    <section className="relative min-h-dvh flex items-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-subtle via-background to-background" />

      <Container className="relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={reduced ? undefined : { y: 40, opacity: 0 }}
            animate={reduced ? undefined : { y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-text-secondary">
              <Shield className="h-3.5 w-3.5 text-primary" />
              Plataforma completa para inspeção NR-13
            </span>

            <h1 className="mt-6 text-[clamp(2.2rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-text-primary">
              Inspeção de válvulas{" "}
              <span className="text-primary">profissional</span> e sem papel
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-text-secondary">
              Cadastre válvulas, inspecione em campo com QR Code, gere laudos
              PDF profissionais e mantenha todo o histórico na nuvem. Feito para
              engenheiros e inspetores NR-13.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <motion.div
                whileHover={reduced ? undefined : { scale: 1.02 }}
                whileTap={reduced ? undefined : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Button size="large" href="#demo">
                  Solicitar Demonstração
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
              <Button size="large" variant="secondary" href="#funcionalidades">
                Conhecer Plataforma
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { text: "Conforme NR-13" },
                { text: "QR Code por Válvula" },
                { text: "PDF Automático" },
                { text: "Assinatura Digital" },
              ].map((badge, i) => (
                <motion.span
                  key={badge.text}
                  initial={reduced ? undefined : { y: 10, opacity: 0 }}
                  animate={reduced ? undefined : { y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-text-secondary"
                >
                  <Shield className="h-3.5 w-3.5 text-primary" />
                  {badge.text}
                </motion.span>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-8">
              {trustItems.map((item) => (
                <motion.div
                  key={item.label}
                  initial={reduced ? undefined : { y: 20, opacity: 0 }}
                  animate={reduced ? undefined : { y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + item.label.length * 0.02, duration: 0.5 }}
                >
                  <span className="block text-xl font-semibold text-text-primary">
                    <AnimatedCounter value={item.value} suffix={item.value >= 1000 ? "+" : "+"} />
                  </span>
                  <span className="text-xs text-text-muted">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? undefined : { y: 60, opacity: 0, scale: 0.92 }}
            animate={reduced ? undefined : { y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <MacbookMockup />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
