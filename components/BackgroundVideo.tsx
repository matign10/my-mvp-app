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
  // Iniciar videoSrc como null para evitar mismatch de hidratación
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Ref para asegurar que la detección inicial solo corra una vez en el cliente
  const initialCheckDone = useRef(false); 

  // --- Efecto: Determinar video por tamaño de pantalla (SOLO CLIENT-SIDE) --- 
  useEffect(() => {
    console.log("[Effect run] Checking screen size...");
    const checkScreenSize = () => {
      // Solo ejecutar si el componente está montado
      if (!videoRef.current) return;
      
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      const targetSrc = isMobile ? VERTICAL_VIDEO_URL : HORIZONTAL_VIDEO_URL;
      
      // En la primera ejecución (cliente), O si la fuente necesita cambiar por resize
      if (!initialCheckDone.current || targetSrc !== videoRef.current?.currentSrc) {
        console.log(`[checkScreenSize] Setting video source to ${isMobile ? 'VERTICAL' : 'HORIZONTAL'} (${targetSrc})`);
        setVideoSrc(targetSrc); 
        setIsLoading(true); 
        if (!initialCheckDone.current) {
          initialCheckDone.current = true; // Marcar que la comprobación inicial se hizo
        }
      } else {
          console.log("[checkScreenSize] Source is already correct, no change needed.");
      }
    };
    
    checkScreenSize(); // Ejecutar al montar en cliente
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
        console.log("[Effect cleanup] Removing resize listener.");
        window.removeEventListener('resize', checkScreenSize);
    }
  }, []); // Ejecutar solo al montar en el cliente

  // --- Efecto: Manejar eventos del video (carga, error, autoplay) --- 
  useEffect(() => {
    // No hacer nada si videoSrc aún no está definido
    if (!videoSrc) {
        console.log("[Effect video events] Skipping, videoSrc is null.");
        return;
    }

    console.log(`[Effect video events] Attaching listeners for src: ${videoSrc}`);
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Resetear estados al cambiar de fuente (por si acaso)
    setIsLoading(true);
    setHasError(false);

    const handleLoadStart = () => {
        console.log("[Event] Video loadstart...");
        setIsLoading(true);
    }
    const handleLoadedData = () => { 
        console.log("[Event] Video loadeddata.");
        setIsLoading(false);
        console.log("[Action] Attempting to play video...");
        videoElement.play().catch(err => console.warn("[Warning] Autoplay after load failed:", err));
    } 
    const handleError = (e: Event) => {
      console.error('[Error] Video loading error:', videoSrc, e);
      setHasError(true);
      setIsLoading(false);
    };

    videoElement.addEventListener('loadstart', handleLoadStart);
    videoElement.addEventListener('loadeddata', handleLoadedData);
    videoElement.addEventListener('error', handleError);

    // Necesitamos forzar la carga aquí porque el src se establece dinámicamente
    // y el atributo 'key' podría no ser suficiente si el src cambia de null a un valor
    console.log("[Action] Calling videoElement.load()");
    videoElement.load();

    // Comprobar si ya estaba listo (improbable con .load(), pero por seguridad)
    if (videoElement.readyState >= 3) {
        console.log("[Info] Video readyState >= 3 on mount, running handleLoadedData.");
        handleLoadedData(); 
    }
    
    return () => {
      console.log("[Effect video events cleanup] Removing listeners for source:", videoElement.currentSrc);
      videoElement.removeEventListener('loadstart', handleLoadStart);
      videoElement.removeEventListener('loadeddata', handleLoadedData);
      videoElement.removeEventListener('error', handleError);
    };
  }, [videoSrc]); // Re-ejecutar cuando videoSrc cambie (de null a URL, o entre URLs)

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

  // Si videoSrc es null, no renderizar el video aún (evita mostrar tag <video> vacío)
  if (!videoSrc) {
    console.log("Rendering null (videoSrc is null)");
    // Puedes mostrar un fondo estático o el loader aquí si lo prefieres
    return <div className="absolute inset-0 w-full h-screen overflow-hidden bg-gray-900 animate-pulse z-10" />;
  }
  
  if (hasError) {
    console.error("Rendering fallback (hasError is true)");
    return (
      <div className="absolute inset-0 w-full h-screen overflow-hidden bg-black" />
    );
  }

  console.log(`Rendering video element - isLoading: ${isLoading}, videoSrc: ${videoSrc}`);

  return (
    <div className="absolute inset-0 w-full h-screen overflow-hidden">
      {/* Indicador de carga visual */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 animate-pulse z-10" />
      )}
      
      {/* Elemento Video */} 
      <video
        ref={videoRef}
        key={videoSrc} 
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
        preload="auto" // Dejar que el navegador decida, pero llamaremos a load()
      >
        {/* Ya no necesitamos el tag <source> si asignamos src directamente */}
        {/* <source src={videoSrc} type="video/mp4" /> */}
      </video>
    </div>
  );
}