"use client";

import { useEffect, useRef, useState } from "react";
import { Language } from "@/types/portfolio";
import { PixelSprite } from "./pixel-sprite";
import { HeartPop } from "./pixel-burst";
import { PixelAchievementToast } from "./pixel-achievement-toast";
import { SnackGame, GameCharacter } from "./snack-game";
import { MASCOT_S, MASCOT_K } from "./sprites/mascot-data";
import type { SpriteDef } from "./sprites/sprite-types";
import { playPop, playFanfare } from "@/lib/retro-sound";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const content = {
  en: {
    hint: "CLICK ME!",
    secretTitle: "SECRET FOUND!",
    secretBody: "Snack Catch unlocked!",
  },
  zh: {
    hint: "点我！",
    secretTitle: "秘密发现！",
    secretBody: "解锁零食大作战！",
  },
};

interface MascotsProps {
  lang: Language;
}

export function Mascots({ lang }: MascotsProps) {
  const t = content[lang];
  const reduced = useReducedMotion();
  const [gameChar, setGameChar] = useState<GameCharacter | null>(null);
  const [toast, setToast] = useState<{
    data: { icon: string; title: string; body: string };
    key: number;
  } | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (openTimer.current) clearTimeout(openTimer.current);
    };
  }, []);

  const handleSecret = (char: GameCharacter) => {
    playFanfare();
    setToast({
      data: { icon: "🏆", title: t.secretTitle, body: t.secretBody },
      key: Date.now(),
    });
    openTimer.current = setTimeout(() => setGameChar(char), 900);
  };

  return (
    <>
      <div className="absolute bottom-0 inset-x-0 h-14 md:h-16 z-10 pointer-events-none">
        <Mascot
          sprite={MASCOT_S}
          hint={t.hint}
          lang={lang}
          rangePct={[0.08, 0.44]}
          startPct={0.18}
          initialDir={1}
          reduced={reduced}
          onSecret={() => handleSecret("S")}
        />
        <Mascot
          sprite={MASCOT_K}
          hint={t.hint}
          lang={lang}
          rangePct={[0.54, 0.88]}
          startPct={0.74}
          initialDir={-1}
          reduced={reduced}
          onSecret={() => handleSecret("K")}
        />
      </div>

      <PixelAchievementToast toast={toast?.data ?? null} />
      {gameChar && (
        <SnackGame
          lang={lang}
          character={gameChar}
          onClose={() => setGameChar(null)}
        />
      )}
    </>
  );
}

type Phase = "walk" | "idle" | "wave";

const WALK_SPEED = 0.028; // px per ms

interface MascotProps {
  sprite: SpriteDef;
  hint: string;
  lang: Language;
  /** fraction of container width the mascot patrols */
  rangePct: [number, number];
  startPct: number;
  initialDir: 1 | -1;
  reduced: boolean;
  onSecret: () => void;
}

function Mascot({
  sprite,
  hint,
  lang,
  rangePct,
  startPct,
  initialDir,
  reduced,
  onSecret,
}: MascotProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [anim, setAnim] = useState<Phase>("idle");
  const [dir, setDir] = useState<1 | -1>(initialDir);
  const [jumping, setJumping] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hearts, setHearts] = useState<number[]>([]);
  const clickedOnce = useRef(false);
  const clicks = useRef<number[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const walkState = useRef<{ x: number | null; dir: 1 | -1; phase: Phase; until: number }>({
    x: null,
    dir: initialDir,
    phase: "idle",
    until: 0,
  });

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  // Walk/idle/wave state machine — one rAF loop, transform written directly.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    if (reduced) {
      // stand still at start position, blink only
      const parent = el.parentElement;
      if (parent) {
        el.style.transform = `translateX(${parent.clientWidth * startPct}px)`;
      }
      setAnim("idle");
      return;
    }

    let raf = 0;
    let last = performance.now();
    const st = walkState.current;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(50, now - last);
      last = now;
      const parent = el.parentElement;
      if (!parent) return;
      const width = parent.clientWidth;
      const min = width * rangePct[0];
      const max = width * rangePct[1];

      if (st.x === null) {
        st.x = width * startPct;
        st.until = now + 1500 + Math.random() * 1500;
      }

      if (st.phase === "walk") {
        st.x += st.dir * WALK_SPEED * dt;
        if (st.x <= min) {
          st.x = min;
          st.dir = 1;
          setDir(1);
        } else if (st.x >= max) {
          st.x = max;
          st.dir = -1;
          setDir(-1);
        }
      }

      if (now >= st.until) {
        if (st.phase === "walk") {
          st.phase = Math.random() < 0.3 ? "wave" : "idle";
          st.until = now + (st.phase === "wave" ? 1600 : 2200 + Math.random() * 1800);
          if (st.phase === "idle" && !clickedOnce.current) {
            setShowHint(true);
            timers.current.push(setTimeout(() => setShowHint(false), 2000));
          }
        } else {
          st.phase = "walk";
          st.until = now + 2500 + Math.random() * 3000;
        }
        setAnim(st.phase);
      }

      st.x = Math.min(max, Math.max(min, st.x));
      el.style.transform = `translateX(${st.x}px)`;
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, rangePct, startPct]);

  const handleClick = () => {
    clickedOnce.current = true;
    setShowHint(false);
    playPop();
    setJumping(true);
    timers.current.push(setTimeout(() => setJumping(false), 550));
    const id = Date.now();
    setHearts((h) => [...h, id]);

    const now = Date.now();
    clicks.current = [...clicks.current.filter((ts) => now - ts < 10000), now];
    if (clicks.current.length >= 5) {
      clicks.current = [];
      onSecret();
    }
  };

  const fps = anim === "walk" ? 5 : anim === "wave" ? 3 : 2;
  const fontClass =
    lang === "zh"
      ? "font-[family-name:var(--font-chinese)] text-[10px]"
      : "font-[family-name:var(--font-pixel)] text-[7px]";

  return (
    <div ref={wrapperRef} className="absolute bottom-0 left-0 will-change-transform">
      <div style={{ animation: jumping ? "px-jump 0.5s ease-out" : undefined }}>
        {/* hint bubble */}
        {showHint && (
          <div
            className={`absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-card border-2 border-foreground px-2 py-1 ${fontClass} text-foreground pointer-events-none`}
            style={{ boxShadow: "2px 2px 0 rgba(58,58,56,0.8)" }}
          >
            {hint}
            <span className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-2 h-2 bg-card border-b-2 border-r-2 border-foreground rotate-45" />
          </div>
        )}

        <button
          type="button"
          onClick={handleClick}
          className="block pointer-events-auto cursor-pointer select-none hover:brightness-105"
          aria-label="mascot"
        >
          <PixelSprite
            sprite={sprite}
            anim={anim === "walk" ? "walk" : anim === "wave" ? "wave" : "idle"}
            fps={fps}
            flipX={dir === -1}
            className="w-12 md:w-14 h-auto drop-shadow-[2px_2px_0_rgba(58,58,56,0.25)]"
          />
        </button>
      </div>

      {hearts.map((id) => (
        <HeartPop
          key={id}
          x={16}
          y={-10}
          onDone={() => setHearts((h) => h.filter((v) => v !== id))}
        />
      ))}
    </div>
  );
}
