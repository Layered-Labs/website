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
title: "NEISS Injury Data: twenty years of US emergency injuries in one file",
  published: "2026-03",
  updated: "2026-11",
  highlights: [
    { value: "7,326,429", label: "emergency department visits", lime: true },
    { value: "20", label: "years, 2005 to 2024" },
    { value: "1", label: "file instead of twenty" },
  ],
  links: [
    { label: "Dataset on Hugging Face", href: "https://huggingface.co/datasets/Layered-Labs/neiss-injury-data" },
    { label: "Code on GitHub", href: "https://github.com/Layered-Labs/neiss-injury-data" },
  ],
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
