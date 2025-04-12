'use client';

import React, { useEffect, useState } from 'react';
import styles from './BackgroundVideo.module.css';

export default function BackgroundVideo() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Función para detectar si es un dispositivo móvil
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Verificar al cargar
    checkMobile();
    
    // Actualizar en cambios de tamaño
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className={styles.hero}>
      <video 
        muted 
        autoPlay 
        loop 
        playsInline
        className={styles.video}
      >
        <source 
          src={isMobile ? "/videos/law-office-mobile.mp4" : "/videos/law-office.mp4"} 
          type="video/mp4" 
        />
      </video>
      <div className={styles.capa}></div>
    </div>
  );
} 