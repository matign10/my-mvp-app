'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './BackgroundVideo.module.css';

export default function BackgroundImage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Detectar dispositivos móviles
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    
    // Verificar inmediatamente
    checkMobile();
    
    // Escuchar cambios de tamaño
    window.addEventListener('resize', checkMobile);
    setIsLoaded(true);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.imageWrapper} />
      <div className={styles.overlay} />
    </div>
  );
} 