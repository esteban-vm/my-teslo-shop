import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: true,
  devIndicators: false,
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
