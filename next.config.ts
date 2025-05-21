import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // base: process.env.NEXT_BASE_PATH || '/react-expense-tracker',
  eslint: {
    ignoreDuringBuilds: true,
  },
   typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
