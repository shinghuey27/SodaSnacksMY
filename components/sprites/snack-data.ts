// Pixel-art snack & soda sprites — pure data, no React imports.
// Grid legend: each char is a palette key, "." = transparent.

import type { SpriteDef } from "./sprite-types";

export const SODA_CAN: SpriteDef = {
  width: 8,
  height: 12,
  palette: {
    o: "#cfd4dc", // silver rim
    r: "#e63946", // can body
    R: "#c62b38", // shaded edge
    w: "#ffffff", // "S" label
  },
  frames: {
    idle: [
      [
        ".oooooo.",
        ".oooooo.",
        "rrrrrrrR",
        "rrwwwrrR",
        "rrwrrrrR",
        "rrwwwrrR",
        "rrrrwrrR",
        "rrwwwrrR",
        "rrrrrrrR",
        "rrrrrrrR",
        ".oooooo.",
        ".oooooo.",
      ],
    ],
  },
};

export const BUBBLE_S: SpriteDef = {
  width: 5,
  height: 5,
  palette: { b: "#7EB8FF", w: "#ffffff" },
  frames: {
    idle: [
      [
        ".bbb.",
        "bw..b",
        "b...b",
        "b...b",
        ".bbb.",
      ],
    ],
  },
};

export const BUBBLE_M: SpriteDef = {
  width: 7,
  height: 7,
  palette: { b: "#7EB8FF", w: "#ffffff" },
  frames: {
    idle: [
      [
        "..bbb..",
        ".b...b.",
        "b.w...b",
        "b.....b",
        "b.....b",
        ".b...b.",
        "..bbb..",
      ],
    ],
  },
};

export const BUBBLE_L: SpriteDef = {
  width: 9,
  height: 9,
  palette: { b: "#7EB8FF", w: "#ffffff" },
  frames: {
    idle: [
      [
        "...bbb...",
        ".bb...bb.",
        ".b.ww..b.",
        "b..w....b",
        "b.......b",
        "b.......b",
        ".b.....b.",
        ".bb...bb.",
        "...bbb...",
      ],
    ],
  },
};

export const FRIES: SpriteDef = {
  width: 10,
  height: 12,
  palette: {
    y: "#f4c430", // fries
    Y: "#e0a810", // fries shading
    r: "#e63946", // carton
    R: "#c62b38", // carton shading
    w: "#ffffff", // logo
  },
  frames: {
    idle: [
      [
        "..y..y.Y..",
        ".yy.Yy.y..",
        ".yYyyyyyY.",
        ".yyYyyYyy.",
        "rrrrrrrrrr",
        ".rrrrrrrR.",
        ".rrwwrrrR.",
        ".rrwwrrrR.",
        ".rrrrrrrR.",
        "..rrrrrR..",
        "..rrrrrR..",
        "..rrrrrR..",
      ],
    ],
  },
};

export const DONUT: SpriteDef = {
  width: 10,
  height: 10,
  palette: {
    p: "#f9a8c9", // frosting
    d: "#d9932f", // dough
    y: "#f4c430", // sprinkles
    b: "#3a86ff",
    g: "#4caf50",
  },
  frames: {
    idle: [
      [
        "..pppppp..",
        ".pbppyppp.",
        "ppgppppbpp",
        "ppp....ppp",
        "pyp....pgp",
        "ddd....ddd",
        "dddd..dddd",
        ".dddddddd.",
        "..dddddd..",
        "..........",
      ],
    ],
  },
};

export const POPCORN: SpriteDef = {
  width: 10,
  height: 12,
  palette: {
    w: "#ffffff", // popcorn + box stripe
    y: "#f4c430", // buttered kernels
    r: "#e63946", // box stripe
  },
  frames: {
    idle: [
      [
        "..w.ww.y..",
        ".wwywwyww.",
        "wwywwwwyww",
        ".wwwwwwww.",
        "rwrwrwrwrw",
        "rwrwrwrwrw",
        "rwrwrwrwrw",
        "rwrwrwrwrw",
        ".rwrwrwrw.",
        ".rwrwrwrw.",
        ".rwrwrwrw.",
        ".rwrwrwrw.",
      ],
    ],
  },
};

export const COOKIE: SpriteDef = {
  width: 9,
  height: 9,
  palette: {
    c: "#d9932f", // dough
    C: "#c07f1f", // shading
    k: "#5b3a1e", // choc chips
  },
  frames: {
    idle: [
      [
        "..ccccc..",
        ".ccckccc.",
        "cckcccckc",
        "ccccckccc",
        "ckccccccC",
        "cccckcccC",
        "cckccccCC",
        ".ccckccC.",
        "..CCCCC..",
      ],
    ],
  },
};

export const CANDY: SpriteDef = {
  width: 12,
  height: 7,
  palette: {
    r: "#e63946", // body
    w: "#ffffff", // highlight
    Y: "#f4c430", // wrapper
  },
  frames: {
    idle: [
      [
        "....rrrr....",
        ".Y.rrrrrr.Y.",
        "YYrrwrrrrrYY",
        "YYrrrrrrrrYY",
        "YYrrrrrrrrYY",
        ".Y.rrrrrr.Y.",
        "....rrrr....",
      ],
    ],
  },
};

/** For the game: a pesky bug sprite (catch it and lose points). */
export const BUG: SpriteDef = {
  width: 9,
  height: 8,
  palette: {
    g: "#4caf50", // body
    G: "#3a8a3e", // shading
    k: "#3a3a38", // legs/eyes
    w: "#ffffff",
  },
  frames: {
    idle: [
      [
        "k.......k",
        ".k.....k.",
        "..ggggg..",
        ".gwgggwg.",
        "kgggggggk",
        ".gGgGgGg.",
        "..GgGgG..",
        ".k..k..k.",
      ],
    ],
  },
};

export interface SnackEntry {
  name: string;
  sprite: SpriteDef;
  /** particle colors when popped */
  burstColors: string[];
}

export const SNACK_SET: SnackEntry[] = [
  { name: "soda", sprite: SODA_CAN, burstColors: ["#e63946", "#cfd4dc", "#ffffff"] },
  { name: "bubble-s", sprite: BUBBLE_S, burstColors: ["#7EB8FF", "#ffffff"] },
  { name: "bubble-m", sprite: BUBBLE_M, burstColors: ["#7EB8FF", "#ffffff"] },
  { name: "bubble-l", sprite: BUBBLE_L, burstColors: ["#7EB8FF", "#ffffff"] },
  { name: "fries", sprite: FRIES, burstColors: ["#f4c430", "#e63946"] },
  { name: "donut", sprite: DONUT, burstColors: ["#f9a8c9", "#d9932f", "#f4c430"] },
  { name: "popcorn", sprite: POPCORN, burstColors: ["#ffffff", "#f4c430", "#e63946"] },
  { name: "cookie", sprite: COOKIE, burstColors: ["#d9932f", "#5b3a1e"] },
  { name: "candy", sprite: CANDY, burstColors: ["#e63946", "#f4c430", "#ffffff"] },
];
