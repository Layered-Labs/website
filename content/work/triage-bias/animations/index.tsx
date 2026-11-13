"use client";

import { Grid, Matrix, TileRows, fig } from "@/components/writeup/anim/figures";
import { defineAnimations } from "@/components/writeup/animation-player";
import Shift, { SHIFT_SECONDS } from "./shift";
import Vignette, { VIGNETTE_SECONDS } from "./vignette";

export default defineAnimations("paper", {
  introduction: { component: Vignette, seconds: VIGNETTE_SECONDS, wide: true, caption: "Illustration. The same patient twice: the only difference is one sentence about education. The triage zone should be the same, but can change." },
  methods: fig(Matrix, { rows: ["No education", "Less than HS", "Some HS", "Some college"], cols: 87, colLabel: "87 vignettes, each asked four ways to both models" }, "Every vignette is asked in all four conditions; only the education sentence differs.", { wide: true }),
  results: fig(TileRows, { rows: [{ label: "Qwen-2.5-72B", note: "Less than high school", total: 87, marked: 5 }, { label: "Qwen-2.5-72B", note: "Some high school", total: 87, marked: 6 }, { label: "Qwen-2.5-72B", note: "Some college", total: 87, marked: 9 }, { label: "GPT-4o-mini", note: "Less than high school", total: 87, marked: 4 }, { label: "GPT-4o-mini", note: "Some high school", total: 87, marked: 4 }, { label: "GPT-4o-mini", note: "Some college", total: 87, marked: 5 }] }, "Each tile is one of the 87 patients; lime tiles got a different triage zone than with no education given.", { wide: true }),
  discussion: { component: Shift, seconds: SHIFT_SECONDS, wide: true, caption: "Mean severity shift against the control. One model leans toward less urgent care, the other toward more." },
  limitations: fig(Grid, { total: 87, marked: 9, cols: 29, label: "of 87 patients changed zone under one cue", seed: 13 }, "With 87 vignettes, a handful of flips decides significance: here, 9 flips for Qwen-2.5-72B under the some-college cue."),
  availability: fig(Matrix, { rows: ["Green", "Yellow", "Red", "Black"], cols: 87, colLabel: "The TRIAGE benchmark: 87 vignettes, four zones" }, "Every vignette comes from the public TRIAGE benchmark."),
});
