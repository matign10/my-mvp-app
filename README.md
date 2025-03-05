# ECEN - Estudio Jurídico

Sitio web profesional para el estudio jurídico ECEN, desarrollado con Next.js 14, TypeScript, Tailwind CSS y Supabase.

## Características

- Diseño moderno y responsive
- Formulario de contacto con integración de email
- Mapa de Google Maps integrado
- Base de datos Supabase para almacenamiento de mensajes
- Optimizado para SEO
- Despliegue en Vercel

## Requisitos Previos

- Node.js 18.17 o superior
- npm o yarn
- Cuenta de Supabase
- Cuenta de Vercel
- API Key de Google Maps

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/ecen-website.git
cd ecen-website
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
```

3. Crea un archivo `.env.local` basado en `.env.example`:
```bash
cp .env.example .env.local
```

4. Configura las variables de entorno en `.env.local` con tus credenciales:
- Supabase URL y Anon Key
- Configuración SMTP para emails
- Google Maps API Key

5. Inicia el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

6. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Despliegue en Vercel

1. Crea una cuenta en [Vercel](https://vercel.com) si no tienes una.

2. Conecta tu repositorio de GitHub con Vercel.

3. En la configuración del proyecto en Vercel:
   - Agrega todas las variables de entorno necesarias
   - Configura el framework preset como Next.js
   - Deploy!

## Estructura del Proyecto

```
ecen-website/
├── app/                 # Rutas y páginas de Next.js
├── components/          # Componentes React reutilizables
├── lib/                 # Utilidades y configuraciones
├── public/             # Archivos estáticos
└── styles/             # Estilos globales
```

## Tecnologías Utilizadas

- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase
- Google Maps API
- React Email

## Contribución

1. Fork el proyecto
2. Crea tu Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
