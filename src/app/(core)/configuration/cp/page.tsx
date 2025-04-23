"use client"

import { usePhoneNumber } from "@/hooks/usePhoneNumber"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React from "react"

export default function ChangePhoneNumberPage() {
  const {
    phoneNumber,
    newPhoneNumber,
    setNewPhoneNumber,
    handleSave,
    error,
  } = usePhoneNumber()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validamos y guardamos el número
    const isValid = handleSave()
    if (!isValid) return

    alert("Número actualizado correctamente")

    // Redirigir
    window.location.href = "/configuraciones"
  }

  return (
    <div className="min-h-screen bg-[#0a2a3a] text-white flex flex-col">
      <header className="p-4 flex items-center border-b border-[#1a3a4a]">
        <Link href="/configuraciones" className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-lg font-medium">Cambiar número de teléfono</h1>
      </header>

      <main className="flex-1 p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Número actual</p>
            <p>{phoneNumber}</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="newPhone" className="text-sm text-gray-400">
              Nuevo número de teléfono
            </label>
            <Input
              id="newPhone"
              type="tel"
              value={newPhoneNumber}
              onChange={(e) => setNewPhoneNumber(e.target.value)}
              placeholder="+504 0000 0000"
              className="bg-[#1a3a4a] border-[#1a3a4a] text-white"
              required
            />
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Guardar cambios
          </Button>
        </form>
      </main>
    </div>
  )
}
