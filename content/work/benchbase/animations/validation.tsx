import { C, Stage, tween, useTime } from "@/components/writeup/anim/kit";

// Every source row either converts or is rejected and logged. Bars are each
// benchmark's source rows; ink is what converted.

const ROWS = [
  { name: "MedMCQA", source: 193155, converted: 187005 },
  { name: "MedQA", source: 11451, converted: 11451 },
  { name: "MMLU Medical", source: 1242, converted: 1242 },
  { name: "PubMedQA", source: 1000, converted: 1000 },
  { name: "TRIAGE", source: 87, converted: 86 },
];

export const VALIDATION_SECONDS = 0.3 + ROWS.length * 0.15 + 1.2;

export default function Validation() {
  const t = useTime();
  return (
    <Stage style={{ display: "grid", gap: 16 }}>
      {ROWS.map((r, i) => {
        const p = tween(t, 0.3 + i * 0.15, 1.1);
        const share = r.converted / r.source;
        return (
          <div key={r.name} style={{ display: "grid", gap: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 16 }}>
              <span style={{ fontWeight: 500 }}>{r.name}</span>
              <span style={{ color: C.mid, fontVariantNumeric: "tabular-nums" }}>
                <b style={{ color: C.ink, fontWeight: 500 }}>{Math.round(r.converted * p).toLocaleString("en-US")}</b> of{" "}
                {r.source.toLocaleString("en-US")}
              </span>
            </div>
            <div style={{ height: 14, background: C.track, position: "relative" }}>
              <i style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${share * 100 * p}%`, background: C.ink }} />
              <i
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: `${share * 100}%`,
                  width: `${(1 - share) * 100 * p}%`,
                  background: "#B8B8B8",
                }}
              />
            </div>
          </div>
        );
      })}
    </Stage>
  );
}
