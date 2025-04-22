"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";

type VehicleType = {
    id: string;
    name: string;
    load_capacity_kg: number;
};

// Función para guardar en localStorage con expiración
const setLocalStorageWithExpiry = (
    key: string,
    value: string,
    hours: number
) => {
    if (typeof window !== "undefined") {
        const now = new Date();
        const item = {
            value: value,
            expiry: now.getTime() + hours * 60 * 60 * 1000,
        };
        localStorage.setItem(key, JSON.stringify(item));
    }
};

// Función para obtener de localStorage verificando expiración
const getLocalStorageWithExpiry = (key: string) => {
    if (typeof window !== "undefined") {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) {
            return null;
        }

        try {
            const item = JSON.parse(itemStr);
            // Verifica si tiene la estructura esperada (con campo expiry)
            if (item && item.expiry) {
                const now = new Date();

                // Comprobar si ya ha expirado
                if (now.getTime() > item.expiry) {
                    // Si ha expirado, eliminar del localStorage
                    localStorage.removeItem(key);
                    return null;
                }
                return item.value;
            } else {
                // Si no tiene el formato esperado pero hay datos, devolver el valor directamente
                // Esto maneja valores antiguos que no tienen formato JSON con expiry
                return itemStr;
            }
        } catch {
            // Si hay un error al analizar JSON, puede ser un valor antiguo no-JSON
            console.log(
                `Error parsing JSON for key ${key}, returning raw value`
            );
            return itemStr;
        }
    }
    return null;
};

export default function VehiculoPage() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
    const [selectedVehicleType, setSelectedVehicleType] = useState("");
    const [plateNumber, setPlateNumber] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [color, setColor] = useState("");

    const isFormComplete =
        selectedVehicleType &&
        plateNumber &&
        brand &&
        model &&
        color &&
        imagePreview;

    const handleAddClick = () => {
        fileInputRef.current?.click();
    };

    const handleVehiclePhotoUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result as string;
                setImagePreview(result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (!isFormComplete) {
            alert("Por favor completa todos los campos antes de continuar.");
            return;
        }

        // Guardar todos los datos en localStorage con expiración de 24 horas
        setLocalStorageWithExpiry("vehicleType", selectedVehicleType, 24);
        setLocalStorageWithExpiry("plateNumber", plateNumber, 24);
        setLocalStorageWithExpiry("brand", brand, 24);
        setLocalStorageWithExpiry("model", model, 24);
        setLocalStorageWithExpiry("color", color, 24);
        setLocalStorageWithExpiry("vehicleInfoCompleted", "true", 24);

        // Guardar la imagen en localStorage con expiración
        if (imagePreview) {
            setLocalStorageWithExpiry("vehiclePhoto", imagePreview, 24);
        }

        router.push("/carrier_register/information");
    };

    useEffect(() => {
        const fetchVehicleTypes = async () => {
            const { data, error } = await supabase
                .from("vehicle_type")
                .select("*");
            if (error) {
                console.error("Error fetching vehicle types:", error.message);
            } else {
                setVehicleTypes(data || []);
            }
        };

        fetchVehicleTypes();

        // Cargar valores guardados en localStorage (si existen y no han expirado)
        if (typeof window !== "undefined") {
            const savedVehicleType = getLocalStorageWithExpiry("vehicleType");
            const savedPlateNumber = getLocalStorageWithExpiry("plateNumber");
            const savedBrand = getLocalStorageWithExpiry("brand");
            const savedModel = getLocalStorageWithExpiry("model");
            const savedColor = getLocalStorageWithExpiry("color");
            const savedPhoto = getLocalStorageWithExpiry("vehiclePhoto");

            if (savedVehicleType) setSelectedVehicleType(savedVehicleType);
            if (savedPlateNumber) setPlateNumber(savedPlateNumber);
            if (savedBrand) setBrand(savedBrand);
            if (savedModel) setModel(savedModel);
            if (savedColor) setColor(savedColor);

            if (savedPhoto) {
                console.log("✅ Imagen recuperada desde localStorage");
                setImagePreview(savedPhoto);
            }
        }
    }, []);

    return (
        <div className="min-h-screen bg-[#0D3A45] text-white flex flex-col items-center px-4">
            <div className="h-[10vh] w-full mt-5 text-center">
                <h1 className="text-xl text-white font-semibold">
                    Información acerca del vehículo
                </h1>
            </div>

            {/* Tipo de vehículo */}
            <div className="bg-white text-black p-6 rounded-lg w-11/12 max-w-md mb-4">
                <p className="text-sm mt-2 text-justify mb-3">
                    Seleccione el tipo de vehiculo.
                </p>
                <select
                    value={selectedVehicleType}
                    onChange={(e) => setSelectedVehicleType(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border rounded"
                >
                    <option value="">Seleccione el tipo de vehículo</option>
                    {vehicleTypes.map((vehicle) => (
                        <option key={vehicle.id} value={vehicle.id}>
                            {vehicle.name} - {vehicle.load_capacity_kg} kg
                        </option>
                    ))}
                </select>
            </div>

            {/* Número de placa */}
            <div className="bg-white text-black p-6 rounded-lg w-11/12 max-w-md mb-4">
                <p className="text-sm mt-2 text-justify mb-3">
                    Ingresa el número de placa del vehículo.
                </p>
                <input
                    type="text"
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value)}
                    placeholder="Número de placa"
                    className="w-full mb-4 px-4 py-2 border rounded"
                />
            </div>

            {/* Marca */}
            <div className="bg-white text-black p-6 rounded-lg w-11/12 max-w-md mb-4">
                <p className="text-sm mt-2 text-justify mb-3">
                    Ingresa la marca de tu vehículo.
                </p>
                <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Marca del vehículo"
                    className="w-full mb-4 px-4 py-2 border rounded"
                />
            </div>

            {/* Modelo */}
            <div className="bg-white text-black p-6 rounded-lg w-11/12 max-w-md mb-4">
                <p className="text-sm mt-2 text-justify mb-3">
                    Ingresa el modelo de tu vehículo.
                </p>
                <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="Modelo del vehículo"
                    className="w-full mb-4 px-4 py-2 border rounded"
                />
            </div>

            {/* Color */}
            <div className="bg-white text-black p-6 rounded-lg w-11/12 max-w-md mb-4">
                <p className="text-sm mt-2 text-justify mb-3">
                    Ingresa el color del vehículo.
                </p>
                <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="Color del vehículo"
                    className="w-full mb-4 px-4 py-2 border rounded"
                />
            </div>

            {/* Imagen del vehículo */}
            <div className="bg-white text-black p-6 rounded-lg w-11/12 max-w-md mb-4">
                <div className="flex flex-col items-center">
                    <Image
                        src={imagePreview || "/muestra_carro.svg"}
                        alt="Foto del vehículo"
                        width={192}
                        height={192}
                        className="rounded mb-4 object-cover"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleVehiclePhotoUpload}
                        className="hidden"
                        ref={fileInputRef}
                    />
                    <button
                        onClick={handleAddClick}
                        className="border border-emerald-500 text-emerald-500 px-4 py-1 rounded-full mb-2"
                    >
                        Añadir foto del vehículo
                    </button>
                </div>
                <p className="text-sm mt-4 text-gray-600 text-center">
                    Toma una foto de tu automóvil en la cual se muestre el
                    número de placa.
                </p>
            </div>

            {/* Botón Aceptar */}
            <button
                onClick={handleSubmit}
                disabled={!isFormComplete}
                className={`px-8 py-3 rounded-full mt-6 ${
                    isFormComplete
                        ? "bg-[#21E6C1] text-black"
                        : "bg-gray-400 text-white cursor-not-allowed"
                }`}
            >
                Aceptar
            </button>

            <Link href="/carrier_register/information">
                <button className="mt-8 text-sm underline mb-8">
                    Regresar
                </button>
            </Link>
        </div>
    );
}
