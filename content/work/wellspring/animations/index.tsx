"use client";

import { defineAnimations } from "@/components/writeup/animation-player";
import How, { HOW_SECONDS } from "./how";

export default defineAnimations("app", {
  how: {
    component: How,
    seconds: HOW_SECONDS,
    wide: true,
    caption: "Record about ten seconds once. Wellspring saves your voice on the device, then speaks each message you send in it.",
    description:
      "The Wellspring app in three steps: a person records a sentence while a live waveform moves, the voice is saved on the device, then they type a message, send it, and it is spoken aloud in their voice.",
  },
});
