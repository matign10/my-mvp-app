'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const position = {
    lat: -34.5998292,
    lng: -58.3865739,
  };

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${position.lat},${position.lng}`;
  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${position.lat},${position.lng}&zoom=17&size=600x450&maptype=roadmap&markers=color:red%7C${position.lat},${position.lng}&key=AIzaSyBwR5Hw4V_8gC0ts1i2IDTOVaCkKNYSoCo`;

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;

      const loader = new Loader({
        apiKey: 'AIzaSyBwR5Hw4V_8gC0ts1i2IDTOVaCkKNYSoCo',
        version: "weekly",
      });

      try {
        await loader.load();

        const map = new window.google.maps.Map(mapRef.current, {
          center: position,
          zoom: 17,
          styles: [
            {
              featureType: 'all',
              elementType: 'geometry',
              stylers: [{ color: '#f5f5f5' }],
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#c9c9c9' }],
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{ color: '#ffffff' }],
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#e0e0e0' }],
            },
            {
              featureType: 'poi',
              elementType: 'geometry',
              stylers: [{ color: '#eeeeee' }],
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{ color: '#e5e5e5' }],
            },
          ],
        });

        const marker = new window.google.maps.Marker({
          position,
          map,
          title: 'Estudio ECEN',
          animation: window.google.maps.Animation.DROP,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: '#d97706',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 3,
          },
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 12px; font-family: system-ui, sans-serif;">
              <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 8px; color: #1a1a2e;">Estudio ECEN</h3>
              <p style="color: #666; margin-bottom: 4px;">Uruguay 763</p>
              <p style="color: #666; margin-bottom: 12px;">C1013 CABA, Argentina</p>
              <a
                href="${googleMapsUrl}"
                target="_blank"
                rel="noopener noreferrer"
                style="display: inline-block; background: #d97706; color: white; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 500;"
              >
                Cómo llegar
              </a>
            </div>
          `,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error cargando Google Maps:", error);
        setMapError(true);
        setIsLoading(false);
      }
    };

    initMap();
  }, []);

  // Fallback UI when map fails to load
  if (mapError) {
    return (
      <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 relative">
        {/* Static map image as background */}
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
  }

  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-lg relative">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mb-4" />
            <p className="text-gray-500">Cargando mapa...</p>
          </div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />

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
