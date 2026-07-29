"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Section } from "./section"
import { useReducedMotion } from "./motion-provider"

const steps = [
  {
    number: "01",
    title: "Cadastre suas válvulas",
    description: "Importe ou cadastre manualmente. Adicione tags, fotos, documentos e dados técnicos de cada equipamento.",
    color: "#C56A2D",
  },
  {
    number: "02",
    title: "Gere QR Codes",
    description: "Imprima etiquetas com QR Code. Cada válvula tem um identificador único para acesso rápido em campo.",
    color: "#2E7D32",
  },
  {
    number: "03",
    title: "Realize inspeções",
    description: "Use o checklist digital no celular. Adicione fotos, anotações e assine eletronicamente em campo.",
    color: "#D18A00",
  },
  {
    number: "04",
    title: "Emita laudos em PDF",
    description: "Laudos técnicos automáticos com assinatura digital. Prontos para download, impressão e envio ao cliente.",
    color: "#C56A2D",
  },
  {
    number: "05",
    title: "Acompanhe o histórico",
    description: "Dashboard com KPIs, gráficos e alertas. Saiba exatamente quais válvulas precisam de atenção.",
    color: "#2E7D32",
  },
]

function StepItem({
  step,
  index,
  prefersReducedMotion,
}: {
  step: (typeof steps)[0]
  index: number
  prefersReducedMotion: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: "-80px", once: false })

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
      animate={prefersReducedMotion ? {} : { opacity: isInView ? 1 : 0.3, y: isInView ? 0 : 15 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative flex items-start gap-5 sm:gap-7"
    >
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: isInView ? 1 : 0.8,
                  boxShadow: isInView
                    ? `0 0 0 4px ${step.color}22, 0 0 20px ${step.color}33`
                    : "0 0 0 0px transparent, 0 0 0px transparent",
                }
          }
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-sm"
          style={{ backgroundColor: step.color }}
        >
          <motion.span
            animate={prefersReducedMotion ? {} : { scale: isInView ? 1.1 : 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-xs font-bold"
          >
            {step.number}
          </motion.span>
        </motion.div>
      </div>

      <motion.div
        animate={prefersReducedMotion ? {} : { opacity: isInView ? 1 : 0.5, x: isInView ? 0 : -8 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="pt-1.5 flex-1 min-w-0"
      >
        <div className="text-xs font-medium mb-0.5" style={{ color: isInView ? step.color : "#B0B0B0" }}>
          {step.number}
        </div>
        <h3 className="text-base sm:text-lg font-medium text-[#171717] mb-1">{step.title}</h3>
        <p className="text-sm text-[#676767] leading-relaxed">{step.description}</p>
      </motion.div>
    </motion.div>
  )
}

export function Timeline() {
  const { prefersReducedMotion } = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  })

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <Section
      id="como-funciona"
      title="Como funciona"
      subtitle="Cinco passos para transformar a gestão de inspeção da sua empresa."
    >
      <div ref={containerRef} className="relative max-w-2xl mx-auto">
        <div className="absolute left-5 sm:left-[22px] top-0 bottom-0 w-0.5 bg-[#EDE9E3] rounded-full overflow-hidden hidden sm:block">
          {!prefersReducedMotion && (
            <motion.div
              className="absolute inset-x-0 top-0 w-full rounded-full origin-top"
              style={{
                scaleY: lineScaleY,
                background: "linear-gradient(180deg, #C56A2D 0%, #2E7D32 50%, #C56A2D 100%)",
              }}
            />
          )}
        </div>

        <div className="space-y-10 sm:space-y-12">
          {steps.map((step, i) => (
            <StepItem key={step.number} step={step} index={i} prefersReducedMotion={prefersReducedMotion} />
          ))}
        </div>
      </div>
    </Section>
  )
}
