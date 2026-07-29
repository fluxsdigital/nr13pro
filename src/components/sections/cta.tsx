"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
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
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
            style={{
              background: prefersReducedMotion
                ? "none"
                : "radial-gradient(circle, rgba(197, 106, 45, 0.15) 0%, transparent 70%)",
              animation: prefersReducedMotion ? "none" : "cta-glow 4s ease-in-out infinite alternate",
            }}
          />
          <style>{`
            @keyframes cta-glow {
              0% { opacity: 0.5; transform: translate(-50%, -50%) scale(0.8); }
              100% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
            }
          `}</style>
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white tracking-tight">
              Comece agora por R$ 197/mês
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#9E9E9E] max-w-lg mx-auto leading-relaxed">
              Acesso completo à plataforma. Cancele quando quiser, sem multa ou burocracia.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
              <a
                href="/checkout"
                className="inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 cursor-pointer px-7 py-3 text-base bg-white text-[#171717] hover:bg-[#F1ECE6] shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                Assinar agora
              </a>
              <a
                href="mailto:contato@nr13pro.com.br"
                className="inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 cursor-pointer px-7 py-3 text-base text-[#9E9E9E] hover:text-white hover:bg-white/10"
              >
                Falar com Consultor
              </a>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#2E7D32] bg-[#EDF5ED]/10 px-3 py-1.5 rounded-full mx-auto w-fit">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Cancele quando quiser, sem multa
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
