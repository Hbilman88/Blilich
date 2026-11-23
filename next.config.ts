import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/ingenierie",
        destination: "/energie",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
