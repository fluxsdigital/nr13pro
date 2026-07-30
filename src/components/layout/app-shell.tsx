"use client"

import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { SidebarProvider } from "@/lib/sidebar-context"
import { SettingsProvider } from "@/lib/settings-context"
import { MainContent } from "@/components/layout/main-content"

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const noSidebar = pathname === "/vendas" || pathname === "/checkout" || pathname === "/privacidade" || pathname === "/termos-de-uso" || pathname.startsWith("/certificados/")

  if (noSidebar) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-full">
      <SidebarProvider>
        <SettingsProvider>
          <Sidebar />
        </SettingsProvider>
        <MainContent>{children}</MainContent>
      </SidebarProvider>
    </div>
  )
}
