import { HomePage } from "@/components/home-page";
import { getAllResearchPosts } from "@/lib/research";

export default function Home() {
  const posts = getAllResearchPosts();
  // TODO: re-enable these once ready
  // const hiddenTags = ["Paper", "Technical Report", "Preprint"];
  const filteredPosts = posts.filter(
    (p) => !["Paper", "Technical Report", "Preprint"].includes(p.tag)
  );
  return <HomePage posts={filteredPosts} />;
}
