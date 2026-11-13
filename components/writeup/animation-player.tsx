"use client";

import { Player, type PlayerRef } from "@remotion/player";
import { useEffect, useRef, useState, type ComponentType } from "react";
import { FORMATS, type AnimatedKey, type Format, type SectionDef } from "@/lib/content/formats";

export type AnimationDef = {
  /** A Remotion composition: a React component driven by useCurrentFrame(). */
  component: ComponentType;
  /** Length of the motion in seconds, not counting the hold. */
  seconds: number;
  /** Defaults to 60, so motion stays smooth on 60Hz and faster screens. */
  fps?: number;
  /** Width in px for a fixed-size animation. <Stage> animations take the box's width. */
  width?: number;
  /**
   * Only for animations that do not use <Stage> (for example one fixed-size
   * SVG). Animations built on <Stage> are measured and sized to fit.
   */
  height?: number;
  /**
   * The figure caption, shown under the box after an automatic "Figure N."
   * Say what the figure shows and how to read it; keep that text out of the
   * animation itself, which should hold only the visual and its labels.
   * Falls back to the section title (fine for drafts, not for publishing).
   */
  caption?: string;
  /** What screen readers get. Defaults to the caption. */
  description?: string;
  /**
   * Span the wide column (960px) instead of the text column (700px). Use it for
   * figures that need the room, such as bars, races and flows; leave compact
   * ones (a gauge, a list) at text width.
   */
  wide?: boolean;
};

/**
 * Plays a section's animation live in the page (rendered as DOM and SVG, so it
 * stays sharp at any size). It plays once when it first comes on screen and
 * holds its last frame. With Reduce Motion on, it shows the last frame only.
 */
export function AnimationPlayer({ def, label }: { def: AnimationDef; label: string }) {
  const player = useRef<PlayerRef>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [measured, setMeasured] = useState<number | null>(null);
  const [boxWidth, setBoxWidth] = useState<number | null>(null);

  // Animations built on <Stage> are fluid: laid out at the box's real width and
  // as tall as their content, so text stays at true size on any screen, like
  // HTML. A fixed-size animation (one that sets `height`) scales to fit instead.
  const fluid = def.height === undefined;
  // The player throws on a size of 0, which crashed figures that measured
  // before layout; never pass less than 1.
  const width = Math.max(1, fluid ? (boxWidth ?? def.width ?? 700) : (def.width ?? 700));
  const height = Math.max(1, fluid ? (measured ?? 350) : (def.height ?? 350));
  const fps = def.fps ?? 60;
  const motionFrames = Math.max(1, Math.round(def.seconds * fps));
  const durationInFrames = motionFrames;
  const lastFrame = motionFrames - 1;
  const description = def.description ?? def.caption ?? label;

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setMounted(true);
  }, []);

  // Track the box's width (fluid animations only).
  useEffect(() => {
    const root = stage.current;
    if (!mounted || !fluid || !root) return;
    const fit = () => {
      const w = Math.round(root.clientWidth);
      if (w > 0) setBoxWidth(w);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(root);
    return () => ro.disconnect();
  }, [mounted, fluid]);

  // Fit the height to the content: measure the <Stage> (offsetHeight ignores the
  // player's scaling, so it is in composition pixels) and keep it updated.
  useEffect(() => {
    const root = stage.current;
    if (!mounted || !fluid || !root) return;
    let ro: ResizeObserver | undefined;
    const attach = () => {
      const el = root.querySelector<HTMLElement>("[data-anim-stage]");
      if (!el) return false;
      const fit = () => {
        const h = Math.ceil(el.offsetHeight);
        if (h > 0) setMeasured(h);
      };
      fit();
      ro = new ResizeObserver(fit);
      ro.observe(el);
      return true;
    };
    if (attach()) return () => ro?.disconnect();
    const mo = new MutationObserver(() => {
      if (attach()) mo.disconnect();
    });
    mo.observe(root, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      ro?.disconnect();
    };
  }, [mounted, fluid]);

  // Play once, the first time the figure is on screen, then hold the last
  // frame. The page drives the frames itself (seekTo on each animation frame)
  // instead of relying on the player's own playback, which could fail to start
  // and leave figures frozen on their first frame.
  const started = useRef(false);
  const done = useRef(false);
  useEffect(() => {
    const el = stage.current;
    if (!mounted || reduced || !el || started.current) return;
    let raf = 0;
    const run = () => {
      started.current = true;
      const t0 = performance.now();
      const tick = (now: number) => {
        const frame = Math.min(lastFrame, Math.floor(((now - t0) / 1000) * fps));
        player.current?.seekTo(frame);
        if (frame < lastFrame) raf = requestAnimationFrame(tick);
        else done.current = true;
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [mounted, reduced, fps, lastFrame]);

  // Once finished, hold the last frame even if a resize resets the player.
  useEffect(() => {
    if (done.current || reduced) requestAnimationFrame(() => player.current?.seekTo(lastFrame));
  }, [width, height, lastFrame, reduced]);

  return (
    <figure className={def.wide ? "wu-fig wu-wide" : "wu-fig"}>
      <div className="wu-box">
        <div ref={stage} className="wu-stage" style={{ aspectRatio: `${width} / ${height}` }} role="img" aria-label={description}>
        {mounted && (
          <Player
            ref={player}
            component={def.component}
            durationInFrames={durationInFrames}
            fps={fps}
            compositionWidth={width}
            compositionHeight={height}
            initialFrame={reduced ? lastFrame : 0}
            controls={false}
            clickToPlay={false}
            style={{ width: "100%", height: "100%" }}
            acknowledgeRemotionLicense
          />
        )}
        </div>
      </div>
      <figcaption className="wu-cap">{def.caption ?? label}</figcaption>
    </figure>
  );
}

/**
 * Called once in each write-up's animations/index.tsx. The set must have one
 * animation for every animated section of the format, or the build fails.
 */
export function defineAnimations<F extends Format>(format: F, set: Record<AnimatedKey<F>, AnimationDef>) {
  const sections = FORMATS[format].sections as readonly SectionDef[];
  return function SectionAnimation({ section }: { section: AnimatedKey<F> }) {
    const title = sections.find((s) => s.key === section)?.title ?? section;
    return <AnimationPlayer def={set[section]} label={title} />;
  };
}
