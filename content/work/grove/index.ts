import { defineItem } from "@/lib/content/types";
import writeup from "./writeup";

export default defineItem({
  slug: "grove",
  type: "applied",
  claim: "Can a web browser run a small open model, and what is it good for?",
  summary: "A free chat that runs a small open-source language model on WebGPU, with nothing to install, to see how accessible local models can be and where they do well and fail.",
  href: "https://grove.layeredlabs.ai",
  app: {
    name: "Grove",
    icon: "/logos/grove.svg",
    url: "https://grove.layeredlabs.ai",
    colors: { accent: "#0B6B43", soft: "#E4F2E8", ink: "#0B0B0D" },
    // The arches mark, one path per arch, outer arch first. The arches drop in from the top.
    mark: {
      viewBox: "12 8.5 232 232",
      drop: true,
      paths: [
        "M29 228V120A99 99 0 0 1 227 120V228H205V120A77 77 0 0 0 51 120V228Z",
        "M63 228V120A65 65 0 0 1 193 120V228H171V120A43 43 0 0 0 85 120V228Z",
        "M97 228V120A31 31 0 0 1 159 120V228H137V120A9 9 0 0 0 119 120V228Z",
      ],
    },
  },
  writeup,
});
