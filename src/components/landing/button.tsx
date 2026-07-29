import { cn } from "@/lib/utils"
import Link from "next/link"

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
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"

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

  const classes = cn(base, sizes[size], variants[variant], className)

  if (href) {
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
