"use client";

import { Logo } from "@/components/landing/logos";

import { Fields, Load, Steps, fig } from "@/components/writeup/anim/figures";
import { defineAnimations } from "@/components/writeup/animation-player";
import Machines, { MACHINES_SECONDS } from "./machines";
import NycMap, { BOROUGH_SECONDS, BoroughMap, MAP_SECONDS, MAP_SIZE } from "./map";

export default defineAnimations("datasheet", {
  motivation: { component: Machines, seconds: MACHINES_SECONDS, wide: true, caption: "Monthly electricity for three machines a clinic could run AI on, running all day at the city's commercial rate." },
  composition: { component: BoroughMap, seconds: BOROUGH_SECONDS, ...MAP_SIZE, caption: "All 311 ZIP codes at their real locations, borough by borough." },
  collection: fig(Steps, { steps: [{ title: "Census ACS 2022", note: "Household internet" , icon: "person" }, { title: "FCC map, June 2025", note: "Providers and speeds" , icon: "wifi" }, { title: "EIA 2023 and 2024", note: "Rates and reliability" , icon: "bolt" }, { title: "ZIP crosswalk", note: "Tracts to ZIP codes" , icon: "grid" }, { title: "One table", note: "311 rows" , icon: "table" }] }, "Three agencies, joined by ZIP code.", { wide: true }),
  cleaning: fig(Fields, { preview: "zip", fields: [{ name: "census_fixed_broadband_pct", type: "%", primary: true }, { name: "census_no_internet_pct", type: "%" }, { name: "fcc_isp_count", type: "int" }, { name: "fcc_max_dl_mbps_practical", type: "Mbps" }, { name: "fcc_fiber_available", type: "bool" }, { name: "commercial_rate_cents_kwh", type: "cents" }, { name: "monthly_cost_mac_mini_m4_usd", type: "USD" }, { name: "saidi_excl_major_events_min_yr", type: "min/yr" }] }, "Some of the columns of each row.", { wide: true }),
  uses: { component: NycMap, seconds: MAP_SECONDS, ...MAP_SIZE, caption: "Every ZIP code at its real location, shaded by the share of households with fixed broadband. The five lowest are lime." },
  distribution: fig(Load, { lead: <Logo name="huggingface" decorative />, repo: "Layered-Labs/nyc-clinic-ai-infra-map", terms: "CC BY 4.0", code: 'pd.read_csv("nyc_clinic_infrastructure.csv")' }, "The interactive map and the full table live in one repository.", { wide: true }),
  maintenance: fig(Steps, { steps: [{ title: "Census ACS", note: "2022" , icon: "person" }, { title: "EIA retail sales", note: "2023" , icon: "bolt" }, { title: "EIA Form 861", note: "2024" , icon: "bolt" }, { title: "FCC broadband map", note: "June 2025" , icon: "wifi" }] }, "The release of each source this version uses.", { wide: true }),
});
