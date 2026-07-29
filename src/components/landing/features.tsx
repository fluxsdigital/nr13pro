"use client"

import {
  QrCode,
  ClipboardCheck,
  Camera,
  FileText,
  PenSquare,
  Shield,
  Calendar,
  LayoutDashboard,
  BarChart3,
  Building2,
  Layers,
  HardDrive,
} from "lucide-react"
import { Section } from "@/components/landing/section"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

const features = [
  { icon: Building2, title: "Cadastro de válvulas", desc: "Dados técnicos completos, certificados e documentos por equipamento." },
  { icon: QrCode, title: "QR Code único", desc: "Identificação por QR Code para acesso instantâneo ao prontuário em campo." },
  { icon: ClipboardCheck, title: "Checklist técnico", desc: "Checklist configurável conforme NR-13. Itens obrigatórios e personalizados." },
  { icon: Camera, title: "Fotos ilimitadas", desc: "Registros fotográficos organizados e vinculados a cada item do laudo." },
  { icon: PenSquare, title: "Assinatura digital", desc: "Inspetor e engenheiro assinam digitalmente. Validação completa." },
  { icon: FileText, title: "Laudo PDF automático", desc: "Laudo profissional gerado automaticamente com fotos e assinaturas." },
  { icon: Shield, title: "Controle de certificados", desc: "Validade de certificados, treinamentos e documentação dos inspetores." },
  { icon: Calendar, title: "Agenda de inspeções", desc: "Calendário com próximas inspeções, vencimentos e alertas automáticos." },
  { icon: LayoutDashboard, title: "Dashboard completo", desc: "KPIs, gráficos e visão geral da conformidade de todos os ativos." },
  { icon: BarChart3, title: "Relatórios gerenciais", desc: "Relatórios por cliente, unidade, equipamento e período." },
  { icon: Layers, title: "Histórico completo", desc: "Timeline com todas as inspeções, medições e intervenções do equipamento." },
  { icon: HardDrive, title: "Armazenamento em nuvem", desc: "Dados seguros com criptografia. Acesse de qualquer lugar." },
]

export function Features() {
  return (
    <Section
      id="funcionalidades"
      title="Tudo que você precisa"
      subtitle="Do cadastro ao laudo. Uma plataforma completa para gestão de inspeções NR-13."
    >
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <FeatureCard key={feature.title} feature={feature} index={i} />
        ))}
      </div>
    </Section>
  )
}

function FeatureCard({
  feature,
  index,
}: {
  feature: { icon: React.ElementType; title: string; desc: string }
  index: number
}) {
  const { ref, isVisible } = useScrollAnimation()
  const Icon = feature.icon

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-border bg-white p-5 transition-all duration-500 hover:shadow-card-hover",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      )}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-subtle">
        <Icon className="h-4.5 w-4.5 text-primary" />
      </div>
      <h3 className="mt-3 text-sm font-semibold text-text-primary">{feature.title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-text-secondary">{feature.desc}</p>
    </div>
  )
}
