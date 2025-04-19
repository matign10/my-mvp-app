'use client';

import { useEffect, useState, useRef } from 'react';

// Define las URLs de tus videos
const HORIZONTAL_VIDEO_URL = "https://res.cloudinary.com/dogis73ig/video/upload/v1744745295/ihop10gv427qvocsm2e4.mp4";
// --- Reemplaza esta URL con la de tu video vertical ---
const VERTICAL_VIDEO_URL = "URL_DEL_VIDEO_VERTICAL_AQUI"; // Ejemplo: "https://res.cloudinary.com/../vertical-video.mp4"

// Punto de corte para considerar 'móvil' (ej. Tailwind 'md' breakpoint es 768px)
const MOBILE_BREAKPOINT = 768; 

export default function BackgroundVideo() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [videoSrc, setVideoSrc] = useState(HORIZONTAL_VIDEO_URL); // Por defecto, el horizontal
  const videoRef = useRef<HTMLVideoElement>(null);

  // Efecto para determinar qué video usar basado en el ancho de la pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < MOBILE_BREAKPOINT) {
        setVideoSrc(VERTICAL_VIDEO_URL || HORIZONTAL_VIDEO_URL); // Usa vertical si existe, si no, fallback a horizontal
      } else {
        setVideoSrc(HORIZONTAL_VIDEO_URL);
      }
      // Forzar recarga del video si la fuente cambia
      videoRef.current?.load(); 
    };

    // Comprobar al montar
    checkScreenSize();

    // Comprobar al redimensionar
    window.addEventListener('resize', checkScreenSize);

    // Limpieza
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []); // Se ejecuta solo una vez al montar para añadir/quitar listeners

  useEffect(() => {
    // Función para manejar la carga del video
    const handleVideoLoad = () => {
      setIsLoading(false);
    };

    // Función para manejar errores del video
    const handleVideoError = () => {
      console.error('Error al cargar el video:', videoSrc); // Loguea qué video falló
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
  }, [videoSrc]); // Depende de videoSrc para re-adjuntar listeners si cambia la fuente

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

  if (hasError && videoSrc === VERTICAL_VIDEO_URL) {
     // Si falla el video vertical, intenta mostrar el fallback (poster o nada)
     // O podrías intentar cargar el horizontal aquí como último recurso
     console.warn("Fallo al cargar video vertical, mostrando fallback.");
     // Retorna un div simple o el poster estático
     return (
        <div className="absolute inset-0 w-full h-screen overflow-hidden bg-black">
           <img src="/images/fallback-bg.jpg" alt="Background" className="w-full h-full object-cover opacity-50" />
        </div>
     );
  }
  
  if (hasError) { // Error general o error con el video horizontal
    return (
      <div className="absolute inset-0 w-full h-screen overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        {/* Podrías mostrar el poster aquí también */}
         <img src="/images/fallback-bg.jpg" alt="Background" className="w-full h-full object-cover opacity-50" />
      </div>
    );
  }

  // Si la URL vertical no está definida, podríamos mostrar un mensaje o el fallback directamente en móvil
  if (typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT && videoSrc === HORIZONTAL_VIDEO_URL && VERTICAL_VIDEO_URL === "URL_DEL_VIDEO_VERTICAL_AQUI") {
      console.warn("Video vertical no configurado, mostrando fallback en móvil.");
       return (
        <div className="absolute inset-0 w-full h-screen overflow-hidden bg-black">
           <img src="/images/fallback-bg.jpg" alt="Background" className="w-full h-full object-cover opacity-50" />
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
        key={videoSrc} // Añadir key forza el remount del video cuando cambia src
        id="hero-video"
        // Clases responsivas: contain en móvil, cover en desktop
        className={`absolute w-full h-full object-contain object-center md:object-cover md:object-[50%_0%] transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ 
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
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
          src={videoSrc} // Usa la fuente dinámica
          type="video/mp4"
        />
      </video>
      {/* Overlay oscuro para mejorar la legibilidad del texto */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />
    </div>
  );
}