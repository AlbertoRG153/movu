// components/carrier/Map.tsx
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LatLngExpression, LatLngTuple } from 'leaflet';

// Solución al problema de iconos en Leaflet con Next.js
// Usamos una propiedad con indice en lugar de _getIconUrl
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Definiendo tipos
interface CityType {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

interface ChangeViewProps {
  center: LatLngTuple;
  zoom: number;
}

interface MapProps {
  selectedCity: CityType | null;
}

// Componente que cambia la vista del mapa
function ChangeView({ center, zoom }: ChangeViewProps) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
}

export default function Map({ selectedCity = null }: MapProps) {
  // Coordenadas predeterminadas (Colombia)
  const defaultPosition: LatLngTuple = [4.570868, -74.297333];
  const defaultZoom = 5;
  
  // Determinar centro del mapa y nivel de zoom
  const mapCenter: LatLngTuple = selectedCity && selectedCity.latitude && selectedCity.longitude 
    ? [selectedCity.latitude, selectedCity.longitude] 
    : defaultPosition;
  
  const zoom = selectedCity && selectedCity.latitude && selectedCity.longitude ? 12 : defaultZoom;

  return (
    <MapContainer 
      center={mapCenter} 
      zoom={zoom} 
      style={{ height: '100%', width: '100%' }}
    >
      <ChangeView center={mapCenter} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {selectedCity && selectedCity.latitude && selectedCity.longitude && (
        <Marker position={[selectedCity.latitude, selectedCity.longitude] as LatLngTuple}>
          <Popup>
            {selectedCity.name}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
