import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WriteupPage } from "@/components/writeup/writeup-page";
import { getItem, hasWriteup, WORK } from "@/lib/content/registry";

export const dynamicParams = false;

export function generateStaticParams() {
  return WORK.filter(hasWriteup).map((w) => ({ slug: w.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item?.writeup) return {};
  const title = item.writeup.title ?? item.claim;
  return {
    title: `${title} | Layered Labs`,
    description: item.summary,
    openGraph: { title, description: item.summary, url: `/work/${slug}`, type: "article" },
  };
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item || !item.writeup || !hasWriteup(item)) notFound();
  return <WriteupPage item={item} writeup={item.writeup} />;
}
