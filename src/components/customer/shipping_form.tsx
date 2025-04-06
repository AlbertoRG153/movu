"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, Menu, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export default function ShippingForm() {
    const [pickupLocation, setPickupLocation] = useState("");
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({
            pickupLocation,
            destination,
            pickupTime,
            description,
            vehicleType,
            rate,
            image,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
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
                    <div
                        className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center cursor-pointer"
                        onClick={() => {
                            /* Open location picker */
                            setPickupLocation("Nueva Ubicación");
                        }}
                    >
                        <span
                            className={cn(
                                "text-gray-700",
                                !pickupLocation && "text-gray-400"
                            )}
                        >
                            {pickupLocation || "Seleccione un lugar"}
                        </span>
                        <ChevronRight className="text-gray-400" size={20} />
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

                {/* Description */}
                <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                        Descripcion del flete
                    </label>
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <Textarea
                            placeholder="Describa su flete"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border-none shadow-none focus-visible:ring-0 p-0 h-auto min-h-[80px] resize-none"
                        />
                    </div>
                </div>

                {/* Vehicle Type */}
                <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                        Tipo de vehiculo
                    </label>
                    <div className="bg-white rounded-lg shadow-sm">
                        <Select
                            value={vehicleType}
                            onValueChange={setVehicleType}
                        >
                            <SelectTrigger className="border-none shadow-none focus-visible:ring-0 h-auto py-4">
                                <SelectValue placeholder="Seleccione tipo de vehiculo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="camioneta">
                                    Camioneta
                                </SelectItem>
                                <SelectItem value="camion">Camión</SelectItem>
                                <SelectItem value="furgoneta">
                                    Furgoneta
                                </SelectItem>
                                <SelectItem value="trailer">Tráiler</SelectItem>
                                <SelectItem value="otro">Otro</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                        Imagen de tu flete
                    </label>
                    <div className="flex items-center gap-4">
                        {image && (
                            <div className="bg-white rounded-lg shadow-sm p-2 h-16 w-16 flex items-center justify-center">
                                <Image
                                    src={
                                        URL.createObjectURL(image) ||
                                        "/placeholder.svg"
                                    }
                                    alt="Preview"
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
