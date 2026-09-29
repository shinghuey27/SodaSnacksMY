"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Language, ShowcaseGroup } from "@/types/portfolio";
import { PixelBorder } from "./project-card";

interface ShowcaseModalProps {
  title: string;
  groups: ShowcaseGroup[];
  lang: Language;
  onClose: () => void;
}

export function ShowcaseModal({ title, groups, lang, onClose }: ShowcaseModalProps) {
  const [groupIdx, setGroupIdx] = useState(0);
  const [shotIdx, setShotIdx] = useState(0);
  const [imgError, setImgError] = useState(false);

  const group = groups[groupIdx];
  const shot = group.shots[shotIdx];
  const accent = `var(--pixel-${group.accentColor})`;
  const pixelFontClass =
    lang === "zh"
      ? "font-[family-name:var(--font-chinese)]"
      : "font-[family-name:var(--font-pixel)]";

  const prevShot = () =>
    setShotIdx((i) => (i - 1 + group.shots.length) % group.shots.length);
  const nextShot = () => setShotIdx((i) => (i + 1) % group.shots.length);

  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    const SWIPE_THRESHOLD = 40;
    if (delta > SWIPE_THRESHOLD) prevShot();
    else if (delta < -SWIPE_THRESHOLD) nextShot();
    touchStartX.current = null;
  };

  useEffect(() => {
    setImgError(false);
  }, [shot.image]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevShot();
      if (e.key === "ArrowRight") nextShot();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const tabsRow = (
    <div className="flex gap-4 border-b-2 border-border">
      {groups.map((g, i) => {
        const isActive = i === groupIdx;
        const tabAccent = `var(--pixel-${g.accentColor})`;
        return (
          <button
            key={g.id}
            type="button"
            onClick={() => {
              setGroupIdx(i);
              setShotIdx(0);
            }}
            className="px-1 pb-2 cursor-pointer border-b-2 -mb-0.5 transition-colors"
            style={{
              borderColor: isActive ? tabAccent : "transparent",
            }}
          >
            <span
              className={`${pixelFontClass} text-[10px]`}
              style={{ color: isActive ? tabAccent : "var(--muted-foreground)" }}
            >
              {g.label[lang]}
            </span>
          </button>
        );
      })}
    </div>
  );

  const phoneBlock = (
    <div className="w-fit max-w-full shrink-0 flex flex-col items-center gap-4">
      {/* phone + side arrows */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={lang === "zh" ? "上一张" : "Previous screenshot"}
          onClick={prevShot}
          className="hidden md:flex w-9 h-9 items-center justify-center border-2 border-foreground bg-card hover:bg-secondary cursor-pointer shrink-0"
        >
          <span className={`${pixelFontClass} text-[10px]`}>◀</span>
        </button>

        <div
          className="relative rounded-[2rem] border-4 border-foreground p-2.5 touch-pan-y select-none"
          style={{
            backgroundColor: "#1a1a1a",
            boxShadow: "6px 6px 0 rgba(0,0,0,0.4)",
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* notch */}
          <div className="absolute left-1/2 top-2.5 -translate-x-1/2 w-16 h-3.5 rounded-full bg-black z-10" />

          <div
            className="relative overflow-hidden rounded-[1.25rem] h-[460px] w-[212px] md:h-[560px] md:w-[258px]"
            style={{ backgroundColor: "#000000" }}
          >
            {!imgError ? (
              <Image
                src={shot.image}
                alt={shot.feature[lang]}
                fill
                className="object-contain"
                sizes="260px"
                onError={() => setImgError(true)}
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center px-4 text-center"
                style={{ backgroundColor: "#fbf9f0" }}
              >
                <span className={`${pixelFontClass} text-[10px] leading-relaxed`} style={{ color: accent }}>
                  {shot.feature[lang]}
                </span>
              </div>
            )}
          </div>

          {/* home indicator */}
          <div className="absolute left-1/2 bottom-2 -translate-x-1/2 w-14 h-1 rounded-full bg-white/40" />
        </div>

        <button
          type="button"
          aria-label={lang === "zh" ? "下一张" : "Next screenshot"}
          onClick={nextShot}
          className="hidden md:flex w-9 h-9 items-center justify-center border-2 border-foreground bg-card hover:bg-secondary cursor-pointer shrink-0"
        >
          <span className={`${pixelFontClass} text-[10px]`}>▶</span>
        </button>
      </div>

      <div className="flex gap-2">
        {group.shots.map((_, i) => (
          <div
            key={i}
            className="w-2 h-2"
            style={{ backgroundColor: i === shotIdx ? accent : "var(--foreground)" }}
          />
        ))}
      </div>

      <span className={`${pixelFontClass} text-[8px] text-muted-foreground md:hidden`}>
        ◀ {lang === "zh" ? "滑动切换" : "SWIPE"} ▶
      </span>
    </div>
  );

  const caption = (
    <PixelBorder color={group.accentColor} className="w-full md:w-[320px] overflow-visible">
      <div className="flex flex-col">
        <div className="flex items-center gap-2 px-3 py-2" style={{ backgroundColor: accent }}>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 bg-white/90 border border-white/50" />
            <div className="w-2.5 h-2.5 bg-white/70 border border-white/40" />
            <div className="w-2.5 h-2.5 bg-white/50 border border-white/30" />
          </div>
          <span className={`${pixelFontClass} text-white text-[9px] tracking-wider flex-grow`}>
            {shot.feature[lang]}
          </span>
          <button
            type="button"
            aria-label={lang === "zh" ? "关闭" : "Close"}
            onClick={onClose}
            className={`${pixelFontClass} hidden md:inline-flex text-white text-[10px] cursor-pointer hover:opacity-70 shrink-0`}
          >
            X
          </button>
        </div>

        <div className="flex flex-col gap-2.5 md:gap-4 p-3.5 md:p-5">
          <span
            className={`${pixelFontClass} text-sm md:text-base leading-relaxed`}
            style={{ color: "var(--pixel-red)" }}
          >
            {title}
          </span>
          <p className="text-xs md:text-base leading-relaxed text-card-foreground">{shot.caption[lang]}</p>
          <p className="text-[11px] md:text-xs text-muted-foreground">
            {shotIdx + 1} / {group.shots.length}
          </p>
          <p className="hidden md:block text-[11px] text-muted-foreground italic border-t-2 border-dashed border-border pt-3">
            {lang === "zh"
              ? "滑动或点箭头翻页，点上方标签切换应用。"
              : "Swipe or tap the arrows to browse. Tap a tab above to switch app."}
          </p>
        </div>
      </div>
    </PixelBorder>
  );

  return (
    <>
      {/* Desktop: centered card over dimmed backdrop */}
      <div
        className="hidden md:flex fixed inset-0 z-50 items-center justify-center bg-black/90 p-4"
        onClick={onClose}
      >
        <div
          className="flex flex-row items-center gap-10 max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden overscroll-contain"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-fit max-w-full shrink-0 flex flex-col items-center gap-4">
            {tabsRow}
            {phoneBlock}
          </div>
          {caption}
        </div>
      </div>

      {/* Mobile: full-screen takeover */}
      <div className="md:hidden fixed inset-0 z-50 bg-background flex flex-col overflow-y-auto overscroll-contain">
        <div className="flex items-center justify-between gap-3 px-4 pt-3 shrink-0">
          {tabsRow}
          <button
            type="button"
            aria-label={lang === "zh" ? "关闭" : "Close"}
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center border-2 border-foreground bg-foreground text-background text-xl cursor-pointer shrink-0"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center gap-6 px-4 pb-8">
          {phoneBlock}
          {caption}
        </div>
      </div>
    </>
  );
}
