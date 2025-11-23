/* eslint-disable @typescript-eslint/no-var-requires */
const withNextIntl = require("next-intl/plugin")();

const nextConfig = withNextIntl({
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    scrollRestoration: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
    ],
  },
});

module.exports = nextConfig;
