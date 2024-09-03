/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com',
        port: '',
        pathname: '/images/S/compressed.photo.goodreads.com/**',
      },
    ],
  },
  output: 'standalone',
};

module.exports = nextConfig;
