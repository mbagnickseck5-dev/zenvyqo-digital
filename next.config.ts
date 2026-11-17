import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Le français canadien est la langue principale : la racine mène à /fr.
    return [{ source: "/", destination: "/fr", permanent: false }];
  },
};

export default nextConfig;
