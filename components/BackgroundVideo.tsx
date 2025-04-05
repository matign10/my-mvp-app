'use client';

import { useEffect, useState, useRef } from 'react';

export default function BackgroundVideo() {
  const [isMounted, setIsMounted] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsMounted(true);
    
    // Intenta reproducir el video cuando el componente se monte
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Error reproduciendo el video:', error);
        setVideoError(true);
      });
    }
  }, []);

  if (!isMounted) {
    return (
      <div className="fixed inset-0 w-full h-full -z-10 bg-[#2d3436]">
        <div className="absolute inset-0 bg-black/50" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <video
        ref={videoRef}
        className="absolute min-w-full min-h-full object-cover"
        autoPlay
        muted
        playsInline
        onError={(e) => {
          console.error('Error en el video:', e);
          setVideoError(true);
        }}
        style={{ display: videoError ? 'none' : 'block' }}
      >
        <source 
          src="/videos/law-office.mp4" 
          type="video/mp4"
          onError={(e) => {
            console.error('Error cargando el video:', e);
            setVideoError(true);
          }}
        />
        Tu navegador no soporta el elemento video.
      </video>
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
} 