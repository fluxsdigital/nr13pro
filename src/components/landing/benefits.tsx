"use client"

import { motion } from "framer-motion"
import { QrCode, FileText, Cloud } from "lucide-react"
import { Section } from "@/components/landing/section"
import { useReducedMotion } from "@/components/landing/motion-provider"

const items = [
  {
    icon: QrCode,
    title: "Identificação por QR Code",
    desc: "Cada válvula recebe um QR Code único. Um scan no celular abre o prontuário completo com histórico, fotos e laudos.",
  },
  {
    icon: FileText,
    title: "Laudos PDF profissionais",
    desc: "Laudos automáticos com fotos, assinatura digital e checklist técnico. Prontos para enviar ao cliente na mesma hora.",
  },
  {
    icon: Cloud,
    title: "100% na nuvem, offline em campo",
    desc: "Inspecione sem internet em áreas remotas. Os dados sincronizam automaticamente quando houver conexão.",
  },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
}

const cardVariant = {
  hidden: { y: 30, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export function Benefits() {
  const reduced = useReducedMotion()

  return (
    <Section
      title="Por que o NR-13 Pro?"
      subtitle="Três razões pelas quais engenheiros e inspetores estão migrando do papel para nossa plataforma."
    >
      <motion.div
        className="mt-10 grid gap-6 md:grid-cols-3"
        variants={reduced ? undefined : container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {items.map((b) => (
          <motion.div
            key={b.title}
            variants={reduced ? undefined : cardVariant}
            className="rounded-2xl border border-border bg-white p-8 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
              <b.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-lg font-semibold text-text-primary">{b.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">{b.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
