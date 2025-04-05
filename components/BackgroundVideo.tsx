'use client';

import React, { useEffect, useState } from 'react';

export default function BackgroundVideo() {
  const [isMobile, setIsMobile] = useState(false);

  // Efecto para detectar el tamaño de la pantalla
  useEffect(() => {
    // Función para actualizar el estado isMobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Verificar al cargar
    checkMobile();

    // Agregar listener para cambios de tamaño
    window.addEventListener('resize', checkMobile);

    // Limpiar listener
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ zIndex: 0 }}>
      <video
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
        style={{ zIndex: 1 }}
      />
    </div>
  );
} 