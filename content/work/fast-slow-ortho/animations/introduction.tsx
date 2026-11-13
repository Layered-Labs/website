import { ModelLogo, ModelPill } from "@/components/writeup/model";
import { C, Stage, linear, tween, useTime } from "@/components/writeup/anim/kit";
import { MODELS, type ModelId } from "@/lib/content/models";

// Card 1 of the ortho page: both models start together and run in real time.
// Bar length is the share of questions answered correctly.

const DELAY = 0.5;
const LANES: { model: ModelId; label: string; seconds: number; right: number }[] = [
  { model: "jev", label: "Jev", seconds: 0.21, right: 82.8 },
  { model: "claude", label: "Claude Opus", seconds: 3.88, right: 94.2 },
];

export const INTRODUCTION_SECONDS = DELAY + 3.88 + 0.4;

function Lane({ model, label, seconds, right }: (typeof LANES)[number]) {
  const t = useTime();
  const run = tween(t, DELAY, seconds, linear);
  const done = t >= DELAY + seconds;
  const pop = tween(t, DELAY + seconds, 0.4);
  const clock = Math.min(Math.max(0, t - DELAY), seconds);
  const color = MODELS[model].color;

  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 10 }}>
        <ModelPill model={model} label={label} />
        <span style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <em style={{ fontStyle: "normal", color: C.mid, fontSize: 15, fontVariantNumeric: "tabular-nums", minWidth: "3.6em", textAlign: "right" }}>
            {clock.toFixed(2)} s
          </em>
          <b style={{ fontWeight: 500, opacity: pop, transform: `translateY(${(1 - pop) * 4}px)`, display: "inline-block" }}>{right}% right</b>
        </span>
      </div>
      <div style={{ position: "relative", height: 34 }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 16, height: 2, background: "#B5B5B5" }} />
        <div style={{ position: "absolute", right: 0, top: 3, bottom: 3, width: 2, background: C.ink }} />
        <i style={{ position: "absolute", left: 0, top: "50%", height: 6, marginTop: -3, width: `${right * run}%`, background: color, display: "block" }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: `${right * run}%`,
            transform: `translateX(${-100 * run}%)`,
            display: "flex",
            alignItems: "center",
            gap: 6,
            height: 34,
          }}
        >
          <span style={{ width: 30, height: 30, background: C.paper, display: "flex" }}>
            <ModelLogo model={model} size={30} />
          </span>
          {model === "claude" && !done && <Dots t={t} />}
        </div>
      </div>
    </div>
  );
}

/** Three dots bobbing while Opus thinks. */
function Dots({ t }: { t: number }) {
  return (
    <span style={{ display: "flex", gap: 3 }}>
      {[0, 0.12, 0.24].map((d) => {
        const phase = (((t - d) % 0.8) + 0.8) % 0.8 / 0.8; // 0 to 1
        const y = -5 * Math.sin(Math.PI * phase) ** 2;
        return <i key={d} style={{ width: 5, height: 5, borderRadius: "50%", background: C.mid, display: "block", transform: `translateY(${y}px)` }} />;
      })}
    </span>
  );
}

export default function Introduction() {
  return (
    <Stage>
      {LANES.map((lane) => (
        <Lane key={lane.model} {...lane} />
      ))}
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: C.mid, marginTop: -6 }}>
        <span>0%</span>
        <span>100% right</span>
      </div>
    </Stage>
  );
}
