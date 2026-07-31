"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { useReducedMotion } from "./motion-provider"

type SectionProps = {
  children: React.ReactNode
  id?: string
  className?: string
  title?: string
  subtitle?: string
  containerClassName?: string
}

export function Section({ children, id, className = "", title, subtitle, containerClassName = "" }: SectionProps) {
  const { prefersReducedMotion } = useReducedMotion()

  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 ${className}`}>
      <Container className={containerClassName}>
        {(title || subtitle) && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-12 sm:mb-16 text-center"
          >
            {title && (
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#171717]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg text-[#676767] max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30, scale: 0.98 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        >
          {children}
        </motion.div>
      </Container>
    </section>
  )
}
