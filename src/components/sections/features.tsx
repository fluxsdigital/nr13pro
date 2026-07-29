"use client"

import { useRef, useCallback } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { Section } from "./section"
import { useReducedMotion } from "./motion-provider"

const features = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="8.5" cy="7" r="4"/>
        <polyline points="17 11 19 13 23 9"/>
      </svg>
    ),
    title: "Cadastro de Equipamentos",
    description: "Cadastre vasos, caldeiras, tubulações e tanques com dados técnicos completos: tag, fabricante, pressão, volume e classe de fluido.",
    url: "app.nr13pro.com.br/equipamentos",
    screen: (
      <div className="space-y-1">
        {["V-101 Vaso", "CAL-01 Caldeira", "TQ-05 Tanque"].map((e) => (
          <div key={e} className="flex items-center gap-1.5 bg-[#F7F5F2] rounded px-2 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#C56A2D]" />
            <span className="text-[8px] text-[#171717]">{e}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <rect x="7" y="7" width="3" height="3"/>
        <rect x="14" y="7" width="3" height="3"/>
        <rect x="7" y="14" width="3" height="3"/>
        <rect x="14" y="14" width="3" height="3"/>
      </svg>
    ),
    title: "QR Code",
    description: "Gere QR Codes individuais para cada equipamento. Escaneie com o celular e acesse histórico, laudos e documentos em segundos.",
    url: "app.nr13pro.com.br/qrcode",
    screen: (
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-white border-2 border-[#171717] rounded flex items-center justify-center flex-shrink-0">
          <div className="grid grid-cols-5 gap-[1px]">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className={`w-1 h-1 ${Math.random() > 0.5 ? "bg-[#171717]" : "bg-white"}`} />
            ))}
          </div>
        </div>
        <div>
          <div className="text-[8px] font-medium text-[#171717]">V-101</div>
          <div className="text-[7px] text-[#676767]">Vaso de Pressão</div>
        </div>
      </div>
    ),
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "Histórico Completo",
    description: "Registro detalhado de todas as inspeções com fotos, medições, anomalias e dispositivos de segurança organizados por data.",
    url: "app.nr13pro.com.br/historico",
    screen: (
      <div className="space-y-1">
        {[{ d: "15/09/26", s: "Aprovado", c: "#2E7D32" }, { d: "10/06/26", s: "Pendente", c: "#D18A00" }, { d: "12/03/26", s: "Aprovado", c: "#2E7D32" }].map((i) => (
          <div key={i.d} className="flex items-center justify-between border-b border-[#EDE9E3] pb-0.5 last:border-0">
            <span className="text-[8px] text-[#676767]">{i.d}</span>
            <span className="text-[7px] font-medium" style={{ color: i.c }}>{i.s}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4"/>
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
    title: "Checklist Digital",
    description: "Checklists personalizáveis por tipo de inspeção. Siga o passo a passo em campo e não perca nenhum item.",
    url: "app.nr13pro.com.br/checklist",
    screen: (
      <div className="space-y-1">
        {["Pressão de trabalho", "Válvula de segurança", "Condições gerais", "Tag identificação"].map((c) => (
          <div key={c} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded border border-[#C56A2D] flex items-center justify-center bg-[#C56A2D]">
              <svg width="5" height="5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <span className="text-[8px] text-[#171717]">{c}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
    title: "Fotos na Inspeção",
    description: "Fotografe e anexe imagens diretamente na inspeção. Todas as fotos ficam organizadas e vinculadas ao laudo técnico.",
    url: "app.nr13pro.com.br/fotos",
    screen: (
      <div className="grid grid-cols-3 gap-1">
        {["#F8F0E8", "#EDE9E3", "#F0E8D8", "#E8E0D0", "#F5F0E8", "#E0D8C8"].map((bg, i) => (
          <div key={i} className="aspect-square rounded" style={{ backgroundColor: bg }}>
            <div className="w-full h-full flex items-center justify-center">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#C56A2D" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="9" y1="21" x2="9" y2="9"/>
      </svg>
    ),
    title: "Agenda de Inspeções",
    description: "Calendário integrado com todas as inspeções programadas. Alertas automáticos de vencimento e prazos.",
    url: "app.nr13pro.com.br/agenda",
    screen: (
      <div>
        <div className="grid grid-cols-7 gap-0.5 text-center mb-1">
          {["D", "S", "T", "Q", "Q", "S", "S"].map((d) => (
            <span key={d} className="text-[6px] text-[#9E9E9E] font-medium">{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0.5 text-center">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className={`text-[7px] w-3.5 h-3.5 flex items-center justify-center rounded ${i === 14 ? "bg-[#C56A2D] text-white font-bold" : i === 15 || i === 20 ? "text-[#C56A2D] font-medium" : "text-[#676767]"}`}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    title: "Laudo PDF Automático",
    description: "Laudos técnicos em PDF com assinatura digital. Prontos para download, impressão e apresentação à fiscalização NR-13.",
    url: "app.nr13pro.com.br/laudos",
    screen: (
      <div className="bg-white border border-[#EDE9E3] rounded p-1.5 space-y-0.5">
        {["Cliente:", "Equipamento:", "Data:", "Status:"].map((l) => (
          <div key={l} className="flex justify-between text-[7px]">
            <span className="text-[#9E9E9E]">{l}</span>
            <span className="font-medium text-[#171717]">—</span>
          </div>
        ))}
        <div className="h-3 bg-[#2E7D32]/10 rounded flex items-center justify-center mt-0.5">
          <span className="text-[6px] text-[#2E7D32] font-medium">✓ Conforme NR-13</span>
        </div>
      </div>
    ),
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
        <path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    title: "Gestão de Clientes",
    description: "Clientes com dados de contato, CNPJ, endereço e status de vencimento de inspeções por empresa.",
    url: "app.nr13pro.com.br/clientes",
    screen: (
      <div className="space-y-1">
        {["ABC Indústria", "Tech Soluções", "MetalNorte"].map((c) => (
          <div key={c} className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full bg-[#F7F5F2] flex items-center justify-center">
              <span className="text-[6px] font-medium text-[#C56A2D]">{c[0]}</span>
            </div>
            <span className="text-[8px] text-[#171717]">{c}</span>
            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
    ),
    title: "Notificações",
    description: "Alertas automáticos sobre inspeções próximas ao vencimento, anomalias críticas e certificados pendentes.",
    url: "app.nr13pro.com.br/notificacoes",
    screen: (
      <div className="space-y-1">
        {[{ t: "V-101 vence em 15 dias", c: "#D18A00" }, { t: "CAL-01: laudo pendente", c: "#C56A2D" }, { t: "TQ-05 inspeção aprovada", c: "#2E7D32" }].map((n) => (
          <div key={n.t} className="flex items-start gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full mt-0.5 flex-shrink-0" style={{ backgroundColor: n.c }} />
            <span className="text-[7px] text-[#676767]">{n.t}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    title: "Dashboard",
    description: "KPIs, progresso por cliente, atividade recente e certificados disponíveis para emissão em tempo real.",
    url: "app.nr13pro.com.br/dashboard",
    screen: (
      <div className="space-y-1">
        <div className="flex gap-1">
          {[{ v: "156", c: "#C56A2D" }, { v: "142", c: "#2E7D32" }, { v: "14", c: "#D18A00" }].map((k) => (
            <div key={k.c} className="flex-1 bg-[#F7F5F2] rounded p-1 text-center">
              <div className="text-[9px] font-bold" style={{ color: k.c }}>{k.v}</div>
            </div>
          ))}
        </div>
        <div className="flex items-end gap-0.5 h-6">
          {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
            <div key={i} className="flex-1 rounded-t" style={{ height: `${h * 0.3}px`, backgroundColor: i === 5 ? "#C56A2D" : "#EDE9E3" }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10z"/>
      </svg>
    ),
    title: "Relatórios",
    description: "Relatórios gerenciais com dados consolidados de inspeções, custos, horas economizadas e conformidade.",
    url: "app.nr13pro.com.br/relatorios",
    screen: (
      <div className="space-y-1">
        {["Inspeções Realizadas", "Equipamentos por Tipo", "Conformidade"].map((r) => (
          <div key={r} className="flex items-center justify-between bg-[#F7F5F2] rounded px-1.5 py-0.5">
            <span className="text-[7px] text-[#171717]">{r}</span>
            <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="#C56A2D" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
      </svg>
    ),
    title: "Classificação NR-13",
    description: "Cálculo automático de categoria, grupo de risco e periodicidade de inspeção conforme a NR-13.",
    url: "app.nr13pro.com.br/nr13",
    screen: (
      <div className="space-y-1">
        {[{ l: "Fluido", v: "Classe A — Inflamável", c: "#C0392B" }, { l: "Categoria", v: "III", c: "#C56A2D" }, { l: "Periodicidade", v: "12 meses", c: "#2E7D32" }].map((r) => (
          <div key={r.l} className="flex items-center justify-between">
            <span className="text-[7px] text-[#9E9E9E]">{r.l}</span>
            <span className="text-[7px] font-medium" style={{ color: r.c }}>{r.v}</span>
          </div>
        ))}
      </div>
    ),
  },
]

function SafariCard({
  feature,
  prefersReducedMotion,
}: {
  feature: (typeof features)[0]
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
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={prefersReducedMotion ? {} : { rotateX, rotateY }}
      whileHover={prefersReducedMotion ? {} : { y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
      className="group bg-white border border-[#EDE9E3] rounded-lg overflow-hidden cursor-default"
    >
      <div className="flex items-center gap-1 px-3 pt-2 pb-1.5 bg-[#F7F5F2] border-b border-[#EDE9E3]">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
          <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
          <div className="w-2 h-2 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 flex justify-center mx-1">
          <div className="bg-white border border-[#EDE9E3] rounded px-1.5 py-0.5 text-[7px] text-[#676767] flex items-center gap-1 max-w-[140px] w-full truncate">
            <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
            <span className="truncate">{feature.url}</span>
          </div>
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <motion.div
            className="w-6 h-6 rounded-lg bg-[#F8F0E8] flex items-center justify-center text-[#C56A2D] flex-shrink-0 transition-colors duration-300 group-hover:bg-[#C56A2D] group-hover:text-white"
            whileHover={prefersReducedMotion ? {} : { scale: 1.15, rotate: [0, -8, 8, 0] }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
          >
            {feature.icon}
          </motion.div>
          <h3 className="text-sm font-medium text-[#171717] transition-colors duration-300 group-hover:text-[#C56A2D]">{feature.title}</h3>
        </div>

        <div className="mb-2 p-2 bg-[#FAFAF8] border border-[#EDE9E3] rounded min-h-[52px]">
          {feature.screen}
        </div>

        <p className="text-xs text-[#676767] leading-relaxed transition-colors duration-300 group-hover:text-[#171717]">
          {feature.description}
        </p>
      </div>
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
        variants={prefersReducedMotion ? {} : {
          hidden: {},
          visible: { transition: { staggerChildren: 0.04 } },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
      >
        {features.map((feature) => (
          <SafariCard key={feature.title} feature={feature} prefersReducedMotion={prefersReducedMotion} />
        ))}
      </motion.div>
    </Section>
  )
}
