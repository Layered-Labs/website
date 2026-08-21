"use client"

import { useEffect } from "react"
import Lenis from "lenis"

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

export function SmoothScroll() {
  useEffect(() => {
    // Users who prefer reduced motion get native scrolling — Lenis hijacking
    // the wheel/touch scroll is exactly what makes the page feel stuck for
    // them (and it removes the extra rAF load entirely).
    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Let Lenis run its own internal rAF only while a scroll/animation is
      // actually in flight, instead of scheduling a rAF callback every single
      // frame for the lifetime of the page.
      autoRaf: true,
      // Don't smooth the user's touch/trackpad input into a queue that lags
      // behind their finger — that delay is the "unscrollable/laggy" feel.
      syncTouch: true,
      touchMultiplier: 1,
      smoothWheel: false,
    })

    window.__lenis = lenis

    return () => {
      lenis.destroy()
      delete window.__lenis
    }
  }, [])

  return null
}