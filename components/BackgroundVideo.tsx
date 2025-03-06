'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(error => {
        console.log("Error al reproducir el video:", error);
      });
    }
  }, []);

  return (
    <div className="relative w-full h-screen">
      <video
        ref={videoRef}
        className="absolute w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/law-office.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>
  );
} 