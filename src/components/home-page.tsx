"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { BlurFade } from "@/components/ui/blur-fade";
import { MobileNav } from "@/components/ui/mobile-nav";
import { GridPattern } from "@/components/ui/grid-pattern";
import { ResearchBadge } from "@/components/ui/research-badge";
import { ArrowRight, ArrowUpRight, Github, Mail, MapPin } from "lucide-react";

const projects = [
  {
    name: "OpenUnits",
    description:
      "Simple, unified API access to small, specialized LLMs. One endpoint, multiple models, optimized for healthcare applications.",
    status: "Live",
    link: "#",
  },
  {
    name: "Clinical Synthetic Gen",
    description:
      "Pipeline for generating high-quality single-turn Patient-Doctor Q&A synthetic data for training and evaluation of small, open-source LLMs.",
    status: "In Development",
    link: "#",
  },
  {
    name: "Benchbase",
    description:
      "Frictionless and scalable medical benchmarks. Evaluate your models against clinical standards with minimal setup.",
    status: "Coming Soon",
    link: "#",
  },
  {
    name: "Constraints",
    description:
      "Research into defining and enforcing structured constraints in LLM outputs for reliable clinical applications.",
    status: "Research",
    link: "#",
  },
];

interface ResearchItem {
  slug: string;
  title: string;
  date: string;
  tag: string;
}

export function HomePage({ research }: { research: ResearchItem[] }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-black">
              <Image src="/logo.png" alt="Layered Labs" width={18} height={18} className="p-1" />
              Layered Labs
            </a>
            <div className="hidden md:flex items-center gap-8 text-sm text-black/60">
              <a href="#mission" className="hover:text-black transition-colors">
                Mission
              </a>
              <a href="#projects" className="hover:text-black transition-colors">
                Projects
              </a>
              <a href="#research" className="hover:text-black transition-colors">
                Research
              </a>
              <a href="#contact" className="hover:text-black transition-colors">
                Contact
              </a>
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
      <section className="relative pt-32 pb-24 overflow-hidden">
        <GridPattern
          className="text-black/[0.03] [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
          width={32}
          height={32}
        />
        <div className="relative max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="max-w-3xl">
            <BlurFade delay={0.1} inView>
              <div className="flex items-center gap-2 text-sm text-black/50 mb-8">
                <MapPin className="w-4 h-4" />
                <span>New York City</span>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] mb-8 text-black">
                Building open-source
                <br />
                <span className="text-black/40">AI for health</span>
              </h1>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <p className="text-xl md:text-2xl text-black/60 leading-relaxed mb-12 max-w-2xl">
                We develop and deploy small, efficient language models purpose-built
                for healthcare. Open-source. Research-driven. Production-ready.
              </p>
            </BlurFade>

            <BlurFade delay={0.4} inView>
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
                  className="inline-flex items-center justify-center gap-2 border border-black/20 px-8 py-4 rounded-full text-base font-medium hover:bg-black/5 transition-colors"
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
            <p className="text-sm font-medium text-black/40 uppercase tracking-wider mb-4">
              Our Mission
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-black">
                Making AI accessible, transparent, and effective for healthcare
              </h2>
            </FadeIn>

            <div className="space-y-6">
              <FadeIn delay={0.2}>
                <p className="text-lg text-black/60 leading-relaxed">
                  Large language models are transforming healthcare, but their size,
                  cost, and opacity create barriers. We believe the future lies in
                  smaller, specialized models that can be deployed anywhere—from
                  hospital servers to edge devices.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="text-lg text-black/60 leading-relaxed">
                  Our research focuses on distillation, efficient architectures, and
                  domain-specific training to create models that are not just
                  smaller, but better suited for clinical applications.
                </p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-black/10">
                  <div>
                    <p className="text-3xl font-semibold text-black">100%</p>
                    <p className="text-sm text-black/50 mt-1">Open Source</p>
                  </div>
                  <div>
                    <p className="text-3xl font-semibold text-black">450+</p>
                    <p className="text-sm text-black/50 mt-1">HF Dataset Downloads</p>
                  </div>
                  <div>
                    <p className="text-3xl font-semibold text-black">4</p>
                    <p className="text-sm text-black/50 mt-1">Active Projects</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 bg-black/[0.02]">
        <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
          <FadeIn>
            <p className="text-sm font-medium text-black/40 uppercase tracking-wider mb-4">
              Projects
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-16 text-black">
              What we&apos;re building
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <FadeIn key={project.name} delay={0.1 + index * 0.1}>
                <a
                  href={project.link}
                  className="group block p-8 bg-white rounded-2xl border border-black/5 hover:border-black/10 hover:shadow-lg hover:shadow-black/5 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${project.status === "Live"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : project.status === "In Development"
                          ? "bg-blue-500/10 text-blue-600"
                          : project.status === "Coming Soon"
                            ? "bg-amber-500/10 text-amber-600"
                            : "bg-black/5 text-black/60"
                        }`}
                    >
                      {project.status}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-black/30 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-black group-hover:text-black/70 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-black/60 leading-relaxed">
                    {project.description}
                  </p>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-32">
        <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
          <FadeIn>
            <p className="text-sm font-medium text-black/40 uppercase tracking-wider mb-4">
              Research
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-16 text-black">
              Latest publications
            </h2>
          </FadeIn>

          <div className="space-y-0 divide-y divide-black/10">
            {research.map((paper, index) => (
              <FadeIn key={paper.slug} delay={0.1 + index * 0.1}>
                <Link
                  href={`/research/${paper.slug}`}
                  className="group flex flex-col md:flex-row md:items-center justify-between py-8 hover:bg-black/[0.02] -mx-4 px-4 rounded-lg transition-colors"
                >
                  <div className="flex items-start gap-4 mb-4 md:mb-0">
                    <ResearchBadge tag={paper.tag} />
                    <h3 className="text-lg font-medium text-black group-hover:text-black/60 transition-colors">
                      {paper.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 text-black/50">
                    <span className="text-sm">{paper.date}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-black text-white">
        <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <FadeIn>
                <p className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">
                  Get in Touch
                </p>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
                  Let&apos;s build the future of healthcare AI together
                </h2>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-lg text-white/60 leading-relaxed mb-8">
                  Whether you&apos;re a researcher, healthcare provider, or investor
                  interested in our mission, we&apos;d love to hear from you.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <a
                  href="mailto:hello@layeredlabs.ai"
                  className="inline-flex items-center gap-3 text-lg font-medium hover:text-white/70 transition-colors"
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
                    className="flex items-center justify-between py-4 border-b border-white/10 hover:border-white/30 transition-colors group"
                  >
                    <span className="font-medium">GitHub</span>
                    <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                  <a
                    href="https://twitter.com/layeredlabs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-4 border-b border-white/10 hover:border-white/30 transition-colors group"
                  >
                    <span className="font-medium">Twitter / X</span>
                    <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                  <a
                    href="https://linkedin.com/company/layeredlabs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-4 border-b border-white/10 hover:border-white/30 transition-colors group"
                  >
                    <span className="font-medium">LinkedIn</span>
                    <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-neutral-900 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
            <p>&copy; {new Date().getFullYear()} Layered Labs. All rights reserved.</p>
            <p>New York City</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
