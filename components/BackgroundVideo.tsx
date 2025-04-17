'use client';

import { useEffect, useState, useRef } from 'react';

export default function BackgroundVideo() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Función para manejar la carga del video
    const handleVideoLoad = () => {
      setIsLoading(false);
    };

    // Función para manejar errores del video
    const handleVideoError = () => {
      console.error('Error al cargar el video');
      setHasError(true);
      setIsLoading(false);
    };

    // Agregar event listeners
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('loadeddata', handleVideoLoad);
      videoElement.addEventListener('error', handleVideoError);

      // Si el video ya está cargado cuando se monta el componente
      if (videoElement.readyState >= 3) {
        setIsLoading(false);
      }
    }

    return () => {
      // Limpiar event listeners
      if (videoElement) {
        videoElement.removeEventListener('loadeddata', handleVideoLoad);
        videoElement.removeEventListener('error', handleVideoError);
      }
    };
  }, []);

  // Reiniciar el video cuando se recarga la página
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && videoRef.current) {
        // Reiniciar el video cuando la página vuelve a ser visible
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(err => {
          console.error('Error al reproducir el video:', err);
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  if (hasError) {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-screen overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 animate-pulse" />
      )}
      <video
        ref={videoRef}
        id="hero-video"
        className={`absolute w-full h-full object-cover transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ 
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: '50% 0%',
          zIndex: '-1'
        }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/fallback-bg.jpg"
      >
        <source
          src="https://res.cloudinary.com/dogis73ig/video/upload/v1744745295/ihop10gv427qvocsm2e4.mp4"
          type="video/mp4"
        />
      </video>
      {/* Overlay oscuro para mejorar la legibilidad del texto */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />
    </div>
  );
}