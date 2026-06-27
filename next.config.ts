import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap-index',
      },
    ];
  },
  // Add headers to explicitly prevent indexing of raw Vercel domains
  async headers() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '(?<host>.*\\.vercel\\.app)',
          },
        ],
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/sitemap.xml',
          destination: '/api/sitemap-index',
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
