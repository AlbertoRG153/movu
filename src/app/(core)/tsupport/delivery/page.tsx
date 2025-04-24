import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function EntregasPage() {
  return (
    <div className="min-h-screen bg-[#0a2536] flex flex-col items-center">
      <header className="w-full p-4 flex items-center justify-center relative">
        <Link href="/soporte" className="absolute left-4">
          <ChevronLeft className="h-6 w-6 text-white" />
        </Link>
        <h1 className="text-white text-xl font-medium">Entregas</h1>
      </header>

      <main className="w-full max-w-md px-4">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="space-y-4">
            <h2 className="text-[#0a2536] font-medium">Información sobre entregas</h2>

            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Tiempos de entrega</h3>
                <p className="text-gray-600">
                  Nuestros tiempos de entrega varían según la distancia y el tráfico. Generalmente, las entregas se
                  realizan en un plazo de 30-60 minutos.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Seguimiento de pedidos</h3>
                <p className="text-gray-600">
                  Puedes seguir tu pedido en tiempo real a través de nuestra aplicación. Recibirás notificaciones sobre
                  el estado de tu entrega.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Problemas con entregas</h3>
                <p className="text-gray-600">
                  Si tienes algún problema con tu entrega, puedes contactar a nuestro equipo de soporte a través de la
                  aplicación o llamando al número de atención al cliente.
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
