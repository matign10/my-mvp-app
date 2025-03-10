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
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <div className="absolute top-20 left-0 right-0 z-10 p-4 text-center text-white bg-black bg-opacity-40">
            <p className="text-lg md:text-xl font-semibold">Estudio Jurídico Comprometido con Su Éxito</p>
          </div>
          <video
            ref={videoRef}
            className={`
              absolute w-full h-full object-cover
              ${isMobile ? 'object-contain md:object-cover' : 'object-cover'}
              transition-all duration-300 ease-in-out
            `}
            autoPlay
            loop
            muted
            playsInline
            style={{
              objectPosition: 'center',
              height: isMobile ? '100vh' : '100%',
              width: isMobile ? 'auto' : '100%',
              maxWidth: isMobile ? 'none' : '100%',
              maxHeight: isMobile ? 'none' : '100%'
            }}
          >
            <source src="/videos/law-office.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>
  );
} 