/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  images: {
    domains: ["950a-39-34-147-203.ngrok-free.app"],
  },
  async redirects() {
    return [
      {
        source: "/pdf/:parentName/:docName",
        destination: "https://950a-39-34-147-203.ngrok-free.app/document/:parentName/:docName",
        permanent: false,
      },
    ];  
  },
};

module.exports = nextConfig;
