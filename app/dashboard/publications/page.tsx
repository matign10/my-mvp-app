'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function PublicationsPage() {
  const [publications, setPublications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setLoading(true);
        setError(null);

        // Verificar usuario
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData?.user) {
          router.push('/login');
          return;
        }

        // Obtener publicaciones
        const { data, error } = await supabase
          .from('publications')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        setPublications(data || []);
      } catch (err: any) {
        console.error('Error al cargar publicaciones:', err);
        setError('No se pudieron cargar las publicaciones: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2d3436]"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f9fa] pt-[104px]">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#2d3436]">
            Mis Publicaciones
          </h1>
          <Link
            href="/dashboard/publications/new"
            className="bg-[#2d3436] text-white px-4 py-2 rounded-md hover:bg-[#1e1e1e] transition-colors"
          >
            Nueva Publicación
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {publications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-[#636e72] mb-4">
              Aún no tienes publicaciones. ¡Crea tu primera publicación!
            </p>
            <Link
              href="/dashboard/publications/new"
              className="text-[#2d3436] hover:underline"
            >
              Crear publicación →
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {publications.map((pub) => (
              <div
                key={pub.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {pub.image_url && (
                  <img
                    src={pub.image_url}
                    alt={pub.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#2d3436] mb-2">
                    {pub.title}
                  </h2>
                  <p className="text-[#636e72] mb-4 line-clamp-3">
                    {pub.content}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#636e72]">
                      {new Date(pub.created_at).toLocaleDateString()}
                    </span>
                    <Link
                      href={`/dashboard/publications/${pub.id}/edit`}
                      className="text-[#2d3436] hover:underline"
                    >
                      Editar →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 