import { C, Stage, easeInOut, tween, useTime } from "@/components/writeup/anim/kit";

// Three machines a clinic could run AI on, drawn, each plugged in, with what
// its electricity costs a month at NYC's commercial rate (17.82 cents per kWh).

const MACHINES = [
  { name: "Mac mini", cost: 4.56, kind: "mini" },
  { name: "Workstation with a GPU", cost: 45.57, kind: "tower" },
  { name: "Two-GPU server", cost: 117.17, kind: "server" },
] as const;
export const MACHINES_SECONDS = 0.3 + MACHINES.length * 0.5 + 1.6;

function Device({ kind, glow }: { kind: (typeof MACHINES)[number]["kind"]; glow: number }) {
  const led = `rgba(198,244,50,${0.25 + 0.75 * glow})`;
  if (kind === "mini")
    return (
      <svg viewBox="0 0 160 120" style={{ width: "100%", height: "auto", display: "block" }} aria-hidden="true">
        <rect x="30" y="66" width="100" height="26" rx="8" fill="#E6E6E6" stroke={C.ink} strokeWidth="2.5" />
        <circle cx="46" cy="79" r="3" fill={led} stroke={C.ink} strokeWidth="1" />
        <rect x="104" y="76" width="16" height="3" fill={C.grey} />
      </svg>
    );
  if (kind === "tower")
    return (
      <svg viewBox="0 0 160 120" style={{ width: "100%", height: "auto", display: "block" }} aria-hidden="true">
        <rect x="52" y="8" width="56" height="104" rx="4" fill="#E6E6E6" stroke={C.ink} strokeWidth="2.5" />
        {[22, 32, 42].map((y) => (
          <rect key={y} x="62" y={y} width="36" height="4" fill={C.grey} />
        ))}
        <rect x="60" y="62" width="40" height="14" fill={C.ink} />
        <rect x="64" y="66" width="20" height="6" fill={led} />
        <circle cx="80" cy="96" r="4" fill={led} stroke={C.ink} strokeWidth="1" />
      </svg>
    );
  return (
    <svg viewBox="0 0 160 120" style={{ width: "100%", height: "auto", display: "block" }} aria-hidden="true">
      <rect x="12" y="34" width="136" height="56" rx="3" fill="#E6E6E6" stroke={C.ink} strokeWidth="2.5" />
      {[44, 66].map((y) => (
        <g key={y}>
          <rect x="22" y={y} width="88" height="14" fill={C.ink} />
          <rect x="26" y={y + 4} width="48" height="6" fill={led} />
        </g>
      ))}
      <circle cx="128" cy="51" r="4" fill={led} stroke={C.ink} strokeWidth="1" />
      <circle cx="128" cy="73" r="4" fill={led} stroke={C.ink} strokeWidth="1" />
    </svg>
  );
}

export default function Machines() {
  const t = useTime();
  const max = MACHINES[MACHINES.length - 1].cost;
  return (
    <Stage style={{ display: "grid", gridTemplateColumns: `repeat(${MACHINES.length}, minmax(0, 1fr))`, gap: 24, alignItems: "end" }}>
      {MACHINES.map((m, i) => {
        const on = tween(t, 0.3 + i * 0.5, 0.4);
        const bill = tween(t, 0.6 + i * 0.5, 1.0, easeInOut);
        const pulse = 0.5 + 0.5 * Math.sin(t * 4 + i);
        return (
          <div key={m.name} style={{ display: "grid", gap: 10, justifyItems: "center", opacity: 0.3 + 0.7 * on }}>
            <div style={{ width: "100%", maxWidth: 200 }}>
              <Device kind={m.kind} glow={on * pulse} />
            </div>
            <span style={{ fontSize: 15, fontWeight: 500, textAlign: "center" }}>{m.name}</span>
            {/* the monthly bill: a receipt that fills to its share of the largest */}
            <div style={{ width: "100%", maxWidth: 200, display: "grid", gap: 6 }}>
              <div style={{ height: 8, background: C.track }}>
                <i style={{ display: "block", height: "100%", width: `${(m.cost / max) * 100 * bill}%`, background: i === 0 ? C.lime : C.ink }} />
              </div>
              <span style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums", textAlign: "center" }}>
                ${(m.cost * bill).toFixed(2)}
                <span style={{ fontSize: 13, color: C.mid, fontWeight: 400 }}> a month</span>
              </span>
            </div>
          </div>
        );
      })}
    </Stage>
  );
}
