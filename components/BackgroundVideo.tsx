'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

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
      <div className="relative w-full h-full animate-ken-burns">
        <Image
          src="/videos/law-office-mobile.jpg"
          alt="Law Office Background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
      </div>
      <div className="absolute inset-0 bg-black/50" />
      <style jsx global>{`
        @keyframes kenBurns {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-ken-burns {
          animation: kenBurns 20s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
} 