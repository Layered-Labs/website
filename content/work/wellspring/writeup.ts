import { defineWriteup } from "@/lib/content/types";
import Animation from "./animations";
import Summary from "./sections/summary.mdx";
import How from "./sections/how.mdx";
import Privacy from "./sections/privacy.mdx";
import Limitations from "./sections/limitations.mdx";

export default defineWriteup({
  format: "app",
  title: "Wellspring: your own voice, made on your device",
  published: "2026-11",
  highlights: [
    { value: "10 s", label: "of audio to clone a voice" },
    { value: "100M", label: "parameter voice model, running in your browser", lime: true },
    { value: "160 MB", label: "downloaded once, then offline" },
  ],
  links: [
    { label: "Open Wellspring", href: "https://wellspring.layeredlabs.ai" },
    { label: "Pocket TTS by Kyutai", href: "https://huggingface.co/kyutai/pocket-tts" },
  ],
  sections: { summary: Summary, how: How, privacy: Privacy, limitations: Limitations },
  Animation,
});
