import { defineItem } from "@/lib/content/types";
import writeup from "./writeup";

export default defineItem({
  slug: "wellspring",
  type: "applied",
  claim: "Type it, hear it in your own voice, with nothing leaving the device.",
  summary: "A free app that clones a voice from ten seconds of audio and speaks anything typed with it, running a 100M-parameter voice model entirely in the browser.",
  href: "https://wellspring.layeredlabs.ai",
  app: {
    name: "Wellspring",
    icon: "/logos/wellspring.svg",
    url: "https://wellspring.layeredlabs.ai",
    colors: { accent: "#2340D6", soft: "#E9EDFD", ink: "#0B0B0D" },
  },
  writeup,
});
