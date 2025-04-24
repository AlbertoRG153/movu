"use client"

import { useState } from "react"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"

export default function FormatoFechaPage() {
  const [selectedDateFormat, setSelectedDateFormat] = useState("DD/MM/YYYY")
  const [selectedDistanceUnit, setSelectedDistanceUnit] = useState("km")

  const dateFormats = [
    { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
    { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
    { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
  ]

  const distanceUnits = [
    { value: "km", label: "Kilómetros" },
    { value: "mi", label: "Millas" },
  ]

  const handleSave = () => {
    // Aquí iría la lógica para guardar las preferencias
    console.log("Guardando formato de fecha:", selectedDateFormat)
    console.log("Guardando unidad de distancia:", selectedDistanceUnit)
    // Normalmente enviarías esto a una API
    alert("Preferencias guardadas correctamente")
    // Redirigir a la página de configuraciones
    window.location.href = "/configuraciones"
  }

  return (
    <div className="min-h-screen bg-[#0a2a3a] text-white flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center border-b border-[#1a3a4a]">
        <Link href="/configuraciones" className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-lg font-medium">Formato de fecha y unidades de distancia</h1>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg mb-2">Formato de fecha</h2>
            <div className="space-y-2">
              {dateFormats.map((format) => (
                <button
                  key={format.value}
                  className="flex items-center justify-between w-full py-3 border-b border-[#1a3a4a]"
                  onClick={() => setSelectedDateFormat(format.value)}
                >
                  <span>{format.label}</span>
                  {selectedDateFormat === format.value && <Check className="w-5 h-5 text-blue-500" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg mb-2">Unidades de distancia</h2>
            <div className="space-y-2">
              {distanceUnits.map((unit) => (
                <button
                  key={unit.value}
                  className="flex items-center justify-between w-full py-3 border-b border-[#1a3a4a]"
                  onClick={() => setSelectedDistanceUnit(unit.value)}
                >
                  <span>{unit.label}</span>
                  {selectedDistanceUnit === unit.value && <Check className="w-5 h-5 text-blue-500" />}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md mt-6">
            Guardar cambios
          </button>
        </div>
      </main>
    </div>
  )
}
