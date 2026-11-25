"use client";

import { defineAnimations } from "@/components/writeup/animation-player";
import { Steps, fig } from "@/components/writeup/anim/figures";

export default defineAnimations("app", {
  how: fig(
    Steps,
    {
      steps: [
        { title: "Download once", note: "The model files come from Hugging Face", icon: "globe" },
        { title: "Go offline", note: "No connection needed after that", icon: "wifi" },
        { title: "Ask on the device", note: "WebGPU runs the model here", icon: "model" },
        { title: "Read the answer", note: "Nothing is sent anywhere", icon: "chat" },
      ],
    },
    "The model files cross the connection once. After that Grove keeps answering with the connection off, because the model runs on the device.",
    {
      wide: true,
      description:
        "Four steps joined by arrows: download the model once, go offline, ask a question on the device where WebGPU runs the model, and read the answer, with nothing sent anywhere.",
    },
  ),
});
