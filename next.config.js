/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["d601-37-111-158-24.ngrok-free.app"],
  },
  async redirects() {
    return [
      {
        source: "/pdf/:id",
        destination: "https://d601-37-111-158-24.ngrok-free.app/document/:id",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
