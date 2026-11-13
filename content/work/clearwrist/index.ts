import { defineItem } from "@/lib/content/types";
import writeup from "./writeup";

export default defineItem({
slug: "clearwrist",
  type: "dataset",
  claim: "Test pediatric fracture AI on children it has never seen.",
  summary: "20,327 X-rays from 6,091 children, rebuilt with patient-level splits, the original fracture labels and box annotations.",
  writeup,
});
