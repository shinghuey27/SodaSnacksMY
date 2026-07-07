"use client";

import { useEffect, useMemo } from "react";

interface Particle {
  dx: number;
  dy: number;
  size: number;
  color: string;
  dur: number;
}

interface PixelBurstProps {
  /** px offsets inside the positioned parent */
  x: number;
  y: number;
  colors: string[];
  /** fewer particles for reduced motion */
  count?: number;
  onDone: () => void;
}

/** One-shot pixel particle burst. Mount on click, unmounts itself via onDone. */
export function PixelBurst({ x, y, colors, count = 9, onDone }: PixelBurstProps) {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.6;
        const dist = 18 + Math.random() * 22;
        return {
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist,
          size: 4 + Math.floor(Math.random() * 3),
          color: colors[i % colors.length],
          dur: 0.3 + Math.random() * 0.2,
        };
      }),
    [count, colors],
  );

  // fallback cleanup in case onAnimationEnd never fires
  useEffect(() => {
    const id = setTimeout(onDone, 700);
    return () => clearTimeout(id);
  }, [onDone]);

  return (
    <div
      className="absolute pointer-events-none z-20"
      style={{ left: x, top: y }}
      aria-hidden="true"
    >
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={
            {
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              "--dx": `${p.dx}px`,
              "--dy": `${p.dy}px`,
              animation: `px-burst ${p.dur}s ease-out forwards`,
            } as React.CSSProperties
          }
          onAnimationEnd={i === 0 ? onDone : undefined}
        />
      ))}
    </div>
  );
}

const HEART_ROWS = [
  ".rr.rr.",
  "rrrrrrr",
  "rrrrrrr",
  ".rrrrr.",
  "..rrr..",
  "...r...",
];

interface HeartPopProps {
  /** px offsets inside the positioned parent */
  x: number;
  y: number;
  onDone: () => void;
}

/** A pixel heart that rises and fades — for clicked mascots. */
export function HeartPop({ x, y, onDone }: HeartPopProps) {
  useEffect(() => {
    const id = setTimeout(onDone, 900);
    return () => clearTimeout(id);
  }, [onDone]);

  return (
    <div
      className="absolute pointer-events-none z-20"
      style={{ left: x, top: y, animation: "px-heart-rise 0.8s ease-out forwards" }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 7 6"
        className="w-4 h-4"
        shapeRendering="crispEdges"
        style={{ imageRendering: "pixelated" }}
      >
        {HEART_ROWS.flatMap((row, ry) =>
          row.split("").map((c, rx) =>
            c === "r" ? (
              <rect
                key={`${rx}-${ry}`}
                x={rx}
                y={ry}
                width={1}
                height={1}
                fill="#e63946"
              />
            ) : null,
          ),
        )}
      </svg>
    </div>
  );
}
