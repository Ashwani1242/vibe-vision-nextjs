/** @type {import('next').NextConfig} */

const BASE_URL = 'http://54.165.196.203:8000'
// const BASE_URL = 'http://localhost:8000'

const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['your-image-domain.com'],
  },

  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `${BASE_URL}/:path*`,
      },
      {
        source: '/auth/:path*',
        destination: `${BASE_URL}/auth/:path*`,
      },
      {
        source: '/auth/login',
        destination: `${BASE_URL}/auth/login`,
      },
      {
        source: '/auth/signup',
        destination: `${BASE_URL}/auth/signup`,
      },
      {
        source: '/api/:path*',
        destination: `${BASE_URL}/api/:path*`,
      },
      {
        source: '/api/generate-video/:path*',
        destination: `${BASE_URL}/api/generate-video/:path*`,
      },
      {
        source: '/api/generate-video/roast-video',
        destination: `${BASE_URL}/api/generate-video/roast-video`,
      },
      {
        source: '/api/generate-video/story-time',
        destination: `${BASE_URL}/api/generate-video/story-time`,
      },
      {
        source: '/api/generate-audio/:path*',
        destination: `${BASE_URL}/api/generate-audio/:path*`,
      },
      {
        source: '/api/generate-audio/kids-music',
        destination: `${BASE_URL}/api/generate-audio/kids-music`,
      },
      {
        source: '/api/generate-audio/jukebox',
        destination: `${BASE_URL}/api/generate-audio/jukebox`,
      },
      {
        source: '/uploads/:path*',
        destination: `${BASE_URL}/uploads/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
