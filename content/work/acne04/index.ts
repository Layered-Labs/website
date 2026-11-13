import { defineItem } from "@/lib/content/types";
import writeup from "./writeup";

export default defineItem({
slug: "acne04",
  type: "dataset",
  claim: "Grade acne severity and find lesions against one checked source.",
  summary: "All 1,457 photos rebuilt with their four-level severity grades and 18,983 lesion boxes in one dataset.",
  writeup,
});
