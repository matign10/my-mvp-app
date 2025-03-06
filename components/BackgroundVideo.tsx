'use client';

import { useEffect, useRef, useState } from 'react';

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Verificar al montar el componente
    checkMobile();

    // Escuchar cambios en el tamaño de la ventana
    window.addEventListener('resize', checkMobile);

    // Reproducir el video
    const video = videoRef.current;
    if (video) {
      video.play().catch(error => {
        console.log("Error al reproducir el video:", error);
      });
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {isMobile ? (
        // Versión móvil: imagen estática
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/images/law-office-mobile.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'scale(1.2)',
            transformOrigin: 'center'
          }}
        />
      ) : (
        // Versión desktop: video
        <video
          ref={videoRef}
          className="absolute w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          style={{
            objectPosition: 'center',
            minHeight: '100%',
            minWidth: '100%',
            width: 'auto',
            height: 'auto'
          }}
        >
          <source src="/videos/law-office.mp4" type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>
  );
} 