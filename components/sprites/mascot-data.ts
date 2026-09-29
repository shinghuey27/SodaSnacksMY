// One pixel grid and palette system for every S/K appearance on the site.
import type { PixelFrame, SpriteDef } from "./sprite-types";

type Character = "S" | "K";
type Pose = "idle" | "stepA" | "stepB" | "wave" | "jump";
const WIDTH = 28;
const HEIGHT = 40;

const sharedPalette = {
  o: "#29201f", f: "#ffe1b6", e: "#211d1d", c: "#e99d8c",
  w: "#fff9ec", t: "#38343a", T: "#514b50",
  h: "#70432f", H: "#8c5b3e", a: "#e994a6",
  b: "#326c9b", B: "#4b85b3", p: "#244766",
  s: "#28674b", S: "#3a8460",
};

function drawCharacter(kind: Character, pose: Pose, blinking = false): PixelFrame {
  const grid = Array.from({ length: HEIGHT }, () => Array<string>(WIDTH).fill("."));
  const dot = (x: number, y: number, color: string) => {
    if (x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT) grid[y][x] = color;
  };
  const box = (x: number, y: number, w: number, h: number, color: string) => {
    for (let yy = y; yy < y + h; yy++)
      for (let xx = x; xx < x + w; xx++) dot(xx, yy, color);
  };
  const pattern = (x: number, y: number, rows: string[], color: string) => {
    rows.forEach((row, yy) => [...row].forEach((cell, xx) => {
      if (cell === "#") dot(x + xx, y + yy, color);
    }));
  };

  const leftStep = pose === "stepA" ? -2 : pose === "stepB" ? 1 : 0;
  const rightStep = pose === "stepB" ? 2 : pose === "stepA" ? -1 : 0;
  const lift = pose === "jump" ? -2 : 0;
  for (const [x, step] of [[9, leftStep], [16, rightStep]] as const) {
    box(x + step - 1, 29 + lift, 6, 8, "o");
    box(x + step, 29 + lift, 4, 6, "b");
    box(x + step, 35 + lift, 4, 1, "B");
    box(x + step - 1, 37 + lift, 7, 3, "o");
    box(x + step, 37 + lift, 5, 2, "s");
    box(x + step + 1, 37 + lift, 2, 1, "S");
    box(x + step + 4, 38 + lift, 2, 1, "w");
    box(x + step, 39 + lift, 6, 1, "w");
  }

  // A visible neck and level shoulders keep the posture upright.
  box(11, 18, 6, 3, "o");
  box(12, 18, 4, 2, "f");
  box(7, 20, 14, 12, "o");
  box(8, 21, 12, 10, "t");
  box(5, 21, 4, 10, "o");
  box(6, 22, 2, 8, "t");
  box(6, 23, 1, 5, "T");
  if (pose === "wave") {
    box(20, 16, 4, 9, "o");
    box(21, 17, 2, 6, "t");
    box(20, 14, 5, 4, "o");
    box(21, 14, 3, 3, "f");
  } else {
    box(19, 21, 4, 10, "o");
    box(20, 22, 2, 8, "t");
    box(21, 23, 1, 5, "T");
    box(20, 30, 3, 3, "o");
    box(20, 30, 2, 2, "f");
  }
  box(5, 30, 3, 3, "o");
  box(6, 30, 2, 2, "f");

  // Bib, straps, buttons and the S/K chest badge.
  box(8, 22, 12, 11, "o");
  box(9, 23, 10, 9, "b");
  box(9, 21, 2, 6, "B");
  box(17, 21, 2, 6, "B");
  dot(10, 25, "o");
  dot(17, 25, "o");
  box(11, 26, 6, 5, "o");
  box(12, 27, 4, 3, "p");
  pattern(12, 26, kind === "S"
    ? [".###", "##..", ".##.", "..##", "###."]
    : ["#..#", "#.#.", "##..", "#.#.", "#..#"], "w");

  if (kind === "S") {
    // Hair sits behind the face, with two distinct outward pigtails.
    box(5, 4, 18, 12, "o");
    box(6, 5, 16, 10, "h");
    box(2, 9, 4, 7, "o");
    box(3, 10, 2, 5, "h");
    box(3, 15, 2, 2, "o");
    dot(3, 15, "h");
    box(22, 9, 4, 7, "o");
    box(23, 10, 2, 5, "h");
    box(23, 15, 2, 2, "o");
    dot(24, 15, "h");
    box(4, 9, 3, 2, "a");
    box(21, 9, 3, 2, "a");
  } else {
    box(5, 4, 18, 12, "o");
    box(6, 5, 16, 10, "h");
  }

  // Keep ears small: the broad ears in the first draft changed their faces.
  box(7, 7, 14, 11, "o");
  box(8, 8, 12, 9, "f");
  box(6, 11, 2, 3, "o");
  dot(7, 12, "f");
  box(20, 11, 2, 3, "o");
  dot(20, 12, "f");
  box(10, 17, 8, 2, "o");
  box(11, 17, 6, 1, "f");

  box(6, 3, 16, 6, "o");
  box(8, 2, kind === "S" ? 12 : 13, kind === "S" ? 2 : 3, "o");
  if (kind === "S") {
    box(7, 4, 14, 4, "h");
    box(9, 3, 9, 2, "H");
    box(7, 8, 2, 4, "h");
    box(19, 8, 2, 4, "h");
    box(9, 7, 3, 2, "h");
    box(15, 7, 3, 2, "h");
    dot(11, 7, "H");
  } else {
    box(10, 1, 3, 2, "o");
    box(19, 2, 3, 2, "o");
    box(7, 4, 14, 4, "h");
    box(9, 3, 10, 3, "H");
    box(7, 8, 2, 4, "h");
    box(19, 8, 2, 4, "h");
    pattern(9, 7, ["##...##..##", "#....#....#"], "h");
  }

  box(8, 13, 2, 2, "c");
  box(18, 13, 2, 2, "c");
  if (blinking) {
    box(10, 11, 2, 1, "e");
    box(16, 11, 2, 1, "e");
  } else {
    box(10, 10, 2, 2, "e");
    box(16, 10, 2, 2, "e");
  }
  dot(14, 13, "e");
  box(12, 15, 4, 1, "e");
  dot(11, 14, "e");
  dot(16, 14, "e");
  return grid.map((row) => row.join(""));
}

function makeMascot(kind: Character): SpriteDef {
  return {
    width: WIDTH,
    height: HEIGHT,
    palette: kind === "S" ? sharedPalette : {
      ...sharedPalette,
      h: "#71251e", H: "#8d3126",
      b: "#c8222b", B: "#e0373d", p: "#262126",
      s: "#242329", S: "#46434a",
    },
    frames: {
      idle: [drawCharacter(kind, "idle"), drawCharacter(kind, "idle"), drawCharacter(kind, "idle"), drawCharacter(kind, "idle", true)],
      walk: [drawCharacter(kind, "stepA"), drawCharacter(kind, "stepB")],
      wave: [drawCharacter(kind, "idle"), drawCharacter(kind, "wave")],
      jump: [drawCharacter(kind, "jump")],
    },
  };
}

export const MASCOT_S = makeMascot("S");
export const MASCOT_K = makeMascot("K");

// Every animation frame is a complete character illustration.
// The grid frames remain available as a lightweight fallback.
MASCOT_S.artwork = {
  src: "/mascots/s-animations.png",
  frameWidth: 530,
  frameHeight: 742,
  sequences: { idle: [0], wave: [0, 3], greet: [0, 0, 0, 3, 3, 0], jump: [0] },
  walk: {
    src: "/mascots/s-walk.png",
    frameWidth: 596,
    frameHeight: 660,
    sequence: [0, 1, 2, 3],
  },
};
MASCOT_K.artwork = {
  src: "/mascots/k-animations.png",
  frameWidth: 530,
  frameHeight: 742,
  sequences: { idle: [0], wave: [0, 3], greet: [0, 0, 0, 3, 3, 0], jump: [0] },
  walk: {
    src: "/mascots/k-walk.png",
    frameWidth: 595.5,
    frameHeight: 660,
    sequence: [0, 1, 2, 3],
  },
};
