"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function TelefonoPage() {
  const [numero, setNumero] = useState("") // Estado para guardar el número de teléfono

  // Función que se ejecuta al hacer clic en Confirmar número
  const confirmarNumero = () => {
    if (numero.trim() === "") {
      alert("Por favor, ingresa un número de teléfono válido.")
    } else {
      alert(`Número ingresado: ${numero}`) // Muestra el número en un alert
    }
  }

  return (
    <div className="min-h-screen bg-[#0a1929] text-white">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Encabezado */}
        <div className="mb-6 flex items-center">
          <Link href="/configuration" className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-medium">Cambiar el número de teléfono</h1>
        </div>

        {/* Formulario */}
        <div className="space-y-6">
          {/* Campo del número */}
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm">
              Nuevo número de teléfono
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="+504 XXXX XXXX"
              className="bg-[#132f4c] border-gray-700 text-white"
              value={numero}
              onChange={(e) => setNumero(e.target.value)} // Guardar el número en el estado
            />
          </div>

          {/* Botón para confirmar número */}
          <Button
            className="w-full text-white"
            style={{ backgroundColor: "#138954" }} // Aplicamos el color directamente
            onClick={confirmarNumero} // Al hacer clic, se ejecuta la función
          >
            Confirmar número
          </Button>
          <Input
              id="phone"
              type="tel"
              placeholder="+504 XXXX XXXX"
              className="bg-[#132f4c] border-gray-700 text-white"
              value={numero}
              onChange={(e) => setNumero(e.target.value)} // Guardar el número en el estado
            />
          

          {/* Botón para guardar cambios */}
          <Button className="w-full bg-green-400 hover:bg-green-700">
            Guardar cambios
          </Button>
        </div>

        {/* Enlace para regresar */}
        <br />
        <Link
          href="/configuration"
          className="w-full border bg-green-400 hover:bg-green-700 py-3 px-4 rounded-lg flex items-center justify-center"
        >
          Regresar 
        </Link>
      </div>
    </div>
  )
}
