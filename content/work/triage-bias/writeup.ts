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
title: "When education shouldn't matter: education cues change AI triage",
  published: "2026-11",
  updated: "2026-11",
  highlights: [
    { value: "87", label: "patients, clinical details unchanged" },
    { value: "10.34%", label: "changed triage on one education cue", lime: true },
    { value: "0.644", label: "accuracy, the same throughout" },
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
