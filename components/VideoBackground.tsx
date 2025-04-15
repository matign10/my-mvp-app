'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './VideoBackground.module.css';
import { useMediaQuery } from '../hooks/use-media-query';

interface VideoBackgroundProps {
  videoUrl: string;
  mobileVideoSrc?: string;
  fallbackImageUrl: string;
  overlayOpacity?: number;
  className?: string;
}

export default function VideoBackground({
  videoUrl,
  mobileVideoSrc,
  fallbackImageUrl,
  overlayOpacity = 0.5,
  className = '',
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoSupported, setIsVideoSupported] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Determinar qué video usar basado en el dispositivo
  const currentVideoUrl = isMobile && mobileVideoSrc ? mobileVideoSrc : videoUrl;

  // Marcar el componente como montado después de la hidratación
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Manejar la carga inicial del video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleError = () => {
      setIsVideoSupported(false);
      setIsLoading(false);
    };

    const handleLoadedData = () => {
      setIsLoading(false);
    };

    video.addEventListener('error', handleError);
    video.addEventListener('loadeddata', handleLoadedData);
    
    return () => {
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  // Actualizar la fuente del video cuando cambia el dispositivo
  useEffect(() => {
    if (videoRef.current && isMounted) {
      setIsLoading(true);
      videoRef.current.src = currentVideoUrl;
      videoRef.current.load();
    }
  }, [currentVideoUrl, isMounted]);

  // Si el componente aún no está montado, mostrar la imagen de respaldo
  if (!isMounted) {
    return (
      <div className={`${styles.videoContainer} ${className}`}>
        <img
          src={fallbackImageUrl}
          alt="Background"
          className={styles.fallbackImage}
        />
        <div
          className={styles.overlay}
          style={{ opacity: overlayOpacity }}
        />
      </div>
    );
  }

  return (
    <div className={`${styles.videoContainer} ${className}`}>
      {isVideoSupported ? (
        <>
          <video
            ref={videoRef}
            className={styles.video}
            autoPlay
            muted
            loop
            playsInline
            key={currentVideoUrl} // Forzar re-render cuando cambia la URL
          >
            <source src={currentVideoUrl} type="video/mp4" />
          </video>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </>
      ) : (
        <img
          src={fallbackImageUrl}
          alt="Background"
          className={styles.fallbackImage}
        />
      )}
      <div
        className={styles.overlay}
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
} 