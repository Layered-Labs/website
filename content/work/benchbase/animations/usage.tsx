import { C, Reveal, Stage, tween, useTime } from "@/components/writeup/anim/kit";

// One command, typed, then the files a run leaves behind.

const CMD = "benchbase run --model qwen/qwen3-8b --limit 100";
const FILES = ["responses.jsonl", "summary.json", "metrics.csv", "report.md", "figures/", "results.csv"];
const TYPE = 1.6;

export const USAGE_SECONDS = 0.3 + TYPE + 1.6 + FILES.length * 0.15 + 0.4;

export default function Usage() {
  const t = useTime();
  const chars = Math.round(CMD.length * tween(t, 0.3, TYPE, (x) => x));
  const run = tween(t, 0.3 + TYPE + 0.2, 1.4, (x) => x);
  const filesAt = 0.3 + TYPE + 1.7;
  const mono = "var(--font-mono), ui-monospace, monospace";
  return (
    <Stage>
      <div style={{ background: "#F6F6F6", padding: "18px 20px", fontFamily: mono, fontSize: 14, lineHeight: 1.7 }}>
        <div>
          <span style={{ color: C.soft }}>$ </span>
          {CMD.slice(0, chars)}
          {chars < CMD.length && <span style={{ background: C.ink, display: "inline-block", width: 8, height: 16, verticalAlign: -3 }} />}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8, opacity: run > 0 ? 1 : 0, color: C.mid }}>
          <span style={{ flex: 1, height: 6, background: C.track, display: "block" }}>
            <i style={{ display: "block", height: "100%", width: `${run * 100}%`, background: C.ink }} />
          </span>
          <span style={{ fontVariantNumeric: "tabular-nums", minWidth: "8ch", textAlign: "right" }}>{Math.round(run * 500)} / 500</span>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
        {FILES.map((f, i) => (
          <Reveal key={f} at={filesAt + i * 0.15}>
            <span style={{ fontFamily: mono, fontSize: 13, padding: "4px 10px", border: `1px solid ${C.grey}`, display: "inline-block" }}>{f}</span>
          </Reveal>
        ))}
      </div>
    </Stage>
  );
}
