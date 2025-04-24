"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

// Icono por defecto
const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LocationMarkers({
  setCoords,
  coords,
}: {
  setCoords: (coords: [LatLngExpression | null, LatLngExpression | null]) => void;
  coords: [LatLngExpression | null, LatLngExpression | null];
}) {
  useMapEvents({
    click(e: L.LeafletMouseEvent) {
      const newCoords = [...coords] as [LatLngExpression | null, LatLngExpression | null];

      if (!coords[0]) {
        newCoords[0] = [e.latlng.lat, e.latlng.lng];
      } else {
        newCoords[1] = [e.latlng.lat, e.latlng.lng];
      }

      setCoords(newCoords);
    },
  });

  return (
    <>
      {coords[0] && (
        <Marker position={coords[0]} icon={defaultIcon}>
          <Popup>Origen</Popup>
        </Marker>
      )}
      {coords[1] && (
        <Marker position={coords[1]} icon={defaultIcon}>
          <Popup>Destino</Popup>
        </Marker>
      )}
    </>
  );
}

// Calculo con ORS
async function getORSRouteDistance(
  origin: [number, number],
  destination: [number, number]
): Promise<number> {
  const response = await fetch(
    "https://api.openrouteservice.org/v2/directions/driving-car",
    {
      method: "POST",
      headers: {
        Authorization: process.env.NEXT_PUBLIC_ORS_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coordinates: [
          [origin[1], origin[0]], // ORS usa [lng, lat]
          [destination[1], destination[0]],
        ],
      }),
    }
  );

  if (!response.ok) throw new Error("Error al consultar ORS");

  const data = await response.json();
  const meters = data.routes[0].summary.distance;
  return meters / 1000; // Convertimos a km
}

export function MapModal({
  open,
  setOpen,
  onConfirm,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: (
    coords: [LatLngExpression | null, LatLngExpression | null],
    distanceKm: number
  ) => void;
}) {
  const [coords, setCoords] = useState<[LatLngExpression | null, LatLngExpression | null]>([
    null,
    null,
  ]);

  const handleConfirm = async () => {
    if (!coords[0] || !coords[1]) return;

    const origin = coords[0] as [number, number];
    const destination = coords[1] as [number, number];

    try {
      const distance = await getORSRouteDistance(origin, destination);
      console.log("Distancia ORS:", distance, "km");
      onConfirm(coords, distance);
      setOpen(false);
    } catch (error) {
      console.error("Error al calcular la distancia con ORS:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl h-[650px] p-0 overflow-hidden">
        <DialogHeader className="p-4">
          <DialogTitle>Selecciona origen y destino</DialogTitle>
        </DialogHeader>

        <div className="relative h-full w-full">
          <MapContainer
            center={[14.0723, -87.1921]}
            zoom={13}
            className="h-[500px] w-full z-0"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarkers coords={coords} setCoords={setCoords} />
          </MapContainer>

          <DialogFooter className="absolute bottom-4 right-4 space-x-2">
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </button>
            <button
              className="w-full py-6 bg-emerald-400 hover:bg-emerald-500 text-white rounded-md"
              onClick={handleConfirm}
              disabled={!coords[0] || !coords[1]}
            >
              Confirmar
            </button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}