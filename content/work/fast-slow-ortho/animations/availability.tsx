import { C, Stage, easeInOut, tween, useTime } from "@/components/writeup/anim/kit";

// Every answer saved: one square per question, 3,019 in all, with the count
// running up as they fill in.
const TOTAL = 3019;
const COLS = 100;
const CELL = 7;
const SQ = 5;
const FULL_ROWS = Math.floor(TOTAL / COLS); // 30 rows of 100
const EXTRA = TOTAL - FULL_ROWS * COLS; // and 19 more
const GRID_H = (FULL_ROWS + 1) * CELL;

export const AVAILABILITY_SECONDS = 2.2;

export default function Availability() {
  const t = useTime();
  const fill = tween(t, 0.2, 1.8, easeInOut);
  const shown = Math.round(TOTAL * fill);
  return (
    <Stage>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
        <span style={{ fontSize: 44, fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
          {shown.toLocaleString("en-US")}
        </span>
        <span style={{ fontSize: 17, color: C.mid }}>questions saved</span>
      </div>
      <svg viewBox={`0 0 ${COLS * CELL} ${GRID_H}`} style={{ display: "block", width: "100%", height: "auto", marginTop: 18 }}>
        <defs>
          <pattern id="ortho-avail-cell" width={CELL} height={CELL} patternUnits="userSpaceOnUse">
            <rect width={SQ} height={SQ} fill={C.ink} />
          </pattern>
          <clipPath id="ortho-avail-fill">
            <rect width={COLS * CELL * fill} height={GRID_H} />
          </clipPath>
        </defs>
        <g clipPath="url(#ortho-avail-fill)">
          <rect width={COLS * CELL} height={FULL_ROWS * CELL} fill="url(#ortho-avail-cell)" />
          <rect y={FULL_ROWS * CELL} width={EXTRA * CELL} height={CELL} fill="url(#ortho-avail-cell)" />
        </g>
      </svg>
    </Stage>
  );
}
