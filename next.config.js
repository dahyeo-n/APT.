// next.config.js
const withTM = require('next-transpile-modules')(['@nextui-org/theme']);

/** @type {import('next').NextConfig} */
const nextConfig = withTM({
  experimental: {
    optimizeCss: false,
  },
  optimizeFonts: false,
});

module.exports = nextConfig;
