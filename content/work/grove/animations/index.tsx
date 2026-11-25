"use client";

import { defineAnimations } from "@/components/writeup/animation-player";
import How, { HOW_SECONDS } from "./how";

export default defineAnimations("app", {
  how: {
    component: How,
    seconds: HOW_SECONDS,
    wide: true,
    caption: "Grove gets ready once, on your device. After that you ask, and the model on the device answers, even with no internet.",
    description:
      "The Grove app in three steps: the welcome screen shows the model getting ready and then a check, the app is saved on the device so it works offline, then a person types a question, sends it, and the answer appears word by word with a note that the device is offline and Grove is still working.",
  },
});
