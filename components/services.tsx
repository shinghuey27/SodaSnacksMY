"use client";

import { Language } from "@/types/portfolio";
import { services } from "@/data/services";
import { ServiceCard } from "./service-card";
import { PixelSprite } from "./pixel-sprite";
import { MASCOT_K } from "./sprites/mascot-data";

const content = {
  en: {
    title: "Our Services",
    subtitle: "What we can build for you",
  },
  zh: {
    title: "我们的服务",
    subtitle: "我们能为您构建的解决方案",
  },
};

interface ServicesProps {
  lang: Language;
}

export function Services({ lang }: ServicesProps) {
  const t = content[lang];
  const pxFont =
    lang === "zh"
      ? "font-[family-name:var(--font-chinese)] text-xl md:text-xxl"
      : "font-[family-name:var(--font-pixel)] text-lg md:text-xl ";
  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        {/* Section header with pixel decoration */}
        <div className="text-center mb-16">
          <div className="relative inline-flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-pixel-blue" />
            <h2 className={`${pxFont} text-foreground`}>{t.title}</h2>
            <div className="w-3 h-3 bg-pixel-blue" />
            {/* K peeking beside the title */}
            <div className="absolute -right-10 md:-right-14 -top-3 pointer-events-none">
              <PixelSprite
                sprite={MASCOT_K}
                anim="idle"
                fps={2}
                flipX
                className="w-7 md:w-9 h-auto drop-shadow-[2px_2px_0_rgba(58,58,56,0.2)]"
              />
            </div>
          </div>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} lang={lang} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
