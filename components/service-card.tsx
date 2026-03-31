"use client";

import { ServiceData, Language } from "@/types/portfolio";

interface ServiceCardProps {
  service: ServiceData;
  lang: Language;
  index: number;
}

const colorMap: Record<string, string> = {
  "bg-pixel-red": "var(--pixel-red)",
  "bg-pixel-yellow": "var(--pixel-yellow)",
  "bg-pixel-green": "var(--pixel-green)",
  "bg-pixel-blue": "var(--pixel-blue)",
};

const descriptionMap: Record<string, { en: string; zh: string }> = {
  "bg-pixel-blue": {
    en: "Responsive, fast web apps built with modern frameworks — from landing pages to full-stack products.",
    zh: "使用现代框架构建响应式高性能网页应用，从落地页到全栈产品一应俱全。",
  },
  "bg-pixel-green": {
    en: "Native & cross-platform mobile apps for iOS and Android, crafted for a smooth user experience.",
    zh: "为 iOS 和 Android 打造原生及跨平台移动应用，提供流畅的用户体验。",
  },
  "bg-pixel-yellow": {
    en: "Tailor-made software — dashboards, CRMs, ERPs, and automation tools built around your workflow.",
    zh: "量身定制的软件解决方案——仪表板、CRM、ERP 及自动化工具，完全围绕您的工作流程构建。",
  },
};

const tagMap: Record<string, string[]> = {
  "bg-pixel-blue": ["React", "Next.js", "TypeScript", "REST API"],
  "bg-pixel-green": ["React Native", "iOS", "Android", "Expo"],
  "bg-pixel-yellow": ["ERPNext", "Python", "Frappe", "Admin UI"],
};

// 新增：3个纯像素风格内联图标（不再依赖 PixelIcon）
const getServiceIcon = (color: string, className: string = "w-6 h-6") => {
  const iconClass = `${className} text-white`;

  if (color === "bg-pixel-blue") {
    // Web / Code 图标（像素风）
    return (
      <svg
        viewBox="0 0 16 16"
        className={iconClass}
        style={{ imageRendering: "pixelated" }}
        fill="currentColor"
      >
        <rect x="2" y="3" width="12" height="10" fill="currentColor" />
        <rect x="4" y="5" width="2" height="2" fill="#111" />
        <rect x="7" y="5" width="5" height="2" fill="#111" />
        <rect x="4" y="9" width="8" height="1" fill="#111" />
      </svg>
    );
  }

  if (color === "bg-pixel-green") {
    // Mobile 图标（像素风手机）
    return (
      <svg
        viewBox="0 0 16 16"
        className={iconClass}
        style={{ imageRendering: "pixelated" }}
        fill="currentColor"
      >
        <rect x="4" y="2" width="8" height="12" rx="1" fill="currentColor" />
        <rect x="6" y="3" width="4" height="1" fill="#111" />
        <rect x="7" y="12" width="2" height="1" fill="#111" />
      </svg>
    );
  }

  // 默认 Yellow - Custom Software / Dashboard
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={iconClass}
      style={{ imageRendering: "pixelated" }}
      viewBox="0 0 24 24"
    >
      <path d="M22 22H2V2h20v20ZM4 20h16V4H4v16Zm11-2H9v-2h6v2Zm2-2h-2v-2H9v2H7v-4h10v4Zm-7-6H8V8h2v2Zm6 0h-2V8h2v2Z" />
    </svg>
  );
};

export function ServiceCard({ service, lang, index }: ServiceCardProps) {
  const title = service.title[lang];
  const items = service.items[lang];
  const borderColor = colorMap[service.color] || "var(--pixel-blue)";
  const desc = descriptionMap[service.color]?.[lang] ?? "";
  const tags = tagMap[service.color] ?? [];

  const pxFont =
    lang === "zh"
      ? "font-[family-name:var(--font-chinese)]"
      : "font-[family-name:var(--font-pixel)]";

  const delay = index * 80;

  return (
    <div
      className="group relative flex flex-col h-full"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* pixel drop shadow */}
      <div
        className="absolute inset-0 translate-x-1 translate-y-1 group-hover:translate-x-[6px] group-hover:translate-y-[6px] transition-transform duration-200 pointer-events-none"
        style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
      />

      {/* coloured outer border */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: borderColor }}
      />

      {/* white inner card */}
      <div
        className="relative bg-card flex flex-col h-full group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
        style={{ margin: "3px" }}
      >
        {/* header bar */}
        <div
          className="flex items-center gap-2 px-3 py-2 flex-shrink-0"
          style={{ backgroundColor: borderColor }}
        >
          <div className="flex gap-1.5">
            <div className="w-2 h-2 bg-white/90" />
            <div className="w-2 h-2 bg-white/65" />
            <div className="w-2 h-2 bg-white/40" />
          </div>
          <span
            className={`${pxFont} text-white ml-1 ${lang === "zh" ? "text-sm" : "text-[10px]"} tracking-wide`}
          >
            {lang === "zh" ? `服务 0${index + 1}` : `SERVICE 0${index + 1}`}
          </span>
        </div>

        {/* body */}
        <div className="flex flex-col flex-1 p-5 gap-4">
          {/* icon + title row */}
          <div className="flex items-start gap-4">
            {/* icon box */}
            <div
              className={`w-12 h-12 flex-shrink-0 ${service.color} flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}
              style={{ boxShadow: `2px 2px 0 rgba(0,0,0,0.2)` }}
            >
              {getServiceIcon(service.color)}
            </div>

            <div className="flex-1 min-w-0">
              <h3
                className={`${pxFont} text-foreground leading-snug mb-1 ${lang === "zh" ? "text-base" : "text-xs"}`}
              >
                {title}
              </h3>
              <div className="flex gap-0.5 mt-1">
                <div
                  className="h-[3px] w-6"
                  style={{ backgroundColor: borderColor }}
                />
                <div
                  className="h-[3px] w-3 opacity-50"
                  style={{ backgroundColor: borderColor }}
                />
                <div
                  className="h-[3px] w-1.5 opacity-25"
                  style={{ backgroundColor: borderColor }}
                />
              </div>
            </div>
          </div>

          {/* description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {desc}
          </p>

          {/* divider */}
          <div
            className="h-px w-full opacity-20"
            style={{ backgroundColor: borderColor }}
          />

          {/* bullet list */}
          <ul className="flex flex-col gap-2.5 flex-1">
            {items.map((item, j) => (
              <li key={j} className="flex items-start gap-2.5 group/item">
                <div
                  className="w-2 h-2 mt-1.5 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-150"
                  style={{
                    backgroundColor: borderColor,
                    boxShadow: "1px 1px 0 rgba(0,0,0,0.15)",
                  }}
                />
                <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* tech tags */}
          <div className="flex flex-wrap gap-2 md:gap-2.5 mt-auto pt-4 md:pt-5 border-t-4 border-dashed border-border">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 md:px-3 py-1.5 md:py-2 text-xs md:text-sm bg-secondary text-secondary-foreground border-2 border-foreground/30"
                style={{ boxShadow: "2px 2px 0 rgba(0,0,0,0.1)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* bottom pixel strip */}
        <div className="flex flex-shrink-0 pb-2.5 justify-center gap-1">
          {[0.25, 0.45, 0.7, 0.45, 0.25].map((op, i) => (
            <div
              key={i}
              className="w-2 h-2"
              style={{ backgroundColor: borderColor, opacity: op }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
