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
  if (v == null || v === "") return "-"
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
  const tone = good ? "green" : poor ? "orange" : ""
  return <span className={cn("tag", tone)} style={tone ? undefined : { background: "var(--paper-2)", color: "var(--ink-2)" }}>{text}</span>
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
    <div className="dt-wrap">
      <div className="dt-scroll">
        <table className="dt">
          <thead>
            <tr>
              {COLUMNS.map((col) => (
                <th key={col.key} onClick={() => toggleSort(col.key)} className={col.align === "right" ? "r" : ""}>
                  {col.label}{" "}
                  <span style={{ color: sortKey === col.key ? "var(--ink)" : "var(--ink-3)", fontSize: "0.7em" }}>
                    {sortKey === col.key ? (sortDir === "asc" ? "▲" : "▼") : "↕"}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((r, i) => (
              <tr key={`${r.zipcode}-${i}`}>
                <td>{r.zipcode}</td>
                <td>{r.borough}</td>
                <td>{r.neighborhood || "-"}</td>
                <td className="r">{formatCell(r, "noInternetPct")}</td>
                <td>{formatCell(r, "fiberAvailable")}</td>
                <td className="r">{formatCell(r, "maxDlMbps")}</td>
                <td className="r">{formatCell(r, "monthlyCostUsd")}</td>
                <td>{r.reliabilityTier ? <Pill text={r.reliabilityTier} /> : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="small muted" style={{ padding: "0.7rem 1rem" }}>
        {rows.length} ZIP codes · {rows.filter((r) => r.fiberAvailable).length} with fiber · click a column to sort
      </div>
    </div>
  )
}
