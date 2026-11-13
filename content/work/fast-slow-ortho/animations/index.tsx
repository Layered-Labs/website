"use client";

import { defineAnimations } from "@/components/writeup/animation-player";
import Availability, { AVAILABILITY_SECONDS } from "./availability";
import Discussion, { DISCUSSION_SECONDS } from "./discussion";
import Introduction, { INTRODUCTION_SECONDS } from "./introduction";
import Limitations, { LIMITATIONS_SECONDS } from "./limitations";
import Methods, { METHODS_SECONDS, METHODS_SIZE } from "./methods";
import Results, { RESULTS_SECONDS } from "./results";

// Introduction, methods and results are the three figures from the ortho page
// (fast-and-slow-ortho.vercel.app). Captions sit under each figure; the
// animations hold only the visual and its labels.

export default defineAnimations("paper", {
  introduction: {
    component: Introduction,
    seconds: INTRODUCTION_SECONDS,
    wide: true,
    caption:
      "Both models answer in real time. Bar length is the share of 500 questions each got right.",
  },
  methods: {
    component: Methods,
    seconds: METHODS_SECONDS,
    ...METHODS_SIZE,
    wide: true,
    caption:
      "Jev answers first. Questions it is less than 95% sure about go on to Claude Opus.",
  },
  results: {
    component: Results,
    seconds: RESULTS_SECONDS,
    caption: "Jev's accuracy by how sure it was, across all 3,019 questions.",
  },
  discussion: {
    component: Discussion,
    seconds: DISCUSSION_SECONDS,
    wide: true,
    caption:
      "Jev first with Claude Opus as backup, against Claude Opus alone.",
  },
  limitations: {
    component: Limitations,
    seconds: LIMITATIONS_SECONDS,
    caption:
      "The reasoning models answered a random 500 of the 3,019 questions.",
  },
  availability: {
    component: Availability,
    seconds: AVAILABILITY_SECONDS,
    caption: "Every question and every model response is saved.",
  },
});
