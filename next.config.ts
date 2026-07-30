import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typedRoutes: true,
  devIndicators: false,
  reactCompiler: true,
  experimental: {
    typedEnv: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
}

export default nextConfig
