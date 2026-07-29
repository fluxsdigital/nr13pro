"use client"

import { useState } from "react"
import {
  ArrowRight,
  Check,
  ChevronDown,
  ClipboardCheck,
  FileText,
  FlaskConical,
  Globe,
  Hammer,
  Image,
  Layers,
  MapPin,
  Menu,
  Phone,
  QrCode,
  Shield,
  Users,
  Wifi,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

const problems = [
  {
    icon: FileText,
    title: "Erros Manuais nas Inspeções",
    desc: "Inspeções em papel estão sujeitas a perda de dados, anotações ilegíveis e informações incorretas. O NR-13 Pro automatiza a coleta e elimina retrabalho.",
  },
  {
    icon: ClipboardCheck,
    title: "Geração de Relatórios Lenta",
    desc: "Criar e organizar laudos finais consome horas ou dias no escritório. Gere relatórios instantâneos com fotos e dados diretamente do campo.",
  },
  {
    icon: Wifi,
    title: "Falta de Conectividade em Campo",
    desc: "Áreas industriais remotas sem internet não podem parar. Funcionamento offline total com sincronização em um clique quando conectar.",
  },
  {
    icon: Layers,
    title: "Gestão Ineficiente de Ativos",
    desc: "Gerenciar prontuários de dezenas de vasos de pressão vira um pesadelo. Painel centralizado com histórico completo de cada equipamento.",
  },
]

const featuresBpm = [
  { icon: ClipboardCheck, title: "Coleta de dados automatizada", desc: "Simplifique a inspeção com coleta automática de dados diretamente no campo." },
  { icon: FileText, title: "Geração de relatórios", desc: "Relatórios gerados instantaneamente a partir das coletas, prontos para validação técnica." },
  { icon: Wifi, title: "Funcionamento offline", desc: "Inspecione mesmo em locais isolados. Sincronização em um clique posterior." },
  { icon: Image, title: "Fotos nas inspeções", desc: "Anexe registros fotográficos organizados e vinculados a cada item do relatório." },
  { icon: MapPin, title: "Geolocalização", desc: "Registro automático de coordenadas GPS de cada equipamento inspecionado." },
  { icon: QrCode, title: "QR Code por ativo", desc: "Identificação única por QR Code para acesso rápido ao prontuário em campo." },
]

const featuresGtd = [
  { icon: Globe, title: "Painel web centralizado", desc: "Acompanhe a conformidade e status de todos os equipamentos da planta em tempo real." },
  { icon: Users, title: "Equipe multi-nível", desc: "Inspetor coleta, engenheiro valida, gestor acompanha. Permissões granulares." },
  { icon: ClipboardCheck, title: "Histórico completo", desc: "Timeline dinâmica com histórico completo de inspeções, medições e auditorias." },
  { icon: Shield, title: "Conformidade NR-13", desc: "Formulários dinâmicos atualizados com as últimas resoluções do MTE." },
]

const testimonials = [
  {
    name: "João Mendes",
    role: "Engenheiro de Segurança do Trabalho",
    text: "O NR-13 Pro transformou nossa rotina de inspeções. A geração automática de relatórios economiza horas e elimina erros manuais. Agora temos certeza de estar sempre em conformidade.",
  },
  {
    name: "Mariana Souza",
    role: "Coordenadora de Manutenção",
    text: "Gerenciar a documentação dos nossos ativos sempre foi um desafio. Com o painel web, tudo está centralizado e o acesso é rápido. Recomendo para qualquer empresa.",
  },
  {
    name: "Carlos Almeida",
    role: "Diretor de Operações",
    text: "A inspeção offline foi um divisor de águas. Mesmo em locais sem conexão, continuamos o trabalho e sincronizamos depois. Produtividade aumentou significativamente.",
  },
]

const faqs = [
  { q: "O que é o NR-13 Pro?", a: "O NR-13 Pro é uma plataforma completa para gestão de conformidade NR-13. Substitui planilhas e papel por um sistema digital que automatiza inspeções, gera laudos técnicos instantâneos e centraliza a documentação dos seus equipamentos." },
  { q: "Como o NR-13 Pro garante a conformidade com a NR-13?", a: "Nossos formulários são dinâmicos e seguem rigorosamente as últimas resoluções do MTE. A classificação de vasos, caldeiras e tubulações segue a matriz de categoria NR-13 automaticamente." },
  { q: "Funciona offline?", a: "Sim. O inspetor pode realizar toda a coleta em campo sem internet. Ao reconectar, a sincronização é feita em um clique." },
  { q: "Como é feita a proteção dos dados?", a: "Todos os dados são armazenados com criptografia de ponta em servidores de alta disponibilidade. O acesso é controlado por níveis de permissão." },
  { q: "É possível incluir fotos nos laudos?", a: "Sim. Fotos são anexadas diretamente durante a inspeção e aparecem organizadas no relatório final." },
  { q: "Precisa de treinamento para usar?", a: "A interface foi projetada para ser intuitiva. Oferecemos onboarding guiado e suporte contínuo." },
]

function AccordionItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-card-hover"
      >
        <span className="text-sm font-medium text-text-primary">{q}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-text-muted transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          open ? "max-h-96 pb-5" : "max-h-0"
        )}
      >
        <p className="px-6 text-sm text-text-secondary leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

export default function VendasPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-dvh bg-background text-text-primary">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
              N
            </div>
            <span className="text-sm font-semibold tracking-tight">NR-13 Pro</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {[
              { label: "Problemas", href: "problemas" },
              { label: "Funcionalidades", href: "funcionalidades" },
              { label: "Segurança", href: "seguranca" },
              { label: "Preço", href: "preco" },
              { label: "FAQ", href: "faq" },
            ].map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <a
            href="https://wa.me/5519992232149?text=Olá!%20Quero%20saber%20mais%20sobre%20o%20NR-13%20Pro"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            <Phone className="h-4 w-4" />
            Fale Conosco
          </a>
          <button
            className="md:hidden p-2 text-text-secondary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="border-t border-border bg-background md:hidden">
            <div className="space-y-1 px-4 py-3">
              {[
                { label: "Problemas", href: "problemas" },
                { label: "Funcionalidades", href: "funcionalidades" },
                { label: "Segurança", href: "seguranca" },
                { label: "Preço", href: "preco" },
                { label: "FAQ", href: "faq" },
              ].map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="block w-full rounded-lg px-3 py-2 text-left text-sm text-text-secondary hover:bg-card-hover transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="https://wa.me/5519992232149"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
              >
                <Phone className="h-4 w-4" />
                Fale Conosco
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-subtle to-transparent" />
          <div className="relative mx-auto max-w-5xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-text-secondary">
              <Shield className="h-3.5 w-3.5" />
              Conformidade NR-13 Total
            </span>
            <h1 className="mt-6 font-serif text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.1] tracking-tight text-text-primary">
              O melhor Software para{" "}
              <span className="text-primary">Inspeção e Laudos NR-13</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              Colete dados em campo offline, tire fotos integradas e gere laudos
              instantâneos em conformidade com as normas vigentes. Produtividade
              máxima para inspetores de vasos de pressão.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="https://wa.me/5519992232149?text=Olá!%20Quero%20assinar%20o%20NR-13%20Pro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
              >
                Assinar Agora — R$ 179/mês
                <ArrowRight className="h-4 w-4" />
              </a>
              <button
                onClick={() => scrollTo("funcionalidades")}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium text-text-primary transition-colors hover:bg-card-hover"
              >
                Ver Funcionalidades
              </button>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-xs text-text-muted">
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-success" /> Licença padrão p/ 2 usuários
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-success" /> Funcionamento Offline
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-success" /> Fotos na Inspeção
              </span>
            </div>
          </div>
        </section>

        {/* PROBLEMAS */}
        <section id="problemas" className="border-b border-border py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
                O Problema que Solucionamos
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                Processos manuais e relatórios obsoletos custam tempo, geram multas
                e comprometem a integridade mecânica.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {problems.map((p) => (
                <div key={p.title} className="rounded-xl border border-border bg-card p-6 transition-colors hover:bg-card-hover">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-subtle">
                    <p.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FUNCIONALIDADES */}
        <section id="funcionalidades" className="border-b border-border py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
                Recursos & Funcionalidades
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                Tecnologia integrada para o trabalho de campo do inspetor e para a
                gestão geral dos ativos em conformidade.
              </p>
            </div>

            {/* Módulo BPM */}
            <div className="mt-12">
              <div className="mb-6 flex items-center gap-3">
                <span className="rounded-full bg-primary-subtle px-3 py-1 text-xs font-semibold text-primary">
                  MÓDULO BPM
                </span>
                <span className="text-sm text-text-secondary">Inspeção em Campo</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {featuresBpm.map((f) => (
                  <div key={f.title} className="rounded-xl border border-border bg-card p-5 transition-colors hover:bg-card-hover">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-subtle">
                      <f.icon className="h-4.5 w-4.5 text-primary" />
                    </div>
                    <h3 className="mt-3 text-sm font-semibold">{f.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Módulo GTD */}
            <div className="mt-10">
              <div className="mb-6 flex items-center gap-3">
                <span className="rounded-full bg-primary-subtle px-3 py-1 text-xs font-semibold text-primary">
                  MÓDULO GTD
                </span>
                <span className="text-sm text-text-secondary">Gestão de Ativos</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {featuresGtd.map((f) => (
                  <div key={f.title} className="rounded-xl border border-border bg-card p-5 transition-colors hover:bg-card-hover">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-subtle">
                      <f.icon className="h-4.5 w-4.5 text-primary" />
                    </div>
                    <h3 className="mt-3 text-sm font-semibold">{f.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* APP PREVIEW */}
        <section className="border-b border-border py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
                Design do Aplicativo
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                Interface moderna e intuitiva — do campo ao laudo em minutos.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Inspeção Mobile", desc: "Interface otimizada para coleta de medições e ensaios em campo." },
                { label: "Painel Web", desc: "Central de operações para acompanhar a conformidade dos equipamentos." },
                { label: "Laudos Automáticos", desc: "Relatórios preenchidos no campo prontos para emissão do PDF oficial." },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center rounded-xl border border-border bg-card p-8 text-center transition-colors hover:bg-card-hover">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-subtle">
                    <FlaskConical className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold">{item.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEGURANÇA */}
        <section id="seguranca" className="border-b border-border py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
                Segurança e Conformidade em Primeiro Lugar
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                Proteção de dados e dupla validação para total tranquilidade.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Shield, title: "Proteção de Dados", desc: "Criptografia de ponta e redundância total em servidores de alta disponibilidade." },
                { icon: Users, title: "Dupla Validação", desc: "Inspetor coleta, engenheiro valida digitalmente antes da exportação final." },
                { icon: ClipboardCheck, title: "Conformidade NR-13", desc: "Formulários dinâmicos atualizados com as últimas resoluções do MTE." },
                { icon: Globe, title: "Acesso Seguro Web", desc: "Múltiplos níveis de permissão: administrador, engenheiro ou leitor convidado." },
              ].map((s) => (
                <div key={s.title} className="rounded-xl border border-border bg-card p-5 text-center transition-colors hover:bg-card-hover">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-primary-subtle">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PREÇO */}
        <section id="preco" className="border-b border-border py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mx-auto max-w-lg">
              <div className="rounded-2xl border-2 border-primary bg-card p-8 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-text-secondary">
                  Plano Mensal Recorrente
                </span>
                <div className="mt-6">
                  <span className="text-4xl font-semibold tracking-tight">R$ 179</span>
                  <span className="text-sm text-text-secondary"> /mês</span>
                </div>
                <ul className="mt-6 space-y-3 text-left">
                  {[
                    "Licença padrão: até 2 usuários",
                    "Inspeção offline ilimitada",
                    "Laudos ilimitados",
                    "Painel web de gestão",
                    "Fotos integradas aos laudos",
                    "Suporte prioritário",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/5519992232149?text=Olá!%20Quero%20assinar%20o%20NR-13%20Pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
                >
                  Assinar Agora
                  <ArrowRight className="h-4 w-4" />
                </a>
                <p className="mt-4 text-xs text-text-muted">
                  Cancele a qualquer momento. Para planos corporativos, fale conosco.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section className="border-b border-border py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
                Depoimentos de Quem Usa
              </h2>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {testimonials.map((t) => (
                <div key={t.name} className="rounded-xl border border-border bg-card p-6 transition-colors hover:bg-card-hover">
                  <div className="flex gap-1 text-primary">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary">&ldquo;{t.text}&rdquo;</p>
                  <div className="mt-4 border-t border-border pt-4">
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-text-muted">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-b border-border py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
                Perguntas Frequentes
              </h2>
            </div>
            <div className="mt-8 divide-y divide-border rounded-xl border border-border bg-card">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  q={faq.q}
                  a={faq.a}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA WHATSAPP */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-success-subtle">
              <Phone className="h-7 w-7 text-success" />
            </div>
            <h2 className="mt-5 font-serif text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
              Fale Conosco
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-text-secondary">
              Dúvidas comerciais, planos corporativos, suporte técnico — nosso
              atendimento é rápido, prático e humanizado.
            </p>
            <a
              href="https://wa.me/5519992232149?text=Olá!%20Estou%20no%20site%20do%20NR-13%20Pro%20e%20gostaria%20de%20tirar%20uma%20dúvida."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
            >
              Conversar no WhatsApp
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border bg-card py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-[11px] font-bold text-white">
                N
              </div>
              <span className="text-sm font-semibold tracking-tight">NR-13 Pro</span>
            </div>
            <p className="text-xs text-text-muted">
              © 2026 NR-13 Pro. Conformidade de Equipamentos.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
