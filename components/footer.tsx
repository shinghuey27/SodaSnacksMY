import { Language } from "@/types/portfolio";

const content = {
  en: {
    tagline: "Crafting digital solutions with a pixel-perfect touch.",
    copyright: "SodaSnacks Studio. Made With Love.",
  },
  zh: {
    tagline: "以像素级的精准打造数字解决方案。",
    copyright: "SodaSnacks 工作室。保留所有权利。",
  },
};

interface FooterProps {
  lang: Language;
}

export function Footer({ lang }: FooterProps) {
  const t = content[lang];
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 border-t-4 border-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          <img
            src="/pixel-logo.png"
            alt="Pixel Logo"
            className="w-12 h-12 hover:scale-110 transition-transform"
          />
          <p className="text-sm text-muted-foreground text-center max-w-md">
            {t.tagline}
          </p>

          {/* Pixel decoration - animated */}
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-pixel-red hover:scale-150 transition-transform cursor-pointer" />
            <div className="w-2 h-2 bg-pixel-yellow hover:scale-150 transition-transform cursor-pointer" />
            <div className="w-2 h-2 bg-pixel-green hover:scale-150 transition-transform cursor-pointer" />
            <div className="w-2 h-2 bg-pixel-blue hover:scale-150 transition-transform cursor-pointer" />
          </div>

          <p className="font-[family-name:var(--font-pixel)] text-[10px] text-muted-foreground text-center">
            © {year} {t.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
