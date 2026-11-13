import { defineWriteup } from "@/lib/content/types";
import Animation from "./animations";
import Summary from "./sections/summary.mdx";
import Motivation from "./sections/motivation.mdx";
import Composition from "./sections/composition.mdx";
import Collection from "./sections/collection.mdx";
import Cleaning from "./sections/cleaning.mdx";
import Uses from "./sections/uses.mdx";
import Distribution from "./sections/distribution.mdx";
import Maintenance from "./sections/maintenance.mdx";

export default defineWriteup({
  format: "datasheet",
title: "Claude Fable Derm: one skin question, six emotions",
  published: "2026-09",
  updated: "2026-11",
  highlights: [
    { value: "49", label: "dermatology topics" },
    { value: "6", label: "emotional framings of each", lime: true },
    { value: "294", label: "patient questions" },
  ],
  links: [{ label: "Dataset on Hugging Face", href: "https://huggingface.co/datasets/Layered-Labs/claude-fable-derm" }],
  sections: {
    summary: Summary,
    motivation: Motivation,
    composition: Composition,
    collection: Collection,
    cleaning: Cleaning,
    uses: Uses,
    distribution: Distribution,
    maintenance: Maintenance,
  },
  Animation,
});
