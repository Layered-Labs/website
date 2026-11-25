import { defineWriteup } from "@/lib/content/types";
import Animation from "./animations";
import Question from "./sections/question.mdx";
import Setup from "./sections/setup.mdx";
import Testing from "./sections/testing.mdx";
import Limits from "./sections/limits.mdx";

export default defineWriteup({
  format: "experiment",
  title: "Can a web browser run a small open model?",
  published: "2026-11",
  links: [
    { label: "Open Grove", href: "https://grove.layeredlabs.ai" },
    { label: "NYC Clinic AI Infrastructure", href: "https://huggingface.co/datasets/Layered-Labs/nyc-clinic-ai-infrastructure" },
    { label: "Qwen2.5 by Alibaba Cloud", href: "https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct" },
    { label: "WebLLM by MLC", href: "https://github.com/mlc-ai/web-llm" },
  ],
  sections: { question: Question, setup: Setup, testing: Testing, limits: Limits },
  Animation,
});
