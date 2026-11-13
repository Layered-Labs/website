import { Mark } from "@/components/landing/mark";
import { C, Stage, tween, useTime } from "./anim/kit";

// Default animation for a new section: the mark arrives, then the section
// title. Replace it with an animation of what the section shows.

export const STARTER_SECONDS = 1.6;

export function StarterAnimation({ label, index }: { label: string; index: number }) {
  const t = useTime();
  const markIn = tween(t, 0.1, 0.5);
  const textIn = tween(t, 0.45, 0.4);

  return (
    <Stage style={{ display: "flex", alignItems: "center", gap: 32, padding: "0 48px" }}>
      <div style={{ width: 96, height: 96, opacity: markIn, transform: `scale(${0.9 + 0.1 * markIn})` }}>
        <Mark className="anim-mark" />
      </div>
      <div style={{ opacity: textIn, transform: `translateY(${(1 - textIn) * 8}px)` }}>
        <div style={{ fontSize: 15, color: C.soft }}>{index}</div>
        <div style={{ fontSize: 30, fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1.15 }}>{label}</div>
      </div>
    </Stage>
  );
}
