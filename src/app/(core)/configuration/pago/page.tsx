"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CreditCard, Banknote, Wallet } from "lucide-react" // iconos de forma de pago
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PagoPage() {
  const [metodoPago, setMetodoPago] = useState("tarjeta")
  const router = useRouter()

  const handleContinuar = () => {
    router.push(`/pago/procesar?metodo=${metodoPago}`)
  }

  // Lista de métodos de pago
  const opcionesPago = [
    {
      id: "tarjeta",
      label: "Tarjeta de crédito/débito",
      descripcion: "Visa, Mastercard",
      icono: <CreditCard className="mr-3 h-5 w-5 text-green-400" />,
    },
    {
      id: "efectivo",
      label: "Efectivo",
      descripcion: "Pago en puntos autorizados (bancos, tiendas)",
      icono: <Banknote className="mr-3 h-5 w-5 text-green-400" />, 
    },
    {
      id: "paypal",
      label: "PayPal",
      descripcion: "Pago rápido y seguro",
      icono: <Wallet className="mr-3 h-5 w-5 text-green-400" />,
    },
  ]

  return (
    <div className="min-h-screen bg-[#0a1929] text-white">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <div className="mb-6 flex items-center">
          <Link href="/configuraciones" className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-medium">Método de pago</h1>
        </div>

        {/* Resumen de compra */}
        <Card className="bg-[#132f4c] border-gray-700 text-white mb-6">
          <CardHeader>
            <CardTitle>Resumen de compra</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Producto:</span>
              <span>Servicio Premium</span>
            </div>
            <div className="flex justify-between">
              <span>Cantidad:</span>
              <span>1</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>L. 1,200.00</span>
            </div>
            <div className="flex justify-between">
              <span>Impuestos:</span>
              <span>L. 180.00</span>
            </div>
            <div className="border-t border-gray-700 mt-2 pt-2 flex justify-between font-bold">
              <span>Total:</span>
              <span>L. 1,380.00</span>
            </div>
          </CardContent>
        </Card>

        {/* Métodos de pago */}
        <Card className="bg-[#132f4c] border-gray-700 text-white">
          <CardHeader>
            <CardTitle>Selecciona un método de pago</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {opcionesPago.map((opcion) => (
                <label
                  key={opcion.id}
                  className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer transition-all duration-200 ${
                    metodoPago === opcion.id
                      ? "border-green-500 bg-[#1a3a5f]"
                      : "border-gray-700 hover:bg-[#1a3a5f]"
                  }`}
                >
                  <input
                    type="radio"
                    name="metodoPago"
                    value={opcion.id}
                    checked={metodoPago === opcion.id}
                    onChange={() => setMetodoPago(opcion.id)}
                    className="form-radio text-green-600 h-4 w-4"
                  />
                  <div className="flex flex-1 items-center">
                    {opcion.icono}
                    <div>
                      <p className="font-medium">{opcion.label}</p>
                      <p className="text-sm text-gray-400">{opcion.descripcion}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleContinuar} className="w-full bg-green-600 hover:bg-green-700">
              Continuar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
