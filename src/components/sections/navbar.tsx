"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "@/components/ui/container"
import { useReducedMotion } from "./motion-provider"

const links = [
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Como Funciona", href: "#como-funciona" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { prefersReducedMotion } = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    const el = document.querySelector(id)
    el?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg border-b border-[#EDE9E3] shadow-[0_1px_3px_rgba(23,23,23,0.04)]"
          : "bg-transparent"
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between h-16 sm:h-18">
          <a href="/vendas" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#171717] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v8M8 12h8"/>
              </svg>
            </div>
            <span className="font-semibold text-sm text-[#171717]">NR-13 Pro</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm text-[#676767] hover:text-[#171717] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <a
              href="/checkout"
              className="inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors duration-200 cursor-pointer px-4 py-2 text-sm bg-primary text-white hover:bg-primary-hover active:bg-primary-active shadow-sm"
            >
              Assinar Agora
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            className="md:hidden w-8 h-8 flex items-center justify-center text-[#676767]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {mobileOpen ? (
                <>
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </>
              ) : (
                <>
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, height: 0 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, height: "auto" }}
            exit={prefersReducedMotion ? {} : { opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-[#EDE9E3] overflow-hidden"
          >
            <Container className="py-4 flex flex-col gap-3">
              {links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm text-[#676767] hover:text-[#171717] py-2 transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="/checkout"
                className="inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors duration-200 cursor-pointer w-full px-4 py-2.5 text-sm bg-primary text-white hover:bg-primary-hover shadow-sm mt-2"
              >
                Assinar Agora
              </a>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
