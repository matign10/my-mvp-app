'use client';

import { useEffect, useRef } from 'react';

export default function GoogleMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) return;

      const position = {
        lat: -34.5998292,
        lng: -58.3865739,
      };

      const map = new google.maps.Map(mapRef.current, {
        center: position,
        zoom: 17,
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry',
            stylers: [{ color: '#242f3e' }],
          },
          {
            featureType: 'all',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#242f3e' }],
          },
          {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#746855' }],
          },
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }],
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }],
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{ color: '#263c3f' }],
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#6b9a76' }],
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#38414e' }],
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#212a37' }],
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#9ca5b3' }],
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{ color: '#746855' }],
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#1f2835' }],
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#f3d19c' }],
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#17263c' }],
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#515c6d' }],
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#17263c' }],
          },
        ],
      });

      const marker = new google.maps.Marker({
        position,
        map,
        title: 'Estudio ECEN',
        animation: google.maps.Animation.DROP,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="font-bold text-lg">Estudio ECEN</h3>
            <p>Uruguay 763</p>
            <p>C1013 Cdad. Autónoma de Buenos Aires</p>
            <p>Argentina</p>
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=-34.5998292,-58.3865739" 
              target="_blank" 
              rel="noopener noreferrer"
              class="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Abrir en Google Maps
            </a>
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    };

    // Cargar el script de Google Maps
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBwR5Hw4V_8gC0ts1i2IDTOVaCkKNYSoCo`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full h-[450px] rounded-lg overflow-hidden shadow-lg">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
} 