'use client';

import { CldVideoPlayer } from 'next-cloudinary';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CldVideoPlayer.Provider cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}>
      {children}
    </CldVideoPlayer.Provider>
  );
} 