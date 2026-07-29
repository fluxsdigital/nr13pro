"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { SafariMockup } from "./safari-mockup"
import { AnimatedCounter } from "./animated-counter"
import { useReducedMotion } from "./motion-provider"

const badges = [
  "Conforme NR-13",
  "QR Code",
  "PDF Automático",
  "Assinatura Digital",
  "Histórico Completo",
]

export function Hero() {
  const { prefersReducedMotion } = useReducedMotion()

  return (
    <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#F7F5F2] to-white pointer-events-none" />

      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8F0E8] border border-[#E8A96B]/20 text-xs text-[#C56A2D] font-medium mb-4 sm:mb-5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
              Software para Inspeção NR-13
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#171717] tracking-tight leading-[1.1]">
              Inspeção de válvulas
              <br />
              <span className="text-[#C56A2D]">simples, digital e conforme</span>
            </h1>

            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#676767] leading-relaxed max-w-lg">
              Gerencie inspeções, emita laudos técnicos e mantenha o histórico
              completo das suas válvulas — tudo em um só lugar.
            </p>

            <div className="mt-6 sm:mt-8">
              <div className="flex items-baseline gap-1 mb-5">
                <span className="text-3xl font-semibold text-[#171717]">R$ 197</span>
                <span className="text-sm text-[#676767]">/mês</span>
              </div>

              <a
                href="/checkout"
                className="inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors duration-200 cursor-pointer px-7 py-3 text-base bg-primary text-white hover:bg-primary-hover active:bg-primary-active shadow-sm h-11 w-full sm:w-auto sm:min-w-[240px]"
              >
                Assinar agora — R$ 197/mês
              </a>

              <div className="mt-3 flex items-center gap-2 text-xs text-[#2E7D32]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Cancele quando quiser, sem multa
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-6 sm:mt-8">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-[#EDE9E3] text-xs text-[#676767]"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
          >
            <SafariMockup />
          </motion.div>
        </div>

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-10 sm:mt-14 grid grid-cols-3 gap-6 sm:gap-10 max-w-lg mx-auto"
        >
          {[
            { label: "Clientes", end: 150, suffix: "+" },
            { label: "Válvulas", end: 2400, suffix: "+" },
            { label: "Laudos Emitidos", end: 1800, suffix: "+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-semibold text-[#171717]">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </div>
              <div className="text-xs sm:text-sm text-[#676767] mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
