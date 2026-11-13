import type { ReactNode } from "react";
import { ModelPill } from "@/components/writeup/model";
import { C, Stage, tween, useTime } from "@/components/writeup/anim/kit";

// Same score, a fraction of the time. Bars in the ortho page's style: grey
// track, grey bar, and the pairing's result in ink with its number in lime.

type Row = { who: ReactNode; value: string; w: number; top?: boolean };
const GROUPS: { title: string; rows: Row[] }[] = [
  {
    title: "Share of questions right",
    rows: [
      { who: <ModelPill model="claude" label="Claude Opus alone" />, value: "94.2%", w: 0.942 },
      { who: <ModelPill model={["jev", "claude"]} label={["Jev", "Claude Opus"]} />, value: "94.2%", w: 0.942 },
    ],
  },
  {
    title: "Time per question",
    rows: [
      { who: <ModelPill model="claude" label="Claude Opus alone" />, value: "3.88 s", w: 1 },
      { who: <ModelPill model={["jev", "claude"]} label={["Jev", "Claude Opus"]} />, value: "12× faster", w: 1 / 12, top: true },
    ],
  },
];

export const DISCUSSION_SECONDS = 0.3 + 3 * 0.35 + 1.1;

export default function Discussion() {
  const t = useTime();
  let n = 0;
  return (
    <Stage style={{ display: "grid", gap: 22 }}>
      {GROUPS.map((g) => (
        <div key={g.title} style={{ display: "grid", gap: 14 }}>
          <div style={{ fontSize: 15, color: C.text }}>{g.title}</div>
          {g.rows.map((r) => {
            const grow = tween(t, 0.3 + n++ * 0.35, 1.1);
            return (
              <div key={r.value + n} style={{ display: "grid", gap: 6 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                  {r.who}
                  <b
                    style={{
                      fontWeight: 500,
                      fontVariantNumeric: "tabular-nums",
                      background: r.top ? C.lime : "transparent",
                      padding: r.top ? "0 .25em" : 0,
                      opacity: grow > 0.6 ? 1 : 0,
                    }}
                  >
                    {r.value}
                  </b>
                </div>
                <div style={{ height: 18, background: C.track }}>
                  <i style={{ display: "block", height: "100%", width: `${r.w * 100 * grow}%`, background: r.top ? C.ink : "#B8B8B8" }} />
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </Stage>
  );
}
