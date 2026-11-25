import { defineItem } from "@/lib/content/types";
import writeup from "./writeup";

export default defineItem({
  slug: "grove",
  type: "applied",
  claim: "Ask anything, with nothing leaving your device.",
  summary: "A free assistant that runs a 0.5B-parameter language model in the browser, so it is private and keeps working with no internet after the first load.",
  href: "https://grove.layeredlabs.ai",
  app: {
    name: "Grove",
    icon: "/logos/grove.svg",
    url: "https://grove.layeredlabs.ai",
    colors: { accent: "#0B6B43", soft: "#E4F2E8", ink: "#0B0B0D" },
  },
  writeup,
});
