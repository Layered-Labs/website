import { C, Stage, tween, useTime } from "@/components/writeup/anim/kit";
import { ModelPill } from "@/components/writeup/model";

// Mean severity shift against the no-education control, per condition. Left of
// zero is less urgent (undertriage); right is more urgent (overtriage).

const ROWS = [
  { group: "qwen", cue: "Less than high school", v: -2.3 },
  { group: "qwen", cue: "Some high school", v: -3.45 },
  { group: "qwen", cue: "Some college", v: -2.3 },
  { group: "gpt", cue: "Less than high school", v: 4.6 },
  { group: "gpt", cue: "Some high school", v: 2.3 },
  { group: "gpt", cue: "Some college", v: 3.45 },
] as const;
const MAX = 5;
export const SHIFT_SECONDS = 0.3 + ROWS.length * 0.15 + 1.1;

export default function Shift() {
  const t = useTime();
  return (
    <Stage style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "grid", gridTemplateColumns: "190px minmax(0, 1fr) minmax(0, 1fr)", fontSize: 13, color: C.mid }}>
        <span />
        <span style={{ textAlign: "left" }}>Less urgent (undertriage)</span>
        <span style={{ textAlign: "right" }}>More urgent (overtriage)</span>
      </div>
      {ROWS.map((r, i) => {
        const p = tween(t, 0.3 + i * 0.15, 0.9);
        const w = (Math.abs(r.v) / MAX) * 50 * p;
        const first = i === 0 || ROWS[i - 1].group !== r.group;
        return (
          <div key={i} style={{ display: "grid", gap: 6 }}>
            {first && (
              <div style={{ marginTop: i ? 10 : 0, fontSize: 15 }}>
                {r.group === "qwen" ? <ModelPill model="qwen" label="Qwen-2.5-72B" /> : <ModelPill model="openai" label="GPT-4o-mini" />}
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "190px minmax(0, 1fr)", alignItems: "center", gap: 0 }}>
              <span style={{ fontSize: 14 }}>{r.cue}</span>
              <div style={{ position: "relative", height: 22 }}>
                <i style={{ position: "absolute", left: "50%", top: -4, bottom: -4, width: 1.5, background: C.ink }} />
                <i
                  style={{
                    position: "absolute",
                    top: 3,
                    height: 16,
                    left: r.v < 0 ? `${50 - w}%` : "50%",
                    width: `${w}%`,
                    background: r.v < 0 ? C.ink : "#8F8F8F",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: 1,
                    fontSize: 13,
                    fontVariantNumeric: "tabular-nums",
                    left: r.v < 0 ? undefined : `calc(50% + ${w}% + 8px)`,
                    right: r.v < 0 ? `calc(50% + ${w}% + 8px)` : undefined,
                    opacity: p > 0.6 ? 1 : 0,
                  }}
                >
                  {r.v > 0 ? "+" : "−"}
                  {Math.abs(r.v).toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </Stage>
  );
}
