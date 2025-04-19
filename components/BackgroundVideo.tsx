'use client';

import { useEffect, useState, useRef } from 'react';

// Define las URLs de tus videos
const HORIZONTAL_VIDEO_URL = "https://res.cloudinary.com/dogis73ig/video/upload/v1744745295/ihop10gv427qvocsm2e4.mp4";
// --- Reemplaza esta URL con la de tu video vertical ---
const VERTICAL_VIDEO_URL = "https://res.cloudinary.com/dogis73ig/video/upload/v1745032051/law-office-mobile_online-video-cutter.com_hh0mo6.mp4"; // Ejemplo: "https://res.cloudinary.com/../vertical-video.mp4"

// Punto de corte para considerar 'móvil' (ej. Tailwind 'md' breakpoint es 768px)
const MOBILE_BREAKPOINT = 768; 
const LOOP_DURATION_SECONDS = 0.5; // Duración del segmento final a repetir

export default function BackgroundVideo() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [videoSrc, setVideoSrc] = useState(HORIZONTAL_VIDEO_URL); // Por defecto, el horizontal
  const videoRef = useRef<HTMLVideoElement>(null);
  const loopTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref para el timeout del loop

  // Efecto para determinar qué video usar basado en el ancho de la pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      const newSrc = window.innerWidth < MOBILE_BREAKPOINT ? VERTICAL_VIDEO_URL : HORIZONTAL_VIDEO_URL;
      if (newSrc !== videoRef.current?.currentSrc) { // Solo actualiza si la fuente realmente necesita cambiar
          setVideoSrc(newSrc);
          // Es importante llamar a load() para que el navegador cargue la nueva fuente
          videoRef.current?.load(); 
          console.log("Cambiando fuente de video a:", newSrc);
      }
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []); // Ejecutar solo al montar

  // Efecto para manejar la carga, errores y metadatos del video
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleLoadStart = () => setIsLoading(true);
    const handleLoadedData = () => setIsLoading(false);
    const handleError = () => {
      console.error('Error al cargar video:', videoSrc);
      setHasError(true);
      setIsLoading(false);
    };
     // Asegurarse que el video intente reproducirse al cargar
    const handleCanPlay = () => {
        videoElement.play().catch(err => console.warn("Error al intentar autoplay:", err));
    };

    videoElement.addEventListener('loadstart', handleLoadStart);
    videoElement.addEventListener('loadeddata', handleLoadedData);
    videoElement.addEventListener('error', handleError);
    videoElement.addEventListener('canplay', handleCanPlay);

    // Si ya está listo al montar
    if (videoElement.readyState >= 3) setIsLoading(false);
    
    return () => {
      videoElement.removeEventListener('loadstart', handleLoadStart);
      videoElement.removeEventListener('loadeddata', handleLoadedData);
      videoElement.removeEventListener('error', handleError);
      videoElement.removeEventListener('canplay', handleCanPlay);
    };
  }, [videoSrc]); // Depende de videoSrc

  // Efecto para el loop del segmento final
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    let loopStartTime = 0;

    const handleTimeUpdate = () => {
        if (videoElement.duration && !isNaN(videoElement.duration)) {
            // Calcula el punto de inicio del loop solo una vez que la duración esté disponible
            if (loopStartTime === 0) {
                loopStartTime = videoElement.duration - LOOP_DURATION_SECONDS;
                // Asegúrate de que loopStartTime no sea negativo si el video es muy corto
                if (loopStartTime < 0) loopStartTime = 0;
            }
            
            // Cuando el tiempo actual alcanza o supera el inicio del segmento de loop
            if (loopStartTime > 0 && videoElement.currentTime >= loopStartTime) {
                // console.log(`Looping: currentTime=${videoElement.currentTime.toFixed(2)}, loopStart=${loopStartTime.toFixed(2)}`);
                videoElement.currentTime = loopStartTime;
                // Forzar play por si acaso se detuvo (algunos navegadores pueden pausar al buscar)
                videoElement.play().catch(err => console.warn("Warn: Play en loop falló", err));
            }
        }
    };
    
    // Usar 'seeked' para reiniciar la lógica si el usuario busca manualmente
    const handleSeeked = () => {
        loopStartTime = 0; // Recalcular al buscar
    }

    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('seeked', handleSeeked);

    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('seeked', handleSeeked);
    };
  }, [videoSrc]); // Depende de videoSrc porque duration cambia

  // Efecto para reiniciar al cambiar visibilidad (ya existente)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && videoRef.current) {
        videoRef.current.play().catch(err => console.error('Error al reproducir video:', err));
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
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

  return (
    <div className="absolute inset-0 w-full h-screen overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 animate-pulse" />
      )}
      <video
        ref={videoRef}
        key={videoSrc} 
        id="hero-video"
        className={`absolute w-full h-full object-contain object-center md:object-cover md:object-[50%_0%] transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ 
          position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: '-1'
        }}
        autoPlay
        muted // Muted es crucial para autoplay en muchos navegadores
        playsInline // Importante para móviles
        preload="auto"
        poster="/images/fallback-bg.jpg"
        // loop fue eliminado
      >
        <source
          src={videoSrc} 
          type="video/mp4"
        />
      </video>
      {/* Overlay oscuro para mejorar la legibilidad del texto */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />
    </div>
  );
}