import { defineItem } from "@/lib/content/types";
import writeup from "./writeup";

export default defineItem({
  slug: "fast-slow-ortho",
  type: "applied",
  claim: "A fast model's own confidence can decide when to call a bigger one.",
  summary: "A fast model answered first and passed only the questions it was unsure about to Claude Opus, keeping accuracy while running 12× faster.",
  writeup,
});
