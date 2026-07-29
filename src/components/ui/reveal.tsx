"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/components/sections/motion-provider"

type RevealProps = {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: "h1" | "h2" | "h3" | "div" | "p"
}

export function Reveal({ children, delay = 0, className, as: Tag = "div" }: RevealProps) {
  const { prefersReducedMotion } = useReducedMotion()

  if (prefersReducedMotion) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay }}
    >
      <Tag className={className}>{children}</Tag>
    </motion.div>
  )
}
