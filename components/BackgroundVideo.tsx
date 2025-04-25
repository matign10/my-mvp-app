'use client';

import { useEffect, useState, useRef } from 'react';

// Define las URLs de tus videos
const HORIZONTAL_VIDEO_URL = "/Videos/DamaJusticiaPC.mp4"; // Asegurar que esta es la URL correcta para PC
const VERTICAL_VIDEO_URL = "/Videos/DamaJusticiaPCMovil.mp4"; // Nueva URL local para móvil

// Punto de corte para considerar 'móvil' (ej. Tailwind 'md' breakpoint es 768px)
const MOBILE_BREAKPOINT = 768;

export default function BackgroundVideo() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  // Estado para la URL del video actual
  const [videoSrc, setVideoSrc] = useState(HORIZONTAL_VIDEO_URL);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Efecto para determinar qué video usar basado en el ancho de la pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      const targetSrc = isMobile ? VERTICAL_VIDEO_URL : HORIZONTAL_VIDEO_URL;
      // Solo actualizar si la fuente necesita cambiar (evita bucles)
      // Comparamos con videoRef.current.currentSrc para ser más precisos
      if (targetSrc !== videoRef.current?.currentSrc) { 
          console.log(`Screen check: Setting video source to ${isMobile ? 'VERTICAL' : 'HORIZONTAL'} (${targetSrc})`);
          setVideoSrc(targetSrc); // Actualizar el estado dispara re-render y el efecto de listeners
          setIsLoading(true); // Mostrar carga al cambiar fuente
          // No necesitamos llamar a load() explícitamente aquí,
          // cambiar la key del video lo fuerza a recargar.
      }
    };
    
    checkScreenSize(); // Ejecutar al montar
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize); // Limpiar listener
    
  // Solo necesita ejecutarse al montar, la lógica interna maneja cambios
  }, []); 

  // Efecto para manejar la carga y errores del video (simplificado)
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleLoadStart = () => {
        console.log("Video loadstart...");
        setIsLoading(true);
    }
    const handleLoadedData = () => { 
        console.log("Video loadeddata.");
        setIsLoading(false);
        // Intentar reproducir una vez que los datos están listos
        videoElement.play().catch(err => console.warn("Autoplay warning after load:", err));
    } 
    const handleError = (e: Event) => {
      console.error('Video Error:', videoSrc, e);
      setHasError(true);
      setIsLoading(false);
    };

    // Adjuntar listeners
    videoElement.addEventListener('loadstart', handleLoadStart);
    videoElement.addEventListener('loadeddata', handleLoadedData);
    videoElement.addEventListener('error', handleError);

    // Comprobar si ya estaba listo (ej. caché del navegador)
    if (videoElement.readyState >= 3) {
        handleLoadedData(); 
    }
    
    // Función de limpieza para remover listeners
    return () => {
      console.log("Cleaning up video event listeners for source:", videoElement.currentSrc);
      videoElement.removeEventListener('loadstart', handleLoadStart);
      videoElement.removeEventListener('loadeddata', handleLoadedData);
      videoElement.removeEventListener('error', handleError);
    };
  // Este efecto SÍ depende de videoSrc, para re-adjuntar listeners al video nuevo
  }, [videoSrc]); 

  // Efecto para visibilidad (sin cambios)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && videoRef.current) {
        console.log("Visibility changed to visible, attempting to play video.");
        // Intenta reproducir al volver a la pestaña (por si se pausó)
        videoRef.current.play().catch(err => console.warn('Play on visibility change warning:', err));
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  if (hasError) {
    // Fallback simplificado si hay error
    console.error("Error state triggered, rendering fallback background.");
    return (
      <div className="absolute inset-0 w-full h-screen overflow-hidden bg-black" />
    );
  }

  console.log(`Rendering Video - isLoading: ${isLoading}, videoSrc: ${videoSrc}`);

  return (
    <div className="absolute inset-0 w-full h-screen overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 animate-pulse z-10" />
      )}
      {/* Video: Usar key={videoSrc} y source dinámico */}
      <video
        ref={videoRef}
        key={videoSrc} // <-- Clave para forzar recarga al cambiar src
        id="hero-video"
        className={`
          absolute w-full h-full z-0 
          object-contain object-center md:object-cover md:object-[50%_0%] 
          transition-opacity duration-500 ease-in-out 
          ${isLoading ? 'opacity-0' : 'opacity-100'}
        `}
        style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
        muted 
        playsInline
        loop 
        preload="auto"
      >
        <source
          src={videoSrc} // <-- Usar la variable de estado dinámica
          type="video/mp4"
        />
      </video>
      
      {/* Overlay oscuro eliminado para mostrar el video sin filtros */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-60 z-20 pointer-events-none" /> */}
    </div>
  );
}