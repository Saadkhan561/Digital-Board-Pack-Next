/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: { ignoreDuringBuilds: true },

  images: {
    domains: ["950a-39-34-147-203.ngrok-free.app", "localhost","aliyan20093.bsite.net"],
  },
  async redirects() {
    return [
      {
        source: "/pdf/:parentName/:docName",
        // destination: "https://950a-39-34-147-203.ngrok-free.app/document/:parentName/:docName",
        destination: "https://aliyan20093.bsite.net/document/:parentName/:docName",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
