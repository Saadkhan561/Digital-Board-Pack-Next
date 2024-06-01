/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["3ab4-37-111-167-8.ngrok-free.app"],
  },
  async redirects() {
    return [
      {
        source: "/pdf/:parentName/:docName",
        destination: "https://3ab4-37-111-167-8.ngrok-free.app/document/:parentName/:docName",
        permanent: false,
      },
    ];  
  },
};

module.exports = nextConfig;
