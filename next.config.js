/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  images: {
    domains: ["ccf1-39-51-117-103.ngrok-free.app"],
  },
  async redirects() {
    return [
      {
        source: "/pdf/:parentName/:docName",
        destination: "https://ccf1-39-51-117-103.ngrok-free.app/document/:parentName/:docName",
        permanent: false,
      },
    ];  
  },
};

module.exports = nextConfig;
