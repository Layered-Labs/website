import { C, Stage, easeInOut, mix, tween, useTime } from "@/components/writeup/anim/kit";

// The pipeline, left to right. Questions flow from the source through a
// converter, the schema check, the fixed prompt and scoring. One malformed row
// is rejected at the schema check and never scored.

const NODES = ["Source", "Converter", "Schema", "Prompt", "Score"];
const X = [10, 30, 50, 70, 90]; // centres, percent
const N = 9;
const REJECT = 5;
const GAP = 0.32;
const TRAVEL = 2.4;

export const DESIGN_SECONDS = (N - 1) * GAP + TRAVEL + 0.4;

export default function Design() {
  const t = useTime();
  let scored = 0;
  const dots = Array.from({ length: N }, (_, i) => {
    const p = tween(t, 0.3 + i * GAP, TRAVEL, (x) => x);
    const rej = i === REJECT;
    const along = rej ? Math.min(p, 0.5) / 0.5 : p; // 0 to 1 across the line
    const x = rej ? mix(X[0], X[2], along) : mix(X[0], X[4], along);
    const drop = rej ? tween(t, 0.3 + i * GAP + TRAVEL * 0.5, 0.5, easeInOut) : 0;
    if (!rej && p >= 1) scored++;
    const started = t >= 0.3 + i * GAP;
    return (
      <i
        key={i}
        style={{
          position: "absolute",
          left: `${x}%`,
          top: 52 + drop * 70,
          width: 14,
          height: 14,
          marginLeft: -7,
          background: rej ? (drop > 0 ? "#B8B8B8" : C.ink) : p >= 1 ? C.lime : C.ink,
          outline: !rej && p >= 1 ? `1px solid ${C.ink}` : undefined,
          opacity: started ? 1 : 0,
        }}
      />
    );
  });

  return (
    <Stage>
      <div style={{ position: "relative", height: 170 }}>
        <div style={{ position: "absolute", left: `${X[0]}%`, right: `${100 - X[4]}%`, top: 58, height: 2, background: C.grey }} />
        {NODES.map((n, k) => (
          <div
            key={n}
            style={{
              position: "absolute",
              left: `${X[k]}%`,
              top: 0,
              transform: "translateX(-50%)",
              fontSize: 15,
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            {n}
          </div>
        ))}
        {X.map((x) => (
          <i key={x} style={{ position: "absolute", left: `${x}%`, top: 44, width: 2, height: 30, marginLeft: -1, background: C.ink }} />
        ))}
        <div style={{ position: "absolute", left: `${X[2]}%`, top: 142, transform: "translateX(-50%)", fontSize: 14, color: C.mid }}>
          rejected
        </div>
        {dots}
        <div style={{ position: "absolute", right: 0, top: 96, fontSize: 15, color: C.mid, fontVariantNumeric: "tabular-nums" }}>
          <b style={{ color: C.ink, fontWeight: 500 }}>{scored}</b> scored
        </div>
      </div>
    </Stage>
  );
}
