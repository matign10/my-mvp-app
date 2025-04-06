'use client';

import { useEffect, useRef, useState } from 'react';

export default function BackgroundVideo() {
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(error => {
        console.error('Error al reproducir el video:', error);
      });
    }
  }, [isMobile]);

  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectFit: 'cover' }}
      >
        <source
          src={isMobile ? "/videos/law-office-mobile.mp4" : "/videos/law-office.mp4"}
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
} 