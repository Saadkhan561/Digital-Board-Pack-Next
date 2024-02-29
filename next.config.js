/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["45d3-39-51-119-117.ngrok-free.app"],
  },
  async redirects() {
    return [
      {
        source: "/pdf/:id",
        destination: "https://45d3-39-51-119-117.ngrok-free.app/document/:id",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
