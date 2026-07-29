import { Container } from "@/components/ui/container"

const footerLinks = {
  Produto: [
    { label: "Funcionalidades", href: "#funcionalidades" },
    { label: "Como Funciona", href: "#como-funciona" },
    { label: "FAQ", href: "#faq" },
  ],
  Legal: [
    { label: "Privacidade", href: "/privacidade" },
    { label: "Termos de Uso", href: "/termos-de-uso" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-[#EDE9E3] bg-white">
      <Container className="py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <a href="/vendas" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-[#171717] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v8M8 12h8"/>
                </svg>
              </div>
              <span className="font-semibold text-sm text-[#171717]">NR-13 Pro</span>
            </a>
            <p className="text-xs text-[#676767] leading-relaxed max-w-xs">
              Software para gestão de inspeção de válvulas conforme NR-13. Laudos técnicos, QR Code e histórico na nuvem.
            </p>
            <div className="flex gap-3 mt-4">
              {["linkedin", "instagram", "youtube", "github"].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="w-8 h-8 rounded-lg bg-[#F7F5F2] flex items-center justify-center text-[#676767] hover:text-[#171717] hover:bg-[#EDE9E3] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold text-[#171717] uppercase tracking-wider mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-[#676767] hover:text-[#171717] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-[#EDE9E3] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#676767]">
            &copy; {new Date().getFullYear()} NR-13 Pro. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a href="/privacidade" className="text-xs text-[#9E9E9E] hover:text-[#676767] transition-colors">Privacidade</a>
            <a href="/termos-de-uso" className="text-xs text-[#9E9E9E] hover:text-[#676767] transition-colors">Termos</a>
            <span className="text-xs text-[#9E9E9E]">Flux Soluções Digitais — CNPJ: 58.440.767/0001-11</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
