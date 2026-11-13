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
title: "No Jailbreak Required: the safety gap between frontier models",
  published: "2026-11",
  updated: "2026-11",
  highlights: [
    { value: "1–3%", label: "of harmful requests answered by each model alone" },
    { value: "8%", label: "answered by at least one of seven", lime: true },
    { value: "0", label: "answered by all seven" },
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
