"use client"

import { useEffect, useState } from "react"
import { ChevronRight, Menu } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/supabaseClient"

export const SettingsCustomerCarrier = () => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [language] = useState("Idioma predeterminado")
  const router = useRouter()

  const userId =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("main_view") || "{}").userId
      : null

  useEffect(() => {
    const fetchPhone = async () => {
      if (!userId) return

      const { data, error } = await supabase
        .from("person")
        .select("phone")
        .eq("id", userId)
        .single()

      if (error) {
        console.error("Error al obtener el número:", error.message)
        return
      }

      setPhoneNumber(data?.phone || "")
    }

    fetchPhone()
  }, [userId])

  const handleLogout = () => {
    localStorage.removeItem("main_view")
    localStorage.removeItem("currentUser")
    router.push("/login")
  }

  const handleDeleteAccount = () => {
    if (confirm("¿Estás seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.")) {
      console.log("Eliminando cuenta...")
      // lógica de eliminación de cuenta aquí
    }
  }

  return (
    <div className="min-h-screen bg-[#0a2a3a] text-white flex flex-col">
      <header className="p-4 flex items-center justify-between border-b border-[#1a3a4a]">
        <Menu className="w-6 h-6" />
        <h1 className="text-center text-lg font-medium">Configuraciones</h1>
        <div className="w-6" />
      </header>

      <main className="flex-1 p-4 flex flex-col space-y-4">
        <Link href="/customer/settings/cp" className="flex items-center justify-between py-3 border-b border-[#1a3a4a]">
          <div>
            <p className="text-white">Cambiar el número de teléfono</p>
            <p className="text-sm text-gray-400">{phoneNumber || "..."}</p>
          </div>
          <ChevronRight className="text-gray-400" />
        </Link>

        <Link href="/customer/settings/idioma" className="flex items-center justify-between py-3 border-b border-[#1a3a4a]">
          <div>
            <p className="text-white">Idioma</p>
            <p className="text-sm text-gray-400">{language}</p>
          </div>
          <ChevronRight className="text-gray-400" />
        </Link>

        <Link href="/customer/settings/format" className="flex items-center justify-between py-3 border-b border-[#1a3a4a]">
          <div>
            <p className="text-white">Formato de fecha y unidades de distancia</p>
          </div>
          <ChevronRight className="text-gray-400" />
        </Link>

        <Link href="/customer/settings/about" className="flex items-center justify-between py-3 border-b border-[#1a3a4a]">
          <div>
            <p className="text-white">Acerca de la aplicación</p>
          </div>
          <ChevronRight className="text-gray-400" />
        </Link>

        <button onClick={handleLogout} className="flex items-center py-3 border-b border-[#1a3a4a] text-white">
          Cerrar sesión
        </button>

        <button onClick={handleDeleteAccount} className="flex items-center py-3 text-red-500">
          Eliminar cuenta
        </button>
      </main>
    </div>
  )
}
