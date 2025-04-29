'use client';

import { useEffect, useState, useRef } from 'react';

// Define las URLs de tus videos
const HORIZONTAL_VIDEO_URL = "/videos/DamaJusticiaPC.mp4"; // Asegurar que esta es la URL correcta para PC
const VERTICAL_VIDEO_URL = "/videos/DamaJusticiaPCMovil.mp4"; // Nueva URL local para móvil

// Punto de corte para considerar 'móvil' (ej. Tailwind 'md' breakpoint es 768px)
const MOBILE_BREAKPOINT = 768;

export default function BackgroundVideo() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const initialCheckDone = useRef(false);

  // Efecto para detectar el tamaño de pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      console.log(`[Screen Size] Detected ${mobile ? 'mobile' : 'desktop'} view`);
    };

    if (typeof window !== 'undefined' && !initialCheckDone.current) {
      checkScreenSize();
      initialCheckDone.current = true;
    }

    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Efecto para manejar la carga y reproducción del video
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const videoSrc = isMobile ? VERTICAL_VIDEO_URL : HORIZONTAL_VIDEO_URL;
    console.log(`[Video Setup] Setting source to: ${videoSrc}`);
    
    videoElement.src = videoSrc;
    setIsLoading(true);
    setHasError(false);

    const handleCanPlay = () => {
      console.log('[Video Event] Can play');
      setIsLoading(false);
      videoElement.play()
        .then(() => console.log('[Video] Playing successfully'))
        .catch(err => console.warn('[Video Warning] Autoplay failed:', err));
    };

    const handleError = (e: Event) => {
      console.error('[Video Error]', e);
      setHasError(true);
      setIsLoading(false);
    };

    const handleLoadStart = () => {
      console.log('[Video Event] Load started');
      setIsLoading(true);
    };

    videoElement.addEventListener('canplay', handleCanPlay);
    videoElement.addEventListener('error', handleError);
    videoElement.addEventListener('loadstart', handleLoadStart);

    // Forzar la carga del video
    try {
      videoElement.load();
      console.log('[Video] Load called');
    } catch (err) {
      console.error('[Video Error] Load failed:', err);
      setHasError(true);
    }

    return () => {
      videoElement.removeEventListener('canplay', handleCanPlay);
      videoElement.removeEventListener('error', handleError);
      videoElement.removeEventListener('loadstart', handleLoadStart);
    };
  }, [isMobile]);

  // --- Efecto: Manejar visibilidad de la pestaña --- 
  useEffect(() => {
    const handleVisibilityChange = () => {
      // Solo intentar play si el video existe y la pestaña está visible
      if (document.visibilityState === 'visible' && videoRef.current && videoRef.current.readyState >= 3) {
        console.log("[Event] Visibility changed to visible, attempting to play video.");
        videoRef.current.play().catch(err => console.warn('[Warning] Play on visibility change failed:', err));
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
        console.log("[Effect cleanup] Removing visibility listener.");
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        }
  }, []); 

  // --- Renderizado --- 

  if (hasError) {
    console.error('[Render] Showing error fallback');
    return (
      <div className="absolute inset-0 w-full h-screen bg-black flex items-center justify-center">
        <p className="text-white">Error al cargar el video</p>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-screen overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 animate-pulse z-10" />
      )}
      
      <video
        ref={videoRef}
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
        autoPlay
      />
    </div>
  );
}