"use client"

import { ServiceData, Language } from "@/types/portfolio"
import { PixelIcon } from "./pixel-icon"

interface ServiceCardProps {
  service: ServiceData
  lang: Language
}

export function ServiceCard({ service, lang }: ServiceCardProps) {
  const title = service.title[lang]
  const items = service.items[lang]

  return (
    <div className="group bg-card border-4 border-foreground p-6 transition-all duration-200 hover:-translate-y-1 shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.15)]">
      {/* Icon header with pixel background */}
      <div className={`w-14 h-14 ${service.color} flex items-center justify-center mb-6 shadow-[3px_3px_0_0_rgba(0,0,0,0.2)]`}>
        <PixelIcon type={service.icon} className="w-7 h-7 text-white" />
      </div>

      <h3 className="font-[family-name:var(--font-pixel)] text-xs text-foreground mb-6 leading-relaxed">
        {title}
      </h3>

      <ul className="space-y-3">
        {items.map((item, j) => (
          <li key={j} className="flex items-start gap-3 group/item">
            <div className="w-2 h-2 mt-1.5 bg-pixel-red flex-shrink-0 group-hover/item:bg-pixel-green transition-colors" />
            <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
