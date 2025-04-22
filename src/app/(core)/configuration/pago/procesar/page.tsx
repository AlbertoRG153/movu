"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { ArrowLeft, Check, CreditCard, DollarSign, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProcesarPagoPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [metodo, setMetodo] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [codigoReferencia, setCodigoReferencia] = useState<string>("")

  useEffect(() => {
    const metodoParam = searchParams.get("metodo")
    if (metodoParam) {
      setMetodo(metodoParam)
    } else {
      router.push("/pago")
    }

    // Generar código de referencia aleatorio para pago en efectivo
    if (metodoParam === "efectivo") {
      const codigo = Math.random().toString(36).substring(2, 10).toUpperCase()
      setCodigoReferencia(codigo)
    }
  }, [searchParams, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulación de procesamiento de pago
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)

      // Redireccionar después de mostrar éxito
      setTimeout(() => {
        router.push("/configuraciones")
      }, 3000)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[#0a1929] text-white">
      <div className="container mx-auto max-w-md px-4 py-6">
        <div className="mb-6 flex items-center">
          <Link href="/pago" className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-medium">
            {success
              ? "Pago completado"
              : metodo === "tarjeta"
                ? "Pago con tarjeta"
                : metodo === "efectivo"
                  ? "Pago en efectivo"
                  : "Pago con PayPal"}
          </h1>
        </div>

        {success ? (
          <Card className="bg-[#132f4c] border-gray-700 text-white">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-xl font-bold mb-2">¡Pago completado con éxito!</h2>
              <p className="text-gray-300 mb-4">Tu pago ha sido procesado correctamente. Redirigiendo...</p>
            </CardContent>
          </Card>
        ) : metodo === "tarjeta" ? (
          <form onSubmit={handleSubmit}>
            <Card className="bg-[#132f4c] border-gray-700 text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Detalles de la tarjeta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Nombre en la tarjeta</Label>
                  <Input
                    id="cardName"
                    placeholder="Nombre completo"
                    required
                    className="bg-[#1a3a5f] border-gray-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Número de tarjeta</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    required
                    className="bg-[#1a3a5f] border-gray-700 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Fecha de expiración</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Select required>
                        <SelectTrigger className="bg-[#1a3a5f] border-gray-700 text-white">
                          <SelectValue placeholder="MM" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                            <SelectItem key={month} value={month.toString().padStart(2, "0")}>
                              {month.toString().padStart(2, "0")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select required>
                        <SelectTrigger className="bg-[#1a3a5f] border-gray-700 text-white">
                          <SelectValue placeholder="AA" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                            <SelectItem key={year} value={year.toString().slice(-2)}>
                              {year.toString().slice(-2)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      required
                      maxLength={4}
                      className="bg-[#1a3a5f] border-gray-700 text-white"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                  {loading ? "Procesando..." : "Pagar L. 1,380.00"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        ) : metodo === "efectivo" ? (
          <Card className="bg-[#132f4c] border-gray-700 text-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-green-400" />
                Pago en efectivo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg bg-[#1a3a5f] p-4 text-center">
                <p className="text-sm text-gray-300 mb-2">Tu código de referencia</p>
                <p className="text-2xl font-bold tracking-wider">{codigoReferencia}</p>
                <p className="text-xs text-gray-400 mt-2">Presenta este código al realizar tu pago</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Instrucciones de pago:</h3>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>Acude a cualquier punto de pago autorizado:</li>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-gray-300">
                    <li>Bancos: Atlántida, BAC, Banpais</li>
                    <li>Tiendas: Farmacias Kielsa, Supermercados La Colonia</li>
                    <li>Otros: Agencias Pago Fácil, ServiRecargas</li>
                  </ul>
                  <li>Proporciona el código de referencia mostrado arriba.</li>
                  <li>
                    Realiza el pago por el monto total: <strong>L. 1,380.00</strong>.
                  </li>
                  <li>Guarda tu comprobante de pago como respaldo.</li>
                  <li>Tu pago será procesado en un plazo máximo de 24 horas.</li>
                </ol>
              </div>

              <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-3 text-sm">
                <p className="text-yellow-300 font-medium mb-1">Importante:</p>
                <ul className="list-disc pl-5 text-yellow-200/80 space-y-1">
                  <li>Este código expirará en 48 horas.</li>
                  <li>El monto exacto debe ser pagado para identificar tu transacción.</li>
                  <li>Conserva tu recibo hasta que el pago sea confirmado en el sistema.</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
              <Button onClick={handleSubmit} className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
                {loading ? "Procesando..." : "He realizado el pago"}
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-[#1a3a5f]"
                onClick={() => window.print()}
              >
                Imprimir instrucciones
              </Button>
            </CardFooter>
          </Card>
        ) : metodo === "paypal" ? (
          <Card className="bg-[#132f4c] border-gray-700 text-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wallet className="mr-2 h-5 w-5" />
                Pago con PayPal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <p>Serás redirigido a PayPal para completar tu pago de forma segura.</p>

              <div className="rounded-lg bg-[#1a3a5f] p-4">
                <p className="text-sm text-gray-300 mb-2">Monto total a pagar</p>
                <p className="text-2xl font-bold">L. 1,380.00</p>
              </div>

              <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-3 text-sm">
                <p className="text-blue-300">
                  Después de completar el pago en PayPal, serás redirigido automáticamente a nuestra plataforma.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit} className="w-full bg-[#0070ba] hover:bg-[#005ea6]" disabled={loading}>
                {loading ? "Redirigiendo..." : "Continuar a PayPal"}
              </Button>
            </CardFooter>
          </Card>
        ) : null}
      </div>
    </div>
  )
}
