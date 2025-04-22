"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Banknote, Printer, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"

export default function PagoEfectivoPage() {
  const router = useRouter()
  const [codigoReferencia, setCodigoReferencia] = useState<string>("")
  const [copied, setCopied] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  useEffect(() => {
    // Generar código de referencia aleatorio para pago en efectivo
    const codigo = Math.random().toString(36).substring(2, 10).toUpperCase()
    setCodigoReferencia(codigo)
  }, [])

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codigoReferencia)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = () => {
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
        <h1 className="text-xl font-medium">{success ? "Pago completado" : "Pago en efectivo"}</h1>
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
        ) : (
          <>
            <Card className="bg-[#132f4c] border-gray-700 text-white mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Banknote className="mr-2 h-5 w-5 text-green-400" />
                  Detalles del pago
                </CardTitle>
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
                <Separator className="my-2 bg-gray-700" />
                <div className="flex justify-between font-bold">
                  <span>Total a pagar:</span>
                  <span>L. 1,380.00</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#132f4c] border-gray-700 text-white">
              <CardHeader>
                <CardTitle>Código de referencia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-[#1a3a5f] p-4 text-center relative">
                  <p className="text-sm text-gray-300 mb-2">Presenta este código al realizar tu pago</p>
                  <div className="flex items-center justify-center">
                    <p className="text-2xl font-bold tracking-wider">{codigoReferencia}</p>
                    <button
                      onClick={handleCopyCode}
                      className="absolute right-3 p-1 rounded-md hover:bg-[#254a6d]"
                      aria-label="Copiar código"
                    >
                      {copied ? (
                        <Check className="h-5 w-5 text-green-400" />
                      ) : (
                        <Copy className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Válido por 48 horas</p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">¿Dónde puedo pagar?</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-lg border border-gray-700 p-3">
                      <h4 className="font-medium mb-2">Bancos</h4>
                      <ul className="list-disc pl-4 text-gray-300 space-y-1">
                        <li>Banco Atlántida</li>
                        <li>BAC Credomatic</li>
                        <li>Banpais</li>
                        <li>Banco Ficohsa</li>
                      </ul>
                    </div>
                    <div className="rounded-lg border border-gray-700 p-3">
                      <h4 className="font-medium mb-2">Tiendas</h4>
                      <ul className="list-disc pl-4 text-gray-300 space-y-1">
                        <li>Farmacias Kielsa</li>
                        <li>La Colonia</li>
                        <li>Pago Fácil</li>
                        <li>ServiRecargas</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Instrucciones:</h3>
                  <ol className="list-decimal pl-5 space-y-2 text-sm">
                    <li>Acude a cualquier punto de pago autorizado.</li>
                    <li>Proporciona el código de referencia mostrado arriba.</li>
                    <li>
                      Realiza el pago por el monto total: <strong>L. 1,380.00</strong>.
                    </li>
                    <li>Guarda tu comprobante de pago como respaldo.</li>
                    <li>Una vez confirmado el pago, tu servicio será activado automáticamente.</li>
                  </ol>
                </div>

                <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-3 text-sm">
                  <p className="text-yellow-300 font-medium mb-1">Importante:</p>
                  <ul className="list-disc pl-5 text-yellow-200/80 space-y-1">
                    <li>El código expirará en 48 horas.</li>
                    <li>El monto exacto debe ser pagado para identificar tu transacción.</li>
                    <li>Conserva tu recibo hasta que el pago sea confirmado.</li>
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
                  <Printer className="mr-2 h-4 w-4" />
                  Imprimir instrucciones
                </Button>
              </CardFooter>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
