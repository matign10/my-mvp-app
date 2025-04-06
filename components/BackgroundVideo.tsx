'use client';

import { useEffect, useRef, useState } from 'react';

export default function BackgroundVideo() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Determinar si es móvil
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Manejar la carga del video
  useEffect(() => {
    if (videoRef.current) {
      // Eventos para manejar estados del video
      const handleLoadStart = () => {
        setIsLoading(true);
        setHasError(false);
      };
      
      const handleCanPlay = () => {
        setIsLoading(false);
        videoRef.current?.play().catch(error => {
          console.error('Error al reproducir el video:', error);
          setHasError(true);
        });
      };
      
      const handleError = (e: any) => {
        console.error('Error con el video:', e);
        setHasError(true);
        setIsLoading(false);
      };

      // Agregar event listeners
      videoRef.current.addEventListener('loadstart', handleLoadStart);
      videoRef.current.addEventListener('canplay', handleCanPlay);
      videoRef.current.addEventListener('error', handleError);
      
      // Forzar la recarga del video cuando cambia la fuente
      videoRef.current.load();

      // Cleanup
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('loadstart', handleLoadStart);
          videoRef.current.removeEventListener('canplay', handleCanPlay);
          videoRef.current.removeEventListener('error', handleError);
        }
      };
    }
  }, [isMobile]);

  // Ruta del video actual
  const videoSrc = isMobile ? "/videos/law-office-mobile.mp4" : "/videos/law-office.mp4";

  return (
    <div className="fixed inset-0 w-full h-full" style={{ zIndex: -10 }}>
      {isLoading && (
        <div className="absolute inset-0 bg-[#2d3436] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
      
      {hasError && (
        <div className="absolute inset-0 bg-[#2d3436]">
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}
      
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectFit: 'cover' }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
} 