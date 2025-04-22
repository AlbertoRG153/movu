"use client"

import { useState } from "react"
import { ArrowLeft, Truck, CheckCircle, Clock, PackageSearch} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Tipado del viaje
type Viaje = {
  id: number
  detalle: string
  horaEntrega: string
  precio: number
  estado: "pendiente" | "en_transcurso" | "finalizado" | "entregado" | "verificado"
}

export default function HistorialViajePage() {
  // Estado inicial de ejemplo
  const [viajes, setViajes] = useState<Viaje[]>([
    {
      id: 1,
      detalle: "Envío a Tegucigalpa",
      horaEntrega: "14:30",
      precio: 250,
      estado: "pendiente"
    },
    {
      id: 2,
      detalle: "Paquete a San Pedro Sula",
      horaEntrega: "10:00",
      precio: 320,
      estado: "finalizado"
    }
  ])

  // Obtener texto del estado
  const getEstadoTexto = (estado: Viaje["estado"]) => {
    switch (estado) {
      case "pendiente": return "Pendiente"
      case "en_transcurso": return "En tránsito"
      case "finalizado": return "Finalizado"
      case "entregado": return "Entregado"
      case "verificado": return "Verificado por cliente"
      default: return "Desconocido"
    }
  }

  // Obtener estilo visual del estado
  const getEstadoClase = (estado: Viaje["estado"]) => {
    switch (estado) {
      case "pendiente": return "bg-yellow-500/20 text-yellow-300"
      case "en_transcurso": return "bg-blue-500/20 text-blue-300"
      case "finalizado": return "bg-green-500/20 text-green-300"
      case "entregado": return "bg-purple-500/20 text-purple-300"
      case "verificado": return "bg-emerald-500/20 text-emerald-300"
      default: return "bg-gray-500/20 text-gray-300"
    }
  }

  // Obtener ícono del estado
  const getEstadoIcono = (estado: Viaje["estado"]) => {
    switch (estado) {
      case "pendiente": return <Clock className="h-5 w-5 text-yellow-300" />
      case "en_transcurso": return <Truck className="h-5 w-5 text-blue-400" />
      case "finalizado": return <CheckCircle className="h-5 w-5 text-green-400" />
      case "entregado": return <PackageSearch className="h-5 w-5 text-purple-400" />
      case "verificado": return <CheckCircle className="h-5 w-5 text-emerald-400" />
      default: return <Clock />
    }
  }

  // Función para cambiar el estado del viaje
  const cambiarEstado = (id: number) => {
    setViajes(prev =>
      prev.map(viaje => {
        if (viaje.id === id) {
          let nuevoEstado: Viaje["estado"] = viaje.estado
          if (viaje.estado === "pendiente") nuevoEstado = "en_transcurso"
          else if (viaje.estado === "en_transcurso") nuevoEstado = "finalizado"
          else if (viaje.estado === "finalizado") nuevoEstado = "entregado"
          else if (viaje.estado === "entregado") nuevoEstado = "verificado"
          return { ...viaje, estado: nuevoEstado }
        }
        return viaje
      })
    )
  }

  return (
    <div className="min-h-screen bg-[#0a1929] text-white">
      <div className="container mx-auto max-w-md px-4 py-6">
        <div className="mb-6 flex items-center">
          <Link href="/configuraciones" className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-medium">Detalle delo viaje</h1>
        </div>

        <Card className="bg-[#132f4c] border-gray-700 text-white mb-6">
          <CardHeader>
            <CardTitle>Viajes en curso</CardTitle>
          </CardHeader>
          <CardContent>
            {viajes.length === 0 ? (
              <p className="text-center py-4 text-gray-400">No hay viajes registrados.</p>
            ) : (
              <div className="space-y-3">
                {viajes.map((viaje) => (
                  <div key={viaje.id} className="p-4 border border-gray-700 rounded-lg bg-[#1a3a5f]">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <div className="mr-3">{getEstadoIcono(viaje.estado)}</div>
                        <div>
                          <p className="font-medium">{viaje.detalle}</p>
                          <p className="text-sm text-gray-400">Hora de entrega: {viaje.horaEntrega}</p>
                          <p className="text-sm text-gray-400">Precio: L. {viaje.precio.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className={`${getEstadoClase(viaje.estado)} px-2 py-0.5 rounded-full text-xs`}>
                        {getEstadoTexto(viaje.estado)}
                      </div>
                    </div>

                    {viaje.estado !== "verificado" && (
                      <Button
                        onClick={() => cambiarEstado(viaje.id)}
                        className="w-full mt-2 bg-teal-600 hover:bg-teal-700 text-white"
                      >
                        Cambiar a {getEstadoTexto(
                          viaje.estado === "pendiente" ? "en_transcurso" :
                          viaje.estado === "en_transcurso" ? "finalizado" :
                          viaje.estado === "finalizado" ? "entregado" : "verificado"
                        )}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
