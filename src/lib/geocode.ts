// lib/geocode.ts
export async function getCoordinatesFromAddress(address: string) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
    );
    const data = await response.json();
  
    if (data.length > 0) {
      const { lat, lon } = data[0];
      return { lat: parseFloat(lat), lon: parseFloat(lon) };
    }
  
    return null;
  }
  