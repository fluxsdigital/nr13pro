"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  LayoutDashboard,
  Building2,
  FlaskConical,
  ClipboardCheck,
  FileText,
  TrendingUp,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/clientes", label: "Empresas", icon: Building2 },
  { href: "/equipamentos", label: "Equipamentos", icon: FlaskConical },
  { href: "/inspecoes", label: "Inspeções", icon: ClipboardCheck },
  { href: "/laudos", label: "Laudos Técnicos", icon: FileText },
  { href: "/economia", label: "Economia", icon: TrendingUp },
]

function NavItems() {
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
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-sidebar-primary/10 text-sidebar-primary shadow-sm border border-sidebar-primary/15"
                : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            )}
          >
            <Icon className={cn("h-4 w-4 shrink-0", isActive && "text-sidebar-primary")} />
            {link.label}
          </Link>
        )
      })}
    </>
  )
}

function SidebarContent() {
  return (
    <>
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground text-sm font-bold shrink-0">
            N
          </div>
          <div>
            <h1 className="font-semibold text-sm tracking-tight">NR-13 Pro</h1>
            <p className="text-[11px] text-sidebar-foreground/50">Gestão de Inspeções</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        <p className="px-3 py-2 text-[11px] font-medium text-sidebar-foreground/40 uppercase tracking-widest">
          Menu
        </p>
        <NavItems />
      </nav>
      <div className="p-4 border-t border-sidebar-border">
        <p className="text-[11px] text-sidebar-foreground/30 leading-relaxed">
          NR-13 • Portaria MTb nº 1.846/22<br />
          Conformidade de Equipamentos
        </p>
      </div>
    </>
  )
}

export function Sidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile toggle button */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <div className="fixed top-3 left-3 z-50 md:hidden flex items-center justify-center h-9 w-9 rounded-lg border border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm cursor-pointer">
            <Menu className="h-4 w-4 text-slate-700" />
            <span className="sr-only">Abrir menu</span>
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-sidebar text-sidebar-foreground border-sidebar-border">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 bg-sidebar text-sidebar-foreground flex-col h-screen fixed left-0 top-0 border-r border-sidebar-border">
        <SidebarContent />
      </aside>
    </>
  )
}
