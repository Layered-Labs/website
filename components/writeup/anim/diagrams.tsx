import type { ReactNode } from "react";
import { C, Stage, easeInOut, mix, pick, tween, useTime } from "./kit";

// Picture figures: they show the thing instead of stating a number. Configure
// them with fig(Component, props, caption, { seconds }) in animations/index.tsx.

const mono = "var(--font-mono), ui-monospace, monospace";

/* ---------- Merge: many files slide together into one ---------- */

export type MergeProps = { files: string[]; into: string; note?: string };
export const mergeSeconds = ({ files }: MergeProps) => 0.3 + files.length * 0.06 + 2.2;
export function Merge({ files, into, note }: MergeProps) {
  const t = useTime();
  const n = files.length;
  const appearEnd = 0.3 + n * 0.06;
  const go = tween(t, appearEnd + 0.3, 1.0, easeInOut);
  const one = tween(t, appearEnd + 1.1, 0.5);
  const w = Math.min(44, 520 / n);
  return (
    <Stage>
      <div style={{ position: "relative", height: 210 }}>
        {files.map((label, i) => {
          const x0 = ((i + 0.5) / n) * 100;
          const x = mix(x0, 50, go);
          const appear = tween(t, 0.3 + i * 0.06, 0.3);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: 10,
                transform: `translate(-50%, ${(1 - appear) * 8}px) scale(${1 - 0.5 * go})`,
                opacity: appear * (1 - go),
                display: "grid",
                justifyItems: "center",
                gap: 6,
              }}
            >
              <svg viewBox="0 0 40 50" style={{ width: w, height: w * 1.25, display: "block" }} aria-hidden="true">
                <path d="M1 1 H28 L39 12 V49 H1 Z" fill={C.paper} stroke={C.ink} strokeWidth="2" />
                <path d="M28 1 V12 H39" fill="none" stroke={C.ink} strokeWidth="2" />
                <rect x="8" y="22" width="22" height="3" fill={C.grey} />
                <rect x="8" y="30" width="16" height="3" fill={C.grey} />
              </svg>
              {label && <span style={{ fontSize: 12, color: C.mid, whiteSpace: "nowrap" }}>{label}</span>}
            </div>
          );
        })}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 70,
            transform: `translateX(-50%) scale(${0.9 + 0.1 * one})`,
            opacity: one,
            display: "grid",
            justifyItems: "center",
            gap: 10,
          }}
        >
          <div style={{ width: 120, height: 84, background: C.ink, display: "grid", gap: 6, padding: 14, boxSizing: "border-box", alignContent: "center" }}>
            {[1, 0.8, 0.9, 0.6].map((f, k) => (
              <i key={k} style={{ display: "block", height: 6, width: `${f * 100}%`, background: k === 0 ? C.lime : "#5A5A5A" }} />
            ))}
          </div>
          <span style={{ fontSize: 16, fontWeight: 500 }}>{into}</span>
          {note && <span style={{ fontSize: 14, color: C.mid, marginTop: -6 }}>{note}</span>}
        </div>
      </div>
    </Stage>
  );
}

/* ---------- Matrix: rows by columns of cells, filling in a sweep ---------- */

export type MatrixProps = { rows: string[]; cols: number; colLabel: string };
export const matrixSeconds = () => 2.4;
export function Matrix({ rows, cols, colLabel }: MatrixProps) {
  const t = useTime();
  const cell = 14;
  const gap = 3;
  return (
    <Stage style={{ display: "grid", gridTemplateColumns: "92px minmax(0, 1fr)", columnGap: 14, rowGap: 8, alignItems: "center" }}>
      <span />
      <span style={{ fontSize: 13, color: C.mid }}>{colLabel}</span>
      <div style={{ display: "grid", gap: 0 }}>
        {rows.map((r) => (
          <span key={r} style={{ height: cell + gap, lineHeight: `${cell + gap}px`, fontSize: 13, fontWeight: 500 }}>
            {r}
          </span>
        ))}
      </div>
      <svg viewBox={`0 0 ${cols * (cell + gap)} ${rows.length * (cell + gap)}`} style={{ width: "100%", height: "auto", display: "block" }} aria-hidden="true">
        {rows.map((_, r) =>
          Array.from({ length: cols }, (_, c) => {
            const p = tween(t, 0.3 + (c / cols) * 1.3 + r * 0.05, 0.3);
            return (
              <rect
                key={`${r}-${c}`}
                x={c * (cell + gap)}
                y={r * (cell + gap)}
                width={cell}
                height={cell}
                fill={p >= 1 ? C.ink : C.track}
                opacity={0.35 + 0.65 * p}
              />
            );
          }),
        )}
      </svg>
    </Stage>
  );
}

/* ---------- Split: each person, with their images, goes to one bin ---------- */

export type SplitProps = { people: number; bins: { label: string; share: number; note: string }[] };
export const splitSeconds = ({ people }: SplitProps) => 0.4 + people * 0.03 + 1.4;
export function Split({ people, bins }: SplitProps) {
  const t = useTime();
  // Assign each person to a bin by share, in a fixed shuffled order.
  const order = pick(people, people, 42);
  const counts = bins.map((b) => Math.round(b.share * people));
  counts[0] += people - counts.reduce((a, b) => a + b, 0);
  const binOf: number[] = [];
  let k = 0;
  bins.forEach((_, b) => {
    for (let j = 0; j < counts[b]; j++) binOf[order[k++]] = b;
  });
  const slotIn = new Array(bins.length).fill(0);
  const binX = bins.map((_, b) => ((b + 0.5) / bins.length) * 100);
  const cols = 10;
  return (
    <Stage>
      <div style={{ position: "relative", height: 300 }}>
        {Array.from({ length: people }, (_, i) => {
          const b = binOf[i];
          const s = slotIn[b]++;
          const start = { x: 8 + (i % 20) * 4.4, y: 8 + Math.floor(i / 20) * 22 };
          const end = { x: binX[b] - 11 + (s % cols) * 2.4, y: 170 + Math.floor(s / cols) * 16 };
          const p = tween(t, 0.4 + i * 0.03, 0.9, easeInOut);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${mix(start.x, end.x, p)}%`,
                top: mix(start.y, end.y, p),
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <i style={{ width: 8, height: 8, borderRadius: "50%", background: C.ink, display: "block" }} />
              {p < 0.05 && (
                <>
                  <i style={{ width: 4, height: 6, background: "#8F8F8F", display: "block" }} />
                  <i style={{ width: 4, height: 6, background: "#8F8F8F", display: "block" }} />
                </>
              )}
            </div>
          );
        })}
        {bins.map((b, i) => (
          <div
            key={b.label}
            style={{
              position: "absolute",
              left: `${binX[i]}%`,
              top: 150,
              transform: "translateX(-50%)",
              width: "30%",
              height: 140,
              boxShadow: `inset 0 0 0 1.5px ${C.grey}`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingBottom: 8,
              boxSizing: "border-box",
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 500 }}>{b.label}</span>
            <span style={{ fontSize: 13, color: C.mid }}>{b.note}</span>
          </div>
        ))}
      </div>
    </Stage>
  );
}

/* ---------- Weights: sampled records, then each scaled by its weight ---------- */

export type WeightsProps = { n: number; left: string; right: string };
export const weightsSeconds = () => 2.6;
export function Weights({ n, left, right }: WeightsProps) {
  const t = useTime();
  const grow = tween(t, 1.0, 1.2, easeInOut);
  const sizes = pick(n, n, 9).map((v) => 6 + (v / n) * 22);
  const cols = Math.ceil(Math.sqrt(n));
  const panel = (scaled: boolean) => (
    <svg viewBox={`0 0 ${cols * 34} ${Math.ceil(n / cols) * 34}`} style={{ width: "100%", height: "auto", display: "block" }} aria-hidden="true">
      {sizes.map((s, i) => {
        const r = scaled ? mix(4, s / 2, grow) : 4;
        const appear = tween(t, 0.2 + i * 0.01, 0.3);
        return <circle key={i} cx={(i % cols) * 34 + 17} cy={Math.floor(i / cols) * 34 + 17} r={r * appear} fill={scaled ? C.ink : "#8F8F8F"} opacity={scaled ? 0.85 : 1} />;
      })}
    </svg>
  );
  return (
    <Stage style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 28 }}>
      <div style={{ display: "grid", gap: 10 }}>
        <span style={{ fontSize: 15, fontWeight: 500 }}>{left}</span>
        {panel(false)}
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        <span style={{ fontSize: 15, fontWeight: 500 }}>{right}</span>
        {panel(true)}
      </div>
    </Stage>
  );
}

/* ---------- Faces: a face per grade, lesions appearing; optional boxes ---------- */

export type FacesProps = { faces: { label: string; lesions: number; note?: string }[]; boxes?: boolean };
export const facesSeconds = ({ faces }: FacesProps) => 0.3 + faces.length * 0.3 + 1.6;
function Face({ lesions, start, boxes }: { lesions: number; start: number; boxes?: boolean }) {
  const t = useTime();
  // Lesions sit on the forehead and cheeks.
  const spots = pick(400, lesions, lesions * 7 + 1).map((v) => {
    const zone = v % 3;
    const u = ((v * 37) % 100) / 100;
    const w = ((v * 61) % 100) / 100;
    if (zone === 0) return { x: 70 + u * 60, y: 52 + w * 22 };
    if (zone === 1) return { x: 52 + u * 26, y: 112 + w * 30 };
    return { x: 122 + u * 26, y: 112 + w * 30 };
  });
  return (
    <svg viewBox="0 0 200 220" style={{ width: "100%", height: "auto", display: "block" }} aria-hidden="true">
      <ellipse cx="100" cy="112" rx="72" ry="92" fill="#F6F6F6" stroke={C.ink} strokeWidth="2.5" />
      <ellipse cx="74" cy="96" rx="7" ry="4" fill={C.ink} />
      <ellipse cx="126" cy="96" rx="7" ry="4" fill={C.ink} />
      <path d="M100 104 V130 H92" fill="none" stroke={C.ink} strokeWidth="2" />
      <path d="M80 160 Q100 172 120 160" fill="none" stroke={C.ink} strokeWidth="2.5" />
      {spots.map((s, i) => {
        const p = tween(t, start + (i / Math.max(1, lesions)) * 1.0, 0.25);
        return (
          <g key={i} opacity={p}>
            <circle cx={s.x} cy={s.y} r={3.2} fill="#C2564E" />
            {boxes && <rect x={s.x - 6} y={s.y - 6} width={12} height={12} fill="none" stroke={C.lime} strokeWidth="1.8" />}
          </g>
        );
      })}
    </svg>
  );
}
export function Faces({ faces, boxes }: FacesProps) {
  return (
    <Stage style={{ display: "grid", gridTemplateColumns: `repeat(${faces.length}, minmax(0, 1fr))`, gap: 20, maxWidth: faces.length === 1 ? 240 : undefined, margin: faces.length === 1 ? "0 auto" : undefined }}>
      {faces.map((f, i) => (
        <div key={f.label} style={{ display: "grid", gap: 8, justifyItems: "center" }}>
          <Face lesions={f.lesions} start={0.3 + i * 0.3} boxes={boxes} />
          <span style={{ fontSize: 15, fontWeight: 500 }}>{f.label}</span>
          {f.note && <span style={{ fontSize: 13, color: C.mid, marginTop: -4 }}>{f.note}</span>}
        </div>
      ))}
    </Stage>
  );
}

/* ---------- Load: the repository, one call, rows arriving ---------- */

export type LoadProps = { lead?: ReactNode; repo: string; code: string; terms?: string };
export const loadSeconds = () => 2.6;
export function Load({ lead, repo, code, terms }: LoadProps) {
  const t = useTime();
  const a = tween(t, 0.2, 0.4);
  const b = tween(t, 0.7, 0.4);
  const arrow1 = tween(t, 0.5, 0.3);
  const arrow2 = tween(t, 1.1, 0.3);
  return (
    <Stage style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 28px minmax(0, 1.3fr) 28px minmax(0, 1fr)", alignItems: "center", gap: 8 }}>
      <div style={{ opacity: a, display: "grid", gap: 8, justifyItems: "center", textAlign: "center" }}>
        <span style={{ width: 44, height: 44, display: "flex" }}>{lead}</span>
        <span style={{ fontSize: 14, fontWeight: 500, wordBreak: "break-word" }}>{repo}</span>
        {terms && <span style={{ fontSize: 13, color: C.mid }}>{terms}</span>}
      </div>
      <svg viewBox="0 0 28 12" style={{ width: "100%", opacity: arrow1 }} aria-hidden="true">
        <path d="M0 6 H24 M18 1 L25 6 L18 11" fill="none" stroke={C.ink} strokeWidth="1.6" />
      </svg>
      <div style={{ opacity: b, background: "#F6F6F6", padding: "12px 14px", fontFamily: mono, fontSize: 12.5, lineHeight: 1.6, wordBreak: "break-word" }}>{code}</div>
      <svg viewBox="0 0 28 12" style={{ width: "100%", opacity: arrow2 }} aria-hidden="true">
        <path d="M0 6 H24 M18 1 L25 6 L18 11" fill="none" stroke={C.ink} strokeWidth="1.6" />
      </svg>
      <div style={{ display: "grid", gap: 4 }}>
        {Array.from({ length: 7 }, (_, i) => {
          const p = tween(t, 1.4 + i * 0.1, 0.3);
          return (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: 4, opacity: p, transform: `translateX(${(1 - p) * -8}px)` }}>
              <i style={{ height: 10, background: i === 0 ? C.ink : C.grey, display: "block" }} />
              <i style={{ height: 10, background: i === 0 ? C.ink : C.track, display: "block" }} />
              <i style={{ height: 10, background: i === 0 ? C.ink : C.track, display: "block" }} />
            </div>
          );
        })}
      </div>
    </Stage>
  );
}

/* ---------- Bubbles: the same concern, asked several ways ---------- */

export type BubblesProps = { topic: string; items: { label: string; text: string }[] };
export const bubblesSeconds = ({ items }: BubblesProps) => 0.4 + items.length * 0.35 + 1.0;
export function Bubbles({ topic, items }: BubblesProps) {
  const t = useTime();
  return (
    <Stage style={{ display: "grid", gap: 16 }}>
      <div style={{ justifySelf: "center", padding: "6px 14px", background: C.ink, color: C.paper, fontSize: 14, fontWeight: 500, opacity: tween(t, 0.1, 0.3) }}>{topic}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        {items.map((it, i) => {
          const p = tween(t, 0.4 + i * 0.35, 0.4);
          return (
            <div key={it.label} style={{ position: "relative", opacity: p, transform: `translateY(${(1 - p) * 8}px)` }}>
              <div style={{ background: "#F6F6F6", padding: "12px 14px 14px", display: "grid", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{it.label}</span>
                <span style={{ fontSize: 14, lineHeight: 1.45, color: C.text }}>{it.text}</span>
              </div>
              <svg viewBox="0 0 16 10" style={{ position: "absolute", left: 18, bottom: -9, width: 16, height: 10 }} aria-hidden="true">
                <path d="M0 0 H16 L4 10 Z" fill="#F6F6F6" />
              </svg>
            </div>
          );
        })}
      </div>
    </Stage>
  );
}

/* ---------- Decode: a stored code and what it means ---------- */

export type DecodeProps = { rows: { field: string; code: string; meaning: string }[] };
export const decodeSeconds = ({ rows }: DecodeProps) => 0.3 + rows.length * 0.35 + 0.8;
export function Decode({ rows }: DecodeProps) {
  const t = useTime();
  return (
    <Stage style={{ display: "grid", gap: 12 }}>
      {rows.map((r, i) => {
        const a = tween(t, 0.3 + i * 0.35, 0.3);
        const b = tween(t, 0.5 + i * 0.35, 0.35);
        return (
          <div key={r.field} style={{ display: "grid", gridTemplateColumns: "130px 76px 40px minmax(0, 1fr)", alignItems: "center", gap: 10, opacity: a }}>
            <span style={{ fontFamily: mono, fontSize: 13, color: C.mid }}>{r.field}</span>
            <span style={{ fontFamily: mono, fontSize: 15, background: "#F6F6F6", padding: "6px 10px", textAlign: "center" }}>{r.code}</span>
            <svg viewBox="0 0 40 12" style={{ width: "100%" }} aria-hidden="true">
              <path d={`M0 6 H${36 * b} M${30 * b} 1 L${37 * b} 6 L${30 * b} 11`} fill="none" stroke={C.ink} strokeWidth="1.6" opacity={b} />
            </svg>
            <span style={{ fontSize: 16, fontWeight: 500, opacity: b }}>{r.meaning}</span>
          </div>
        );
      })}
    </Stage>
  );
}

/* ---------- TileRows: one tile per item; the ones that matter light up ---------- */

export type TileRowsProps = {
  rows: { label: ReactNode; total: number; marked: number; note?: string }[];
  /** Items per tile, when there are too many to draw one each. Defaults to 1. */
  per?: number;
  tile?: "square" | "photo" | "xray";
  seed?: number;
};
export const tileRowsSeconds = ({ rows }: TileRowsProps) => 0.3 + rows.length * 0.25 + 1.6;
export function TileRows({ rows, per = 1, tile = "square", seed = 3 }: TileRowsProps) {
  const t = useTime();
  const size = tile === "square" ? 9 : 12;
  const base = tile === "xray" ? "#2B2B2B" : tile === "photo" ? "#E6E6E6" : C.track;
  return (
    <Stage style={{ display: "grid", gap: 14 }}>
      {rows.map((r, i) => {
        const total = Math.ceil(r.total / per);
        const marked = Math.round(r.marked / per);
        const lit = new Set(pick(total, marked, seed + i * 17));
        const appear = tween(t, 0.3 + i * 0.25, 0.4);
        const light = tween(t, 0.6 + i * 0.25, 1.0, easeInOut);
        const order = pick(total, marked, seed + i * 17);
        const shown = new Set(order.slice(0, Math.round(order.length * light)));
        return (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "minmax(140px, 220px) minmax(0, 1fr)", gap: 16, alignItems: "center", opacity: 0.2 + 0.8 * appear }}>
            <div style={{ display: "grid", gap: 2 }}>
              <span style={{ fontSize: 15, fontWeight: 500 }}>{r.label}</span>
              {r.note && <span style={{ fontSize: 13, color: C.mid }}>{r.note}</span>}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
              {Array.from({ length: total }, (_, k) => {
                const on = lit.has(k) && shown.has(k);
                return (
                  <i
                    key={k}
                    style={{
                      display: "block",
                      width: size,
                      height: size,
                      background: on ? C.lime : base,
                      boxShadow: on ? `inset 0 0 0 1.5px ${C.ink}` : tile === "photo" ? `inset 0 0 0 1px ${C.grey}` : undefined,
                      borderRadius: tile === "photo" ? 2 : 0,
                    }}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </Stage>
  );
}

/* ---------- Lengths: a short message against a long one, drawn as bubbles ---------- */

export type LengthsProps = { items: { label: string; chars: number; note: string; dark?: boolean }[]; perLine?: number };
export const lengthsSeconds = () => 2.6;
export function Lengths({ items, perLine = 110 }: LengthsProps) {
  const t = useTime();
  return (
    <Stage style={{ display: "grid", gap: 18 }}>
      {items.map((it, i) => {
        const lines = Math.max(1, Math.round(it.chars / perLine));
        const shown = Math.round(lines * tween(t, 0.3 + i * 0.8, 1.0, easeInOut));
        return (
          <div key={it.label} style={{ display: "grid", gap: 6, justifyItems: it.dark ? "end" : "start" }}>
            <span style={{ fontSize: 13, color: C.mid }}>
              <b style={{ color: C.ink, fontWeight: 500 }}>{it.label}</b> · {it.note}
            </span>
            <div style={{ width: "min(560px, 100%)", background: it.dark ? C.ink : "#F6F6F6", padding: "12px 14px", display: "grid", gap: 6, minHeight: 20 }}>
              {Array.from({ length: shown }, (_, k) => (
                <i key={k} style={{ display: "block", height: 7, width: `${k === lines - 1 ? 55 : 92 + ((k * 13) % 8)}%`, background: it.dark ? "#5A5A5A" : C.grey }} />
              ))}
            </div>
          </div>
        );
      })}
    </Stage>
  );
}
