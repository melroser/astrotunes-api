/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    typedRoutes: true,
  },
  images: {
    unoptimized: false,
  },
  api: {
    bodyParser: true,
    externalResolver: true,
  },
}

module.exports = nextConfig
