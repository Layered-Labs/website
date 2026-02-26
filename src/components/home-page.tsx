"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm border-b border-black/6"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-14">
            <a
              href="#"
              className={`flex items-center gap-2 text-sm font-semibold tracking-tight transition-colors ${
                scrolled ? "text-black" : "text-white"
              }`}
            >
              <Image
                src="/logo.png"
                alt="Layered Labs"
                width={16}
                height={16}
                className={scrolled ? "" : "invert"}
              />
              Layered Labs
            </a>
            <div
              className={`hidden md:flex items-center gap-8 text-sm transition-colors ${
                scrolled ? "text-black/50" : "text-white/70"
              }`}
            >
              <a href="#research" className={`transition-colors ${scrolled ? "hover:text-black" : "hover:text-white"}`}>
                Research
              </a>
              <a href="#contact" className={`transition-colors ${scrolled ? "hover:text-black" : "hover:text-white"}`}>
                Contact
              </a>
            </div>
            <a
              href="#contact"
              className={`hidden md:inline-flex items-center gap-1.5 text-sm transition-colors ${
                scrolled ? "text-black/55 hover:text-black" : "text-white/70 hover:text-white"
              }`}
            >
              Get in Touch
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <MobileNav />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/background.png"
            alt=""
            fill
            className="object-cover object-[center_80%]"
            priority
          />
          {/* Gradient overlay: darker at top for nav, darkest in center for text, fades at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
          <BlurFade delay={0.1} inView>
            <p className="text-xs font-mono text-white/50 uppercase tracking-widest mb-10">
              Nonprofit applied AI lab · New York City
            </p>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <h1 className="text-5xl md:text-7xl lg:text-[88px] font-bold tracking-tighter leading-[0.95] mb-8 text-white">
              Applied AI<br />for health equity.
            </h1>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <p className="text-base md:text-lg text-white/60 leading-relaxed mb-10 max-w-lg mx-auto">
              We build and deploy open-source clinical AI for the health systems that need it most. Private, on-device, no cloud required.
            </p>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <div className="flex items-center justify-center gap-3">
              <a
                href="#research"
                className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-white/90 transition-colors"
              >
                Our Research
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/layered-labs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-white/70 border border-white/25 px-5 py-2.5 rounded-lg hover:text-white hover:border-white/50 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
            </div>
          </BlurFade>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* Research */}
      <section id="research" className="py-24 bg-white border-t border-black/6">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="text-xs font-mono text-black/30 uppercase tracking-widest mb-12">
              Research
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-16 items-start mb-16">
            <FadeIn delay={0.1}>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight leading-snug text-black">
                We build what under-resourced health systems can actually use.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base text-black/55 leading-relaxed">
                We build, evaluate, and deploy open-source models on clinical tasks. Designed for low-resource settings, on-device and without internet.
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
                  Whether you're a researcher working on adjacent problems, a clinician curious about open-source deployment, or a health system evaluating models, reach out.
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
