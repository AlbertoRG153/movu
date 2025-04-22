import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function CiudadPage() {
  return (
    <div className="min-h-screen bg-[#0a2536] flex flex-col items-center">
      <header className="w-full p-4 flex items-center justify-center relative">
        <Link href="/soporte" className="absolute left-4">
          <ChevronLeft className="h-6 w-6 text-white" />
        </Link>
        <h1 className="text-white text-xl font-medium">Ciudad</h1>
      </header>

      <main className="w-full max-w-md px-4">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="space-y-4">
            <h2 className="text-[#0a2536] font-medium">Información sobre ciudades</h2>

            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Ciudades disponibles</h3>
                <p className="text-gray-600">
                  Actualmente ofrecemos nuestros servicios en las siguientes ciudades: 
                  Ciudad el Salvador , Guatemala, Nicaragua.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Próximas expansiones</h3>
                <p className="text-gray-600">
                  Estamos trabajando para expandir nuestros servicios a más ciudades. Mantente atento a nuestras redes
                  sociales para anuncios.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Solicitar servicio en tu ciudad</h3>
                <p className="text-gray-600">
                  Si quieres que lleguemos a tu ciudad, puedes dejarnos tus datos y te notificaremos cuando estemos
                  disponibles en tu área.
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
