"use client"

import { Container } from "@/components/landing/container"

const footerLinks = [
  {
    title: "Plataforma",
    links: [
      { label: "Funcionalidades", href: "#funcionalidades" },
      { label: "Como Funciona", href: "#como-funciona" },
      { label: "Preço", href: "#preco" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre", href: "#" },
      { label: "Contato", href: "#demo" },
      { label: "Privacidade", href: "#" },
      { label: "Termos de Uso", href: "#" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "NR-13", href: "#" },
      { label: "Blog", href: "#" },
      { label: "API", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <Container>
        <div className="py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
                N
              </div>
              <span className="text-sm font-semibold tracking-tight text-text-primary">
                NR-13 Pro
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Plataforma completa para gestão de inspeções de válvulas conforme
              a NR-13.
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                {group.title}
              </h4>
              <ul className="mt-4 space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border py-6">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} NR-13 Pro. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-text-muted hover:text-text-primary transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-xs text-text-muted hover:text-text-primary transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="text-xs text-text-muted hover:text-text-primary transition-colors">
              LGPD
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
