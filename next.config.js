// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
   env: {
      appBaseUrl: process.env.APP_BASE_URL,
      appBaseHostname: process.env.APP_BASE_HOSTNAME
   }
}

module.exports = nextConfig