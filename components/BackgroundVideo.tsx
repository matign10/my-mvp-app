'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './BackgroundVideo.module.css';

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  
  useEffect(() => {
    // Intento de reproducción manual
    if (videoRef.current) {
      const playVideo = async () => {
        try {
          await videoRef.current?.play();
        } catch (err) {
          console.error('Error al reproducir el video:', err);
          setVideoError(true);
        }
      };
      
      playVideo();
    }
    
    // Manejador de errores para el video
    const handleVideoError = () => {
      console.error('Error al cargar el video');
      setVideoError(true);
    };
    
    if (videoRef.current) {
      videoRef.current.addEventListener('error', handleVideoError);
    }
    
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('error', handleVideoError);
      }
    };
  }, []);
  
  return (
    <div className={styles.videoContainer}>
      {videoError ? (
        <div className={styles.fallback}></div>
      ) : (
        <video 
          ref={videoRef}
          className={styles.video}
          autoPlay 
          loop 
          muted 
          playsInline
          poster="/videos/law-office-mobile.jpg"
        >
          <source src="/videos/law-office-optimized.mp4" type="video/mp4" />
        </video>
      )}
      <div className={styles.overlay}></div>
    </div>
  );
} 