"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { SidebarProvider } from "@/lib/sidebar-context"
import { SettingsProvider } from "@/lib/settings-context"
import { AuthProvider, useAuth } from "@/lib/auth-context"
import { NotificationProvider } from "@/lib/notification-context"
import { MainContent } from "@/components/layout/main-content"

const publicRoutes = ["/vendas", "/checkout", "/login", "/cadastro", "/privacidade", "/termos-de-uso"]
const publicPrefixes = ["/certificados/"]

const authExceptions = ["/vendas", "/checkout", "/login", "/cadastro", "/privacidade", "/termos-de-uso"]

function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, isLoading, checkSession } = useAuth()

  const isPublic = authExceptions.includes(pathname) || authExceptions.some((p) => pathname.startsWith(p))

  useEffect(() => {
    checkSession()
  }, [checkSession])

  useEffect(() => {
    if (isLoading) return
    if (!isPublic && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, isPublic, router])

  if (isLoading && !isPublic) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-primary-foreground text-sm font-bold shadow-sm">
            N
          </div>
          <p className="text-sm text-text-secondary">Carregando...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

function AppContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const noSidebar = publicRoutes.includes(pathname) || publicPrefixes.some((p) => pathname.startsWith(p))

  if (noSidebar) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-full">
      <SidebarProvider>
        <NotificationProvider>
          <SettingsProvider>
            <Sidebar />
          </SettingsProvider>
          <MainContent>{children}</MainContent>
        </NotificationProvider>
      </SidebarProvider>
    </div>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthGuard>
        <AppContent>
          {children}
        </AppContent>
      </AuthGuard>
    </AuthProvider>
  )
}
