"use client";

import { useState } from "react";

/** Scrambled per-cell delays (ms). Max 500ms + 150ms cell dissolve keeps the
 *  whole assemble ≈650ms, inside the plan's 300–700ms entrance budget. */
const CELL_DELAYS = [225, 50, 400, 150, 300, 475, 100, 275, 25, 350, 175, 450, 75, 250, 500, 125, 325, 0, 425, 200];
const LAST_CELL = CELL_DELAYS.indexOf(Math.max(...CELL_DELAYS));

interface PixelAssembleProps {
  play: boolean;
  children: React.ReactNode;
  className?: string;
}

/** Mosaic reveal: content sits under a grid of bg-colored cells that
 *  dissolve in scrambled order once `play` is true. */
export function PixelAssemble({ play, children, className }: PixelAssembleProps) {
  const [done, setDone] = useState(false);

  return (
    <div className={`relative ${className ?? ""}`}>
      {children}
      {!done && (
        <div
          className="absolute inset-0 z-10 grid grid-cols-5 grid-rows-4 pointer-events-none"
          aria-hidden="true"
        >
          {CELL_DELAYS.map((delay, i) => (
            <div
              key={i}
              className={`bg-background px-cell ${play ? "px-cell-play" : ""}`}
              style={{ animationDelay: `${delay}ms` }}
              onAnimationEnd={i === LAST_CELL ? () => setDone(true) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
