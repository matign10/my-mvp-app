"use client"
import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  // Inicializar con null para indicar que aún no se ha determinado
  const [matches, setMatches] = useState<boolean | null>(null)
  
  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query)
      
      // Establecer el valor inicial
      setMatches(media.matches)
      
      const listener = () => setMatches(media.matches)
      media.addEventListener("change", listener)
      return () => media.removeEventListener("change", listener)
    }
  }, [query])
  
  // Devolver false durante la hidratación (SSR)
  return matches === null ? false : matches
} 