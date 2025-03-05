'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [router]);

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f8f9fa] pt-[104px]">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#2d3436]">
            Bienvenido, {user.name}
          </h1>
          <button
            onClick={() => {
              localStorage.removeItem('user');
              router.push('/login');
            }}
            className="text-[#636e72] hover:text-[#2d3436]"
          >
            Cerrar sesión
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Panel de Perfil */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-[#2d3436] mb-4">Mi Perfil</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#636e72]">Email</label>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm text-[#636e72]">Rol</label>
                <p className="font-medium capitalize">{user.role}</p>
              </div>
              <Link
                href="/dashboard/profile"
                className="inline-block text-[#2d3436] hover:text-[#636e72]"
              >
                Editar perfil →
              </Link>
            </div>
          </div>

          {/* Panel de Publicaciones */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-[#2d3436] mb-4">Mis Publicaciones</h2>
            <div className="space-y-4">
              <p className="text-[#636e72]">
                Gestiona tus publicaciones y artículos.
              </p>
              <Link
                href="/dashboard/publications"
                className="inline-block text-[#2d3436] hover:text-[#636e72]"
              >
                Administrar publicaciones →
              </Link>
            </div>
          </div>

          {/* Panel de Estadísticas */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-[#2d3436] mb-4">Estadísticas</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#636e72]">Publicaciones</p>
                  <p className="text-2xl font-bold text-[#2d3436]">0</p>
                </div>
                <div>
                  <p className="text-sm text-[#636e72]">Vistas</p>
                  <p className="text-2xl font-bold text-[#2d3436]">0</p>
                </div>
              </div>
              <Link
                href="/dashboard/stats"
                className="inline-block text-[#2d3436] hover:text-[#636e72]"
              >
                Ver más estadísticas →
              </Link>
            </div>
          </div>
        </div>

        {/* Sección de Acciones Rápidas */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-[#2d3436] mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => router.push('/dashboard/publications/new')}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
            >
              <h3 className="font-bold text-[#2d3436] mb-2">Nueva Publicación</h3>
              <p className="text-sm text-[#636e72]">Crear un nuevo artículo o publicación</p>
            </button>
            <button
              onClick={() => router.push('/dashboard/profile/edit')}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
            >
              <h3 className="font-bold text-[#2d3436] mb-2">Actualizar Perfil</h3>
              <p className="text-sm text-[#636e72]">Modificar información personal</p>
            </button>
            <button
              onClick={() => router.push('/dashboard/messages')}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
            >
              <h3 className="font-bold text-[#2d3436] mb-2">Mensajes</h3>
              <p className="text-sm text-[#636e72]">Ver mensajes de contacto</p>
            </button>
            <button
              onClick={() => router.push('/dashboard/settings')}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
            >
              <h3 className="font-bold text-[#2d3436] mb-2">Configuración</h3>
              <p className="text-sm text-[#636e72]">Ajustar preferencias del sistema</p>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
