"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

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
        if (typeof window === "undefined" || !isOpen || !mapRef.current) return;

        import("leaflet").then((L) => {
            import("leaflet-routing-machine").then(() => {
                if (!leafletMap.current) {
                    leafletMap.current = L.map(mapRef.current!).setView(coordinates.pickup, 13);
                    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                        attribution: '&copy; OpenStreetMap contributors',
                    }).addTo(leafletMap.current!);
                } else {
                    leafletMap.current.setView(coordinates.pickup, 13);
                }

                leafletMap.current.eachLayer((layer: L.Layer) => {
                    if (!(layer instanceof L.TileLayer)) {
                        leafletMap.current?.removeLayer(layer);
                    }
                });

                if ("Routing" in L) {
                    L.Routing.control({
                        waypoints: [
                            L.latLng(coordinates.pickup[0], coordinates.pickup[1]),
                            L.latLng(coordinates.destination[0], coordinates.destination[1]),
                        ],
                        routeWhileDragging: false,
                        show: false,
                        lineOptions: {
                            styles: [{ color: 'green', weight: 5 }],
                            extendToWaypoints: true,
                            missingRouteTolerance: 10
                        },
                    }).addTo(leafletMap.current!);
                } else {
                    console.error("Leaflet Routing Machine no está disponible en L.");
                }
            }).catch(err => console.error("Error al importar leaflet-routing-machine:", err));
        }).catch(err => console.error("Error al importar leaflet:", err));

    }, [isOpen, coordinates]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-lg w-full max-w-3xl h-[80vh] mx-4 relative" onClick={(e) => e.stopPropagation()}>
                <div className="p-4 flex justify-between items-center border-b bg-white">
                    <h2 className="text-xl font-bold text-gray-800">Ruta del viaje</h2>
                    <button onClick={onClose} className="text-red-500 font-semibold">Cerrar</button>
                </div>

                {/* Mapa */}
                <div ref={mapRef} className="w-full h-full rounded-b-lg" />
            </div>
        </div>
    );
}
