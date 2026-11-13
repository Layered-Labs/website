import { defineWriteup } from "@/lib/content/types";
import Animation from "./animations";
import Abstract from "./sections/abstract.mdx";
import Introduction from "./sections/introduction.mdx";
import Methods from "./sections/methods.mdx";
import Results from "./sections/results.mdx";
import Discussion from "./sections/discussion.mdx";
import Limitations from "./sections/limitations.mdx";
import Availability from "./sections/availability.mdx";

export default defineWriteup({
  format: "paper",
  published: "2026-11",
  updated: "2026-11",
  highlights: [
    { value: "98.5%", label: "right when Jev is 95% sure", lime: true },
    { value: "94.2%", label: "Jev first, same as Opus alone" },
    { value: "12×", label: "faster, and 1.7× cheaper" },
  ],
  links: [
    { label: "Request code and data", href: "mailto:hello@layeredlabs.ai?subject=Fast%20and%20slow%20in%20ortho" },
  ],
  sections: {
    abstract: Abstract,
    introduction: Introduction,
    methods: Methods,
    results: Results,
    discussion: Discussion,
    limitations: Limitations,
    availability: Availability,
  },
  Animation,
});
