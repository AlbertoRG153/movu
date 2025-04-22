// app/(core)/configuration/formato/page.tsx

"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function FormatoPage() {
  // Estado para los radios seleccionados
  const [formatoFecha, setFormatoFecha] = useState("dmy")
  const [unidadDistancia, setUnidadDistancia] = useState("km")

  return (
    <div className="min-h-screen bg-[#0a1929] text-white">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Encabezado */}
        <div className="mb-6 flex items-center">
          <Link href="/configuration" className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-medium">
            Formato de fecha y unidades de distancia
          </h1>
        </div>

        <div className="space-y-6">
          {/* Formato de fecha */}
          <div>
            <h2 className="mb-3 text-lg">Formato de fecha</h2>
            <form className="space-y-4">
              {[
                { id: "dmy", label: "DD/MM/AAAA" },
                { id: "mdy", label: "MM/DD/AAAA" },
              ].map(({ id, label }) => (
                <div
                  key={id}
                  className="flex items-center justify-between border-b border-gray-700 pb-4"
                >
                  <label
                    htmlFor={id}
                    className="flex items-center gap-2 text-base font-normal cursor-pointer"
                  >
                    {label}
                  </label>
                  <input
                    type="radio"
                    id={id}
                    name="formatoFecha"
                    value={id}
                    checked={formatoFecha === id}
                    onChange={() => setFormatoFecha(id)}
                    className="h-5 w-5 appearance-none rounded-full border
                     border-white checked:bg-green-500 checked:border-green-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </form>
          </div>

          {/* Unidades de distancia */}
          <div>
            <h2 className="mb-3 text-lg">Unidades de distancia</h2>
            <form className="space-y-4">
              {[
                { id: "km", label: "Kilómetros (km)" },
                { id: "mi", label: "Millas (mi)" },
              ].map(({ id, label }) => (
                <div
                  key={id}
                  className="flex items-center justify-between border-b border-gray-700 pb-4"
                >
                  <label
                    htmlFor={id}
                    className="flex items-center gap-2 text-base font-normal cursor-pointer"
                  >
                    {label}
                  </label>
                  <input
                    type="radio"
                    id={id}
                    name="unidadDistancia"
                    value={id}
                    checked={unidadDistancia === id}
                    onChange={() => setUnidadDistancia(id)}
                    className="h-5 w-5 appearance-none rounded-full border border-white checked:bg-green-500 checked:border-green-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </form>
          </div>
        </div>
        {/* Enlace para regresar */}
        <br />
        <Link
          href="/configuration"
          className="w-full border bg-green-400 hover:bg-green-700 py-3 px-4 rounded-lg flex items-center justify-center"
        >
          Regresar 
        </Link>
      </div>
    </div>
  )
}
