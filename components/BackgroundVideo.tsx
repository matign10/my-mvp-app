'use client';

import { useEffect, useRef, useState } from 'react';

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on component mount
    checkMobile();

    // Listen for window resize
    window.addEventListener('resize', checkMobile);

    // Play video
    const video = videoRef.current;
    if (video) {
      video.play().catch(error => {
        console.log("Error playing video:", error);
      });
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <>
      {/* Overlay para oscurecer ligeramente el video */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-[1]"></div>
      
      {/* Video de escritorio */}
      {!isMobile && (
        <div className="absolute inset-0 top-[-120px] h-[120vh] w-full overflow-hidden">
          <video
            ref={videoRef}
            className="absolute w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            style={{ objectPosition: 'center center' }}
          >
            <source src="/videos/law-office.mp4" type="video/mp4" />
          </video>
        </div>
      )}
      
      {/* Video móvil */}
      {isMobile && (
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <video
            ref={videoRef}
            className="absolute w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            style={{ objectPosition: 'center center' }}
          >
            <source src="/videos/law-office-mobile.mp4" type="video/mp4" />
          </video>
        </div>
      )}
    </>
  );
}