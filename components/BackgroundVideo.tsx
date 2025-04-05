'use client';

import { useEffect, useRef, useState } from 'react';

export default function BackgroundVideo() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Función para manejar el cambio de tamaño de ventana
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  // Efecto para manejar el evento resize
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Efecto para precargar recursos
  useEffect(() => {
    const preloadResources = async () => {
      if (isMobile) {
        // Precargar imagen para móviles
        const img = new Image();
        img.src = '/videos/law-office-mobile.jpg';
        await new Promise((resolve) => {
          img.onload = resolve;
        });
      } else {
        // Precargar video para desktop
        const video = videoRef.current;
        if (video) {
          await new Promise((resolve) => {
            video.onloadeddata = resolve;
            video.load();
          });
        }
      }
      setIsLoaded(true);
    };

    preloadResources();
  }, [isMobile]);

  // Efecto para manejar el efecto de paralaje en móviles
  useEffect(() => {
    if (!isMobile || !containerRef.current) return;

    const container = containerRef.current;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;
      
      if (container) {
        const translateY = diff * 0.5; // Factor de paralaje suave
        container.style.transform = `translateY(${translateY}px)`;
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  if (!isLoaded) {
    return (
      <div className="absolute inset-0 w-full h-full bg-[#2d3436] animate-pulse" />
    );
  }

  return (
    <div 
      ref={containerRef}
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
      {isMobile ? (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url(/videos/law-office-mobile.jpg)',
            transform: 'scale(1.1)', // Pequeño zoom para evitar bordes blancos durante el paralaje
          }}
        />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        >
          <source src="/videos/law-office.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      )}
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