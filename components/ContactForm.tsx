'use client';

import { useState, useEffect } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (status === 'success') {
      timeoutId = setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await response.json();
      } catch (error) {
        throw new Error('Error al procesar la respuesta del servidor');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el mensaje');
      }

      setStatus('success');
      setMessage('Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      setStatus('error');
      setMessage(error.message || 'Error al enviar el mensaje. Por favor, intenta nuevamente.');
      console.error('Error en el formulario:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div className={`p-4 rounded-md ${
          status === 'success' ? 'bg-green-50 text-green-700' :
          status === 'error' ? 'bg-red-50 text-red-700' :
          'bg-blue-50 text-blue-700'
        }`}>
          {message}
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#2d3436] mb-2">
          Nombre completo
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
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
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-[#b2bec3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d3436]"
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-[#2d3436] mb-2">
          Asunto
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-[#b2bec3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d3436]"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#2d3436] mb-2">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          required
          className="w-full px-4 py-2 border border-[#b2bec3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d3436]"
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className={`w-full bg-[#2d3436] text-white py-2 px-4 rounded-md hover:bg-[#1e1e1e] transition-colors ${
          status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
      </button>
    </form>
  );
} 