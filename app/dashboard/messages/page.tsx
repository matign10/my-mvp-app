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
  created_at: string;
  read: boolean;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError(null);

        // Verificar usuario
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData?.user) {
          router.push('/login');
          return;
        }

        // Obtener mensajes
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        setMessages(data || []);
      } catch (err: any) {
        console.error('Error al cargar mensajes:', err);
        setError('No se pudieron cargar los mensajes: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [router]);

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ read: true })
        .eq('id', messageId);

      if (error) throw error;

      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      ));
    } catch (err: any) {
      console.error('Error al marcar mensaje como leído:', err);
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
          Mensajes
        </h1>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {messages.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-[#636e72]">
              No hay mensajes nuevos.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`bg-white rounded-lg shadow-md p-6 ${
                  !message.read ? 'border-l-4 border-[#2d3436]' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-[#2d3436]">
                      {message.subject}
                    </h2>
                    <p className="text-sm text-[#636e72]">
                      De: {message.name} ({message.email})
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#636e72]">
                      {new Date(message.created_at).toLocaleDateString()}
                    </p>
                    {!message.read && (
                      <button
                        onClick={() => markAsRead(message.id)}
                        className="text-sm text-[#2d3436] hover:underline mt-2"
                      >
                        Marcar como leído
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-[#2d3436] whitespace-pre-wrap">
                  {message.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 