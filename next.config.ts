import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.56.1",
    "http://192.168.56.1:3000",
    "http:// 172.20.10.2:3000",
    "http://localhost:3000",
  ],
};

export default nextConfig;