"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import { motion, useInView } from "motion/react"

import { cn } from "@/lib/utils"

interface LightRaysProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>
  count?: number
  color?: string
  blur?: number
  speed?: number
  length?: string
}

type LightRay = {
  id: string
  left: number
  rotate: number
  width: number
  swing: number
  delay: number
  duration: number
  intensity: number
}

const createRays = (count: number, cycle: number): LightRay[] => {
  if (count <= 0) return []

  return Array.from({ length: count }, (_, index) => {
    const left = 8 + Math.random() * 84
    const rotate = -28 + Math.random() * 56
    const width = 160 + Math.random() * 160
    const swing = 0.8 + Math.random() * 1.8
    const delay = Math.random() * cycle
    const duration = cycle * (0.75 + Math.random() * 0.5)
    const intensity = 0.6 + Math.random() * 0.5

    return {
      id: `${index}-${Math.round(left * 10)}`,
      left,
      rotate,
      width,
      swing,
      delay,
      duration,
      intensity,
    }
  })
}

const Ray = ({
  left,
  rotate,
  width,
  swing,
  delay,
  duration,
  intensity,
  active,
}: LightRay & { active: boolean }) => {
  // When the rays are off-screen (or reduced motion is on) we drop the
  // infinite rotation opacity animation and rest them at a static, faint
  // opacity. This stops 10 heavy blurred elements from animating forever
  // below the fold.
  return (
    <motion.div
      className="pointer-events-none absolute -top-[12%] left-[var(--ray-left)] h-[var(--light-rays-length)] w-[var(--ray-width)] origin-top -translate-x-1/2 rounded-full bg-linear-to-b from-[color-mix(in_srgb,var(--light-rays-color)_70%,transparent)] to-transparent opacity-0 mix-blend-screen blur-[var(--light-rays-blur)]"
      style={
        {
          "--ray-left": `${left}%`,
          "--ray-width": `${width}px`,
        } as CSSProperties
      }
      initial={{ rotate, opacity: active ? 0 : intensity * 0.4 }}
      animate={
        active
          ? {
              opacity: [0, intensity, 0],
              rotate: [rotate - swing, rotate + swing, rotate - swing],
            }
          : { rotate, opacity: intensity * 0.4 }
      }
      transition={
        active
          ? {
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay,
              repeatDelay: duration * 0.1,
            }
          : { duration: 0.3 }
      }
    />
  )
}

export function LightRays({
  className,
  style,
  count = 5,
  color = "rgba(160, 210, 255, 0.2)",
  blur = 24,
  speed = 14,
  length = "70vh",
  ref,
  ...props
}: LightRaysProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { margin: "200px", amount: 0 })
  const [rays, setRays] = useState<LightRay[]>([])
  const cycleDuration = Math.max(speed, 0.1)

  const [reducedMotion, setReducedMotion] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    setRays(createRays(count, cycleDuration))
  }, [count, cycleDuration])

  // Animate only when the section is on screen and the user has not asked for
  // reduced motion.
  const active = isInView && !reducedMotion

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 isolate overflow-hidden rounded-[inherit]",
        className
      )}
      style={
        {
          "--light-rays-color": color,
          "--light-rays-blur": `${blur}px`,
          "--light-rays-length": length,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={
            {
              background:
                "radial-gradient(circle at 20% 15%, color-mix(in srgb, var(--light-rays-color) 45%, transparent), transparent 70%)",
            } as CSSProperties
          }
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={
            {
              background:
                "radial-gradient(circle at 80% 10%, color-mix(in srgb, var(--light-rays-color) 35%, transparent), transparent 75%)",
            } as CSSProperties
          }
        />
        {rays.map((ray) => (
          <Ray key={ray.id} {...ray} active={active} />
        ))}
      </div>
    </div>
  )
}