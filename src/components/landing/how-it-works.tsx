"use client"

import { QrCode, ClipboardCheck, Camera, FileText, History } from "lucide-react"
import { Section } from "@/components/landing/section"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

const steps = [
  {
    icon: QrCode,
    title: "Cadastro",
    desc: "Cadastre cada válvula com dados técnicos, certificados e documentação. Um QR Code único é gerado automaticamente.",
  },
  {
    icon: ClipboardCheck,
    title: "Inspeção",
    desc: "Em campo, escaneie o QR Code e preencha o checklist técnico. Tudo offline, sem papel.",
  },
  {
    icon: Camera,
    title: "Fotos",
    desc: "Fotografe irregularidades diretamente no app. As imagens ficam vinculadas a cada item do laudo.",
  },
  {
    icon: FileText,
    title: "Laudo",
    desc: "O laudo PDF é gerado automaticamente com fotos, assinatura digital e dados da inspeção.",
  },
  {
    icon: History,
    title: "Histórico",
    desc: "Todo o histórico fica na nuvem. Próxima inspeção começa de onde parou.",
  },
]

export function HowItWorks() {
  return (
    <Section
      id="como-funciona"
      title="Como funciona"
      subtitle="Cinco passos para transformar suas inspeções. Do cadastro ao laudo em minutos."
    >
      <div className="mt-10 relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block" />
        <div className="space-y-8 md:space-y-0">
          {steps.map((step, i) => (
            <Step key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </Section>
  )
}

function Step({
  step,
  index,
}: {
  step: { icon: React.ElementType; title: string; desc: string }
  index: number
}) {
  const { ref, isVisible } = useScrollAnimation()
  const Icon = step.icon

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col md:flex-row gap-6 md:gap-8 pb-8 md:pb-12 last:pb-0 transition-all duration-700",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative flex items-center justify-center md:justify-start">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-sm relative z-10">
          <Icon className="h-5 w-5" />
        </div>
        <span className="md:hidden ml-4 text-sm font-semibold text-text-primary">
          {step.title}
        </span>
      </div>
      <div className="md:pt-2 flex-1">
        <h3 className="hidden md:block text-base font-semibold text-text-primary">
          {step.title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-text-secondary">
          {step.desc}
        </p>
      </div>
    </div>
  )
}
