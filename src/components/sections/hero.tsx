"use client"

import { useRef, useCallback } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
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
  "100% em Nuvem",
]

export function Hero() {
  const { prefersReducedMotion } = useReducedMotion()
  const heroRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReducedMotion) return
      const rect = heroRef.current?.getBoundingClientRect()
      if (!rect) return
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
    },
    [mouseX, mouseY, prefersReducedMotion],
  )

  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion) return
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY, prefersReducedMotion])

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#F7F5F2] to-white pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(23,23,23,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <motion.div
          className="absolute top-1/4 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(197, 106, 45, 0.06) 0%, transparent 70%)",
            x: useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { stiffness: 40, damping: 20 }),
            y: useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), { stiffness: 40, damping: 20 }),
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-16 w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(197, 106, 45, 0.04) 0%, transparent 70%)",
            x: useSpring(useTransform(mouseX, [-0.5, 0.5], [15, -15]), { stiffness: 40, damping: 20 }),
            y: useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 40, damping: 20 }),
          }}
        />
      </div>

      <Container className="relative flex-1 flex flex-col justify-center pt-20 sm:pt-24 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
          >
            <motion.h1
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-text-primary tracking-tight leading-[1.08]"
            >
              Gerencie inspeções de válvulas com a{" "}
              <span className="text-primary">velocidade de um software moderno</span>
            </motion.h1>

            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.45 }}
              className="mt-5 sm:mt-6 text-base sm:text-lg text-text-secondary leading-relaxed max-w-lg"
            >
              Cadastro, inspeção, fotos, QR Code, laudo PDF e histórico completo —
              tudo que sua empresa precisa para estar em conformidade com a NR-13.
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.96 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
              className="mt-8 sm:mt-10"
            >
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-text-primary">R$ 197</span>
                <span className="text-sm text-text-secondary">/mês</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/checkout"
                  className="inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all duration-200 cursor-pointer px-8 py-3.5 text-base bg-primary text-white hover:bg-primary-hover active:bg-primary-active shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Assinar agora — R$ 197/mês
                </a>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs font-medium text-success">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Cancele quando quiser, sem multa
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 60, rotateX: 4, scale: 0.96 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 }}
            className="relative"
          >
            <div className="relative">
              <SafariMockup />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 1 }}
          className="mt-10 sm:mt-12"
        >
          <div className="flex items-center justify-center gap-10 sm:gap-16">
            {[
              { label: "Empresas", end: 350, suffix: "+" },
              { label: "Inspeções", end: 12000, suffix: "+" },
              { label: "Satisfação", end: 98, suffix: "%" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-text-primary">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </div>
                <div className="text-xs sm:text-sm text-text-secondary mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={prefersReducedMotion ? {} : {
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
            }}
            className="flex flex-wrap items-center justify-center gap-2 mt-5 sm:mt-6"
          >
            {badges.map((badge) => (
              <motion.span
                key={badge}
                variants={prefersReducedMotion ? {} : {
                  hidden: { opacity: 0, y: 6, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-border text-xs font-medium text-text-secondary"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {badge}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
