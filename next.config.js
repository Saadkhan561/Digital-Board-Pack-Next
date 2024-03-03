/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["be7e-37-111-181-140.ngrok-free.app"],
  },
  async redirects() {
    return [
      {
        source: "/pdf/:id",
        destination: "https://be7e-37-111-181-140.ngrok-free.app/document/:id",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
