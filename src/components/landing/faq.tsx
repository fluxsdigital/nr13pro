"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Section } from "@/components/landing/section"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

const faqs = [
  {
    q: "O que é o NR-13 Pro?",
    a: "É uma plataforma SaaS para gestão de inspeções de válvulas e equipamentos conforme a NR-13. Substitui planilhas, Word e papel por um sistema digital que cadastra equipamentos, gera laudos automáticos e mantém todo o histórico na nuvem.",
  },
  {
    q: "Precisa instalar algum software?",
    a: "Não. O NR-13 Pro é 100% web. Funciona em qualquer navegador moderno no desktop, tablet ou celular. A versão mobile também pode ser usada offline em campo.",
  },
  {
    q: "Funciona offline?",
    a: "Sim. O inspetor pode realizar toda a coleta em campo sem internet. As informações são sincronizadas automaticamente quando o dispositivo reconectar.",
  },
  {
    q: "Como funciona o QR Code?",
    a: "Cada válvula cadastrada recebe um QR Code único que pode ser impresso em etiqueta adesiva. Ao escanear com o celular, o inspetor acessa o prontuário completo da válvula e inicia uma nova inspeção.",
  },
  {
    q: "O laudo PDF é personalizável?",
    a: "Sim. O laudo segue um template profissional que pode ser customizado com o logotipo da sua empresa. Inclui fotos, assinatura digital, dados técnicos e checklist da inspeção.",
  },
  {
    q: "Quantos usuários podem usar?",
    a: "O plano padrão inclui 2 usuários. Para equipes maiores, oferecemos planos corporativos com usuários ilimitados e múltiplos níveis de permissão.",
  },
  {
    q: "Meus dados estão seguros?",
    a: "Sim. Todos os dados são armazenados com criptografia em servidores de alta disponibilidade. O acesso é controlado por níveis de permissão (administrador, engenheiro, inspetor, leitor).",
  },
  {
    q: "Como importar dados de planilhas existentes?",
    a: "Oferecemos suporte para migração de dados a partir de planilhas CSV ou Excel. Nossa equipe auxilia na importação durante o onboarding.",
  },
  {
    q: "Tem suporte técnico?",
    a: "Sim. Oferecemos suporte via WhatsApp e e-mail. Planos corporativos incluem suporte prioritário e treinamento da equipe.",
  },
  {
    q: "Como funciona o período de avaliação?",
    a: "Oferecemos uma demonstração guiada completa. Após a demonstração, você pode contratar o plano mensal e cancelar quando quiser, sem multa.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <Section
      id="faq"
      title="Perguntas Frequentes"
      subtitle="Tire suas principais dúvidas sobre o NR-13 Pro."
    >
      <div className="mt-10 mx-auto max-w-3xl">
        <div className="divide-y divide-border rounded-2xl border border-border bg-white">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              index={i}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}

function FAQItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: { q: string; a: string }
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-500",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      )}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-card-hover"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-text-primary">{faq.q}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-text-muted transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        )}
      >
        <p className="px-6 text-sm leading-relaxed text-text-secondary">{faq.a}</p>
      </div>
    </div>
  )
}
