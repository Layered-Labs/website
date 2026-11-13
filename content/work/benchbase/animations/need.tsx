import { C, Stage, easeInOut, mix, tween, useTime } from "@/components/writeup/anim/kit";

// Five benchmarks, five shapes of record. Each row's fields start where its
// source puts them, then snap into the one BenchBase schema: question,
// options, answer.

type Field = { x: number; w: number }; // percent of the row
const ROWS: { name: string; from: [Field, Field, Field] }[] = [
  { name: "MedQA", from: [{ x: 0, w: 44 }, { x: 48, w: 34 }, { x: 86, w: 8 }] },
  { name: "MedMCQA", from: [{ x: 10, w: 30 }, { x: 44, w: 22 }, { x: 0, w: 6 }] },
  { name: "PubMedQA", from: [{ x: 0, w: 62 }, { x: 70, w: 10 }, { x: 84, w: 14 }] },
  { name: "MMLU Medical", from: [{ x: 6, w: 40 }, { x: 56, w: 40 }, { x: 0, w: 4 }] },
  { name: "TRIAGE", from: [{ x: 0, w: 28 }, { x: 34, w: 30 }, { x: 70, w: 6 }] },
];
const TO: [Field, Field, Field] = [{ x: 0, w: 52 }, { x: 55, w: 33 }, { x: 91, w: 9 }];
const HEADS = ["question", "options", "answer"];

export const NEED_SECONDS = 2.6;

export default function Need() {
  const t = useTime();
  const heads = tween(t, 1.9, 0.5);
  return (
    <Stage style={{ display: "grid", gridTemplateColumns: "120px minmax(0, 1fr)", columnGap: 20, rowGap: 14, alignItems: "center" }}>
      <span />
      <div style={{ position: "relative", height: 22, opacity: heads }}>
        {TO.map((f, k) => (
          <span key={k} style={{ position: "absolute", left: `${f.x}%`, fontSize: 14, color: C.mid }}>
            {HEADS[k]}
          </span>
        ))}
      </div>
      {ROWS.map((r, i) => {
        const p = tween(t, 0.5 + i * 0.12, 0.9, easeInOut);
        return [
          <span key={`${r.name}-n`} style={{ fontSize: 16, fontWeight: 500 }}>
            {r.name}
          </span>,
          <div key={`${r.name}-r`} style={{ position: "relative", height: 22 }}>
            {r.from.map((f, k) => (
              <i
                key={k}
                style={{
                  position: "absolute",
                  top: 0,
                  height: 22,
                  left: `${mix(f.x, TO[k].x, p)}%`,
                  width: `${mix(f.w, TO[k].w, p)}%`,
                  background: k === 2 ? C.ink : k === 1 ? "#8F8F8F" : "#CFCFCF",
                }}
              />
            ))}
          </div>,
        ];
      })}
    </Stage>
  );
}
