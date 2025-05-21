import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  base: process.env.NEXT_BASE_PATH || '/react-expense-tracker',
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
