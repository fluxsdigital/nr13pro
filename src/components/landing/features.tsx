"use client"

import { motion } from "framer-motion"
import {
  QrCode,
  ClipboardCheck,
  Camera,
  FileText,
  PenSquare,
  Shield,
  Calendar,
  LayoutDashboard,
  BarChart3,
  Building2,
  Layers,
  HardDrive,
} from "lucide-react"
import { Section } from "@/components/landing/section"
import { useReducedMotion } from "@/components/landing/motion-provider"

const features = [
  { icon: Building2, title: "Cadastro de válvulas", desc: "Dados técnicos completos, certificados e documentos por equipamento." },
  { icon: QrCode, title: "QR Code único", desc: "Identificação por QR Code para acesso instantâneo ao prontuário em campo." },
  { icon: ClipboardCheck, title: "Checklist técnico", desc: "Checklist configurável conforme NR-13. Itens obrigatórios e personalizados." },
  { icon: Camera, title: "Fotos ilimitadas", desc: "Registros fotográficos organizados e vinculados a cada item do laudo." },
  { icon: PenSquare, title: "Assinatura digital", desc: "Inspetor e engenheiro assinam digitalmente. Validação completa." },
  { icon: FileText, title: "Laudo PDF automático", desc: "Laudo profissional gerado automaticamente com fotos e assinaturas." },
  { icon: Shield, title: "Controle de certificados", desc: "Validade de certificados, treinamentos e documentação dos inspetores." },
  { icon: Calendar, title: "Agenda de inspeções", desc: "Calendário com próximas inspeções, vencimentos e alertas automáticos." },
  { icon: LayoutDashboard, title: "Dashboard completo", desc: "KPIs, gráficos e visão geral da conformidade de todos os ativos." },
  { icon: BarChart3, title: "Relatórios gerenciais", desc: "Relatórios por cliente, unidade, equipamento e período." },
  { icon: Layers, title: "Histórico completo", desc: "Timeline com todas as inspeções, medições e intervenções do equipamento." },
  { icon: HardDrive, title: "Armazenamento em nuvem", desc: "Dados seguros com criptografia. Acesse de qualquer lugar." },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
}

const cardVariant = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export function Features() {
  const reduced = useReducedMotion()

  return (
    <Section
      id="funcionalidades"
      title="Tudo que você precisa"
      subtitle="Do cadastro ao laudo. Uma plataforma completa para gestão de inspeções NR-13."
    >
      <motion.div
        className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={reduced ? undefined : container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {features.map((f) => (
          <motion.div
            key={f.title}
            variants={reduced ? undefined : cardVariant}
            className="rounded-lg border border-border bg-white p-5 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-subtle">
              <f.icon className="h-[18px] w-[18px] text-primary" />
            </div>
            <h3 className="mt-3 text-sm font-semibold text-text-primary">{f.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-text-secondary">{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
