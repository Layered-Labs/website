import { defineWriteup } from "@/lib/content/types";
import Animation from "./animations";
import Summary from "./sections/summary.mdx";
import How from "./sections/how.mdx";
import Privacy from "./sections/privacy.mdx";
import Limitations from "./sections/limitations.mdx";

export default defineWriteup({
  format: "app",
  title: "Grove: can a browser run a small open model?",
  published: "2026-11",
  highlights: [
    { value: "0.5B", label: "parameter open model, running in your browser" },
    { value: "0", label: "installs: it runs from a link", lime: true },
    { value: "1", label: "download, then it works with no internet" },
  ],
  links: [
    { label: "Open Grove", href: "https://grove.layeredlabs.ai" },
    { label: "NYC Clinic AI Infrastructure", href: "https://huggingface.co/datasets/Layered-Labs/nyc-clinic-ai-infrastructure" },
    { label: "Qwen2.5 by Alibaba Cloud", href: "https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct" },
    { label: "WebLLM by MLC", href: "https://github.com/mlc-ai/web-llm" },
  ],
  sections: { summary: Summary, how: How, privacy: Privacy, limitations: Limitations },
  Animation,
});
