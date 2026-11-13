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
logo: undefined,
  published: "2026-09",
  updated: "2026-11",
  highlights: [
    { value: "1,457", label: "facial photographs" },
    { value: "18,983", label: "lesion boxes", lime: true },
    { value: "5", label: "original cross-validation folds" },
  ],
  links: [{ label: "Dataset on Hugging Face", href: "https://huggingface.co/datasets/Layered-Labs/ACNE04" }],
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
