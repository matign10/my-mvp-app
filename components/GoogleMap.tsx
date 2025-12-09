'use client';

import { useState } from 'react';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';

export default function GoogleMap() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  const position = {
    lat: -34.5998292,
    lng: -58.3865739,
  };

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${position.lat},${position.lng}`;

  // Fallback UI
  const FallbackContent = () => (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 relative">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6">
          <MapPin className="w-10 h-10 text-amber-600" />
        </div>

        <h3 className="text-2xl font-bold text-[#2d3436] mb-2">Estudio ECEN</h3>
        <p className="text-gray-600 mb-1">Uruguay 763</p>
        <p className="text-gray-600 mb-6">C1013 CABA, Argentina</p>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <Navigation className="w-5 h-5" />
            Cómo llegar
          </a>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${position.lat},${position.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300 border border-gray-200 shadow-md hover:shadow-lg"
          >
            <ExternalLink className="w-5 h-5" />
            Ver en Google Maps
          </a>
        </div>
      </div>
    </div>
  );

  if (iframeError) {
    return <FallbackContent />;
  }

  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-lg relative bg-gray-100">
      {/* Loading state */}
      {!iframeLoaded && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mb-4" />
            <p className="text-gray-500">Cargando mapa...</p>
          </div>
        </div>
      )}

      {/* Google Maps iframe - no API key required for embed */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016887889555!2d-58.38876122427728!3d-34.599829272953986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacf5dcb5c45%3A0x8e0e7d4e2a8b0c0f!2sUruguay%20763%2C%20C1013%20CABA%2C%20Argentina!5e0!3m2!1ses-419!2sar!4v1701649200000!5m2!1ses-419!2sar&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación de Estudio ECEN"
        onLoad={() => setIframeLoaded(true)}
        onError={() => setIframeError(true)}
        className={`transition-opacity duration-500 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Floating action button */}
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 z-20"
      >
        <Navigation className="w-4 h-4" />
        Cómo llegar
      </a>
    </div>
  );
}
