"use client"

import { motion } from "framer-motion"
import { Monitor, Tablet, Smartphone } from "lucide-react"
import { Section } from "@/components/landing/section"
import { useReducedMotion } from "@/components/landing/motion-provider"

const devices = [
  { icon: Monitor, label: "Desktop", desc: "Painel web completo" },
  { icon: Tablet, label: "Tablet", desc: "Inspeção em campo" },
  { icon: Smartphone, label: "Celular", desc: "QR Code e fotos" },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const cardVariant = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export function Showcase() {
  const reduced = useReducedMotion()

  return (
    <Section
      title="Funciona em qualquer dispositivo"
      subtitle="Desktop para gestão, tablet e celular para inspeção em campo. Tudo sincronizado na nuvem."
    >
      <motion.div
        className="mt-10 grid gap-6 md:grid-cols-3"
        variants={reduced ? undefined : container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {devices.map((device) => (
          <motion.div
            key={device.label}
            variants={reduced ? undefined : cardVariant}
            className="rounded-2xl border border-border bg-white p-6 text-center transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-subtle">
              <device.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-text-primary">{device.label}</h3>
            <p className="text-sm text-text-secondary">{device.desc}</p>
            <div className="mt-6 rounded-xl border border-border bg-card-hover p-4">
              <div className="rounded-lg border border-border bg-white">
                <div className="flex items-center gap-1 border-b border-border px-3 py-2">
                  <div className="h-2 w-2 rounded-full bg-danger/50" />
                  <div className="h-2 w-2 rounded-full bg-warning/50" />
                  <div className="h-2 w-2 rounded-full bg-success/50" />
                </div>
                <div className="p-4 space-y-2">
                  <div className="h-2 w-3/4 rounded bg-card-hover" />
                  <div className="h-2 w-1/2 rounded bg-card-hover" />
                  <div className="h-2 w-5/6 rounded bg-card-hover" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
