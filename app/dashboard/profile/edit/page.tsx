'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function EditProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    specialties: '',
    phone: '',
    email: ''
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    const userData = JSON.parse(storedUser);
    setUser(userData);
    setFormData({
      name: userData.name || '',
      title: userData.title || '',
      bio: userData.bio || '',
      specialties: userData.specialties || '',
      phone: userData.phone || '',
      email: userData.email || ''
    });
  }, [router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí implementaremos la lógica para actualizar el perfil
    console.log({ ...formData, avatar });
    // Por ahora solo redirigimos al dashboard
    router.push('/dashboard');
  };

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f8f9fa] pt-[104px]">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#2d3436]">
              Editar Perfil
            </h1>
            <button
              onClick={() => router.back()}
              className="text-[#636e72] hover:text-[#2d3436]"
            >
              Volver
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-32 h-32 mb-4">
                <Image
                  src={preview || '/images/avatar-placeholder.jpg'}
                  alt="Avatar"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <input
                type="file"
                id="avatar"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="avatar"
                className="cursor-pointer text-[#2d3436] hover:text-[#636e72]"
              >
                Cambiar foto
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#2d3436] mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-[#b2bec3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d3436]"
                  required
                />
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-[#2d3436] mb-2">
                  Título profesional
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-[#b2bec3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d3436]"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="bio" className="block text-sm font-medium text-[#2d3436] mb-2">
                  Biografía
                </label>
                <textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-[#b2bec3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d3436]"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="specialties" className="block text-sm font-medium text-[#2d3436] mb-2">
                  Especialidades
                </label>
                <input
                  type="text"
                  id="specialties"
                  value={formData.specialties}
                  onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
                  className="w-full px-4 py-2 border border-[#b2bec3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d3436]"
                  placeholder="Ej: Derecho Civil, Derecho Laboral"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#2d3436] mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-[#b2bec3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d3436]"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#2d3436] mb-2">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-[#b2bec3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d3436]"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border border-[#b2bec3] rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#2d3436] text-white rounded-md hover:bg-[#1e1e1e] transition-colors"
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
} 