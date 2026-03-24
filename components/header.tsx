"use client"

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

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b-4 border-foreground">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <PixelLogo className="w-10 h-10 group-hover:scale-110 transition-transform" />
          <span className="font-[family-name:var(--font-pixel)] text-xs tracking-tight text-foreground">
            SodaSnacks
          </span>
        </a>

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

        {/* Language toggle with pixel styling */}
        <div className="flex items-center border-2 border-foreground">
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-1.5 text-xs font-[family-name:var(--font-pixel)] transition-all ${
              lang === "en"
                ? "bg-foreground text-background"
                : "bg-transparent text-foreground hover:bg-secondary"
            }`}
          >
            EN
          </button>
          <div className="w-0.5 h-6 bg-foreground" />
          <button
            onClick={() => setLang("zh")}
            className={`px-3 py-1.5 text-xs font-[family-name:var(--font-pixel)] transition-all ${
              lang === "zh"
                ? "bg-foreground text-background"
                : "bg-transparent text-foreground hover:bg-secondary"
            }`}
          >
            中文
          </button>
        </div>
      </div>
    </header>
  )
}
