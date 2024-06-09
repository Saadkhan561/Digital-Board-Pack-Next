/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["aef7-37-111-136-161.ngrok-free.app"],
  },
  async redirects() {
    return [
      {
        source: "/pdf/:parentName/:docName",
        destination: "https://f2ba-39-51-121-189.ngrok-free.appdocument/:parentName/:docName",
        permanent: false,
      },
    ];  
  },
};

module.exports = nextConfig;
