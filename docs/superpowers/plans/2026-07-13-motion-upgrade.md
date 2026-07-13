# Motion Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add pixel-arcade entrance animations (CRT scan / pixel assemble / 8-bit step slide) and strengthen the existing snack parallax on the SodaSnacks landing page, per `docs/superpowers/specs/2026-07-13-motion-design.md`.

**Architecture:** A shared `useInView` IntersectionObserver hook (fires once, disabled under reduced motion) toggles CSS animation classes defined in `app/globals.css`. A small `PixelAssemble` overlay component implements the mosaic reveal. Hero animates on mount (above the fold); all other sections animate on first scroll into view. Snack parallax already exists in `floating-snacks.tsx` — only its layer speeds are tuned.

**Tech Stack:** Next.js App Router, Tailwind v4 (`app/globals.css` with root-level `@keyframes`), React 19 client components. **No new dependencies.**

## Global Constraints

- No new npm dependencies (no framer-motion, no GSAP).
- Animations may only use `transform`, `opacity`, `clip-path` — zero layout shift.
- Every entrance plays **once** (IO `once` semantics); re-scrolling must not replay.
- All motion disabled under `prefers-reduced-motion: reduce` via a single CSS media block (belt) plus the hook returning `inView: true` immediately (braces).
- Durations 300–700ms; stagger steps ≤120ms per item.
- **Gotcha:** these elements already carry inline `style.animation` or inline `clipPath` and must NOT receive entrance classes directly — wrap them instead: contact form card (shake animation, `components/contact.tsx`), featured project card swap div (`px-cartridge-in`, `components/portfolio.tsx:99-101`), hero image inner container (decorative `clipPath`, `components/hero.tsx:114-127`).
- No test framework exists in this repo; each task's test cycle is: dev server compiles clean + a specific observable behavior in the Browser pane (dev server: `preview_start` name `sodasnacks-dev`, port 3000). See `.claude/skills/verify/SKILL.md`.

---

### Task 1: Animation foundation — `useInView` hook + CSS vocabulary

**Files:**
- Create: `hooks/use-in-view.ts`
- Modify: `app/globals.css` (append after the `px-jump`/`px-heart-rise` keyframes block, ~line 280+)

**Interfaces:**
- Produces: `useInView<T extends HTMLElement>(threshold?: number): { ref: React.RefObject<T | null>; inView: boolean }` — fires once; `inView` starts `false`, flips `true` permanently. Under reduced motion or missing IO support returns `true` immediately.
- Produces CSS classes used by Tasks 2–5: `.px-hidden`, `.px-step-in`, `.px-scan-in`, `.px-cell`, `.px-cell-play`. Per-element delays are set inline via `style={{ animationDelay: "120ms" }}`.

- [ ] **Step 1: Create the hook**

```ts
// hooks/use-in-view.ts
"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Fires once when the element first enters the viewport.
 * Under reduced motion (or missing IO support) reports true immediately
 * so content is never gated behind an animation.
 */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, threshold, inView]);

  return { ref, inView };
}
```

- [ ] **Step 2: Append the CSS vocabulary to `app/globals.css`**

```css
/* ── Entrance animations (motion upgrade) ─────────────────────
   B: .px-step-in — 8-bit step slide (base vocabulary)
   D: .px-scan-in — CRT scan reveal with glowing scanline
   A: .px-cell(-play) — pixel-assemble overlay cells (see PixelAssemble)
   .px-hidden — pre-entrance state, only under no-preference so
   reduced-motion / no-JS users always see content. */

@media (prefers-reduced-motion: no-preference) {
  .px-hidden {
    opacity: 0;
  }
}

@keyframes px-step-in {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.px-step-in {
  animation: px-step-in 0.45s steps(5, end) both;
}

@keyframes px-scan-clip {
  from {
    clip-path: inset(0 0 100% 0);
  }
  to {
    clip-path: inset(0 0 0% 0);
  }
}

@keyframes px-scan-bar {
  0% {
    top: 0;
    opacity: 1;
  }
  92% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

.px-scan-in {
  position: relative;
  /* `backwards` (not `both`): a persisting final clip-path would clip the
     pixel box-shadows forever; reverting to no clip after the run restores them. */
  animation: px-scan-clip 0.7s steps(9, end) backwards;
}

.px-scan-in::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 4px;
  background: var(--pixel-green);
  box-shadow: 0 0 10px var(--pixel-green);
  pointer-events: none;
  opacity: 0;
  animation: px-scan-bar 0.7s steps(9, end) both;
  animation-delay: inherit;
}

@keyframes px-cell-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.px-cell {
  opacity: 1;
}

.px-cell-play {
  animation: px-cell-out 0.15s steps(2, end) both;
}

/* Kill switch: reduced motion disables the whole vocabulary. */
@media (prefers-reduced-motion: reduce) {
  .px-step-in,
  .px-scan-in,
  .px-scan-in::after,
  .px-cell-play {
    animation: none !important;
  }
  .px-cell {
    opacity: 0;
  }
  .px-scan-in::after {
    opacity: 0;
  }
}
```

- [ ] **Step 3: Verify compile**

Run in Browser pane: reload `http://localhost:3000`, then check `preview_logs` for errors.
Expected: page renders unchanged (nothing consumes the classes yet), no compile errors.

- [ ] **Step 4: Commit**

```bash
git add hooks/use-in-view.ts app/globals.css
git commit -m "feat: entrance animation foundation (useInView + CSS vocabulary)"
```

---

### Task 2: Hero load animations — B text stagger + D image scan

**Files:**
- Modify: `components/hero.tsx`

**Interfaces:**
- Consumes: `.px-step-in`, `.px-scan-in` from Task 1. No hook needed — hero is above the fold and animates on mount.

- [ ] **Step 1: Stagger the text column**

In `components/hero.tsx`, add entrance classes with inline delays to the four text-column children (logo div, h1, h2, p, CTA wrapper). The CTA (`PixelButton`) gets a wrapper div — do not touch `PixelButton` internals.

```tsx
            {/* START */}
            <div className="relative flex justify-center lg:justify-start mb-8 px-step-in">
```

```tsx
            <h1
              className={`${pixelFontClass} text-lg md:text-2xl lg:text-3xl text-foreground mb-3 leading-relaxed text-balance px-step-in`}
              style={{ animationDelay: "120ms" }}
            >
              {t.tagline}
            </h1>
            <h2
              className={`${pixelFontClass} text-base md:text-xl lg:text-2xl text-pixel-red mb-6 px-step-in`}
              style={{ animationDelay: "240ms" }}
            >
              {t.subtitle}
            </h2>

            <p
              className="max-w-lg text-base md:text-lg text-muted-foreground mb-8 leading-relaxed mx-auto lg:mx-0 px-step-in"
              style={{ animationDelay: "360ms" }}
            >
              {t.description}
            </p>

            <div className="px-step-in" style={{ animationDelay: "480ms" }}>
              <PixelButton href="#contact" size="lg">
                {t.cta}
              </PixelButton>
            </div>
```

- [ ] **Step 2: CRT-scan the framed image block**

Apply `.px-scan-in` to the **outer** `div.relative` that contains both the pixel-frame decoration and the image container (NOT the inner container — it has an inline decorative `clipPath` that would conflict). Delay 250ms so text leads.

```tsx
          {/* Right: Hero image with pixel frame */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative px-scan-in" style={{ animationDelay: "250ms" }}>
```

- [ ] **Step 3: Verify in browser**

Reload `http://localhost:3000` (desktop 1440×900).
Expected: headline → subtitle → paragraph → CTA pop in as discrete steps top-to-bottom; framed illustration reveals top-to-bottom with a green scanline that fades at the bottom; after ~1s everything is static and identical to the pre-change layout. Reload once more to confirm it replays only on load (it's mount-driven).

- [ ] **Step 4: Commit**

```bash
git add components/hero.tsx
git commit -m "feat: hero entrance animations (step-slide text, CRT-scan image)"
```

---

### Task 3: `PixelAssemble` component + portfolio wiring

**Files:**
- Create: `components/pixel-assemble.tsx`
- Modify: `components/portfolio.tsx`

**Interfaces:**
- Consumes: `useInView` (Task 1), `.px-cell` / `.px-cell-play` / `.px-hidden` / `.px-step-in` (Task 1).
- Produces: `PixelAssemble({ play, children, className }: { play: boolean; children: React.ReactNode; className?: string })` — overlays a 5×4 grid of background-colored cells; when `play` flips true the cells fade out on a scrambled stagger, then the overlay unmounts.

- [ ] **Step 1: Create the component**

```tsx
// components/pixel-assemble.tsx
"use client";

import { useState } from "react";

/** Scrambled per-cell delays (ms). Index 14 is the last to finish. */
const CELL_DELAYS = [450, 100, 800, 300, 600, 950, 200, 550, 50, 700, 350, 900, 150, 500, 1000, 250, 650, 0, 850, 400];
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
```

- [ ] **Step 2: Wire the portfolio section**

In `components/portfolio.tsx`:

Add imports and the hook (component top, after `const selected = ...`):

```tsx
import { PixelAssemble } from "./pixel-assemble";
import { useInView } from "@/hooks/use-in-view";
```

```tsx
  const { ref: gridRef, inView } = useInView<HTMLDivElement>();
```

Wrap the desktop featured card (keep the existing `key`/`px-cartridge-in` div intact inside):

```tsx
        <div className="hidden md:block max-w-5xl mx-auto" ref={gridRef}>
          <PixelAssemble play={inView}>
            <div
              key={selected.id}
              style={{ animation: "px-cartridge-in 0.3s ease-out" }}
            >
              <ProjectCard project={selected} lang={lang} featured />
            </div>
          </PixelAssemble>
```

Stagger the cartridges (same file, the `grid grid-cols-4` map):

```tsx
          <div className="grid grid-cols-4 gap-4 lg:gap-6">
            {ordered.map((project, i) => (
              <div
                key={project.id}
                className={inView ? "px-step-in" : "px-hidden"}
                style={{ animationDelay: `${400 + i * 80}ms` }}
              >
                <Cartridge
                  project={project}
                  lang={lang}
                  active={project.id === selectedId}
                  onSelect={() => setSelectedId(project.id)}
                />
              </div>
            ))}
          </div>
```

Mobile carousel gets one step-in as a whole (it is `md:hidden`, so give it its own observer target — wrap it):

```tsx
        {/* ── Mobile: swipeable carousel ── */}
        <MobileCarouselReveal>
          <MobileCarousel projects={ordered} lang={lang} />
        </MobileCarouselReveal>
```

with this small helper in the same file (above `Cartridge`):

```tsx
function MobileCarouselReveal({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);
  return (
    <div ref={ref} className={`md:hidden ${inView ? "px-step-in" : "px-hidden"}`}>
      {children}
    </div>
  );
}
```

Note: `MobileCarousel` renders its own `md:hidden` root — that stays; nesting under another `md:hidden` div is harmless.

- [ ] **Step 3: Verify in browser**

Desktop 1440×900, reload at top, scroll slowly to the portfolio section.
Expected: featured card materializes as ~20 mosaic tiles dissolving in scrambled order (~1.2s), cartridges then step in left-to-right. Scroll away and back: **no replay**. Click a different cartridge: swap animation (`px-cartridge-in`) still plays and no overlay reappears. Mobile 375×812: carousel steps in once.

- [ ] **Step 4: Commit**

```bash
git add components/pixel-assemble.tsx components/portfolio.tsx
git commit -m "feat: pixel-assemble reveal for featured work, staggered cartridges"
```

---

### Task 4: Services cards — staggered step slide

**Files:**
- Modify: `components/services.tsx`

**Interfaces:**
- Consumes: `useInView`, `.px-step-in`, `.px-hidden` (Task 1). `ServiceCard` is untouched.

- [ ] **Step 1: Wire the grid**

```tsx
import { useInView } from "@/hooks/use-in-view";
```

Inside `Services`, add the hook and wrap each card:

```tsx
  const { ref, inView } = useInView<HTMLDivElement>();
```

```tsx
        <div ref={ref} className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service, i) => (
            <div
              key={i}
              className={inView ? "px-step-in" : "px-hidden"}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <ServiceCard service={service} lang={lang} index={i} />
            </div>
          ))}
        </div>
```

- [ ] **Step 2: Verify in browser**

Scroll from top to services (desktop): three cards step in left-to-right, 120ms apart. Scroll back up and down again: no replay. Mobile: cards stack and step in top-to-bottom.

- [ ] **Step 3: Commit**

```bash
git add components/services.tsx
git commit -m "feat: staggered entrance for service cards"
```

---

### Task 5: Contact — CRT scan form window + step-in info card

**Files:**
- Modify: `components/contact.tsx`

**Interfaces:**
- Consumes: `useInView`, `.px-scan-in`, `.px-step-in`, `.px-hidden` (Task 1).
- **Constraint reminder:** the form card div carries inline `animation` (shake) — the scan class goes on a NEW wrapper around it, never on the card itself.

- [ ] **Step 1: Wire the two-column grid**

Add the import and hook inside `Contact`:

```tsx
import { useInView } from "@/hooks/use-in-view";
```

```tsx
  const { ref: gridInViewRef, inView } = useInView<HTMLDivElement>(0.15);
```

Attach `ref` to the existing grid container and wrap the form card:

```tsx
      <div ref={gridInViewRef} className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 relative z-10">
        {/* ══ FORM CARD ══ */}
        <div className={inView ? "px-scan-in" : "px-hidden"}>
          <div
            className="relative bg-card border-[3px] border-foreground p-7 transition-[transform,box-shadow] duration-150"
            ...existing props unchanged...
          >
            ...existing card content unchanged...
          </div>
        </div>
```

(The wrapper takes the grid-child position; the card keeps its shake/hover inline styles. Close the new wrapper div after the form card's closing tag.)

Info card gets step-in with a slight delay (class appended to its existing className — safe, it has no inline `animation`):

```tsx
        {/* ══ INFO CARD ══ */}
        <div
          className={`relative bg-card border-[3px] border-foreground p-7 transition-[transform,box-shadow] duration-150 ${inView ? "px-step-in" : "px-hidden"}`}
          style={{
            boxShadow: "6px 6px 0 rgba(58,58,56,0.8)",
            outline: "2px dashed rgba(58,58,56,.12)",
            outlineOffset: "-4px",
            animationDelay: "300ms",
          }}
```

- [ ] **Step 2: Verify in browser**

Scroll to contact (desktop): form window scans in top-to-bottom with scanline, info card steps in ~300ms later. Submit the form empty afterwards: shake still works (wrapper isolation held). Scroll away/back: no replay. Mobile: both columns stack, same behavior.

- [ ] **Step 3: Commit**

```bash
git add components/contact.tsx
git commit -m "feat: contact section entrances (CRT scan form, step-in info card)"
```

---

### Task 6: Parallax tune + full-page sweep

**Files:**
- Modify: `components/floating-snacks.tsx:57` (`LAYER_SPEED`)

**Interfaces:**
- Consumes: nothing new. Parallax infrastructure (3 layers, rAF, reduced-motion) already exists — only constants change.

- [ ] **Step 1: Raise the layer speeds**

```ts
const LAYER_SPEED: Record<1 | 2 | 3, number> = { 1: 0.05, 2: 0.11, 3: 0.18 };
```

- [ ] **Step 2: Verify parallax**

Scroll through hero and contact slowly (desktop): the three snack layers drift downward at visibly different rates; snacks stay off the text (positions hug the edges; max shift at 1000px scrolled is 180px on the fastest layer — check the hero subtitle and CTA remain clear on 1440×900 and 375×812; if any sprite crosses text, reduce that layer's speed by 0.02 and re-check).

- [ ] **Step 3: Full-page acceptance sweep (spec §验收标准)**

1. Desktop, EN: reload at top, scroll once through the page → hero (auto), featured assemble, cartridges, services, contact each animate exactly once; scroll back up/down → nothing replays.
2. Switch to 中文, repeat → identical behavior, no text overflow during animations.
3. Mobile 375×812: repeat pass 1; check no horizontal overflow (`document.documentElement.scrollWidth === 375` mid-animation and after).
4. Reduced motion: code-level check — confirm the `@media (prefers-reduced-motion: reduce)` block covers `.px-step-in/.px-scan-in/.px-cell-play` and `useInView` short-circuits on `reduced`; ask the user to flip macOS System Settings → Accessibility → Display → Reduce Motion for a live pass if they want end-to-end proof.
5. `preview_logs` and browser console: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/floating-snacks.tsx
git commit -m "feat: strengthen snack parallax layer speeds"
```
