import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Do NOT use output: "standalone" on Vercel — it breaks deployment.
  // Vercel handles Next.js builds natively.
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
};

export default nextConfig;
