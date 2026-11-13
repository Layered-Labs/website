import { defineItem } from "@/lib/content/types";
import writeup from "./writeup";

export default defineItem({
  slug: "benchbase",
  type: "tool",
  claim: "Five medical benchmarks, one format, one evaluation loop.",
  summary: "Five medical benchmarks, 200,784 questions, converted into one shared schema with stable IDs.",
  writeup,
});
