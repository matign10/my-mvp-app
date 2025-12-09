'use client';

import { Navigation } from 'lucide-react';

export default function GoogleMap() {
  const position = {
    lat: -34.5998292,
    lng: -58.3865739,
  };

  // Using coordinates only to avoid Google adding floor info
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${position.lat},${position.lng}&travelmode=driving`;

  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-lg relative bg-gray-100">
      {/* Google Maps iframe - simple centered view */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1642.0!2d-58.3865739!3d-34.5998292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1701649200000"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación de Estudio ECEN"
      />

      {/* Overlay with address info */}
      <div className="absolute top-0 left-0 w-72 h-32 bg-white z-10 rounded-br-2xl shadow-sm flex items-center justify-center">
        <div className="text-center px-4">
          <p className="font-semibold text-[#2d3436]">Estudio ECEN</p>
          <p className="text-sm text-gray-600">Uruguay 763, Piso 5°</p>
          <p className="text-sm text-gray-600">C1013, CABA, Argentina</p>
        </div>
      </div>

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
