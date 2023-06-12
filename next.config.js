/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "panel.topio.pl"],
  },
  // async redirects() {
  //   return await getMEXRedirects();
  // },
};

module.exports = nextConfig;
