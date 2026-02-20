"use client";

import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";
import { BlurFade } from "@/components/ui/blur-fade";
import { MobileNav } from "@/components/ui/mobile-nav";
import { ArrowRight, ArrowUpRight, Github, Mail, MapPin } from "lucide-react";
import type { ResearchPost } from "@/lib/research";

const tagColors: Record<string, string> = {
  Paper: "bg-emerald-500/10 text-emerald-600",
  "Technical Report": "bg-sky-500/10 text-sky-600",
  Preprint: "bg-amber-500/10 text-amber-600",
  "Blog Post": "bg-violet-500/10 text-violet-600",
};

const defaultTagColor = "bg-black/5 text-black/60";

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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/5">
        <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-black">
              <Image src="/logo.png" alt="Layered Labs" width={18} height={18} className="p-1" />
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
              className="hidden md:flex items-center gap-2 text-sm font-medium bg-black text-white px-4 py-2 rounded-full hover:bg-black/80 transition-colors"
            >
              Get in Touch
            </a>
            <MobileNav />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-36 pb-28 overflow-hidden bg-gradient-to-b from-sky-50/50 via-white to-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(14,165,233,0.08),transparent)]" />
        <div className="relative max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="max-w-3xl">
            <BlurFade delay={0.05} inView>
              <div className="inline-flex items-center gap-2 text-sm font-medium text-sky-600 bg-sky-50 border border-sky-100 rounded-full px-4 py-1.5 mb-10">
                <MapPin className="w-3.5 h-3.5" />
                Applied Clinical AI Lab, New York City
              </div>
            </BlurFade>

            <BlurFade delay={0.15} inView>
              <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-semibold tracking-tight leading-[1.08] mb-7 text-black">
                Health is continuous.
                <br />
                <span className="bg-gradient-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
                  Care should be too.
                </span>
              </h1>
            </BlurFade>

            <BlurFade delay={0.25} inView>
              <p className="text-xl md:text-2xl text-black/55 leading-relaxed mb-12 max-w-2xl">
                We build open-source AI systems that maintain structured patient
                state across time, so every clinical visit begins with the full
                picture.
              </p>
            </BlurFade>

            <BlurFade delay={0.35} inView>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-full text-base font-medium hover:bg-black/80 transition-colors"
                >
                  Explore Our Work
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/layered-labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-black/15 px-8 py-4 rounded-full text-base font-medium hover:bg-black/5 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-32 border-t border-black/5">
        <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
          <FadeIn>
            <p className="text-sm font-semibold text-sky-500 uppercase tracking-widest mb-4">
              Our Mission
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-black">
                Continuity is the missing layer in clinical AI
              </h2>
            </FadeIn>

            <div className="space-y-6">
              <FadeIn delay={0.2}>
                <p className="text-lg text-black/60 leading-relaxed">
                  Medicine is practiced as a series of isolated visits. Patient
                  history is fragmented across systems, recalled from memory, and
                  lost between providers. Most AI in healthcare makes this worse
                  by treating each interaction as if it is the first.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="text-lg text-black/60 leading-relaxed">
                  We build tools that maintain structured longitudinal patient
                  state and study how open-source models can reason over that
                  state reliably. The product is both a patient tool and a
                  research surface.
                </p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-black/8">
                  <div>
                    <p className="text-3xl font-semibold bg-gradient-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">100%</p>
                    <p className="text-sm text-black/50 mt-1">Open Source</p>
                  </div>
                  <div>
                    <p className="text-3xl font-semibold bg-gradient-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">450+</p>
                    <p className="text-sm text-black/50 mt-1">Dataset Downloads</p>
                  </div>
                  <div>
                    <p className="text-3xl font-semibold bg-gradient-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">311</p>
                    <p className="text-sm text-black/50 mt-1">NYC ZIP Codes Mapped</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
          <FadeIn>
            <p className="text-sm font-semibold text-sky-400 uppercase tracking-widest mb-4">
              Projects
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-16 text-white">
              What we&apos;re building
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-5">
            {projects.map((project, index) => (
              <FadeIn key={project.name} delay={0.1 + index * 0.1}>
                <div className="group p-8 bg-white/5 rounded-2xl border border-white/8 hover:bg-white/8 hover:border-sky-500/30 transition-all duration-300">
                  <div className="flex items-start justify-between mb-5">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        project.status === "Live"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : project.status === "In Development"
                            ? "bg-sky-500/15 text-sky-400"
                            : "bg-white/10 text-white/50"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {project.name}
                  </h3>
                  <p className="text-white/50 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-32">
        <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
          <FadeIn>
            <p className="text-sm font-semibold text-sky-500 uppercase tracking-widest mb-4">
              Research
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-16 text-black">
              Latest publications
            </h2>
          </FadeIn>

          <div>
            {posts.map((post, index) => (
              <FadeIn key={post.slug} delay={0.2 + index * 0.1}>
                <a
                  href={`/research/${post.slug}`}
                  className="flex items-center gap-4 py-6 group"
                >
                  <span
                    className={`shrink-0 text-xs font-medium px-3 py-1 rounded-full ${tagColors[post.tag] ?? defaultTagColor}`}
                  >
                    {post.tag}
                  </span>
                  <h3 className="text-lg font-semibold text-black group-hover:text-black/60 transition-colors flex-1 min-w-0">
                    {post.title}
                  </h3>
                  <span className="shrink-0 text-sm text-black/30 font-mono hidden sm:block">
                    {post.date}
                  </span>
                  <ArrowUpRight className="shrink-0 w-4 h-4 text-black/25 group-hover:text-sky-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
                {index < posts.length - 1 && (
                  <div className="border-b border-black/5" />
                )}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-zinc-950 text-white">
        <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <FadeIn>
                <p className="text-sm font-semibold text-sky-400 uppercase tracking-widest mb-4">
                  Get in Touch
                </p>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
                  Interested in the work?
                </h2>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-lg text-white/55 leading-relaxed mb-8">
                  Whether you are a patient interested in early access, a
                  clinician who wants to collaborate, or a researcher working on
                  adjacent problems, we would love to hear from you.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <a
                  href="mailto:hello@layeredlabs.ai"
                  className="inline-flex items-center gap-3 text-lg font-medium hover:text-sky-400 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  hello@layeredlabs.ai
                </a>
              </FadeIn>
            </div>

            <div className="flex flex-col justify-end">
              <FadeIn delay={0.4}>
                <div className="space-y-4">
                  <a
                    href="https://github.com/layered-labs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-4 border-b border-white/8 hover:border-sky-500/50 transition-colors group"
                  >
                    <span className="font-medium">GitHub</span>
                    <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                  <a
                    href="https://twitter.com/layeredlabs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-4 border-b border-white/8 hover:border-sky-500/50 transition-colors group"
                  >
                    <span className="font-medium">Twitter / X</span>
                    <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                  <a
                    href="https://linkedin.com/company/layeredlabs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-4 border-b border-white/8 hover:border-sky-500/50 transition-colors group"
                  >
                    <span className="font-medium">LinkedIn</span>
                    <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-zinc-900 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
            <p>&copy; {new Date().getFullYear()} Layered Labs. All rights reserved.</p>
            <p>New York City</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
