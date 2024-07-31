/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  images: {
    domains: ["65c2-39-34-144-188.ngrok-free.app"],
  },
  async redirects() {
    return [
      {
        source: "/pdf/:parentName/:docName",
        destination: "http://localhost:7077/document/:parentName/:docName",
        permanent: false,
      },
    ];  
  },
};

module.exports = nextConfig;
