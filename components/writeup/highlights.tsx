"use client";

import { useEffect, useRef, useState } from "react";
import type { Highlight } from "@/lib/content/types";

// The key facts under a write-up's title (writeup.ts `highlights`). Numbers
// count up once when the row scrolls into view; values that are not numbers
// (a license, say) just show. Reduce Motion shows the final value.

const DURATION = 1200; // ms
const easeOut = (x: number) => 1 - (1 - x) ** 3;

/** Splits "98.5%" into { pre: "", n: 98.5, decimals: 1, comma: false, post: "%" }. */
function parse(value: string) {
  const m = value.match(/^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const raw = m[2];
  return {
    pre: m[1],
    n: Number(raw.replace(/,/g, "")),
    decimals: raw.includes(".") ? raw.split(".")[1].length : 0,
    comma: raw.includes(","),
    post: m[3],
  };
}

function format(p: NonNullable<ReturnType<typeof parse>>, n: number) {
  const s = n.toLocaleString("en-US", {
    minimumFractionDigits: p.decimals,
    maximumFractionDigits: p.decimals,
    useGrouping: p.comma,
  });
  return `${p.pre}${s}${p.post}`;
}

function CountUp({ value, run }: { value: string; run: boolean | "static" }) {
  const p = parse(value);
  const [shown, setShown] = useState(p ? format(p, 0) : value);

  useEffect(() => {
    if (run === "static") return setShown(value);
    if (!p || !run) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const f = Math.min(1, (now - t0) / DURATION);
      setShown(format(p, p.n * easeOut(f)));
      if (f < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value]); // eslint-disable-line react-hooks/exhaustive-deps

  // The final value holds the width, so nothing shifts while counting.
  return (
    <span className="wu-hl-n">
      <span aria-hidden="true">{value}</span>
      <span>{shown}</span>
    </span>
  );
}

export function Highlights({ items }: { items: readonly Highlight[] }) {
  const ref = useRef<HTMLDListElement>(null);
  const [run, setRun] = useState<boolean | "static">(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setRun("static");
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <dl ref={ref} className="wu-hl">
      {items.map((h) => (
        <div key={h.label}>
          <dt className={h.lime ? "lime" : undefined} aria-label={h.value}>
            <CountUp value={h.value} run={run} />
          </dt>
          <dd>{h.label}</dd>
        </div>
      ))}
    </dl>
  );
}
