import { defineWriteup } from "@/lib/content/types";
import Animation from "./animations";
import Summary from "./sections/summary.mdx";
import Need from "./sections/need.mdx";
import Design from "./sections/design.mdx";
import Usage from "./sections/usage.mdx";
import Validation from "./sections/validation.mdx";
import Limitations from "./sections/limitations.mdx";
import Availability from "./sections/availability.mdx";

export default defineWriteup({
  format: "software",
  title: "BenchBase: one format and one scoring contract for medical benchmarks",
  logo: "/logos/benchbase.svg",
  published: "2026-02",
  updated: "2026-11",
  highlights: [
    { value: "5", label: "medical benchmarks" },
    { value: "200,784", label: "questions in one schema", lime: true },
    { value: "1", label: "command to score a model" },
  ],
  links: [{ label: "Code on GitHub", href: "https://github.com/Layered-Labs/benchbase-med" }],
  sections: {
    summary: Summary,
    need: Need,
    design: Design,
    usage: Usage,
    validation: Validation,
    limitations: Limitations,
    availability: Availability,
  },
  Animation,
});
