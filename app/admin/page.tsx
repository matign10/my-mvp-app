'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

export default function AdminPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/messages?page=${page}&limit=10`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al cargar mensajes');
      }

      setMessages(data.messages);
      setTotalPages(data.totalPages);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [page]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const toggleRead = async (id: string, currentRead: boolean) => {
    try {
      const response = await fetch('/api/messages', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, read: !currentRead }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar mensaje');
      }

      fetchMessages();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('¿Está seguro de eliminar este mensaje?')) {
      return;
    }

    try {
      const response = await fetch(`/api/messages?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar mensaje');
      }

      fetchMessages();
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Cerrar sesión
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {messages.map((message) => (
              <li key={message.id} className={`p-4 ${message.read ? 'bg-gray-50' : 'bg-white'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-900">
                        {message.subject}
                      </h3>
                      {!message.read && (
                        <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          Nuevo
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      De: {message.name} ({message.email})
                    </p>
                    <p className="mt-2 text-sm text-gray-600">{message.message}</p>
                  </div>
                  <div className="ml-4 flex items-center space-x-4">
                    <button
                      onClick={() => toggleRead(message.id, message.read)}
                      className={`px-3 py-1 rounded-md text-sm ${
                        message.read
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                    >
                      {message.read ? 'Marcar como no leído' : 'Marcar como leído'}
                    </button>
                    <button
                      onClick={() => deleteMessage(message.id)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex justify-center">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              Página {page} de {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              Siguiente
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
} 