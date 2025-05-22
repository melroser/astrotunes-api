/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: true,
    typedRoutes: true,
  },
  images: {
    unoptimized: false,
  },
}

module.exports = nextConfig
