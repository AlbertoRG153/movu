// app/(core)/configuration/formato/page.tsx

"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function FormatoPage() {
  // Estado para los radios seleccionados
  const [formatoFecha, setFormatoFecha] = useState("dmy")
  const [unidadDistancia, setUnidadDistancia] = useState("km")
  const router = useRouter()
  const handleBack = () => {
    router.back() 
  }
  return (
    <div className="min-h-screen bg-[#0a1929] text-white">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Encabezado */}
        <div className="mb-6 flex items-center">

            <ArrowLeft className="h-6 w-6 mr-3" onClick={handleBack} />

          <h1 className="text-lg font-medium">
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
                     border-white checked:bg-green-500 checked:border-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="h-5 w-5 appearance-none rounded-full border border-white checked:bg-green-500 checked:border-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </form>
          </div>
        </div>
        
      </div>
    </div>
  )
}
