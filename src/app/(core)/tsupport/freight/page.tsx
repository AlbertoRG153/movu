import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function FletesPage() {
  return (
    <div className="min-h-screen bg-[#0a2536] flex flex-col items-center">
      <header className="w-full p-4 flex items-center justify-center relative">
        <Link href="/soporte" className="absolute left-4">
          <ChevronLeft className="h-6 w-6 text-white" />
        </Link>
        <h1 className="text-white text-xl font-medium">Fletes</h1>
      </header>

      <main className="w-full max-w-md px-4">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="space-y-4">
            <h2 className="text-[#0a2536] font-medium">Información sobre fletes</h2>

            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Tipos de vehículos</h3>
                <p className="text-gray-600">
                  Ofrecemos diferentes tipos de vehículos para fletes: motocicletas, autos, camionetas y camiones
                  pequeños. Selecciona el que mejor se adapte a tus necesidades.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Tarifas</h3>
                <p className="text-gray-600">
                  Las tarifas de fletes se calculan según la distancia, el tipo de vehículo y el peso/volumen de la
                  carga. Puedes obtener un presupuesto antes de confirmar tu servicio.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Restricciones</h3>
                <p className="text-gray-600">
                  Existen restricciones para ciertos tipos de mercancías. No transportamos materiales peligrosos,
                  ilegales o perecederos sin el embalaje adecuado.
                </p>
              </div>
            </div>
          </div>
          <br />
          <Link
                href="/tsupport"
                className="w-full bg-[#138954] text-white py-3 px-4 rounded-lg flex items-center justify-center"
              >
                Regresar a Soporte
              </Link>
        </div>
      </main>
    </div>
  )
}
