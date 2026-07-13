"use client";

import { useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: "#portfolio", label: t.portfolio, color: "bg-pixel-red" },
    { href: "#services", label: t.services, color: "bg-pixel-green" },
    { href: "#contact", label: t.contact, color: "bg-pixel-blue" },
  ];

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

        <div className="flex items-center gap-2 md:gap-3">
        {/* Language Toggle - Mobile Fixed */}
        <div className="flex border-2 border-foreground rounded-sm bg-background">
          <button
            type="button"
            onClick={() => handleLangChange("en")}
            className={`px-3 md:px-5 py-3 text-xs whitespace-nowrap font-[family-name:var(--font-pixel)] transition-all select-none touch-manipulation
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
            className={`px-3 md:px-5 py-3 text-xs whitespace-nowrap font-[family-name:var(--font-pixel)] transition-all select-none touch-manipulation
              ${lang === "zh"
                ? "bg-foreground text-background"
                : "bg-transparent text-foreground hover:bg-secondary active:bg-foreground active:text-background"
              }`}
          >
            中文
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="md:hidden flex flex-col items-center justify-center gap-[5px] w-11 h-11 border-2 border-foreground rounded-sm bg-background active:bg-secondary touch-manipulation"
        >
          {menuOpen ? (
            <span className="font-[family-name:var(--font-pixel)] text-sm text-foreground leading-none">
              ✕
            </span>
          ) : (
            <>
              <span className="block w-5 h-[3px] bg-foreground" />
              <span className="block w-5 h-[3px] bg-foreground" />
              <span className="block w-5 h-[3px] bg-foreground" />
            </>
          )}
        </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="md:hidden border-t-2 border-foreground bg-background">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-6 py-4 border-b border-foreground/10 last:border-b-0 text-sm text-foreground active:bg-secondary touch-manipulation"
            >
              <span className={`w-2.5 h-2.5 ${item.color}`} />
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}