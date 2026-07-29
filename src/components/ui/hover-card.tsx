"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/components/sections/motion-provider"

type HoverCardProps = {
  children: React.ReactNode
  className?: string
  as?: "div" | "article"
}

export function HoverCard({ children, className, as: Tag = "div" }: HoverCardProps) {
  const { prefersReducedMotion } = useReducedMotion()

  return (
    <motion.div
      whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.01 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "transition-shadow duration-250 border",
        "hover:shadow-[0_8px_30px_rgba(23,23,23,0.10)]",
        Tag === "div" ? "" : "",
        className,
      )}
    >
      {children}
    </motion.div>
  )
}
