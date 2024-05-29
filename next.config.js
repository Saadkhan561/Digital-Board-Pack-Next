/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["950b-37-111-136-112.ngrok-free.app"],
  },
  async redirects() {
    return [
      {
        source: "/pdf/:parentName/:docName",
        destination: "https://950b-37-111-136-112.ngrok-free.app/document/:parentName/:docName",
        permanent: false,
      },
    ];  
  },
};

module.exports = nextConfig;
