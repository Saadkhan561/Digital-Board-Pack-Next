/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["4d4d-154-198-122-137.ngrok-free.app"],
  },
  async redirects() {
    return [
      {
        source: "/pdf/:id",
        destination: "https://4d4d-154-198-122-137.ngrok-free.app/document/:id",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
