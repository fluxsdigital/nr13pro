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
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
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
            {isActive && (
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
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sidebar-primary to-blue-500 flex items-center justify-center text-sidebar-primary-foreground text-sm font-bold shrink-0 shadow-sm">
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
  const [open, setOpen] = useState(false)
  const { expanded } = useSidebar()

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <div className="fixed top-3 left-3 z-50 md:hidden flex items-center justify-center h-9 w-9 rounded-lg border border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm cursor-pointer">
            <Menu className="h-4 w-4 text-slate-700" />
            <span className="sr-only">Abrir menu</span>
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-sidebar text-sidebar-foreground border-sidebar-border">
          <SidebarContent collapsed={false} />
        </SheetContent>
      </Sheet>

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
