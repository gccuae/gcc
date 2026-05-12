import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
  images: {
    dangerouslyAllowSVG: true,
    unoptimized: true,
    domains: ["dl.dropboxusercontent.com"],
  },
  async redirects() {
    return [
      {
        source: "/news/adssc-certificate-of-appreciation-contract-o-12733",
        destination: "/news/adssc-certificate-of-appreciation",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
