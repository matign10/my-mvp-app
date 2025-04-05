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
    <div className="fixed inset-0 w-full h-full -z-10">
      <video
        className="absolute w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/law-office.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
} 