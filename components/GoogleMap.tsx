'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    google: typeof google;
  }
}

export default function GoogleMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (typeof window.google === 'undefined') {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = initializeMap;
        document.head.appendChild(script);
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      if (!mapRef.current) return;

      // Primero creamos el mapa centrado en Buenos Aires
      const mapOptions = {
        zoom: 13,
        center: { lat: -34.603722, lng: -58.381592 }, // Centro de Buenos Aires
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: "all",
            elementType: "geometry",
            stylers: [{ color: "#242f3e" }]
          },
          {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#242f3e" }]
          },
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#746855" }]
          },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }]
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }]
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }]
          }
        ]
      };

      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, mapOptions);

      // Usar el geocodificador para obtener las coordenadas exactas
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: 'Uruguay 763, Ciudad Autónoma de Buenos Aires, Argentina' }, (results, status) => {
        if (status === 'OK' && results?.[0]) {
          const position = results[0].geometry.location;
          
          // Actualizar el centro del mapa
          mapInstanceRef.current?.setCenter(position);
          mapInstanceRef.current?.setZoom(17);

          // Crear el marcador
          markerRef.current = new window.google.maps.Marker({
            position: position,
            map: mapInstanceRef.current,
            title: "ECEN Estudio Jurídico",
            animation: window.google.maps.Animation.DROP
          });

          // Crear la ventana de información
          infoWindowRef.current = new window.google.maps.InfoWindow({
            content: `
              <div class="p-2">
                <h3 class="font-bold">ECEN Estudio Jurídico</h3>
                <p>Uruguay 763, C1015 Cdad. Autónoma de Buenos Aires, Argentina</p>
              </div>
            `
          });

          // Agregar el evento de clic al marcador
          markerRef.current.addListener("click", () => {
            if (infoWindowRef.current && markerRef.current) {
              infoWindowRef.current.open(mapInstanceRef.current, markerRef.current);
            }
          });
        } else {
          console.error('Error en la geocodificación:', status);
        }
      });
    };

    loadGoogleMaps();

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
      }
    };
  }, []);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[400px] rounded-lg shadow-lg"
    />
  );
}