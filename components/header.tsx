"use client"

import { useState } from "react"
import { Language } from "@/types/portfolio"
import { PixelLogo } from "./pixel-logo"

const content = {
  en: {
    portfolio: "Work",
    services: "Services",
    contact: "Contact",
  },
  zh: {
    portfolio: "作品",
    services: "服务",
    contact: "联系",
  },
}

interface HeaderProps {
  lang: Language
  setLang: (lang: Language) => void
}

export function Header({ lang, setLang }: HeaderProps) {
  const t = content[lang]
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Use Chinese pixel font for Chinese text
  const pixelFontClass = lang === "zh" 
    ? "font-[family-name:var(--font-chinese)]" 
    : "font-[family-name:var(--font-pixel)]"

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b-4 border-foreground">
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 md:gap-3 group">
          <PixelLogo className="w-8 h-8 md:w-10 md:h-10 group-hover:scale-110 transition-transform" />
          <span className={`${pixelFontClass} text-[10px] md:text-xs tracking-tight text-foreground`}>
            SodaSnacks
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a 
            href="#portfolio" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
          >
            {t.portfolio}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pixel-red group-hover:w-full transition-all" />
          </a>
          <a 
            href="#services" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
          >
            {t.services}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pixel-green group-hover:w-full transition-all" />
          </a>
          <a 
            href="#contact" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
          >
            {t.contact}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pixel-blue group-hover:w-full transition-all" />
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {/* Language toggle with pixel styling - always visible */}
          <div className="flex items-center border-2 border-foreground">
            <button
              onClick={() => setLang("en")}
              className={`px-2 md:px-3 py-1 md:py-1.5 text-[10px] md:text-xs ${pixelFontClass} transition-all ${
                lang === "en"
                  ? "bg-foreground text-background"
                  : "bg-transparent text-foreground hover:bg-secondary"
              }`}
            >
              EN
            </button>
            <div className="w-0.5 h-5 md:h-6 bg-foreground" />
            <button
              onClick={() => setLang("zh")}
              className={`px-2 md:px-3 py-1 md:py-1.5 text-[10px] md:text-xs ${pixelFontClass} transition-all ${
                lang === "zh"
                  ? "bg-foreground text-background"
                  : "bg-transparent text-foreground hover:bg-secondary"
              }`}
            >
              {lang === "zh" ? "中文" : "CN"}
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden flex flex-col gap-1 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`w-5 h-0.5 bg-foreground transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <div className={`w-5 h-0.5 bg-foreground transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <div className={`w-5 h-0.5 bg-foreground transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-foreground bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a 
              href="#portfolio" 
              className={`${pixelFontClass} text-sm text-foreground py-2 border-b-2 border-dashed border-border flex items-center gap-2`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="w-2 h-2 bg-pixel-red" />
              {t.portfolio}
            </a>
            <a 
              href="#services" 
              className={`${pixelFontClass} text-sm text-foreground py-2 border-b-2 border-dashed border-border flex items-center gap-2`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="w-2 h-2 bg-pixel-green" />
              {t.services}
            </a>
            <a 
              href="#contact" 
              className={`${pixelFontClass} text-sm text-foreground py-2 flex items-center gap-2`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="w-2 h-2 bg-pixel-blue" />
              {t.contact}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
