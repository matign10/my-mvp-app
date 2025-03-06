/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ckpkelcgoaqeceumwoov.supabase.co'],
  },
  // Configuración para optimización de producción
  compress: true,
  poweredByHeader: false,
  // Configuración para TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },
  // Configuración para ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Configuración para manejo de variables de entorno
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },
  // Configuración para manejo de rutas
  async headers() {
    return [
      {
        source: '/auth/callback',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    return config
  },
};

module.exports = nextConfig;