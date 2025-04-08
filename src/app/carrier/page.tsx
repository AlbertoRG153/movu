"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Car, History } from "lucide-react";

const CarrierHome = () => {
  const router = useRouter();
  const storedUser = typeof window !== "undefined" ? localStorage.getItem("main_view") : null;
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <div className="min-h-screen bg-[#0a2540] text-white flex flex-col items-center justify-center px-4 py-10">
        <Image
            src="/white.png"
                alt="Logo"
                width={180}
                height={180}
                layout="fixed"
                        />
      <h1 className="text-3xl font-bold mb-4">¡Bienvenido , {user?.username || "Conductor"}! </h1>

      <p className="text-sm text-gray-300 mb-6">Gestiona tus viajes y perfil .</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-xl">
        {/* Botón de Iniciar Viaje */}
        <Card className="bg-[#092A39] text-white shadow-lg transition-transform hover:scale-[1.03] cursor-pointer">
          <CardContent className="p-6 flex flex-col items-center gap-3">
            <Car size={36} />
            <h2 className="text-xl font-semibold">Iniciar Viaje</h2>
            <Button onClick={() => router.push("/start_trip")} className="bg-emerald-600 hover:bg-emerald-700 w-full">
              Iniciar
            </Button>
          </CardContent>
        </Card>

        {/* Historial de Viajes */}
        <Card className="bg-[#092A39] text-white shadow-lg transition-transform hover:scale-[1.03] cursor-pointer">
          <CardContent className="p-6 flex flex-col items-center gap-3">
            <History size={36} />
            <h2 className="text-xl font-semibold">Ver Historial</h2>
            <Button onClick={() => router.push("/history")} className="bg-emerald-600 hover:bg-emerald-700 w-full">
              Historial
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10">
    
      </div>
    </div>
  );
};

export default CarrierHome;