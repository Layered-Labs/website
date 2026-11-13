import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A package-lock.json in the home folder otherwise makes Turbopack pick the wrong root.
  turbopack: { root: __dirname },
  // A check build can write elsewhere (NEXT_DIST_DIR=.next-check) so it never
  // overwrites the files a running dev server is serving.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  async redirects() {
    return [
      // The old /data page was replaced by the interactive map on Hugging Face.
      {
        source: "/data",
        destination: "https://huggingface.co/spaces/Layered-Labs/nyc-clinic-ai-infra-map",
        permanent: false,
      },
    ];
  },
};

// Section files are .mdx; GitHub-flavoured Markdown adds tables and footnotes.
// Plugins are named as strings so Turbopack can load them.
const withMDX = createMDX({ options: { remarkPlugins: ["remark-gfm"] } });

export default withMDX(nextConfig);
