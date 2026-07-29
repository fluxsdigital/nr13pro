"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/components/landing/motion-provider"

interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "ghost"
  size?: "default" | "large"
  className?: string
  type?: "button" | "submit"
  target?: string
  rel?: string
}

function ButtonInner({
  children,
  variant = "primary",
  size = "default",
  className,
}: {
  children: React.ReactNode
  variant?: string
  size?: string
  className?: string
}) {
  const sizes = {
    default: "px-5 py-2.5 text-sm",
    large: "px-8 py-4 text-base",
  }

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-hover active:bg-primary-active shadow-sm hover:shadow-md",
    secondary:
      "border border-border bg-white text-text-primary hover:bg-card-hover active:bg-card-hover",
    ghost:
      "text-text-secondary hover:text-text-primary hover:bg-card-hover",
  }

  return (
    <span className={cn(sizes[size as keyof typeof sizes], variants[variant as keyof typeof variants], className)}>
      {children}
    </span>
  )
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "default",
  className,
  type = "button",
  target,
  rel,
}: ButtonProps) {
  const reduced = useReducedMotion()

  const motionProps = reduced
    ? ({} as const)
    : ({
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.97 },
        transition: { type: "spring" as const, stiffness: 500, damping: 25 },
      } as const)

  const base = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer select-none"
  )

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={cn(base, className)}
        {...motionProps}
      >
        <ButtonInner variant={variant} size={size}>
          {children}
        </ButtonInner>
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={cn(base, className)}
      {...motionProps}
    >
      <ButtonInner variant={variant} size={size}>
        {children}
      </ButtonInner>
    </motion.button>
  )
}
