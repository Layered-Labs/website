"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface MeteorsProps {
  number?: number
  className?: string
}

export function Meteors({ number = 5, className }: MeteorsProps) {
  const [meteors, setMeteors] = useState<
    { id: number; left: string; top: string; delay: string; duration: string }[]
  >([])

  useEffect(() => {
    setMeteors(
      Array.from({ length: number }, (_, i) => ({
        id: i,
        left: `${Math.floor(Math.random() * 100)}%`,
        top: `${Math.floor(Math.random() * 40)}%`,
        delay: `${(Math.random() * 2).toFixed(2)}s`,
        duration: `${(Math.random() * 0.4 + 0.3).toFixed(2)}s`,
      }))
    )
  }, [number])

  return (
    <>
      {meteors.map((m) => (
        <span
          key={m.id}
          className={cn("meteor", className)}
          style={{
            position: "absolute",
            left: m.left,
            top: m.top,
            animationDelay: m.delay,
            animationDuration: m.duration,
          }}
        />
      ))}
    </>
  )
}
