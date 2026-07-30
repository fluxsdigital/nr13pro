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
          className="relative bg-[#171717] rounded-lg p-8 sm:p-12 lg:p-16 text-center overflow-hidden"
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
                className="inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 cursor-pointer px-7 py-3 text-base bg-white text-[#171717] hover:bg-[#F1ECE6] shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                Assinar agora
              </a>
              <a
                href="https://wa.me/5547974002478"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 cursor-pointer px-7 py-3 text-base border border-white/20 text-white/80 hover:text-white hover:bg-white/10"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Falar com Consultor
              </a>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#2E7D32] bg-[#2E7D32]/10 px-3 py-1.5 rounded-full mx-auto w-fit">
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
