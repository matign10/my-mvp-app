'use client';

import { useEffect, useState } from 'react';

export default function BackgroundVideo() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Asegurarnos de que el script de Cloudinary esté cargado
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/cloudinary-video-player@1.9.9/dist/cld-video-player.min.js';
    script.async = true;
    document.body.appendChild(script);

    // Agregar el CSS necesario
    const link = document.createElement('link');
    link.href = 'https://unpkg.com/cloudinary-video-player@1.9.9/dist/cld-video-player.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const video = document.getElementById('hero-video') as HTMLVideoElement;
    if (video) {
      video.onloadeddata = () => {
        setIsLoading(false);
      };
    }

    return () => {
      // Limpieza al desmontar
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 animate-pulse" />
      )}
      <video
        id="hero-video"
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/q_auto,f_auto/ihop10gv427qvocsm2e4.mp4`}
          type="video/mp4"
        />
      </video>
      {/* Overlay oscuro para mejorar la legibilidad del texto */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />
    </div>
  );
}