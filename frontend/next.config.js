/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/img/:path*",
        destination: "/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
