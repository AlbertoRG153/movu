"use client"

import { useParams, useRouter } from "next/navigation";
import { tripHistory } from "../historialpage";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Pageid = () => {
  const { id } = useParams();  
  const router = useRouter();
  const selectedTrip = tripHistory.find((trip) => id == trip.id.toString());

  return (
    <div className="min-h-screen bg-[#0c2d40] flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-white/90 rounded-2xl shadow-lg p-6">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-[#0c2d40]">
              Detalle del Viaje
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm sm:text-base">
            <div className="flex justify-between">
              <span className="font-semibold text-[#0c2d40]">Fecha:</span>
              <span>{selectedTrip?.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-[#0c2d40]">Origen:</span>
              <span>{selectedTrip?.origin}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-[#0c2d40]">Destino:</span>
              <span>{selectedTrip?.destination}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-[#0c2d40]">Hora:</span>
              <span>{selectedTrip?.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-[#0c2d40]">Monto:</span>
              <span>${selectedTrip?.amount}</span>
            </div>

            <div className="pt-6 text-center">
              <Button
                onClick={() => router.back()}
                className="bg-[#00897b] hover:bg-[#00766a] text-white font-semibold px-6 py-2 rounded-full transition duration-200"
              >
                Volver al historial
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Pageid;
