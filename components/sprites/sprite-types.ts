// Pure data types for pixel sprites — no React imports so the same
// grid data can later be reused for a 3D voxel version.

/** Rows of palette keys; "." = transparent. All rows same length. */
export type PixelFrame = string[];

export interface SpriteDef {
  width: number;
  height: number;
  palette: Record<string, string>;
  /** Four complete character poses on a two-by-two transparent sprite sheet. */
  artwork?: {
    src: string;
    frameWidth: number;
    frameHeight: number;
    sequences: Record<string, number[]>;
    walk?: {
      src: string;
      frameWidth: number;
      frameHeight: number;
      sequence: number[];
    };
  };
  /** e.g. { idle: [f0, f1], walk: [f0, f1] } — single-frame sprites use { idle: [f0] } */
  frames: Record<string, PixelFrame[]>;
}
