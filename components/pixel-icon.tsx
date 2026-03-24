export type PixelIconType =
  | "check"
  | "code"
  | "dashboard"
  | "cog"
  | "mail"
  | "phone"
  | "terminal"
  | "database"
  | "cloud"
  | "cursor"
  | "bug"
  | "folder"
  | "laptop"
  | "server"
  | "wifi"
  | "rocket"
  | "star"
  | "stars"
  | "coffee"
  | "snack"
  | "key"
  | "lock"
  | "bug-splat"
  | "arrow-up"
  | "arrow-down"
  | "monitor"
  | "keyboard"
  | "mouse"
  | "cpu"
  | "ram"
  | "hard-drive"
  | "usb"
  | "battery"
  | "pizza"
  | "soda";

interface PixelIconProps {
  type: PixelIconType;
  className?: string;
  color?: string;
}

export function PixelIcon({
  type,
  className = "w-6 h-6",
  color,
}: PixelIconProps) {
  const colorStyle = color ? { color } : {};

  const icons: Record<string, React.ReactNode> = {
    check: (
      <svg
        viewBox="0 0 16 16"
        className={className}
        style={{ imageRendering: "pixelated", ...colorStyle }}
      >
        <rect x="12" y="2" width="2" height="2" fill="currentColor" />
        <rect x="10" y="4" width="2" height="2" fill="currentColor" />
        <rect x="8" y="6" width="2" height="2" fill="currentColor" />
        <rect x="6" y="8" width="2" height="2" fill="currentColor" />
        <rect x="4" y="6" width="2" height="2" fill="currentColor" />
        <rect x="2" y="4" width="2" height="2" fill="currentColor" />
      </svg>
    ),
    code: (
      <svg
        viewBox="0 0 16 16"
        className={className}
        style={{ imageRendering: "pixelated", ...colorStyle }}
      >
        <rect x="2" y="6" width="2" height="2" fill="currentColor" />
        <rect x="4" y="4" width="2" height="2" fill="currentColor" />
        <rect x="4" y="8" width="2" height="2" fill="currentColor" />
        <rect x="6" y="2" width="2" height="2" fill="currentColor" />
        <rect x="6" y="10" width="2" height="2" fill="currentColor" />
        <rect x="12" y="6" width="2" height="2" fill="currentColor" />
        <rect x="10" y="4" width="2" height="2" fill="currentColor" />
        <rect x="10" y="8" width="2" height="2" fill="currentColor" />
        <rect x="8" y="2" width="2" height="2" fill="currentColor" />
        <rect x="8" y="10" width="2" height="2" fill="currentColor" />
      </svg>
    ),
    terminal: (
      <svg
        viewBox="0 0 16 16"
        className={className}
        style={{ imageRendering: "pixelated", ...colorStyle }}
      >
        <rect x="1" y="1" width="14" height="2" fill="currentColor" />
        <rect x="1" y="13" width="14" height="2" fill="currentColor" />
        <rect x="1" y="1" width="2" height="14" fill="currentColor" />
        <rect x="13" y="1" width="2" height="14" fill="currentColor" />
        <rect x="4" y="6" width="2" height="2" fill="currentColor" />
        <rect x="6" y="8" width="2" height="2" fill="currentColor" />
        <rect x="4" y="10" width="2" height="2" fill="currentColor" />
        <rect x="10" y="8" width="2" height="2" fill="currentColor" />
      </svg>
    ),
    database: (
      <svg
        viewBox="0 0 16 16"
        className={className}
        style={{ imageRendering: "pixelated", ...colorStyle }}
      >
        <rect x="3" y="2" width="10" height="2" fill="currentColor" />
        <rect x="3" y="12" width="10" height="2" fill="currentColor" />
        <rect x="3" y="2" width="2" height="12" fill="currentColor" />
        <rect x="11" y="2" width="2" height="12" fill="currentColor" />
        <rect x="5" y="6" width="6" height="1" fill="currentColor" />
        <rect x="5" y="9" width="6" height="1" fill="currentColor" />
      </svg>
    ),
    cloud: (
      <svg
        viewBox="0 0 16 16"
        className={className}
        style={{ imageRendering: "pixelated", ...colorStyle }}
      >
        <rect x="4" y="4" width="4" height="2" fill="currentColor" />
        <rect x="2" y="6" width="12" height="2" fill="currentColor" />
        <rect x="1" y="8" width="14" height="2" fill="currentColor" />
        <rect x="2" y="10" width="12" height="2" fill="currentColor" />
      </svg>
    ),
    cursor: (
      <svg
        viewBox="0 0 16 16"
        className={className}
        style={{ imageRendering: "pixelated", ...colorStyle }}
      >
        <rect x="2" y="1" width="2" height="2" fill="currentColor" />
        <rect x="2" y="3" width="2" height="2" fill="currentColor" />
        <rect x="2" y="5" width="2" height="2" fill="currentColor" />
        <rect x="2" y="7" width="2" height="2" fill="currentColor" />
        <rect x="2" y="9" width="2" height="2" fill="currentColor" />
        <rect x="4" y="3" width="2" height="2" fill="currentColor" />
        <rect x="4" y="9" width="2" height="2" fill="currentColor" />
        <rect x="6" y="5" width="2" height="2" fill="currentColor" />
        <rect x="6" y="11" width="2" height="2" fill="currentColor" />
        <rect x="8" y="7" width="2" height="2" fill="currentColor" />
        <rect x="8" y="13" width="2" height="2" fill="currentColor" />
        <rect x="10" y="9" width="2" height="2" fill="currentColor" />
      </svg>
    ),
    bug: (
      <svg
        viewBox="0 0 16 16"
        className={className}
        style={{ imageRendering: "pixelated", ...colorStyle }}
      >
        <rect x="5" y="4" width="6" height="2" fill="currentColor" />
        <rect x="4" y="6" width="8" height="4" fill="currentColor" />
        <rect x="5" y="10" width="6" height="2" fill="currentColor" />
        <rect x="4" y="2" width="2" height="2" fill="currentColor" />
        <rect x="10" y="2" width="2" height="2" fill="currentColor" />
        <rect x="2" y="6" width="2" height="2" fill="currentColor" />
        <rect x="12" y="6" width="2" height="2" fill="currentColor" />
        <rect x="2" y="9" width="2" height="2" fill="currentColor" />
        <rect x="12" y="9" width="2" height="2" fill="currentColor" />
      </svg>
    ),
    folder: (
      <svg
        viewBox="0 0 16 16"
        className={className}
        style={{ imageRendering: "pixelated", ...colorStyle }}
      >
        <rect x="1" y="3" width="6" height="2" fill="currentColor" />
        <rect x="1" y="5" width="14" height="2" fill="currentColor" />
        <rect x="1" y="5" width="2" height="8" fill="currentColor" />
        <rect x="13" y="5" width="2" height="8" fill="currentColor" />
        <rect x="1" y="11" width="14" height="2" fill="currentColor" />
      </svg>
    ),

    // New IT / coding icons
    laptop: (
      <svg
        viewBox="0 0 16 16"
        className={className}
        style={{ imageRendering: "pixelated", ...colorStyle }}
      >
        <rect x="2" y="3" width="12" height="8" fill="currentColor" />
        <rect x="1" y="11" width="14" height="1" fill="currentColor" />
        <rect x="3" y="4" width="10" height="6" fill="var(--background)" />
      </svg>
    ),
    server: (
      <svg
        viewBox="0 0 16 16"
        className={className}
        style={{ imageRendering: "pixelated", ...colorStyle }}
      >
        <rect x="2" y="2" width="12" height="3" fill="currentColor" />
        <rect x="2" y="7" width="12" height="3" fill="currentColor" />
        <rect x="2" y="12" width="12" height="3" fill="currentColor" />
      </svg>
    ),
    wifi: (
      <svg
        viewBox="0 0 16 16"
        className={className}
        style={{ imageRendering: "pixelated", ...colorStyle }}
      >
        <rect x="3" y="6" width="10" height="1" fill="currentColor" />
        <rect x="5" y="8" width="6" height="1" fill="currentColor" />
        <rect x="7" y="10" width="2" height="1" fill="currentColor" />
      </svg>
    ),
    rocket: (
      <svg
        viewBox="0 0 16 16"
        className={className}
        style={{ imageRendering: "pixelated", ...colorStyle }}
      >
        <rect x="7" y="1" width="2" height="4" fill="currentColor" />
        <rect x="6" y="5" width="4" height="6" fill="currentColor" />
        <rect x="5" y="11" width="6" height="2" fill="currentColor" />
      </svg>
    ),
    star: (
      <svg
        viewBox="0 0 16 16"
        className={className}
        style={{ imageRendering: "pixelated", ...colorStyle }}
      >
        <rect x="7" y="0" width="2" height="4" fill="currentColor" />
        <rect x="6" y="3" width="4" height="2" fill="currentColor" />
        <rect x="4" y="2" width="2" height="2" fill="currentColor" />
        <rect x="10" y="2" width="2" height="2" fill="currentColor" />
      </svg>
    ),
    coffee: (
      <svg
        viewBox="0 0 16 16"
        className={className}
        style={{ imageRendering: "pixelated", ...colorStyle }}
      >
        <rect x="4" y="6" width="8" height="4" fill="currentColor" />
        <rect x="3" y="10" width="10" height="1" fill="currentColor" />
        <rect x="10" y="7" width="2" height="2" fill="var(--background)" />
      </svg>
    ),
    snack: (
      <svg
        viewBox="0 0 16 16"
        className={className}
        style={{ imageRendering: "pixelated", ...colorStyle }}
      >
        <rect x="3" y="6" width="10" height="2" fill="currentColor" />
        <rect x="3" y="9" width="10" height="1" fill="currentColor" />
        <rect x="5" y="7" width="6" height="1" fill="var(--background)" />
      </svg>
    ),
    monitor: (
      <svg
        viewBox="0 0 16 16"
        className={className}
        style={{ imageRendering: "pixelated", ...colorStyle }}
      >
        <rect x="2" y="3" width="12" height="8" fill="currentColor" />
        <rect x="1" y="11" width="14" height="2" fill="currentColor" />
        <rect x="6" y="13" width="4" height="1" fill="currentColor" />
        <rect x="4" y="4" width="8" height="6" fill="var(--background)" />
      </svg>
    ),

    keyboard: (
      <svg
        viewBox="0 0 16 16"
        className={className}
        style={{ imageRendering: "pixelated", ...colorStyle }}
      >
        <rect x="2" y="6" width="12" height="4" fill="currentColor" />
        <rect x="3" y="7" width="1" height="1" fill="var(--background)" />
        <rect x="5" y="7" width="1" height="1" fill="var(--background)" />
        <rect x="7" y="7" width="1" height="1" fill="var(--background)" />
        <rect x="9" y="7" width="1" height="1" fill="var(--background)" />
        <rect x="11" y="7" width="1" height="1" fill="var(--background)" />
        <rect x="4" y="9" width="8" height="1" fill="var(--background)" />
      </svg>
    ),

    mouse: (
      <svg
        viewBox="0 0 16 16"
        className={className}
        style={{ imageRendering: "pixelated", ...colorStyle }}
      >
        <rect x="6" y="3" width="4" height="8" fill="currentColor" rx="1" />
        <rect x="7" y="5" width="2" height="2" fill="var(--background)" />
      </svg>
    ),

    cpu: (
      <svg
        viewBox="0 0 16 16"
        className={className}
        style={{ imageRendering: "pixelated", ...colorStyle }}
      >
        <rect x="4" y="4" width="8" height="8" fill="currentColor" />
        <rect x="5" y="5" width="2" height="2" fill="var(--background)" />
        <rect x="9" y="5" width="2" height="2" fill="var(--background)" />
        <rect x="5" y="9" width="2" height="2" fill="var(--background)" />
        <rect x="9" y="9" width="2" height="2" fill="var(--background)" />
      </svg>
    ),

    ram: (
      <svg
        viewBox="0 0 16 16"
        className={className}
        style={{ imageRendering: "pixelated", ...colorStyle }}
      >
        <rect x="2" y="5" width="12" height="6" fill="currentColor" />
        <rect x="4" y="6" width="2" height="1" fill="var(--background)" />
        <rect x="7" y="6" width="2" height="1" fill="var(--background)" />
        <rect x="10" y="6" width="2" height="1" fill="var(--background)" />
      </svg>
    ),

    "hard-drive": (
      <svg
        viewBox="0 0 16 16"
        className={className}
        style={{ imageRendering: "pixelated", ...colorStyle }}
      >
        <rect x="2" y="4" width="12" height="7" fill="currentColor" />
        <rect x="3" y="5" width="10" height="1" fill="var(--background)" />
        <rect x="3" y="8" width="10" height="1" fill="var(--background)" />
      </svg>
    ),

    usb: (
      <svg
        viewBox="0 0 16 16"
        className={className}
        style={{ imageRendering: "pixelated", ...colorStyle }}
      >
        <rect x="7" y="2" width="2" height="6" fill="currentColor" />
        <rect x="5" y="7" width="6" height="6" fill="currentColor" />
        <rect x="6" y="9" width="1" height="2" fill="var(--background)" />
        <rect x="9" y="9" width="1" height="2" fill="var(--background)" />
      </svg>
    ),

    battery: (
      <svg
        viewBox="0 0 16 16"
        className={className}
        style={{ imageRendering: "pixelated", ...colorStyle }}
      >
        <rect x="3" y="5" width="10" height="6" fill="currentColor" />
        <rect x="13" y="7" width="2" height="2" fill="currentColor" />
        <rect x="4" y="6" width="8" height="4" fill="var(--background)" />
      </svg>
    ),

    // === NEW SNACKS / DRINKS ===
    pizza: (
      <svg
        viewBox="0 0 16 16"
        className={className}
        style={{ imageRendering: "pixelated", ...colorStyle }}
      >
        <rect x="3" y="4" width="10" height="8" fill="currentColor" />
        <rect x="5" y="6" width="2" height="2" fill="#FF8787" />
        <rect x="8" y="5" width="2" height="2" fill="#FFE46B" />
        <rect x="6" y="9" width="2" height="2" fill="#7ED99B" />
      </svg>
    ),

    soda: (
      <svg
        viewBox="0 0 16 16"
        className={className}
        style={{ imageRendering: "pixelated", ...colorStyle }}
      >
        <rect x="5" y="3" width="6" height="10" fill="currentColor" />
        <rect x="6" y="4" width="4" height="2" fill="#FF8787" />
        <rect x="6" y="8" width="4" height="1" fill="var(--background)" />
      </svg>
    ),
    stars: (
      <svg
        viewBox="0 0 16 16"
        className={className}
        style={{ imageRendering: "pixelated", ...colorStyle }}
      >
        {/* Big star body */}
        <rect x="6" y="2" width="4" height="4" fill="currentColor" />
        <rect x="5" y="3" width="6" height="2" fill="currentColor" />
        <rect x="7" y="1" width="2" height="6" fill="currentColor" />

        {/* Pointy tips */}
        <rect x="4" y="4" width="2" height="2" fill="currentColor" />
        <rect x="10" y="4" width="2" height="2" fill="currentColor" />
        <rect x="3" y="5" width="2" height="1" fill="currentColor" />
        <rect x="11" y="5" width="2" height="1" fill="currentColor" />

        {/* Sparkle dots */}
        <rect x="2" y="3" width="1" height="1" fill="currentColor" />
        <rect x="13" y="6" width="1" height="1" fill="currentColor" />
        <rect x="7" y="0" width="2" height="1" fill="currentColor" />
        <rect x="8" y="7" width="1" height="1" fill="currentColor" />
      </svg>
    ),
  };

  return icons[type] || null;
}
