"use client";

import { defineAnimations } from "@/components/writeup/animation-player";
import Availability, { AVAILABILITY_SECONDS } from "./availability";
import Design, { DESIGN_SECONDS } from "./design";
import Limitations, { LIMITATIONS_SECONDS } from "./limitations";
import Need, { NEED_SECONDS } from "./need";
import Usage, { USAGE_SECONDS } from "./usage";
import Validation, { VALIDATION_SECONDS } from "./validation";

export default defineAnimations("software", {
  need: {
    component: Need,
    seconds: NEED_SECONDS,
    wide: true,
    caption: "Five benchmarks store the same three things in different places. BenchBase maps each into one schema.",
  },
  design: {
    component: Design,
    seconds: DESIGN_SECONDS,
    wide: true,
    caption: "Every question takes the same path. A row that fails the schema is rejected and never scored.",
  },
  usage: {
    component: Usage,
    seconds: USAGE_SECONDS,
    caption: "One command runs 100 questions from each of the five benchmarks and writes plain files.",
  },
  validation: {
    component: Validation,
    seconds: VALIDATION_SECONDS,
    wide: true,
    caption: "Source rows converted per benchmark. Grey is what was skipped or rejected.",
  },
  limitations: {
    component: Limitations,
    seconds: LIMITATIONS_SECONDS,
    caption: "In MMLU Medical, 99 of 1,242 questions share a hash with another question.",
  },
  availability: {
    component: Availability,
    seconds: AVAILABILITY_SECONDS,
    caption: "The five converted benchmarks on Hugging Face, with their question counts.",
  },
});
