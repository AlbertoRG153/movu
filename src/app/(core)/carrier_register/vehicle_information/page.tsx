'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";

type VehicleType = {
  id: string;
  name: string;
  load_capacity_kg: number;
};

export default function VehiculoPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, setImagePreview] = useState<string | null>(null);
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      const { data, error } = await supabase.from("vehicle_type").select("*");
      if (error) {
        console.error("Error fetching vehicle types:", error.message);
      } else {
        setVehicleTypes(data);
      }
    };

    fetchVehicleTypes();
  }, []);

  return (
    <div className="min-h-screen bg-[#0D3A45] text-white flex flex-col items-center py-10">

      <h1 className="text-xl font-semibold mt-20 mb-6">
        Información acerca del vehículo
      </h1>

      <div className="bg-white text-black p-6 rounded-lg w-11/12 max-w-md">
        <select className="w-full mb-4 px-4 py-2 border rounded">
          <option value="">Seleccione el tipo de vehículo</option>
          {vehicleTypes.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.name} - {vehicle.load_capacity_kg} kg
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Número de placa"
          className="w-full mb-4 px-4 py-2 border rounded"
        />
        

        <div className="flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={handleAddClick}
            className="border border-emerald-500 text-emerald-500 px-4 py-1 rounded-full mb-2"
          >
            Añadir
          </button>
        </div>

        <p className="text-sm mt-4 text-gray-600">
          Toma una foto de tu automóvil en la cual se muestre el número de placa.
        </p>
      </div>

      <button className="bg-[#21E6C1] text-black px-6 py-2 rounded-full mt-6">
        Aceptar
      </button>

      <Link href="/carrier_register/information">
        <button className="mt-8 text-sm underline">Regresar</button>
      </Link>
    </div>
  );
}
