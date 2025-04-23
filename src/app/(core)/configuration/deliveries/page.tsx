// Importación de componentes y librerías necesarias
import Image from "next/image"
import { MapPin, Info } from "lucide-react"

// Componente principal de la página de entregas
export default function EntregasPage() {
  return (
    <div className="min-h-screen bg-[#2c4251] text-white flex flex-col">
      
      {/* Contenedor principal con centrado y espaciado */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 relative">
        
        {/* Indicador de ubicación en la esquina superior derecha */}
        <div className="absolute top-4 right-4 text-gray-300 flex items-center">
          <span className="mr-1 text-sm">Tegucigalpa</span>
          <MapPin className="h-5 w-5" />
        </div>

        {/* Círculo de progreso animado visualmente */}
        <div className="relative w-48 h-48 mb-6">
          <div className="absolute inset-0 rounded-full bg-[#1a2a36] opacity-70"></div>
          <div className="absolute inset-[15px] rounded-full bg-[#243642] opacity-80"></div>
          <div className="absolute inset-[30px] rounded-full bg-[#2f4553] opacity-90"></div>
          
          {/* Logo dentro del círculo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-full p-3">
              <div className="bg-[#bdd69d] rounded-full p-2">
                <Image
                  src="/white.png"
                  alt="Logo"
                  width={80}
                  height={80}
                  layout="fixed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mensaje informativo */}
        <p className="text-center text-sm mb-8 max-w-xs">
          Nos encargamos del trayecto y transporte de tus paquetes.
        </p>

        {/* Sección con información del pedido */}
        <div className="w-full max-w-md bg-[#243642] rounded-lg p-4 mb-6">
          <h2 className="text-center mb-3 font-medium flex items-center justify-center">
            <Info className="h-4 w-4 mr-1" />
            Información de la entrega
          </h2>

          {/* Detalles del pedido con etiquetas y valores */}
          <div className="space-y-3 text-sm">
            <div className="flex">
              <span className="w-40 text-gray-400">Lugar de recogida:</span>
              <span>Col. Alemán, Tegucigalpa</span>
            </div>

            <div className="flex">
              <span className="w-40 text-gray-400">Destino:</span>
              <span>Res. Trapiche, Tegucigalpa</span>
            </div>

            <div className="flex">
              <span className="w-40 text-gray-400">Descripción:</span>
              <span>Paquete pequeño</span>
            </div>

            <div className="flex">
              <span className="w-40 text-gray-400">Oferta actual:</span>
              <span>1500</span>
            </div>

            <div className="flex">
              <span className="w-40 text-gray-400">Oferta sugerida:</span>
              <span>1800</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
