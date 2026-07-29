"use client"

import { motion } from "framer-motion"
import { Section } from "./section"
import { useReducedMotion } from "./motion-provider"

export function Problem() {
  const { prefersReducedMotion } = useReducedMotion()

  const cardVariants = (direction: "left" | "right") => ({
    hidden: prefersReducedMotion ? {} : { opacity: 0, x: direction === "left" ? -30 : 30 },
    visible: prefersReducedMotion ? {} : { opacity: 1, x: 0 },
  })

  return (
    <Section
      id="problema"
      title="Antes e depois da gestão digital"
      subtitle="Compare como sua rotina muda quando você adota o NR-13 Pro."
      className="bg-white"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        <motion.div
          variants={cardVariants("left")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="bg-[#F9EDEB] border border-[#C0392B]/20 rounded-xl p-5 sm:p-7"
        >
          <div className="w-8 h-8 rounded-lg bg-[#C0392B]/10 flex items-center justify-center text-[#C0392B] mb-4">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          </div>
          <h3 className="text-base sm:text-lg font-medium text-[#171717] mb-3">Antes — O caos das planilhas</h3>
          <ul className="space-y-3">
            {[
              "Planilhas desatualizadas espalhadas pela equipe",
              "Laudos feitos manualmente no Word",
              "Fotos perdidas no WhatsApp",
              "Prazos vencendo sem aviso",
              "Histórico enterrado em pastas físicas",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-[#676767]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={cardVariants("right")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
          className="bg-[#EDF5ED] border border-[#2E7D32]/20 rounded-xl p-5 sm:p-7"
        >
          <div className="w-8 h-8 rounded-lg bg-[#2E7D32]/10 flex items-center justify-center text-[#2E7D32] mb-4">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h3 className="text-base sm:text-lg font-medium text-[#171717] mb-3">Depois — Tudo digital e organizado</h3>
          <ul className="space-y-3">
            {[
              "Dados centralizados na nuvem, atualizados em tempo real",
              "Laudos gerados automaticamente em PDF",
              "Fotos anexadas diretamente na inspeção",
              "Notificações automáticas de vencimento",
              "Histórico completo acessível por QR Code",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-[#676767]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Section>
  )
}
