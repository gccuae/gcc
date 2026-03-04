import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
  images: {
    dangerouslyAllowSVG:true,
    unoptimized:true,
    domains: ["dl.dropboxusercontent.com"] // Add Dropbox domain here
  },
  /* config options here */
};

export default nextConfig;
