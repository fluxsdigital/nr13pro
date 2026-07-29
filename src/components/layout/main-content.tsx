"use client"

import { useSidebar } from "@/lib/sidebar-context"
import { cn } from "@/lib/utils"

export function MainContent({ children }: { children: React.ReactNode }) {
  const { expanded } = useSidebar()

  return (
    <main
      className={cn(
        "flex-1 min-h-screen pt-14 md:pt-0 transition-all duration-300",
        expanded ? "md:ml-64" : "md:ml-16"
      )}
    >
      {children}
    </main>
  )
}
