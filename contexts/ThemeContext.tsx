'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  // Al montar el componente, intentamos recuperar el tema de localStorage
  useEffect(() => {
    // Detectamos el tema preferido del sistema
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Revisamos si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    // Usamos el tema guardado o el preferido del sistema
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);

    // Aplicamos la clase dark al HTML si corresponde
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Función para alternar entre temas
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      
      // Guardamos el tema en localStorage
      localStorage.setItem('theme', newTheme);
      
      // Actualizamos la clase en el HTML
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
