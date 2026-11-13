// The Layered Labs mark: three bars, widths 128, 160, 192 on a 192 grid.
// `lit` shows one bar at full strength and the other two at 20%, which is how
// work types are told apart (top: Applied, middle: Tools, bottom: Datasets).

const BAR_H = 52.3636;
const BARS = [
  { y: 0, w: 128 },
  { y: 69.8184, w: 160 },
  { y: 139.637, w: 192 },
];

type MarkProps = {
  className?: string;
  color?: string;
  lit?: 0 | 1 | 2;
  /** Accessible name. Without one the mark is decorative. */
  label?: string;
};

export function Mark({ className, color = "currentColor", lit, label }: MarkProps) {
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true };
  return (
    <svg className={className} viewBox="0 0 192 192" {...a11y}>
      {BARS.map((bar, i) => (
        <rect
          key={bar.y}
          y={bar.y}
          width={bar.w}
          height={BAR_H}
          fill={color}
          opacity={lit === undefined || lit === i ? undefined : 0.2}
        />
      ))}
    </svg>
  );
}
