'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

interface Settings {
  notifications_enabled: boolean;
  email_notifications: boolean;
  language: string;
  theme: 'light' | 'dark' | 'system';
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    notifications_enabled: true,
    email_notifications: true,
    language: 'es',
    theme: 'light'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        setError(null);

        // Verificar usuario
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData?.user) {
          router.push('/login');
          return;
        }

        // Obtener configuración
        const { data, error } = await supabase
          .from('user_settings')
          .select('*')
          .eq('user_id', userData.user.id)
          .single();

        if (error && error.code !== 'PGRST116') throw error;

        if (data) {
          setSettings(data);
        }
      } catch (err: any) {
        console.error('Error al cargar configuración:', err);
        setError('No se pudo cargar la configuración: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: userData.user!.id,
          ...settings,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      setSuccess('Configuración guardada correctamente');
    } catch (err: any) {
      console.error('Error al guardar configuración:', err);
      setError('No se pudo guardar la configuración: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

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
          Configuración
        </h1>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <p className="text-green-700">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-[#2d3436] mb-4">
              Notificaciones
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="notifications_enabled" className="font-medium text-[#2d3436]">
                    Notificaciones del sistema
                  </label>
                  <p className="text-sm text-[#636e72]">
                    Recibe notificaciones sobre actividad importante
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="notifications_enabled"
                  checked={settings.notifications_enabled}
                  onChange={(e) => setSettings({ ...settings, notifications_enabled: e.target.checked })}
                  className="h-4 w-4 text-[#2d3436] focus:ring-[#2d3436] border-gray-300 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="email_notifications" className="font-medium text-[#2d3436]">
                    Notificaciones por correo
                  </label>
                  <p className="text-sm text-[#636e72]">
                    Recibe actualizaciones importantes por correo electrónico
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="email_notifications"
                  checked={settings.email_notifications}
                  onChange={(e) => setSettings({ ...settings, email_notifications: e.target.checked })}
                  className="h-4 w-4 text-[#2d3436] focus:ring-[#2d3436] border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-[#2d3436] mb-4">
              Preferencias
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="language" className="block font-medium text-[#2d3436] mb-1">
                  Idioma
                </label>
                <select
                  id="language"
                  value={settings.language}
                  onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#2d3436] focus:border-[#2d3436] sm:text-sm rounded-md"
                >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div>
                <label htmlFor="theme" className="block font-medium text-[#2d3436] mb-1">
                  Tema
                </label>
                <select
                  id="theme"
                  value={settings.theme}
                  onChange={(e) => setSettings({ ...settings, theme: e.target.value as Settings['theme'] })}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#2d3436] focus:border-[#2d3436] sm:text-sm rounded-md"
                >
                  <option value="light">Claro</option>
                  <option value="dark">Oscuro</option>
                  <option value="system">Sistema</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-md text-[#636e72] hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-[#2d3436] text-white rounded-md hover:bg-[#1e1e1e] disabled:opacity-50"
            >
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
} 