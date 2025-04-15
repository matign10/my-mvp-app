'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './VideoBackground.module.css';

interface VideoBackgroundProps {
  videoUrl: string;
  fallbackImageUrl: string;
  overlayOpacity?: number;
  className?: string;
}

export default function VideoBackground({
  videoUrl,
  fallbackImageUrl,
  overlayOpacity = 0.5,
  className = '',
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoSupported, setIsVideoSupported] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleError = () => {
      setIsVideoSupported(false);
    };

    video.addEventListener('error', handleError);
    return () => video.removeEventListener('error', handleError);
  }, []);

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
        >
          <source src={videoUrl} type="video/mp4" />
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