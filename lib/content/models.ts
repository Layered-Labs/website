import type { LogoName } from "@/components/landing/logos";

// Master list of AI models the lab works with. Every pill, table row and
// animation that names a model takes its logo and colour from here, so a
// model looks the same everywhere. Add a model here before using it.

export type ModelId = "jev" | "claude" | "openai" | "gemini" | "deepseek" | "liquid" | "qwen" | "grok" | "llama";

export type ModelInfo = {
  /** Family name; pills and rows can show a version instead via `label`. */
  name: string;
  maker: string;
  /** Brand colour: fills its pill and tints its table rows. */
  color: string;
  logo: { svg: LogoName } | { img: string };
};

// Colours and icons match the ortho write-up (fast-and-slow-ortho.vercel.app).
export const MODELS: Record<ModelId, ModelInfo> = {
  jev: { name: "Jev", maker: "TypeSafe", color: "#E551BA", logo: { img: "/logos/jev.png" } },
  claude: { name: "Claude", maker: "Anthropic", color: "#D97757", logo: { img: "/logos/claude.svg" } },
  openai: { name: "GPT", maker: "OpenAI", color: "#10A37F", logo: { img: "/logos/openai.svg" } },
  gemini: { name: "Gemini", maker: "Google", color: "#4285F4", logo: { img: "/logos/gemini.svg" } },
  deepseek: { name: "DeepSeek", maker: "DeepSeek", color: "#4D6BFE", logo: { img: "/logos/deepseek.svg" } },
  liquid: { name: "Liquid", maker: "Liquid AI", color: "#8A8F98", logo: { img: "/logos/liquid.svg" } },
  qwen: { name: "Qwen", maker: "Alibaba", color: "#615CED", logo: { svg: "qwen" } },
  grok: { name: "Grok", maker: "xAI", color: "#5A5A5A", logo: { img: "/logos/grok.svg" } },
  llama: { name: "Llama", maker: "Meta", color: "#0866FF", logo: { img: "/logos/llama.svg" } },
};
