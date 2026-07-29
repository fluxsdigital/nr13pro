"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Building2,
  FlaskConical,
  ClipboardCheck,
  FileText,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/lib/sidebar-context"

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/clientes", label: "Empresas", icon: Building2 },
  { href: "/equipamentos", label: "Equipamentos", icon: FlaskConical },
  { href: "/inspecoes", label: "Inspeções", icon: ClipboardCheck },
  { href: "/laudos", label: "Laudos Técnicos", icon: FileText },
  { href: "/economia", label: "Economia", icon: TrendingUp },
]

function NavItems({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname()
  return (
    <>
      {links.map((link) => {
        const Icon = link.icon
        const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              collapsed ? "justify-center" : "",
              isActive
                ? "bg-sidebar-primary/10 text-sidebar-primary shadow-sm"
                : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            )}
            title={collapsed ? link.label : undefined}
          >
            {isActive && !collapsed && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-sidebar-primary" />
            )}
            <Icon className={cn("h-4 w-4 shrink-0", isActive && "text-sidebar-primary")} />
            {!collapsed && link.label}
          </Link>
        )
      })}
    </>
  )
}

function SidebarContent({ collapsed = false }: { collapsed?: boolean }) {
  const { toggle } = useSidebar()
  return (
    <>
      <div className={cn("p-4 border-b border-sidebar-border", collapsed ? "flex justify-center" : "")}>
        <div className={cn("flex items-center gap-2.5", collapsed && "flex-col")}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0 shadow-sm">
            N
          </div>
          {!collapsed && (
            <div className="truncate">
              <h1 className="font-semibold text-sm tracking-tight text-sidebar-foreground">NR-13 Pro</h1>
              <p className="text-[11px] text-sidebar-foreground/50 truncate">Gestão de Inspeções</p>
            </div>
          )}
        </div>
      </div>
      <nav className={cn("flex-1 overflow-y-auto", collapsed ? "p-2 space-y-1" : "p-3 space-y-0.5")}>
        {!collapsed && (
          <p className="px-3 py-2 text-[11px] font-medium text-sidebar-foreground/40 uppercase tracking-widest">
            Menu
          </p>
        )}
        <NavItems collapsed={collapsed} />
      </nav>
      <div className={cn("border-t border-sidebar-border", collapsed ? "p-2" : "p-4")}>
        {collapsed ? (
          <button
            onClick={toggle}
            className="w-full flex justify-center py-2 rounded-lg text-sidebar-foreground/40 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors duration-200"
            title="Expandir menu"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] text-sidebar-foreground/30 leading-relaxed">
              NR-13 • Portaria MTb nº 1.846/22<br />
              Conformidade de Equipamentos
            </p>
            <button
              onClick={toggle}
              className="shrink-0 p-1.5 rounded-lg text-sidebar-foreground/40 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors duration-200"
              title="Recolher menu"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { expanded } = useSidebar()

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-[#EDE9E3]">
        <div className="flex items-center justify-between h-14 px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#171717] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v8M8 12h8"/>
              </svg>
            </div>
            <span className="font-semibold text-sm text-[#171717]">NR-13 Pro</span>
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            className="w-8 h-8 flex items-center justify-center text-[#676767]"
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
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-14 left-0 right-0 z-40 bg-sidebar text-sidebar-foreground border-b border-sidebar-border overflow-hidden shadow-lg"
          >
            <nav className="p-3 space-y-0.5">
              <NavItems />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <aside
        className={cn(
          "hidden md:flex bg-sidebar text-sidebar-foreground flex-col h-screen fixed left-0 top-0 border-r border-sidebar-border transition-all duration-300 ease-out",
          expanded ? "w-64" : "w-16"
        )}
      >
        <SidebarContent collapsed={!expanded} />
      </aside>
    </>
  )
}
