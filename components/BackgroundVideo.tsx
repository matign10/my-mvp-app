'use client';

import React, { useEffect, useState } from 'react';
import { 
  MediaPlayer, 
  MediaProvider, 
  Poster, 
  Track,
  useMediaState
} from 'vidstack/react';
import 'vidstack/styles/defaults.css';
import 'vidstack/styles/community-skin/video.css';

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
      <MediaPlayer
        className="absolute w-full h-full"
        autoplay
        loop
        muted
        playsinline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
      >
        <MediaProvider>
          <source 
            src={isMobile ? "/videos/law-office-mobile.mp4" : "/videos/law-office.mp4"} 
            type="video/mp4" 
            data-src={isMobile ? "/videos/law-office-mobile.mp4" : "/videos/law-office.mp4"}
          />
          <Poster 
            className="vds-poster" 
            src={isMobile ? "/videos/law-office-mobile.jpg" : "/videos/law-office.jpg"} 
            alt="Video background" 
          />
        </MediaProvider>
      </MediaPlayer>
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        style={{ zIndex: 1 }}
      />
    </div>
  );
} 