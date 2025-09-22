import type { NextConfig } from "next";


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'], // Add your Cloudinary domain here
  },
};

module.exports = nextConfig;


export default nextConfig;
