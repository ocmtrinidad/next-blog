import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://res.cloudinary.com/dihu84tof/image/upload/v1754970842/next-blog/**"
      ),
    ],
  },
};

export default nextConfig;
