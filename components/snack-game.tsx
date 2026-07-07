"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Language } from "@/types/portfolio";
import { PixelSprite } from "./pixel-sprite";
import { MASCOT_S, MASCOT_K } from "./sprites/mascot-data";
import { SNACK_SET, SODA_CAN, BUG } from "./sprites/snack-data";
import type { SpriteDef } from "./sprites/sprite-types";
import {
  playCatch,
  playMiss,
  playFanfare,
  isMuted,
  toggleMuted,
} from "@/lib/retro-sound";

export type GameCharacter = "S" | "K";

const content = {
  en: {
    title: "SNACK CATCH",
    start: "▶ PRESS START",
    score: "SCORE",
    time: "TIME",
    best: "BEST",
    howDesktop: "← → OR A/D TO MOVE",
    howTouch: "DRAG TO MOVE",
    rules: "SODA +10  SNACK +5  BUG -5",
    over: "GAME OVER",
    newBest: "★ NEW BEST! ★",
    again: "PLAY AGAIN",
    exit: "EXIT",
  },
  zh: {
    title: "零食大作战",
    start: "▶ 开始游戏",
    score: "得分",
    time: "时间",
    best: "最高分",
    howDesktop: "← → 或 A/D 移动",
    howTouch: "拖动移动",
    rules: "汽水 +10  零食 +5  虫子 -5",
    over: "游戏结束",
    newBest: "★ 新纪录！★",
    again: "再玩一次",
    exit: "退出",
  },
};

const ROUND_MS = 30_000;
const BEST_KEY = "sodasnacks-best";
const PLAYER_W = 48;
const ITEM_W = 26;

interface FallingItem {
  id: number;
  sprite: SpriteDef;
  points: number;
  x: number; // px within playfield
  speed: number; // px per ms
}

interface SnackGameProps {
  lang: Language;
  character: GameCharacter;
  onClose: () => void;
}

export function SnackGame({ lang, character, onClose }: SnackGameProps) {
  const t = content[lang];
  const mascot = character === "S" ? MASCOT_S : MASCOT_K;

  const [phase, setPhase] = useState<"ready" | "playing" | "over">("ready");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_MS / 1000);
  const [best, setBest] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  const [muted, setMuted] = useState(false);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [facing, setFacing] = useState<1 | -1>(1);

  const playfieldRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const itemEls = useRef(new Map<number, HTMLDivElement>());
  const itemYs = useRef(new Map<number, number>());
  const itemsLive = useRef<FallingItem[]>([]);
  const scoreRef = useRef(0);
  const remainingRef = useRef(ROUND_MS);
  const playerX = useRef(0);
  const targetX = useRef<number | null>(null);
  const keys = useRef({ left: false, right: false });
  const spawnAcc = useRef(0);
  const nextId = useRef(1);

  useEffect(() => {
    setMuted(isMuted());
    try {
      setBest(parseInt(localStorage.getItem(BEST_KEY) ?? "0", 10) || 0);
    } catch {
      // ignore
    }
  }, []);

  // lock page scroll while the overlay is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Esc closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const startGame = () => {
    scoreRef.current = 0;
    remainingRef.current = ROUND_MS;
    spawnAcc.current = 0;
    itemsLive.current = [];
    itemYs.current.clear();
    setItems([]);
    setScore(0);
    setTimeLeft(ROUND_MS / 1000);
    setIsNewBest(false);
    const field = playfieldRef.current;
    playerX.current = field ? (field.clientWidth - PLAYER_W) / 2 : 0;
    targetX.current = null;
    setPhase("playing");
  };

  const endGame = useCallback(() => {
    setPhase("over");
    setItems([]);
    itemsLive.current = [];
    const final = scoreRef.current;
    setBest((prevBest) => {
      if (final > prevBest) {
        setIsNewBest(true);
        playFanfare();
        try {
          localStorage.setItem(BEST_KEY, String(final));
        } catch {
          // ignore
        }
        return final;
      }
      return prevBest;
    });
  }, []);

  // keyboard controls while playing
  useEffect(() => {
    if (phase !== "playing") return;
    const down = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        keys.current.left = true;
        e.preventDefault();
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        keys.current.right = true;
        e.preventDefault();
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A")
        keys.current.left = false;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D")
        keys.current.right = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      keys.current.left = false;
      keys.current.right = false;
    };
  }, [phase]);

  // main game loop
  useEffect(() => {
    if (phase !== "playing") return;
    let raf = 0;
    let last = performance.now();
    let shownSec = ROUND_MS / 1000;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(50, now - last);
      last = now;
      const field = playfieldRef.current;
      if (!field) return;
      const W = field.clientWidth;
      const H = field.clientHeight;

      // timer
      remainingRef.current -= dt;
      const sec = Math.max(0, Math.ceil(remainingRef.current / 1000));
      if (sec !== shownSec) {
        shownSec = sec;
        setTimeLeft(sec);
      }
      if (remainingRef.current <= 0) {
        endGame();
        return;
      }

      // player movement
      let dir = 0;
      if (keys.current.left) dir -= 1;
      if (keys.current.right) dir += 1;
      if (dir !== 0) {
        targetX.current = null;
        playerX.current += dir * 0.38 * dt;
        setFacing(dir > 0 ? 1 : -1);
      } else if (targetX.current !== null) {
        const want = targetX.current - PLAYER_W / 2;
        const delta = want - playerX.current;
        const step = Math.sign(delta) * Math.min(Math.abs(delta), 0.5 * dt);
        if (Math.abs(delta) > 2) {
          playerX.current += step;
          setFacing(delta > 0 ? 1 : -1);
        }
      }
      playerX.current = Math.max(0, Math.min(W - PLAYER_W, playerX.current));
      if (playerRef.current) {
        playerRef.current.style.transform = `translateX(${playerX.current}px)`;
      }

      // progress 0→1 over the round, ramps difficulty
      const progress = 1 - remainingRef.current / ROUND_MS;

      // spawn
      spawnAcc.current += dt;
      const interval = 900 - 350 * progress;
      if (spawnAcc.current >= interval) {
        spawnAcc.current = 0;
        const roll = Math.random();
        let sprite: SpriteDef;
        let points: number;
        if (roll < 0.15) {
          sprite = BUG;
          points = -5;
        } else if (roll < 0.4) {
          sprite = SODA_CAN;
          points = 10;
        } else {
          const pool = SNACK_SET.filter((s) => !s.name.startsWith("bubble"));
          sprite = pool[Math.floor(Math.random() * pool.length)].sprite;
          points = 5;
        }
        const item: FallingItem = {
          id: nextId.current++,
          sprite,
          points,
          x: Math.random() * (W - ITEM_W),
          speed: 0.11 + 0.1 * progress + Math.random() * 0.04,
        };
        itemsLive.current = [...itemsLive.current, item];
        itemYs.current.set(item.id, -30);
        setItems(itemsLive.current);
      }

      // move items + collision
      const playerTop = H - 64;
      const caught: FallingItem[] = [];
      const gone: number[] = [];
      for (const item of itemsLive.current) {
        const y = (itemYs.current.get(item.id) ?? -30) + item.speed * dt;
        itemYs.current.set(item.id, y);
        const el = itemEls.current.get(item.id);
        if (el) el.style.transform = `translate(${item.x}px, ${y}px)`;

        const itemBottom = y + ITEM_W;
        if (itemBottom >= playerTop && y <= H - 8) {
          const itemCenter = item.x + ITEM_W / 2;
          const playerCenter = playerX.current + PLAYER_W / 2;
          if (Math.abs(itemCenter - playerCenter) < (PLAYER_W + ITEM_W) / 2 - 8) {
            caught.push(item);
            continue;
          }
        }
        if (y > H) gone.push(item.id);
      }

      if (caught.length || gone.length) {
        const removed = new Set([...caught.map((c) => c.id), ...gone]);
        itemsLive.current = itemsLive.current.filter((i) => !removed.has(i.id));
        removed.forEach((id) => {
          itemYs.current.delete(id);
          itemEls.current.delete(id);
        });
        for (const c of caught) {
          scoreRef.current = Math.max(0, scoreRef.current + c.points);
          if (c.points > 0) playCatch();
          else playMiss();
        }
        setScore(scoreRef.current);
        setItems(itemsLive.current);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, endGame]);

  const pxFont =
    lang === "zh"
      ? "font-[family-name:var(--font-chinese)]"
      : "font-[family-name:var(--font-pixel)]";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/70 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative bg-card border-[3px] border-foreground w-full max-w-[480px]"
        style={{ boxShadow: "6px 6px 0 rgba(58,58,56,0.8)" }}
      >
        {/* HUD */}
        <div className="flex items-center justify-between gap-2 px-3 py-2 border-b-[3px] border-foreground bg-secondary">
          <span className={`${pxFont} text-[9px] md:text-[10px] text-foreground`}>
            {t.score}: {score}
          </span>
          <span
            className={`${pxFont} text-[9px] md:text-[10px] ${
              timeLeft <= 5 && phase === "playing"
                ? "text-pixel-red"
                : "text-foreground"
            }`}
          >
            {t.time}: {timeLeft}
          </span>
          <span className={`${pxFont} text-[9px] md:text-[10px] text-foreground`}>
            {t.best}: {best}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setMuted(toggleMuted())}
              className={`${pxFont} text-[9px] px-1.5 py-0.5 border-2 border-foreground bg-card cursor-pointer`}
              aria-label={muted ? "unmute" : "mute"}
            >
              {muted ? "♪✕" : "♪"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className={`${pxFont} text-[9px] px-1.5 py-0.5 border-2 border-foreground bg-pixel-red text-white cursor-pointer`}
              aria-label="close game"
            >
              ✕
            </button>
          </div>
        </div>

        {/* playfield */}
        <div
          ref={playfieldRef}
          className="relative w-full h-[60vh] max-h-[440px] min-h-[300px] overflow-hidden bg-background"
          style={{ touchAction: "none" }}
          onPointerMove={(e) => {
            if (phase !== "playing") return;
            const rect = e.currentTarget.getBoundingClientRect();
            targetX.current = e.clientX - rect.left;
          }}
          onPointerDown={(e) => {
            if (phase !== "playing") return;
            const rect = e.currentTarget.getBoundingClientRect();
            targetX.current = e.clientX - rect.left;
          }}
        >
          {/* subtle pixel grid */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {phase === "playing" && (
            <>
              {items.map((item) => (
                <div
                  key={item.id}
                  ref={(el) => {
                    if (el) itemEls.current.set(item.id, el);
                  }}
                  className="absolute left-0 top-0 will-change-transform"
                  style={{
                    transform: `translate(${item.x}px, ${
                      itemYs.current.get(item.id) ?? -30
                    }px)`,
                    width: ITEM_W,
                  }}
                >
                  <PixelSprite sprite={item.sprite} className="w-full h-auto" />
                </div>
              ))}

              {/* player */}
              <div
                ref={playerRef}
                className="absolute bottom-1 left-0 will-change-transform"
                style={{ width: PLAYER_W }}
              >
                <PixelSprite
                  sprite={mascot}
                  anim="walk"
                  fps={5}
                  flipX={facing === -1}
                  className="w-full h-auto"
                />
              </div>
            </>
          )}

          {phase === "ready" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
              <h3 className={`${pxFont} text-sm md:text-base text-foreground`}>
                {t.title}
              </h3>
              <PixelSprite sprite={mascot} anim="idle" fps={2} className="w-14 h-auto" />
              <div className={`${pxFont} text-[9px] md:text-[10px] text-muted-foreground leading-loose`}>
                <p className="hidden md:block">{t.howDesktop}</p>
                <p className="md:hidden">{t.howTouch}</p>
                <p>{t.rules}</p>
              </div>
              <button
                type="button"
                onClick={startGame}
                className={`${pxFont} text-[11px] md:text-xs px-5 py-3 bg-pixel-green text-white border-[3px] border-foreground cursor-pointer hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-transform`}
                style={{ boxShadow: "4px 4px 0 rgba(58,58,56,0.8)" }}
              >
                {t.start}
              </button>
            </div>
          )}

          {phase === "over" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
              <h3 className={`${pxFont} text-sm md:text-base text-foreground`}>
                {t.over}
              </h3>
              {isNewBest && (
                <p className={`${pxFont} text-[10px] text-pixel-yellow bg-foreground px-3 py-2`}>
                  {t.newBest}
                </p>
              )}
              <p className={`${pxFont} text-xs text-foreground`}>
                {t.score}: {score}
              </p>
              <p className={`${pxFont} text-[9px] text-muted-foreground`}>
                {t.best}: {best}
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={startGame}
                  className={`${pxFont} text-[10px] px-4 py-2.5 bg-pixel-green text-white border-[3px] border-foreground cursor-pointer`}
                  style={{ boxShadow: "3px 3px 0 rgba(58,58,56,0.8)" }}
                >
                  {t.again}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className={`${pxFont} text-[10px] px-4 py-2.5 bg-secondary text-foreground border-[3px] border-foreground cursor-pointer`}
                  style={{ boxShadow: "3px 3px 0 rgba(58,58,56,0.8)" }}
                >
                  {t.exit}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
