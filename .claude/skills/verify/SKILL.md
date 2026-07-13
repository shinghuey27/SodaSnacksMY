---
name: verify
description: Build, launch, and drive the SodaSnacks landing page to verify changes at the browser surface
---

# Verifying SodaSnacks changes

Single-page Next.js app (App Router), npm-based. No test framework — verification is driving the page in a browser.

## Launch

Use the Browser pane: `preview_start` with name `sodasnacks-dev` (defined in `.claude/launch.json`, runs `npm run dev` on port 3000). Dev server hot-reloads on edit; console errors persist across HMR, so old compile errors linger in `read_console_messages` — reload the page and re-check before trusting them.

## Flows worth driving

- **Language toggle**: EN/中文 buttons in header. State is client-only (`useState` in `app/page.tsx`) — resets on reload; switching language can shift scroll position.
- **Anchor nav**: header links → `#portfolio` / `#services` / `#contact`. Sections have `scroll-mt-20` to clear the 80px sticky header.
- **Mobile (375x812)**: nav links hide, hamburger menu appears (`md:hidden`); menu closes on link tap.
- **Contact form** (`components/contact.tsx`): fields are `required`; whitespace-only input passes native validation and is caught by a trim guard → shake + toast. Toast (`pixel-achievement-toast.tsx`) renders `fixed bottom-8 right-6` and auto-hides after **3.2s — screenshots usually miss it**; verify via DOM query for `.fixed.bottom-8.right-6` immediately after `form.requestSubmit()`.
- **⚠️ Do not submit the form with valid data** — `/api/contact` sends a real email (Resend) and a real Telegram message.
- Easter egg: clicking hero mascots repeatedly unlocks the Snack Catch mini-game.

## Gotchas

- Sections render statically (no in-view animations); a blank screenshot mid-scroll is a tooling artifact, not a page bug.
- The dark circular "N" badge bottom-left is the Next.js dev indicator, dev-only.
