import { Mark } from "./mark";

export function Mission() {
  return (
    <section id="contact" className="wrap mission">
      <Mark className="mission-mark" color="#0D0D0D" />
      <p className="mission-q">Medical AI should work for every patient, not just the ones it was tested on.</p>
      <p className="sp">
        We work with researchers who want to study with us, clinicians who see where AI falls short, engineers who
        want to build, and funders who back independent safety research.
      </p>
      <div className="mission-cta">
        <a href="mailto:hello@layeredlabs.ai" className="btn">
          Work with us
        </a>
        <a href="#work" className="btn2">
          See our work
        </a>
      </div>
    </section>
  );
}
