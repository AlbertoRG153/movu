'use client';

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {supabase} from "@/lib/supabase/supabaseClient";
import { uploadSelfie } from "@/components/ui/uploadSelfie";

export default function DriverLicenseAndSelfiePage() {
  const selfieInputRef = useRef<HTMLInputElement>(null);
  const licenseInputRef = useRef<HTMLInputElement>(null);

  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);

  //const [licensePreview, setLicensePreview] = useState<string | null>(null);
  //const [licenseFile, setLicenseFile] = useState<File | null>(null);

  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseExpiration, setLicenseExpiration] = useState('');

  const handleSelfieClick = () => selfieInputRef.current?.click();
  const handleLicenseClick = () => licenseInputRef.current?.click();

  const handleSelfieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelfieFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setSelfiePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

 /**const handleLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLicenseFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setLicensePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }; */ 

  const handleSubmit = async () => {
    if (!selfieFile || !licenseNumber || !licenseExpiration) {
      alert('Por favor completa todos los campos.');
      return;
    }

    try {
      const rawPersonId = localStorage.getItem("person_id");

      if (!rawPersonId) {
        console.error("No hay person_id en localStorage");
        return;
      }
      
      // Subir selfie
      const selfieUrl = await uploadSelfie(selfieFile, rawPersonId);

      // Verificar si el carrier ya existe
      const { data: existingCarrier, error: fetchError } = await supabase
        .from('carrier')
        .select('*')
        .eq('id', rawPersonId)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (existingCarrier) {
        // Actualizar si ya existe
        const { error: updateError } = await supabase
          .from('carrier')
          .update({
            license: licenseNumber,
            id_person: rawPersonId,
            license_expiration: licenseExpiration,
            license_img: selfieUrl
          })
          .eq('id', rawPersonId);

        if (updateError) throw updateError;
      } else {
        // Insertar si no existe
        const { error: insertError } = await supabase
          .from('carrier')
          .insert({
            id: rawPersonId,
            id_person: rawPersonId,
            license: licenseNumber,
            license_expiration: licenseExpiration,
            license_img: selfieUrl
          });

        if (insertError) throw insertError;
      }

      alert('Datos enviados correctamente.');
    } catch (err) {
      console.error(err);
      alert('Hubo un error al subir los datos.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0D3A45] text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-xl font-semibold mt-20 mb-6">Registro del Conductor</h1>

      {/* Seccion Selfie */}
      <div className="bg-white text-black p-6 rounded-lg w-full max-w-md mb-6 flex flex-col items-center justify-center">
        <div className="relative flex flex-col items-center">
          <Image
            src={selfiePreview || "/selfie.png"}
            alt="Selfie"
            width={192}
            height={192}
            className="rounded mb-4"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleSelfieChange}
            ref={selfieInputRef}
            className="hidden"
          />
          <p className="text-sm text-gray-600 mt-2 max-w-md text-center">
            Tómate una foto con tu licencia de conducir junto a tu rostro.
            Asegúrate de que tu cara y la información del documento sean claramente visibles.
          </p>
          <button
            onClick={handleSelfieClick}
            className="border border-emerald-500 text-emerald-500 px-4 py-1 rounded-full mt-2"
          >
            Subir Selfie
          </button>
        </div>
      </div>

      {/* Seccion Licencia */}
      <div className="bg-white text-black p-6 rounded-lg w-11/12 max-w-md mb-6 flex flex-col items-center justify-center">
        <input
          type="text"
          value={licenseNumber}
          onChange={(e) => setLicenseNumber(e.target.value)}
          placeholder="Numero de licencia de conducir"
          className="w-full mb-4 px-4 py-2 border rounded"
        />
        <p className="text-sm text-gray-600 mt-2">
          Por favor, ingresa la fecha de expiracion de tu documento.
        </p>
        <input
          type="date"
          value={licenseExpiration}
          onChange={(e) => setLicenseExpiration(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded"
        />


      </div>

      {/* Boton principal */}
      <button
        onClick={handleSubmit}
        className="bg-[#21E6C1] text-black px-6 py-2 rounded-full mt-2"
      >
        Aceptar
      </button>

      <Link href="/carrier_register/information">
        <button className="mt-8 text-sm underline">Regresar</button>
      </Link>
    </div>
  );
}
