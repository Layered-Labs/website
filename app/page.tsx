import { CountUp, RevealWords, StatLabel } from "@/components/reveal";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { WorkSections } from "@/components/work-sections";

export default function Home() {
  return (
    <>
      <SiteHeader current="/" />
      <main id="main">
        {/* Hero */}
        <section className="hero wrap">
          <p className="kicker fade" style={{ ["--d" as string]: "0ms" }}>Applied AI safety research for medicine</p>
          <h1 className="hero-title fade" style={{ ["--d" as string]: "120ms" }}>
            Applied AI for better health outcomes, <em>everywhere.</em>
          </h1>
          <p className="hero-copy fade" style={{ ["--d" as string]: "280ms" }}>
            We build AI for health and test how medical AI fails before patients depend on it: whether it treats
            people fairly, stays accurate, and runs privately in a clinic.
          </p>
          <div className="hero-actions fade" style={{ ["--d" as string]: "420ms" }}>
            <a className="pill-btn soft" href="mailto:hello@layeredlabs.ai">Join us</a>
            <a className="text-link" href="#work">See our work <span aria-hidden="true">›</span></a>
          </div>
        </section>

        <div className="wrap">
          <div className="banner fade" style={{ ["--d" as string]: "560ms" }} role="img" aria-label="" />
        </div>

        {/* Social proof */}
        <section className="wrap stat-block" aria-label="Highlights">
          <div className="stat-number num"><CountUp to={4800} suffix="+" /></div>
          <StatLabel />
        </section>

        {/* About */}
        <section id="about" className="wrap block">
          <h2 className="block-title">About us</h2>
          <RevealWords
            className="about-lede"
            text="We are an {purple|🤖 applied AI safety} lab in {blue|🗽 New York City}. We build AI for health, and we test how {red|🩺 medical AI} fails before patients depend on it."
          />
          <p className="about-body muted">
            AI is entering medicine, and its safety decides whether it helps or harms.
          </p>
        </section>

        {/* Work */}
        <section id="work" className="wrap block">
          <h2 className="block-title">Our work</h2>
          <WorkSections />
        </section>

        {/* CTA */}
        <section className="wrap cta">
          <h2>If you love how AI could be used safely for medicine, join us.</h2>
          <a className="pill-btn dark" href="mailto:hello@layeredlabs.ai">Join us</a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
