"use client"

import { X, Check } from "lucide-react"
import { Section } from "@/components/landing/section"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

const comparisons = [
  { traditional: "Planilhas manuais", platform: "Plataforma integrada" },
  { traditional: "Fotos no WhatsApp", platform: "Fotos no laudo" },
  { traditional: "Laudo digitado no Word", platform: "PDF automático" },
  { traditional: "Documentos em pasta física", platform: "Nuvem segura" },
  { traditional: "Sem rastreabilidade", platform: "Histórico completo" },
  { traditional: "Controle manual de prazos", platform: "Alertas automáticos" },
  { traditional: "Retrabalho de digitação", platform: "Coleta em campo" },
  { traditional: "Sem assinatura digital", platform: "Assinatura validada" },
]

export function Differentials() {
  return (
    <Section
      title="Tradicional vs. NR-13 Pro"
      subtitle="Compare o processo manual que você conhece com o que nossa plataforma entrega."
    >
      <div className="mt-10 overflow-hidden rounded-lg border border-border bg-white">
        <div className="grid grid-cols-3 bg-card-hover border-b border-border">
          <div className="p-4 text-sm font-semibold text-text-primary">Processo</div>
          <div className="p-4 text-sm font-semibold text-danger flex items-center gap-2">
            <X className="h-4 w-4" /> Tradicional
          </div>
          <div className="p-4 text-sm font-semibold text-success flex items-center gap-2">
            <Check className="h-4 w-4" /> NR-13 Pro
          </div>
        </div>
        {comparisons.map((item, i) => (
          <ComparisonRow key={item.traditional} item={item} index={i} />
        ))}
      </div>
    </Section>
  )
}

function ComparisonRow({
  item,
  index,
}: {
  item: { traditional: string; platform: string }
  index: number
}) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-3 border-b border-border last:border-b-0 transition-all duration-500",
        index % 2 === 0 ? "bg-white" : "bg-card-hover/50",
        isVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
      )}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div className="p-4 text-sm text-text-primary font-medium">
        {item.traditional}
      </div>
      <div className="p-4 text-sm text-text-muted flex items-center gap-2">
        <X className="h-3.5 w-3.5 text-danger" />
        {item.traditional}
      </div>
      <div className="p-4 text-sm text-text-primary flex items-center gap-2">
        <Check className="h-3.5 w-3.5 text-success" />
        {item.platform}
      </div>
    </div>
  )
}
