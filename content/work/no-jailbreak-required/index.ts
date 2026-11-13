import { defineItem } from "@/lib/content/types";
import writeup from "./writeup";

export default defineItem({
slug: "no-jailbreak-required",
  type: "applied",
  claim: "One model's refusal protects no one if another model complies.",
  summary: "Seven frontier models each refused almost every harmful request, yet 8% of requests were answered by at least one of them.",
  writeup,
});
