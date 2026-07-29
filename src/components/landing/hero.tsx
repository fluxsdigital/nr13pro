"use client"

import { ArrowRight, Check, Shield, QrCode, FileText, PenSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/landing/container"
import { Button } from "@/components/landing/button"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const badges = [
  { icon: Check, text: "Conforme NR-13" },
  { icon: QrCode, text: "QR Code por Válvula" },
  { icon: FileText, text: "PDF Automático" },
  { icon: PenSquare, text: "Assinatura Digital" },
]

const trustItems = [
  { label: "Empresas que confiam", value: "50+" },
  { label: "Inspeções realizadas", value: "2.400+" },
  { label: "Laudos emitidos", value: "1.800+" },
]

export function Hero() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section className="relative min-h-dvh flex items-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-subtle via-background to-background" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <Container className="relative">
        <div
          ref={ref}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          <div
            className={cn(
              "transition-all duration-700",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-text-secondary">
              <Shield className="h-3.5 w-3.5 text-primary" />
              Plataforma completa para inspeção NR-13
            </span>

            <h1 className="mt-6 text-[clamp(2.2rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-text-primary">
              Inspeção de válvulas{" "}
              <span className="text-primary">profissional</span> e sem papel
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-text-secondary">
              Cadastre válvulas, inspecione em campo com QR Code, gere laudos
              PDF profissionais e mantenha todo o histórico na nuvem. Feito para
              engenheiros e inspetores NR-13.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button size="large" href="#demo">
                Solicitar Demonstração
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="large" variant="secondary" href="#funcionalidades">
                Conhecer Plataforma
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {badges.map((badge) => (
                <span
                  key={badge.text}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-text-secondary"
                >
                  <badge.icon className="h-3.5 w-3.5 text-primary" />
                  {badge.text}
                </span>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-8">
              {trustItems.map((item) => (
                <div key={item.label}>
                  <span className="block text-xl font-semibold text-text-primary">
                    {item.value}
                  </span>
                  <span className="text-xs text-text-muted">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className={cn(
              "relative transition-all duration-700 delay-200",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            )}
          >
            <div className="relative mx-auto max-w-lg">
              <div className="aspect-[4/3] rounded-2xl border border-border bg-white shadow-xl shadow-black/5 overflow-hidden">
                <div className="h-10 border-b border-border bg-card-hover flex items-center gap-1.5 px-4">
                  <div className="w-3 h-3 rounded-full bg-danger/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-32 rounded bg-card-hover" />
                    <div className="h-3 w-20 rounded bg-primary/10" />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="rounded-lg border border-border p-3 space-y-2">
                        <div className="h-2 w-16 rounded bg-card-hover" />
                        <div className="h-6 w-full rounded bg-primary-subtle flex items-center justify-center text-xs font-semibold text-primary">
                          V-{101 + i}
                        </div>
                        <div className="h-2 w-12 rounded bg-card-hover" />
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg border border-border p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="h-2 w-24 rounded bg-card-hover" />
                      <span className="text-[10px] font-medium text-success">Conforme</span>
                    </div>
                    <div className="h-2 w-full rounded bg-card-hover" />
                    <div className="h-2 w-3/4 rounded bg-card-hover" />
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 -z-10 w-full h-full rounded-2xl border border-border bg-card-hover" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}


