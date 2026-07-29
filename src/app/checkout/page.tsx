"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Container } from "@/components/ui/container"

export default function CheckoutPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [paid, setPaid] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password) {
      toast.error("Preencha todos os campos.")
      return
    }
    if (password.length < 6) {
      toast.error("A senha deve ter no mínimo 6 caracteres.")
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 2000))
    localStorage.setItem(
      "nr13pro_user",
      JSON.stringify({ name, email, plan: "Mensal", price: 197, createdAt: new Date().toISOString() }),
    )
    setLoading(false)
    setPaid(true)
    toast.success("Assinatura confirmada! Bem-vindo ao NR-13 Pro.")
  }

  if (paid) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-[#F7F5F2]">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 rounded-full bg-[#EDF5ED] flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h1 className="text-2xl font-medium text-[#171717]">Assinatura confirmada!</h1>
          <p className="mt-3 text-base text-[#676767] leading-relaxed">
            Seu plano mensal de <strong className="text-[#171717]">R$ 197/mês</strong> está ativo, {name.split(" ")[0]}.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#2E7D32] bg-[#EDF5ED] px-3 py-1.5 rounded-full mx-auto w-fit">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Cancele quando quiser, sem multa
          </div>
          <a
            href="/"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors duration-200 cursor-pointer px-7 py-3 text-base bg-[#171717] text-white hover:bg-[#2B2B2B] shadow-sm"
          >
            Acessar Plataforma
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-[#F7F5F2] flex items-center justify-center py-16 px-4">
      <Container className="max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <a
            href="/vendas"
            className="inline-flex items-center gap-1.5 text-sm text-[#676767] hover:text-[#171717] transition-colors mb-8"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Voltar
          </a>

          <div className="bg-white border border-[#EDE9E3] rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-7 h-7 rounded-lg bg-[#171717] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v8M8 12h8"/>
                </svg>
              </div>
              <span className="font-semibold text-sm text-[#171717]">NR-13 Pro</span>
            </div>

            <h1 className="text-xl font-medium text-[#171717]">Assinar plano</h1>
            <div className="flex items-baseline gap-1 mt-2 mb-6">
              <span className="text-2xl font-semibold text-[#171717]">R$ 197</span>
              <span className="text-sm text-[#676767]">/mês</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs text-[#676767] mb-1.5">Nome completo</label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-white border border-[#D4CFC8] text-sm text-[#171717] placeholder:text-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-[#676767] mb-1.5">E-mail</label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-white border border-[#D4CFC8] text-sm text-[#171717] placeholder:text-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-[#676767] mb-1.5">Senha</label>
                <input
                  type="password"
                  placeholder="Mínimo 6 caracteres"
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
                className="w-full h-11 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-hover active:bg-primary-active transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm mt-1"
              >
                {loading ? "Processando pagamento..." : "Assinar agora — R$ 197/mês"}
              </motion.button>
            </form>

            <div className="mt-4 flex items-center gap-2 text-xs text-[#2E7D32] bg-[#EDF5ED] px-3 py-1.5 rounded-lg">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Cancele quando quiser, sem multa
            </div>

            <p className="mt-4 text-xs text-[#9E9E9E] leading-relaxed">
              Ao assinar, você aceita nossos{" "}
              <a href="#" className="underline underline-offset-2 hover:text-[#676767]">Termos de Uso</a>{" "}
              e{" "}
              <a href="#" className="underline underline-offset-2 hover:text-[#676767]">Política de Privacidade</a>.
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  )
}
