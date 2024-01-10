/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    domains: ["c.saavncdn.com"],
    // or use remotePatterns
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "c.saavncdn.com",
    //     port: "",
    //     pathname: "/**",
    //   },
    // ],
  },
};
