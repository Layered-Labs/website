import { cn } from "@/lib/utils"

export function BentoGrid({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 gap-3 md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  )
}

export function BentoCard({
  className,
  name,
  meta,
  description,
  href,
  background,
}: {
  className?: string
  name: string
  meta?: string
  description: string
  href: string
  background?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.07] bg-[#050505]",
        "transform-gpu transition-all duration-300",
        className,
      )}
    >
      {/* Optional decorative background */}
      {background && (
        <div className="pointer-events-none absolute inset-0">{background}</div>
      )}

      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), #0d1a3a, transparent 100%)" }}
      />

      {/* Content */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 flex h-full flex-col justify-between p-7 gap-6"
      >
        {/* Top row */}
        <div className="flex items-start justify-between">
          {meta && (
            <span
              className="text-[10px] tracking-[0.25em] text-white uppercase"
              style={{ fontFamily: "var(--font-satoshi)", fontWeight: 200 }}
            >
              {meta}
            </span>
          )}
          <svg
            width="13"
            height="13"
            viewBox="0 0 14 14"
            fill="none"
            className="ml-auto shrink-0 text-white opacity-30 transition-opacity duration-200 group-hover:opacity-70"
          >
            <path
              d="M1 13L13 1M13 1H4M13 1v9"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Bottom: title + description */}
        <div className="flex flex-col gap-2">
          <h3
            className="text-white font-light"
            style={{ fontFamily: "var(--font-satoshi)" }}
          >
            {name}
          </h3>
          <p
            className="text-sm leading-relaxed text-white"
            style={{ fontFamily: "var(--font-satoshi)", fontWeight: 300 }}
          >
            {description}
          </p>
        </div>
      </a>
    </div>
  )
}
