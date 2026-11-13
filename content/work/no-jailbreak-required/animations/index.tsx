"use client";

import { Grid, TileRows, fig } from "@/components/writeup/anim/figures";
import { defineAnimations } from "@/components/writeup/animation-player";
import Models, { MODELS_SECONDS } from "./models";
import Gap, { GAP_SECONDS } from "./gap";
import Method, { METHOD_SECONDS, METHOD_SIZE } from "./method";

export default defineAnimations("paper", {
  introduction: {
    component: Gap,
    seconds: GAP_SECONDS,
    wide: true,
    caption: "Illustration. When six models refuse a request and one complies, the request is still answered.",
  },
  methods: { component: Method, seconds: METHOD_SECONDS, ...METHOD_SIZE, wide: true, caption: "Each request goes to all seven models with no system prompt; a judge scores every reply. A request that some models answer and others refuse is in the gap. Which models comply here is illustrative." },
  results: fig(Grid, { total: 100, marked: 8, cols: 20, label: "of 100 requests answered by at least one model", seed: 3 }, "8% of requests were answered by some model while others refused."),
  discussion: fig(TileRows, { rows: [{ label: "Most permissive model", note: "Alone", total: 100, marked: 3 }, { label: "Any of the seven", note: "Together", total: 100, marked: 8 }] }, "Each tile is one of the 100 harmful requests; lime tiles were answered. Together, the models answer more than any one does.", { wide: true }),
  limitations: fig(TileRows, { rows: [{ label: "All requests", total: 100, marked: 8 }, { label: "Without the borderline one", total: 100, marked: 7 }] }, "One request in the gap was borderline; without it, the gap is 7 of 100.", { wide: true }),
  availability: { component: Models, seconds: MODELS_SECONDS, wide: true, caption: "The seven models audited." },
});
