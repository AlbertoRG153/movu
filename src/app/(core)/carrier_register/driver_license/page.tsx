'use client';

import { useRef, useState } from "react";
import Link from "next/link";

export default function LicenciaPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, setImagePreview] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-[#0D3A45] text-white flex flex-col items-center py-10">

      <h1 className="text-xl font-semibold mt-20 mb-6">Licencia de conducir</h1>

      <div className="bg-white text-black p-6 rounded-lg w-11/12 max-w-md">
        <input
          type="text"
          placeholder="Número de licencia de conducir"
          className="w-full mb-4 px-4 py-2 border rounded"
        />
        <div className="flex flex-col items-center">

          {/* Input oculto para cargar archivo */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            onClick={handleAddClick}
            className="border border-emerald-500 text-emerald-500 px-4 py-1 rounded-full mb-4"
          >
            Añadir
          </button>
        </div>
        <input
          type="date"
          className="w-full mb-2 px-4 py-2 border rounded"
        />
        <p className="text-sm text-gray-600">
          Por favor, ingresa la fecha de expiración de tu documento.
        </p>
      </div>

      <button className="bg-[#21E6C1] text-black px-6 py-2 rounded-full mt-6">Aceptar</button>
      <Link href="/carrier_register/information">
        <button className="mt-8 text-sm underline">Regresar</button>
      </Link>
    </div>
  );
}
