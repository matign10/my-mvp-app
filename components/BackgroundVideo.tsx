'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './BackgroundVideo.module.css';

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
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
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Reproducir video y manejar errores
  useEffect(() => {
    if (!videoRef.current) return;
    
    console.log('Iniciando carga del video...');
    
    const handleCanPlay = () => {
      console.log('Video listo para reproducir');
      setIsLoaded(true);
      videoRef.current?.play().catch(err => {
        console.error('Error al reproducir el video:', err);
        setVideoError(true);
      });
    };
    
    const handleError = (e: any) => {
      console.error('Error al cargar el video:', e);
      setVideoError(true);
    };
    
    const handleLoadStart = () => {
      console.log('Video comenzando a cargar');
    };
    
    const handleLoadedData = () => {
      console.log('Video datos cargados');
    };
    
    // Agregar event listeners
    videoRef.current.addEventListener('canplay', handleCanPlay);
    videoRef.current.addEventListener('error', handleError);
    videoRef.current.addEventListener('loadstart', handleLoadStart);
    videoRef.current.addEventListener('loadeddata', handleLoadedData);
    
    // Forzar carga del video
    videoRef.current.load();
    
    console.log('Video fuente:', isMobile ? "/videos/law-office-mobile.mp4" : "/videos/law-office.mp4");
    
    // Limpiar event listeners
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('canplay', handleCanPlay);
        videoRef.current.removeEventListener('error', handleError);
        videoRef.current.removeEventListener('loadstart', handleLoadStart);
        videoRef.current.removeEventListener('loadeddata', handleLoadedData);
      }
    };
  }, [isMobile]); // Recargar video cuando cambia a/desde móvil
  
  return (
    <div className={styles.videoContainer}>
      {videoError ? (
        <div className={styles.fallback}>
          <div style={{ padding: '20px', color: 'white' }}>
            Error al cargar el video
          </div>
        </div>
      ) : (
        <>
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
          {!isLoaded && (
            <div style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: '#2d3436'
            }}>
              <div className="animate-spin h-10 w-10 border-4 border-white rounded-full border-t-transparent"></div>
            </div>
          )}
        </>
      )}
      <div className={styles.overlay}></div>
    </div>
  );
} 