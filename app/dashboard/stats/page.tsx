'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

// Define una interfaz para las publicaciones
interface Publication {
  id: string;
  title: string;
  created_at: string;
  views?: number;
  // Añade otras propiedades según tu esquema de base de datos
}

// Define una interfaz para las estadísticas
interface StatsData {
  totalPublications: number;
  totalViews: number;
  recentViews: number;
  topPublications: Publication[];
}

export default function StatsPage() {
  const [stats, setStats] = useState<StatsData>({
    totalPublications: 0,
    totalViews: 0,
    recentViews: 0,
    topPublications: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        // Verificar usuario
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData?.user) {
          router.push('/login');
          return;
        }

        // Obtener estadísticas (esto es un ejemplo, ajusta según tus necesidades)
        const { data: publications, error: pubError } = await supabase
          .from('publications')
          .select('*');

        if (pubError) throw pubError;

        // Por ahora usamos datos de ejemplo
        setStats({
          totalPublications: publications?.length || 0,
          totalViews: 0,
          recentViews: 0,
          topPublications: publications as Publication[] || []
        });

      } catch (err: any) {
        console.error('Error al cargar estadísticas:', err);
        setError('No se pudieron cargar las estadísticas: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
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
        <h1 className="text-2xl font-bold text-[#2d3436] mb-8">
          Estadísticas
        </h1>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-[#636e72] mb-2">
              Total de Publicaciones
            </h3>
            <p className="text-3xl font-bold text-[#2d3436]">
              {stats.totalPublications}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-[#636e72] mb-2">
              Vistas Totales
            </h3>
            <p className="text-3xl font-bold text-[#2d3436]">
              {stats.totalViews}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-[#636e72] mb-2">
              Vistas (Últimos 30 días)
            </h3>
            <p className="text-3xl font-bold text-[#2d3436]">
              {stats.recentViews}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-[#636e72] mb-2">
              Promedio de Vistas
            </h3>
            <p className="text-3xl font-bold text-[#2d3436]">
              {stats.totalPublications ? Math.round(stats.totalViews / stats.totalPublications) : 0}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-[#2d3436] mb-4">
            Publicaciones más vistas
          </h2>
          {stats.topPublications.length === 0 ? (
            <p className="text-[#636e72]">
              Aún no hay publicaciones para mostrar estadísticas.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#636e72] uppercase tracking-wider">
                      Título
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#636e72] uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#636e72] uppercase tracking-wider">
                      Vistas
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.topPublications.map((pub: any) => (
                    <tr key={pub.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-[#2d3436]">
                          {pub.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[#636e72]">
                          {new Date(pub.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[#636e72]">
                          {pub.views || 0}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 