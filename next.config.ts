import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // destination: "http://localhost:5000/api/:path*",
        destination: "https://payroll.politekniklp3i-tasikmalaya.ac.id/:path*"
      },
    ];
  },
};

export default nextConfig;
