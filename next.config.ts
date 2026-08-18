import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.6"],
  // Add support to bypass built-in bodyParser limits (only applies to Pages API theoretically,
  // but App Router might impose limitations on standard fetches if configured).
  // In App router, standard server actions have size limits, but Route Handlers consuming req.body directly 
  // via stream shouldn't hit memory limits unless fully consumed.
  experimental: {
    serverActions: {
      bodySizeLimit: "130mb",
    },
  },
};

export default nextConfig;
