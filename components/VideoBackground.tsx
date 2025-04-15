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
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Determinar qué video usar basado en el dispositivo
  const currentVideoUrl = isMobile && mobileVideoSrc ? mobileVideoSrc : videoUrl;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleError = () => {
      setIsVideoSupported(false);
    };

    video.addEventListener('error', handleError);
    return () => video.removeEventListener('error', handleError);
  }, []);

  // Actualizar la fuente del video cuando cambia el dispositivo
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = currentVideoUrl;
      videoRef.current.load();
    }
  }, [currentVideoUrl]);

  return (
    <div className={`${styles.videoContainer} ${className}`}>
      {isVideoSupported ? (
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