/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreBuildErrors: true,
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/flytbase/:path*",
        destination: `${process.env.FLYTBASE_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
