// S & K mascot sprites (16×24), redrawn in pixel art from the founders'
// hand-drawn characters. Pure data — no React imports (reusable for a
// future voxel version).

import type { PixelFrame, SpriteDef } from "./sprite-types";

function withRows(base: PixelFrame, overrides: Record<number, string>): PixelFrame {
  const out = base.slice();
  for (const [i, row] of Object.entries(overrides)) out[Number(i)] = row;
  return out;
}

/* ── S: girl with brown pigtails, blue overalls, green sneakers ── */

const S_BASE: PixelFrame = [
  "....hhhhhhhh....",
  "..hhhhhhhhhhhh..",
  ".hhhhhhhhhhhhhh.",
  "hhhhhhhhhhhhhhhh",
  "hhhhffffffffhhhh",
  "hh.hfkffffkfh.hh",
  "hh.hcffffffch.hh",
  "...hfffkkfffh...",
  "....ffffffff....",
  "...ssssssssss...",
  "..ssbssssssbss..",
  "..ssbbwwwbbbss..",
  "..ssbbwbbbbbss..",
  "..ssbbwwwbbbss..",
  "..ffbbbbwbbbff..",
  "....bbwwwbbb....",
  "....bbbbbbbb....",
  "....bbb..bbb....",
  "....bbb..bbb....",
  "....bbb..bbb....",
  "....bbb..bbb....",
  "...ggg....ggg...",
  "...ggg....ggg...",
  "..wwww....wwww..",
];

const S_BLINK = withRows(S_BASE, {
  5: "hh.hffffffffh.hh",
  6: "hh.hckffffkch.hh",
});

const S_WALK_A = withRows(S_BASE, {
  21: "..ggg....ggg....",
  22: "..ggg....ggg....",
  23: ".wwww....wwww...",
});

const S_WALK_B = withRows(S_BASE, {
  21: "....ggg....ggg..",
  22: "....ggg....ggg..",
  23: "...wwww....wwww.",
});

const S_WAVE_A = withRows(S_BASE, {
  10: "..ssbssssssbsff.",
});

const S_WAVE_B = withRows(S_BASE, {
  9: "...ssssssssssff.",
});

const S_JUMP = withRows(S_BASE, {
  9: "..ffssssssssff..",
});

export const MASCOT_S: SpriteDef = {
  width: 16,
  height: 24,
  palette: {
    h: "#8b5a3c", // pigtail brown
    f: "#f9c97e", // skin
    k: "#3a3a38", // eyes / mouth
    c: "#f9a8c9", // cheeks
    s: "#55554e", // shirt
    b: "#3a86ff", // overalls
    w: "#ffffff", // "S" + soles
    g: "#4caf50", // sneakers
  },
  frames: {
    idle: [S_BASE, S_BASE, S_BASE, S_BLINK],
    walk: [S_WALK_A, S_WALK_B],
    wave: [S_WAVE_A, S_WAVE_B],
    jump: [S_JUMP],
  },
};

/* ── K: boy with dark red hair, red overalls, black sneakers ── */

const K_BASE: PixelFrame = [
  "....hhhhhhhh....",
  "..hhhhhhhhhhhh..",
  ".hhhhhhhhhhhhhh.",
  ".hhhhhhhhhhhhhh.",
  ".hhhffffffffhh..",
  "..hhfkffffkfhh..",
  "..hhcffffffchh..",
  "...hfffkkfffh...",
  "....ffffffff....",
  "...ssssssssss...",
  "..ssrssssssrss..",
  "..ssrkwkwkkrss..",
  "..ssrkwwkkkrss..",
  "..ssrkwkkkkrss..",
  "..ffrkwwkkkrff..",
  "....rkwkwkkr....",
  "....rrrrrrrr....",
  "....rrr..rrr....",
  "....rrr..rrr....",
  "....rrr..rrr....",
  "....rrr..rrr....",
  "...kkk....kkk...",
  "...kkk....kkk...",
  "..wwww....wwww..",
];

const K_BLINK = withRows(K_BASE, {
  5: "..hhffffffffhh..",
  6: "..hhckffffkchh..",
});

const K_WALK_A = withRows(K_BASE, {
  21: "..kkk....kkk....",
  22: "..kkk....kkk....",
  23: ".wwww....wwww...",
});

const K_WALK_B = withRows(K_BASE, {
  21: "....kkk....kkk..",
  22: "....kkk....kkk..",
  23: "...wwww....wwww.",
});

const K_WAVE_A = withRows(K_BASE, {
  10: "..ssrssssssrsff.",
});

const K_WAVE_B = withRows(K_BASE, {
  9: "...ssssssssssff.",
});

const K_JUMP = withRows(K_BASE, {
  9: "..ffssssssssff..",
});

export const MASCOT_K: SpriteDef = {
  width: 16,
  height: 24,
  palette: {
    h: "#7a2e2e", // dark red-brown hair
    f: "#f9c97e", // skin
    k: "#2e2e2c", // eyes / "K" pocket / sneakers
    c: "#f4a58a", // cheeks
    s: "#55554e", // shirt
    r: "#e63946", // overalls
    w: "#ffffff", // "K" + soles
  },
  frames: {
    idle: [K_BASE, K_BASE, K_BASE, K_BLINK],
    walk: [K_WALK_A, K_WALK_B],
    wave: [K_WAVE_A, K_WAVE_B],
    jump: [K_JUMP],
  },
};
