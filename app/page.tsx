import { Particles } from "@/components/ui/particles";
import { BlurFade } from "@/components/ui/blur-fade";
import { LightRays } from "@/components/ui/light-rays";
import { TextAnimate } from "@/components/ui/text-animate";
import { MagicCard } from "@/components/ui/magic-card";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { Navbar } from "@/components/navbar";

const projects = [
  {
    name: "NYC Clinic AI Infrastructure",
    description:
      "A dataset and interactive map of AI deployment readiness across 637 NYC community health clinic records, spanning 21 languages. Published on HuggingFace.",
    href: "https://huggingface.co/datasets/Layered-Labs/nyc-clinic-ai-infrastructure",
    meta: "637 clinics · 21 languages",
  },
  {
    name: "NEISS Injury Dataset",
    description:
      "A cleaned and structured dataset derived from CPSC NEISS emergency room injury surveillance data, formatted for clinical AI research.",
    href: "https://huggingface.co/Layered-Labs",
    meta: "HuggingFace Dataset",
  },
  {
    name: "BenchBase",
    description:
      "An evaluation framework for assessing open-source language models on clinical tasks using standardized medical datasets.",
    href: "https://github.com/layered-labs",
    meta: "Open-source · Clinical NLP",
  },
];

export default function Home() {
  return (
    <div className="bg-black text-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black">

        {/* Rich central glow */}
        <div
          className="pointer-events-none absolute inset-0 z-[0]"
          style={{
            background: [
              "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(29, 78, 216, 0.55) 0%, transparent 70%)",
              "radial-gradient(ellipse 50% 40% at 30% 20%, rgba(99, 102, 241, 0.2) 0%, transparent 60%)",
              "radial-gradient(ellipse 40% 30% at 70% 10%, rgba(14, 165, 233, 0.15) 0%, transparent 55%)",
            ].join(", "),
          }}
        />

        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Light rays */}
        <LightRays className="z-[2]" color="rgba(120, 160, 255, 0.5)" count={10} speed={16} length="50vh" blur={40} />

        {/* Particles */}
        <Particles className="absolute inset-0 z-[3]" quantity={90} staticity={10} ease={30} size={0.35} color="#ffffff" />

        {/* Vignette bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-72 bg-gradient-to-t from-black to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center gap-8 px-4 text-center">

          {/* Wordmark */}
          <h1 className="flex items-baseline gap-[0.16em] text-7xl tracking-[-0.03em] md:text-8xl lg:text-9xl">
            <TextAnimate as="span" animation="slideUp" by="word" once delay={0.05} duration={0.4}
              className="text-white" style={{ fontFamily: "var(--font-satoshi)", fontWeight: 200 }}>
              Layered
            </TextAnimate>
            <TextAnimate as="span" animation="slideUp" by="word" once delay={0.2} duration={0.4}
              className="text-white" style={{ fontFamily: "var(--font-editors)", fontStyle: "italic", fontWeight: 400 }}>
              Labs
            </TextAnimate>
          </h1>

          {/* Subtitle */}
          <BlurFade delay={0.4} direction="up" duration={0.6}>
            <p className="text-lg leading-relaxed tracking-wide text-white"
              style={{ fontFamily: "var(--font-satoshi)", fontWeight: 300 }}>
              AI for better health outcomes,{" "}
              <span style={{ fontFamily: "var(--font-editors)", fontStyle: "italic" }}>everywhere.</span>
            </p>
          </BlurFade>

          {/* Social links */}
          <BlurFade delay={0.65} direction="up" duration={0.5}>
            <div className="flex items-center gap-5">
              <a href="https://huggingface.co/Layered-Labs" target="_blank" rel="noopener noreferrer" aria-label="HuggingFace"
                className="text-white transition-opacity duration-200 hover:opacity-70">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.025 1.13c-5.77 0-10.449 4.647-10.449 10.378 0 1.112.178 2.181.503 3.185.064-.222.203-.444.416-.577a.96.96 0 0 1 .524-.15c.293 0 .584.124.84.284.278.173.48.408.71.694.226.282.458.611.684.951v-.014c.017-.324.106-.622.264-.874s.403-.487.762-.543c.3-.047.596.06.787.203s.31.313.4.467c.15.257.212.468.233.542.01.026.653 1.552 1.657 2.54.616.605 1.01 1.223 1.082 1.912.055.537-.096 1.059-.38 1.572.637.121 1.294.187 1.967.187.657 0 1.298-.063 1.921-.178-.287-.517-.44-1.041-.384-1.581.07-.69.465-1.307 1.081-1.913 1.004-.987 1.647-2.513 1.657-2.539.021-.074.083-.285.233-.542.09-.154.208-.323.4-.467a1.08 1.08 0 0 1 .787-.203c.359.056.604.29.762.543s.247.55.265.874v.015c.225-.34.457-.67.683-.952.23-.286.432-.52.71-.694.257-.16.547-.284.84-.285a.97.97 0 0 1 .524.151c.228.143.373.388.43.625l.006.04a10.3 10.3 0 0 0 .534-3.273c0-5.731-4.678-10.378-10.449-10.378M8.327 6.583a1.5 1.5 0 0 1 .713.174 1.487 1.487 0 0 1 .617 2.013c-.183.343-.762-.214-1.102-.094-.38.134-.532.914-.917.71a1.487 1.487 0 0 1 .69-2.803m7.486 0a1.487 1.487 0 0 1 .689 2.803c-.385.204-.536-.576-.916-.71-.34-.12-.92.437-1.103.094a1.487 1.487 0 0 1 .617-2.013 1.5 1.5 0 0 1 .713-.174m-10.68 1.55a.96.96 0 1 1 0 1.921.96.96 0 0 1 0-1.92m13.838 0a.96.96 0 1 1 0 1.92.96.96 0 0 1 0-1.92M8.489 11.458c.588.01 1.965 1.157 3.572 1.164 1.607-.007 2.984-1.155 3.572-1.164.196-.003.305.12.305.454 0 .886-.424 2.328-1.563 3.202-.22-.756-1.396-1.366-1.63-1.32q-.011.001-.02.006l-.044.026-.01.008-.03.024q-.018.017-.035.036l-.032.04a1 1 0 0 0-.058.09l-.014.025q-.049.088-.11.19a1 1 0 0 1-.083.116 1.2 1.2 0 0 1-.173.18q-.035.029-.075.058a1.3 1.3 0 0 1-.251-.243 1 1 0 0 1-.076-.107c-.124-.193-.177-.363-.337-.444-.034-.016-.104-.008-.2.022q-.094.03-.216.087-.06.028-.125.063l-.13.074q-.067.04-.136.086a3 3 0 0 0-.135.096 3 3 0 0 0-.26.219 2 2 0 0 0-.12.121 2 2 0 0 0-.106.128l-.002.002a2 2 0 0 0-.09.132l-.001.001a1.2 1.2 0 0 0-.105.212q-.013.036-.024.073c-1.139-.875-1.563-2.317-1.563-3.203 0-.334.109-.457.305-.454m.836 10.354c.824-1.19.766-2.082-.365-3.194-1.13-1.112-1.789-2.738-1.789-2.738s-.246-.945-.806-.858-.97 1.499.202 2.362c1.173.864-.233 1.45-.685.64-.45-.812-1.683-2.896-2.322-3.295s-1.089-.175-.938.647 2.822 2.813 2.562 3.244-1.176-.506-1.176-.506-2.866-2.567-3.49-1.898.473 1.23 2.037 2.16c1.564.932 1.686 1.178 1.464 1.53s-3.675-2.511-4-1.297c-.323 1.214 3.524 1.567 3.287 2.405-.238.839-2.71-1.587-3.216-.642-.506.946 3.49 2.056 3.522 2.064 1.29.33 4.568 1.028 5.713-.624m5.349 0c-.824-1.19-.766-2.082.365-3.194 1.13-1.112 1.789-2.738 1.789-2.738s.246-.945.806-.858.97 1.499-.202 2.362c-1.173.864.233 1.45.685.64.451-.812 1.683-2.896 2.322-3.295s1.089-.175.938.647-2.822 2.813-2.562 3.244 1.176-.506 1.176-.506 2.866-2.567 3.49-1.898-.473 1.23-2.037 2.16c-1.564.932-1.686 1.178-1.464 1.53s3.675-2.511 4-1.297c.323 1.214-3.524 1.567-3.287 2.405.238.839 2.71-1.587 3.216-.642.506.946-3.49 2.056-3.522 2.064-1.29.33-4.568 1.028-5.713-.624" />
                </svg>
              </a>
              <span className="text-white" style={{ fontWeight: 200 }}>|</span>
              <a href="https://github.com/layered-labs" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                className="text-white transition-opacity duration-200 hover:opacity-70">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <span className="text-white" style={{ fontWeight: 200 }}>|</span>
              <a href="https://x.com/layered_labs_ai" target="_blank" rel="noopener noreferrer" aria-label="X"
                className="text-white transition-opacity duration-200 hover:opacity-70">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <span className="text-white" style={{ fontWeight: 200 }}>|</span>
              <a href="mailto:hello@layeredlabs.ai" aria-label="Email"
                className="text-white transition-opacity duration-200 hover:opacity-70">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>
          </BlurFade>
        </div>


      </section>

      {/* ── Thesis ── */}
      <section className="relative overflow-hidden border-t border-white/[0.06] py-32">
        <div className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-700/10 blur-[120px]" />

        <div className="relative mx-auto max-w-5xl px-6">
          <BlurFade inView delay={0.1} duration={0.7}>
            <h2 className="text-5xl text-white mb-10 md:text-6xl"
              style={{ fontFamily: "var(--font-satoshi)", fontWeight: 200 }}>
              Thesis
            </h2>
          </BlurFade>
          <BlurFade inView delay={0.2} duration={0.8}>
            <p className="text-xl leading-relaxed text-white max-w-2xl"
              style={{ fontFamily: "var(--font-satoshi)", fontWeight: 400 }}>
              AI is transforming healthcare — but cost, privacy, and infrastructure still lock most patients and clinics out entirely.
            </p>
          </BlurFade>
          <BlurFade inView delay={0.35} duration={0.7}>
            <p className="mt-6 text-xl leading-relaxed text-white max-w-2xl"
              style={{ fontFamily: "var(--font-satoshi)", fontWeight: 300 }}>
              Open-source models are advancing faster than anyone expected. Local, private, offline inference is already real, and the ceiling keeps rising.
            </p>
          </BlurFade>
          <BlurFade inView delay={0.5} duration={0.7}>
            <p className="mt-6 text-xl leading-relaxed text-white max-w-2xl"
              style={{ fontFamily: "var(--font-satoshi)", fontWeight: 300 }}>
              We are building the health layer on top of them, for patients and clinics everywhere.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* ── Work ── */}
      <section id="work" className="relative border-t border-white/[0.06] py-28">
        <div className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-indigo-700/10 blur-[130px]" />

        <div className="relative mx-auto max-w-5xl px-6">
          <BlurFade inView delay={0.05} duration={0.6}>
            <h2 className="text-5xl text-white mb-10 md:text-6xl"
              style={{ fontFamily: "var(--font-satoshi)", fontWeight: 200 }}>
              Work
            </h2>
          </BlurFade>

          <BentoGrid className="md:auto-rows-[200px]">
            <BlurFade inView delay={0.1} duration={0.6} className="md:col-span-2 md:row-span-2">
              <BentoCard className="h-full md:text-xl" name={projects[0].name} meta={projects[0].meta}
                description={projects[0].description} href={projects[0].href} />
            </BlurFade>
            <BlurFade inView delay={0.2} duration={0.6} className="md:col-span-1">
              <BentoCard className="h-full" name={projects[1].name} meta={projects[1].meta}
                description={projects[1].description} href={projects[1].href} />
            </BlurFade>
            <BlurFade inView delay={0.3} duration={0.6} className="md:col-span-1">
              <BentoCard className="h-full" name={projects[2].name} meta={projects[2].meta}
                description={projects[2].description} href={projects[2].href} />
            </BlurFade>
          </BentoGrid>
        </div>
      </section>

      {/* ── Research ── */}
      <section id="research" className="relative border-t border-white/[0.06] py-28">
        <div className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-blue-800/10 blur-[130px]" />

        <div className="relative mx-auto max-w-5xl px-6">
          <BlurFade inView delay={0.05} duration={0.6}>
            <h2 className="text-5xl text-white mb-10 md:text-6xl"
              style={{ fontFamily: "var(--font-satoshi)", fontWeight: 200 }}>
              Research
            </h2>
          </BlurFade>

          <div className="flex flex-col gap-3">
            {[
              {
                meta: "Structured Output · MedQA",
                title: "Does Structure Affect Accuracy? Pydantic vs. Unstructured Output on Clinical QA",
                description: "Testing whether enforcing structured (Pydantic) output changes model accuracy on MedQA benchmark questions across GPT-4o-mini, Gemini, and Claude.",
              },
              {
                meta: "Patient Education · NLP",
                title: "Simplifying Orthopedic Patient Education with Open-Source LLMs",
                description: "Evaluating open and closed-source models on rewriting OrthoInfo clinical content to an 8th-grade reading level, measured by BERTScore and Flesch-Kincaid grade.",
              },
            ].map((paper, i) => (
              <BlurFade key={i} inView delay={0.1 + i * 0.1} duration={0.6}>
                <div className="group flex items-start justify-between rounded-2xl border border-white/[0.07] bg-[#050505] p-7 transition-colors duration-300 hover:border-white/[0.2]">
                  <div className="flex flex-col gap-2 max-w-2xl">
                    <span className="text-[10px] tracking-[0.25em] text-white uppercase"
                      style={{ fontFamily: "var(--font-satoshi)", fontWeight: 200 }}>
                      {paper.meta}
                    </span>
                    <h3 className="text-base text-white"
                      style={{ fontFamily: "var(--font-satoshi)", fontWeight: 500 }}>
                      {paper.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white"
                      style={{ fontFamily: "var(--font-satoshi)", fontWeight: 300 }}>
                      {paper.description}
                    </p>
                  </div>
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none"
                    className="mt-1 ml-8 shrink-0 text-white transition-opacity group-hover:opacity-70">
                    <path d="M1 13L13 1M13 1H4M13 1v9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] py-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 text-center">
          <span className="text-xs tracking-[0.2em] text-white uppercase"
            style={{ fontFamily: "var(--font-satoshi)", fontWeight: 200 }}>
            Layered Labs · New York City
          </span>
          <a href="mailto:hello@layeredlabs.ai"
            className="text-xs text-white transition-opacity hover:opacity-70"
            style={{ fontFamily: "var(--font-satoshi)", fontWeight: 300 }}>
            hello@layeredlabs.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
