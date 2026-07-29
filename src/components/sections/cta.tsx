"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { useReducedMotion } from "./motion-provider"

export function CTA() {
  const { prefersReducedMotion } = useReducedMotion()

  return (
    <section id="cta" className="py-16 sm:py-24">
      <Container>
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative bg-[#171717] rounded-2xl p-8 sm:p-12 lg:p-16 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#C56A2D]/5 to-transparent pointer-events-none" />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white tracking-tight">
              Pronto para transformar sua gestão de inspeção?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#9E9E9E] max-w-lg mx-auto leading-relaxed">
              Solicite uma demonstração personalizada e descubra como o NR-13 Pro pode simplificar sua rotina.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
              <a
                href="mailto:contato@nr13pro.com.br"
                className="inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors duration-200 cursor-pointer px-7 py-3 text-base bg-white text-[#171717] hover:bg-[#F1ECE6] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Solicitar Demonstração
              </a>
              <a
                href="tel:+5511999999999"
                className="inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors duration-200 cursor-pointer px-7 py-3 text-base text-[#9E9E9E] hover:text-white hover:bg-white/10"
              >
                Falar com Consultor
              </a>
            </div>
            <p className="mt-4 text-xs text-[#676767]">
              Sem compromisso. Demonstração gratuita de 30 minutos.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
