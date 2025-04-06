'use client';


import { useRef, useState } from "react";
import Link from "next/link";
import Image from 'next/image';

export default function SelfiePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

      <h1 className="text-xl font-semibold mt-20 mb-6">Selfie</h1>

      <div className="bg-white text-black p-6 rounded-lg w-11/12 max-w-md flex flex-col items-center">
        <Image
          src={imagePreview || "/selfie.png"}
          alt="Ejemplo selfie"
          className="w-48 h-auto rounded mb-4"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
        <button
          onClick={handleAddClick}
          className="border border-emerald-500 text-emerald-500 px-4 py-1 rounded-full mb-2"
        >
          Añadir
        </button>
      </div>

      <button className="bg-[#21E6C1] text-black px-6 py-2 rounded-full mt-6">Aceptar</button>

      <Link href="/carrier_register/information">
        <button className="mt-8 text-sm underline">Regresar</button>
      </Link>
    </div>
  );
}
