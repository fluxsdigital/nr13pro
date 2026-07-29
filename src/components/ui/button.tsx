"use client"

import { forwardRef } from "react"
import { motion } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary-hover active:bg-primary-active shadow-sm",
        secondary: "bg-secondary text-text-primary hover:bg-secondary-hover border border-border",
        ghost: "text-text-secondary hover:text-text-primary hover:bg-card-hover",
        outline: "border border-border bg-transparent text-text-primary hover:bg-card-hover",
        default: "bg-primary text-white hover:bg-primary-hover shadow-sm",
        destructive: "bg-danger text-white hover:opacity-90 shadow-sm",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5 text-sm",
        lg: "px-7 py-3 text-base",
        default: "px-5 py-2.5 text-sm",
        icon: "h-9 w-9",
        "icon-sm": "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)

type ButtonProps = VariantProps<typeof buttonVariants> & {
  children?: React.ReactNode
  className?: string
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  "data-day"?: string
  form?: string
  value?: string | number | readonly string[]
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, size, className, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
        className={cn(buttonVariants({ variant, size }), className)}
        {...(props as Record<string, unknown>)}
      >
        {children}
      </motion.button>
    )
  },
)
Button.displayName = "Button"
