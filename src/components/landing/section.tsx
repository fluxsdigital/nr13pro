"use client"

import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Container } from "@/components/landing/container"

interface SectionProps {
  id?: string
  title?: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  containerClassName?: string
  dark?: boolean
}

export function Section({
  id,
  title,
  subtitle,
  children,
  className,
  containerClassName,
  dark,
}: SectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "py-20 sm:py-28",
        dark && "bg-primary text-white",
        className
      )}
    >
      <Container className={containerClassName}>
        {(title || subtitle) && (
          <div
            className={cn(
              "mx-auto max-w-2xl text-center transition-all duration-700",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            )}
          >
            {title && (
              <h2
                className={cn(
                  "text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold leading-tight tracking-tight",
                  dark ? "text-white" : "text-text-primary"
                )}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  "mt-4 text-base leading-relaxed",
                  dark ? "text-white/70" : "text-text-secondary"
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div
          className={cn(
            "transition-all duration-700 delay-150",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}
        >
          {children}
        </div>
      </Container>
    </section>
  )
}
