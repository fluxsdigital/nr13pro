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
    url: "app.nr13pro.com.br/equipamentos/novo",
    screen: (
      <div className="p-3 space-y-2">
        <div className="flex items-center gap-2 text-[10px]">
          <div className="w-2 h-2 rounded bg-[#C56A2D]" />
          <span className="font-medium text-[#171717]">Novo Equipamento</span>
        </div>
        {["Tag: V-101", "Tipo: Vaso de Pressão", "Fluido: Classe A"].map((f) => (
          <div key={f} className="flex items-center gap-1.5">
            <div className="h-2 w-16 rounded bg-[#EDE9E3]" />
            <div className="h-5 flex-1 rounded bg-[#F7F5F2] border border-[#EDE9E3] px-1.5 flex items-center">
              <span className="text-[9px] text-[#676767]">{f.split(": ")[1]}</span>
            </div>
          </div>
        ))}
        <div className="h-6 w-full rounded bg-[#C56A2D] flex items-center justify-center mt-2">
          <span className="text-[9px] text-white font-medium">Salvar</span>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    title: "Gere QR Codes",
    description: "Imprima etiquetas com QR Code. Cada válvula tem um identificador único para acesso rápido em campo.",
    color: "#2E7D32",
    url: "app.nr13pro.com.br/equipamentos/V-101/qrcode",
    screen: (
      <div className="p-3 flex flex-col items-center gap-2">
        <div className="w-14 h-14 bg-white border-2 border-[#171717] rounded flex items-center justify-center">
          <div className="grid grid-cols-5 gap-0.5">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 ${Math.random() > 0.5 ? "bg-[#171717]" : "bg-white"}`} />
            ))}
          </div>
        </div>
        <div className="text-[9px] text-[#676767] text-center">
          <span className="font-medium text-[#171717]">V-101</span>
          <br />Vaso de Pressão
        </div>
        <div className="flex gap-1 mt-1">
          {["PDF", "PNG", "Imprimir"].map((btn) => (
            <div key={btn} className="h-5 px-2 rounded bg-[#F7F5F2] border border-[#EDE9E3] flex items-center">
              <span className="text-[8px] text-[#676767]">{btn}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "Realize inspeções",
    description: "Use o checklist digital no celular. Adicione fotos, anotações e assine eletronicamente em campo.",
    color: "#D18A00",
    url: "app.nr13pro.com.br/inspecoes/nova",
    screen: (
      <div className="p-3 space-y-1.5">
        <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#D18A00] mb-1">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
          Checklist de Inspeção
        </div>
        {["Pressão OK", "Válvula vedando", "Sem corrosão", "Tag legível"].map((item) => (
          <div key={item} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded border border-[#D18A00] flex items-center justify-center bg-[#D18A00]">
              <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <span className="text-[9px] text-[#171717]">{item}</span>
          </div>
        ))}
        <div className="flex gap-1 text-[8px] text-[#676767] mt-1 pt-1.5 border-t border-[#EDE9E3]">
          <span>📷 4 fotos</span>
          <span>✍ Assinado</span>
        </div>
      </div>
    ),
  },
  {
    number: "04",
    title: "Emita laudos em PDF",
    description: "Laudos técnicos automáticos com assinatura digital. Prontos para download, impressão e envio ao cliente.",
    color: "#C56A2D",
    url: "app.nr13pro.com.br/laudos/LAU-2026-001",
    screen: (
      <div className="p-3 space-y-1.5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-medium text-[#171717]">LAUDO NR-13</span>
          <div className="flex gap-0.5">
            {["PDF", "✉"].map((a) => (
              <div key={a} className="w-5 h-4 rounded bg-[#C56A2D] flex items-center justify-center">
                <span className="text-[6px] text-white font-medium">{a}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-[#EDE9E3] rounded p-2 space-y-1">
          {["Cliente: Empresa ABC", "Equipamento: V-101", "Data: 15/06/2026", "Parecer: Aprovado"].map((l) => (
            <div key={l} className="text-[8px] text-[#676767] flex justify-between">
              <span>{l.split(": ")[0]}</span>
              <span className="font-medium text-[#171717]">{l.split(": ")[1]}</span>
            </div>
          ))}
          <div className="h-4 bg-[#2E7D32]/10 rounded flex items-center justify-center mt-1">
            <span className="text-[7px] text-[#2E7D32] font-medium">✓ Conforme NR-13</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "05",
    title: "Acompanhe o histórico",
    description: "Dashboard com KPIs, gráficos e alertas. Saiba exatamente quais válvulas precisam de atenção.",
    color: "#2E7D32",
    url: "app.nr13pro.com.br/dashboard",
    screen: (
      <div className="p-3 space-y-2">
        <div className="flex gap-2">
          {[{ label: "Equip.", value: "156", color: "#C56A2D" }, { label: "OK", value: "142", color: "#2E7D32" }, { label: "Alertas", value: "14", color: "#D18A00" }].map((kpi) => (
            <div key={kpi.label} className="flex-1 bg-[#F7F5F2] rounded p-1.5 text-center">
              <div className="text-[10px] font-bold" style={{ color: kpi.color }}>{kpi.value}</div>
              <div className="text-[7px] text-[#676767]">{kpi.label}</div>
            </div>
          ))}
        </div>
        <div className="flex items-end gap-1 h-10">
          {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
            <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, backgroundColor: i === 5 ? "#C56A2D" : "#EDE9E3" }} />
          ))}
        </div>
        <div className="text-[8px] text-[#676767] text-center">Próximos vencimentos — 7 dias</div>
      </div>
    ),
  },
]

function SafariFrame({ children, url, color }: { children: React.ReactNode; url: string; color: string }) {
  return (
    <div className="bg-white rounded-lg shadow-[0_4px_20px_rgba(23,23,23,0.08),0_1px_3px_rgba(23,23,23,0.04)] overflow-hidden">
      <div className="flex items-center gap-1 px-3 pt-2 pb-1.5 bg-[#F7F5F2] border-b border-[#EDE9E3]">
        <div className="flex gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 flex justify-center mx-2">
          <div className="bg-white border border-[#EDE9E3] rounded px-2 py-0.5 text-[8px] text-[#676767] flex items-center gap-1 max-w-[180px] w-full truncate">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
            <span className="truncate">{url}</span>
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}

function StepMockup({
  step,
  index,
  prefersReducedMotion,
}: {
  step: (typeof steps)[0]
  index: number
  prefersReducedMotion: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: "-100px", once: false })

  const isLeft = index % 2 === 0

  return (
    <div ref={ref} className="relative flex items-center justify-center sm:justify-start">
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 50, scale: 0.95 }}
        animate={prefersReducedMotion ? {} : { opacity: isInView ? 1 : 0.2, y: isInView ? 0 : 30, scale: isInView ? 1 : 0.92 }}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
        className={`w-full sm:w-[calc(50%-2rem)] ${isLeft ? "sm:pr-8" : "sm:pl-8"} ${isLeft ? "" : "sm:ml-auto"}`}
      >
        <div className="relative">
          <motion.div
            animate={prefersReducedMotion ? {} : { boxShadow: isInView ? `0 0 0 2px ${step.color}22, 0 8px 30px ${step.color}15` : "0 0 0 0px transparent, 0 4px 12px rgba(23,23,23,0.06)" }}
            transition={{ duration: 0.5 }}
            className="rounded-lg"
          >
            <SafariFrame url={step.url} color={step.color}>
              {step.screen}
            </SafariFrame>
          </motion.div>

          <motion.div
            animate={prefersReducedMotion ? {} : { opacity: isInView ? 1 : 0, x: isLeft ? -10 : 10 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-3 sm:mt-2 text-center sm:text-left"
          >
            <h3 className="text-sm sm:text-base font-medium text-[#171717]">{step.title}</h3>
            <p className="text-xs text-[#676767] mt-0.5 leading-relaxed">{step.description}</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

function TimelineDot({
  index,
  color,
  isInView,
  prefersReducedMotion,
}: {
  index: number
  color: string
  isInView: boolean
  prefersReducedMotion: boolean
}) {
  const offsets = [0, 6, -4, 8, -2]
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 z-10 hidden sm:block"
      style={{ top: `${28 + index * 20 + offsets[index]}%` }}
    >
      <motion.div
        animate={prefersReducedMotion ? {} : { scale: isInView ? 1.3 : 0.7, boxShadow: isInView ? `0 0 0 4px ${color}33, 0 0 16px ${color}44` : "0 0 0 0px transparent" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
        style={{ backgroundColor: color }}
      />
    </div>
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
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(23,23,23,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(23,23,23,0.4) 1px, transparent 1px),
              linear-gradient(rgba(23,23,23,0.15) 0.5px, transparent 0.5px),
              linear-gradient(90deg, rgba(23,23,23,0.15) 0.5px, transparent 0.5px)
            `,
            backgroundSize: "40px 40px, 40px 40px, 10px 10px, 10px 10px",
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#C56A2D]/[0.03] blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#C56A2D]/[0.02] blur-3xl" />
      </div>

      <div ref={containerRef} className="relative max-w-4xl mx-auto px-4">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-[#EDE9E3] rounded-full overflow-hidden hidden sm:block">
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

        <div className="relative space-y-16 sm:space-y-24">
          {steps.map((step, i) => (
            <StepWithDot
              key={step.number}
              step={step}
              index={i}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}

function StepWithDot({
  step,
  index,
  prefersReducedMotion,
}: {
  step: (typeof steps)[0]
  index: number
  prefersReducedMotion: boolean
}) {
  const dotRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(dotRef, { margin: "-100px", once: false })

  return (
    <div ref={dotRef} className="relative">
      <TimelineDot index={index} color={step.color} isInView={isInView} prefersReducedMotion={prefersReducedMotion} />
      <StepMockup step={step} index={index} prefersReducedMotion={prefersReducedMotion} />
    </div>
  )
}
