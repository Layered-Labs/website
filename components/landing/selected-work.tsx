import type { ReactNode } from "react";
import { getItem, itemHref } from "@/lib/content/registry";
import { Logo } from "./logos";

type Blob = [cx: number, cy: number, rx: number, ry: number, fill: string];

type Art = {
  base: string;
  /** Dark tone the bottom fades into, so the white text stays readable. */
  shade: string;
  seed: number;
  grainSeed: number;
  blobs: Blob[];
};

type Card = { slug: string; name: string; line: string; art: Art; logos: ReactNode };

const CARDS: Card[] = [
  {
    slug: "fast-slow-ortho",
    name: "Fast and slow ortho",
    line: "A fast model's own confidence decides when to call a bigger one, 12× faster.",
    art: {
      base: "#EBD8C8",
      shade: "#2A1712",
      seed: 7,
      grainSeed: 1,
      blobs: [
        [40, 60, 130, 110, "#E551BA"],
        [250, 90, 110, 130, "#D97757"],
        [150, 230, 170, 90, "#F2C3A4"],
        [60, 320, 120, 90, "#C9479F"],
        [270, 300, 90, 110, "#B6553A"],
      ],
    },
    logos: (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="vl vli" src="/logos/jev.png" alt="Jev" />
        <Logo name="claude" className="vl" fill="#FFFFFF" />
      </>
    ),
  },
  {
    slug: "clearwrist",
    name: "ClearWrist",
    line: "20,327 pediatric wrist X-rays, split by patient so test data stays unseen.",
    art: {
      base: "#FFEAA6",
      shade: "#3A2200",
      seed: 14,
      grainSeed: 2,
      blobs: [
        [60, 70, 140, 110, "#FFD21E"],
        [240, 140, 110, 120, "#FF9D0B"],
        [120, 250, 160, 90, "#FBF3DC"],
        [260, 330, 120, 80, "#E07A00"],
        [30, 330, 90, 90, "#FFC23D"],
      ],
    },
    logos: <Logo name="huggingface" className="vl" fill="#FFFFFF" />,
  },
  {
    slug: "triage-bias",
    name: "Triage bias",
    line: "Accepted at ICLR AIMS. Education level should never change triage.",
    art: {
      base: "#DCD9FF",
      shade: "#14123A",
      seed: 21,
      grainSeed: 3,
      blobs: [
        [60, 80, 130, 120, "#615CED"],
        [250, 60, 100, 110, "#A9A5FF"],
        [170, 220, 160, 100, "#EEEDFF"],
        [50, 320, 120, 90, "#2E2A8F"],
        [260, 320, 100, 100, "#7C77F2"],
      ],
    },
    logos: (
      <>
        <Logo name="qwen" className="vl" fill="#FFFFFF" />
        <Logo name="openai" className="vl" fill="#FFFFFF" />
      </>
    ),
  },
];

// Soft painted background: blurred, displaced ellipses with film grain and a
// dark fade at the bottom.
function PaintedArt({ id, art }: { id: string; art: Art }) {
  const paint = `paint-${id}`;
  const grain = `grain-${id}`;
  const shade = `shade-${id}`;
  return (
    <svg className="va" viewBox="0 0 300 375" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <filter id={paint} x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves={3} seed={art.seed} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={70} xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur in="d" stdDeviation={16} />
        </filter>
        <filter id={grain}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={art.grainSeed} />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.22 0" />
        </filter>
        <linearGradient id={shade} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.55" stopColor={art.shade} stopOpacity={0} />
          <stop offset="1" stopColor={art.shade} stopOpacity={0.75} />
        </linearGradient>
      </defs>
      <rect width="300" height="375" fill={art.base} />
      <g filter={`url(#${paint})`}>
        {art.blobs.map(([cx, cy, rx, ry, fill]) => (
          <ellipse key={`${cx}-${cy}`} cx={cx} cy={cy} rx={rx} ry={ry} fill={fill} />
        ))}
      </g>
      <rect width="300" height="375" fill={`url(#${shade})`} />
      <rect width="300" height="375" filter={`url(#${grain})`} />
    </svg>
  );
}

export function SelectedWork() {
  return (
    <div className="sel">
      {CARDS.map((card) => {
        const item = getItem(card.slug);
        const href = item && itemHref(item);
        const inner = (
          <>
            <PaintedArt id={card.slug} art={card.art} />
            <span className="vmw">{card.logos}</span>
            <span className="vt">
              <span className="vn">{card.name}</span>
              <span className="vd">{card.line}</span>
            </span>
          </>
        );
        return href ? (
          <a className="vc" href={href} key={card.slug}>
            {inner}
          </a>
        ) : (
          <div className="vc" key={card.slug}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}
