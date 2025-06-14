/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  webpack: (config) => {
    config.module.rules.push(
      ...[
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
      ]
    );
    return config;
  },
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
