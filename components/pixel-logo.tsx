interface PixelLogoProps {
  className?: string
}

export function PixelLogo({ className = "w-12 h-12" }: PixelLogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      style={{ imageRendering: "pixelated" }}
    >
      {/* Soda can body - blue */}
      <rect x="8" y="6" width="16" height="22" fill="#4D96FF" />
      <rect x="10" y="4" width="12" height="2" fill="#4D96FF" />
      <rect x="10" y="28" width="12" height="2" fill="#4D96FF" />
      
      {/* Can top ring */}
      <rect x="12" y="2" width="8" height="2" fill="#666" />
      <rect x="14" y="0" width="4" height="2" fill="#888" />
      
      {/* Tab */}
      <rect x="14" y="4" width="4" height="2" fill="#999" />
      <rect x="15" y="3" width="2" height="1" fill="#AAA" />
      
      {/* Highlight on can */}
      <rect x="10" y="8" width="2" height="16" fill="#6BB3FF" />
      
      {/* S letter pixel art - yellow */}
      <rect x="13" y="10" width="6" height="2" fill="#FFD93D" />
      <rect x="11" y="12" width="2" height="2" fill="#FFD93D" />
      <rect x="13" y="14" width="4" height="2" fill="#FFD93D" />
      <rect x="17" y="16" width="2" height="2" fill="#FFD93D" />
      <rect x="11" y="18" width="6" height="2" fill="#FFD93D" />
      
      {/* Bubbles - green */}
      <rect x="20" y="22" width="2" height="2" fill="#6BCB77" />
      <rect x="18" y="24" width="2" height="2" fill="#6BCB77" />
      <rect x="21" y="25" width="2" height="2" fill="#6BCB77" />
      
      {/* Shadow */}
      <rect x="6" y="30" width="20" height="2" fill="rgba(0,0,0,0.1)" />
    </svg>
  )
}
