import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a2a3a] text-white flex flex-col ">
      {/* Header */}
      <header className="p-4 flex items-center border-b border-[#1a3a4a]">
        <Link href="/configuration" className="mr-4">
          <ArrowLeft className="w-6 h-6 " />
        </Link>
        <h1 className="text-center text-lg font-medium  align-middle "> Acerca de la aplicación</h1>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-30 h-30 bg-green-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold"></span>
                <div className="flex justify-center">
                            <Image
                            src="/white.png"
                            alt="Logo"
                            width={90}
                            height={90}
                            layout="fixed"
                                      />
                                  </div>
            </div>
            <h2 className="text-xl font-bold">Movu Fletes</h2>
            <p className="text-gray-400">Versión 1.0.0</p>
          </div>

          <div className="space-y-4">
            <div className="border-b border-[#244a1a] py-3">
              <h3 className="text-gray-400 text-sm">Sitio web</h3>
              <p>www.movu.com</p>
            </div>

            <div className="border-b border-[#1a3a4a] py-3">
              <h3 className="text-gray-400 text-sm">Correo de soporte</h3>
              <p>soporte@movufletes.com</p>
            </div>

            <div className="border-b border-[#1a3a4a] py-3">
              <h3 className="text-gray-400 text-sm">Teléfono de contacto</h3>
              <p>+504 1234 5678</p>
            </div>

            <div className="py-3">
              <Link href="#" className="text-green-500">
                Términos y condiciones
              </Link>
            </div>

            <div className="py-3">
              <Link href="#" className="text-green-500">
                Política de privacidad
              </Link>
            </div>
          </div>
          {/* Enlace para regresar */}
                  <br />
          <Link
              href="/configuration"
              className="border bg-green-400 hover:bg-green-700 py-2 
              px-3 text-sm rounded-md flex items-center justify-center"
            >
              Regresar
            </Link>
        </div>
      </main>
    </div>
  )
}
