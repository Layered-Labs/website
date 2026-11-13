import { C, useTime } from "@/components/writeup/anim/kit";
import { MODELS } from "@/lib/content/models";

// Card 3 of the ortho page, in real time. Every question goes to Jev first
// (0.21 s). If Jev is 95% sure or more, its answer stands; if not, the
// question goes on to Claude Opus (3.88 s more). 10 of these 20 go to Opus.

type Pt = [number, number];
const PK = MODELS.jev.color;
const OR = MODELS.claude.color;
const G = "#CFCFCF";
const N = 20;
const SG = 450; // ms between questions
const OPUS = new Set([1, 2, 5, 6, 8, 11, 13, 14, 17, 19]);
const CK = [0.99, 0.97, 0.98, 0.96, 0.99, 0.97, 0.98, 0.99, 0.96, 0.97];
const CO = [0.62, 0.88, 0.71, 0.54, 0.93, 0.8, 0.67, 0.9, 0.58, 0.75];
const Q: Pt = [24, 110];
const A: Pt = [668, 110];
const W: Pt = [375, 326];

// The four arrows: [start, control 1, control 2, end] (a straight line has its
// controls on the line).
const ARROWS: [Pt, Pt, Pt, Pt][] = [
  [[170, 160], [230, 160], [230, 90], [288, 90]],
  [[375, 116], [375, 152], [375, 188], [375, 224]],
  [[460, 90], [560, 90], [560, 160], [656, 160]],
  [[485, 252], [565, 252], [565, 160], [656, 160]],
];
const d = ([a, b, c, e]: [Pt, Pt, Pt, Pt], straight: boolean) =>
  straight ? `M${a[0]} ${a[1]} L${e[0]} ${e[1]}` : `M${a[0]} ${a[1]} C ${b[0]} ${b[1]} ${c[0]} ${c[1]} ${e[0]} ${e[1]}`;

const bez = ([a, b, c, e]: [Pt, Pt, Pt, Pt], u: number): Pt => {
  const v = 1 - u;
  return [0, 1].map((k) => v * v * v * a[k] + 3 * v * v * u * b[k] + 3 * v * u * u * c[k] + u * u * u * e[k]) as Pt;
};
// Arc-length tables, so dots move at an even speed along each curve.
const LUT = ARROWS.map((arrow) => {
  const pts = Array.from({ length: 101 }, (_, i) => bez(arrow, i / 100));
  const len = [0];
  for (let i = 1; i < pts.length; i++) len.push(len[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  return { pts, len };
});
const along = (k: number, f: number): Pt => {
  const { pts, len } = LUT[k];
  const target = f * len[len.length - 1];
  let i = 1;
  while (i < len.length - 1 && len[i] < target) i++;
  const p = (target - len[i - 1]) / (len[i] - len[i - 1] || 1);
  return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * p, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * p];
};
const lerp = (a: Pt, b: Pt, f: number): Pt => [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
const slot = (o: Pt, k: number): Pt => [o[0] + (k % 5) * 26 + 11, o[1] + Math.floor(k / 5) * 26 + 11];

type Seg = ["m", Pt, Pt, number] | ["p", number, 0, number] | ["h", Pt, 0, number];

// Answered slots fill in the order questions finish.
const finishOrder = [...Array(N).keys()].map((i) => ({ i, t: i * SG + (OPUS.has(i) ? 4090 : 210) })).sort((a, b) => a.t - b.t);
const slotOf: Record<number, number> = {};
finishOrder.forEach((f, k) => (slotOf[f.i] = k));

const ITEMS = (() => {
  let ki = 0;
  let oi = 0;
  return Array.from({ length: N }, (_, i) => {
    const o = OPUS.has(i);
    const conf = o ? CO[oi] : CK[ki];
    const q = slot(Q, i);
    const a = slot(A, slotOf[i]);
    let segs: Seg[];
    if (!o) {
      ki++;
      segs = [["m", q, ARROWS[0][0], 25], ["p", 0, 0, 45], ["m", ARROWS[0][3], ARROWS[2][0], 60], ["p", 2, 0, 50], ["m", ARROWS[2][3], a, 30]];
    } else {
      const w: Pt = [W[0] + ((oi % 6) - 2.5) * 20, W[1]];
      oi++;
      segs = [
        ["m", q, ARROWS[0][0], 25], ["p", 0, 0, 45], ["m", ARROWS[0][3], ARROWS[1][0], 60], ["p", 1, 0, 50],
        ["m", ARROWS[1][3], w, 60], ["h", w, 0, 3680], ["m", w, ARROWS[3][0], 60], ["p", 3, 0, 80], ["m", ARROWS[3][3], a, 30],
      ];
    }
    return { start: i * SG, segs, o, conf, q, a, total: segs.reduce((x, s) => x + s[3], 0) };
  });
})();

const END_MS = Math.max(...ITEMS.map((it) => it.start + it.total));
export const METHODS_SECONDS = END_MS / 1000 + 0.2;
export const METHODS_SIZE = { width: 820, height: 340 };

export default function Methods() {
  const t = useTime() * 1000;
  let inJ = 0;
  let inO = 0;
  let ak = 0;
  let ao = 0;
  let read: (typeof ITEMS)[number] | undefined;

  const dots = ITEMS.map((it, i) => {
    const lt = t - it.start;
    let p: Pt = it.q;
    let col = G;
    if (lt >= it.total) {
      p = it.a;
      col = it.o ? OR : PK;
      if (it.o) ao++;
      else ak++;
    } else if (lt >= 0) {
      let acc = 0;
      let si = 0;
      for (; si < it.segs.length; si++) {
        if (lt < acc + it.segs[si][3]) break;
        acc += it.segs[si][3];
      }
      const sg = it.segs[si];
      const f = (lt - acc) / sg[3];
      p = sg[0] === "p" ? along(sg[1], f) : sg[0] === "h" ? sg[1] : lerp(sg[1], sg[2], f);
      if (si === 2) inJ++;
      if (it.o && si >= 4) inO++;
      col = it.o ? (si >= 4 ? OR : G) : si >= 3 ? PK : G;
    }
    if (lt >= 140) read = it;
    return <rect key={i} x={p[0] - 8} y={p[1] - 8} width={16} height={16} fill={col} />;
  });
  const allDone = t >= END_MS;
  const gread = !read || allDone ? "" : `Jev confidence ${read.conf.toFixed(2)}: ${read.o ? "under 95%, ask Opus" : "95% or more, keep"}`;

  const grid = (o: Pt) =>
    Array.from({ length: N }, (_, k) => (
      <rect key={k} x={o[0] + (k % 5) * 26} y={o[1] + Math.floor(k / 5) * 26} width={22} height={22} fill="none" stroke="#C4C4C4" />
    ));

  return (
    <svg viewBox="0 0 820 340" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: C.paper, fontFamily: "var(--font-sans)" }}>
      <defs>
        <marker id="ortho-flow-arrow" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={7} markerHeight={7} orient="auto">
          <path d="M0 1L9 5L0 9z" fill={C.ink} />
        </marker>
      </defs>
      {ARROWS.map((arrow, k) => (
        <path key={k} d={d(arrow, k === 1)} fill="none" stroke={C.ink} strokeWidth={1.5} strokeLinecap="round" markerEnd="url(#ortho-flow-arrow)" />
      ))}

      <text x={87} y={98} textAnchor="middle" fontSize={16} fill={C.text}>Questions</text>
      {grid(Q)}
      <text x={731} y={98} textAnchor="middle" fontSize={16} fill={C.text}>Answered</text>
      {grid(A)}
      <text x={668} y={246} fontSize={17} fill={C.text}>
        <tspan fontWeight={500} fill="#A5146F">{ak}</tspan> by Jev
      </text>
      <text x={668} y={272} fontSize={17} fill={C.text}>
        <tspan fontWeight={500} fill="#A64B2A">{ao}</tspan> by Claude Opus
      </text>

      <text x={375} y={46} textAnchor="middle" fontSize={15} fill={C.text}>0.21 s per question</text>
      <rect x={290} y={64} width={170} height={52} rx={26} fill="#FADFF3" stroke={PK} strokeWidth={inJ > 0 && !allDone ? 4.5 : 2.5} />
      <image href="/logos/jev.png" x={330} y={77} width={26} height={26} />
      <text x={366} y={96} fontSize={18} fontWeight={500} fill={C.ink}>Jev</text>
      <rect x={265} y={226} width={220} height={52} rx={26} fill="#F8E7E1" stroke={OR} strokeWidth={inO > 0 && !allDone ? 4.5 : 2.5} />
      <image href="/logos/claude.svg" x={298} y={239} width={26} height={26} />
      <text x={334} y={258} fontSize={18} fontWeight={500} fill={C.ink}>Claude Opus</text>
      <text x={375} y={302} textAnchor="middle" fontSize={15} fill={C.text}>3.88 s per question</text>
      <text x={388} y={176} fontSize={14} fill={C.text}>under 95% sure</text>
      <text x={478} y={74} fontSize={14} fill={C.text}>95% or more: keep Jev&apos;s answer</text>
      <text x={375} y={22} textAnchor="middle" fontSize={16} fontWeight={500} fill={read?.o ? "#A64B2A" : "#A5146F"}>
        {gread}
      </text>
      {dots}
    </svg>
  );
}
