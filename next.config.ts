import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  base: process.env.NEXT_BASE_PATH || '/react-expense-tracker'
};

export default nextConfig;
