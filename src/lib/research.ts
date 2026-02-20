import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ResearchPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tag: string;
  content: string;
}

const researchDir = path.join(process.cwd(), "content/research");

export function getAllResearchPosts(): ResearchPost[] {
  const files = fs.readdirSync(researchDir).filter((f) => f.endsWith(".md"));

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(researchDir, filename), "utf-8");
      const { data, content } = matter(raw);

      if (data.draft === true) return null;

      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        tag: data.tag,
        content,
      };
    })
    .filter((p): p is ResearchPost => p !== null);

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getResearchPost(slug: string): ResearchPost | null {
  const filePath = path.join(researchDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  if (data.draft === true) return null;

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    tag: data.tag,
    content,
  };
}
