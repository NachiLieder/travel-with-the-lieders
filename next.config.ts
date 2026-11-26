import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      // Trip slugs renamed to the year the trip actually happened.
      {
        source: "/trips/romania-10-days-2024",
        destination: "/trips/romania-10-days-2023",
        permanent: true,
      },
      {
        source: "/trips/italy-lakes-2024",
        destination: "/trips/italy-lakes-2022",
        permanent: true,
      },
      // Newsletter removed for now.
      { source: "/newsletter", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
