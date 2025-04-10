"use client";

import type React from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Menu, Plus } from "lucide-react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export default function ShippingForm() {
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
    const [pesoCarga, setPesoCarga] = useState("Kg"); // Default to Kg
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({
            destination,
            pickupTime,
            description,
            vehicleType,
            rate,
            image,
            serviceType,
            weight: serviceType === "flete" ? weight : null, // Solo incluye peso si es flete
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
    }

    // In your component:
    const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);

    // Fetch vehicle types on component mount
    useEffect(() => {
        const fetchVehicleTypes = async () => {
            try {
                const { data, error } = await supabase
                    .from('vehicle_type')
                    .select('*');
                
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

    // Then adjust your calculation function
    const calculateSuggestedPrice = () => {
        // Si no es flete, no calculamos precio
        if (serviceType !== "flete") return 0;
        
        const w = parseFloat(weight);
        
        if (isNaN(w) || w <= 0 || !vehicleType) return 0;
        
        // Find the selected vehicle in our fetched data
        const selectedVehicleData = vehicleTypes.find(v => v.id === vehicleType);
        
        if (!selectedVehicleData) return 0;
        
        // Pricing data based on vehicle types
        const getPricingByCapacity = (capacity: number) => {
            if (capacity <= 1000) return { baseRate: 500, ratePerKm: 10, ratePerKg: 2 };
            if (capacity <= 2000) return { baseRate: 700, ratePerKm: 12, ratePerKg: 2.5 };
            if (capacity <= 5000) return { baseRate: 900, ratePerKm: 14, ratePerKg: 3 };
            if (capacity <= 8000) return { baseRate: 1200, ratePerKm: 18, ratePerKg: 3.5 };
            if (capacity <= 10000) return { baseRate: 1500, ratePerKm: 20, ratePerKg: 4 };
            if (capacity <= 15000) return { baseRate: 2000, ratePerKm: 25, ratePerKg: 5 };
            return { baseRate: 1100, ratePerKm: 16, ratePerKg: 3.2 }; // Default for very large vehicles
        };
        
        const pricing = getPricingByCapacity(selectedVehicleData.load_capacity_kg);
        const maxWeight = selectedVehicleData.load_capacity_kg;
        
        if (w > maxWeight) {
            return pricing.baseRate + maxWeight * pricing.ratePerKg;
        }
        
        const standardDistance = 10;
        const price = pricing.baseRate + (standardDistance * pricing.ratePerKm) + (w * pricing.ratePerKg);
        
        return price;
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-white p-4 flex items-center justify-between shadow-sm">
                <button className="text-gray-700">
                    <Menu size={24} />
                </button>
                <h1 className="text-center font-medium text-lg">Fletes</h1>
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
                            onChange={(e) => setDestination(e.target.value)}
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
                            placeholder={`Describa su ${serviceType || "servicio"}`}
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

                        {pesoCarga === "Kg" && (
                            <div className="mt-4">
                                <label className="text-sm text-gray-700 mb-1 block">
                                    Peso de la carga (kg)
                                </label>
                                <div className="bg-white rounded-lg shadow-sm p-4">
                                    <Input
                                        placeholder="Ej: 200"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
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
                        Tipo de vehículo {vehicleTypes.length === 0 && "(Cargando...)"}
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
                                        <SelectItem key={vehicle.id} value={vehicle.id}>
                                            {vehicle.name} ({vehicle.load_capacity_kg} kg)
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
                        Imagen de {serviceType === "mudanza" ? "tu mudanza" : "tu flete"}
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

                    {/* Precio sugerido - Solo visible para fletes */}
                    {serviceType === "flete" && (
                        <div className="text-sm text-emerald-600 font-medium mb-2">
                            El precio sugerido es: L. {calculateSuggestedPrice().toFixed(2)}
                        </div>
                    )}

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