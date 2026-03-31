"use client"

interface PixelMarqueeProps {
  items?: string[]
  lang?:any
}

const defaultItems = [
  "OPEN FOR PROJECTS",
  "WEB APPS",
  "ADMIN SYSTEMS",
  "CUSTOM BUILDS",
  "FAST DELIVERY",
  "PIXEL PERFECT",
]

export function PixelMarquee({ items = defaultItems, lang }: PixelMarqueeProps) {
  // Duplicate for seamless loop
  const repeated = [...items, ...items]
  console.log(lang,'yo')
  const pxFont =
    lang === "zh"
      ? "font-[family-name:var(--font-chinese)] text-xs"
      : "font-[family-name:var(--font-pixel)] text-[9px]";
  return (
    <div className="overflow-hidden border-y-[3px] border-foreground bg-foreground py-1">
      <div
        className="flex w-max"
        style={{ animation: "px-scroll 14s linear infinite" }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center">
            <span
              className={`${pxFont} text-background px-4 whitespace-nowrap opacity-85 tracking-wide`}
            >
              {item}
            </span>
            <span className={`${pxFont} text-pixel-yellow font-[family-name:var(--font-pixel)] text-[9px] px-1`}>
              ★
            </span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes px-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}