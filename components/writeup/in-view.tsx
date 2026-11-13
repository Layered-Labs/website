"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * A <figure> that gets the class `in` the first time it is 30% on screen, so
 * CSS can play an entrance once. Reduce Motion is handled in CSS.
 */
export function InViewFigure({ className, children }: { className: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure ref={ref} className={seen ? `${className} in` : className}>
      {children}
    </figure>
  );
}
