/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  // Configuración para manejo de rutas y cabeceras de seguridad
  async headers() {
    return [
      {
        // Aplica estas cabeceras a todas las rutas
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            // OJO: Asegúrate de que tu sitio funcione 100% en HTTPS
            // max-age corto (1 día) para empezar, sin preload.
            // Aumentar max-age gradualmente si todo va bien.
            value: 'max-age=86400; includeSubDomains',
          },
        ],
      },
      // Mantenemos la configuración específica anterior por si se reutiliza la ruta
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