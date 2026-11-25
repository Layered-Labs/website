import { defineWriteup } from "@/lib/content/types";
import Animation from "./animations";
import Summary from "./sections/summary.mdx";
import How from "./sections/how.mdx";
import Privacy from "./sections/privacy.mdx";
import Limitations from "./sections/limitations.mdx";

export default defineWriteup({
  format: "app",
  title: "Grove: an assistant that stays on your device",
  published: "2026-11",
  highlights: [
    { value: "0.5B", label: "parameter language model, running in your browser" },
    { value: "1", label: "download, then it works with no internet", lime: true },
    { value: "0", label: "accounts to make" },
  ],
  links: [
    { label: "Open Grove", href: "https://grove.layeredlabs.ai" },
    { label: "Qwen2.5 by Alibaba Cloud", href: "https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct" },
    { label: "WebLLM by MLC", href: "https://github.com/mlc-ai/web-llm" },
  ],
  sections: { summary: Summary, how: How, privacy: Privacy, limitations: Limitations },
  Animation,
});
