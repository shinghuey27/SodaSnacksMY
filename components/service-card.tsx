"use client"

import { useState } from "react"
import { ServiceData, Language } from "@/types/portfolio"
import { PixelIcon } from "./pixel-icon"

interface ServiceCardProps {
  service: ServiceData
  lang: Language
  index: number
}

const colorMap: Record<string, string> = {
  "bg-pixel-red": "var(--pixel-red)",
  "bg-pixel-yellow": "var(--pixel-yellow)", 
  "bg-pixel-green": "var(--pixel-green)",
  "bg-pixel-blue": "var(--pixel-blue)",
}

export function ServiceCard({ service, lang, index }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  const title = service.title[lang]
  const items = service.items[lang]
  
  // Use Chinese pixel font for Chinese text
  const pixelFontClass = lang === "zh" 
    ? "font-[family-name:var(--font-chinese)]" 
    : "font-[family-name:var(--font-pixel)]"

  const borderColor = colorMap[service.color] || "var(--pixel-blue)"
  
  // Stagger animation delay based on index
  const animationDelay = index * 100

  return (
    <div 
      className="relative group cursor-pointer"
      style={{ 
        animationDelay: `${animationDelay}ms`,
        // zIndex: isHovered ? 20 : 10 - index,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Shadow layer with pixel stepping */}
      <div 
        className="absolute inset-0 transition-transform duration-200"
        style={{
          backgroundColor: "rgba(0,0,0,0.3)",
          transform: isHovered ? "translate(6px, 6px)" : "translate(4px, 4px)",
          clipPath: `polygon(
            8px 0%, calc(100% - 8px) 0%,
            calc(100% - 8px) 4px, calc(100% - 4px) 4px,
            calc(100% - 4px) 8px, 100% 8px,
            100% calc(100% - 8px), calc(100% - 4px) calc(100% - 8px),
            calc(100% - 4px) calc(100% - 4px), calc(100% - 8px) calc(100% - 4px),
            calc(100% - 8px) 100%, 8px 100%,
            8px calc(100% - 4px), 4px calc(100% - 4px),
            4px calc(100% - 8px), 0% calc(100% - 8px),
            0% 8px, 4px 8px,
            4px 4px, 8px 4px
          )`,
        }}
      />
      
      {/* Outer border with pixel corners */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-200"
        style={{
          backgroundColor: borderColor,
          clipPath: `polygon(
            8px 0%, calc(100% - 8px) 0%,
            calc(100% - 8px) 4px, calc(100% - 4px) 4px,
            calc(100% - 4px) 8px, 100% 8px,
            100% calc(100% - 8px), calc(100% - 4px) calc(100% - 8px),
            calc(100% - 4px) calc(100% - 4px), calc(100% - 8px) calc(100% - 4px),
            calc(100% - 8px) 100%, 8px 100%,
            8px calc(100% - 4px), 4px calc(100% - 4px),
            4px calc(100% - 8px), 0% calc(100% - 8px),
            0% 8px, 4px 8px,
            4px 4px, 8px 4px
          )`,
        }}
      />

      {/* Inner card with pixel inset */}
      <div 
        className="relative bg-card transition-transform duration-200"
        style={{
          margin: "4px",
          transform: isHovered ? "translate(-2px, -2px)" : "translate(0, 0)",
          clipPath: `polygon(
            6px 0%, calc(100% - 6px) 0%,
            calc(100% - 6px) 3px, calc(100% - 3px) 3px,
            calc(100% - 3px) 6px, 100% 6px,
            100% calc(100% - 6px), calc(100% - 3px) calc(100% - 6px),
            calc(100% - 3px) calc(100% - 3px), calc(100% - 6px) calc(100% - 3px),
            calc(100% - 6px) 100%, 6px 100%,
            6px calc(100% - 3px), 3px calc(100% - 3px),
            3px calc(100% - 6px), 0% calc(100% - 6px),
            0% 6px, 3px 6px,
            3px 3px, 6px 3px
          )`,
        }}
      >
        {/* Card header with game-style bar */}
        <div 
          className="flex items-center gap-2 px-3 py-2"
          style={{ backgroundColor: borderColor }}
        >
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 bg-white/90" />
            <div className="w-2.5 h-2.5 bg-white/70" />
            <div className="w-2.5 h-2.5 bg-white/50" />
          </div>
          <span className={`${pixelFontClass} text-[10px] text-white tracking-wide ml-1`}>
            {lang === "zh" ? "服务" : "SERVICE"} {String(index + 1).padStart(2, "0")}
          </span>
          
          {/* Expand indicator */}
          <div className="ml-auto flex items-center gap-1">
            <div className={`w-2 h-2 bg-white/80 transition-transform duration-200 ${isExpanded ? "rotate-45" : ""}`} />
          </div>
        </div>

        <div className="p-5">
          {/* Icon header with pixel background */}
          <div 
            className={`w-14 h-14 ${service.color} flex items-center justify-center mb-5 transition-transform duration-200 ${isHovered ? "scale-110" : ""}`}
            style={{ 
              boxShadow: "3px 3px 0 rgba(0,0,0,0.25)",
              clipPath: `polygon(
                4px 0%, calc(100% - 4px) 0%,
                100% 4px, 100% calc(100% - 4px),
                calc(100% - 4px) 100%, 4px 100%,
                0% calc(100% - 4px), 0% 4px
              )`,
            }}
          >
            <PixelIcon type={service.icon} className="w-7 h-7 text-white" />
          </div>

          <h3 className={`${pixelFontClass} text-xs text-foreground mb-5 leading-relaxed`}>
            {title}
          </h3>

          {/* Skill items with pixel bullets and animation */}
          <ul className="space-y-3">
            {items.map((item, j) => (
              <li 
                key={j} 
                className="flex items-start gap-3 group/item"
                style={{
                  opacity: isExpanded || j < 3 ? 1 : 0,
                  maxHeight: isExpanded || j < 3 ? "100px" : "0px",
                  overflow: "hidden",
                  transition: `all 200ms ease ${j * 50}ms`,
                }}
              >
                {/* Pixel bullet with hover effect */}
                <div 
                  className="w-2.5 h-2.5 mt-1 flex-shrink-0 transition-all duration-200 group-hover/item:scale-125"
                  style={{ 
                    backgroundColor: borderColor,
                    boxShadow: "1px 1px 0 rgba(0,0,0,0.2)",
                  }}
                />
                <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* Expand hint */}
          {items.length > 3 && !isExpanded && (
            <div className={`${pixelFontClass} text-[10px] text-muted-foreground mt-4 flex items-center gap-2`}>
              <div className="flex gap-0.5">
                <div className="w-1 h-1" style={{ backgroundColor: borderColor }} />
                <div className="w-1 h-1" style={{ backgroundColor: borderColor }} />
                <div className="w-1 h-1" style={{ backgroundColor: borderColor }} />
              </div>
              {lang === "zh" ? "点击展开" : "Click to expand"}
            </div>
          )}
        </div>

        {/* Pixel decoration at bottom */}
        <div className="flex justify-center gap-1 pb-3">
          <div className="w-2 h-2" style={{ backgroundColor: borderColor, opacity: 0.3 }} />
          <div className="w-2 h-2" style={{ backgroundColor: borderColor, opacity: 0.5 }} />
          <div className="w-2 h-2" style={{ backgroundColor: borderColor, opacity: 0.7 }} />
          <div className="w-2 h-2" style={{ backgroundColor: borderColor, opacity: 0.5 }} />
          <div className="w-2 h-2" style={{ backgroundColor: borderColor, opacity: 0.3 }} />
        </div>
      </div>
    </div>
  )
}
