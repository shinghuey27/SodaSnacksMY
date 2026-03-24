"use client"

import { useState } from "react"

export interface PixelCardProps {
  children: React.ReactNode
  variant?: "default" | "featured" | "compact"
  accentColor?: "red" | "yellow" | "green" | "blue"
  className?: string
  onClick?: () => void
  href?: string
}

const accentColors = {
  red: "hover:border-pixel-red hover:shadow-[8px_8px_0_0_var(--pixel-red)]",
  yellow: "hover:border-pixel-yellow hover:shadow-[8px_8px_0_0_var(--pixel-yellow)]",
  green: "hover:border-pixel-green hover:shadow-[8px_8px_0_0_var(--pixel-green)]",
  blue: "hover:border-pixel-blue hover:shadow-[8px_8px_0_0_var(--pixel-blue)]",
}

const variantStyles = {
  default: "p-6",
  featured: "p-0",
  compact: "p-4",
}

export function PixelCard({
  children,
  variant = "default",
  accentColor = "blue",
  className = "",
  onClick,
  href,
}: PixelCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const baseClasses = `
    bg-card 
    border-4 
    border-foreground 
    shadow-[4px_4px_0_0_rgba(0,0,0,0.1)]
    transition-all
    duration-200
    ${accentColors[accentColor]}
    ${variantStyles[variant]}
    ${isHovered ? "-translate-y-1" : ""}
    ${onClick || href ? "cursor-pointer" : ""}
    ${className}
  `

  const content = (
    <div
      className={baseClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {children}
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return content
}

// Card header with pixel window controls
export interface PixelCardHeaderProps {
  title?: string
  subtitle?: string
  showControls?: boolean
}

export function PixelCardHeader({ title, subtitle, showControls = true }: PixelCardHeaderProps) {
  return (
    <div className="border-b-4 border-foreground p-4 md:p-6 flex items-center gap-4">
      {showControls && (
        <div className="flex gap-1.5">
          <div className="w-3 h-3 bg-pixel-red" />
          <div className="w-3 h-3 bg-pixel-yellow" />
          <div className="w-3 h-3 bg-pixel-green" />
        </div>
      )}
      {(title || subtitle) && (
        <div className="flex-1">
          {subtitle && (
            <span className="font-[family-name:var(--font-pixel)] text-[10px] text-muted-foreground block">
              {subtitle}
            </span>
          )}
          {title && (
            <span className="font-[family-name:var(--font-pixel)] text-xs text-foreground">
              {title}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

// Card body wrapper
export interface PixelCardBodyProps {
  children: React.ReactNode
  className?: string
}

export function PixelCardBody({ children, className = "" }: PixelCardBodyProps) {
  return (
    <div className={`p-4 md:p-6 ${className}`}>
      {children}
    </div>
  )
}

// Pixel badge/tag component
export interface PixelBadgeProps {
  children: React.ReactNode
  variant?: "default" | "filled"
  color?: "red" | "yellow" | "green" | "blue" | "neutral"
}

const badgeColors = {
  red: {
    default: "border-pixel-red text-pixel-red",
    filled: "bg-pixel-red text-white border-pixel-red",
  },
  yellow: {
    default: "border-pixel-yellow text-pixel-yellow",
    filled: "bg-pixel-yellow text-foreground border-pixel-yellow",
  },
  green: {
    default: "border-pixel-green text-pixel-green",
    filled: "bg-pixel-green text-white border-pixel-green",
  },
  blue: {
    default: "border-pixel-blue text-pixel-blue",
    filled: "bg-pixel-blue text-white border-pixel-blue",
  },
  neutral: {
    default: "border-border text-muted-foreground",
    filled: "bg-secondary text-secondary-foreground border-border",
  },
}

export function PixelBadge({ children, variant = "default", color = "neutral" }: PixelBadgeProps) {
  return (
    <span
      className={`
        inline-block
        px-3 
        py-1.5 
        text-xs 
        border-2
        font-medium
        ${badgeColors[color][variant]}
      `}
    >
      {children}
    </span>
  )
}
