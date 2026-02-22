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

type WorkItem = {
  name: string;
  description: string;
  badge: string;
  href?: string;
};

const workItems: WorkItem[] = [
  {
    name: "MedQA-Deconstructed",
    description:
      "A longitudinal benchmark family built on MedQA. Clinical vignettes decomposed into sequential multi-visit scenarios, making temporal reasoning measurable for the first time.",
    badge: "In Development",
  },
  {
    name: "Health Companion",
    description:
      "A local-first app that tracks medications, symptoms, and health events across time. Patients arrive at every visit with a structured summary.",
    badge: "In Development",
  },
];

function WorkCard({ item }: { item: WorkItem }) {
  const inner = (
    <div className="group rounded-2xl overflow-hidden bg-[#0d0d0d] h-full flex flex-col">
      <div className="aspect-[16/9] flex items-end p-6">
        <span className="text-[10px] font-mono text-white/25 uppercase tracking-widest">
          {item.badge}
        </span>
      </div>
      <div className="p-5 border-t border-white/6 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-white/60 transition-colors">
          {item.name}
        </h3>
        <p className="text-sm text-white/35 leading-relaxed">{item.description}</p>
      </div>
    </div>
  );

  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className="block h-full">
        {inner}
      </a>
    );
  }
  return <div className="h-full">{inner}</div>;
}

function ResearchCard({ post }: { post: ResearchPost }) {
  return (
    <a
      href={`/research/${post.slug}`}
      className="group block rounded-2xl overflow-hidden border border-black/8 hover:border-black/20 transition-colors bg-white h-full flex flex-col"
    >
      <div className="aspect-[16/9] bg-zinc-100 overflow-hidden">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-zinc-100" />
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2.5 mb-3">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${tagColors[post.tag] ?? defaultTagColor}`}>
            {post.tag}
          </span>
          <span className="text-xs text-black/30 font-mono">{post.date}</span>
        </div>
        <h3 className="text-sm font-semibold text-black mb-1.5 leading-snug group-hover:text-black/50 transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-black/45 leading-relaxed line-clamp-2">{post.description}</p>
      </div>
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
              <a href="#mission" className="hover:text-black transition-colors">Mission</a>
              <a href="#work" className="hover:text-black transition-colors">Work</a>
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
      <section className="pt-40 pb-28">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <BlurFade delay={0.2} inView>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.04] mb-8 text-black">
              Towards health AI
              <br />
              <span className="text-black/25">that knows patients over time.</span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <p className="text-lg text-black/50 leading-relaxed mb-10 max-w-lg">
              Layered Labs studies how AI performs on health tasks across diverse patient populations and over time.
            </p>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <div className="flex items-center gap-3">
              <a
                href="#work"
                className="inline-flex items-center gap-2 bg-black text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-black/85 transition-colors"
              >
                Our Work
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

      {/* Mission */}
      <section id="mission" className="py-24 border-t border-black/6">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="text-xs font-mono text-black/30 uppercase tracking-widest mb-10">
              Mission
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <FadeIn delay={0.1}>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight leading-snug text-black">
                Longitudinal patient state is an open research problem.
              </h2>
            </FadeIn>

            <div className="space-y-5">
              <FadeIn delay={0.2}>
                <p className="text-base text-black/55 leading-relaxed">
                  Current benchmarks treat clinical reasoning as a single snapshot. In practice, clinicians reason across visits, synthesize history, and track how patient state changes over time.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="text-base text-black/55 leading-relaxed">
                  We study how AI systems reason over longitudinal patient health state, where they fail, and how performance differs across patient populations.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="py-24 border-t border-black/6">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="text-xs font-mono text-black/30 uppercase tracking-widest mb-10">
              Work
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-4">
            {workItems.map((item, i) => (
              <FadeIn key={item.name} delay={0.1 + i * 0.08}>
                <WorkCard item={item} />
              </FadeIn>
            ))}
            {posts.map((post, i) => (
              <FadeIn key={post.slug} delay={0.1 + (workItems.length + i) * 0.06}>
                <ResearchCard post={post} />
              </FadeIn>
            ))}
          </div>
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
                  Whether you are a clinician who wants to collaborate, a researcher working on adjacent problems, or a patient interested in early access, reach out.
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
