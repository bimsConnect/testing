import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    optimizeCss: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["ibb.co.com"], // Tambahkan hostname gambar yang diperbolehkan
  },
};

export default nextConfig;
