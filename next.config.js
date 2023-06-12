/** @type {import('next').NextConfig} */
const { getMEXRedirects } = require("./services/redirect");

const nextConfig = {
  images: {
    domains: ["localhost", "panel.topio.pl"],
  },
  async redirects() {
    const redirectUrls = await getMEXRedirects();

    return redirectUrls.map((redirect) => ({
      source: redirect.source,
      destination:
        redirect.destination.split("?")[0] +
        "?url=https://www.mediaexpert.pl/telewizory-i-rtv/sluchawki/wszystkie-sluchawki/sluchawki-bluetooth-technics-eah-az60m2e-k-tws-anc-dokanalowe-czarne",
      permanent: true,
    }));
  },
};

module.exports = nextConfig;
