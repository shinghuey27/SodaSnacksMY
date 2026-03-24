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
  const [isHovered, setIsHovered] = useState(false)

  const sizeConfig = {
    sm: { px: 16, py: 8, fontSize: "9px", pixel: 2 },
    md: { px: 24, py: 12, fontSize: "11px", pixel: 3 },
    lg: { px: 32, py: 16, fontSize: "13px", pixel: 4 },
  }

  const variantColors = {
    primary: {
      bg: "var(--foreground)",
      text: "var(--background)",
      hoverBg: "var(--pixel-red)",
      hoverText: "#ffffff",
      shadow: "var(--pixel-yellow)",
      hoverShadow: "var(--pixel-green)",
      outline: "var(--pixel-blue)",
    },
    secondary: {
      bg: "var(--pixel-blue)",
      text: "#ffffff",
      hoverBg: "var(--pixel-green)",
      hoverText: "#ffffff",
      shadow: "var(--pixel-yellow)",
      hoverShadow: "var(--pixel-red)",
      outline: "var(--pixel-yellow)",
    },
    outline: {
      bg: "transparent",
      text: "var(--foreground)",
      hoverBg: "var(--foreground)",
      hoverText: "var(--background)",
      shadow: "var(--border)",
      hoverShadow: "var(--pixel-yellow)",
      outline: "var(--foreground)",
    },
  }

  const config = sizeConfig[size]
  const colors = variantColors[variant]
  const p = config.pixel // pixel size unit

  const handleMouseDown = () => setIsPressed(true)
  const handleMouseUp = () => setIsPressed(false)
  const handleMouseLeave = () => {
    setIsPressed(false)
    setIsHovered(false)
  }
  const handleMouseEnter = () => setIsHovered(true)

  // Create more pronounced pixel-style button with jagged/stepped corners
  // This creates a more authentic 8-bit look with multiple step levels
  const pixelClipPath = `polygon(
    ${p * 2}px 0,
    calc(100% - ${p * 2}px) 0,
    calc(100% - ${p * 2}px) ${p}px,
    calc(100% - ${p}px) ${p}px,
    calc(100% - ${p}px) ${p * 2}px,
    100% ${p * 2}px,
    100% calc(100% - ${p * 2}px),
    calc(100% - ${p}px) calc(100% - ${p * 2}px),
    calc(100% - ${p}px) calc(100% - ${p}px),
    calc(100% - ${p * 2}px) calc(100% - ${p}px),
    calc(100% - ${p * 2}px) 100%,
    ${p * 2}px 100%,
    ${p * 2}px calc(100% - ${p}px),
    ${p}px calc(100% - ${p}px),
    ${p}px calc(100% - ${p * 2}px),
    0 calc(100% - ${p * 2}px),
    0 ${p * 2}px,
    ${p}px ${p * 2}px,
    ${p}px ${p}px,
    ${p * 2}px ${p}px
  )`

  const buttonStyle: React.CSSProperties = {
    fontFamily: "var(--font-pixel)",
    fontSize: config.fontSize,
    padding: `${config.py}px ${config.px}px`,
    backgroundColor: isHovered ? colors.hoverBg : colors.bg,
    color: isHovered ? colors.hoverText : colors.text,
    clipPath: pixelClipPath,
    transform: isPressed ? `translateY(${p}px)` : "translateY(0)",
    transition: "transform 100ms, background-color 200ms, color 200ms",
    cursor: "pointer",
    position: "relative" as const,
    display: "inline-block",
    border: "none",
    imageRendering: "pixelated" as const,
    letterSpacing: "0.05em",
  }

  const shadowStyle: React.CSSProperties = {
    position: "absolute" as const,
    inset: 0,
    backgroundColor: isHovered ? colors.hoverShadow : colors.shadow,
    clipPath: pixelClipPath,
    transform: isPressed ? "translate(0, 0)" : `translate(${p}px, ${p}px)`,
    transition: "transform 100ms, background-color 200ms",
    zIndex: -1,
  }

  // Animated outline effect on hover
  const outlineStyle: React.CSSProperties = {
    position: "absolute" as const,
    inset: `-${p}px`,
    backgroundColor: "transparent",
    border: `${p}px solid ${colors.outline}`,
    clipPath: pixelClipPath,
    opacity: isHovered ? 1 : 0,
    transform: isHovered ? "scale(1)" : "scale(0.95)",
    transition: "opacity 200ms, transform 200ms",
    zIndex: -2,
    pointerEvents: "none" as const,
  }

  const wrapperStyle: React.CSSProperties = {
    position: "relative" as const,
    display: "inline-block",
  }

  const buttonContent = (
    <div style={wrapperStyle} className={className}>
      <span style={outlineStyle} aria-hidden="true" />
      <span style={shadowStyle} aria-hidden="true" />
      {href ? (
        <a
          href={href}
          style={buttonStyle}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
        >
          {children}
        </a>
      ) : (
        <button
          type={type}
          onClick={onClick}
          style={buttonStyle}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
        >
          {children}
        </button>
      )}
    </div>
  )

  return buttonContent
}
