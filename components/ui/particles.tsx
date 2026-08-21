"use client"

import React, {
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
} from "react"

import { cn } from "@/lib/utils"

interface ParticlesProps extends ComponentPropsWithoutRef<"div"> {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  size?: number
  refresh?: boolean
  color?: string
  vx?: number
  vy?: number
}

function hexToRgb(hex: string): number[] {
  hex = hex.replace("#", "")

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("")
  }

  const hexInt = parseInt(hex, 16)
  const red = (hexInt >> 16) & 255
  const green = (hexInt >> 8) & 255
  const blue = hexInt & 255
  return [red, green, blue]
}

type Circle = {
  x: number
  y: number
  translateX: number
  translateY: number
  size: number
  alpha: number
  targetAlpha: number
  dx: number
  dy: number
  magnetism: number
}

export const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 60,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const circles = useRef<Circle[]>([])
  // Mouse coordinates live in a ref mutated by a passive listener — no React
  // state, so moving the cursor never triggers a re-render.
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 })
  // Cap the device-pixel-ratio so a 3x/4x retina display doesn't render a
  // 5-million-pixel canvas for a background effect. Resolved in the effect so
  // it never runs during SSR.
  const dprRef = useRef(1)
  const rafID = useRef<number | null>(null)
  const resizeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const running = useRef(false)
  const prefersReducedMotion = useRef(false)

  const rgb = hexToRgb(color)

  const circleParams = (): Circle => {
    const x = Math.floor(Math.random() * canvasSize.current.w)
    const y = Math.floor(Math.random() * canvasSize.current.h)
    const translateX = 0
    const translateY = 0
    const pSize = Math.floor(Math.random() * 2) + size
    const alpha = 0
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1))
    const dx = (Math.random() - 0.5) * 0.1
    const dy = (Math.random() - 0.5) * 0.1
    const magnetism = 0.1 + Math.random() * 4
    return {
      x,
      y,
      translateX,
      translateY,
      size: pSize,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    }
  }

  const drawCircle = (circle: Circle, update = false) => {
    const ctx = context.current
    if (!ctx) return
    const { x, y, translateX, translateY, size: s, alpha } = circle
    ctx.translate(translateX, translateY)
    ctx.beginPath()
    ctx.arc(x, y, s, 0, 2 * Math.PI)
    ctx.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`
    ctx.fill()
    ctx.setTransform(dprRef.current, 0, 0, dprRef.current, 0, 0)

    if (!update) {
      circles.current.push(circle)
    }
  }

  const clearContext = () => {
    const ctx = context.current
    if (ctx) {
      ctx.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h)
    }
  }

  const resizeCanvas = () => {
    const container = canvasContainerRef.current
    const canvas = canvasRef.current
    const ctx = context.current
    if (!container || !canvas || !ctx) return

    const w = container.offsetWidth
    const h = container.offsetHeight
    if (w === 0 || h === 0) return

    canvasSize.current = { w, h }
    canvas.width = w * dprRef.current
    canvas.height = h * dprRef.current
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.setTransform(dprRef.current, 0, 0, dprRef.current, 0, 0)

    // Draw a single static frame immediately so the hero isn't blank even
    // before the first animation frame fires.
    clearContext()
    circles.current = []
    for (let i = 0; i < quantity; i++) {
      drawCircle(circleParams())
    }
  }

  const remapValue = (
    value: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number
  ): number => {
    const remapped =
      ((value - start1) * (end2 - start2)) / (end1 - start1) + start2
    return remapped > 0 ? remapped : 0
  }

  const drawParticles = () => {
    const ctx = context.current
    if (!ctx) return
    clearContext()
    circles.current.forEach((circle: Circle, i: number) => {
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.current.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.current.h - circle.y - circle.translateY - circle.size,
      ]
      const closestEdge = edge.reduce((a, b) => Math.min(a, b))
      const remapClosestEdge = parseFloat(
        remapValue(closestEdge, 0, 20, 0, 1).toFixed(2)
      )
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge
      }
      circle.x += circle.dx + vx
      circle.y += circle.dy + vy
      circle.translateX +=
        (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
        ease
      circle.translateY +=
        (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
        ease

      drawCircle(circle, true)

      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        circles.current.splice(i, 1)
        drawCircle(circleParams())
      }
    })
  }

  const animate = () => {
    // Loop only while the canvas is on screen, the tab is visible, and the
    // user hasn't requested reduced motion.
    if (!running.current) return
    drawParticles()
    rafID.current = window.requestAnimationFrame(animate)
  }

  const start = () => {
    if (running.current) return
    running.current = true
    rafID.current = window.requestAnimationFrame(animate)
  }

  const stop = () => {
    running.current = false
    if (rafID.current != null) {
      window.cancelAnimationFrame(rafID.current)
      rafID.current = null
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    context.current = canvas.getContext("2d")
    dprRef.current = Math.min(window.devicePixelRatio || 1, 2)
    const dpr = dprRef.current

    prefersReducedMotion.current =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Passive mousemove listener writes directly to a ref — no setState, no
    // React re-render on every cursor movement.
    const onMouseMove = (event: MouseEvent) => {
      const c = canvasRef.current
      if (!c) return
      const rect = c.getBoundingClientRect()
      const { w, h } = canvasSize.current
      const x = event.clientX - rect.left - w / 2
      const y = event.clientY - rect.top - h / 2
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2
      if (inside) {
        mouse.current.x = x
        mouse.current.y = y
      }
    }
    // Do not start the animation loop if the user prefers reduced motion —
    // just render the static particles.
    if (prefersReducedMotion.current) {
      resizeCanvas()
      return () => window.removeEventListener("mousemove", onMouseMove)
    }

    resizeCanvas()
    start()

    const handleResize = () => {
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current)
      resizeTimeout.current = setTimeout(() => resizeCanvas(), 200)
    }

    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener("visibilitychange", onVisibility)

    const onIO = (entries: IntersectionObserverEntry[]) => {
      if (entries[0]?.isIntersecting) start()
      else stop()
    }
    const io = new IntersectionObserver(onIO, { threshold: 0 })
    if (canvas) io.observe(canvas)

    window.addEventListener("mousemove", onMouseMove, { passive: true })
    window.addEventListener("resize", handleResize)

    return () => {
      stop()
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("visibilitychange", onVisibility)
      io.disconnect()
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh])

  return (
    <div
      className={cn("pointer-events-none", className)}
      ref={canvasContainerRef}
      aria-hidden="true"
      {...props}
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  )
}