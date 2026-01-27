import { getAllResearchPosts } from "@/lib/research";
import { HomePage } from "@/components/home-page";

export default function Home() {
  const posts = getAllResearchPosts();

  const research = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    tag: post.tag,
  }));

  return <HomePage research={research} />;
}
