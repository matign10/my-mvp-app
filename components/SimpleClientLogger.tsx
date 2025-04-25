'use client';

import { useEffect } from 'react';

export default function SimpleClientLogger({ message }: { message: string }) {
  useEffect(() => {
    console.log(`[SimpleClientLogger] Mounted: ${message}`);
  }, [message]);

  return null; // Este componente no renderiza nada visualmente
} 