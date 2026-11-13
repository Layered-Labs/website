import { C, Stage, easeInOut, pick, tween, useTime } from "@/components/writeup/anim/kit";

// The sample-size limit, drawn: all 3,019 questions as squares, then the random
// 500 the reasoning models answered darken.
const TOTAL = 3019;
const SAMPLE = 500;
const COLS = 100;
const CELL = 7;
const SQ = 5;
const ROWS = Math.ceil(TOTAL / COLS);

// A fixed, evenly spread "random" set, so every frame and every loop match.
const PICKED = pick(TOTAL, SAMPLE, 12345);

export const LIMITATIONS_SECONDS = 2.4;

export default function Limitations() {
  const t = useTime();
  const shown = Math.round(SAMPLE * tween(t, 0.3, 1.6, easeInOut));
  return (
    <Stage>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
        <span style={{ fontSize: 44, fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
          {shown}
        </span>
        <span style={{ fontSize: 17, color: C.mid }}>of 3,019</span>
      </div>
      <svg viewBox={`0 0 ${COLS * CELL} ${ROWS * CELL}`} style={{ display: "block", width: "100%", height: "auto", marginTop: 18 }}>
        <defs>
          <pattern id="ortho-lim-cell" width={CELL} height={CELL} patternUnits="userSpaceOnUse">
            <rect width={SQ} height={SQ} fill={C.track} />
          </pattern>
        </defs>
        <rect width={COLS * CELL} height={(ROWS - 1) * CELL} fill="url(#ortho-lim-cell)" />
        <rect y={(ROWS - 1) * CELL} width={(TOTAL - (ROWS - 1) * COLS) * CELL} height={CELL} fill="url(#ortho-lim-cell)" />
        {PICKED.slice(0, shown).map((i) => (
          <rect key={i} x={(i % COLS) * CELL} y={Math.floor(i / COLS) * CELL} width={SQ} height={SQ} fill={C.ink} />
        ))}
      </svg>
    </Stage>
  );
}
