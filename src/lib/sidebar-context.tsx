"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type SidebarContextValue = {
  expanded: boolean
  toggle: () => void
}

const SidebarContext = createContext<SidebarContextValue>({
  expanded: true,
  toggle: () => {},
})

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-expanded")
    if (saved !== null) setExpanded(saved === "true")
  }, [])

  const toggle = () => {
    setExpanded((prev) => {
      localStorage.setItem("sidebar-expanded", String(!prev))
      return !prev
    })
  }

  return (
    <SidebarContext.Provider value={{ expanded, toggle }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  return useContext(SidebarContext)
}
