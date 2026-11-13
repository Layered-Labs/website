import { C, Stage, tween, useTime } from "@/components/writeup/anim/kit";
import { ModelLogo } from "@/components/writeup/model";
import type { ModelId } from "@/lib/content/models";

// The seven models audited, as tiles.
const MODELS: { id: ModelId; label: string; maker: string }[] = [
  { id: "openai", label: "GPT-4o", maker: "OpenAI" },
  { id: "claude", label: "Claude 3.7 Sonnet", maker: "Anthropic" },
  { id: "gemini", label: "Gemini 2.5 Pro", maker: "Google" },
  { id: "grok", label: "Grok-3", maker: "xAI" },
  { id: "deepseek", label: "DeepSeek-V3", maker: "DeepSeek" },
  { id: "qwen", label: "Qwen3-235B", maker: "Alibaba" },
  { id: "llama", label: "Llama 3.3 70B", maker: "Meta" },
];
export const MODELS_SECONDS = 0.3 + MODELS.length * 0.15 + 0.8;

export default function Models() {
  const t = useTime();
  return (
    <Stage style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
      {MODELS.map((m, i) => {
        const p = tween(t, 0.3 + i * 0.15, 0.4);
        return (
          <div
            key={m.label}
            style={{
              display: "grid",
              justifyItems: "center",
              gap: 8,
              padding: "18px 10px 14px",
              background: "#F6F6F6",
              opacity: p,
              transform: `translateY(${(1 - p) * 8}px)`,
            }}
          >
            <ModelLogo model={m.id} size={36} />
            <span style={{ fontSize: 14, fontWeight: 500, textAlign: "center" }}>{m.label}</span>
            <span style={{ fontSize: 12, color: C.mid }}>{m.maker}</span>
          </div>
        );
      })}
    </Stage>
  );
}
