"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Container } from "@/components/landing/container"
import { useReducedMotion } from "@/components/landing/motion-provider"

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
  const reduced = useReducedMotion()

  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-28",
        dark && "bg-primary text-white",
        className
      )}
    >
      <Container className={containerClassName}>
        {(title || subtitle) && (
          <motion.div
            initial={reduced ? undefined : { y: 30, opacity: 0 }}
            whileInView={reduced ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            className="mx-auto max-w-2xl text-center"
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
          </motion.div>
        )}
        {children}
      </Container>
    </section>
  )
}
