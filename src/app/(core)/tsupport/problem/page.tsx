import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function ProblemasPage() {
  return (
    <div className="min-h-screen bg-[#0a2536] flex flex-col items-center">
      <header className="w-full p-4 flex items-center justify-center relative">
        <Link href="/soporte" className="absolute left-4">
          <ChevronLeft className="h-6 w-6 text-white" />
        </Link>
        <h1 className="text-white text-xl font-medium">Problemas con la aplicación</h1>
      </header>

      <main className="w-full max-w-md px-4">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="space-y-4">
            <h2 className="text-[#0a2536] font-medium">Solución de problemas</h2>

            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Problemas de inicio de sesión</h3>
                <p className="text-gray-600">
                  Si tienes problemas para iniciar sesión, intenta restablecer tu contraseña. Si el problema persiste,
                  asegúrate de tener la última versión de la aplicación.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">La aplicación se cierra inesperadamente</h3>
                <p className="text-gray-600">
                  Si la aplicación se cierra inesperadamente, intenta reiniciar tu dispositivo y actualizar la
                  aplicación. Si el problema continúa, contacta a soporte técnico.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Problemas con pagos</h3>
                <p className="text-gray-600">
                  Si experimentas problemas con los pagos, verifica que tu método de pago esté actualizado y que tengas
                  fondos suficientes. También puedes intentar agregar un método de pago alternativo.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Contactar a soporte técnico</h3>
                <p className="text-gray-600">
                  Si ninguna de las soluciones anteriores resuelve tu problema, contacta a nuestro equipo de soporte
                  técnico a través del correo soporte@movu.com o llamando al 800-123-4567.
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
