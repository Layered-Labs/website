import { Logo } from "@/components/landing/logos";
import { C, Reveal, Stage } from "@/components/writeup/anim/kit";

// Where it lives: the five converted benchmarks on Hugging Face.
const REPOS = [
  { name: "benchbase-medmcqa", n: "187,005" },
  { name: "benchbase-medqa", n: "11,451" },
  { name: "benchbase-mmlu-medical", n: "1,242" },
  { name: "benchbase-pubmedqa", n: "1,000" },
  { name: "benchbase-triage", n: "86" },
];

export const AVAILABILITY_SECONDS = 0.3 + REPOS.length * 0.18 + 0.5;

export default function Availability() {
  return (
    <Stage style={{ display: "grid", gap: 10 }}>
      {REPOS.map((r, i) => (
        <Reveal key={r.name} at={0.3 + i * 0.18}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "#F6F6F6", fontSize: 16 }}>
            <span style={{ width: 22, height: 22, display: "flex", flex: "none" }}>
              <Logo name="huggingface" decorative />
            </span>
            <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              <span style={{ color: C.soft }}>Layered-Labs/</span>
              <span style={{ fontWeight: 500 }}>{r.name}</span>
            </span>
            <span style={{ color: C.mid, fontVariantNumeric: "tabular-nums" }}>{r.n}</span>
          </div>
        </Reveal>
      ))}
    </Stage>
  );
}
