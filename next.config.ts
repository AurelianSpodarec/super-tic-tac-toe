import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // {
      //   source: "/",      // the route you want to redirect from
      //   destination: "/game", // the route you want to redirect to
      //   permanent: true,  // true = 308 permanent redirect, false = 307 temporary
      // },
      // You can add more redirects if needed
    ];
  },
};

export default nextConfig;
