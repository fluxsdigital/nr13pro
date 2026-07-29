"use client"

import { motion } from "framer-motion"
import { Section } from "./section"
import { useReducedMotion } from "./motion-provider"

const testimonials = [
  {
    name: "Carlos Mendes",
    handle: "carlosmendes_inspetor",
    text: "Reduzimos em 60% o tempo de emissão de laudos. O checklist digital no celular transformou a forma como trabalhamos em campo.",
    time: "3 h",
    avatar: "https://i.pravatar.cc/80?img=11",
    liked: true,
    likes: 142,
  },
  {
    name: "Ana Oliveira",
    handle: "ana.oliveira.manutencao",
    text: "O QR Code foi um divisor de águas. Agora qualquer técnico escaneia e tem todo o histórico da válvula na mão. Simplesmente essencial.",
    time: "7 h",
    avatar: "https://i.pravatar.cc/80?img=5",
    liked: false,
    likes: 98,
  },
  {
    name: "Pedro Santos",
    handle: "pedro.eng.seguranca",
    text: "A gestão de prazos de vencimento acabou com nossas não conformidades. O dashboard dá visibilidade total do parque de válvulas.",
    time: "1 d",
    avatar: "https://i.pravatar.cc/80?img=53",
    liked: true,
    likes: 215,
  },
]

export function Testimonials() {
  const { prefersReducedMotion } = useReducedMotion()

  return (
    <Section
      id="depoimentos"
      title="O que nossos clientes dizem"
      subtitle="Empresas de inspeção que transformaram sua gestão com o NR-13 Pro."
      className="bg-white"
    >
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-lg mx-auto bg-white border border-[#EDE9E3] rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(23,23,23,0.08)]"
      >
        <div className="flex items-center gap-1 px-4 pt-3 pb-2 bg-[#F7F5F2] border-b border-[#EDE9E3]">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex-1 flex items-center justify-center mx-4">
            <div className="bg-white border border-[#EDE9E3] rounded-md px-3 py-1 text-xs text-[#676767] flex items-center gap-2 max-w-[260px] w-full">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              <span className="truncate">instagram.com/nr13pro</span>
            </div>
          </div>
          <div className="flex gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#9E9E9E]">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#9E9E9E]">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </div>
        </div>

        <div className="px-4 py-3 flex items-center gap-3 border-b border-[#EDE9E3]">
          <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#EDE9E3] flex-shrink-0">
            <img src="https://i.pravatar.cc/80?img=11" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-semibold text-[#171717]">nr13pro</div>
            <div className="text-[10px] text-[#676767]">Software de Inspeção NR-13</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#676767" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
          </svg>
        </div>

        <div className="bg-[#FAFAFA] px-4 py-2 flex items-center gap-2 border-b border-[#EDE9E3]">
          <img src="https://i.pravatar.cc/80?img=11" alt="" className="w-5 h-5 rounded-full object-cover" />
          <span className="text-xs text-[#676767]">
            <span className="font-semibold text-[#171717]">carlosmendes_inspetor</span> e
            <span className="font-semibold text-[#171717]"> outras 231 pessoas</span> curtiram
          </span>
        </div>

        <div className="px-4 py-3 space-y-2 max-h-[300px] overflow-y-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.handle}
              initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className="flex gap-2.5"
            >
              <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 mt-0.5">
                <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#171717] leading-relaxed">
                  <span className="font-semibold">{t.name}</span> {t.text}
                </p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-[10px] text-[#9E9E9E] font-medium">{t.time}</span>
                  <span className="text-[10px] text-[#9E9E9E] font-medium">Responder</span>
                  <span className="text-[10px] text-[#9E9E9E] font-medium">
                    Ver tradução
                  </span>
                </div>
              </div>
              <button className="flex-shrink-0 mt-1">
                {t.liked ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#C0392B" stroke="#C0392B" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                  </svg>
                )}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-[#EDE9E3] px-4 py-2.5 flex items-center gap-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
          <span className="text-xs text-[#9E9E9E] flex-1">Adicione um comentário...</span>
          <span className="text-xs font-semibold text-[#3897F0] opacity-50">Publicar</span>
        </div>
      </motion.div>

      <div className="text-center mt-4 text-xs text-[#9E9E9E]">
        * Depoimentos ilustrativos baseados em casos reais de clientes.
      </div>
    </Section>
  )
}
