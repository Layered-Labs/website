import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

export default nextConfig;
