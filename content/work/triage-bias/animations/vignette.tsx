import { C, Stage, tween, useTime } from "@/components/writeup/anim/kit";

// Illustration: the same patient twice, side by side. The left has no
// education given; the right adds one sentence. The clinical details are
// identical, but the triage zone can change. The zones shown are illustrative.
// Both columns stay on screen, so the final frame shows the whole comparison.

const SIDES = [
  { title: "No education given", cue: null, zone: "Red", color: "#C2564E" },
  { title: "One sentence added", cue: "Patient's highest education level is some college.", zone: "Yellow", color: "#E3B341" },
] as const;

export const VIGNETTE_SECONDS = 3.2;

function Card({ side, t0 }: { side: (typeof SIDES)[number]; t0: number }) {
  const t = useTime();
  const card = tween(t, t0, 0.4);
  const cue = tween(t, t0 + 0.4, 0.4);
  const zone = tween(t, t0 + 0.9, 0.4);
  const changed = side.cue !== null;
  return (
    <div style={{ display: "grid", gap: 14, opacity: card, transform: `translateY(${(1 - card) * 8}px)` }}>
      <span style={{ fontSize: 15, fontWeight: 500 }}>{side.title}</span>
      <div style={{ background: "#F6F6F6", padding: "16px 18px", display: "grid", gap: 9 }}>
        <div
          style={{
            fontSize: 14,
            minHeight: 38,
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
            background: side.cue ? C.paper : "transparent",
            boxShadow: side.cue ? `inset 3px 0 0 ${C.ink}` : `inset 0 0 0 1px ${C.grey}`,
            color: side.cue ? C.ink : C.soft,
            fontWeight: side.cue ? 500 : 400,
            opacity: side.cue ? 0.2 + 0.8 * cue : 1,
          }}
        >
          {side.cue ?? "No education sentence"}
        </div>
        {[0.95, 0.88, 0.92, 0.7].map((w, k) => (
          <i key={k} style={{ display: "block", height: 8, width: `${w * 100}%`, background: C.grey }} />
        ))}
        <span style={{ fontSize: 13, color: C.mid }}>Same clinical details</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ fontSize: 13, color: C.mid }}>Triage zone</span>
        <div
          style={{
            minWidth: 110,
            height: 48,
            padding: "0 16px",
            background: side.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: 500,
            color: C.ink,
            opacity: zone,
            transform: `scale(${0.9 + 0.1 * zone})`,
            outline: changed ? `3px solid ${C.lime}` : undefined,
            outlineOffset: 3,
          }}
        >
          {side.zone}
        </div>
        {changed && <span style={{ fontSize: 15, fontWeight: 500, opacity: zone }}>Changed</span>}
      </div>
    </div>
  );
}

export default function Vignette() {
  return (
    <Stage style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 32 }}>
      <Card side={SIDES[0]} t0={0.2} />
      <Card side={SIDES[1]} t0={1.3} />
    </Stage>
  );
}
