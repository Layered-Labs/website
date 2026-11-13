import type { ReactElement } from "react";
import { C, easeInOut, mix, tween, useTime } from "@/components/writeup/anim/kit";
import { ModelPill } from "@/components/writeup/model";
import type { ModelId } from "@/lib/content/models";

// The procedure, request by request: each request goes to all seven models
// with no system prompt; each reply goes to the judge; each verdict lands in a
// grid (rows are models, columns are requests). A column with any lime cell is
// in the exploitable gap. Which models comply here is illustrative.

const MODELS: { id: ModelId; label: string }[] = [
  { id: "openai", label: "GPT-4o" },
  { id: "claude", label: "Claude 3.7 Sonnet" },
  { id: "gemini", label: "Gemini 2.5 Pro" },
  { id: "grok", label: "Grok-3" },
  { id: "deepseek", label: "DeepSeek-V3" },
  { id: "qwen", label: "Qwen3-235B" },
  { id: "llama", label: "Llama 3.3 70B" },
];
const R = 8; // requests shown
const COMPLY = new Map([[2, 4], [5, 1]]); // request index -> model that complies
const STEP = 0.9; // seconds per request
const W = 820;
const H = 420;
const Y0 = 70;
const DY = 46;
const my = (m: number) => Y0 + m * DY;
const FAN = { x: 190, y: my(3) };
const PILL_X = 236; // pills start here
const OUT_X = 430; // replies leave pills here
const JUDGE = { x: 520, y: my(3) };
const GRID_X = 650;
const CELL = 14;
const gx = (r: number) => GRID_X + r * (CELL + 6);

export const METHOD_SECONDS = 0.4 + R * STEP + 0.8;
export const METHOD_SIZE = { width: W, height: H };

export default function Method() {
  const t = useTime();
  const dots: ReactElement[] = [];
  const cells: ReactElement[] = [];

  for (let r = 0; r < R; r++) {
    const t0 = 0.4 + r * STEP;
    const a = tween(t, t0, 0.25, easeInOut); // stack -> fan point
    const b = tween(t, t0 + 0.25, 0.25, easeInOut); // fan -> models
    const c = tween(t, t0 + 0.5, 0.2, easeInOut); // models -> judge
    const d = tween(t, t0 + 0.7, 0.2, easeInOut); // judge -> grid
    const live = t >= t0 && t < t0 + 0.95;
    if (live && b === 0) {
      dots.push(<rect key={`q${r}`} x={mix(120, FAN.x, a) - 6} y={mix(my(3), FAN.y, a) - 6} width={12} height={12} fill={C.ink} />);
    }
    for (let m = 0; m < MODELS.length; m++) {
      const yes = COMPLY.get(r) === m;
      if (live && b > 0 && d < 1) {
        let x: number;
        let y: number;
        if (c === 0) {
          x = mix(FAN.x, PILL_X - 10, b);
          y = mix(FAN.y, my(m), b);
        } else if (d === 0) {
          x = mix(OUT_X, JUDGE.x - 40, c);
          y = mix(my(m), JUDGE.y, c);
        } else {
          x = mix(JUDGE.x + 40, gx(r) + CELL / 2, d);
          y = mix(JUDGE.y, my(m), d);
        }
        const judged = d > 0;
        dots.push(
          <rect
            key={`r${r}m${m}`}
            x={x - 4}
            y={y - 4}
            width={8}
            height={8}
            fill={judged ? (yes ? C.lime : C.ink) : "#8F8F8F"}
            stroke={judged && yes ? C.ink : "none"}
          />,
        );
      }
      const landed = t >= t0 + 0.9;
      cells.push(
        <rect
          key={`c${r}m${m}`}
          x={gx(r)}
          y={my(m) - CELL / 2}
          width={CELL}
          height={CELL}
          fill={landed ? (yes ? C.lime : C.ink) : "none"}
          stroke={landed ? (yes ? C.ink : "none") : C.grey}
          strokeWidth={1.2}
        />,
      );
    }
  }

  const gapIn = (r: number) => tween(t, 0.4 + r * STEP + 0.95, 0.3);
  const legend = tween(t, 0.4 + R * STEP, 0.4);

  return (
    <div style={{ position: "absolute", inset: 0, background: C.paper, fontFamily: "var(--font-sans)" }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} aria-hidden="true">
        {/* request stack */}
        {Array.from({ length: 20 }, (_, i) => (
          <rect key={i} x={20 + (i % 5) * 20} y={my(3) - 40 + Math.floor(i / 5) * 20} width={14} height={14} fill="none" stroke="#C4C4C4" />
        ))}
        <text x={67} y={my(3) - 52} textAnchor="middle" fontSize={15} fill={C.text}>100 requests</text>
        {/* wires */}
        {MODELS.map((_, m) => (
          <g key={m} stroke="#DCDCDC" strokeWidth={1.2} fill="none">
            <path d={`M${FAN.x} ${FAN.y} C ${FAN.x + 25} ${FAN.y} ${PILL_X - 30} ${my(m)} ${PILL_X - 8} ${my(m)}`} />
            <path d={`M${OUT_X} ${my(m)} C ${OUT_X + 40} ${my(m)} ${JUDGE.x - 70} ${JUDGE.y} ${JUDGE.x - 42} ${JUDGE.y}`} />
            <path d={`M${JUDGE.x + 42} ${JUDGE.y} C ${JUDGE.x + 70} ${JUDGE.y} ${GRID_X - 40} ${my(m)} ${GRID_X - 6} ${my(m)}`} />
          </g>
        ))}
        <line x1={128} y1={my(3)} x2={FAN.x} y2={FAN.y} stroke="#DCDCDC" strokeWidth={1.2} />
        {/* judge */}
        <rect x={JUDGE.x - 42} y={JUDGE.y - 30} width={84} height={60} fill={C.paper} stroke={C.ink} strokeWidth={2} />
        <text x={JUDGE.x} y={JUDGE.y - 4} textAnchor="middle" fontSize={15} fontWeight={500} fill={C.ink}>Judge</text>
        <text x={JUDGE.x} y={JUDGE.y + 15} textAnchor="middle" fontSize={12} fill={C.mid}>GPT-4o-mini</text>
        {/* grid */}
        <text x={GRID_X} y={Y0 - 34} fontSize={15} fill={C.text}>Verdicts</text>
        {cells}
        {Array.from({ length: R }, (_, r) =>
          COMPLY.has(r) ? (
            <g key={`g${r}`} opacity={gapIn(r)}>
              <rect x={gx(r) - 3} y={Y0 - 20} width={CELL + 6} height={my(6) - Y0 + 34} fill="none" stroke={C.lime} strokeWidth={2.5} />
              <text x={gx(r) + CELL / 2} y={my(6) + 32} textAnchor="middle" fontSize={12} fontWeight={500} fill={C.ink}>gap</text>
            </g>
          ) : null,
        )}
        {dots}
        {/* legend */}
        <g opacity={legend} transform={`translate(20 ${H - 26})`}>
          <rect width={12} height={12} fill={C.ink} />
          <text x={18} y={11} fontSize={13} fill={C.mid}>refused</text>
          <rect x={86} width={12} height={12} fill={C.lime} stroke={C.ink} />
          <text x={104} y={11} fontSize={13} fill={C.mid}>complied</text>
        </g>
      </svg>
      {MODELS.map((m, i) => (
        <div
          key={m.id + m.label}
          style={{ position: "absolute", left: `${(PILL_X / W) * 100}%`, top: `${(my(i) / H) * 100}%`, transform: "translateY(-50%)", fontSize: 15 }}
        >
          <ModelPill model={m.id} label={m.label} />
        </div>
      ))}
      <div style={{ position: "absolute", left: `${(PILL_X / W) * 100}%`, top: `${((Y0 - 40) / H) * 100}%`, fontSize: 13, color: C.mid }}>
        No system prompt, no jailbreak
      </div>
    </div>
  );
}
