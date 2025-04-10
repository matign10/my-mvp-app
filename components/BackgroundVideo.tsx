'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './BackgroundVideo.module.css';

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detectar dispositivos móviles
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    
    // Verificar inmediatamente
    checkMobile();
    
    // Escuchar cambios de tamaño
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Reproducir video y manejar errores
  useEffect(() => {
    if (!videoRef.current) return;
    
    const handleCanPlay = () => {
      videoRef.current?.play().catch(err => {
        console.error('Error al reproducir el video:', err);
        setVideoError(true);
      });
    };
    
    const handleError = () => {
      console.error('Error al cargar el video');
      setVideoError(true);
    };
    
    // Agregar event listeners
    videoRef.current.addEventListener('canplay', handleCanPlay);
    videoRef.current.addEventListener('error', handleError);
    
    // Forzar carga del video
    videoRef.current.load();
    
    // Limpiar event listeners
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('canplay', handleCanPlay);
        videoRef.current.removeEventListener('error', handleError);
      }
    };
  }, [isMobile]); // Recargar video cuando cambia a/desde móvil
  
  return (
    <div className={styles.videoContainer}>
      {videoError ? (
        <div className={styles.fallback}></div>
      ) : (
        <video 
          ref={videoRef}
          className={styles.video}
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
        >
          <source 
            src={isMobile ? "/videos/law-office-mobile.mp4" : "/videos/law-office.mp4"} 
            type="video/mp4" 
          />
        </video>
      )}
      <div className={styles.overlay}></div>
    </div>
  );
} 