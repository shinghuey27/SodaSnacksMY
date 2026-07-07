// Tiny WebAudio chiptune blips — no audio assets needed.
// All play* functions must only be called from user-gesture handlers
// (click/keydown) so the AudioContext is allowed to start.

const MUTE_KEY = "sodasnacks-muted";

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!ctx) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) return null;
      ctx = new Ctor();
    }
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

export function isMuted(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    return false;
  }
}

export function toggleMuted(): boolean {
  const next = !isMuted();
  try {
    localStorage.setItem(MUTE_KEY, next ? "1" : "0");
  } catch {
    // ignore
  }
  return next;
}

interface Note {
  freq: number;
  /** seconds from now */
  at: number;
  dur: number;
  /** end frequency for a sweep */
  to?: number;
  type?: OscillatorType;
  gain?: number;
}

function play(notes: Note[]) {
  if (isMuted()) return;
  const ac = getCtx();
  if (!ac) return;
  try {
    for (const n of notes) {
      const osc = ac.createOscillator();
      const g = ac.createGain();
      const t0 = ac.currentTime + n.at;
      osc.type = n.type ?? "square";
      osc.frequency.setValueAtTime(n.freq, t0);
      if (n.to) osc.frequency.linearRampToValueAtTime(n.to, t0 + n.dur);
      const vol = n.gain ?? 0.08;
      g.gain.setValueAtTime(vol, t0);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + n.dur);
      osc.connect(g);
      g.connect(ac.destination);
      osc.start(t0);
      osc.stop(t0 + n.dur + 0.02);
    }
  } catch {
    // never let sound break the UI
  }
}

/** Bubble-pop blip for clicking floating snacks / mascots. */
export function playPop() {
  play([{ freq: 880, to: 1320, at: 0, dur: 0.08 }]);
}

/** Positive catch chime (game). */
export function playCatch() {
  play([{ freq: 660, to: 990, at: 0, dur: 0.07, gain: 0.07 }]);
}

/** Negative buzz for catching a bug (game). */
export function playMiss() {
  play([{ freq: 220, to: 110, at: 0, dur: 0.15, type: "sawtooth", gain: 0.06 }]);
}

/** 3-note arpeggio for new best score / secret found. */
export function playFanfare() {
  play([
    { freq: 523, at: 0, dur: 0.1 },
    { freq: 659, at: 0.1, dur: 0.1 },
    { freq: 784, at: 0.2, dur: 0.2 },
  ]);
}
