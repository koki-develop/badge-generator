/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  webpack: (config) => {
    config.module.rules.push({
      resourceQuery: { not: [/raw/] },
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    config.module.rules.push({
      resourceQuery: /raw/,
      type: "asset/source",
    });
    return config;
  },
};

module.exports = nextConfig;
