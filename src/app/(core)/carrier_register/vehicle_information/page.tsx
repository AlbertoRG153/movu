'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import { uploadVehicleImage } from "@/components/ui/uploadVehicleImage";

type VehicleType = {
  id: string;
  name: string;
  load_capacity_kg: number;
};

export default function VehiculoPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [plateNumber, setPlateNumber] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [selectedVehicleTypeId, setSelectedVehicleTypeId] = useState('');
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!imageFile || !plateNumber || !brand || !model || !color || !selectedVehicleTypeId) {
      alert('Por favor completa todos los campos.');
      return;
    }
  
    try {
      const rawPersonId = localStorage.getItem("person_id");
      if (!rawPersonId) {
        alert("No se encontró el ID de persona en localStorage.");
        return;
      }
  
      //  Subir imagen
      const imageUrl = await uploadVehicleImage(imageFile, rawPersonId);
      if (!imageUrl) throw new Error("Error subiendo imagen del vehiculo");
  
      // Crear nuevo vehículo
      const { data: newVehicle, error: vehicleError } = await supabase
        .from("vehicle")
        .insert({
          plate_number: plateNumber,
          brand,
          model,
          color,
          id_vehicle_type: selectedVehicleTypeId,
          vehicle_img: imageUrl,
        })
        .select()
        .single();
  
      if (vehicleError || !newVehicle) throw vehicleError;
  
      // Verificar si existe un carrier con ese id_person
      const { data: existingCarrier, error: carrierCheckError } = await supabase
        .from("carrier")
        .select("id")
        .eq("id", rawPersonId)
        .single();
  
      if (carrierCheckError && carrierCheckError.code !== "PGRST116") {
        throw carrierCheckError;
      }
  
      if (existingCarrier) {
        // Si existe, actualizar id_vehicle
        const { error: updateCarrierError } = await supabase
          .from("carrier")
          .update({ id_vehicle: newVehicle.id }) // Aquí usamos newVehicle.id
          .eq("id", rawPersonId);
  
        if (updateCarrierError) throw updateCarrierError;
      } else {
        // Si no existe, crear nuevo carrier
        const { error: insertCarrierError } = await supabase
          .from("carrier")
          .insert({
            id: rawPersonId,
            id_vehicle: newVehicle.id, 
          });
  
        if (insertCarrierError) throw insertCarrierError;
      }
  
      alert("Vehículo y datos del transportista registrados exitosamente.");
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al guardar la información.");
    }
  };

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      const { data, error } = await supabase.from("vehicle_type").select("*");
      if (error) {
        console.error("Error al obtener tipos de vehículo:", error.message);
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
        <select
          className="w-full mb-4 px-4 py-2 border rounded"
          value={selectedVehicleTypeId}
          onChange={(e) => setSelectedVehicleTypeId(e.target.value)}
        >
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
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded"
        />

        <input
          type="text"
          placeholder="Marca"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded"
        />

        <input
          type="text"
          placeholder="Modelo"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded"
        />

        <input
          type="text"
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
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
            className={`border px-4 py-1 rounded-full mb-2 ${
              imageFile
                ? "border-green-500 text-green-500"
                : "border-emerald-500 text-emerald-500"
            }`}
          >
            {imageFile ? "Imagen lista" : "Añadir imagen"}
          </button>
        </div>

        <p className="text-sm mt-4 text-gray-600">
          Toma una foto de tu automóvil en la cual se muestre el número de placa.
        </p>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-[#21E6C1] text-black px-6 py-2 rounded-full mt-6"
      >
        Aceptar
      </button>

      <Link href="/carrier_register/information">
        <button className="mt-8 text-sm underline">Regresar</button>
      </Link>
    </div>
  );
}
