"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

interface RouteModalProps {
    isOpen: boolean;
    onClose: () => void;
    coordinates: {
      pickup: [number, number];
      destination: [number, number];
    };
  }

export default function RouteModal({ isOpen, onClose, coordinates }: RouteModalProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const leafletMap = useRef<L.Map | null>(null);

    useEffect(() => {
        if (!isOpen || !mapRef.current) return;
      
        const { pickup, destination } = coordinates;
      
        if (!leafletMap.current) {
          leafletMap.current = L.map(mapRef.current).setView(pickup, 13);
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; OpenStreetMap contributors',
          }).addTo(leafletMap.current);
        } else {
          leafletMap.current.setView(pickup, 13);
        }
      
        // Limpia rutas anteriores
        leafletMap.current.eachLayer((layer) => {
          if (!(layer instanceof L.TileLayer)) {
            leafletMap.current?.removeLayer(layer);
          }
        });
      
        // Agrega nueva ruta
        // @ts-expect-error: L.Routing no esta tipado correctamente en leaflet-routing-machine
        L.Routing.control({
            waypoints: [
              L.latLng(pickup[0], pickup[1]),
              L.latLng(destination[0], destination[1]),
            ],
            routeWhileDragging: false,
            show: false,
            lineOptions: {
              styles: [{ color: 'green', weight: 5 }],
            },
          }).addTo(leafletMap.current);
      }, [isOpen, coordinates]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-lg w-full max-w-3xl h-[80vh] mx-4 relative" onClick={(e) => e.stopPropagation()}>
                <div className="p-4 flex justify-between items-center border-b">
                    <h2 className="text-xl font-bold">Ruta del viaje</h2>
                    <button onClick={onClose} className="text-red-500 font-semibold">Cerrar</button>
                </div>
                <div ref={mapRef} className="w-full h-full rounded-b-lg" />
            </div>
        </div>
    );
}