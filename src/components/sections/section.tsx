"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"

type SectionProps = {
  children: React.ReactNode
  id?: string
  className?: string
  title?: string
  subtitle?: string
  containerClassName?: string
}

export function Section({ children, id, className = "", title, subtitle, containerClassName = "" }: SectionProps) {
  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 ${className}`}>
      <Container className={containerClassName}>
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-12 sm:mb-16 text-center"
          >
            {title && (
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-text-primary">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
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
