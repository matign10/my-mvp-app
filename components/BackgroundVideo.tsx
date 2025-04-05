'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const VideoPlayer = dynamic(() => import('react-background-video-player'), { ssr: false });

export default function BackgroundVideo() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Función para verificar si es un dispositivo móvil
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 768);
      }
    };

    // Verificar al montar
    checkMobile();

    // Agregar listener para cambios de tamaño
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkMobile);
    }

    // Limpiar listener
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkMobile);
      }
    };
  }, []);

  // No renderizar nada hasta que el componente esté montado
  if (!isMounted) {
    return (
      <div className="fixed inset-0 w-full h-full -z-10 bg-[#2d3436]">
        <div className="absolute inset-0 bg-black/50" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <VideoPlayer
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