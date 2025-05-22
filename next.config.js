/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  api: {
    bodyParser: true,
    path: '/api/[...slug]',
  },
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig
