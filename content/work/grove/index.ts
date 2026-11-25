import { defineItem } from "@/lib/content/types";
import writeup from "./writeup";

export default defineItem({
  slug: "grove",
  type: "applied",
  claim: "Can a web browser run a small open model, and what is it good for?",
  summary: "An experiment in running a small open-source language model on WebGPU, with nothing to install, to see how accessible local models can be and where they do well and fail.",
  href: "https://grove.layeredlabs.ai",
  app: {
    name: "Grove",
    icon: "/logos/grove.svg",
    url: "https://grove.layeredlabs.ai",
    colors: { accent: "#0B6B43", soft: "#E4F2E8", ink: "#0B0B0D" },
  },
  writeup,
});
