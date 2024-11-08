/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['your-image-domain.com'],
  },

  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'http://54.165.196.203:8000/:path*',
      },
      {
        source: '/auth/:path*',
        destination: 'http://54.165.196.203:8000/auth/:path*',
      },
      {
        source: '/auth/login',
        destination: 'http://54.165.196.203:8000/auth/login',
      },
      {
        source: '/auth/signup',
        destination: 'http://54.165.196.203:8000/auth/login',
      },
      {
        source: '/api/:path*',
        destination: 'http://54.165.196.203:8000/api/:path*',
      },
      {
        source: '/api/generate-video/:path*',
        destination: 'http://54.165.196.203:8000/api/generate-video/:path*',
      },
      {
        source: '/api/generate-video/roast-video',
        destination: 'http://54.165.196.203:8000/api/generate-video/roast-video',
      },
      {
        source: '/api/generate-video/story-time',
        destination: 'http://54.165.196.203:8000/api/generate-video/story-time',
      },
      {
        source: '/api/generate-audio/:path*',
        destination: 'http://54.165.196.203:8000/api/generate-audio/:path*',
      },
      {
        source: '/api/generate-audio/kids-music',
        destination: 'http://54.165.196.203:8000/api/generate-audio/kids-music',
      },
      {
        source: '/api/generate-audio/jukebox',
        destination: 'http://54.165.196.203:8000/api/generate-audio/jukebox',
      },
      {
        source: '/uploads/:path*',
        destination: 'http://54.165.196.203:8000/users/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
