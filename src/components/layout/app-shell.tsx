"use client"

import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { SidebarProvider } from "@/lib/sidebar-context"
import { MainContent } from "@/components/layout/main-content"

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const noSidebar = pathname === "/vendas" || pathname === "/checkout" || pathname === "/privacidade" || pathname === "/termos-de-uso"

  if (noSidebar) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-full">
      <SidebarProvider>
        <Sidebar />
        <MainContent>{children}</MainContent>
      </SidebarProvider>
    </div>
  )
}
