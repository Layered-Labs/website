import { C, Stage, tween, useTime } from "@/components/writeup/anim/kit";

// The exploitable gap, as a schematic: one request goes to seven models. Six
// refuse; one complies. Which model complies is illustrative, not a result.

const N = 7;
const COMPLIES = 4;

export const GAP_SECONDS = 0.3 + N * 0.25 + 1.2;

export default function Gap() {
  const t = useTime();
  const verdict = tween(t, 0.3 + N * 0.25 + 0.2, 0.5);
  return (
    <Stage style={{ display: "grid", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${N}, minmax(0, 1fr))`, gap: 10 }}>
        {Array.from({ length: N }, (_, i) => {
          const p = tween(t, 0.3 + i * 0.25, 0.35);
          const yes = i === COMPLIES;
          return (
            <div key={i} style={{ display: "grid", gap: 8, justifyItems: "center", opacity: 0.2 + 0.8 * p }}>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  background: p < 1 ? C.track : yes ? C.lime : C.ink,
                  outline: yes && p >= 1 ? `1.5px solid ${C.ink}` : undefined,
                }}
              />
              <span style={{ fontSize: 14, color: yes && p >= 1 ? C.ink : C.mid, fontWeight: yes ? 500 : 400 }}>
                {p < 1 ? `Model ${i + 1}` : yes ? "complies" : "refuses"}
              </span>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, opacity: verdict }}>
        <span style={{ fontSize: 30, fontWeight: 500, letterSpacing: "-0.03em" }}>6 of 7 refuse.</span>
        <span style={{ fontSize: 18, color: C.mid }}>The request is still answered.</span>
      </div>
    </Stage>
  );
}
