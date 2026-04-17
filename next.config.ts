import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  outputFileTracingExcludes: {
    "**": [
      "node_modules/three/**",
      "node_modules/gsap/**",
      "node_modules/hls.js/**",
      "node_modules/lenis/**",
      "node_modules/@types/**",
      "node_modules/typescript/**",
      "public/**",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "videos.pexels.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.datocms-assets.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
