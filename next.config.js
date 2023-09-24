/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images-na.ssl-images-amazon.com']
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en"
  },
  output: "standalone"
}

module.exports = nextConfig
