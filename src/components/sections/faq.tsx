"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Section } from "./section"
import { useReducedMotion } from "./motion-provider"

const faqs = [
  {
    question: "O que é o NR-13 Pro?",
    answer: "O NR-13 Pro é um software SaaS completo para gestão de inspeção de válvulas de segurança e demais equipamentos sujeitos à NR-13. Ele permite cadastrar válvulas, realizar inspeções com checklist digital, emitir laudos técnicos em PDF com assinatura digital e manter todo o histórico organizado na nuvem.",
  },
  {
    question: "Preciso instalar algum software?",
    answer: "Não. O NR-13 Pro é 100% online, acessível pelo navegador. Funciona em qualquer dispositivo com internet: computador, tablet ou celular. Não há instalação ou manutenção de servidores.",
  },
  {
    question: "O sistema funciona offline?",
    answer: "Sim, o aplicativo mobile permite realizar inspeções offline. As informações são sincronizadas automaticamente quando o dispositivo reconectar à internet.",
  },
  {
    question: "Os laudos emitidos são válidos para a NR-13?",
    answer: "Sim. Os laudos seguem as diretrizes da NR-13 e incluem todos os campos obrigatórios: identificação do equipamento, dados do inspetor, data, resultados e assinatura digital. Consulte sempre o órgão regulador para requisitos específicos do seu segmento.",
  },
  {
    question: "Como funciona o QR Code?",
    answer: "Cada válvula cadastrada recebe um QR Code único. Você pode imprimir etiquetas adesivas e fixá-las nos equipamentos. Ao escanear com o celular, o inspetor acessa instantaneamente o histórico completo, documentos e pode iniciar uma nova inspeção.",
  },
  {
    question: "É possível emitir laudos com assinatura digital?",
    answer: "Sim. O sistema gera laudos em PDF com campo para assinatura digital do inspetor responsável. A assinatura segue os padrões ICP-Brasil e tem validade jurídica.",
  },
  {
    question: "Quantos usuários podem usar o sistema?",
    answer: "O número de usuários varia conforme o plano contratado. Trabalhamos com planos desde equipes pequenas (até 5 usuários) até planos corporativos com usuários ilimitados. Entre em contato para conhecer as opções.",
  },
  {
    question: "O sistema envia notificações de vencimento?",
    answer: "Sim. O NR-13 Pro envia alertas automáticos por e-mail e notificações no sistema sobre inspeções próximas ao vencimento. Você pode configurar a antecedência dos alertas.",
  },
  {
    question: "Como importar dados de válvulas já cadastradas?",
    answer: "Oferecemos importação em lote via planilha CSV ou Excel. Nossa equipe de suporte auxilia na migração dos dados durante o onboarding. Entre em contato para mais detalhes.",
  },
  {
    question: "O sistema armazena os dados com segurança?",
    answer: "Sim. Os dados são armazenados em servidores criptografados com certificação ISO 27001. Seguimos a LGPD e todos os dados são tratados com sigilo e segurança. Fazemos backup diário automático.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { prefersReducedMotion } = useReducedMotion()

  return (
    <Section
      id="faq"
      title="Perguntas frequentes"
      subtitle="Tire suas dúvidas sobre o NR-13 Pro."
    >
      <div className="max-w-2xl mx-auto space-y-2">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="border border-[#EDE9E3] rounded-lg overflow-hidden bg-white"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
              className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-[#F7F5F2]"
            >
              <span className="text-sm font-medium text-[#171717] pr-4">{faq.question}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#676767] flex-shrink-0 transition-transform duration-200"
                style={{ transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                  animate={prefersReducedMotion ? {} : { height: "auto", opacity: 1 }}
                  exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="px-4 pb-4 text-sm text-[#676767] leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
