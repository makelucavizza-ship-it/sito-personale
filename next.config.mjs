/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];
    return [
      // Pagine private per i clienti: mai indicizzate
      { source: "/clienti/:path*", headers: noindex },
      { source: "/api/onboarding/:path*", headers: noindex },
    ];
  },
};

export default nextConfig;
