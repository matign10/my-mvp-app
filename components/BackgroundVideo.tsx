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
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            className={`
              absolute w-full h-full object-cover
              ${isMobile ? 'scale-150' : 'scale-100'}
              transition-transform duration-300 ease-in-out
            `}
            autoPlay
            loop
            muted
            playsInline
            style={{
              objectPosition: 'center',
              aspectRatio: '16/9',
              minHeight: '100%',
              minWidth: '100%',
              width: 'auto',
              height: 'auto'
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