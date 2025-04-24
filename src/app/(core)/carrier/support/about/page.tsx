'use client'
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
export default function AcercaPage() {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  return (
    <div className="min-h-screen bg-[#0a2536] flex flex-col items-center">
      <header className="w-full p-4 flex items-center justify-between relative">
        <div className="absolute left-4">
          <ChevronLeft className="h-6 w-6 text-white" onClick={handleBack} />
        </div>
        <h1 className="text-white text-xl font-medium mx-auto">Acerca de movu</h1>
      </header>


      <main className="w-full max-w-md px-4">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="space-y-4">
            <h2 className="text-[#0a2536] font-medium">Sobre nosotros</h2>

            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Nuestra historia</h3>
                <p className="text-gray-600">
                  Movu nació en 2025 con la misión de revolucionar la logística urbana. Comenzamos como una pequeña
                  startup y hemos crecido hasta convertirnos en un referente en el sector de entregas y fletes.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Misión y visión</h3>
                <p className="text-gray-600">
                  Nuestra misión es facilitar la vida de las personas y empresas a través de soluciones logísticas
                  eficientes y accesibles. Nuestra visión es ser la plataforma de logística urbana más confiable y
                  utilizada en Latinoamérica.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Equipo</h3>
                <p className="text-gray-600">
                  Contamos con un equipo diverso de profesionales apasionados por la tecnología y la logística. Nuestros
                  colaboradores trabajan día a día para mejorar la experiencia de nuestros usuarios.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Contacto</h3>
                <p className="text-gray-600">
                Oficinas centrales: Av. Luarque Sur 14, Col.  luarque sur, Honduras
                  <br />
                  Correo electrónico: info@movu.com
                  <br />
                  Teléfono: 8999-4567
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
