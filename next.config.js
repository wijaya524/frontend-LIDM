/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/bermain",
        destination: "/",
      },
      {
        source: "/profil",
        destination: "/",
      },
      {
        source: "/pencapaian",
        destination: "/",
      },
      // Rewrite kognitif
      {
        source: "/bermain/kognitif",
        destination: "/kognitif",
      },
      {
        source: "/bermain/kognitif/:path*",
        destination: "/kognitif/:path*",
      },
      // Rewrite motorik
      {
        source: "/bermain/motorik",
        destination: "/motorik",
      },
      {
        source: "/bermain/motorik/:path*",
        destination: "/motorik/:path*",
      },
      // Rewrite video
      {
        source: "/bermain/video",
        destination: "/video",
      },
      {
        source: "/bermain/video/:path*",
        destination: "/video/:path*",
      },
      // Rewrite mengeja
      {
        source: "/bermain/mengeja",
        destination: "/mengeja",
      },
      {
        source: "/bermain/mengeja/:path*",
        destination: "/mengeja/:path*",
      },
      // Rewrite kuis
      {
        source: "/bermain/kuis",
        destination: "/kuis",
      },
      {
        source: "/bermain/kuis/:path*",
        destination: "/kuis/:path*",
      },
      // Rewrite tebak-gambar
      {
        source: "/bermain/tebak-gambar",
        destination: "/tebak-gambar",
      },
      {
        source: "/bermain/tebak-gambar/:path*",
        destination: "/tebak-gambar/:path*",
      },
      // Rewrite tebak-suara
      {
        source: "/bermain/tebak-suara",
        destination: "/tebak-suara",
      },
      {
        source: "/bermain/tebak-suara/:path*",
        destination: "/tebak-suara/:path*",
      },
    ];
  },
};

module.exports = nextConfig;