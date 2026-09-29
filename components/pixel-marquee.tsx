"use client"

import { useState } from "react"
import { useReducedMotion } from "@/lib/use-reduced-motion"

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
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()
  // Duplicate for seamless loop
  const repeated = [...items, ...items]
  const pxFont =
    lang === "zh"
      ? "font-[family-name:var(--font-chinese)] text-xs"
      : "font-[family-name:var(--font-pixel)] text-[10px]";
  return (
    <div className="flex items-center border-y-[3px] border-foreground bg-foreground text-background">
      <div className="min-w-0 flex-1 overflow-hidden py-1">
      <div
        className="flex w-max"
        style={{ animation: reduced ? "none" : "px-scroll 14s linear infinite", animationPlayState: paused ? "paused" : "running" }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center" aria-hidden={i >= items.length}>
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
      </div>
      {!reduced && <button type="button" onClick={() => setPaused((value) => !value)} className="shrink-0 border-l-2 border-background/50 px-3 py-2 text-xs hover:bg-background hover:text-foreground" aria-label={paused ? (lang === "zh" ? "播放文字跑马灯" : "Play marquee") : (lang === "zh" ? "暂停文字跑马灯" : "Pause marquee")}>
        {paused ? "▶" : "Ⅱ"}
      </button>}
      <style>{`
        @keyframes px-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
