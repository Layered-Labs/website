import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";
import { getAllResearchPosts, getResearchPost } from "@/lib/research";
import { ResearchBadge } from "@/components/ui/research-badge";

export async function generateStaticParams() {
  const posts = getAllResearchPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getResearchPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Layered Labs`,
    description: post.description,
  };
}

export default async function ResearchArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getResearchPost(slug);
  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-3xl mx-auto px-8 py-32">
        <Link
          href="/#research"
          className="inline-flex items-center gap-2 text-sm text-black/50 hover:text-black transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Research
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <ResearchBadge tag={post.tag} />
            <span className="text-sm text-black/40 font-mono">{formattedDate}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-black mb-4">
            {post.title}
          </h1>
          <p className="text-base text-black/50 leading-relaxed">
            {post.description}
          </p>
          {post.image && (
            <div className="mt-8 aspect-[16/9] overflow-hidden rounded-xl bg-zinc-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </header>

        <hr className="border-black/10 mb-12" />

        <div className="prose max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
