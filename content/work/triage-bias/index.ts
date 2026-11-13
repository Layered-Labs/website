import { defineItem } from "@/lib/content/types";
import writeup from "./writeup";

export default defineItem({
slug: "triage-bias",
  type: "applied",
  claim: "A patient's education level should never change their triage.",
  summary: "We held 87 emergency vignettes constant, changed only the patient's education, and measured whether two models changed their triage.",
  writeup,
});
