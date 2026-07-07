"use client";

import { useEffect, useRef, useState } from "react";
import { PixelSprite } from "./pixel-sprite";
import { PixelBurst } from "./pixel-burst";
import { SNACK_SET, SnackEntry } from "./sprites/snack-data";
import { playPop } from "@/lib/retro-sound";
import { useReducedMotion } from "@/lib/use-reduced-motion";

interface SnackConfig {
  snack: string; // name in SNACK_SET
  top: string;
  left?: string;
  right?: string;
  delay: string;
  /** tailwind width classes; height follows sprite aspect */
  size: string;
  /** parallax layer 1 (far/slow) .. 3 (near/fast) */
  layer: 1 | 2 | 3;
  /** hidden below sm to reduce clutter on phones */
  mobileHidden?: boolean;
}

// Positions curated to hug the edges and stay off the centered text/CTA.
const HERO_SNACKS: SnackConfig[] = [
  { snack: "soda", top: "10%", left: "6%", delay: "0s", size: "w-8 sm:w-9 md:w-11", layer: 2 },
  { snack: "donut", top: "30%", left: "9%", delay: "0.6s", size: "w-8 sm:w-9 md:w-11", layer: 1 },
  { snack: "bubble-m", top: "20%", left: "16%", delay: "1.2s", size: "w-5 md:w-6", layer: 3, mobileHidden: true },
  { snack: "fries", top: "52%", left: "5%", delay: "0.9s", size: "w-8 sm:w-9 md:w-11", layer: 2 },
  { snack: "bubble-s", top: "68%", left: "12%", delay: "0.3s", size: "w-4 md:w-5", layer: 3, mobileHidden: true },
  { snack: "cookie", top: "80%", left: "7%", delay: "1.6s", size: "w-7 sm:w-8 md:w-10", layer: 1 },
  { snack: "popcorn", top: "12%", right: "7%", delay: "0.4s", size: "w-8 sm:w-9 md:w-11", layer: 2 },
  { snack: "bubble-l", top: "28%", right: "13%", delay: "1.4s", size: "w-6 md:w-7", layer: 3, mobileHidden: true },
  { snack: "candy", top: "44%", right: "5%", delay: "0.8s", size: "w-9 sm:w-10 md:w-12", layer: 1 },
  { snack: "donut", top: "64%", right: "10%", delay: "0.2s", size: "w-7 sm:w-8 md:w-10", layer: 2, mobileHidden: true },
  { snack: "soda", top: "80%", right: "6%", delay: "1.1s", size: "w-7 sm:w-8 md:w-10", layer: 3 },
  { snack: "bubble-m", top: "86%", right: "18%", delay: "0.7s", size: "w-5 md:w-6", layer: 1, mobileHidden: true },
  { snack: "bubble-s", top: "6%", left: "30%", delay: "1.8s", size: "w-4 md:w-5", layer: 3, mobileHidden: true },
  { snack: "cookie", top: "6%", right: "26%", delay: "1s", size: "w-6 md:w-7", layer: 1, mobileHidden: true },
];

const CONTACT_SNACKS: SnackConfig[] = [
  { snack: "bubble-s", top: "8%", left: "4%", delay: "0s", size: "w-4 md:w-5", layer: 2 },
  { snack: "soda", top: "22%", left: "8%", delay: "0.7s", size: "w-6 md:w-8", layer: 1 },
  { snack: "bubble-m", top: "48%", left: "3%", delay: "1.3s", size: "w-5 md:w-6", layer: 3, mobileHidden: true },
  { snack: "donut", top: "70%", left: "6%", delay: "0.4s", size: "w-6 md:w-8", layer: 2 },
  { snack: "bubble-s", top: "88%", left: "14%", delay: "1.7s", size: "w-4", layer: 1, mobileHidden: true },
  { snack: "candy", top: "10%", right: "6%", delay: "0.9s", size: "w-7 md:w-9", layer: 2 },
  { snack: "bubble-l", top: "32%", right: "4%", delay: "0.2s", size: "w-5 md:w-7", layer: 3, mobileHidden: true },
  { snack: "fries", top: "56%", right: "7%", delay: "1.5s", size: "w-6 md:w-8", layer: 1 },
  { snack: "cookie", top: "78%", right: "5%", delay: "0.6s", size: "w-6 md:w-7", layer: 2 },
  { snack: "bubble-m", top: "92%", right: "16%", delay: "1.1s", size: "w-4 md:w-5", layer: 3, mobileHidden: true },
  { snack: "popcorn", top: "4%", left: "28%", delay: "1.9s", size: "w-6 md:w-7", layer: 1, mobileHidden: true },
  { snack: "bubble-s", top: "4%", right: "30%", delay: "0.5s", size: "w-4", layer: 2 },
];

const LAYER_SPEED: Record<1 | 2 | 3, number> = { 1: 0.02, 2: 0.05, 3: 0.09 };

const SNACK_BY_NAME = new Map(SNACK_SET.map((s) => [s.name, s]));

interface FloatingSnacksProps {
  variant: "hero" | "contact";
}

export function FloatingSnacks({ variant }: FloatingSnacksProps) {
  const configs = variant === "hero" ? HERO_SNACKS : CONTACT_SNACKS;
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);

  // Parallax: one passive scroll listener, transforms only the 3 layer divs.
  useEffect(() => {
    if (reduced) return;
    const container = containerRef.current;
    if (!container) return;
    let raf = 0;
    const apply = () => {
      raf = 0;
      const progress = -container.getBoundingClientRect().top;
      for (let i = 0; i < 3; i++) {
        const el = layerRefs.current[i];
        if (el) {
          el.style.transform = `translateY(${progress * LAYER_SPEED[(i + 1) as 1 | 2 | 3]}px)`;
        }
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {[1, 2, 3].map((layer) => (
        <div
          key={layer}
          ref={(el) => {
            layerRefs.current[layer - 1] = el;
          }}
          className="absolute inset-0"
          style={{ willChange: reduced ? undefined : "transform" }}
        >
          {configs
            .filter((c) => c.layer === layer)
            .map((cfg, i) => {
              const entry = SNACK_BY_NAME.get(cfg.snack);
              if (!entry) return null;
              return (
                <FloatingSnackItem
                  key={`${cfg.snack}-${i}`}
                  cfg={cfg}
                  entry={entry}
                  reduced={reduced}
                />
              );
            })}
        </div>
      ))}
    </div>
  );
}

interface ItemProps {
  cfg: SnackConfig;
  entry: SnackEntry;
  reduced: boolean;
}

function FloatingSnackItem({ cfg, entry, reduced }: ItemProps) {
  const [popped, setPopped] = useState(false);
  const [bursting, setBursting] = useState(false);
  const [pos, setPos] = useState({ top: cfg.top, left: cfg.left, right: cfg.right });
  const respawnRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (respawnRef.current) clearTimeout(respawnRef.current);
    };
  }, []);

  const handlePop = () => {
    if (popped) return;
    playPop();
    setPopped(true);
    setBursting(true);
    respawnRef.current = setTimeout(
      () => {
        // respawn with a little jitter around the curated spot
        const jitter = () => (Math.random() - 0.5) * 12;
        const nudge = (v?: string) =>
          v === undefined
            ? undefined
            : `${Math.min(88, Math.max(2, parseFloat(v) + jitter()))}%`;
        setPos({ top: nudge(cfg.top)!, left: nudge(cfg.left), right: nudge(cfg.right) });
        setPopped(false);
      },
      2000 + Math.random() * 2000,
    );
  };

  return (
    <div
      className={`absolute ${cfg.mobileHidden ? "hidden sm:block" : ""}`}
      style={{ top: pos.top, left: pos.left, right: pos.right }}
    >
      <div
        data-px-anim
        className="animate-bounce-slow"
        style={{ animationDelay: cfg.delay, animationDuration: "4.6s" }}
      >
        <button
          type="button"
          tabIndex={-1}
          onClick={handlePop}
          className={`block pointer-events-auto cursor-pointer select-none opacity-50 sm:opacity-60 md:opacity-70 hover:opacity-100 transition-opacity duration-300 ${
            popped ? "pointer-events-none" : ""
          }`}
          style={
            popped
              ? { animation: "px-pop-out 0.2s ease-out forwards" }
              : undefined
          }
          aria-label="pop"
        >
          <PixelSprite sprite={entry.sprite} className={`${cfg.size} h-auto`} />
        </button>
      </div>
      {bursting && (
        <div className="absolute left-1/2 top-1/2">
          <PixelBurst
            x={0}
            y={0}
            colors={entry.burstColors}
            count={reduced ? 3 : 9}
            onDone={() => setBursting(false)}
          />
        </div>
      )}
    </div>
  );
}
