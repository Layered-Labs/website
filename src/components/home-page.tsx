"use client";

import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";
import { BlurFade } from "@/components/ui/blur-fade";
import { MobileNav } from "@/components/ui/mobile-nav";
import { ArrowRight, ArrowUpRight, Github, Mail } from "lucide-react";
import type { ResearchPost } from "@/lib/research";

const tagColors: Record<string, string> = {
  Paper: "bg-blue-50 text-blue-700",
  Dataset: "bg-violet-50 text-violet-700",
  Preprint: "bg-amber-50 text-amber-700",
  Tool: "bg-emerald-50 text-emerald-700",
  "Blog Post": "bg-zinc-100 text-zinc-600",
};

const defaultTagColor = "bg-zinc-100 text-zinc-600";

function ResearchRow({ post }: { post: ResearchPost }) {
  return (
    <a
      href={`/research/${post.slug}`}
      className="group flex items-baseline gap-4 py-4 border-b border-black/6 hover:border-black/15 transition-colors"
    >
      <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-md ${tagColors[post.tag] ?? defaultTagColor}`}>
        {post.tag}
      </span>
      <span className="flex-1 text-sm font-medium text-black group-hover:text-black/50 transition-colors leading-snug">
        {post.title}
      </span>
      <span className="shrink-0 text-xs text-black/30 font-mono">{post.date}</span>
    </a>
  );
}

export function HomePage({ posts }: { posts: ResearchPost[] }) {
  return (
    <div className="min-h-screen bg-white">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-black/6">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-14">
            <a href="#" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-black">
              <Image src="/logo.png" alt="Layered Labs" width={16} height={16} />
              Layered Labs
            </a>
            <div className="hidden md:flex items-center gap-8 text-sm text-black/50">
              <a href="#research" className="hover:text-black transition-colors">Research</a>
              <a href="#contact" className="hover:text-black transition-colors">Contact</a>
            </div>
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-1.5 text-sm text-black/55 hover:text-black transition-colors"
            >
              Get in Touch
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <MobileNav />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-32">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <BlurFade delay={0.1} inView>
            <p className="text-xs font-mono text-black/30 uppercase tracking-widest mb-10">
              Nonprofit applied research lab · New York City
            </p>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <h1 className="text-6xl md:text-7xl lg:text-[90px] font-bold tracking-tighter leading-[0.95] mb-10 text-black">
              Clinical AI
              <br />
              for All.
            </h1>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <p className="text-base text-black/50 leading-relaxed mb-10 max-w-md">
              We study the clinical capabilities of open-source AI models and build tools to put them in the hands of low-resource clinics.
            </p>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <div className="flex items-center gap-3">
              <a
                href="#research"
                className="inline-flex items-center gap-2 bg-black text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-black/85 transition-colors"
              >
                Our Research
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/layered-labs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-black/50 border border-black/12 px-5 py-2.5 rounded-lg hover:text-black hover:border-black/25 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Research */}
      <section id="research" className="py-24 border-t border-black/6">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="text-xs font-mono text-black/30 uppercase tracking-widest mb-12">
              Research
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-16 items-start mb-16">
            <FadeIn delay={0.1}>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight leading-snug text-black">
                We benchmark open-source models on clinical tasks.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base text-black/55 leading-relaxed">
                We study how capabilities shift across model sizes and evaluate what is realistically deployable in low-resource clinical environments.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.1}>
            <div>
              {posts.map((post) => (
                <ResearchRow key={post.slug} post={post} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-[#0d0d0d] text-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <FadeIn>
                <p className="text-xs font-mono text-white/20 uppercase tracking-widest mb-8">
                  Contact
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-5">
                  Interested in the work?
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-base text-white/40 leading-relaxed mb-8">
                  Whether you are a researcher working on adjacent problems, a clinician interested in open-source deployment, or a health system evaluating models, reach out.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <a
                  href="mailto:hello@layeredlabs.ai"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:text-white/50 transition-colors"
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
                    { label: "Twitter / X", href: "https://x.com/layered_labs_ai" },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between py-4 border-b border-white/6 hover:border-white/15 transition-colors group"
                    >
                      <span className="text-sm font-medium">{link.label}</span>
                      <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
                    </a>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-5 bg-[#080808] border-t border-white/4">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between text-xs text-zinc-600">
            <p>&copy; {new Date().getFullYear()} Layered Labs</p>
            <p>layeredlabs.ai</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
