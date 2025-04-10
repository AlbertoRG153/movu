"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { User } from "lucide-react";

// Interfaz para los datos del conductor
interface Conductor {
  id: string;
  nombre: string;
  codigo: string;
  precio: number;
  origen: string;
  destino: string;
}

const CarrierHome = () => {
  const router = useRouter();

  // Traer usuario desde localStorage
  const [user, setUser] = useState<{ username?: string } | null>(null);

  useEffect(() => {
    const storedUser = typeof window !== "undefined" ? localStorage.getItem("main_view") : null;
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    setUser(parsedUser);
  }, []);

  // Lista de conductores a mostrar en tarjetas
  const [conductores, setConductores] = useState<Conductor[]>([
    {
      id: "1",
      nombre: "Carlos Medina",
      codigo: "AA000",
      precio: 1500,
      origen: "Col. Kennedy",
      destino: "Ciudad Universitaria",
    },
    {
      id: "2",
      nombre: "Cucharita",
      codigo: "AA010",
      precio: 1500,
      origen: "Col. Miraflores",
      destino: "Mall Multiplaza",
    },
    {
      id: "3",
      nombre: "Francisco Medina",
      codigo: "AA003",
      precio: 1500,
      origen: "Res. Honduras",
      destino: "Centro Comercial",
    },
    {
      id: "4",
      nombre: "Cesar Medina",
      codigo: "AA500",
      precio: 1500,
      origen: "Col. Alameda",
      destino: "Aeropuerto Toncontín",
    },
  ]);

  // Función para aceptar un conductor
  const handleAceptar = (id: string) => {
    alert(`Has aceptado al conductor con ID: ${id}`);
    // Aquí podrías hacer un push a otra ruta o enviar info al backend
  };

  // Función para cancelar la operación
  const handleCancelar = () => {
    if (confirm("¿Estás seguro que deseas cancelar?")) {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a2540] text-white flex flex-col items-center justify-start px-4 py-10">
      {/* Bienvenida */}
      <h1 className="text-3xl font-bold mb-4 text-center">
        ¡Bienvenido, {user?.username || "Conductor"}!
      </h1>

      {/* Logo */}
      <Image
        src="/white.png"
        alt="Logo"
        width={100}
        height={100}
        layout="fixed"
        className="mb-6"
      />

      {/* Descripción */}
      <p className="text-sm text-gray-300 mb-8 text-center max-w-md">
        Explora tu panel de conductor y mejora tu experiencia en carretera.
        Todo lo que necesitás en un solo lugares.
      </p>

      {/* Tarjetas de conductores */}
      <div className="w-full max-w-md space-y-5">
        {conductores.map((conductor) => (
          <Card
            key={conductor.id}
            className="bg-[#2d4654] text-white rounded-lg shadow-md"
          >
            <CardContent className="p-4">
              {/* Avatar y nombre */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="bg-gray-600 rounded-full p-2 mr-3">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{conductor.nombre}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">L. {conductor.precio.toFixed(2)}</p>
                  <p className="text-xs text-gray-300">{conductor.codigo}</p>
                </div>
              </div>

              {/* Origen y Destino */}
              <div className="mb-3 text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">Origen:</span>
                  <span>{conductor.origen}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Destino:</span>
                  <span>{conductor.destino}</span>
                </div>
              </div>

              {/* Botón aceptar */}
              <div className="flex justify-end">
                <Button
                  onClick={() => handleAceptar(conductor.id)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-sm px-4"
                >
                  Aceptar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Botón cancelar */}
        <div className="pt-4">
          <Button
            onClick={handleCancelar}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarrierHome;
