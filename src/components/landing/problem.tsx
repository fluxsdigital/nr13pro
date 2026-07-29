"use client"

import { FileText, FolderOpen, Search, Clock, ArrowRight } from "lucide-react"
import { Section } from "@/components/landing/section"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

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
  return (
    <Section
      title="O problema que resolvemos"
      subtitle="Planilhas, Word e WhatsApp não foram feitos para gerenciar inspeções NR-13."
    >
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <ProblemCard side="before" items={before} />
        <div className="hidden md:flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
            <ArrowRight className="h-5 w-5" />
          </div>
        </div>
        <ProblemCard side="after" items={after} />
      </div>
    </Section>
  )
}

function ProblemCard({
  side,
  items,
}: {
  side: "before" | "after"
  items: { icon?: React.ElementType; text: string }[]
}) {
  const { ref, isVisible } = useScrollAnimation()
  const isAfter = side === "after"

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border p-6 sm:p-8 transition-all duration-700",
        isAfter
          ? "border-primary/30 bg-primary-subtle"
          : "border-border bg-white",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
    >
      <span
        className={cn(
          "inline-block rounded-full px-3 py-1 text-xs font-semibold",
          isAfter
            ? "bg-primary text-white"
            : "bg-text-muted/10 text-text-muted"
        )}
      >
        {isAfter ? "Nossa Plataforma" : "Processo Tradicional"}
      </span>

      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={item.text} className="flex items-start gap-3">
            {item.icon ? (
              <div
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
                  isAfter ? "bg-primary/10" : "bg-danger/10"
                )}
              >
                <item.icon
                  className={cn(
                    "h-3.5 w-3.5",
                    isAfter ? "text-primary" : "text-danger"
                  )}
                />
              </div>
            ) : (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-success/10">
                <span className="text-success text-sm font-bold">✓</span>
              </div>
            )}
            <span
              className={cn(
                "text-sm",
                isAfter
                  ? "text-text-primary font-medium"
                  : "text-text-secondary"
              )}
            >
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
