"use client"

import { QrCode, FileText, Cloud } from "lucide-react"
import { Section } from "@/components/landing/section"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

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

export function Benefits() {
  return (
    <Section
      title="Por que o NR-13 Pro?"
      subtitle="Três razões pelas quais engenheiros e inspetores estão migrando do papel para nossa plataforma."
    >
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {items.map((item, i) => (
          <BenefitCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </Section>
  )
}

function BenefitCard({
  item,
  index,
}: {
  item: { icon: React.ElementType; title: string; desc: string }
  index: number
}) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-border bg-white p-8 transition-all duration-500 hover:shadow-card-hover",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
        <item.icon className="h-6 w-6" />
      </div>
      <h3 className="mt-6 text-lg font-semibold text-text-primary">{item.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-text-secondary">{item.desc}</p>
    </div>
  )
}
