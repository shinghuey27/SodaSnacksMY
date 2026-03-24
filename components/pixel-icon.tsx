interface PixelIconProps {
  type: "check" | "code" | "dashboard" | "cog" | "mail" | "phone"
  className?: string
}

export function PixelIcon({ type, className = "w-6 h-6" }: PixelIconProps) {
  const icons = {
    check: (
      <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: "pixelated" }}>
        <rect x="12" y="2" width="2" height="2" fill="currentColor" />
        <rect x="10" y="4" width="2" height="2" fill="currentColor" />
        <rect x="8" y="6" width="2" height="2" fill="currentColor" />
        <rect x="6" y="8" width="2" height="2" fill="currentColor" />
        <rect x="4" y="6" width="2" height="2" fill="currentColor" />
        <rect x="2" y="4" width="2" height="2" fill="currentColor" />
      </svg>
    ),
    code: (
      <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: "pixelated" }}>
        {/* < bracket */}
        <rect x="2" y="6" width="2" height="2" fill="currentColor" />
        <rect x="4" y="4" width="2" height="2" fill="currentColor" />
        <rect x="4" y="8" width="2" height="2" fill="currentColor" />
        <rect x="6" y="2" width="2" height="2" fill="currentColor" />
        <rect x="6" y="10" width="2" height="2" fill="currentColor" />
        {/* > bracket */}
        <rect x="12" y="6" width="2" height="2" fill="currentColor" />
        <rect x="10" y="4" width="2" height="2" fill="currentColor" />
        <rect x="10" y="8" width="2" height="2" fill="currentColor" />
        <rect x="8" y="2" width="2" height="2" fill="currentColor" />
        <rect x="8" y="10" width="2" height="2" fill="currentColor" />
      </svg>
    ),
    dashboard: (
      <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: "pixelated" }}>
        {/* Outer frame */}
        <rect x="1" y="1" width="14" height="2" fill="currentColor" />
        <rect x="1" y="13" width="14" height="2" fill="currentColor" />
        <rect x="1" y="1" width="2" height="14" fill="currentColor" />
        <rect x="13" y="1" width="2" height="14" fill="currentColor" />
        {/* Inner content */}
        <rect x="4" y="4" width="4" height="4" fill="currentColor" />
        <rect x="10" y="4" width="2" height="2" fill="currentColor" />
        <rect x="10" y="8" width="2" height="2" fill="currentColor" />
        <rect x="4" y="10" width="6" height="2" fill="currentColor" />
      </svg>
    ),
    cog: (
      <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: "pixelated" }}>
        {/* Gear teeth */}
        <rect x="6" y="0" width="4" height="2" fill="currentColor" />
        <rect x="6" y="14" width="4" height="2" fill="currentColor" />
        <rect x="0" y="6" width="2" height="4" fill="currentColor" />
        <rect x="14" y="6" width="2" height="4" fill="currentColor" />
        {/* Diagonal teeth */}
        <rect x="2" y="2" width="2" height="2" fill="currentColor" />
        <rect x="12" y="2" width="2" height="2" fill="currentColor" />
        <rect x="2" y="12" width="2" height="2" fill="currentColor" />
        <rect x="12" y="12" width="2" height="2" fill="currentColor" />
        {/* Center */}
        <rect x="4" y="4" width="8" height="8" fill="currentColor" />
        <rect x="6" y="6" width="4" height="4" fill="var(--background)" />
      </svg>
    ),
    mail: (
      <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: "pixelated" }}>
        {/* Envelope */}
        <rect x="1" y="3" width="14" height="2" fill="currentColor" />
        <rect x="1" y="11" width="14" height="2" fill="currentColor" />
        <rect x="1" y="3" width="2" height="10" fill="currentColor" />
        <rect x="13" y="3" width="2" height="10" fill="currentColor" />
        {/* V shape */}
        <rect x="3" y="5" width="2" height="2" fill="currentColor" />
        <rect x="11" y="5" width="2" height="2" fill="currentColor" />
        <rect x="5" y="7" width="2" height="2" fill="currentColor" />
        <rect x="9" y="7" width="2" height="2" fill="currentColor" />
        <rect x="7" y="9" width="2" height="2" fill="currentColor" />
      </svg>
    ),
    phone: (
      <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: "pixelated" }}>
        {/* Phone body */}
        <rect x="4" y="1" width="8" height="2" fill="currentColor" />
        <rect x="4" y="13" width="8" height="2" fill="currentColor" />
        <rect x="4" y="1" width="2" height="14" fill="currentColor" />
        <rect x="10" y="1" width="2" height="14" fill="currentColor" />
        {/* Screen */}
        <rect x="6" y="3" width="4" height="8" fill="currentColor" opacity="0.3" />
        {/* Button */}
        <rect x="7" y="12" width="2" height="1" fill="currentColor" />
      </svg>
    ),
  }

  return icons[type] || null
}
