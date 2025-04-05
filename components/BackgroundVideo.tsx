'use client';

import { useEffect, useState } from 'react';

export default function BackgroundVideo() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="fixed inset-0 w-full h-full -z-10 bg-[#2d3436]">
        <div className="absolute inset-0 bg-black/50" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
      <video
        className="absolute min-w-full min-h-full w-auto h-auto object-cover"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <source src="/videos/law-office.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50" />
      <style jsx>{`
        @media (max-width: 768px) {
          video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transform: none;
            top: 0;
            left: 0;
          }
        }
      `}</style>
    </div>
  );
} 