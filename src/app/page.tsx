import { HomePage } from "@/components/home-page";
import { getAllResearchPosts } from "@/lib/research";

export default function Home() {
  const posts = getAllResearchPosts();
  return <HomePage posts={posts} />;
}
