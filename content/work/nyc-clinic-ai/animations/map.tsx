import { C, tween, useTime } from "@/components/writeup/anim/kit";
import { BOROUGHS, ZIPS } from "./zips";

// Every NYC ZIP code as a dot at its real position, shaded by the share of
// households with fixed broadband: darker is more. The five lowest are lime.

const LON = [-74.27, -73.69];
const LAT = [40.49, 40.92];
const K = Math.cos((40.7 * Math.PI) / 180);
export const MAP_SIZE = { width: 700, height: Math.round((700 * (LAT[1] - LAT[0])) / ((LON[1] - LON[0]) * K)) };
const x = (lon: number) => ((lon - LON[0]) / (LON[1] - LON[0])) * MAP_SIZE.width;
const y = (lat: number) => ((LAT[1] - lat) / (LAT[1] - LAT[0])) * MAP_SIZE.height;
const LOWEST = new Set(
  [...ZIPS]
    .filter((z) => z[2] !== null)
    .sort((a, b) => (a[2] as number) - (b[2] as number))
    .slice(0, 5),
);

export const MAP_SECONDS = 3.2;

export default function NycMap() {
  const t = useTime();
  const legend = tween(t, 2.4, 0.5);
  return (
    <svg viewBox={`0 0 ${MAP_SIZE.width} ${MAP_SIZE.height}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: C.paper, fontFamily: "var(--font-sans)" }}>
      {ZIPS.map((z, i) => {
        // Sweep in from the west.
        const p = tween(t, 0.2 + ((z[0] - LON[0]) / (LON[1] - LON[0])) * 1.6, 0.4);
        const low = LOWEST.has(z);
        const shade = z[2] === null ? null : Math.max(0, Math.min(1, (z[2] - 30) / 70));
        return (
          <circle
            key={i}
            cx={x(z[0])}
            cy={y(z[1])}
            r={(low ? 9 : 6) * p}
            fill={low ? C.lime : shade === null ? C.paper : `rgba(13,13,13,${0.15 + 0.75 * shade})`}
            stroke={low || shade === null ? C.ink : "none"}
            strokeWidth={low ? 1.5 : 0.8}
            strokeOpacity={shade === null && !low ? 0.35 : 1}
          />
        );
      })}
      <g opacity={legend} transform="translate(24 44)">
        {[30, 55, 80, 100].map((v, i) => (
          <g key={v} transform={`translate(${i * 70} 0)`}>
            <circle cx="6" cy="6" r="6" fill={`rgba(13,13,13,${0.15 + 0.75 * ((v - 30) / 70)})`} />
            <text x="18" y="11" fontSize="14" fill={C.mid}>{v}%</text>
          </g>
        ))}
        <g transform="translate(0 28)">
          <circle cx="6" cy="6" r="7" fill={C.lime} stroke={C.ink} strokeWidth="1.5" />
          <text x="18" y="11" fontSize="14" fill={C.mid}>Five lowest</text>
          <circle cx="126" cy="6" r="6" fill={C.paper} stroke={C.ink} strokeOpacity="0.35" strokeWidth="0.8" />
          <text x="138" y="11" fontSize="14" fill={C.mid}>No household data</text>
        </g>
        <text x="0" y="-12" fontSize="14" fontWeight="500" fill={C.ink}>Households with fixed broadband</text>
      </g>
    </svg>
  );
}

/** The same map, filling in borough by borough, with each borough's ZIP count. */
export const BOROUGH_SECONDS = 0.3 + BOROUGHS.length * 0.6 + 0.8;
export function BoroughMap() {
  const t = useTime();
  return (
    <svg viewBox={`0 0 ${MAP_SIZE.width} ${MAP_SIZE.height}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: C.paper, fontFamily: "var(--font-sans)" }}>
      {ZIPS.map((z, i) => {
        const p = tween(t, 0.3 + z[3] * 0.6, 0.5);
        return <circle key={i} cx={x(z[0])} cy={y(z[1])} r={6} fill={p > 0 ? C.ink : C.track} opacity={0.15 + 0.85 * p} />;
      })}
      {BOROUGHS.map((b, k) => {
        const zs = ZIPS.filter((z) => z[3] === k);
        const cx = zs.reduce((a, z) => a + x(z[0]), 0) / zs.length;
        const cy = zs.reduce((a, z) => a + y(z[1]), 0) / zs.length;
        const p = tween(t, 0.5 + k * 0.6, 0.4);
        const dx = k === 0 ? -150 : k === 4 ? 0 : k === 3 ? 40 : 60;
        const dy = k === 0 ? -40 : k === 4 ? -70 : k === 3 ? -40 : 30;
        return (
          <g key={b} opacity={p}>
            <line x1={cx} y1={cy} x2={cx + dx * 0.8} y2={cy + dy * 0.8} stroke={C.ink} strokeWidth={1} />
            <rect x={cx + dx - 4} y={cy + dy - 22} width={b.length * 9 + 50} height={30} fill={C.paper} />
            <text x={cx + dx} y={cy + dy} fontSize={18} fontWeight={500} fill={C.ink}>
              {b} <tspan fontWeight={400} fill={C.mid}>{zs.length}</tspan>
            </text>
          </g>
        );
      })}
    </svg>
  );
}
