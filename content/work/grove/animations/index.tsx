"use client";

import { defineAnimations } from "@/components/writeup/animation-player";
import Setup, { SETUP_SECONDS } from "./setup";

export default defineAnimations("experiment", {
  setup: {
    component: Setup,
    seconds: SETUP_SECONDS,
    wide: true,
    caption:
      "The model files cross the connection once. After that the connection is switched off and Grove still answers, because the model is running on the device.",
    description:
      "A diagram with the internet on the left and a device on the right. Model files travel to the device once, shown as a progress bar that turns into a check. The connection is then marked offline, and a question typed on the device is still answered, word by word, by the model running there.",
  },
});
