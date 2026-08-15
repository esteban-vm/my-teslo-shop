import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typedRoutes: true,
  devIndicators: false,
  reactCompiler: true,
  experimental: {
    typedEnv: true,
    authInterrupts: true,
    serverActions: {
      bodySizeLimit: '5.5mb',
    },
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
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}

export default nextConfig
