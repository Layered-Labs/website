import type { CSSProperties } from "react";
import { Logo } from "@/components/landing/logos";
import { MODELS, type ModelId } from "@/lib/content/models";

/** A model's logo in its brand colours. Also usable inside Remotion animations. */
export function ModelLogo({ model, size, className }: { model: ModelId; size?: number; className?: string }) {
  const { logo, name } = MODELS[model];
  const style = size ? { width: size, height: size } : undefined;
  const cls = className ? `mlogo ${className}` : "mlogo";
  if ("img" in logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className={cls} src={logo.img} alt="" aria-hidden="true" style={style} />;
  }
  return (
    <span className={cls} style={style} aria-hidden="true" title={name}>
      <Logo name={logo.svg} decorative />
    </span>
  );
}

/**
 * Inline model name with its logo on a rounded fill in the model's colour.
 * Pass two models for a pairing: `<ModelPill model={["jev", "claude"]} label={["Jev", "Claude Opus"]} />`
 * renders one pill with a gradient between their colours.
 */
export function ModelPill({
  model,
  label,
}: {
  model: ModelId | [ModelId, ModelId];
  label?: string | [string, string];
}) {
  if (Array.isArray(model)) {
    const [a, b] = model;
    const [la, lb] = Array.isArray(label) ? label : [MODELS[a].name, MODELS[b].name];
    const style = { "--c1": MODELS[a].color, "--c2": MODELS[b].color } as CSSProperties;
    return (
      <span className="mpill mpill-duo" style={style}>
        <ModelLogo model={a} className="mpill-logo" />
        {la}
        <span className="mpill-plus">+</span>
        <ModelLogo model={b} className="mpill-logo" />
        {lb}
      </span>
    );
  }
  const m = MODELS[model];
  return (
    <span className="mpill" style={{ "--c": m.color } as CSSProperties}>
      <ModelLogo model={model} className="mpill-logo" />
      {typeof label === "string" ? label : m.name}
    </span>
  );
}
