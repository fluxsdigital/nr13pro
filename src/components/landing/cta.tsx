"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import { Container } from "@/components/landing/container"
import { Button } from "@/components/landing/button"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

export function CTA() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="demo">
      <Container>
        <div
          ref={ref}
          className={cn(
            "relative my-20 sm:my-28 overflow-hidden rounded-3xl bg-primary px-6 py-16 sm:px-12 sm:py-20 text-center transition-all duration-700",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          )}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />

          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
              <Sparkles className="h-7 w-7 text-white" />
            </div>

            <h2 className="mt-6 text-[clamp(1.8rem,4vw,2.75rem)] font-semibold leading-tight tracking-tight text-white">
              Pronto para transformar{" "}
              <span className="text-accent">suas inspeções?</span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80">
              Solicite uma demonstração personalizada. Nossa equipe mostra a
              plataforma em funcionamento com os dados da sua empresa.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                href="https://wa.me/5519992232149?text=Olá!%20Quero%20uma%20demonstração%20do%20NR-13%20Pro"
                target="_blank"
                rel="noopener noreferrer"
                size="large"
                className="bg-white text-primary hover:bg-white/90"
              >
                Solicitar Demonstração
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                href="#faq"
                variant="ghost"
                size="large"
                className="text-white hover:bg-white/10"
              >
                Dúvidas? FAQ
              </Button>
            </div>

            <p className="mt-6 text-sm text-white/60">
              Sem compromisso. Sem contrato fidelidade.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
