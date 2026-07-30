"use client"

import { motion } from "framer-motion"
import { FileText, FolderOpen, Search, Clock, ArrowRight } from "lucide-react"
import { Section } from "@/components/landing/section"
import { useReducedMotion } from "@/components/landing/motion-provider"

const before = [
  { icon: FileText, text: "Laudos manuais no Word" },
  { icon: FolderOpen, text: "Fotos espalhadas no WhatsApp" },
  { icon: Search, text: "Perda de histórico de inspeções" },
  { icon: Clock, text: "Horas procurando documentos" },
]

const after = [
  { text: "Laudos automáticos em PDF" },
  { text: "Fotos organizadas por inspeção" },
  { text: "Histórico completo na nuvem" },
  { text: "Tudo em 2 cliques" },
]

export function Problem() {
  const reduced = useReducedMotion()

  return (
    <Section
      title="O problema que resolvemos"
      subtitle="Planilhas, Word e WhatsApp não foram feitos para gerenciar inspeções NR-13."
    >
      <div className="mt-10 grid gap-6 md:grid-cols-2 items-center">
        <motion.div
          initial={reduced ? undefined : { x: -30, opacity: 0 }}
          whileInView={reduced ? undefined : { x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="rounded-lg border border-border bg-white p-6 sm:p-8"
        >
          <span className="inline-block rounded-full bg-text-muted/10 px-3 py-1 text-xs font-semibold text-text-muted">
            Processo Tradicional
          </span>
          <ul className="mt-6 space-y-4">
            {before.map((item) => (
              <li key={item.text} className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-danger/10">
                  <item.icon className="h-3.5 w-3.5 text-danger" />
                </div>
                <span className="text-sm text-text-secondary">{item.text}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={reduced ? undefined : { x: 30, opacity: 0 }}
          whileInView={reduced ? undefined : { x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
          className="rounded-lg border border-primary/30 bg-primary-subtle p-6 sm:p-8"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
              Nossa Plataforma
            </span>
            <ArrowRight className="h-4 w-4 text-primary" />
          </div>
          <ul className="space-y-4">
            {after.map((item) => (
              <li key={item.text} className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-success/10">
                  <span className="text-success text-sm font-bold">✓</span>
                </div>
                <span className="text-sm font-medium text-text-primary">{item.text}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Section>
  )
}
