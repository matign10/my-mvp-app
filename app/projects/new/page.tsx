'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function NewProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('El título es obligatorio');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Obtener el usuario actual
      const { data: userData, error: userError } = await supabase.auth.getUser();
      
      if (userError || !userData?.user) {
        throw new Error('Por favor inicia sesión para crear un proyecto');
      }
      
      // Crear el proyecto
      const { data, error } = await supabase
        .from('projects')
        .insert([
          {
            title,
            description,
            is_public: isPublic,
            owner_id: userData.user.id,
          },
        ])
        .select();
      
      if (error) throw error;
      
      // Redireccionar al dashboard después de crear
      router.push('/dashboard');
      
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al crear el proyecto');
      console.error('Error al crear proyecto:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Crear nuevo proyecto
            </h1>
            
            {error && (
              <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-500 p-4 mb-6">
                <p className="text-red-700 dark:text-red-200">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Título *
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Descripción
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    id="is_public"
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_public" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Hacer proyecto público
                  </label>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Los proyectos públicos pueden ser vistos por cualquier usuario autenticado.
                </p>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => router.push('/dashboard')}
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? 'Creando...' : 'Crear proyecto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
