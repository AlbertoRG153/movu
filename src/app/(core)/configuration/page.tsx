"use client"

import { useState } from "react"
import { ChevronRight, Menu } from "lucide-react"
import Link from "next/link"

export default function ConfiguracionesPage() {
  const [phoneNumber] = useState("+504******00")
  const [language] = useState("Idioma predeterminado")

  const handleLogout = () => {
    // Aquí iría la lógica para cerrar sesión
    console.log("Cerrando sesión...")
    // Normalmente redirigirías al usuario a la página de inicio de sesión
    // window.location.href = "/login"
  }

  const handleDeleteAccount = () => {
    if (confirm("¿Estás seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.")) {
      // Aquí iría la lógica para eliminar la cuenta
      console.log("Eliminando cuenta...")
      // Normalmente redirigirías al usuario a la página de inicio o registro
      // window.location.href = "/register"
    }
  }

  return (
    <div className="min-h-screen bg-[#0a2a3a] text-white flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center justify-between border-b border-[#1a3a4a]">
        <Menu className="w-6 h-6" />
        <h1 className="text-center text-lg font-medium">Configuraciones</h1>
        <div className="w-6"></div> {/* Spacer para centrar el título */}
      </header>

      {/* Main content */}
      <main className="flex-1 p-4 flex flex-col space-y-4">
        {/* Cambiar número de teléfono */}
        <Link href="#" className="flex items-center justify-between py-3 border-b border-[#1a3a4a]">
          <div>
            <p className="text-white">Cambiar el número de teléfono</p>
            <p className="text-sm text-gray-400">{phoneNumber}</p>
          </div>
          <ChevronRight className="text-gray-400" />
        </Link>

        {/* Idioma */}
        <Link href="#" className="flex items-center justify-between py-3 border-b border-[#1a3a4a]">
          <div>
            <p className="text-white">Idioma</p>
            <p className="text-sm text-gray-400">{language}</p>
          </div>
          <ChevronRight className="text-gray-400" />
        </Link>

        {/* Formato de fecha y unidades de distancia */}
        <Link href="#" className="flex items-center justify-between py-3 border-b border-[#1a3a4a]">
          <div>
            <p className="text-white">Formato de fecha y unidades de distancia</p>
          </div>
          <ChevronRight className="text-gray-400" />
        </Link>

        {/* Acerca de la aplicación */}
        <Link href="#" className="flex items-center justify-between py-3 border-b border-[#1a3a4a]">
          <div>
            <p className="text-white">Acerca de la aplicación</p>
          </div>
          <ChevronRight className="text-gray-400" />
        </Link>

        {/* Cerrar sesión */}
        <button onClick={handleLogout} className="flex items-center py-3 border-b border-[#1a3a4a] text-white">
          Cerrar sesión
        </button>

        {/* Eliminar cuenta */}
        <button onClick={handleDeleteAccount} className="flex items-center py-3 text-red-500">
          Eliminar cuenta
        </button>
      </main>
    </div>
  )
}
