"use client"

import { useMemo, useState } from "react"

import { cn } from "@/lib/utils"
import type { ClinicRow } from "@/lib/nyc-clinic"

type ColumnKey = keyof ClinicRow
type SortDir = "asc" | "desc"

const COLUMNS: {
  key: ColumnKey
  label: string
  numeric?: boolean
  align?: "right"
}[] = [
  { key: "zipcode", label: "ZIP" },
  { key: "borough", label: "Borough" },
  { key: "neighborhood", label: "Neighborhood" },
  { key: "noInternetPct", label: "No internet", numeric: true, align: "right" },
  { key: "fiberAvailable", label: "Fiber" },
  { key: "maxDlMbps", label: "Max DL Mbps", numeric: true, align: "right" },
  { key: "monthlyCostUsd", label: "$/mo·M4", numeric: true, align: "right" },
  { key: "reliabilityTier", label: "Reliability" },
]

function valAsNum(r: ClinicRow, key: ColumnKey): number {
  const v = r[key]
  return typeof v === "number" ? v : -1
}

function valStr(r: ClinicRow, key: ColumnKey): string {
  const v = r[key]
  if (v == null) return ""
  if (typeof v === "boolean") return v ? "Yes" : "No"
  return String(v)
}

function formatCell(r: ClinicRow, key: ColumnKey): string {
  const v = r[key]
  if (v == null || v === "") return "—"
  if (typeof v === "boolean") return v ? "Yes" : "No"
  if (typeof v === "number") {
    const col = COLUMNS.find((c) => c.key === key)!
    if (col.label === "No internet") return `${v.toFixed(1)}%`
    if (col.label === "$/mo·M4") return `$${v.toFixed(2)}`
    return Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(v)
  }
  return v
}

function Pill({ text }: { text: string }) {
  const good = ["excellent", "good"].includes(text.toLowerCase())
  const poor = ["poor"].includes(text.toLowerCase())
  return (
    <span
      className={cn(
        "inline-block rounded-full border px-2 py-[1px] text-[10px] tracking-wider uppercase",
        good && "border-lime-400/40 bg-lime-500/10 text-lime-300",
        poor && "border-red-400/40 bg-red-500/10 text-red-300",
        !good && !poor && "border-white/15 bg-white/5 text-white/70"
      )}
    >
      {text}
    </span>
  )
}

export function DataTable({ rows }: { rows: ClinicRow[] }) {
  const [sortKey, setSortKey] = useState<ColumnKey>("zipcode")
  const [sortDir, setSortDir] = useState<SortDir>("asc")

  const sorted = useMemo(() => {
    const dir = sortDir === "asc" ? 1 : -1
    return [...rows].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      // Numeric sort for numeric columns, nulls always last.
      const isNumeric = typeof av === "number" || typeof bv === "number"
      if (isNumeric) {
        const an = valAsNum(a, sortKey)
        const bn = valAsNum(b, sortKey)
        const aNull = an < 0
        const bNull = bn < 0
        if (aNull && bNull) return 0
        if (aNull) return 1
        if (bNull) return -1
        return (an - bn) * dir
      }
      return valStr(a, sortKey).localeCompare(valStr(b, sortKey)) * dir
    })
  }, [rows, sortKey, sortDir])

  const toggleSort = (key: ColumnKey) => {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#050505]">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/[0.07] bg-white/[0.02]">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col.key)}
                  className={cn(
                    "cursor-pointer select-none whitespace-nowrap px-4 py-3 text-[11px] tracking-[0.15em] text-white uppercase",
                    col.align === "right" && "text-right"
                  )}
                  style={{ fontFamily: "var(--font-satoshi)", fontWeight: 500 }}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    <span
                      className={cn(
                        "text-[9px] text-white/40",
                        sortKey === col.key ? "text-lime-300" : ""
                      )}
                    >
                      {sortKey === col.key ? (sortDir === "asc" ? "▲" : "▼") : "↕"}
                    </span>
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((r, i) => (
              <tr
                key={`${r.zipcode}-${i}`}
                className={cn(
                  "border-b border-white/[0.04] transition-colors hover:bg-white/[0.03]",
                  i % 2 === 1 && "bg-white/[0.015]"
                )}
              >
                <td className="whitespace-nowrap px-4 py-3 tabular-nums text-white" style={{ fontFamily: "var(--font-satoshi)", fontWeight: 400 }}>
                  {r.zipcode}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-white/80">{r.borough}</td>
                <td className="px-4 py-3 text-white/80">{r.neighborhood || "—"}</td>
                <td className="px-4 py-3 text-right tabular-nums text-white/80">
                  {formatCell(r, "noInternetPct")}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-white/80">
                  {formatCell(r, "fiberAvailable")}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-white/80">
                  {formatCell(r, "maxDlMbps")}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-white">
                  {formatCell(r, "monthlyCostUsd")}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {r.reliabilityTier ? (
                    <Pill text={r.reliabilityTier} />
                  ) : (
                    <span className="text-white/40">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-white/[0.07] px-4 py-3 text-[11px] text-white/50">
        {rows.length} ZIP codes · {rows.filter((r) => r.fiberAvailable).length} with fiber · click a column to sort
      </div>
    </div>
  )
}