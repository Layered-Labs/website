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
title: "ClearWrist: children's wrist X-rays with patient-level splits",
  published: "2026-08",
  updated: "2026-11",
  highlights: [
    { value: "20,327", label: "wrist X-rays" },
    { value: "6,091", label: "children, each in one split", lime: true },
    { value: "9", label: "kinds of finding boxed" },
  ],
  links: [{ label: "Dataset on Hugging Face", href: "https://huggingface.co/datasets/Layered-Labs/clearwrist-pediatric-wrist-xray" }],
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
