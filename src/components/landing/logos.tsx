"use client"

import { Container } from "@/components/landing/container"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

const placeholders = [
  "Indústria ABC",
  "PetroVale",
  "Aços Forte",
  "Química Sul",
  "Energia BR",
  "Usina Nova",
]

export function Logos() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section className="py-16 border-b border-border">
      <Container>
        <p className="text-center text-xs font-medium uppercase tracking-widest text-text-muted mb-8">
          Utilizado por profissionais de empresas como
        </p>
        <div
          ref={ref}
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
        >
          {placeholders.map((name, i) => (
            <div
              key={name}
              className={cn(
                "transition-all duration-500",
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="text-lg font-semibold tracking-tight text-text-muted/40 select-none">
                {name}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
