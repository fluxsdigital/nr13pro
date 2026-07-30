"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Section } from "@/components/landing/section"
import { useReducedMotion } from "@/components/landing/motion-provider"

const testimonials = [
  {
    name: "Ricardo Alves",
    role: "Engenheiro Mecânico",
    company: "Integra Inspeções",
    result: "Reduzimos o tempo de emissão de laudos de 3 dias para 2 horas.",
    text: "Antes usávamos planilhas e Word. Cada laudo levava dias. Com o NR-13 Pro, fazemos a inspeção no tablet pela manhã e o laudo está pronto antes do almoço.",
    avatar: "RA",
  },
  {
    name: "Fernanda Costa",
    role: "Coordenadora de Manutenção",
    company: "Química Sul",
    result: "Centralizamos 340 válvulas em uma única plataforma.",
    text: "Tínhamos documentos espalhados em pastas físicas e drives. Hoje tudo está na nuvem, organizado por unidade e equipamento. Os alertas reduziram inspeções atrasadas em 80%.",
    avatar: "FC",
  },
  {
    name: "Marcelo Dias",
    role: "Diretor de Operações",
    company: "Aços Forte",
    result: "Eliminamos retrabalho e padronizamos os laudos.",
    text: "Cada inspetor fazia o laudo de um jeito. Hoje todos seguem o mesmo padrão profissional. A assinatura digital foi um diferencial competitivo.",
    avatar: "MD",
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

export function Testimonials() {
  const reduced = useReducedMotion()

  return (
    <Section
      title="Depoimentos"
      subtitle="Veja o que engenheiros e gestores dizem sobre o NR-13 Pro. Os nomes e empresas são ilustrativos."
    >
      <motion.div
        className="mt-10 grid gap-6 md:grid-cols-3"
        variants={reduced ? undefined : container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {testimonials.map((t) => (
          <motion.div
            key={t.name}
            variants={reduced ? undefined : cardVariant}
            className="rounded-lg border border-border bg-white p-6 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 flex flex-col"
          >
            <div className="flex gap-0.5 text-primary">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary" />
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary flex-1">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3 pt-4 border-t border-border">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                {t.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">{t.name}</p>
                <p className="text-xs text-text-muted">
                  {t.role} — {t.company}
                </p>
              </div>
            </div>
            <div className="mt-3 rounded-lg bg-success-subtle px-3 py-2">
              <p className="text-xs font-medium text-success">{t.result}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
