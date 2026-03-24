"use client"

import { useState } from "react"

interface PixelButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  size?: "sm" | "md" | "lg"
  variant?: "primary" | "secondary" | "outline"
  type?: "button" | "submit"
  className?: string
}

export function PixelButton({
  children,
  href,
  onClick,
  size = "md",
  variant = "primary",
  type = "button",
  className = "",
}: PixelButtonProps) {
  const [isPressed, setIsPressed] = useState(false)

  const sizeClasses = {
    sm: "px-4 py-2 text-[10px]",
    md: "px-6 py-3 text-xs",
    lg: "px-8 py-4 text-sm",
  }

  const variantClasses = {
    primary: "bg-foreground text-background hover:bg-pixel-red hover:text-white",
    secondary: "bg-pixel-blue text-white hover:bg-pixel-green",
    outline: "bg-transparent text-foreground border-2 border-foreground hover:bg-foreground hover:text-background",
  }

  const baseClasses = `
    font-[family-name:var(--font-pixel)]
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    inline-block
    transition-all
    duration-100
    cursor-pointer
    relative
    ${isPressed ? "translate-y-1" : ""}
    ${className}
  `

  const shadowClasses = `
    absolute
    inset-0
    translate-x-1
    translate-y-1
    bg-border
    -z-10
    transition-transform
    duration-100
    ${isPressed ? "translate-x-0 translate-y-0" : ""}
  `

  const handleMouseDown = () => setIsPressed(true)
  const handleMouseUp = () => setIsPressed(false)
  const handleMouseLeave = () => setIsPressed(false)

  const content = (
    <>
      <span className={shadowClasses} />
      {children}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className={baseClasses}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ imageRendering: "pixelated" }}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={baseClasses}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{ imageRendering: "pixelated" }}
    >
      {content}
    </button>
  )
}
