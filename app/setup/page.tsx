'use client';

import { useState } from 'react';
import { createAdminUser } from '@/lib/auth-admin';

export default function SetupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('Iniciando creación de usuario...');
    setStatus('idle');

    try {
      setMessage('Verificando si el usuario existe...');
      const result = await createAdminUser(email, password);
      
      if (result.success) {
        setStatus('success');
        setMessage('Usuario creado exitosamente. Revisa tu correo para confirmar tu cuenta.');
        // Limpiar el formulario
        setEmail('');
        setPassword('');
      } else {
        setStatus('error');
        const errorMessage = result.error?.details 
          ? `${result.error.message} - ${result.error.details}`
          : result.error?.message || 'Error desconocido';
        setMessage(`Error al crear el usuario: ${errorMessage}`);
      }
    } catch (err) {
      setStatus('error');
      setMessage('Error inesperado al crear el usuario. Por favor, intenta nuevamente.');
      console.error('Error en setup:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-[#2d3436] text-center mb-8">
            Configuración Inicial
          </h1>

          {message && (
            <div className={`mt-4 p-4 rounded-md ${
              status === 'error' ? 'bg-red-50 text-red-700' :
              status === 'success' ? 'bg-green-50 text-green-700' :
              'bg-blue-50 text-blue-700'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#2d3436] mb-2"
              >
                Correo electrónico del administrador
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-[#b2bec3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d3436]"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#2d3436] mb-2"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-[#b2bec3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d3436]"
                required
                minLength={6}
                disabled={loading}
              />
              <p className="mt-1 text-sm text-[#636e72]">
                La contraseña debe tener al menos 6 caracteres
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 bg-[#2d3436] text-white rounded-md hover:bg-[#1e1e1e] transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Creando usuario...' : 'Crear usuario administrador'}
            </button>

            {status === 'success' && (
              <p className="mt-4 text-sm text-center text-[#636e72]">
                Ya puedes{' '}
                <a href="/login" className="text-[#2d3436] hover:underline">
                  iniciar sesión
                </a>
                .
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
} 