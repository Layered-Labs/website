"use client";

import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";
import { BlurFade } from "@/components/ui/blur-fade";
import { MobileNav } from "@/components/ui/mobile-nav";
import { ArrowRight, ArrowUpRight, Github, Mail } from "lucide-react";
import type { ResearchPost } from "@/lib/research";

const tagColors: Record<string, string> = {
  Paper: "bg-emerald-50 text-emerald-700",
  Dataset: "bg-sky-50 text-sky-700",
  Preprint: "bg-amber-50 text-amber-700",
  "Blog Post": "bg-zinc-100 text-zinc-600",
};

const defaultTagColor = "bg-zinc-100 text-zinc-600";

const projects = [
  {
    name: "Health Companion",
    description:
      "A local-first app that tracks medications, symptoms, and health events over time. Patients arrive at every visit with a structured summary. Clinicians gain longitudinal context they have never had access to before.",
    status: "In Development",
  },
  {
    name: "NYC Clinic AI Infrastructure",
    description:
      "Published dataset and interactive map evaluating broadband and electricity infrastructure across all 311 NYC ZIP codes, identifying where on-premise clinical AI can be deployed today.",
    status: "Live",
  },
  {
    name: "Longitudinal Summarization",
    description:
      "Research into how open-source models reason over structured patient state: measuring hallucination rates, temporal consistency, and summarization quality across extended time horizons.",
    status: "Research",
  },
];

export function HomePage({ posts }: { posts: ResearchPost[] }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-black/8">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-14">
            <a href="#" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-black">
              <Image src="/logo.png" alt="Layered Labs" width={16} height={16} />
              Layered Labs
            </a>
            <div className="hidden md:flex items-center gap-8 text-sm text-black/50">
              <a href="#mission" className="hover:text-black transition-colors">Mission</a>
              <a href="#projects" className="hover:text-black transition-colors">Projects</a>
              <a href="#research" className="hover:text-black transition-colors">Research</a>
              <a href="#contact" className="hover:text-black transition-colors">Contact</a>
            </div>
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-1.5 text-sm text-black/60 hover:text-black transition-colors"
            >
              Get in Touch
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <MobileNav />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-36 pb-24">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <BlurFade delay={0.1} inView>
            <p className="text-sm text-black/35 mb-7 font-mono tracking-wide">New York City</p>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] mb-8 text-black">
              Towards health AI
              <br />
              <span className="text-black">that knows patients over time.</span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <p className="text-lg text-black/55 leading-relaxed mb-10 max-w-lg">
              An applied clinical AI lab studying how open-source models reason
              over longitudinal patient state, built for community health clinics.
            </p>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <div className="flex items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-black text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-black/85 transition-colors"
              >
                Our Work
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/layered-labs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-black/55 border border-black/15 px-5 py-2.5 rounded-lg hover:text-black hover:border-black/30 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="py-24 border-t border-black/8">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="text-xs font-mono text-black/35 uppercase tracking-widest mb-10">
              Mission
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <FadeIn delay={0.1}>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight leading-snug text-black">
                Longitudinal patient state is an open research problem.
              </h2>
            </FadeIn>

            <div className="space-y-5">
              <FadeIn delay={0.2}>
                <p className="text-base text-black/60 leading-relaxed">
                  EHRs store records. RAG retrieves documents. Neither maintains
                  a structured, continuously updated model of who a patient is
                  across time. That is what we are working on.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="text-base text-black/60 leading-relaxed">
                  The health companion is our research surface: a real deployment
                  context in community health settings where we study how
                  open-source models reason over longitudinal state, where they
                  hallucinate, and how accuracy degrades across extended time
                  horizons.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 border-t border-black/8">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="text-xs font-mono text-black/35 uppercase tracking-widest mb-10">
              Projects
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-5">
            {projects.map((project, index) => (
              <FadeIn key={project.name} delay={0.1 + index * 0.08}>
                <div className="rounded-xl border border-black/10 p-6 h-full">
                  <span
                    className={`inline-block text-xs font-medium px-2.5 py-1 rounded-md mb-4 ${
                      project.status === "Live"
                        ? "bg-emerald-50 text-emerald-700"
                        : project.status === "In Development"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-zinc-100 text-zinc-500"
                    }`}
                  >
                    {project.status}
                  </span>
                  <h3 className="text-sm font-semibold mb-2 text-black">{project.name}</h3>
                  <p className="text-sm text-black/50 leading-relaxed">{project.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Research */}
      <section id="research" className="py-24 border-t border-black/8">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="text-xs font-mono text-black/35 uppercase tracking-widest mb-10">
              Research
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-10">
            {posts.map((post, index) => (
              <FadeIn key={post.slug} delay={0.1 + index * 0.1}>
                <a href={`/research/${post.slug}`} className="group block">
                  {post.image && (
                    <div className="aspect-[16/9] overflow-hidden rounded-xl mb-5 bg-zinc-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-md ${tagColors[post.tag] ?? defaultTagColor}`}>
                        {post.tag}
                      </span>
                      <span className="text-xs text-black/30 font-mono">{post.date}</span>
                    </div>
                    <h3 className="text-base font-semibold text-black group-hover:text-black/60 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm text-black/50 leading-relaxed line-clamp-2">
                      {post.description}
                    </p>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-[#0f0f0f] text-white border-t border-black/8">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <FadeIn>
                <p className="text-xs font-mono text-white/25 uppercase tracking-widest mb-8">
                  Contact
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5">
                  Interested in the work?
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-base text-white/45 leading-relaxed mb-8">
                  Whether you are a patient interested in early access, a
                  clinician who wants to collaborate, or a researcher working on
                  adjacent problems, reach out.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <a
                  href="mailto:hello@layeredlabs.ai"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:text-white/60 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  hello@layeredlabs.ai
                </a>
              </FadeIn>
            </div>

            <div className="flex flex-col justify-end">
              <FadeIn delay={0.4}>
                <div>
                  {[
                    { label: "GitHub", href: "https://github.com/layered-labs" },
                    { label: "Twitter / X", href: "https://twitter.com/layeredlabs" },
                    { label: "LinkedIn", href: "https://linkedin.com/company/layeredlabs" },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between py-4 border-b border-white/8 hover:border-white/20 transition-colors group"
                    >
                      <span className="text-sm font-medium">{link.label}</span>
                      <ArrowUpRight className="w-4 h-4 text-white/25 group-hover:text-white/60 transition-colors" />
                    </a>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-5 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between text-xs text-zinc-600">
            <p>&copy; {new Date().getFullYear()} Layered Labs</p>
            <p>New York City</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
