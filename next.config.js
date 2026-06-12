/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  eslint: {
    // Don't fail production builds on lint; run `npm run lint` separately.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
