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
title: "Where New York clinics can run AI on site",
  published: "2026-02",
  updated: "2026-11",
  highlights: [
    { value: "311", label: "New York City ZIP codes" },
    { value: "33.6%", label: "of households with broadband, in the lowest ZIP", lime: true },
    { value: "$4.56", label: "a month to power a Mac mini" },
  ],
  links: [{ label: "Interactive map", href: "https://huggingface.co/spaces/Layered-Labs/nyc-clinic-ai-infra-map" }],
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
