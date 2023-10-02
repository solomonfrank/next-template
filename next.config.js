const { i18n } = require("./next-i18next.config");
/** @type {import('next').NextConfig} */
const nextConfig = {
  // https://www.i18next.com/overview/configuration-options#logging

  reactStrictMode: true,
  i18n: {
    ...i18n,
    localeDetection: true,
  },
};

module.exports = nextConfig;
