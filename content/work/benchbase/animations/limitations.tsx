import { C, Stage, easeInOut, pick, tween, useTime } from "@/components/writeup/anim/kit";

// The shared-hash limit, drawn: the 1,242 MMLU Medical questions as squares,
// then the 99 that share a hash with another question darken.
const TOTAL = 1242;
const SHARED = 99;
const COLS = 54;
const CELL = 12;
const SQ = 9;
const ROWS = Math.ceil(TOTAL / COLS);

// A fixed spread, so every frame and every loop match.
const PICKED = pick(TOTAL, SHARED, 777);

export const LIMITATIONS_SECONDS = 2.2;

export default function Limitations() {
  const t = useTime();
  const shown = Math.round(SHARED * tween(t, 0.3, 1.5, easeInOut));
  return (
    <Stage>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
        <span style={{ fontSize: 44, fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
          {shown}
        </span>
        <span style={{ fontSize: 17, color: C.mid }}>of 1,242 share a hash</span>
      </div>
      <svg viewBox={`0 0 ${COLS * CELL} ${ROWS * CELL}`} style={{ display: "block", width: "100%", height: "auto", marginTop: 18 }}>
        {Array.from({ length: TOTAL }, (_, i) => (
          <rect key={i} x={(i % COLS) * CELL} y={Math.floor(i / COLS) * CELL} width={SQ} height={SQ} fill={C.track} />
        ))}
        {PICKED.slice(0, shown).map((i) => (
          <rect key={`p${i}`} x={(i % COLS) * CELL} y={Math.floor(i / COLS) * CELL} width={SQ} height={SQ} fill={C.ink} />
        ))}
      </svg>
    </Stage>
  );
}
