"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { AppMark } from "@/lib/content/types";

const COLS = 18;
const ROWS = 3;
// How often a new mark starts, and how many play at once. Kept low so the band stays calm.
const EVERY_MS = 1400;
const PLAY_MS = 2000;

/**
 * A calm band of the app's mark at the top of its write-up. Every mark is still and faint;
 * now and then one replays the mark's own animation (its parts fade in left to right),
 * so only one or two move at any moment.
 */
export function AppHero({ mark, accent, soft }: { mark: AppMark; accent: string; soft: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const marks = Array.from(root.querySelectorAll<SVGSVGElement>("svg"));
    // Only marks the visitor can see.
    const visible = () => {
      const w = root.clientWidth;
      return marks.filter((m) => {
        const r = m.getBoundingClientRect();
        const left = r.left - root.getBoundingClientRect().left;
        return left > 0 && left + r.width < w && !m.classList.contains("play");
      });
    };
    let last: SVGSVGElement | null = null;
    const tick = () => {
      const pool = visible().filter((m) => m !== last);
      if (!pool.length) return;
      const m = pool[Math.floor(Math.random() * pool.length)];
      last = m;
      m.classList.add("play");
      window.setTimeout(() => m.classList.remove("play"), PLAY_MS);
    };
    tick();
    const id = window.setInterval(tick, EVERY_MS);
    return () => window.clearInterval(id);
  }, []);

  const cells = Array.from({ length: COLS * ROWS }, (_, i) => i);
  return (
    <div
      className="wu-hero"
      ref={ref}
      aria-hidden="true"
      style={{ "--app-accent": accent, "--app-soft": soft } as CSSProperties}
    >
      {Array.from({ length: ROWS }, (_, row) => (
        <div className="wu-hero-row" key={row}>
          {cells.slice(row * COLS, row * COLS + COLS).map((i) => (
            <svg key={i} viewBox={mark.viewBox}>
              {mark.paths.map((d) => (
                <path key={d} d={d} />
              ))}
            </svg>
          ))}
        </div>
      ))}
    </div>
  );
}
