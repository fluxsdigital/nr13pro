"use client"

import { Star } from "lucide-react"
import { Section } from "@/components/landing/section"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    name: "Ricardo Alves",
    role: "Engenheiro Mecânico",
    company: "Integra Inspeções",
    result: "Reduzimos o tempo de emissão de laudos de 3 dias para 2 horas.",
    text: "Antes usávamos planilhas e Word. Cada laudo levava dias. Com o NR-13 Pro, fazemos a inspeção no tablet pela manhã e o laudo está pronto antes do almoço. A integração com QR Code eliminou erros de identificação das válvulas.",
    avatar: "RA",
  },
  {
    name: "Fernanda Costa",
    role: "Coordenadora de Manutenção",
    company: "Química Sul",
    result: "Centralizamos 340 válvulas em uma única plataforma.",
    text: "Tínhamos documentos espalhados em pastas físicas e drives. Hoje tudo está na nuvem, organizado por unidade e equipamento. Os alertas de vencimento nos ajudaram a reduzir inspeções atrasadas em 80%.",
    avatar: "FC",
  },
  {
    name: "Marcelo Dias",
    role: "Diretor de Operações",
    company: "Aços Forte",
    result: "Eliminamos retrabalho e padronizamos os laudos.",
    text: "Cada inspetor fazia o laudo de um jeito. Hoje todos seguem o mesmo padrão profissional. Os clientes notaram a diferença na qualidade dos relatórios. A assinatura digital foi um diferencial competitivo.",
    avatar: "MD",
  },
]

export function Testimonials() {
  return (
    <Section
      title="Depoimentos"
      subtitle="Veja o que engenheiros e gestores dizem sobre o NR-13 Pro. Os nomes e empresas são ilustrativos."
    >
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <TestimonialCard key={t.name} t={t} index={i} />
        ))}
      </div>
    </Section>
  )
}

function TestimonialCard({
  t,
  index,
}: {
  t: { name: string; role: string; company: string; result: string; text: string; avatar: string }
  index: number
}) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-border bg-white p-6 transition-all duration-500 hover:shadow-card-hover flex flex-col",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
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
    </div>
  )
}
