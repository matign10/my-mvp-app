'use client';

import { useEffect, useState } from 'react';
import BackgroundVideo from 'react-background-video-player';

export default function VideoBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Inicializar el estado
    handleResize();

    // Agregar listener para cambios de tamaño
    window.addEventListener('resize', handleResize);

    // Limpiar listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <BackgroundVideo
        src={isMobile ? '/videos/law-office-mobile.mp4' : '/videos/law-office.mp4'}
        autoPlay
        loop
        muted
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
} 