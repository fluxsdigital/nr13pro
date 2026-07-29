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
    avatar: { src: "https://i.pravatar.cc/80?img=11", seed: "carlos" },
    liked: true,
    likes: 142,
  },
  {
    name: "Ana Oliveira",
    handle: "ana.oliveira.manutencao",
    text: "O QR Code foi um divisor de águas. Agora qualquer técnico escaneia e tem todo o histórico da válvula na mão. Simplesmente essencial.",
    time: "7 h",
    avatar: { src: "https://i.pravatar.cc/80?img=5", seed: "ana" },
    liked: false,
    likes: 98,
  },
  {
    name: "Pedro Santos",
    handle: "pedro.eng.seguranca",
    text: "A gestão de prazos de vencimento acabou com nossas não conformidades. O dashboard dá visibilidade total do parque de válvulas.",
    time: "1 d",
    avatar: { src: "https://i.pravatar.cc/80?img=53", seed: "pedro" },
    liked: true,
    likes: 215,
  },
]

function InstagramComment({
  t,
  index,
  prefersReducedMotion,
}: {
  t: (typeof testimonials)[0]
  index: number
  prefersReducedMotion: boolean
}) {
  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-white border border-[#EDE9E3] rounded-xl p-4 sm:p-5"
    >
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#EDE9E3]">
          <img src={t.avatar.src} alt={t.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-sm font-semibold text-[#171717]">{t.name}</span>
            <span className="text-xs text-[#676767]">@{t.handle}</span>
            <span className="text-xs text-[#9E9E9E]">· {t.time}</span>
          </div>
          <p className="text-sm text-[#171717] leading-relaxed mt-0.5">{t.text}</p>
          <div className="flex items-center gap-3 mt-1.5">
            <button className="flex items-center gap-1 text-[#9E9E9E] hover:text-[#C0392B] transition-colors">
              {t.liked ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#C0392B" stroke="#C0392B" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
              )}
              <span className="text-xs text-[#9E9E9E] font-medium">{t.likes}</span>
            </button>
            <button className="text-[#9E9E9E] hover:text-[#171717] transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
            </button>
            <span className="text-[11px] text-[#9E9E9E]">Responder</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Testimonials() {
  const { prefersReducedMotion } = useReducedMotion()

  return (
    <Section
      id="depoimentos"
      title="O que nossos clientes dizem"
      subtitle="Empresas de inspeção que transformaram sua gestão com o NR-13 Pro."
      className="bg-white"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {testimonials.map((t, i) => (
          <InstagramComment
            key={t.name}
            t={t}
            index={i}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
      <div className="text-center mt-4 text-xs text-[#9E9E9E]">
        * Depoimentos ilustrativos baseados em casos reais de clientes.
      </div>
    </Section>
  )
}
