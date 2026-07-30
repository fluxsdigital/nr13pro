"use client"

import { BarChart3, TrendingUp, AlertTriangle, Calendar } from "lucide-react"
import { Section } from "@/components/landing/section"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

const kpis = [
  { label: "Total de Válvulas", value: "247", change: "+12 este mês" },
  { label: "Inspeções em Dia", value: "89%", change: "+5% vs. mês passado" },
  { label: "Vencidas", value: "3", change: "Atenção necessária" },
  { label: "Laudos este mês", value: "18", change: "Média 4.5/semana" },
]

const alerts = [
  { label: "V-204 — Inspeção vence em 7 dias", type: "warning" },
  { label: "V-089 — Certificado do inspetor vencido", type: "danger" },
  { label: "V-156 — Laudo pendente de assinatura", type: "info" },
  { label: "V-312 — Próxima inspeção agendada", type: "success" },
]

export function DashboardPreview() {
  return (
    <Section
      id="dashboard"
      title="Dashboard em tempo real"
      subtitle="Acompanhe a conformidade de todos os ativos em um só lugar. KPIs, alertas e cronograma."
    >
      <div className="mt-10 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, i) => (
            <KpiCard key={kpi.label} kpi={kpi} index={i} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ChartPreview />
          <AlertsPreview />
        </div>
      </div>
    </Section>
  )
}

function KpiCard({
  kpi,
  index,
}: {
  kpi: { label: string; value: string; change: string }
  index: number
}) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-border bg-white p-5 transition-all duration-500 hover:shadow-card-hover",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <p className="text-xs font-medium text-text-muted">{kpi.label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-text-primary">
        {kpi.value}
      </p>
      <p className="mt-1 text-xs text-text-muted">{kpi.change}</p>
    </div>
  )
}

function ChartPreview() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-md border border-border bg-white p-6 transition-all duration-700",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-text-primary">Inspeções por Mês</h3>
          <p className="text-xs text-text-muted">Últimos 6 meses</p>
        </div>
        <BarChart3 className="h-5 w-5 text-text-muted" />
      </div>
      <div className="flex items-end justify-between gap-2 h-32">
        {[40, 55, 45, 70, 60, 85].map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-md bg-primary transition-all duration-1000"
              style={{
                height: isVisible ? `${h}%` : "0%",
                transitionDelay: `${i * 100}ms`,
              }}
            />
            <span className="text-[10px] text-text-muted">
              {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"][i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AlertsPreview() {
  const { ref, isVisible } = useScrollAnimation()
  const IconMap = { warning: AlertTriangle, danger: AlertTriangle, info: Calendar, success: TrendingUp }
  const colorMap = { warning: "text-warning bg-warning-subtle", danger: "text-danger bg-danger-subtle", info: "text-info bg-info-subtle", success: "text-success bg-success-subtle" }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-md border border-border bg-white p-6 transition-all duration-700",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-text-primary">Alertas & Próximas</h3>
          <p className="text-xs text-text-muted">Ações necessárias</p>
        </div>
        <AlertTriangle className="h-5 w-5 text-text-muted" />
      </div>
      <div className="space-y-3">
        {alerts.map((alert, i) => {
          const Icon = IconMap[alert.type as keyof typeof IconMap]
          return (
            <div
              key={alert.label}
              className="flex items-center gap-3 transition-all duration-500"
              style={{
                transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                opacity: isVisible ? 1 : 0,
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <div className={cn("flex h-7 w-7 items-center justify-center rounded-lg", colorMap[alert.type as keyof typeof colorMap])}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm text-text-secondary">{alert.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
