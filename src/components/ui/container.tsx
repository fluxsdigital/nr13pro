type ContainerProps = {
  children: React.ReactNode
  className?: string
  as?: "div" | "section" | "article" | "header" | "footer" | "nav"
}

export function Container({ children, className = "", as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Tag>
  )
}
