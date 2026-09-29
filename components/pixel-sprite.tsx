"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import type { PixelFrame, SpriteDef } from "./sprites/sprite-types";

export interface PixelRect {
  x: number;
  y: number;
  w: number;
  fill: string;
}

const rectCache = new Map<PixelFrame, PixelRect[]>();

/** Merge consecutive same-color cells per row into single wide rects. */
export function frameToRects(
  frame: PixelFrame,
  palette: Record<string, string>,
): PixelRect[] {
  const cached = rectCache.get(frame);
  if (cached) return cached;

  const rects: PixelRect[] = [];
  for (let y = 0; y < frame.length; y++) {
    const row = frame[y];
    let x = 0;
    while (x < row.length) {
      const key = row[x];
      if (key === "." || !palette[key]) {
        x++;
        continue;
      }
      let w = 1;
      while (x + w < row.length && row[x + w] === key) w++;
      rects.push({ x, y, w, fill: palette[key] });
      x += w;
    }
  }
  rectCache.set(frame, rects);
  return rects;
}

interface PixelSpriteProps {
  sprite: SpriteDef;
  /** which animation from sprite.frames; defaults to "idle" */
  anim?: string;
  /** show a fixed frame index instead of animating */
  frame?: number;
  /** frames per second when animating (sprite anims want 2–4) */
  fps?: number;
  className?: string;
  flipX?: boolean;
}

export function PixelSprite({
  sprite,
  anim = "idle",
  frame,
  fps,
  className,
  flipX = false,
}: PixelSpriteProps) {
  const frames = sprite.artwork
    ? anim === "walk" && sprite.artwork.walk
      ? sprite.artwork.walk.sequence
      : sprite.artwork.sequences[anim] ?? sprite.artwork.sequences.idle
    : sprite.frames[anim] ?? sprite.frames.idle;
  const reduced = useReducedMotion();
  const [autoFrame, setAutoFrame] = useState(0);

  useEffect(() => {
    if (reduced || frame !== undefined || !fps || frames.length < 2) return;
    setAutoFrame(0);
    const id = setInterval(
      () => setAutoFrame((f) => (f + 1) % frames.length),
      1000 / fps,
    );
    return () => clearInterval(id);
  }, [frame, fps, frames, reduced]);

  const idx = reduced ? 0 : frame !== undefined ? frame % frames.length : autoFrame % frames.length;
  const rects = sprite.artwork ? [] : frameToRects(frames[idx] as PixelFrame, sprite.palette);

  if (sprite.artwork) {
    const useWalkSheet = anim === "walk" && sprite.artwork.walk;
    const { src, frameWidth, frameHeight } = useWalkSheet || sprite.artwork;
    const pose = frames[idx] as number;
    const x = (pose % 2) * frameWidth;
    const y = Math.floor(pose / 2) * frameHeight;
    return (
      <svg
        viewBox={`${x} ${y} ${frameWidth} ${frameHeight}`}
        className={className}
        style={{
          imageRendering: "pixelated",
          transform: useWalkSheet && flipX ? "scaleX(-1)" : undefined,
        }}
        aria-hidden="true"
      >
        <image
          href={src}
          x={0}
          y={0}
          width={frameWidth * 2}
          height={frameHeight * 2}
          style={{ imageRendering: "pixelated" }}
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox={`0 0 ${sprite.width} ${sprite.height}`}
      className={className}
      shapeRendering="crispEdges"
      style={{
        imageRendering: "pixelated",
        transform: flipX ? "scaleX(-1)" : undefined,
      }}
      aria-hidden="true"
    >
      {rects.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={r.fill} />
      ))}
    </svg>
  );
}
