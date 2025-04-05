'use client';

import { useEffect, useRef, useState } from 'react';

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  // Función para actualizar el ancho de la ventana
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // Inicializar el ancho de la ventana
    updateWindowWidth();

    // Agregar listener para cambios de tamaño
    window.addEventListener('resize', updateWindowWidth);

    // Limpiar listener al desmontar
    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []);

  // Efecto para manejar la reproducción del video
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const playVideo = async () => {
        try {
          await video.play();
          setIsLoading(false);
        } catch (error) {
          console.error("Error al reproducir el video:", error);
          setIsLoading(false);
        }
      };
      playVideo();
    }
  }, []);

  // Determinar qué video usar basado en el ancho de la ventana
  const videoSource = windowWidth <= 768 
    ? "/videos/law-office-mobile.mp4" 
    : "/videos/law-office.mp4";

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ top: '80px' }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%'
        }}
      >
        <source 
          src={videoSource}
          type="video/mp4" 
        />
        Tu navegador no soporta el elemento de video.
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>
  );
} 