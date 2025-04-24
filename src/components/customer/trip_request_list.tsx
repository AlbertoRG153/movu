"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TripRequestCard from "./trip_request_card";
import { supabase } from "@/lib/supabase/supabaseClient";

interface TripRequestRow {
  id: string;
  newPrice: number;
  id_carrier: {
    id: string;
    id_person: {
      first_name: string;
      first_surname: string;
      profile_img: string | null;
    }[];
    vehicle: {
      plate_number: string;
    }[];
  }[];
  travel_request: {
    id: string;
    id_person: string;
  }[];
}
interface TripRequest {
  id: string;
  name: string;
  price: number;
  plate: string;
  rating: number;
  reviews: number;
}

export default function TripRequestList() {
  const [requests, setRequests] = useState<TripRequest[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("currentUser");
      if (userData) {
        const parsedData = JSON.parse(userData);
        setUserId(parsedData.id);
      }
    }
  }, []);

  // Consulta las solicitudes filtradas por el usuario
  useEffect(() => {
    const fetchRequests = async () => {
      if (!userId) {
        console.error("No se encontró un ID de usuario en localStorage");
        return;
      }

      const { data: tripRequests, error: tripError } = await supabase
        .from("trip_request")
        .select(`
          id,
          newPrice,
          id_carrier (
            id,
            id_person (
              first_name,
              first_surname,
              profile_img
            ),
            vehicle:id_vehicle (
              plate_number
            )
          ),
          travel_request!inner(id, id_person)
        `)
        .eq("travel_request.id_person", userId);

      if (tripError) {
        console.error("Error fetching trip requests:", tripError);
        return;
      }

      const requestsWithRatings = (tripRequests as TripRequestRow[]).map((item: TripRequestRow) => {
        const carrier = item.id_carrier[0]; 
        const person = carrier.id_person[0];
        const vehicle = carrier.vehicle[0]; 
        return {
          id: item.id,
          price: item.newPrice,
          name: `${person.first_name} ${person.first_surname}`,
          plate: vehicle.plate_number,
          rating: 0,   // Valor predeterminado para el rating
          reviews: 0,  // Valor predeterminado para reviews
        } as TripRequest;
      });

      setRequests(requestsWithRatings);
    };

    if (userId) {
      fetchRequests();
    }
  }, [userId]);

  const handleAccept = async (id: string) => {
    // Actualizar trip_request para marcarla como aceptada
    const { error: tripRequestError } = await supabase
      .from("trip_request")
      .update({ acepto: true })
      .eq("id", id);

    if (tripRequestError) {
      console.error("Error accepting trip request:", tripRequestError);
      return;
    }

    const { error: tripError } = await supabase
      .from("trip")
      .insert({
        date: new Date().toISOString(),
        id_status: "96421302-733c-474d-ab0c-cbc17cc80323", // Estado 'Aceptado'
        id_trip_request: id,
      });

    if (tripError) {
      console.error("Error inserting trip record:", tripError);
      return;
    }

    alert("El viaje fue aceptado");
    router.push("/customer/main_view");

    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const handleReject = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen flex flex-col">
      <header className="flex items-center justify-center p-4 bg-white">
        <h1 className="text-center text-lg font-medium text-gray-800">Solicitud de Viaje</h1>
      </header>

      <div className="flex-1 p-4 overflow-auto space-y-4">
        {requests.map((request) => (
          <TripRequestCard
            key={request.id}
            request={request}
            onAccept={() => handleAccept(request.id)}
            onReject={() => handleReject(request.id)}
          />
        ))}
      </div>

      <div className="p-4 mt-auto">
        <button
          onClick={() => console.log("Cancelled")}
          className="w-full py-3 bg-red-500 text-white rounded-md font-medium"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}