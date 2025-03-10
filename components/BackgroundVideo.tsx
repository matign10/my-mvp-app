'use client';

import { useEffect, useRef, useState } from 'react';

export default function BackgroundVideo() {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Función para verificar si es móvil
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    // Verificar al inicio
    checkMobile();

    // Escuchar cambios en el tamaño de ventana
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Reproducir videos cuando cambia el estado móvil
  useEffect(() => {
    const playVideo = () => {
      if (isMobile) {
        if (mobileVideoRef.current) {
          mobileVideoRef.current.play().catch(e => console.log('Error al reproducir video móvil:', e));
        }
      } else {
        if (desktopVideoRef.current) {
          desktopVideoRef.current.play().catch(e => console.log('Error al reproducir video desktop:', e));
        }
      }
    };

    playVideo();
  }, [isMobile]);

  return (
    <>
      {/* Capa de video para escritorio */}
      {!isMobile && (
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={desktopVideoRef}
            className="absolute top-0 left-0 w-full h-[120vh] object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/videos/law-office.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/20 dark:from-black/70 dark:via-black/50 dark:to-black/40"></div>
        </div>
      )}

      {/* Capa de video para móvil */}
      {isMobile && (
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={mobileVideoRef}
            className="absolute top-0 left-0 w-full h-full object-contain md:object-cover"
            style={{ objectPosition: 'center 20%' }}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/videos/law-office-mobile.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/20 dark:from-black/70 dark:via-black/50 dark:to-black/40"></div>
        </div>
      )}
    </>
  );
}