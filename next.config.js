/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["95bf-39-51-116-9.ngrok-free.app"],
  },
  async redirects() {
    return [
      {
        source: "/pdf/:id",
        destination: "https://95bf-39-51-116-9.ngrok-free.app/document/:id",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
