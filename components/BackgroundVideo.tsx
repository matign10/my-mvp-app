'use client';

import React, { useEffect, useRef, useState } from 'react';

interface BackgroundVideoProps {}

export default function BackgroundVideo({}: BackgroundVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Efecto para precargar el video
  useEffect(() => {
    const preloadVideo = async () => {
      const video = videoRef.current;
      if (video) {
        try {
          await new Promise((resolve) => {
            video.onloadeddata = resolve;
            video.load();
          });
          setIsLoaded(true);
        } catch (error) {
          console.error('Error al cargar el video:', error);
          setIsLoaded(true); // Mostramos el video de todos modos
        }
      }
    };

    preloadVideo();
  }, []);

  if (!isLoaded) {
    return (
      <div className="absolute inset-0 w-full h-full bg-[#2d3436] animate-pulse" />
    );
  }

  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full"
        style={{
          objectFit: 'cover',
          objectPosition: 'center center',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        <source 
          src="/videos/law-office-mobile.mp4" 
          type="video/mp4"
          media="(max-width: 768px)"
        />
        <source 
          src="/videos/law-office.mp4" 
          type="video/mp4"
          media="(min-width: 769px)"
        />
        Tu navegador no soporta el elemento de video.
      </video>
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1
        }}
      />
    </div>
  );
} 