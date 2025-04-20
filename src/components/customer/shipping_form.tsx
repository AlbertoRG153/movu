"use client";

import type React from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export default function ShippingForm() {
 //   const TU_API_KEY = '5b3ce3597851110001cf624853dde1eac4cd4916b7bc93bb823e8532';
  //  const [distance, setDistance] = useState(null);
    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [pickupTime, setPickupTime] = useState({
        date: "",
        hour: "",
        minute: "",
    });
    const [description, setDescription] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [rate, setRate] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [serviceType, setServiceType] = useState("");
    const [weight, setWeight] = useState("");
    const [volume, setVolume] = useState("");
    const [pesoCarga, setPesoCarga] = useState("Kg"); // Default to Kg

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({
            destination,
            pickup,
            pickupTime,
            description,
            vehicleType,
            rate,
            image,
            serviceType,
            weight: serviceType === "flete" ? weight : null,
            volume: serviceType === "flete" ? volume : null, // Solo incluye peso y volumen si es flete
            pesoCarga: serviceType === "flete" ? pesoCarga : null, // Solo incluye tipo de peso si es flete
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    interface VehicleType {
        id: string;
        name: string;
        load_capacity_kg: number;
        volume: number;
    }

    // In your component:
    const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);

    // Fetch vehicle types on component mount
    useEffect(() => {
        const fetchVehicleTypes = async () => {
            try {
                const { data, error } = await supabase
                    .from("vehicle_type")
                    .select("*");

                if (error) throw error;
                if (data) {
                    setVehicleTypes(data);
                }
            } catch (error) {
                console.error("Error fetching vehicle types:", error);
            }
        };
        fetchVehicleTypes();
    }, []);
    /** funcion para obtener distancia de direcciones
     * useEffect(() => {
        const getCoordinates = async (address: string) => {
          const res = await fetch(`https://api.openrouteservice.org/geocode/search?api_key=${TU_API_KEY}&text=${encodeURIComponent(address)}`);
          const data = await res.json();
          return data.features[0]?.geometry.coordinates; // [lon, lat]
        };
    
        const calculateDistance = async () => {
          if (!pickup || !destination) return;
    
          try {
            const from = await getCoordinates(pickup);
            const to = await getCoordinates(destination);
    
            if (!from || !to) return;
    
            const res = await fetch('https://api.openrouteservice.org/v2/directions/driving-car', {
              method: 'POST',
              headers: {
                'Authorization': TU_API_KEY,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                coordinates: [from, to],
              }),
            });
    
            const data = await res.json();
            setDistance(data.routes[0].summary.distance); // en metros
          } catch (error) {
            console.error("Error al calcular la distancia:", error);
          }
        };
    
        calculateDistance();
      }, [pickup, destination]); // recalcular cada vez que cambie pickup o destination
     */
    
    const calculateSuggestedPrice = () => {
        const distancia = 10; // Estático por ahora
        const selectedVehicleData = vehicleTypes.find((v) => v.id === vehicleType);
        if (!selectedVehicleData) {
            return 0;
        }
        const nombreToClaveTarifa: Record<string, string> = {"Pickup": "pickup","Volqueta": "volqueta","Camión de Mudanza Pequeño": "camion_pequeno","Camión de Mudanza Mediano": "camion_mediano","Camión de Mudanza Grande": "camion_grande","Camión de Carga Mediano": "camion_carga_mediano","Camión de Carga Grande": "camion_carga_grande",};
    
        const tarifas: Record<string, { base: number; km: number; kg?: number; m3?: number }> = {
            pickup: { base: 500, km: 10, kg: 2, m3: 5 },
            camion_pequeno: { base: 700, km: 12, kg: 2.5, m3: 6 },
            camion_mediano: { base: 900, km: 14, kg: 3, m3: 7 },
            camion_grande: { base: 1200, km: 18, kg: 3.5, m3: 8 },
            volqueta: { base: 1100, km: 16, kg: 3.2, m3: 7.5 },
            camion_carga_mediano: { base: 1500, km: 20, kg: 4, m3: 9 },
            camion_carga_grande: { base: 2000, km: 25, kg: 5, m3: 10 },
        };
    
        const tipoVehiculo = nombreToClaveTarifa[selectedVehicleData.name];
        const tarifa = tarifas[tipoVehiculo];
    
        if (!tarifa) {
            return 0;
        }
        let precioFinal = tarifa.base + distancia * tarifa.km;
    
        if (serviceType === "mudanza") {
            // Sumar L 800 si es mudanza
            precioFinal += 800;
        } else if (serviceType === "flete") {
            const tipoCarga = pesoCarga?.trim();
            const w = parseFloat(weight);
            const v = parseFloat(volume);
    
            if (tipoCarga === "Kg" && tarifa.kg && !isNaN(w)) {
                const maxWeight = selectedVehicleData.load_capacity_kg;
                const pesoFinal = Math.min(w, maxWeight);
                precioFinal += pesoFinal * tarifa.kg;
            } else if (tipoCarga === "m³" && tarifa.m3 && !isNaN(v)) {
                const maxVolumen = selectedVehicleData.volume;
                const volumenFinal = Math.min(v, maxVolumen);
                precioFinal += volumenFinal * tarifa.m3;
            }
        }
        return precioFinal;
    };
    const [precioSugerido, setPrecioSugerido] = useState(0);
    useEffect(() => {
        const nuevoPrecio = calculateSuggestedPrice();
        setPrecioSugerido(nuevoPrecio);
        console.log(calculateSuggestedPrice());
    }, [vehicleType, serviceType, pesoCarga, weight, volume, vehicleTypes]);    

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-white p-4 flex items-center justify-center shadow-sm">
                <h1 className="text-center font-medium text-lg">
                    Solicitud de Viaje
                </h1>
                <div className="w-6"></div> {/* Spacer for alignment */}
            </header>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 p-4 space-y-4">
                {/* Pickup Location */}
                <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                        Lugar de recogida
                    </label>
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <Input
                            placeholder="Seleccione un lugar"
                            value={destination}
                            onChange={(e) => setPickup(e.target.value)}
                            className="border-none shadow-none focus-visible:ring-0 p-0 h-auto"
                        />
                    </div>
                </div>

                {/* Destination */}
                <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                        Destino
                    </label>
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <Input
                            placeholder="Seleccione un lugar"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="border-none shadow-none focus-visible:ring-0 p-0 h-auto"
                        />
                    </div>
                </div>
                {/**<p className="text-sm text-gray-700 mb-1 block">Distancia estimada: {distance ? `${(distance / 1000).toFixed(2)} km` : '...'} </p> */}
                {/* Pickup Time */}
                <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                        Hora de recogida
                    </label>
                    <div className="flex gap-2">
                        <div className="bg-white rounded-lg shadow-sm p-4 flex-1">
                            <Input
                                placeholder="Fecha"
                                value={pickupTime.date}
                                onChange={(e) =>
                                    setPickupTime({
                                        ...pickupTime,
                                        date: e.target.value,
                                    })
                                }
                                className="border-none shadow-none focus-visible:ring-0 p-0 h-auto"
                            />
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-4 flex-1">
                            <Input
                                placeholder="Hora"
                                value={pickupTime.hour}
                                onChange={(e) =>
                                    setPickupTime({
                                        ...pickupTime,
                                        hour: e.target.value,
                                    })
                                }
                                className="border-none shadow-none focus-visible:ring-0 p-0 h-auto"
                            />
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-4 flex-1">
                            <Input
                                placeholder="Minuto"
                                value={pickupTime.minute}
                                onChange={(e) =>
                                    setPickupTime({
                                        ...pickupTime,
                                        minute: e.target.value,
                                    })
                                }
                                className="border-none shadow-none focus-visible:ring-0 p-0 h-auto"
                            />
                        </div>
                    </div>
                </div>

                {/* Tipo de servicio */}
                <div>
                    <label className="text-sm text-gray-700 mb-2 block">
                        ¿Qué tipo de servicio necesitas?
                    </label>
                    <div className="flex gap-4">
                        <label className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-2 cursor-pointer w-full">
                            <input
                                type="radio"
                                name="serviceType"
                                value="flete"
                                checked={serviceType === "flete"}
                                onChange={() => setServiceType("flete")}
                                className="accent-emerald-400"
                            />
                            <span className="text-gray-700">Flete</span>
                        </label>
                        <label className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-2 cursor-pointer w-full">
                            <input
                                type="radio"
                                name="serviceType"
                                value="mudanza"
                                checked={serviceType === "mudanza"}
                                onChange={() => setServiceType("mudanza")}
                                className="accent-emerald-400"
                            />
                            <span className="text-gray-700">Mudanza</span>
                        </label>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                        Descripción de su {serviceType || "servicio"}
                    </label>

                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <Textarea
                            placeholder={`Describa su ${
                                serviceType || "servicio"
                            }`}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border-none shadow-none focus-visible:ring-0 p-0 h-auto min-h-[80px] resize-none"
                        />
                    </div>
                </div>   
                {/* Peso de carga - Solo visible para fletes */}
                {serviceType === "flete" && (
                    <div>
                        <label className="text-sm text-gray-700 mb-2 block">
                            Peso de la carga
                        </label>

                        <div className="flex gap-4">
                            <label className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-2 cursor-pointer w-full">
                                <input
                                    type="radio"
                                    name="pesoCarga"
                                    value="Kg"
                                    checked={pesoCarga === "Kg"}
                                    onChange={() => setPesoCarga("Kg")}
                                    className="accent-emerald-400"
                                />
                                <span className="text-gray-700">Kg</span>
                            </label>

                            <label className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-2 cursor-pointer w-full">
                                <input
                                    type="radio"
                                    name="pesoCarga"
                                    value="m³"
                                    checked={pesoCarga === "m³"}
                                    onChange={() => setPesoCarga("m³")}
                                    className="accent-emerald-400"
                                />
                                <span className="text-gray-700">m³</span>
                            </label>
                        </div>
                     {/* Volumen de carga - Solo visible para fletes con método m³ */}
                    {serviceType === "flete" && pesoCarga === "m³" && (
                        <div className="mt-4">
                            <label className="text-sm text-gray-700 mb-1 block">
                                Volumen de la carga (m³)
                            </label>
                        <div className="bg-white rounded-lg shadow-sm p-4">
                            <Input
                            placeholder="Ej: 5"
                            value={volume}
                            onChange={(e) => setVolume(e.target.value)}
                            className="border-none shadow-none focus-visible:ring-0 p-0 h-auto"
                            />
                    </div>
                </div>
                )}   
                        {pesoCarga === "Kg" && (
                            <div className="mt-4">
                                <label className="text-sm text-gray-700 mb-1 block">
                                    Peso de la carga (kg)
                                </label>
                                <div className="bg-white rounded-lg shadow-sm p-4">
                                    <Input
                                        placeholder="Ej: 200"
                                        value={weight}
                                        onChange={(e) =>
                                            setWeight(e.target.value)
                                        }
                                        className="border-none shadow-none focus-visible:ring-0 p-0 h-auto"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Vehicle Type */}
                <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                        Tipo de vehículo{" "}
                        {vehicleTypes.length === 0 && "(Cargando...)"}
                    </label>
                    <div className="bg-white rounded-lg shadow-sm">
                        <Select
                            value={vehicleType}
                            onValueChange={setVehicleType}
                        >
                            <SelectTrigger className="border-none shadow-none focus-visible:ring-0 h-auto py-4">
                                <SelectValue placeholder="Seleccione tipo de vehículo" />
                            </SelectTrigger>
                            <SelectContent>
                                {vehicleTypes.length > 0 ? (
                                    vehicleTypes.map((vehicle) => (
                                        <SelectItem
                                            key={vehicle.id}
                                            value={vehicle.id}
                                        >
                                            {vehicle.name} (
                                            {vehicle.load_capacity_kg} kg)
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem value="loading" disabled>
                                        Cargando tipos de vehículos...
                                    </SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                        Imagen de{" "}
                        {serviceType === "mudanza" ? "tu mudanza" : "tu flete"}
                    </label>
                    <div className="flex items-center gap-4">
                        {image && (
                            <div className="bg-white rounded-lg shadow-sm p-2 h-16 w-16 flex items-center justify-center">
                                <Image
                                    src={URL.createObjectURL(image)}
                                    alt="Preview"
                                    width={64}
                                    height={64}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                        )}
                        <label className="bg-white rounded-lg shadow-sm h-16 w-16 flex items-center justify-center cursor-pointer">
                            <Plus className="text-gray-400" size={24} />
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>
                </div>

                {/* Rate */}
                <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                        Ofrece tu tarifa
                    </label>
                    {/* Precio sugerido */}
                    {
                       <div className="bg-white rounded-lg shadow-sm p-4">
                        <p className="text-sm text-emerald-600 font-medium mb-2">
                            Precio sugerido: <strong>L {precioSugerido.toFixed(2)}</strong>
                        </p>
                      </div>
                    }
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <Input
                            placeholder="Ingrese su tarifa"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            className="border-none shadow-none focus-visible:ring-0 p-0 h-auto"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full py-6 mt-6 bg-emerald-400 hover:bg-emerald-500 text-black font-medium rounded-full text-[#092A39]"
                >
                    Crear solicitud
                </Button>
            </form>
        </div>
    );
}
