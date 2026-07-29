"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Container } from "@/components/ui/container"
import { SafariMockup } from "./safari-mockup"
import { AnimatedCounter } from "./animated-counter"
import { useReducedMotion } from "./motion-provider"

const badges = [
  "Conforme NR-13",
  "QR Code",
  "PDF Automático",
  "Assinatura Digital",
  "Histórico Completo",
]

export function Hero() {
  const { prefersReducedMotion } = useReducedMotion()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [signedUp, setSignedUp] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password) {
      toast.error("Preencha todos os campos para criar sua conta.")
      return
    }
    if (password.length < 6) {
      toast.error("A senha deve ter no mínimo 6 caracteres.")
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    localStorage.setItem(
      "nr13pro_user",
      JSON.stringify({ name, email, createdAt: new Date().toISOString() }),
    )
    setLoading(false)
    setSignedUp(true)
    toast.success("Conta criada com sucesso! Bem-vindo ao NR-13 Pro.")
  }

  if (signedUp) {
    return (
      <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F5F2] to-white pointer-events-none" />
        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center text-center max-w-lg mx-auto mb-10 sm:mb-14"
          >
            <div className="w-14 h-14 rounded-full bg-[#EDF5ED] flex items-center justify-center mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-medium text-[#171717] tracking-tight">
              Conta criada, {name.split(" ")[0]}!
            </h1>
            <p className="mt-3 text-base text-[#676767] leading-relaxed">
              Enviamos um link de confirmação para <strong className="text-[#171717]">{email}</strong>.
              Acesse sua conta e comece a gerenciar suas inspeções.
            </p>
            <a
              href="/"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors duration-200 cursor-pointer px-7 py-3 text-base bg-[#171717] text-white hover:bg-[#2B2B2B] shadow-sm"
            >
              Acessar Plataforma
            </a>
          </motion.div>
          <SafariMockup />
        </Container>
      </section>
    )
  }

  return (
    <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#F7F5F2] to-white pointer-events-none" />

      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8F0E8] border border-[#E8A96B]/20 text-xs text-[#C56A2D] font-medium mb-4 sm:mb-5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
              Software para Inspeção NR-13
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#171717] tracking-tight leading-[1.1]">
              Inspeção de válvulas
              <br />
              <span className="text-[#C56A2D]">simples, digital e conforme</span>
            </h1>

            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#676767] leading-relaxed max-w-lg">
              Gerencie inspeções, emita laudos técnicos e mantenha o histórico
              completo das suas válvulas — tudo em um só lugar.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-3 max-w-sm">
              <div>
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-white border border-[#D4CFC8] text-sm text-[#171717] placeholder:text-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-white border border-[#D4CFC8] text-sm text-[#171717] placeholder:text-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Crie uma senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-white border border-[#D4CFC8] text-sm text-[#171717] placeholder:text-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
              </div>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="w-full h-11 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-hover active:bg-primary-active transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
              >
                {loading ? "Criando conta..." : "Criar conta gratuita"}
              </motion.button>
            </form>

            <p className="mt-3 text-xs text-[#9E9E9E] max-w-sm">
              Ao criar sua conta, você aceita nossos{" "}
              <a href="#" className="underline underline-offset-2 hover:text-[#676767]">Termos de Uso</a>{" "}
              e{" "}
              <a href="#" className="underline underline-offset-2 hover:text-[#676767]">Política de Privacidade</a>.
              {" "}Sem cartão de crédito.
            </p>

            <div className="flex flex-wrap items-center gap-2 mt-6 sm:mt-8">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-[#EDE9E3] text-xs text-[#676767]"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
          >
            <SafariMockup />
          </motion.div>
        </div>

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-10 sm:mt-14 grid grid-cols-3 gap-6 sm:gap-10 max-w-lg mx-auto"
        >
          {[
            { label: "Clientes", end: 150, suffix: "+" },
            { label: "Válvulas", end: 2400, suffix: "+" },
            { label: "Laudos Emitidos", end: 1800, suffix: "+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-semibold text-[#171717]">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </div>
              <div className="text-xs sm:text-sm text-[#676767] mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
