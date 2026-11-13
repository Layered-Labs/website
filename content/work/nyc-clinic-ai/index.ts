import { defineItem } from "@/lib/content/types";
import writeup from "./writeup";

export default defineItem({
slug: "nyc-clinic-ai",
  type: "dataset",
  claim: "Where in New York private medical AI cannot run yet.",
  summary: "Broadband, electricity and grid reliability joined for all 311 NYC ZIP codes, showing where private medical AI cannot run yet.",
  writeup,
});
