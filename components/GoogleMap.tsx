'use client';

import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export default function GoogleMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: "weekly",
      libraries: ["marker", "places"]
    });

    let map: google.maps.Map;
    let marker: google.maps.marker.AdvancedMarkerElement;
    let infoWindow: google.maps.InfoWindow;

    const initializeMap = async () => {
      if (!mapRef.current) return;

      const { Map } = await loader.importLibrary('maps') as typeof google.maps;
      const { AdvancedMarkerElement } = await loader.importLibrary('marker') as typeof google.maps.marker;
      const { InfoWindow } = await loader.importLibrary('maps') as typeof google.maps;

      const exactPosition = {
        lat: -34.599829,
        lng: -58.389149
      };

      const mapOptions = {
        zoom: 18,
        center: exactPosition,
        mapId: '2817715e78c388d7',
        mapTypeId: 'roadmap',
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

      map = new Map(mapRef.current, mapOptions);
      mapInstanceRef.current = map;

      marker = new AdvancedMarkerElement({
        position: exactPosition,
        map: map,
        title: "ECEN Estudio Jurídico",
      });
      markerRef.current = marker;

      const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${exactPosition.lat},${exactPosition.lng}`;

      infoWindow = new InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="font-bold">ECEN Estudio Jurídico</h3>
            <p>Uruguay 763, C1015 Cdad. Autónoma de Buenos Aires</p>
            <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 hover:underline mt-1 inline-block">
              Obtener direcciones
            </a>
          </div>
        `
      });
      infoWindowRef.current = infoWindow;

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    };

    initializeMap();

    return () => {
      markerRef.current = null;
      infoWindowRef.current?.close();
      infoWindowRef.current = null;
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] rounded-lg shadow-lg overflow-hidden">
      <div 
        ref={mapRef} 
        className="w-full h-full"
      />
    </div>
  );
}