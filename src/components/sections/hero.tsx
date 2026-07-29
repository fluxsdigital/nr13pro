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

const floatingCards = [
  { id: "inspecao", icon: "✔", label: "Inspeção concluída", color: "#2E7D32", x: -20, y: -10 },
  { id: "pdf", icon: "📄", label: "PDF gerado", color: "#C56A2D", x: 20, y: -15 },
  { id: "fotos", icon: "📷", label: "8 fotos anexadas", color: "#C56A2D", x: 22, y: 5 },
  { id: "proxima", icon: "📅", label: "Próx. inspeção", sub: "15/09/2026", color: "#D18A00", x: -22, y: 12 },
  { id: "conforme", icon: "✔", label: "NR-13 Conforme", color: "#2E7D32", x: -25, y: 2 },
  { id: "certificado", icon: "⚠", label: "Vence em 12 dias", color: "#C0392B", x: 18, y: -5 },
]

function FloatingCard({
  card,
  mouseX,
  mouseY,
  prefersReducedMotion,
  index,
}: {
  card: (typeof floatingCards)[0]
  mouseX: ReturnType<typeof useMotionValue<number>>
  mouseY: ReturnType<typeof useMotionValue<number>>
  prefersReducedMotion: boolean
  index: number
}) {
  const cardX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 80, damping: 15 })
  const cardY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), { stiffness: 80, damping: 15 })

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9, y: 10 }}
      animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.9 + index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        ...(prefersReducedMotion ? {} : { x: cardX, y: cardY }),
        left: `${50 + card.x}%`,
        top: `${50 + card.y}%`,
      }}
      className="hidden lg:flex absolute z-20"
    >
      <motion.div
        animate={prefersReducedMotion ? {} : { y: [0, -3, 0] }}
        transition={{ duration: 4 + index * 0.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
        className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-lg px-3 py-2 shadow-[0_4px_20px_rgba(23,23,23,0.08)] flex items-center gap-2 whitespace-nowrap"
      >
        <span className="text-xs">{card.icon}</span>
        <div>
          <span className="text-xs font-medium" style={{ color: card.color }}>{card.label}</span>
          {"sub" in card && card.sub && (
            <span className="text-[10px] text-[#676767] ml-1">{card.sub}</span>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

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
      className="relative pt-24 sm:pt-28 pb-12 sm:pb-20 overflow-hidden"
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

      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
          >
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8F0E8] border border-[#E8A96B]/20 text-xs text-[#C56A2D] font-medium mb-4 sm:mb-5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
                Plataforma especializada em inspeção NR-13
              </div>
            </motion.div>

            <motion.h1
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#171717] tracking-tight leading-[1.1]"
            >
              Gerencie inspeções de válvulas com a{" "}
              <span className="text-[#C56A2D]">velocidade de um software moderno</span>
            </motion.h1>

            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.45 }}
              className="mt-4 sm:mt-5 text-base sm:text-lg text-[#676767] leading-relaxed max-w-lg"
            >
              Cadastro, inspeção, fotos, QR Code, laudo PDF e histórico completo —
              tudo que sua empresa precisa para estar em conformidade com a NR-13.
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.96 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
              className="mt-6 sm:mt-8"
            >
              <div className="flex items-baseline gap-1 mb-5">
                <span className="text-3xl font-semibold text-[#171717]">R$ 197</span>
                <span className="text-sm text-[#676767]">/mês</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/checkout"
                  className="inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 cursor-pointer px-7 py-3 text-base bg-primary text-white hover:bg-primary-hover active:bg-primary-active shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Assinar agora — R$ 197/mês
                </a>
                <a
                  href="#como-funciona"
                  className="inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 cursor-pointer px-7 py-3 text-base bg-secondary text-text-primary hover:bg-secondary-hover border border-border hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                  Ver Plataforma
                </a>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-[#2E7D32]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Cancele quando quiser, sem multa
              </div>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.7 }}
              className="mt-6 sm:mt-8 grid grid-cols-3 gap-4 sm:gap-6 max-w-sm"
            >
              {[
                { label: "Empresas", end: 350, suffix: "+" },
                { label: "Inspeções", end: 12000, suffix: "+" },
                { label: "Satisfação", end: 98, suffix: "%" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl sm:text-2xl font-semibold text-[#171717]">
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-[#676767] mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={prefersReducedMotion ? {} : {
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
              }}
              className="flex flex-wrap items-center gap-2 mt-4 sm:mt-5"
            >
              {badges.map((badge) => (
                <motion.span
                  key={badge}
                  variants={prefersReducedMotion ? {} : {
                    hidden: { opacity: 0, y: 8, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white border border-[#EDE9E3] text-[11px] text-[#676767]"
                >
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {badge}
                </motion.span>
              ))}
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

              {!prefersReducedMotion && (
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-10"
                  viewBox="0 0 600 500"
                  preserveAspectRatio="none"
                  style={{ opacity: 0.12 }}
                >
                  <line x1="0" y1="80" x2="200" y2="100" stroke="#C56A2D" strokeWidth="0.5" />
                  <line x1="600" y1="60" x2="400" y2="100" stroke="#C56A2D" strokeWidth="0.5" />
                  <line x1="600" y1="250" x2="420" y2="220" stroke="#C56A2D" strokeWidth="0.5" />
                  <line x1="0" y1="350" x2="200" y2="280" stroke="#C56A2D" strokeWidth="0.5" />
                  <line x1="0" y1="200" x2="180" y2="200" stroke="#C56A2D" strokeWidth="0.5" />
                  <line x1="600" y1="380" x2="400" y2="340" stroke="#C56A2D" strokeWidth="0.5" />
                </svg>
              )}

              {floatingCards.map((card, i) => (
                <FloatingCard
                  key={card.id}
                  card={card}
                  mouseX={mouseX}
                  mouseY={mouseY}
                  prefersReducedMotion={prefersReducedMotion}
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
