"use client";

import { Language } from "@/types/portfolio";

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
} as const;

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export function Header({ lang, setLang }: HeaderProps) {
  const t = content[lang];

  const handleLangChange = (newLang: Language) => {
    if (newLang === lang) return;
    console.log("[Header] Language changed to:", newLang); // This should appear in browser console on mobile too
    setLang(newLang);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b-4 border-foreground">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group"
        >
          <img
            src="/pixel-logo.png"
            alt="Pixel Logo"
            className="w-10 h-10 group-hover:scale-110 transition-transform duration-200"
          />
          <span className="font-[family-name:var(--font-pixel)] text-xs tracking-tight text-foreground select-none">
            SodaSnacks
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#portfolio"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group py-1"
          >
            {t.portfolio}
            <span className="absolute -bottom-1 left-0 h-0.5 bg-pixel-red w-0 group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="#services"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group py-1"
          >
            {t.services}
            <span className="absolute -bottom-1 left-0 h-0.5 bg-pixel-green w-0 group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="#contact"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group py-1"
          >
            {t.contact}
            <span className="absolute -bottom-1 left-0 h-0.5 bg-pixel-blue w-0 group-hover:w-full transition-all duration-300" />
          </a>
        </nav>

        {/* Language Toggle - Mobile Fixed */}
        <div className="flex border-2 border-foreground rounded-sm bg-background">
          <button
            type="button"
            onClick={() => handleLangChange("en")}
            className={`px-5 py-3 text-xs font-[family-name:var(--font-pixel)] transition-all select-none touch-manipulation
              ${lang === "en"
                ? "bg-foreground text-background"
                : "bg-transparent text-foreground hover:bg-secondary active:bg-foreground active:text-background"
              }`}
          >
            EN
          </button>

          <div className="w-px bg-foreground self-stretch my-1" />

          <button
            type="button"
            onClick={() => handleLangChange("zh")}
            className={`px-5 py-3 text-xs font-[family-name:var(--font-pixel)] transition-all select-none touch-manipulation
              ${lang === "zh"
                ? "bg-foreground text-background"
                : "bg-transparent text-foreground hover:bg-secondary active:bg-foreground active:text-background"
              }`}
          >
            中文
          </button>
        </div>
      </div>
    </header>
  );
}