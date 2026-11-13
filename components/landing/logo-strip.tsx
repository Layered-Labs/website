import { LOGO_LABELS, Logo, type LogoName } from "./logos";

// Only models the lab has published results on.
const MODELS: LogoName[] = ["qwen", "openai", "gemini", "claude", "liquid"];
const COPIES = 3;

// Two identical halves scroll by -50% for a seamless loop. Only the first set
// of logos is announced; every repeat is hidden from screen readers.
export function LogoStrip() {
  return (
    <section className="mq" aria-labelledby="models-label">
      <h2 id="models-label" className="sr-only">
        Models we have tested and used
      </h2>
      <div className="mqt">
        {[0, 1].map((half) => (
          <div className="mg" key={half} aria-hidden={half === 1 || undefined}>
            {Array.from({ length: COPIES }, (_, copy) =>
              MODELS.map((name) => (
                <span className="mi" title={LOGO_LABELS[name]} key={`${copy}-${name}`}>
                  <Logo name={name} uid={`-${half}${copy}`} decorative={half === 1 || copy > 0} />
                </span>
              )),
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
