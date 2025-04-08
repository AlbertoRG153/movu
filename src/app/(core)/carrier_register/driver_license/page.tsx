'use client';

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function DriverLicenseAndSelfiePage() {
  const selfieInputRef = useRef<HTMLInputElement>(null);
  const licenseInputRef = useRef<HTMLInputElement>(null);

  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);
  const [licensePreview, setLicensePreview] = useState<string | null>(null);

  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseExpiration, setLicenseExpiration] = useState('');

  const handleSelfieClick = () => selfieInputRef.current?.click();
  const handleLicenseClick = () => licenseInputRef.current?.click();

  const handleSelfieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelfiePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  const handleLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLicensePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!selfiePreview || !licensePreview || !licenseNumber || !licenseExpiration) {
      alert('Por favor completa todos los campos.');
      return;
    }

    // hacer la logica de subida a Supabase y guardar en la tabla "carrier"
    alert('Datos enviados correctamente.');
  };

  return (
    <div className="min-h-screen bg-[#0D3A45] text-white flex flex-col items-center py-10 px-4">

      <h1 className="text-xl font-semibold mt-20 mb-6">Registro del Conductor</h1>

      {/* Seccion Selfie */}
      <div className="relative w-48 h-48 mb-6">
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
        

      {/* Seccion Licencia */}
      <button
          onClick={handleSelfieClick}
          className="border border-emerald-500 text-emerald-500 px-4 py-1 rounded-full"
        >
          Subir Selfie
        </button>
      </div>

      <div className="bg-white text-black p-6 rounded-lg w-11/12 max-w-md mb-6">
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
          type="month"
          value={licenseExpiration}
          onChange={(e) => setLicenseExpiration(e.target.value)}
          defaultValue="YY-MM"
          className="w-full mb-4 px-4 py-2 border rounded"
        />

        <div className="flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleLicenseChange}
            ref={licenseInputRef}
            className="hidden"
          />
      </div>
          <button
            onClick={handleLicenseClick}
            className="border border-emerald-500 text-emerald-500 px-4 py-1 rounded-full mb-4"
          >
            Subir foto de la licencia
          </button>

          {licensePreview && (
            <Image
              src={licensePreview}
              alt="Licencia"
              width={192}
              height={120}
              className="rounded"
            />
          )}
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