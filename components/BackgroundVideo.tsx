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
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div className="absolute inset-0 top-[-80px]">
        <video
          ref={videoRef}
          className="absolute w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          {isMobile ? (
            <source src="/videos/law-office-mobile.mp4" type="video/mp4" />
          ) : (
            <source src="/videos/law-office.mp4" type="video/mp4" />
          )}
        </video>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
    </div>
  );
}