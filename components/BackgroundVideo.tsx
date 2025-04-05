'use client';

import { useEffect, useRef, useState } from 'react';

export default function BackgroundVideo() {
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  // Efecto para manejar el evento resize
  useEffect(() => {
    // Inicializar el estado
    handleResize();

    // Agregar listener
    window.addEventListener('resize', handleResize);

    // Limpiar listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Efecto para reiniciar el video cuando cambia la fuente
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load(); // Recargar el video
      video.play().catch(error => {
        console.error('Error al reproducir el video:', error);
      });
    }
  }, [isMobile]);

  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full"
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        <source 
          src={isMobile ? "/videos/law-office-mobile.mp4" : "/videos/law-office.mp4"} 
          type="video/mp4" 
        />
        Tu navegador no soporta el elemento de video.
      </video>
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1
        }}
      />
    </div>
  );
} 