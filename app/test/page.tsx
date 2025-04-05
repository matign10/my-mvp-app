'use client';

import { useEffect, useState } from 'react';
import { testSupabaseConnection } from '@/lib/supabase-test';

export default function TestPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    async function checkConnection() {
      try {
        const isConnected = await testSupabaseConnection();
        setStatus(isConnected ? 'success' : 'error');
      } catch (error) {
        console.error('Error al probar la conexión:', error);
        setStatus('error');
      }
    }

    checkConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Estado de la Conexión con Supabase</h1>
        
        {status === 'loading' && (
          <p className="text-gray-600">Verificando conexión...</p>
        )}
        
        {status === 'success' && (
          <p className="text-green-600">¡Conexión exitosa con Supabase!</p>
        )}
        
        {status === 'error' && (
          <p className="text-red-600">Error al conectar con Supabase. Verifica las credenciales.</p>
        )}
      </div>
    </div>
  );
} 