import { Easing } from "remotion";
import { ModelPill } from "@/components/writeup/model";
import { C, Stage, tween, useTime } from "@/components/writeup/anim/kit";

// Card 2 of the ortho page: a gauge of Jev's accuracy by how sure it was.
// The needle steps through the four confidence bands; the last is lime.

const ZONES = [
  { right: "50%", when: "under 50% sure", d: "M20.0 100.0A80 80 0 0 1 43.4 43.4", stroke: "#E6E6E6" },
  { right: "72%", when: "50 to 80% sure", d: "M43.4 43.4A80 80 0 0 1 100.0 20.0", stroke: "#D2D2D2" },
  { right: "88%", when: "80 to 95% sure", d: "M100.0 20.0A80 80 0 0 1 156.6 43.4", stroke: "#BDBDBD" },
  { right: "98.5%", when: "95% or more sure", d: "M156.6 43.4A80 80 0 0 1 180.0 100.0", stroke: "#E551BA" },
];
const STEPS = [0.25, 1.55, 2.85, 4.15]; // when the needle moves to each zone
const SWING = Easing.bezier(0.3, 1.5, 0.5, 1); // overshoots, then settles

export const RESULTS_SECONDS = 4.15 + 0.8;

export default function Results() {
  const t = useTime();
  let angle = -90;
  STEPS.forEach((at, i) => {
    const from = i === 0 ? -90 : -67.5 + 45 * (i - 1);
    angle += (-67.5 + 45 * i - from) * tween(t, at, 0.8, SWING);
  });
  const zone = STEPS.filter((at) => t >= at).length - 1; // -1 before the first step
  const z = ZONES[Math.max(0, zone)];

  return (
    <Stage>
      <svg viewBox="0 0 200 112" style={{ width: "100%", maxWidth: 300, display: "block", margin: "0 auto" }} aria-hidden="true">
        {ZONES.map((zn, i) => {
          // Fade other bands to 40% once the needle has a zone, over 0.4s.
          let opacity = 1;
          if (zone >= 0) {
            const since = tween(t, STEPS[zone], 0.4);
            const wasOn = zone === 0 ? true : i === zone - 1;
            const target = i === zone ? 1 : 0.4;
            const prev = zone === 0 ? 1 : wasOn ? 1 : 0.4;
            opacity = prev + (target - prev) * since;
          }
          return <path key={zn.d} d={zn.d} fill="none" strokeWidth={20} stroke={zn.stroke} opacity={opacity} />;
        })}
        <g transform={`rotate(${angle} 100 100)`}>
          <line x1={100} y1={100} x2={100} y2={34} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
          <circle cx={100} cy={100} r={8} fill={C.ink} />
        </g>
      </svg>
      <div style={{ textAlign: "center", marginTop: 6 }}>
        <b
          style={{
            display: "inline-block",
            fontSize: 44,
            fontWeight: 500,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            padding: "0 .15em",
            fontVariantNumeric: "tabular-nums",
            background: zone === 3 ? C.lime : "transparent",
          }}
        >
          {z.right}
        </b>
        <span style={{ display: "block", fontSize: 16, color: C.text, marginTop: 4 }}>
          right when <ModelPill model="jev" label="Jev" /> is {z.when}
        </span>
      </div>
    </Stage>
  );
}
