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
    // The stripes mark, one path per stripe.
    mark: {
      viewBox: "16 16 224 224",
      paths: [
        "M16.00 128.00A112 112 0 0 1 85.44 24.40L85.44 231.60A112 112 0 0 1 16.00 128.00Z",
        "M105.60 18.26A112 112 0 0 1 151.52 18.50L151.52 237.50A112 112 0 0 1 105.60 237.74Z",
        "M171.68 24.87A112 112 0 0 1 201.92 43.86L201.92 212.14A112 112 0 0 1 171.68 231.13Z",
        "M222.08 67.23A112 112 0 0 1 240.00 128.00L240.00 128.00A112 112 0 0 1 222.08 188.77Z",
      ],
    },
  },
  writeup,
});
