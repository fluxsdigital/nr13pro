"use client"

import { useRef, useCallback } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { Section } from "./section"
import { useReducedMotion } from "./motion-provider"

const features = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="8.5" cy="7" r="4"/>
        <polyline points="17 11 19 13 23 9"/>
      </svg>
    ),
    title: "Cadastro de Equipamentos",
    description: "Cadastre vasos, caldeiras, tubulações e tanques com dados técnicos completos: tag, fabricante, pressão, volume e classe de fluido.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <rect x="7" y="7" width="3" height="3"/>
        <rect x="14" y="7" width="3" height="3"/>
        <rect x="7" y="14" width="3" height="3"/>
        <rect x="14" y="14" width="3" height="3"/>
      </svg>
    ),
    title: "QR Code",
    description: "Gere QR Codes individuais para cada equipamento. Escaneie com o celular e acesse histórico, laudos e documentos em segundos.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "Histórico Completo",
    description: "Registro detalhado de todas as inspeções com fotos, medições, anomalias e dispositivos de segurança organizados por data.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4"/>
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
    title: "Checklist Digital",
    description: "Checklists personalizáveis por tipo de inspeção. Siga o passo a passo em campo e não perca nenhum item.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
    title: "Fotos na Inspeção",
    description: "Fotografe e anexe imagens diretamente na inspeção. Todas as fotos ficam organizadas e vinculadas ao laudo técnico.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="9" y1="21" x2="9" y2="9"/>
      </svg>
    ),
    title: "Agenda de Inspeções",
    description: "Calendário integrado com todas as inspeções programadas. Alertas automáticos de vencimento e prazos.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    title: "Laudo PDF Automático",
    description: "Laudos técnicos em PDF com assinatura digital. Prontos para download, impressão e apresentação à fiscalização NR-13.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
        <path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    title: "Gestão de Clientes",
    description: "Clientes com dados de contato, CNPJ, endereço e status de vencimento de inspeções por empresa.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
    ),
    title: "Notificações",
    description: "Alertas automáticos sobre inspeções próximas ao vencimento, anomalias críticas e certificados pendentes.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    title: "Dashboard",
    description: "KPIs, progresso por cliente, atividade recente e certificados disponíveis para emissão em tempo real.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10z"/>
      </svg>
    ),
    title: "Relatórios",
    description: "Relatórios gerenciais com dados consolidados de inspeções, custos, horas economizadas e conformidade.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
      </svg>
    ),
    title: "Classificação NR-13",
    description: "Cálculo automático de categoria, grupo de risco e periodicidade de inspeção conforme a NR-13.",
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

function FeatureCard({
  feature,
  index,
  prefersReducedMotion,
}: {
  feature: (typeof features)[0]
  index: number
  prefersReducedMotion: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReducedMotion) return
      const rect = cardRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      mouseX.set(x)
      mouseY.set(y)
      rotateX.set((y - 0.5) * 6)
      rotateY.set((x - 0.5) * -6)
    },
    [prefersReducedMotion, mouseX, mouseY, rotateX, rotateY],
  )

  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion) return
    rotateX.set(0)
    rotateY.set(0)
  }, [prefersReducedMotion, rotateX, rotateY])

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={prefersReducedMotion ? {} : { rotateX, rotateY }}
      whileHover={prefersReducedMotion ? {} : { y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
      className="group bg-white border border-[#EDE9E3] rounded-lg p-4 transition-shadow duration-300 cursor-default"
    >
      <motion.div
        className="w-8 h-8 rounded-lg bg-[#F8F0E8] flex items-center justify-center text-[#C56A2D] mb-3 transition-colors duration-300 group-hover:bg-[#C56A2D] group-hover:text-white"
        whileHover={prefersReducedMotion ? {} : { scale: 1.15, rotate: [0, -8, 8, 0] }}
        transition={{ type: "spring", stiffness: 400, damping: 12 }}
      >
        {feature.icon}
      </motion.div>
      <h3 className="text-sm font-medium text-[#171717] mb-1 transition-colors duration-300 group-hover:text-[#C56A2D]">
        {feature.title}
      </h3>
      <p className="text-xs text-[#676767] leading-relaxed transition-colors duration-300 group-hover:text-[#171717]">
        {feature.description}
      </p>
    </motion.div>
  )
}

export function Features() {
  const { prefersReducedMotion } = useReducedMotion()

  return (
    <Section
      id="funcionalidades"
      title="Tudo que você precisa em um só lugar"
      subtitle="Do cadastro à emissão do laudo, o NR-13 Pro cobre cada etapa do processo de inspeção."
    >
      <motion.div
        variants={prefersReducedMotion ? {} : containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
      >
        {features.map((feature, i) => (
          <FeatureCard
            key={feature.title}
            feature={feature}
            index={i}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </motion.div>
    </Section>
  )
}
