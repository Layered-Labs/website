import type { CSSProperties, ReactNode } from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

// Shared building blocks for section animations. They use the same type and
// colours as the rest of the write-up (the ortho page's brandkit): Satoshi,
// ink on white, grey tracks, model colours, and lime for the one number that
// matters. Animations built on <Stage> are laid out at the figure's real
// width, so 17px in an animation is 17px on screen, on a phone too.
//
// Write timing in seconds, not frames: the player runs at 60fps, and seconds
// keep every animation correct if that ever changes.

export const C = {
  ink: "#0D0D0D",
  text: "#2B2B2B",
  mid: "#3F3F3F",
  soft: "#5A5A5A",
  rule: "#E6E6E6",
  track: "#F0F0F0",
  grey: "#CFCFCF",
  paper: "#FFFFFF",
  lime: "#C6F432",
} as const;

export const FONT = { sans: "var(--font-sans)" } as const;


/** Seconds since the animation started. */
export function useTime(): number {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
}

/** CSS `ease`, the default for transitions on the ortho page. */
export const ease = Easing.bezier(0.25, 0.1, 0.25, 1);
export const easeOut = Easing.out(Easing.cubic);
export const easeInOut = Easing.inOut(Easing.cubic);
export const linear = (x: number) => x;

/** 0 to 1 over `duration` seconds starting at `start`, eased and clamped. */
export function tween(t: number, start: number, duration: number, easing: (x: number) => number = ease): number {
  return interpolate(t, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });
}

export const mix = (a: number, b: number, p: number) => a + (b - a) * p;

/**
 * The stage every animation draws on: white, Satoshi, ink text. It takes the
 * height of its content, and the player sizes the figure to fit it, so an
 * animation never needs a hand-set height and never gets cut off.
 */
export function Stage({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      data-anim-stage=""
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        background: C.paper,
        color: C.ink,
        fontFamily: FONT.sans,
        fontSize: 17,
        lineHeight: 1.55,
        WebkitFontSmoothing: "antialiased",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Fades and lifts children in, starting at `at` seconds (the ortho page's `pop`). */
export function Reveal({ at, children, style }: { at: number; children: ReactNode; style?: CSSProperties }) {
  const p = tween(useTime(), at, 0.4);
  return <div style={{ opacity: p, transform: `translateY(${(1 - p) * 8}px)`, ...style }}>{children}</div>;
}

/**
 * `count` distinct indices from 0 to total - 1, in a fixed order for a given
 * seed, so every frame and every loop match. A seeded shuffle that always
 * finishes; results are cached because figures call it on every frame.
 */
const PICKS = new Map<string, number[]>();
export function pick(total: number, count: number, seed: number): number[] {
  const key = `${total}:${count}:${seed}`;
  const hit = PICKS.get(key);
  if (hit) return hit;
  let a = seed >>> 0;
  const rand = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const idx = Array.from({ length: total }, (_, i) => i);
  const n = Math.min(count, total);
  for (let i = 0; i < n; i++) {
    const j = i + Math.floor(rand() * (total - i));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  const out = idx.slice(0, n);
  PICKS.set(key, out);
  return out;
}
