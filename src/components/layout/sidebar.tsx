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
  User,
  Settings2,
  LogOut,
  ChevronDown,
  Bell,
  CreditCard,
} from "lucide-react"
import { SettingsProvider, useSettings } from "@/lib/settings-context"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/clientes", label: "Empresas", icon: Building2 },
  { href: "/equipamentos", label: "Equipamentos", icon: FlaskConical },
  { href: "/inspecoes", label: "Inspeções", icon: ClipboardCheck },
  { href: "/laudos", label: "Laudos Técnicos", icon: FileText },
  { href: "/economia", label: "Economia", icon: TrendingUp },
]

function UserProfile({ collapsed = false }: { collapsed?: boolean }) {
  const profile = useSettings()
  const initials = profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2)

  if (collapsed) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button className="w-full flex justify-center py-2 rounded-lg text-sidebar-foreground/40 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors duration-200">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="bg-primary/20 text-primary text-xs">{initials.toUpperCase()}</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start" className="w-56">
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium text-sidebar-foreground">{profile.name}</p>
            <p className="text-[11px] text-sidebar-foreground-muted">{profile.crea}</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" /> Perfil
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Settings2 className="mr-2 h-4 w-4" /> Configurações
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <CreditCard className="mr-2 h-4 w-4" /> Salvar cartão
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" variant="destructive">
            <LogOut className="mr-2 h-4 w-4" /> Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg hover:bg-sidebar-accent transition-colors duration-150 group">
          <Avatar className="h-7 w-7 shrink-0">
            <AvatarFallback className="bg-primary/20 text-primary text-xs">{initials.toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-left min-w-0">
            <p className="text-xs font-medium text-sidebar-foreground truncate group-hover:text-sidebar-primary transition-colors">{profile.name}</p>
            <p className="text-[10px] text-sidebar-foreground-muted">{profile.crea}</p>
          </div>
          <ChevronDown className="h-3 w-3 shrink-0 text-sidebar-foreground-muted transition-transform group-data-[state=open]:rotate-180" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="w-56" sideOffset={4}>
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium text-sidebar-foreground">{profile.name}</p>
          <p className="text-[11px] text-sidebar-foreground-muted">{profile.crea}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 h-4 w-4" /> Perfil
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Settings2 className="mr-2 h-4 w-4" /> Configurações
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <CreditCard className="mr-2 h-4 w-4" /> Salvar cartão
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" variant="destructive">
          <LogOut className="mr-2 h-4 w-4" /> Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

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

function UserProfile({ collapsed = false }: { collapsed?: boolean }) {
  const initials = profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2)

  if (collapsed) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button className="w-full flex justify-center py-2 rounded-lg text-sidebar-foreground/40 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors duration-200">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="bg-primary/20 text-primary text-xs">{initials}</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start" className="w-56">
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium text-sidebar-foreground">{profile.name}</p>
            <p className="text-[11px] text-sidebar-foreground-muted">{profile.crea}</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" /> Perfil
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer p-0">
            <Link href="/configuracoes" className="flex items-center gap-1.5 px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-7">
              <Settings2 className="mr-2 h-4 w-4" /> Configurações
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer p-0">
            <Link href="/configuracoes" className="flex items-center gap-1.5 px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-7">
              <CreditCard className="mr-2 h-4 w-4" /> Salvar cartão
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" variant="destructive">
            <LogOut className="mr-2 h-4 w-4" /> Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
          <button className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg hover:bg-sidebar-accent transition-colors duration-150 group">
            <Avatar className="h-7 w-7 shrink-0">
              <AvatarFallback className="bg-primary/20 text-primary text-xs">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left min-w-0">
              <p className="text-xs font-medium text-sidebar-foreground truncate group-hover:text-sidebar-primary transition-colors">{profile.name}</p>
              <p className="text-[10px] text-sidebar-foreground-muted">{profile.crea}</p>
            </div>
            <ChevronDown className="h-3 w-3 shrink-0 text-sidebar-foreground-muted transition-transform group-data-[state=open]:rotate-180" />
          </button>
        </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="w-56" sideOffset={4}>
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium text-sidebar-foreground">{profile.name}</p>
          <p className="text-[11px] text-sidebar-foreground-muted">{profile.crea}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 h-4 w-4" /> Perfil
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer p-0">
          <Link href="/configuracoes" className="flex items-center gap-1.5 px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-7">
            <Settings2 className="mr-2 h-4 w-4" /> Configurações
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer p-0">
          <Link href="/configuracoes" className="flex items-center gap-1.5 px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-7">
            <CreditCard className="mr-2 h-4 w-4" /> Salvar cartão
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" variant="destructive">
          <LogOut className="mr-2 h-4 w-4" /> Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
      <div className={cn("border-t border-sidebar-border", collapsed ? "p-2" : "p-3 space-y-1")}>
        <UserProfile collapsed={collapsed} />
        {collapsed ? (
          <button
            onClick={toggle}
            className="w-full flex justify-center py-2 rounded-lg text-sidebar-foreground/40 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors duration-200"
            title="Expandir menu"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <div className="flex items-center justify-between gap-2 px-1">
            <p className="text-[10px] text-sidebar-foreground/30 leading-relaxed">
              NR-13 • Portaria MTb nº 1.846/22
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
  const { profile } = useSettings()

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-lg border-b border-divider">
        <div className="flex items-center justify-between h-14 px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v8M8 12h8"/>
              </svg>
            </div>
            <span className="font-semibold text-sm text-foreground">NR-13 Pro</span>
          </Link>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center text-foreground/50 hover:text-foreground" aria-label="Notificações">
              <Bell className="h-4 w-4" />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
              className="w-8 h-8 flex items-center justify-center text-foreground/50 hover:text-foreground"
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
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-14 left-0 right-0 z-40 bg-surface text-foreground border-b border-divider overflow-hidden shadow-lg"
          >
            <div className="p-3 border-b border-divider">
              <div className="flex items-center gap-2.5">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/20 text-primary text-xs">{profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs font-medium text-foreground">{profile.name}</p>
                  <p className="text-[10px] text-muted-foreground">{profile.crea}</p>
                </div>
              </div>
            </div>
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
