// Server-only helper: pulls a curated slice of the Layered-Labs
// nyc-clinic-ai-infrastructure dataset from the Hugging Face datasets-server
// API and shapes it into a lean, human-readable row type.
//
// Used in app/data/page.tsx. Runs at build/prerender time, so the page is a
// fast static snapshot rather than a runtime call out to HF.

export type ClinicRow = {
  zipcode: string
  borough: string
  neighborhood: string
  county: string
  noInternetPct: number | null
  fixedBroadbandPct: number | null
  fiberAvailable: boolean | null
  maxDlMbps: number | null
  reliabilityTier: string
  monthlyCostUsd: number | null
}

const DATASET = "Layered-Labs%2Fnyc-clinic-ai-infrastructure"
const HF_API = `https://datasets-server.huggingface.co/first-rows?dataset=${DATASET}&config=default&split=train`

function fmtNum(v: number | null | undefined): number | null {
  return v == null || Number.isNaN(v) ? null : v
}

async function fetchHfRows(): Promise<Record<string, unknown>[]> {
  const res = await fetch(HF_API, {
    // Respect HF's dataset cache TTL but ensure we don't hang a build.
    next: { revalidate: 3600 },
  })
  if (!res.ok) {
    throw new Error(`datasets-server ${res.status}`)
  }
  const body = (await res.json()) as { rows?: { row: Record<string, unknown> }[] }
  if (!body.rows) return []
  return body.rows.map((r) => r.row)
}

export async function getClinicRows(): Promise<ClinicRow[]> {
  let rows: Record<string, unknown>[] = []
  try {
    rows = await fetchHfRows()
  } catch (err) {
    // If the live fetch fails (network, HF down), we still prerender the
    // section shell so the page never breaks — just with no rows.
    console.error("[data] fetch failed, rendering empty table:", err)
    return []
  }

  return rows.map((r) => ({
    zipcode: String(r.zipcode ?? ""),
    borough: String(r.borough ?? ""),
    neighborhood: String(r.neighborhood ?? ""),
    county: String(r.county ?? ""),
    noInternetPct: fmtNum(Number(r.census_no_internet_pct)),
    fixedBroadbandPct: fmtNum(Number(r.census_fixed_broadband_pct)),
    fiberAvailable: r.fcc_fiber_available == null ? null : Boolean(r.fcc_fiber_available),
    maxDlMbps: fmtNum(Number(r.fcc_max_dl_mbps_practical)),
    reliabilityTier: String(r.reliability_tier ?? ""),
    monthlyCostUsd: fmtNum(Number(r.monthly_cost_mac_mini_m4_usd)),
  }))
}