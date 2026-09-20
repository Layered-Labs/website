"use client";

import { useEffect, useRef, useState } from "react";

function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Counts up to `to` once, when it scrolls into view. Shows the final number without motion. */
export function CountUp({ to, suffix = "", duration = 1800 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    setValue(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} aria-label={`${to.toLocaleString("en-US")}${suffix}`}>
      <span aria-hidden="true">
        {value.toLocaleString("en-US")}
        {suffix}
      </span>
    </span>
  );
}

/**
 * Fades words in one after another when the text scrolls into view. Wrap a phrase as {tone|phrase}
 * to make it a highlighted pill that pops in at its place in the sequence.
 */
export function RevealWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  const tokens: { text: string; tone?: string; suffix?: string }[] = [];
  const re = /\{(\w+)\|([^}]+)\}/g;
  let last = 0;
  for (const m of text.matchAll(re)) {
    text.slice(last, m.index).split(" ").filter(Boolean).forEach((w) => tokens.push({ text: w }));
    tokens.push({ text: m[2], tone: m[1] });
    last = (m.index ?? 0) + m[0].length;
    // punctuation glued to the pill (a comma, a full stop) stays attached to it
    const glued = text.slice(last).match(/^[^\s{]+/);
    if (glued) {
      tokens[tokens.length - 1].suffix = glued[0];
      last += glued[0].length;
    }
  }
  text.slice(last).split(" ").filter(Boolean).forEach((w) => tokens.push({ text: w }));
  // screen readers get the sentence without the emoji
  const plain = text.replace(re, "$2").replace(/\p{Extended_Pictographic}\uFE0F?\s*/gu, "");

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    setArmed(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <p ref={ref} className={className} aria-label={plain}>
      {tokens.map((tk, i) => {
        const hidden = armed && !shown;
        const delay = shown ? `${i * 45}ms` : "0ms";
        return tk.tone ? (
          <span key={i} aria-hidden="true">
            <span data-tone={tk.tone} className={`hl pop${hidden ? " pop-hidden" : ""}`} style={{ transitionDelay: delay }}>
              {tk.text}
            </span>
            {tk.suffix}{" "}
          </span>
        ) : (
          <span key={i} aria-hidden="true" className={`rw${hidden ? " rw-hidden" : ""}`} style={{ transitionDelay: delay }}>
            {tk.text}{" "}
          </span>
        );
      })}
    </p>
  );
}

/** The stat caption: the two highlighted words pop in one after another when it scrolls into view. */
export function StatLabel() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    setArmed(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pop = (delay: number) => ({
    className: `hl pop${armed && !shown ? " pop-hidden" : ""}`,
    style: { transitionDelay: shown ? `${delay}ms` : "0ms" },
  });

  return (
    <p ref={ref} className="stat-label">
      <span {...pop(500)} data-tone="green">dataset</span> downloads, all time, on{" "}
      <span {...pop(900)} data-tone="yellow">Hugging Face</span>
    </p>
  );
}
