import Link from "next/link";
import React, { useState} from 'react';

export function InformationCarrier() {
  const [, setAccepted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAccepted(true);
    alert('Archivos enviados correctamente');
  };
  

  return (
    <div className="min-h-screen bg-[#0D3A45] flex flex-col items-center justify-between py-10 text-white relative">
     
  <div className="w-full px-6 flex flex-col items-center justify-center mt-8 py-10">
    <h1 className="text-xl font-semibold mb-6">Verificación</h1>

    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
      
      <Link href="/carrier_register/driver_license" className="w-full">
        <button
          type="button"
          className="w-full py-6 bg-white text-black rounded-full hover:bg-gray-200"
        >
          Licencia de conducir
        </button>
      </Link>

      <Link href="/carrier_register/vehicle_information" className="w-full">
        <button
          type="button"
          className="w-full py-6 bg-white text-black rounded-full hover:bg-gray-200"
        >
          Información acerca del vehículo
        </button>
      </Link>

      <button
        type="submit"
        className="bg-[#21E6C1] text-black font-medium px-6 py-2 mt-6 rounded-full hover:bg-[#17bca2]"
      >
        Aceptar
      </button>

      <Link href="/login" className="w-full">
      <button className="absolute top-4 right-6 text-sm text-white">Cerrar</button>
      </Link>

      <p className="text-xs text-center mt-4 text-gray-300">
        Al pulsar “Aceptar” estás aceptando nuestros Términos y condiciones y condiciones de Política de privacidad.
      </p>
    </form>
  </div>
</div>

  );
}
