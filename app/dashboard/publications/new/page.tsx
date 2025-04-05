'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import dynamic from 'next/dynamic';

// Importar el editor de texto rico de forma dinámica para evitar errores de SSR
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function NewPublicationPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      if (!title.trim()) {
        setError('El título es obligatorio');
        return;
      }

      // Obtener el usuario actual
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        throw new Error('Debes iniciar sesión para crear una publicación');
      }

      let image_url = null;
      if (image) {
        // Subir la imagen
        const fileExt = image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('publications')
          .upload(`images/${fileName}`, image);

        if (uploadError) throw uploadError;

        // Obtener la URL pública de la imagen
        const { data: { publicUrl } } = supabase.storage
          .from('publications')
          .getPublicUrl(`images/${fileName}`);

        image_url = publicUrl;
      }

      // Crear la publicación
      const { data, error: insertError } = await supabase
        .from('publications')
        .insert([
          {
            title,
            content,
            image_url,
            author_id: userData.user.id,
          }
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      // Redireccionar a la lista de publicaciones
      router.push('/dashboard/publications');
    } catch (err: any) {
      console.error('Error al crear publicación:', err);
      setError(err.message || 'Error al crear la publicación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] pt-[104px]">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#2d3436]">
              Nueva Publicación
            </h1>
            <button
              onClick={() => router.back()}
              className="text-[#636e72] hover:text-[#2d3436]"
            >
              Volver
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-[#2d3436] mb-2">
                Título
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-[#b2bec3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d3436]"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-[#2d3436] mb-2">
                Contenido
              </label>
              <ReactQuill
                value={content}
                onChange={setContent}
                className="h-64 mb-12"
                theme="snow"
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'}],
                    ['link', 'image'],
                    ['clean']
                  ],
                }}
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-[#2d3436] mb-2">
                Imagen de portada
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-[#b2bec3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d3436]"
                disabled={loading}
              />
              {preview && (
                <div className="mt-2">
                  <img
                    src={preview}
                    alt="Vista previa"
                    className="w-full max-h-48 object-cover rounded-md"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 border border-gray-300 rounded-md text-[#636e72] hover:bg-gray-50"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-[#2d3436] text-white rounded-md hover:bg-[#1e1e1e] disabled:opacity-50"
              >
                {loading ? 'Creando publicación...' : 'Crear publicación'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
} 