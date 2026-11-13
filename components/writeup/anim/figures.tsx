import type { ComponentType, ReactNode } from "react";
import type { AnimationDef } from "@/components/writeup/animation-player";
import {
  Bubbles, Decode, Faces, Lengths, Load, Matrix, Merge, Split, TileRows, Weights,
  lengthsSeconds, tileRowsSeconds, bubblesSeconds, decodeSeconds, facesSeconds, loadSeconds, matrixSeconds, mergeSeconds, splitSeconds, weightsSeconds,
} from "./diagrams";
import { C, Reveal, Stage, easeInOut, pick, tween, useTime } from "./kit";

export { Bubbles, Decode, Faces, Lengths, Load, Matrix, Merge, Split, TileRows, Weights };

// Data-driven figures. Each write-up configures these with its own numbers in
// animations/index.tsx (`fig(Bars, {...}, "caption")`), so most sections need
// no hand-written animation. A figure that needs more stays a custom component.

const mono = "var(--font-mono), ui-monospace, monospace";
const fmt = (n: number, decimals = 0) =>
  n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/* ---------- Bars: one row per item, bars grow in turn ---------- */

export type BarsProps = {
  rows: { label: ReactNode; value: number; display?: string; lime?: boolean }[];
  /** Full-width value. Defaults to the largest row. */
  max?: number;
  /** Small label above the bars, such as the unit. */
  unit?: string;
};
const barsSeconds = ({ rows }: BarsProps) => 0.3 + rows.length * 0.12 + 1.1;
export function Bars({ rows, max, unit }: BarsProps) {
  const t = useTime();
  const top = max ?? Math.max(...rows.map((r) => r.value));
  return (
    <Stage style={{ display: "grid", gap: 14 }}>
      {unit && <div style={{ fontSize: 14, color: C.mid }}>{unit}</div>}
      {rows.map((r, i) => {
        const p = tween(t, 0.3 + i * 0.12, 1.0);
        return (
          <div key={i} style={{ display: "grid", gap: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 16 }}>
              <span style={{ fontWeight: 500 }}>{r.label}</span>
              <b
                style={{
                  fontWeight: 500,
                  fontVariantNumeric: "tabular-nums",
                  background: r.lime ? C.lime : "transparent",
                  padding: r.lime ? "0 .25em" : 0,
                  opacity: p > 0.5 ? 1 : 0,
                }}
              >
                {r.display ?? fmt(r.value)}
              </b>
            </div>
            <div style={{ height: 14, background: C.track }}>
              <i style={{ display: "block", height: "100%", width: `${(r.value / top) * 100 * p}%`, background: r.lime ? C.ink : "#8F8F8F" }} />
            </div>
          </div>
        );
      })}
    </Stage>
  );
}

/* ---------- Count: one big number counting up, with a short label ---------- */

export type CountProps = { value: number; decimals?: number; prefix?: string; suffix?: string; label: string; parts?: { label: string; value: number }[] };
const countSeconds = (p: CountProps) => 1.8 + (p.parts ? p.parts.length * 0.15 : 0);
export function Count({ value, decimals = 0, prefix = "", suffix = "", label, parts }: CountProps) {
  const t = useTime();
  const p = tween(t, 0.2, 1.4, easeInOut);
  const total = parts?.reduce((a, b) => a + b.value, 0) ?? 0;
  return (
    <Stage style={{ display: "grid", gap: 18 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
        <span style={{ fontSize: 64, fontWeight: 500, letterSpacing: "-0.045em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
          {prefix}
          {fmt(value * p, decimals)}
          {suffix}
        </span>
        <span style={{ fontSize: 18, color: C.mid }}>{label}</span>
      </div>
      {parts && (
        <div style={{ display: "grid", gap: 8 }}>
          <div style={{ display: "flex", height: 18, gap: 2 }}>
            {parts.map((s, i) => (
              <i
                key={s.label}
                style={{
                  display: "block",
                  flex: `${s.value} 0 0`,
                  background: i === 0 ? C.ink : i === 1 ? "#8F8F8F" : i === 2 ? "#CFCFCF" : "#E6E6E6",
                  transform: `scaleX(${tween(t, 0.3 + i * 0.15, 0.8)})`,
                  transformOrigin: "left",
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px", fontSize: 14, color: C.mid }}>
            {parts.map((s) => (
              <span key={s.label}>
                <b style={{ color: C.ink, fontWeight: 500 }}>{s.label}</b> {fmt(s.value)} ({Math.round((100 * s.value) / total)}%)
              </span>
            ))}
          </div>
        </div>
      )}
    </Stage>
  );
}

/* ---------- Grid: one square per item; a subset darkens ---------- */

export type GridProps = { total: number; marked: number; cols?: number; label: string; seed?: number };
const gridSeconds = () => 2.2;
export function Grid({ total, marked, cols = 60, label, seed = 7 }: GridProps) {
  const t = useTime();
  const shown = Math.round(marked * tween(t, 0.3, 1.5, easeInOut));
  const rows = Math.ceil(total / cols);
  const picked = pick(total, marked, seed);
  const cell = 10;
  return (
    <Stage>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
        <span style={{ fontSize: 44, fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{fmt(shown)}</span>
        <span style={{ fontSize: 17, color: C.mid }}>{label}</span>
      </div>
      <svg viewBox={`0 0 ${cols * cell} ${rows * cell}`} style={{ display: "block", width: "100%", height: "auto", marginTop: 18 }}>
        <defs>
          <pattern id={`grid-${seed}-${total}`} width={cell} height={cell} patternUnits="userSpaceOnUse">
            <rect width={cell - 3} height={cell - 3} fill={C.track} />
          </pattern>
        </defs>
        <rect width={cols * cell} height={(rows - 1) * cell} fill={`url(#grid-${seed}-${total})`} />
        <rect y={(rows - 1) * cell} width={(total - (rows - 1) * cols) * cell} height={cell} fill={`url(#grid-${seed}-${total})`} />
        {picked.slice(0, shown).map((i) => (
          <rect key={i} x={(i % cols) * cell} y={Math.floor(i / cols) * cell} width={cell - 3} height={cell - 3} fill={C.ink} />
        ))}
      </svg>
    </Stage>
  );
}

/* ---------- Steps: drawn stages joined by arrows, a token passing through ---------- */

export type StepIcon =
  | "file" | "archive" | "table" | "split" | "hospital" | "model" | "chat" | "globe"
  | "calendar" | "check" | "box" | "plug" | "grid" | "tag" | "person" | "image" | "bolt" | "wifi";
export type StepsProps = { steps: { title: string; note?: string; icon?: StepIcon }[] };
const stepsSeconds = ({ steps }: StepsProps) => 0.4 + steps.length * 0.55 + 0.8;

const ICONS: Record<StepIcon, ReactNode> = {
  file: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h4" /></>,
  archive: <><rect x="3" y="4" width="18" height="5" /><path d="M5 9v11h14V9M10 13h4" /></>,
  table: <><rect x="3" y="5" width="18" height="14" /><path d="M3 10h18M3 15h18M9 5v14" /></>,
  split: <><circle cx="5" cy="12" r="2" /><path d="M7 12h4l3-5h5M11 12h8M11 12l3 5h5" /></>,
  hospital: <><rect x="4" y="6" width="16" height="14" /><path d="M12 9v6M9 12h6M9 3h6v3H9z" /></>,
  model: <><rect x="5" y="5" width="14" height="14" /><path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" /><rect x="9" y="9" width="6" height="6" /></>,
  chat: <><path d="M4 5h16v11H9l-5 4z" /><path d="M8 9h8M8 12h5" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  check: <><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></>,
  box: <><path d="M3 7l9-4 9 4v10l-9 4-9-4z" /><path d="M3 7l9 4 9-4M12 11v10" /></>,
  plug: <><path d="M9 3v5M15 3v5M6 8h12v4a6 6 0 0 1-12 0zM12 18v3" /></>,
  grid: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></>,
  tag: <><path d="M3 12V3h9l9 9-9 9z" /><circle cx="8" cy="8" r="1.5" /></>,
  person: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" /></>,
  image: <><rect x="3" y="5" width="18" height="14" /><circle cx="9" cy="10" r="2" /><path d="M3 17l6-5 4 3 3-2 5 4" /></>,
  bolt: <><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></>,
  wifi: <><path d="M2 9a15 15 0 0 1 20 0M5 13a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0" /><circle cx="12" cy="20" r="1" /></>,
};

export function Steps({ steps }: StepsProps) {
  const t = useTime();
  const n = steps.length;
  const travel = tween(t, 0.4, n * 0.55, (x) => x);
  const at = travel * (n - 1); // token position, in steps
  return (
    <Stage>
      <div style={{ position: "relative", display: "grid", gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`, gap: 12 }}>
        <div style={{ position: "absolute", left: `${50 / n}%`, right: `${50 / n}%`, top: 36, height: 2, background: C.grey }} />
        <div style={{ position: "absolute", left: `${50 / n}%`, width: `${((n - 1) / n) * 100 * travel}%`, top: 36, height: 2, background: C.ink }} />
        <i
          style={{
            position: "absolute",
            left: `calc(${(50 + at * 100) / n}% - 7px)`,
            top: 30,
            width: 14,
            height: 14,
            background: C.lime,
            outline: `1.5px solid ${C.ink}`,
            opacity: travel > 0 && travel < 1 ? 1 : 0,
            zIndex: 2,
          }}
        />
        {steps.map((s, i) => {
          const p = tween(t, 0.4 + i * 0.55 * ((n - 1) / n), 0.35);
          const last = i === n - 1;
          return (
            <div key={s.title} style={{ display: "grid", justifyItems: "center", gap: 10, textAlign: "center", position: "relative" }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  background: p >= 1 && last ? C.lime : C.paper,
                  boxShadow: `inset 0 0 0 ${p > 0 ? 2 : 1.5}px ${p > 0 ? C.ink : C.grey}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${0.92 + 0.08 * p})`,
                }}
              >
                <svg viewBox="0 0 24 24" style={{ width: 32, height: 32 }} fill="none" stroke={p > 0 ? C.ink : C.grey} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
                  {ICONS[s.icon ?? "file"]}
                </svg>
              </div>
              <div style={{ opacity: 0.35 + 0.65 * p }}>
                <div style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.3 }}>{s.title}</div>
                {s.note && <div style={{ fontSize: 13, color: C.mid, lineHeight: 1.4, marginTop: 3 }}>{s.note}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </Stage>
  );
}

/* ---------- Fields: one record, drawn as a card: a preview of the item and its fields ---------- */

export type FieldsProps = {
  fields: { name: string; type: string; primary?: boolean }[];
  /** What one record looks like, drawn on the left of the card. */
  preview?: "face" | "xray" | "chat" | "visit" | "zip";
};
const fieldsSeconds = ({ fields }: FieldsProps) => 0.5 + fields.length * 0.12 + 0.6;

function Preview({ kind, p }: { kind: NonNullable<FieldsProps["preview"]>; p: number }) {
  const stroke = { fill: "none", stroke: C.ink, strokeWidth: 2.2 } as const;
  return (
    <svg viewBox="0 0 160 160" style={{ width: "100%", height: "auto", display: "block", opacity: 0.3 + 0.7 * p }} aria-hidden="true">
      <rect x="2" y="2" width="156" height="156" fill="#F6F6F6" />
      {kind === "face" && (
        <g>
          <ellipse cx="80" cy="84" rx="48" ry="62" {...stroke} fill={C.paper} />
          <ellipse cx="62" cy="74" rx="5" ry="3" fill={C.ink} />
          <ellipse cx="98" cy="74" rx="5" ry="3" fill={C.ink} />
          <path d="M66 116 Q80 124 94 116" {...stroke} />
          {[[54, 96], [104, 98], [70, 46], [92, 52]].map(([x, y]) => (
            <g key={x}>
              <circle cx={x} cy={y} r="3" fill="#C2564E" />
              <rect x={x - 7} y={y - 7} width="14" height="14" fill="none" stroke={C.lime} strokeWidth="2" opacity={p} />
            </g>
          ))}
        </g>
      )}
      {kind === "xray" && (
        <g>
          <rect x="2" y="2" width="156" height="156" fill="#1C1C1C" />
          <path d="M58 158 L62 70 Q64 50 74 44" fill="none" stroke="#E6E6E6" strokeWidth="14" strokeLinecap="round" />
          <path d="M98 158 L94 76 Q93 58 86 48" fill="none" stroke="#CFCFCF" strokeWidth="10" strokeLinecap="round" />
          {[[60, 30], [78, 24], [96, 30], [110, 40]].map(([x, y]) => (
            <ellipse key={x} cx={x} cy={y} rx="9" ry="7" fill="#DCDCDC" />
          ))}
          <path d="M54 104 L70 98" stroke="#1C1C1C" strokeWidth="3" />
          <rect x="44" y="88" width="34" height="26" fill="none" stroke={C.lime} strokeWidth="2.5" opacity={p} />
        </g>
      )}
      {kind === "chat" && (
        <g>
          <path d="M16 20 H120 V66 H40 L24 80 V66 H16 Z" {...stroke} fill={C.paper} />
          <rect x="28" y="34" width="76" height="6" fill={C.grey} />
          <rect x="28" y="48" width="52" height="6" fill={C.grey} />
          <path d="M40 92 H144 V146 H136 V158 L122 146 H40 Z" fill={C.ink} />
          {[104, 116, 128].map((y, i) => (
            <rect key={y} x="52" y={y} width={[80, 70, 50][i]} height="6" fill="#5A5A5A" />
          ))}
        </g>
      )}
      {kind === "visit" && (
        <g>
          <rect x="30" y="40" width="100" height="96" {...stroke} fill={C.paper} />
          <rect x="66" y="16" width="28" height="24" {...stroke} fill={C.paper} />
          <path d="M80 60 V100 M60 80 H100" stroke="#C2564E" strokeWidth="10" />
          <rect x="44" y="112" width="72" height="8" fill={C.lime} opacity={p} />
        </g>
      )}
      {kind === "zip" && (
        <g>
          {Array.from({ length: 36 }, (_, i) => (
            <circle key={i} cx={22 + (i % 6) * 23} cy={22 + Math.floor(i / 6) * 23} r="7" fill={i === 14 ? C.lime : C.ink} opacity={i === 14 ? 1 : 0.15 + ((i * 37) % 70) / 100} stroke={i === 14 ? C.ink : "none"} />
          ))}
        </g>
      )}
    </svg>
  );
}

export function Fields({ fields, preview }: FieldsProps) {
  const t = useTime();
  const p = tween(t, 0.2, 0.5);
  return (
    <Stage style={{ display: "grid", gridTemplateColumns: preview ? "minmax(120px, 200px) minmax(0, 1fr)" : "minmax(0, 1fr)", gap: 20, alignItems: "start" }}>
      {preview && (
        <div style={{ display: "grid", gap: 8 }}>
          <Preview kind={preview} p={p} />
          <span style={{ fontSize: 13, color: C.mid, textAlign: "center" }}>One record</span>
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 8, alignContent: "start" }}>
        {fields.map((f, i) => (
          <Reveal key={f.name} at={0.5 + i * 0.12}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
                padding: "9px 12px",
                background: f.primary ? "#F6FBE3" : "#F6F6F6",
                boxShadow: f.primary ? `inset 3px 0 0 ${C.lime}` : undefined,
                fontSize: 14,
              }}
            >
              <span style={{ fontFamily: mono, fontSize: 13, fontWeight: f.primary ? 500 : 400 }}>{f.name}</span>
              <span style={{ color: C.soft, fontFamily: mono, fontSize: 12 }}>{f.type}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </Stage>
  );
}

/* ---------- List: short rows sliding in, for repos, sources or citations ---------- */

export type ListProps = { rows: { title: ReactNode; meta?: string; lead?: ReactNode }[] };
const listSeconds = ({ rows }: ListProps) => 0.3 + rows.length * 0.18 + 0.5;
export function List({ rows }: ListProps) {
  return (
    <Stage style={{ display: "grid", gap: 10 }}>
      {rows.map((r, i) => (
        <Reveal key={i} at={0.3 + i * 0.18}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "#F6F6F6", fontSize: 16 }}>
            {r.lead && <span style={{ width: 22, height: 22, display: "flex", flex: "none" }}>{r.lead}</span>}
            <span style={{ flex: 1, minWidth: 0 }}>{r.title}</span>
            {r.meta && <span style={{ color: C.mid, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{r.meta}</span>}
          </div>
        </Reveal>
      ))}
    </Stage>
  );
}

/* ---------- fig(): turn a figure and its data into an AnimationDef ---------- */

const SECONDS = new Map<unknown, (p: never) => number>([
  [Bars, barsSeconds as (p: never) => number],
  [Count, countSeconds as (p: never) => number],
  [Grid, gridSeconds as (p: never) => number],
  [Steps, stepsSeconds as (p: never) => number],
  [Fields, fieldsSeconds as (p: never) => number],
  [List, listSeconds as (p: never) => number],
  [Merge, mergeSeconds as (p: never) => number],
  [Matrix, matrixSeconds as (p: never) => number],
  [Split, splitSeconds as (p: never) => number],
  [Weights, weightsSeconds as (p: never) => number],
  [Faces, facesSeconds as (p: never) => number],
  [Load, loadSeconds as (p: never) => number],
  [Bubbles, bubblesSeconds as (p: never) => number],
  [Decode, decodeSeconds as (p: never) => number],
  [TileRows, tileRowsSeconds as (p: never) => number],
  [Lengths, lengthsSeconds as (p: never) => number],
]);

export function fig<P extends object>(
  Figure: ComponentType<P>,
  props: P,
  caption: string,
  options: Pick<AnimationDef, "wide" | "description"> & { seconds?: number } = {},
): AnimationDef {
  const Bound = () => <Figure {...props} />;
  const seconds = options.seconds ?? SECONDS.get(Figure)?.(props as never) ?? 2;
  return { component: Bound, seconds, caption, ...options };
}
