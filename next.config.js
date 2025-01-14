/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint:{
        ignoreDuringBuilds:true
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'antimetal.com',
          },
        ],
      },
}

module.exports = nextConfig
